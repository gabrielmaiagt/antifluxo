import { Clock, Lock, HelpCircle, Smartphone, CreditCard, MessageCircle } from "lucide-react";

export default function FAQ() {
    const faqItems = [
        {
            icon: <Clock className="w-6 h-6 text-[#dc2626]" />,
            question: "O acesso é liberado na hora?",
            answer: "Sim, o acesso é enviado para o seu e-mail imediatamente após a confirmação do pagamento.",
        },
        {
            icon: <Lock className="w-6 h-6 text-[#dc2626]" />,
            question: "Este valor é uma mensalidade?",
            answer: "Não, este é um pagamento único. Você terá acesso por 6 meses a todo o conteúdo e futuras atualizações sem nenhum custo adicional.",
        },
        {
            icon: <HelpCircle className="w-6 h-6 text-[#dc2626]" />,
            question: "E se eu não gostar do que vou receber?",
            answer: "Você tem uma garantia incondicional de 7 dias. Se não ficar satisfeito, pode pedir o reembolso total do valor investido.",
        },
        {
            icon: <Smartphone className="w-6 h-6 text-[#dc2626]" />,
            question: "Posso acessar de qualquer lugar?",
            answer: "Com certeza. A plataforma é 100% compatível com celulares, tablets e computadores.",
        },
        {
            icon: <CreditCard className="w-6 h-6 text-[#dc2626]" />,
            question: "Quais são as formas de pagamento?",
            answer: "Aceitamos PIX e cartão de crédito, com opção de parcelamento em até 12 vezes para facilitar o seu acesso.",
        },
        {
            icon: <MessageCircle className="w-6 h-6 text-[#dc2626]" />,
            question: "Como funciona o suporte?",
            answer: "Temos um canal de suporte dedicado via WhatsApp para tirar dúvidas e resolver qualquer problema rapidamente.",
        },
    ];

    return (
        <section className="py-24 bg-black text-white relative z-10 font-sans border-t border-white/5">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-4xl md:text-5xl font-black text-center mb-16 uppercase tracking-tighter font-display">FAQ</h2>

                <div className="bg-[#050505] border border-[#2a2a2a] rounded-3xl p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                        {faqItems.map((item, index) => (
                            <div key={index} className="flex flex-col items-start gap-4">
                                <div className="bg-[#1a0505] p-3 rounded-xl border border-[#3f0f0f]">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 font-display uppercase tracking-wide">{item.question}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
