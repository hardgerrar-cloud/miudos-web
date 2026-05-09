# Miúdos Web - Landing Page de Alta Conversão

Uma landing page moderna, minimalista e extremamente otimizada para conversão, desenvolvida com as tecnologias mais atuais do mercado. Focada em levar pessoas para grupos de WhatsApp de ofertas e achadinhos.

![Miúdos Web](public/assets/character.png)

## 🚀 Tecnologias Utilizadas

- **Next.js 15+** (App Router)
- **TypeScript**
- **TailwindCSS** (Estilização Premium)
- **Framer Motion** (Animações Fluídas)
- **Lucide React** (Ícones Modernos)

## 🛠️ Instalação e Execução

1.  **Instalar dependências:**
    ```bash
    npm install
    ```

2.  **Executar em modo desenvolvimento:**
    ```bash
    npm run dev
    ```

3.  **Gerar build de produção:**
    ```bash
    npm run build
    ```

## 🌐 Deploy na Vercel

O projeto está pronto para ser hospedado na Vercel:

1.  Conecte seu repositório GitHub à Vercel.
2.  A plataforma detectará automaticamente o Next.js.
3.  Clique em **Deploy**.

## 📝 Como Personalizar

### Alterar Links do WhatsApp
Os links estão centralizados nos seguintes componentes:
- `src/components/Navbar.tsx`
- `src/components/Hero.tsx`
- `src/components/CTA.tsx`

Basta substituir a URL `https://chat.whatsapp.com/...` pela sua URL oficial.

### Alterar Textos e Imagens
- **Textos:** Estão localizados dentro da pasta `src/components/` em seus respectivos arquivos TSX.
- **Imagens:** As imagens principais estão em `public/assets/`. Para trocar, substitua os arquivos mantendo o mesmo nome ou atualize o caminho no código.

## 📈 SEO e Performance
- Metadata configurada em `src/app/layout.tsx`.
- Imagens otimizadas com `next/image`.
- Design Mobile-First focado em tráfego pago (Ads).

---
Desenvolvido com foco em alta conversão e experiência do usuário.
