"use client";

import { trackEvent, getSessionId } from '@/lib/analytics';

export default function LearningCTA() {
    return (
        <section className="py-16 bg-black text-white relative z-10 font-sans flex items-center justify-center">
            <div className="container mx-auto px-4 flex justify-center">
                <div className="relative w-full max-w-md group">
                    {/* Animated glow border */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#dc2626] rounded-[30px] opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                    {/* Main card */}
                    <div className="relative bg-[#0a0a0a] border border-[#dc2626]/30 rounded-[30px] p-8 text-center shadow-[0_0_60px_-10px_rgba(220,38,38,0.4)] group-hover:shadow-[0_0_100px_-5px_rgba(220,38,38,0.8)] group-hover:scale-[1.03] active:scale-[0.97] transition-all duration-500 ease-out cursor-pointer">
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#dc2626]/5 via-transparent to-[#dc2626]/5 rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Icon/Badge at top */}
                        <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#dc2626]/10 border-2 border-[#dc2626]/30 mb-6 group-hover:scale-110 group-hover:border-[#dc2626]/60 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                            <svg
                                className="w-8 h-8 text-[#dc2626] group-hover:text-[#ef4444] transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>

                        <h2 className="relative text-2xl md:text-3xl font-black mb-4 uppercase tracking-tight font-display drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            O que você quer <br />aprender hoje?
                        </h2>

                        <p className="relative text-gray-400 text-sm md:text-base leading-relaxed mb-8 font-sans">
                            Na <span className="text-[#dc2626] font-bold drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]">FLUXO</span>, você desenvolve novas habilidades dentro do mercado digital. Tudo isso muito mais, na nossa área de membros.
                        </p>

                        <a
                            href="#pricing"
                            className="relative inline-block w-full bg-white text-black font-bold text-sm uppercase tracking-wider py-4 px-8 rounded-full hover:bg-[#dc2626] hover:text-white transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.6)] overflow-hidden group/btn"
                            onClick={() => {
                                const sessionId = getSessionId();
                                trackEvent('cta_learning_clicked', { sessionId, location: 'learning_cta' });
                            }}
                        >
                            <span className="relative z-10">COMEÇAR AGORA</span>
                            {/* Button shine effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
