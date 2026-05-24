export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-black/40">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-4 mb-8">
          <p className="text-sm text-gray-500">
            <strong>O Miúdos Web não é loja.</strong> Não vendemos produtos diretamente. A compra acontece na Shopee ou em plataformas parceiras.
          </p>
          <p className="text-sm text-gray-500">
            Preços, cupons e estoque podem mudar a qualquer momento e são de inteira responsabilidade das lojas. Alguns links enviados no grupo podem ser de afiliado.
          </p>
          <p className="text-sm text-gray-500">
            A participação no grupo é 100% gratuita, o grupo é silencioso e você pode sair quando quiser.
          </p>
        </div>
        
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Miúdos Web. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
