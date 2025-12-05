
import React from 'react';
import { motion } from 'framer-motion';
import { SectionID } from '../types';
import { Activity, BarChart3, PieChart, Scale, Info } from 'lucide-react';

const InBodyShowcase: React.FC = () => {
  return (
    <section id={SectionID.INBODY} className="py-28 bg-white">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-base">Technologie budoucnosti</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-black text-dark mb-8">Co všechno o sobě zjistíte?</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Díky špičkovému přístroji InBody 580 získáte detailní pohled do svého těla. 
            Výsledky vidíte přehledně v grafech, které vám osobně vysvětlím a naučím vás s nimi pracovat.
          </p>
        </div>

        {/* Feature Grid based on Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Card 1: Composition */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-5 mb-8">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
                <PieChart size={36} />
              </div>
              <h4 className="text-2xl font-bold text-dark">Složení těla</h4>
            </div>
            <p className="text-lg text-gray-600 mb-6">
                Zjistíme přesný poměr čtyřř hlavních složek vašeho organismu. Nerovnováha může signalizovat zdravotní potíže.
            </p>
            <ul className="space-y-5">
              <li className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-gray-700 font-medium text-lg">Celková voda v těle (TBW)</span>
                <span className="font-bold text-primary">Diagnostika otoků</span>
              </li>
              <li className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                 <span className="text-gray-700 font-medium text-lg">Proteiny & Minerály</span>
                 <span className="font-bold text-secondary">Stav kostí</span>
              </li>
              <li className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                 <span className="text-gray-700 font-medium text-lg">Tuková hmota</span>
                 <span className="font-bold text-yellow-500">Přesné kg</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 2: Muscle & Fat */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-5 mb-8">
              <div className="p-4 bg-green-100 text-green-600 rounded-2xl">
                <Activity size={36} />
              </div>
              <h4 className="text-2xl font-bold text-dark">Svaly vs. Tuk</h4>
            </div>
            <p className="text-lg text-gray-600 mb-6">
                Grafické porovnání, které odhalí pravdu. BMI index je zastaralý – svaly váží více než tuk, proto můžete vážit více, a přitom být zdravější.
            </p>
            
            {/* Simple Graph Visualization */}
            <div className="space-y-5 mt-8 font-mono text-sm text-gray-500 bg-white p-6 rounded-2xl border border-gray-100">
               <div className="flex items-center gap-3">
                  <span className="w-16 font-bold text-dark">Váha</span>
                  <div className="flex-1 bg-gray-100 h-4 rounded-full overflow-hidden relative">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '60%' }} transition={{ duration: 1 }} className="h-full bg-gray-400 rounded-full"></motion.div>
                  </div>
                  <span className="text-xs">100%</span>
               </div>
               <div className="flex items-center gap-3">
                  <span className="w-16 font-bold text-dark">Svaly</span>
                  <div className="flex-1 bg-gray-100 h-4 rounded-full overflow-hidden relative">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-primary rounded-full"></motion.div>
                  </div>
                  <span className="text-xs text-primary font-bold">120% (Silný typ)</span>
               </div>
               <div className="flex items-center gap-3">
                  <span className="w-16 font-bold text-dark">Tuk</span>
                  <div className="flex-1 bg-gray-100 h-4 rounded-full overflow-hidden relative">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '40%' }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-yellow-400 rounded-full"></motion.div>
                  </div>
                  <span className="text-xs">80%</span>
               </div>
            </div>
          </motion.div>

          {/* Card 3: Visceral Fat */}
          <motion.div 
             whileHover={{ y: -5 }}
             className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-sm md:col-span-2 flex flex-col lg:flex-row gap-12"
          >
             <div className="flex-1">
                <div className="flex items-center gap-5 mb-6">
                  <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl">
                    <Scale size={36} />
                  </div>
                  <h4 className="text-2xl font-bold text-dark">Viscerální tuk: Tichá hrozba</h4>
                </div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Viscerální tuk se ukládá v břišní dutině kolem orgánů. Není vidět a často ho mají i štíhlí lidé ("TOFI" - Thin Outside, Fat Inside).
                  Zvyšuje riziko cukrovky a srdečních chorob.
                </p>
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 mb-6">
                    <h5 className="flex items-center gap-2 font-bold text-orange-800 mb-2">
                        <Info size={18} /> Proč to měřit?
                    </h5>
                    <p className="text-orange-700/80 italic">
                        "Hodnota nad 100 cm² značí zvýšené zdravotní riziko. Snížením viscerálního tuku přímo prodlužujete svůj život."
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 text-base font-bold text-primary">
                   <span className="px-4 py-2 bg-white rounded-full border border-primary/20">✓ Prevence infarktu</span>
                   <span className="px-4 py-2 bg-white rounded-full border border-primary/20">✓ Kontrola diabetu</span>
                </div>
             </div>
             
             {/* Visual representation of Visceral Fat Level */}
             <div className="w-full lg:w-1/3 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
                <div className="text-center mb-4 font-bold text-gray-400 text-sm uppercase tracking-wider">Úroveň viscerálního tuku</div>
                <div className="flex items-end justify-center gap-2 h-40 mb-4">
                   {[1,2,3,4,5,6,7,8,9,10].map((level) => (
                      <motion.div 
                        key={level}
                        initial={{ height: '10%' }}
                        whileInView={{ height: `${level * 10}%` }}
                        transition={{ delay: level * 0.1 }}
                        className={`w-6 rounded-t-lg ${level > 9 ? 'bg-red-500' : level > 5 ? 'bg-yellow-400' : 'bg-green-500'} opacity-80 hover:opacity-100 transition-opacity`}
                      />
                   ))}
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-400 border-t border-gray-100 pt-3">
                   <span className="text-green-600">Zdravé normy</span>
                   <span className="text-red-500">Riziko</span>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default InBodyShowcase;
