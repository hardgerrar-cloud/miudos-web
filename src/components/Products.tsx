"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AlertCircle } from "lucide-react";

const products = [
  {
    name: "Moda e Roupas",
    description: "Exemplo: Kit Calça Jeans Masculina com Elastano",
    oldPrice: "De R$ 139,75",
    newPrice: "Por R$ 115,99",
    discount: "Achado Recente",
    image: "/assets/product-headphones.png", // Keeping the original image paths, we can assume the user will replace them later if needed
  },
  {
    name: "Beleza e Cuidados",
    description: "Produtos úteis e bem avaliados com preço conferido.",
    oldPrice: "",
    newPrice: "Melhor preço",
    discount: "Conferido",
    image: "/assets/product-smartwatch.png",
  },
  {
    name: "Casa, Utilidades e Tecnologia",
    description: "Itens práticos para o dia a dia e acessórios úteis.",
    oldPrice: "",
    newPrice: "Ofertas diárias",
    discount: "Praticidade",
    image: "/assets/product-gadget.png",
  },
];

export default function Products() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-neon/5 blur-[150px] rounded-full -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Exemplos de achados que podem aparecer no grupo</h2>
          <p className="text-gray-400">
            Enviamos diversas categorias. <span className="text-accent-neon font-semibold">Atenção:</span> os preços podem mudar conforme o estoque, cupons e disponibilidade das lojas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 group hover:bg-white/[0.08] transition-all flex flex-col"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 mb-6 flex items-center justify-center p-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-contain group-hover:scale-110 transition-transform duration-500 opacity-60"
                />
                <div className="absolute top-4 right-4 bg-accent-neon text-primary-dark font-black text-xs px-3 py-1 rounded-full">
                  {product.discount}
                </div>
              </div>

              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-400 mb-4 flex-grow">{product.description}</p>
              
              <div className="flex flex-col gap-1">
                {product.oldPrice && (
                  <span className="text-gray-500 line-through text-sm">{product.oldPrice}</span>
                )}
                <span className="text-accent-neon font-bold text-xl">{product.newPrice}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
           <p className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-4 py-2 rounded-lg">
             <AlertCircle className="w-4 h-4 text-orange-400" />
             Promoções sujeitas a alteração a qualquer momento. O Miúdos Web não vende produtos diretos.
           </p>
        </div>
      </div>
    </section>
  );
}
