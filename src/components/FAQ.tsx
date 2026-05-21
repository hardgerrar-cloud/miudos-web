"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "É gratuito?",
    answer: "Sim. A entrada no grupo é 100% gratuita.",
  },
  {
    question: "O grupo tem spam?",
    answer: "Não. O grupo é silencioso e apenas administradores enviam mensagens.",
  },
  {
    question: "O Miúdos Web vende os produtos?",
    answer: "Não. O Miúdos Web divulga achados e ofertas. A compra acontece diretamente na Shopee ou plataforma parceira.",
  },
  {
    question: "Os preços são fixos?",
    answer: "Não. Preços, cupons e estoque podem mudar conforme a loja e disponibilidade.",
  },
  {
    question: "Posso sair do grupo?",
    answer: "Sim. Você pode sair quando quiser, sem nenhuma restrição.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-400">Tudo o que você precisa saber antes de entrar.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-accent-neon transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-400">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
