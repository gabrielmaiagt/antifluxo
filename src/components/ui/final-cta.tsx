"use client";

import ShimmerButton from "@/components/ui/shimmer-button";
import { trackEvent, getSessionId } from '@/lib/analytics';

export default function FinalCTA() {
    return (
        <section className="py-24 bg-gradient-to-b from-black via-[#1a0000] to-black text-white relative z-10 font-sans overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main headline */}
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 uppercase leading-none tracking-tighter font-display">
                        AINDA TEM <span className="text-[#dc2626]">DÚVIDAS?</span>
                    </h2>

                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-4 font-medium">
                        Você está a um clique de transformar sua realidade financeira.
                    </p>

                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
                        Não deixe a procrastinação te impedir de alcançar seus objetivos.
                        <strong className="text-white"> A hora é agora.</strong>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="#pricing"
                            onClick={() => {
                                const sessionId = getSessionId();
                                trackEvent('cta_final_main_clicked', { sessionId, location: 'final_cta' });
                            }}
                        >
                            <ShimmerButton className="shadow-2xl">
                                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg uppercase">
                                    GARANTIR MINHA VAGA AGORA
                                </span>
                            </ShimmerButton>
                        </a>

                        <a
                            href="https://wa.me/5571991511702"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-[1.02] font-bold text-sm uppercase tracking-wider"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Tirar Minhas Dúvidas
                        </a>
                    </div>

                    {/* Urgency text */}
                    <p className="text-gray-500 text-sm mt-8 uppercase tracking-widest font-display">
                        ⚡ Vagas limitadas • Comece hoje mesmo
                    </p>
                </div>
            </div>
        </section>
    );
}
