"use client";

import { useEffect, useState } from 'react';
import { getFunnelStats, FunnelStats } from '@/lib/admin-queries';

export default function FunnelChart() {
    const [stats, setStats] = useState<FunnelStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStats() {
            const data = await getFunnelStats();
            setStats(data);
            setLoading(false);
        }
        loadStats();
    }, []);

    if (loading || !stats) {
        return <div className="text-white">Carregando funil...</div>;
    }

    const stages = [
        { name: 'Entrada no Funil', count: stats.totalLeads, percent: 100 },
        {
            name: 'Visualizou Preço',
            count: stats.viewedPricing,
            percent: stats.totalLeads > 0 ? (stats.viewedPricing / stats.totalLeads) * 100 : 0
        },
        {
            name: 'Clicou no Checkout',
            count: stats.clickedCheckout,
            percent: stats.totalLeads > 0 ? (stats.clickedCheckout / stats.totalLeads) * 100 : 0
        },
        {
            name: 'Gerou PIX',
            count: stats.generatedPix,
            percent: stats.totalLeads > 0 ? (stats.generatedPix / stats.totalLeads) * 100 : 0
        },
        {
            name: 'Pagou (Converteu)',
            count: stats.paidPix,
            percent: stats.totalLeads > 0 ? (stats.paidPix / stats.totalLeads) * 100 : 0
        },
    ];

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 mb-8">
            <h2 className="text-white text-2xl font-bold mb-6">Funil de Conversão</h2>

            {/* Bottleneck Alert */}
            {stats.bottleneck !== 'None' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        <div>
                            <div className="text-white font-bold">Gargalo Identificado</div>
                            <div className="text-gray-300 text-sm">Maior queda: {stats.bottleneck}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Funnel Visualization */}
            <div className="space-y-4">
                {stages.map((stage, index) => (
                    <div key={index} className="relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white font-medium">{stage.name}</span>
                            <span className="text-gray-400 text-sm">
                                {stage.count} ({stage.percent.toFixed(1)}%)
                            </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-8 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#dc2626] to-[#ef4444] transition-all duration-500 flex items-center justify-end pr-3"
                                style={{ width: `${stage.percent}%` }}
                            >
                                {stage.percent > 15 && (
                                    <span className="text-white text-sm font-bold">{stage.percent.toFixed(1)}%</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Overall Conversion Rate */}
            <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Taxa de Conversão Total</span>
                    <span className="text-white text-2xl font-bold">{stats.conversionRate.toFixed(2)}%</span>
                </div>
            </div>
        </div>
    );
}
