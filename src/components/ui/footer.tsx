export default function Footer() {
    return (
        <footer className="bg-black py-8 border-t border-white/10 text-white/60 text-sm">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p>&copy; 2024 ANTI FLUXO. Todos os direitos reservados.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">
                        Termos de Uso
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        Política de Privacidade
                    </a>
                </div>
            </div>
        </footer>
    );
}
