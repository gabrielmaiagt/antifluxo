"use client";

import { useEffect, useRef } from 'react';
import ShimmerButton from "@/components/ui/shimmer-button";
import { trackEvent, getSessionId } from '@/lib/analytics';
import { serverTimestamp } from 'firebase/firestore';

export default function Pricing() {
    const pricingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Track when pricing card becomes visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sessionId = getSessionId();
                        trackEvent('pricing_viewed', { sessionId });
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (pricingRef.current) {
            observer.observe(pricingRef.current);
        }

        return () => observer.disconnect();
    }, []);
    return (
        <section id="pricing" className="py-8 bg-black text-white relative z-10 font-sans flex items-center justify-center" ref={pricingRef}>
            <div className="container mx-auto px-4 flex justify-center">

                {/* Card Container - Matching the reference format */}
                <div className="relative w-full max-w-[380px] group">

                    {/* Minimal border card with vertical stack */}
                    <div className="relative bg-[#050505] rounded-[30px] border border-[#dc2626]/50 p-6 flex flex-col items-center min-h-[600px] shadow-[0_0_60px_-15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_100px_-10px_rgba(220,38,38,0.6)] hover:scale-[1.02] hover:border-[#dc2626] active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer group">

                        {/* 1. Image at TOP (slightly overlapping or top) */}
                        <div className="w-full relative flex items-center justify-center -mt-12 mb-4">
                            {/* Glowing backlight behind image */}
                            <div className="absolute inset-0 bg-[#dc2626] opacity-20 blur-[50px] scale-75 rounded-full"></div>
                            <img
                                src="/card-antifluxo.png"
                                alt="Cartão de Acesso Anti Fluxo"
                                className="relative w-[280px] h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-10 transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* 2. TITLE */}
                        <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter mb-6 text-center">
                            ANTI FLUXO
                        </h2>

                        {/* 3. BULLETS (New) */}
                        <div className="flex flex-col gap-3 text-center mb-10 w-full px-2">
                            <p className="text-gray-300 text-sm font-medium">Acesso à comunidade privada</p>
                            <p className="text-gray-300 text-sm font-medium">Networking com players de alto nível</p>
                            <p className="text-gray-300 text-sm font-medium">Conteúdos e estratégias validadas</p>
                            <p className="text-gray-300 text-sm font-medium">Suporte e acompanhamento</p>
                        </div>

                        {/* 4. PRICE */}
                        <div className="mt-auto text-center mb-8">
                            {/* Original Price - Crossed Out */}
                            <div className="mb-2">
                                <span className="text-lg font-bold text-gray-500 line-through">De R$ 197,00</span>
                            </div>

                            {/* Discount Badge */}
                            <div className="inline-block bg-[#dc2626] text-white text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
                                85% OFF
                            </div>

                            {/* Current Price */}
                            <div className="flex flex-col items-center justify-center font-display leading-none">
                                <div className="flex items-end gap-1 mb-2">
                                    <span className="text-2xl font-bold text-white mb-1">R$</span>
                                    <span className="text-6xl font-black text-white tracking-tighter">47,00</span>
                                </div>
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">6 meses de acesso</span>
                            </div>
                        </div>

                        {/* 5. BUTTON */}
                        <a
                            href="https://pay.cakto.com.br/4aejjve_587694"
                            className="w-full"
                            onClick={() => {
                                const sessionId = getSessionId();
                                trackEvent('checkout_clicked', { sessionId, amount: 47.00 });
                            }}
                        >
                            <ShimmerButton
                                background="#dc2626"
                                shimmerColor="#ff9999"
                                borderRadius="9999px"
                                className="w-full py-4 text-white font-bold tracking-wide uppercase font-display text-lg shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                            >
                                FAZER PARTE
                            </ShimmerButton>
                        </a>

                    </div>
                </div>
            </div>
        </section>
    );
}
