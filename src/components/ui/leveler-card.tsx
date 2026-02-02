export default function LevelerCard() {
    return (
        <section className="py-16 bg-black text-white relative z-10 font-sans flex items-center justify-center">
            <div className="container mx-auto px-4 flex justify-center">
                <div className="relative w-full max-w-2xl group">

                    {/* Main card with glassmorphism */}
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_40px_0_rgba(255,255,255,0.1)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-500 ease-out cursor-pointer">

                        {/* Icon at top center - overlapping border */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
                            <div className="relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                                {/* Trophy Icon */}
                                <svg
                                    className="w-12 h-12 text-[#dc2626]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.87 7.63c-.28-.79-.64-1.19-1.1-1.19H17V4.5A2.5 2.5 0 0 0 14.5 2h-5A2.5 2.5 0 0 0 7 4.5v1.94H4.23c-.46 0-.82.4-1.1 1.19C2.7 9.12 2 11.55 2 13c0 1.94.7 3 2.23 3H7v2.5a2.5 2.5 0 0 0 2.5 2.5h.55a3.5 3.5 0 1 0 3.9 0h.55a2.5 2.5 0 0 0 2.5-2.5V16h2.77C21.3 16 22 14.94 22 13c0-1.45-.7-3.88-1.13-5.37zM7 14H4.23C3.56 14 3 13.44 3 12v-.5c.31-.64.65-1.26 1-1.86V14zm5 5.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM16 14v-4.36c.35.6.69 1.22 1 1.86v.5c0 1.44-.56 2-1.23 2H16zm4.77-2H20v-1.94c.28-.31.55-.63.77-.95.28.82.46 1.65.46 2.39 0 .83-.18 1.5-.46 1.5z" />
                                </svg>
                            </div>
                        </div>

                        {/* Content with top margin for icon */}
                        <div className="relative mt-12">
                            <h2 className="text-center text-2xl md:text-4xl font-black mb-8 uppercase tracking-tight font-display text-white">
                                O melhor nivelador do mercado
                            </h2>

                            <div className="relative text-gray-200 text-sm md:text-base leading-relaxed space-y-5 font-sans">
                                <p>
                                    O <span className="text-[#dc2626] font-bold">Anti Fluxo</span> é, definitivamente a melhor forma de parear seu conhecimento e networking com gente avançada no mercado. Não apenas pela finita gama de conhecimento disponível na nossa área de membros, com módulos de criativos, mineração básica e avançada, modelagem, entendendo o tráfego direto, funil de x1 no whatsapp de forma automática, modelagem de oferta com IA, tráfego pago para Face Ads, estruturas de campanha, escala e backend.
                                </p>

                                <p>
                                    Mas também porque contamos com <span className="text-white font-semibold">grandes players do mercado</span> interagindo ativamente com o nosso ecossistema. Alguns mais conhecidos, e outros que <span className="text-white font-semibold">faturam milhões por mês</span> atrás da tela do computador, sem que ninguém faça ideia de quem são.
                                </p>

                                <p>
                                    Não somos um grupinho parado no WhatsApp. Dentro da comunidade, todos os dias, há pessoas trocando informações valiosas sobre o que está funcionando <span className="text-[#dc2626] font-bold">HOJE</span> no mercado. Se você não souber a resposta para o que precisa ou quiser um direcionamento sobre o que está pensando em fazer, certamente algum membro da comunidade já passou por isso e pode te ajudar.
                                </p>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <p className="text-gray-300 italic text-right font-serif text-base">
                                        - Gabriel Maia
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
