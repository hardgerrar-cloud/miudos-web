"use client";


const triggers = [
  "PROMOÇÕES TODO DIA",
  "ACHADOS CONFERIDOS",
  "ZERO FLOOD",
  "GRUPO SILENCIOSO",
  "SÓ ADMINS ENVIAM",
  "+50 GRUPOS CRIADOS",
  "+50 MIL PESSOAS NOS GRUPOS",
  "100% GRATUITO",
  "O MIÚDOS WEB GARIMPA",
  "BUGS DE PREÇO QUANDO APARECEM",
  "CUPONS E ACHADINHOS",
  "MODA, CASA, BELEZA E TECNOLOGIA"
];

export default function AnimatedMarquee() {
  return (
    <div className="relative flex overflow-x-hidden bg-accent-neon text-primary-dark font-bold py-3 -rotate-1 shadow-[0_0_20px_rgba(0,255,136,0.3)] z-20">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {/* We duplicate the array to create a seamless loop */}
        {[...triggers, ...triggers, ...triggers].map((trigger, index) => (
          <span key={index} className="mx-4 text-sm md:text-base tracking-wider uppercase flex items-center">
            {trigger}
            <span className="mx-4 text-primary-dark/30">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
