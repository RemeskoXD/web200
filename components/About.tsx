
import React from 'react';
import { motion } from 'framer-motion';
import { STORY_TEXT } from '../constants';
import { SectionID } from '../types';
import { Heart, Star, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id={SectionID.ABOUT} className="py-28 bg-white relative">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row gap-20 items-start">
          
          {/* Visual Side */}
          <div className="w-full md:w-1/2 relative">
             <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
               <img 
                 src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" 
                 alt="Osobní přístup" 
                 className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-2xl font-serif italic">"Povedlo se."</p>
               </div>
             </div>

             {/* Stats Cards */}
             <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-10 -right-5 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-xs z-10"
             >
                <div className="flex items-center gap-5 mb-3">
                   <div className="p-4 bg-secondary/10 rounded-full text-secondary">
                      <Users size={28} />
                   </div>
                   <div>
                      <p className="text-sm text-gray-500 uppercase font-bold">Přístup</p>
                      <p className="font-bold text-xl text-dark">Pro každého</p>
                   </div>
                </div>
                <p className="text-base text-gray-500 leading-relaxed">Ať jste vrcholový sportovec nebo úplný začátečník, najdeme společnou cestu.</p>
             </motion.div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary font-bold tracking-wider uppercase text-base mb-4">Můj příběh</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-10 leading-tight">
                Cesta k výsledkům, které <span className="underline decoration-secondary decoration-4 underline-offset-4">zůstávají</span>.
              </h3>
              
              <div className="space-y-8 text-gray-600 leading-relaxed text-lg md:text-xl">
                {STORY_TEXT.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className={paragraph.includes('SILNĚJŠÍMI') ? 'text-primary font-bold text-2xl border-l-4 border-primary pl-6 py-2 bg-green-50/50 rounded-r-xl' : ''}>
                      {paragraph}
                    </p>
                  )
                ))}
              </div>

              <div className="mt-12 flex gap-10">
                <div className="flex items-center gap-3">
                  <Heart className="text-red-500 fill-current w-6 h-6" />
                  <span className="font-bold text-dark text-lg">Empatie</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="text-yellow-400 fill-current w-6 h-6" />
                  <span className="font-bold text-dark text-lg">Profesionalita</span>
                </div>
              </div>

              <div className="mt-14">
                <p className="font-heading text-3xl text-dark font-bold">
                  Hlatký Ondřej <span className="text-gray-400 font-normal text-xl block mt-1">Váš výživový poradce</span>
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
