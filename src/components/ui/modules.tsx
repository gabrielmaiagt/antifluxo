import Image from 'next/image';

export default function Modules() {
    // Array of 9 images (module-01.png to module-09.png)
    const modules = Array.from({ length: 9 }, (_, i) => `module-${String(i + 1).padStart(2, "0")}.png`);

    return (
        <section className="py-20 bg-black text-white relative z-10 font-sans text-center">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold font-display uppercase mb-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        MÓDULOS GRAVADOS
                    </h3>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium">
                        Você vai aprender do básico ao avançado. Além de atualizações constantes com as últimas novidades. Você aprende, executa e escala.
                    </p>
                </div>

                {/* Modules Carousel */}
                <div className="relative w-full overflow-x-auto hide-scrollbar [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex gap-6 w-max animate-scroll">
                        {/* Duplicate for Loop */}
                        {[...modules, ...modules].map((img, index) => (
                            <div
                                key={index}
                                className="rounded-2xl overflow-hidden w-[280px] md:w-[320px] h-[400px] flex-shrink-0 border border-white/10 hover:border-[#dc2626] transition-all duration-300 shadow-lg group relative"
                            >
                                <Image
                                    src={`/modules/${img}`}
                                    alt={`Módulo ${index + 1}`}
                                    width={320}
                                    height={400}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading={index >= 9 ? "lazy" : "eager"}
                                    quality={85}
                                    sizes="(max-width: 768px) 280px, 320px"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-4 text-sm text-gray-500 flex items-center justify-center gap-2 font-display uppercase tracking-widest opacity-60">
                    <span className="animate-pulse">←</span> Veja os módulos <span className="animate-pulse">→</span>
                </div>
            </div>
        </section>
    );
}
