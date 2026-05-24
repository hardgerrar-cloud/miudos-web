"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Carlos M.",
      text: "Peguei a cafeteira por R$ 1 e achei que ia cancelar. Chegou certinho.",
    },
    {
      name: "Ana P.",
      text: "Entrei no grupo e no mesmo dia já aproveitei uma oferta que eu nem teria visto.",
    },
    {
      name: "Fernanda R.",
      text: "O melhor é que o grupo não tem conversa aleatória. Só chegam as ofertas.",
    },
    {
      name: "João V.",
      text: "Já indiquei para minha família porque é muito mais prático do que ficar procurando.",
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-black/40">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">O que estão falando</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Não precisa acreditar só na gente. Olha o que a galera fala quando consegue pegar um achado bom.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 flex flex-col gap-4"
            >
              <MessageSquareQuote className="w-10 h-10 text-accent-neon opacity-50" />
              <p className="text-lg md:text-xl font-medium flex-1 text-gray-200">
                &quot;{testimonial.text}&quot;
              </p>
              <p className="font-bold text-gray-400">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
