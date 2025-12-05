
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Petr Novák",
    role: "Manažer, 42 let",
    result: "-15 kg za 6 měsíců",
    text: "Ondra mi neukázal jen co jíst, ale naučil mě, jak nad jídlem přemýšlet. Žádné hladovění, jen pochopení vlastního těla. InBody výsledky nelžou."
  },
  {
    name: "Jana Svobodová",
    role: "Maminka na MD, 35 let",
    result: "Návrat energie a formy",
    text: "Bála jsem se, že to s dětmi nezvládnu. Přístup byl ale tak lidský a flexibilní, že se zdravý životní styl stal přirozenou součástí mé rodiny."
  },
  {
    name: "Marek Dvořák",
    role: "Amatérský sportovec",
    result: "Nárůst svalové hmoty +4kg",
    text: "Myslel jsem, že jím zdravě, ale až diagnostika mi ukázala, kde dělám chybu. Díky úpravě makroživin se mé výkony posunuly o level výš."
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-4 border-white"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border-8 border-white"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-white/80 font-bold tracking-widest uppercase text-sm">Příběhy klientů</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-black text-white mt-2">
            Výsledky, které mění život
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-2xl relative"
            >
              <Quote className="absolute top-8 right-8 text-primary/10 w-16 h-16 fill-current" />
              
              <div className="mb-6">
                 <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-4">
                    {t.result}
                 </div>
                 <p className="text-gray-600 text-lg leading-relaxed italic">"{t.text}"</p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-dark">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
