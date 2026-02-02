import { ShieldCheck, AlertTriangle, MessageCircle } from "lucide-react";

export default function Guarantee() {
    return (
        <section className="pt-4 pb-20 bg-black text-white relative z-10 font-sans">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Card 1: Garantia */}
                    <div className="bg-[#050505] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center hover:border-[#dc2626]/30 transition-colors duration-300 group">
                        <div className="w-16 h-16 rounded-2xl bg-[#dc2626]/10 flex items-center justify-center mb-6 group-hover:bg-[#dc2626]/20 transition-colors">
                            <ShieldCheck className="w-8 h-8 text-[#dc2626]" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 font-display uppercase tracking-wide">Garantia Incondicional</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Você tem 7 dias para explorar todo o conteúdo. Se por qualquer motivo não for para você, devolvemos 100% do seu dinheiro sem questionar.
                        </p>
                    </div>

                    {/* Card 2: Aviso */}
                    <div className="bg-[#050505] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center hover:border-[#dc2626]/30 transition-colors duration-300 group">
                        <div className="w-16 h-16 rounded-2xl bg-[#dc2626]/10 flex items-center justify-center mb-6 group-hover:bg-[#dc2626]/20 transition-colors">
                            <AlertTriangle className="w-8 h-8 text-[#dc2626]" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 font-display uppercase tracking-wide">Leia com Atenção</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            O valor é justificado pelo conteúdo e benefícios. Não pedimos descontos, pois valorizamos o conhecimento que acelera seus resultados.
                        </p>
                    </div>

                    {/* Card 3: Suporte */}
                    <div className="bg-[#050505] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center hover:border-[#dc2626]/30 transition-colors duration-300 group">
                        <div className="w-16 h-16 rounded-2xl bg-[#dc2626]/10 flex items-center justify-center mb-6 group-hover:bg-[#dc2626]/20 transition-colors">
                            <MessageCircle className="w-8 h-8 text-[#dc2626]" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 font-display uppercase tracking-wide">Suporte Ativo</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Ainda tem dúvidas? Fale COMIGO pelo WhatsApp antes de garantir sua vaga e tenha todas as suas perguntas respondidas.
                        </p>
                        <a
                            href="https://wa.me/5571991511702"
                            target="_blank"
                            className="text-[#dc2626] font-bold text-sm uppercase tracking-wider border border-[#dc2626]/30 px-6 py-3 rounded-lg hover:bg-[#dc2626] hover:text-white transition-all duration-300"
                        >
                            Tirar Suas Dúvidas
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}
