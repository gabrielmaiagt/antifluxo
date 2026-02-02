"use client";

import { useEffect, useState } from 'react';
import { getRecentEvents, RecentEvent } from '@/lib/admin-queries';

export default function RealtimeEvents() {
    const [events, setEvents] = useState<RecentEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadEvents() {
            const data = await getRecentEvents(20);
            setEvents(data);
            setLoading(false);
        }

        loadEvents();

        // Refresh every 10 seconds
        const interval = setInterval(loadEvents, 10000);

        return () => clearInterval(interval);
    }, []);

    const getEventIcon = (eventType: string) => {
        if (eventType.includes('entry')) return '🚪';
        if (eventType.includes('pricing')) return '💰';
        if (eventType.includes('checkout')) return '🛒';
        if (eventType.includes('pix_generated')) return '📱';
        if (eventType.includes('pix_paid')) return '✅';
        if (eventType.includes('abandoned')) return '⚠️';
        if (eventType.includes('scroll')) return '👀';
        if (eventType.includes('cta')) return '👆';
        return '📊';
    };

    const getEventLabel = (eventType: string) => {
        const labels: Record<string, string> = {
            'funnel_entry': 'Entrou no Funil',
            'pricing_viewed': 'Visualizou Preço',
            'checkout_clicked': 'Clicou no Checkout',
            'pix_generated': 'Gerou PIX',
            'pix_paid': 'Pagamento Confirmado',
            'cart_abandoned': 'Carrinho Abandonado',
            'scroll_depth': 'Rolou a Página',
            'cta_learning_clicked': 'Clicou CTA (Aprender)',
            'cta_final_main_clicked': 'Clicou CTA (Final)',
        };
        return labels[eventType] || eventType;
    };

    if (loading) {
        return <div className="text-white">Carregando eventos...</div>;
    }

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-2xl font-bold">Eventos Recentes</h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-400 text-sm">Ao vivo</span>
                </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
                {events.length === 0 && (
                    <div className="text-gray-400 text-center py-8">Nenhum evento ainda</div>
                )}

                {events.map((event) => (
                    <div
                        key={event.id}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <span className="text-2xl">{getEventIcon(event.eventType)}</span>
                        <div className="flex-1">
                            <div className="text-white font-medium">{getEventLabel(event.eventType)}</div>
                            <div className="text-gray-400 text-xs">
                                {event.timestamp.toLocaleTimeString('pt-BR')} • Sessão: {event.sessionId.substring(0, 8)}...
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
