
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Apple, Carrot, Leaf, ArrowRight, Award, Users, Clock, Activity, CheckCircle2 } from 'lucide-react';
import { SectionID } from '../types';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const scrollToAbout = () => {
    document.getElementById(SectionID.ABOUT)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} id={SectionID.HOME} className="relative min-h-screen flex items-center overflow-hidden bg-[#f0fdf4]">
      
      {/* Decorative Organic Blobs with Parallax */}
      <motion.div 
        style={{ y: blob1Y }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"
      ></motion.div>
      <motion.div 
        style={{ y: blob2Y }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"
      ></motion.div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 pt-24 lg:pt-0">
        
        {/* Text Content */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="inline-block px-5 py-2.5 bg-white rounded-full shadow-sm mb-8 border border-primary/20">
            <span className="text-primary font-bold uppercase text-sm tracking-widest flex items-center gap-2">
              <Leaf size={16} /> Přestaňte hádat, začněte měřit
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-black text-dark mb-8 leading-tight">
            Zdraví není náhoda, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">
              ale volba.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed mb-10 max-w-xl">
            Zapomeňte na diety z časopisů. Postavím Váš úspěch na <b>přesných datech</b> z diagnostiky InBody a individuálním lidském přístupu. 
            Pochopíte své tělo a dosáhnete výsledků, které vydrží.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mb-12">
             <button 
               onClick={() => document.getElementById(SectionID.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
               className="px-10 py-5 bg-primary text-white font-bold text-xl rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-200 hover:shadow-green-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
             >
               Chci se cítit lépe <ArrowRight size={22} />
             </button>
             <button 
               onClick={scrollToAbout}
               className="px-10 py-5 bg-white text-dark font-bold text-xl rounded-2xl border border-gray-200 hover:border-primary/50 hover:bg-gray-50 transition-all"
             >
               Můj příběh
             </button>
          </div>
          
          {/* Mini Stats Grid */}
          <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
            <div>
              <div className="flex items-center gap-2 text-primary mb-1">
                <Users size={20} />
                <span className="font-bold text-2xl text-dark">500+</span>
              </div>
              <p className="text-sm font-medium text-gray-500">Spokojených klientů</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-secondary mb-1">
                <Award size={20} />
                <span className="font-bold text-2xl text-dark">100%</span>
              </div>
              <p className="text-sm font-medium text-gray-500">Profesionální péče</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-blue-500 mb-1">
                <Clock size={20} />
                <span className="font-bold text-2xl text-dark">60 min</span>
              </div>
              <p className="text-sm font-medium text-gray-500">Délka konzultace</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Image / Illustration */}
        <div className="relative h-[600px] lg:h-[800px] hidden lg:flex items-center justify-center">
           
           {/* Abstract Circle Background */}
           <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-green-200/50 to-primary/20 rounded-full blur-3xl"></div>

           {/* Floating Icons Background */}
           <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-10 text-secondary opacity-30 z-0"
           >
              <Carrot size={80} />
           </motion.div>
           <motion.div 
              animate={{ y: [15, -15, 15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-32 left-0 text-primary opacity-30 z-0"
           >
              <Apple size={70} />
           </motion.div>

           {/* Main Visual Composition */}
           <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.8 }}
             className="relative z-10 w-full max-w-lg"
           >
              {/* Main Image with Organic Shape */}
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-white">
                <img 
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1200&auto=format&fit=crop" 
                  alt="Healthy lifestyle man" 
                  className="w-full h-[600px] object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-8 left-8 right-8 text-white">
                   <p className="font-bold text-lg italic mb-2">"Nejvíc mě baví vidět, jak se lidem vrací sebevědomí a energie do života."</p>
                   <p className="text-primary-light font-bold text-sm">- Ondřej Hlatký</p>
                </div>
              </div>

              {/* Floating Card 1: InBody */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -right-8 top-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 max-w-[200px]"
              >
                 <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <Activity size={24} />
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Diagnostika</p>
                    <p className="font-bold text-dark">InBody 580</p>
                 </div>
              </motion.div>

              {/* Floating Card 2: Meal Plan */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -left-8 bottom-32 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 max-w-[220px]"
              >
                 <div className="bg-green-100 p-3 rounded-xl text-green-600">
                    <CheckCircle2 size={24} />
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Plán na míru</p>
                    <p className="font-bold text-dark">Žádné hladovění</p>
                 </div>
              </motion.div>

           </motion.div>
        </div>

      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer text-gray-400 hover:text-primary transition-colors"
        onClick={scrollToAbout}
      >
        <ChevronDown size={40} />
      </motion.div>
    </section>
  );
};

export default Hero;
