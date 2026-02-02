import Image from 'next/image';

export default function Testimonials() {
    const files = [
        "gabrielmaiagt_1759517591_highlight18082725070951994.mp4",
        "gabrielmaiagt_1759891048_highlight18082725070951994.mp4",
        "gabrielmaiagt_1760019600_highlight18082725070951994.mp4",
        "gabrielmaiagt_1761104720_highlight18082725070951994.mp4",
        "gabrielmaiagt_1765020971_highlight18082725070951994.mp4",
        "gabrielmaiagt_1765883979_highlight18082725070951994.mp4",
        "gabrielmaiagt_1766541385_highlight18082725070951994.jpg",
        "gabrielmaiagt_1767656731_highlight18082725070951994.mp4",
        "gabrielmaiagt_1768858809_highlight18082725070951994.mp4",
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#1a0000] to-[#0a0a0a] text-white z-10 font-sans">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-black mb-6 uppercase leading-tight tracking-tight font-display">
                        "EU VOU GANHAR DINHEIRO SE ENTRAR NA{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] to-[#ef4444]">
                            ANTI FLUXO
                        </span>
                        ?"
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed font-sans font-medium">
                        Vamos ser diretos: <strong className="text-white">não vivo de promessas, mas de resultados.</strong> Eu validei as minhas estratégias com vários mentorados, e em
                        pouco tempo, olha o resultado de alguns deles:
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative w-full overflow-x-auto hide-scrollbar [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex gap-6 w-max animate-scroll">
                        {/* Duplicate list for seamless loop */}
                        {[...files, ...files].map((file, index) => (
                            <div
                                key={index}
                                className="bg-black border border-[#2a2a2a] rounded-2xl overflow-hidden w-[280px] h-[500px] flex-shrink-0 hover:border-[#dc2626] transition-all duration-300 shadow-lg group relative"
                            >
                                {file.endsWith(".jpg") ? (
                                    <Image
                                        src={`/testimonials/${file}`}
                                        alt="Depoimento Anti Fluxo"
                                        width={280}
                                        height={500}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        quality={85}
                                    />
                                ) : (
                                    <video
                                        src={`/testimonials/${file}`}
                                        controls
                                        preload="metadata"
                                        playsInline
                                        muted
                                        className="w-full h-full object-cover"
                                        poster={`/testimonials/${file}#t=0.1`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-8 text-sm text-gray-500 flex items-center justify-center gap-2 font-display uppercase tracking-widest opacity-60">
                    <span className="animate-pulse">←</span> Veja o que dizem <span className="animate-pulse">→</span>
                </div>
            </div>
        </section>
    );
}
