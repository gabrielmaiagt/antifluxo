import { db } from './firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Generate or retrieve session ID
export function getSessionId(): string {
    if (typeof window === 'undefined') return '';

    let sessionId = localStorage.getItem('antifluxo_session_id');
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('antifluxo_session_id', sessionId);
    }
    return sessionId;
}

// Track generic events
export async function trackEvent(
    eventType: string,
    metadata: Record<string, any> = {}
): Promise<void> {
    try {
        const sessionId = getSessionId();
        await addDoc(collection(db, 'analytics_events'), {
            eventType,
            sessionId,
            timestamp: serverTimestamp(),
            metadata,
        });
    } catch (error) {
        console.error('Error tracking event:', error);
    }
}

// Initialize conversion record when user enters funnel
export async function initConversion(sessionId: string): Promise<string | null> {
    try {
        const docRef = await addDoc(collection(db, 'conversions'), {
            sessionId,
            enteredFunnel: serverTimestamp(),
            viewedPricing: null,
            clickedCheckout: null,
            generatedPix: null,
            paidPix: null,
            amount: null,
        });
        return docRef.id;
    } catch (error) {
        console.error('Error initializing conversion:', error);
        return null;
    }
}

// Update conversion record
export async function updateConversion(
    sessionId: string,
    updates: Partial<{
        viewedPricing: Timestamp;
        clickedCheckout: Timestamp;
        generatedPix: Timestamp;
        paidPix: Timestamp;
        amount: number;
    }>
): Promise<void> {
    try {
        // For simplicity, we'll update by sessionId (in production, use conversionId)
        // This is a simplified version - you may want to query first
        const conversionRef = doc(db, 'conversions', sessionId);
        await updateDoc(conversionRef, {
            ...updates,
            lastUpdated: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error updating conversion:', error);
    }
}

// Track specific funnel events
export async function trackFunnelEvent(stage: string, metadata: Record<string, any> = {}): Promise<void> {
    await trackEvent(`funnel_${stage}`, metadata);
}
