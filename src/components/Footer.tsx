import { MessageCircle, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-2xl font-black mb-4">
              MIÚDOS<span className="text-accent-neon">WEB</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              Curadoria de ofertas reais e achadinhos úteis todos os dias no seu WhatsApp.
            </p>
          </div>

          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end gap-6 mb-4">
              <a href="#" className="text-gray-400 hover:text-accent-neon transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-neon transition-colors">
                <Globe className="w-6 h-6" />
              </a>
            </div>
            <p className="text-xs text-gray-600">
              &copy; 2026 Miúdos Web. Todos os direitos reservados.<br />
              Ofertas e preços podem variar de acordo com o estoque das lojas.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
