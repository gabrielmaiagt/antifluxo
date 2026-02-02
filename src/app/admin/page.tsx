"use client";

import { useState } from 'react';
import MetricsOverview from '@/components/admin/MetricsOverview';
import FunnelChart from '@/components/admin/FunnelChart';
import RealtimeEvents from '@/components/admin/RealtimeEvents';

export default function AdminPage() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isClearing, setIsClearing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Reload the page to fetch fresh data
        window.location.reload();
    };

    const handleClearMetrics = async () => {
        if (!confirm('⚠️ Tem certeza que deseja limpar TODAS as métricas? Esta ação não pode ser desfeita!')) {
            return;
        }

        setIsClearing(true);

        try {
            const response = await fetch('/api/admin/clear-metrics', {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                alert(`✅ Sucesso! ${data.deletedCount} documentos foram deletados.`);
                window.location.reload();
            } else {
                alert('❌ Erro ao limpar métricas: ' + data.error);
            }
        } catch (error) {
            console.error('Error clearing metrics:', error);
            alert('❌ Erro ao limpar métricas. Verifique o console.');
        } finally {
            setIsClearing(false);
        }
    };

    return (
        <div className="min-h-screen bg-black py-12 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white uppercase mb-2">
                            Dashboard Admin
                        </h1>
                        <p className="text-gray-400">Analytics do funil de conversão Anti Fluxo</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <svg className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {isRefreshing ? 'Atualizando...' : 'Atualizar'}
                        </button>

                        <button
                            onClick={handleClearMetrics}
                            disabled={isClearing}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            {isClearing ? 'Limpando...' : 'Limpar Métricas'}
                        </button>
                    </div>
                </div>

                {/* Metrics Overview */}
                <MetricsOverview />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Funnel Chart */}
                    <div>
                        <FunnelChart />
                    </div>

                    {/* Real-time Events */}
                    <div>
                        <RealtimeEvents />
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg">
                    <div className="text-gray-400 text-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-green-500">✓</span>
                            <span>Webhook URL: <code className="text-white bg-black/50 px-2 py-1 rounded">/api/webhook/cakto</code></span>
                        </div>
                        <div className="text-xs text-gray-500">
                            Dados atualizados em tempo real • Configure o webhook no Cakto para receber eventos de pagamento
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
