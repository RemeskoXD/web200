
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, Brain, Activity } from 'lucide-react';

const stats = [
  {
    icon: <AlertCircle size={32} />,
    value: "95%",
    label: "Diet selhává",
    description: "Studie ukazují, že 95 % diet založených pouze na odhadu kalorií končí do 5 let jo-jo efektem. Diagnostika je klíčem k udržitelnosti."
  },
  {
    icon: <TrendingUp size={32} />,
    value: "3-8%",
    label: "Ztráta svalů",
    description: "Každou dekádu po 30. roce života ztrácíme 3–8 % svalové hmoty (sarkopenie), pokud necvičíme a nejíme dostatek bílkovin."
  },
  {
    icon: <Brain size={32} />,
    value: "20%",
    label: "Spotřeba energie",
    description: "Váš mozek spotřebuje až 20 % denního energetického příjmu. Kvalitní strava přímo ovlivňuje soustředění a psychickou pohodu."
  },
  {
    icon: <Activity size={32} />,
    value: "600+",
    label: "Svalů v těle",
    description: "Máme přes 600 svalů. InBody dokáže zjistit, zda jsou rovnoměrně vyvinuté, nebo zda hrozí dysbalance a bolest zad."
  }
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">Věda a Data</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">
            Proč je měření důležitější než vážení?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Lidské tělo je komplexní biochemická továrna. Spoléhat se pouze na číslo na váze je jako řídit auto podle tachometru, ale nevidět na palivo a teplotu motoru. Podívejte se na fakta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors"
            >
              <div className="text-primary mb-4">{stat.icon}</div>
              <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-lg font-bold text-gray-200 mb-4">{stat.label}</div>
              <p className="text-gray-400 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
                Zdroje: WHO (World Health Organization), InBody Clinical Research, National Institutes of Health
            </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
