"use client";

const brands = [
  "SHOPEE",
  "AMAZON",
  "MERCADO LIVRE",
  "MAGALU",
  "CASAS BAHIA",
  "NIKE",
  "ADIDAS",
  "DAFITI",
  "KABUM",
  "LACOSTE"
];

export default function BrandsMarquee() {
  return (
    <section className="py-12 bg-white/5 border-y border-white/10 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Achados de lojas e plataformas que você já conhece</h2>
        <p className="text-sm text-gray-400 max-w-3xl mx-auto">
          Os links podem direcionar para plataformas parceiras e lojas conhecidas. O Miúdos Web não vende diretamente os produtos e não representa oficialmente essas marcas.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Gradients to fade the edges */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-primary-dark to-transparent z-10" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-primary-dark to-transparent z-10" />

        <div className="animate-marquee-slow whitespace-nowrap flex items-center">
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <span key={index} className="mx-8 text-2xl md:text-4xl font-black text-white/20 uppercase">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
