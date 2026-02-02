import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch } from 'firebase/firestore';

export async function DELETE(request: NextRequest) {
    try {
        // Get all collections we want to clear
        const collections = ['analytics_events', 'conversions', 'payment_events'];

        let totalDeleted = 0;

        for (const collectionName of collections) {
            const collectionRef = collection(db, collectionName);
            const snapshot = await getDocs(collectionRef);

            if (snapshot.empty) {
                continue;
            }

            // Firestore batch can only handle 500 operations at a time
            const batches = [];
            let batch = writeBatch(db);
            let operationCount = 0;

            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
                operationCount++;
                totalDeleted++;

                // When we reach 500 operations, commit and start a new batch
                if (operationCount === 500) {
                    batches.push(batch.commit());
                    batch = writeBatch(db);
                    operationCount = 0;
                }
            });

            // Commit any remaining operations
            if (operationCount > 0) {
                batches.push(batch.commit());
            }

            // Execute all batches
            await Promise.all(batches);
        }

        return NextResponse.json({
            success: true,
            message: `Successfully deleted ${totalDeleted} documents`,
            deletedCount: totalDeleted
        }, { status: 200 });

    } catch (error) {
        console.error('Error clearing metrics:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to clear metrics'
        }, { status: 500 });
    }
}

// Handle GET requests (not allowed)
export async function GET() {
    return NextResponse.json({
        error: 'Method not allowed. Use DELETE to clear metrics.'
    }, { status: 405 });
}
