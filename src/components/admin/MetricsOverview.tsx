"use client";

import { useEffect, useState } from 'react';
import { getMetricsOverview, MetricsOverview } from '@/lib/admin-queries';

export default function MetricsOverviewComponent() {
    const [metrics, setMetrics] = useState<MetricsOverview | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMetrics() {
            const data = await getMetricsOverview();
            setMetrics(data);
            setLoading(false);
        }
        loadMetrics();
    }, []);

    if (loading || !metrics) {
        return <div className="text-white">Carregando métricas...</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <MetricCard
                title="Total de Leads"
                value={metrics.totalLeads}
                icon="👥"
            />
            <MetricCard
                title="Conversões"
                value={metrics.totalConversions}
                icon="✅"
            />
            <MetricCard
                title="Carrinhos Abandonados"
                value={metrics.abandonedCarts}
                icon="🛒"
                highlight="warning"
            />
            <MetricCard
                title="Taxa de Conversão"
                value={`${metrics.conversionRate.toFixed(2)}%`}
                icon="📈"
            />
            <MetricCard
                title="Receita Total"
                value={`R$ ${metrics.totalRevenue.toFixed(2)}`}
                icon="💰"
            />
        </div>
    );
}

function MetricCard({ title, value, icon, highlight }: { title: string; value: string | number; icon: string; highlight?: 'warning' }) {
    return (
        <div className={`bg-white/5 backdrop-blur-xl border rounded-lg p-6 ${highlight === 'warning' ? 'border-yellow-500/30' : 'border-white/10'}`}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-medium">{title}</span>
                <span className="text-2xl">{icon}</span>
            </div>
            <div className={`text-3xl font-bold ${highlight === 'warning' ? 'text-yellow-400' : 'text-white'}`}>{value}</div>
        </div>
    );
}
