"use client";

import { motion } from "framer-motion";
import { Users, LayoutList, MessageSquareOff } from "lucide-react";

export default function SocialProof() {
  const cards = [
    {
      icon: Users,
      value: "Grupo nº 51",
      description: "Este grupo é novo, mas faz parte de uma operação que já existe.",
    },
    {
      icon: LayoutList,
      value: "+50 grupos criados",
      description: "Abrimos novos grupos para manter tudo organizado.",
    },
    {
      icon: Users,
      value: "+50 mil pessoas",
      description: "Pessoas somadas nos grupos do Miúdos Web.",
    },
    {
      icon: MessageSquareOff,
      value: "Zero flood",
      description: "Só administradores enviam mensagens. Sem tio dando bom dia.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-black/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Não é só mais um grupo de promoção.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            O Miúdos Web já criou mais de 50 grupos de achados e reúne milhares de pessoas acompanhando promoções, cupons e oportunidades todos os dias.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 text-center flex flex-col items-center justify-center hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 bg-accent-neon/10 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-accent-neon" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{card.value}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
