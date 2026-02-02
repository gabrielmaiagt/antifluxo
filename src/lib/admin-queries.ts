import { db } from './firebase';
import {
    collection,
    query,
    getDocs,
    where,
    orderBy,
    limit as limitQuery,
    Timestamp
} from 'firebase/firestore';

export interface FunnelStats {
    totalLeads: number;
    viewedPricing: number;
    clickedCheckout: number;
    generatedPix: number;
    paidPix: number;
    conversionRate: number;
    bottleneck: string;
}

export interface MetricsOverview {
    totalLeads: number;
    totalConversions: number;
    conversionRate: number;
    totalRevenue: number;
    abandonedCarts: number;
}

export interface RecentEvent {
    id: string;
    eventType: string;
    timestamp: Date;
    sessionId: string;
    metadata?: any;
}

// Get overall metrics
export async function getMetricsOverview(): Promise<MetricsOverview> {
    try {
        const eventsRef = collection(db, 'analytics_events');

        // Count unique sessions (leads)
        const entryQuery = query(eventsRef, where('eventType', '==', 'funnel_entry'));
        const entrySnap = await getDocs(entryQuery);
        const uniqueSessions = new Set(entrySnap.docs.map(doc => doc.data().sessionId));
        const totalLeads = uniqueSessions.size;

        // Count conversions (paid)
        const paidQuery = query(eventsRef, where('eventType', '==', 'pix_paid'));
        const paidSnap = await getDocs(paidQuery);
        const totalConversions = paidSnap.docs.length;

        // Count abandoned carts
        const abandonedQuery = query(eventsRef, where('eventType', '==', 'cart_abandoned'));
        const abandonedSnap = await getDocs(abandonedQuery);
        const abandonedCarts = abandonedSnap.docs.length;

        // Calculate revenue
        const totalRevenue = paidSnap.docs.reduce((sum, doc) => {
            return sum + (doc.data().metadata?.amount || 0);
        }, 0);

        const conversionRate = totalLeads > 0 ? (totalConversions / totalLeads) * 100 : 0;

        return {
            totalLeads,
            totalConversions,
            conversionRate,
            totalRevenue,
            abandonedCarts,
        };
    } catch (error) {
        console.error('Error fetching metrics:', error);
        return {
            totalLeads: 0,
            totalConversions: 0,
            conversionRate: 0,
            totalRevenue: 0,
            abandonedCarts: 0,
        };
    }
}

// Get funnel statistics
export async function getFunnelStats(): Promise<FunnelStats> {
    try {
        const eventsRef = collection(db, 'analytics_events');

        // Count each stage
        const stages = [
            'funnel_entry',
            'pricing_viewed',
            'checkout_clicked',
            'pix_generated',
            'pix_paid',
        ];

        const counts = await Promise.all(
            stages.map(async (stage) => {
                const stageQuery = query(eventsRef, where('eventType', '==', stage));
                const snap = await getDocs(stageQuery);
                return snap.docs.length;
            })
        );

        const [totalLeads, viewedPricing, clickedCheckout, generatedPix, paidPix] = counts;

        // Calculate conversion rates for each step
        const rates = [
            totalLeads > 0 ? (viewedPricing / totalLeads) * 100 : 100,
            viewedPricing > 0 ? (clickedCheckout / viewedPricing) * 100 : 100,
            clickedCheckout > 0 ? (generatedPix / clickedCheckout) * 100 : 100,
            generatedPix > 0 ? (paidPix / generatedPix) * 100 : 100,
        ];

        // Find bottleneck (biggest drop-off)
        const stageNames = [
            'Entry → Pricing',
            'Pricing → Checkout',
            'Checkout → PIX',
            'PIX → Paid',
        ];

        let minRate = 100;
        let bottleneck = 'None';

        rates.forEach((rate, index) => {
            if (rate < minRate) {
                minRate = rate;
                bottleneck = stageNames[index];
            }
        });

        const conversionRate = totalLeads > 0 ? (paidPix / totalLeads) * 100 : 0;

        return {
            totalLeads,
            viewedPricing,
            clickedCheckout,
            generatedPix,
            paidPix,
            conversionRate,
            bottleneck,
        };
    } catch (error) {
        console.error('Error fetching funnel stats:', error);
        return {
            totalLeads: 0,
            viewedPricing: 0,
            clickedCheckout: 0,
            generatedPix: 0,
            paidPix: 0,
            conversionRate: 0,
            bottleneck: 'Error',
        };
    }
}

// Get recent events
export async function getRecentEvents(limit: number = 50): Promise<RecentEvent[]> {
    try {
        const eventsRef = collection(db, 'analytics_events');
        const recentQuery = query(
            eventsRef,
            orderBy('timestamp', 'desc'),
            limitQuery(limit)
        );

        const snap = await getDocs(recentQuery);

        return snap.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                eventType: data.eventType,
                timestamp: data.timestamp?.toDate() || new Date(),
                sessionId: data.sessionId,
                metadata: data.metadata,
            };
        });
    } catch (error) {
        console.error('Error fetching recent events:', error);
        return [];
    }
}
