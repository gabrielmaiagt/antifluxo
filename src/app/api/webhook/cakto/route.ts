import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();

        console.log('Received Cakto webhook:', payload);

        // Store the raw webhook event
        await addDoc(collection(db, 'payment_events'), {
            orderId: payload.order_id || payload.id || 'unknown',
            status: payload.status || payload.event || 'unknown',
            amount: payload.amount || payload.value || 0,
            timestamp: serverTimestamp(),
            rawPayload: payload,
        });

        // Track specific payment events
        const eventType = payload.status || payload.event || '';

        if (eventType.includes('pix') || eventType.includes('generated')) {
            // PIX code was generated
            await addDoc(collection(db, 'analytics_events'), {
                eventType: 'pix_generated',
                sessionId: payload.metadata?.sessionId || 'checkout',
                timestamp: serverTimestamp(),
                metadata: {
                    orderId: payload.order_id || payload.id,
                    amount: payload.amount || payload.value,
                },
            });
        }

        if (eventType.includes('paid') || eventType.includes('approved')) {
            // Payment was completed
            await addDoc(collection(db, 'analytics_events'), {
                eventType: 'pix_paid',
                sessionId: payload.metadata?.sessionId || 'checkout',
                timestamp: serverTimestamp(),
                metadata: {
                    orderId: payload.order_id || payload.id,
                    amount: payload.amount || payload.value,
                },
            });
        }

        if (eventType.includes('abandoned') || eventType.includes('expired') || eventType.includes('cancelled')) {
            // Cart/payment was abandoned
            await addDoc(collection(db, 'analytics_events'), {
                eventType: 'cart_abandoned',
                sessionId: payload.metadata?.sessionId || 'checkout',
                timestamp: serverTimestamp(),
                metadata: {
                    orderId: payload.order_id || payload.id,
                    amount: payload.amount || payload.value,
                    reason: eventType,
                },
            });
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}

// Handle GET requests (for webhook verification)
export async function GET() {
    return NextResponse.json({ status: 'Webhook endpoint active' });
}
