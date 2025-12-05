
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES, getIcon } from '../constants';
import { Check } from 'lucide-react';
import { SectionID } from '../types';

const Services: React.FC = () => {
  return (
    <section id={SectionID.SERVICES} className="py-28 bg-light relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
       
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="bg-primary/10 text-primary px-5 py-2 rounded-full font-bold text-sm uppercase tracking-wider">Moje Služby</span>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-dark mt-6">
             Komplexní péče o Vaše tělo
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Nespoléhejte na dohady. Nabízím služby založené na měřitelných datech a odborných znalostech.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`group relative bg-white rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col ${index === 1 ? 'md:-translate-y-8 shadow-xl border-primary/20 ring-4 ring-primary/5' : ''}`}
            >
              <div className="p-10 flex flex-col h-full">
                <div className="mb-8 w-20 h-20 bg-gradient-to-br from-primary-light to-white rounded-2xl flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform duration-500">
                  {getIcon(service.icon)}
                </div>
                
                <h4 className="text-2xl md:text-3xl font-bold text-dark mb-6">{service.title}</h4>
                <p className="text-gray-600 mb-10 leading-relaxed text-lg flex-grow">
                  {service.description}
                </p>
                
                {service.details && (
                  <div className="space-y-4 pt-8 border-t border-gray-100 mt-auto">
                    {service.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="bg-green-100 rounded-full p-1.5 mt-0.5 min-w-fit">
                          <Check className="w-4 h-4 text-primary stroke-[3]" />
                        </div>
                        <span className="text-base text-gray-700 font-semibold">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Bottom Decoration */}
              <div className="h-3 w-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
