"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mariana Silva",
    text: "Economizei muito com os links do grupo. Já comprei fone e teclado com os menores preços.",
    avatar: "/assets/avatar-1.png",
    role: "Membro há 6 meses",
  },
  {
    name: "Ricardo Mendes",
    text: "A curadoria é excelente e as promoções são reais mesmo. Recomendo para todos.",
    avatar: "/assets/avatar-2.png",
    role: "Membro há 3 meses",
  },
  {
    name: "Ana Costa",
    text: "Grupo organizado e sem spam. Recebo só o que interessa e já garanti vários descontos.",
    avatar: "https://i.pravatar.cc/150?u=5",
    role: "Membro há 1 ano",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">O que dizem nossos membros</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-8"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-accent-neon text-accent-neon" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-8">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800">
                  <Image src={t.avatar} alt={t.name} width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
