export default function Benefits() {
    return (
        <section className="py-24 bg-black text-white relative z-10 font-sans">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter font-display leading-none text-white">
                        ENTENDA O QUE VOCÊ RECEBE AO ENTRAR NA{" "}
                        <span className="text-[#dc2626]">
                            ANTI FLUXO
                        </span>
                    </h2>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                    {/* Card 1: Calls */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 hover:border-[#dc2626]/50 transition-all duration-300 group shadow-lg">
                        <img
                            src="/feature-calls.jpg"
                            alt="Calls Ao Vivo"
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Card 2: Conteúdo */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 hover:border-[#dc2626]/50 transition-all duration-300 group shadow-lg">
                        <img
                            src="/feature-content.jpg"
                            alt="Conteúdo Gravado"
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Card 3: WhatsApp */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 hover:border-[#10b981]/50 transition-all duration-300 group shadow-lg">
                        <img
                            src="/feature-whatsapp.jpg"
                            alt="Grupo WhatsApp"
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
