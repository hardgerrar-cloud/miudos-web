"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Clique em Entrar no grupo",
    description: "Você será enviado para o WhatsApp.",
  },
  {
    title: "Entre no grupo silencioso",
    description: "Só administradores enviam ofertas, então o grupo fica limpo e organizado.",
  },
  {
    title: "Acompanhe os achados",
    description: "Quando aparecer uma oferta interessante, você recebe o link direto no grupo.",
  },
  {
    title: "Compre na plataforma parceira",
    description: "O Miúdos Web divulga achados. A compra acontece diretamente na Shopee ou plataforma parceira.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Como Funciona</h2>
          <p className="text-gray-400">Quatro passos simples para economizar.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-8 glass"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-accent-neon text-primary-dark rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
