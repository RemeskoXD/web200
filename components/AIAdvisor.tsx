
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Mail, CheckCircle2, Hammer, BrainCircuit } from 'lucide-react';
import { SectionID } from '../types';
import { trackMarketingLead } from '../services/mockDatabase';

const AIAdvisor: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setError('Prosím zadejte platný e-mail.');
      return;
    }
    
    // Save locally and track in DB
    trackMarketingLead(emailInput); 
    setSubmitted(true);
    setError(null);
  };

  return (
    <section id={SectionID.AI} className="py-24 bg-gradient-to-b from-dark to-slate-900 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-card rounded-3xl p-1 shadow-2xl border border-primary/20 overflow-hidden">
          <div className="bg-dark/90 p-8 md:p-12 rounded-[22px] backdrop-blur-xl relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center">
             
             {/* Abstract background effect */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10"></div>

             <div className="mb-8 relative">
               <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
               <div className="relative p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 shadow-2xl">
                 <BrainCircuit className="w-16 h-16 text-primary" />
                 
                 {/* Construction badge */}
                 <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Hammer size={10} />
                    <span>VE VÝVOJI</span>
                 </div>
               </div>
             </div>

             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
               AI Nutri-Asistent <span className="text-primary">2.0</span>
             </h2>
             
             <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
               Pracujeme na tréninku umělé inteligence, která Vám bude schopna okamžitě poradit s jídelníčkem a tréninkem na základě Vašich dat z InBody.
               <br/><br/>
               <span className="text-white font-medium">Spuštění plánujeme brzy!</span>
             </p>

             {/* EMAIL NOTIFICATION FORM */}
             <AnimatePresence mode="wait">
               {!submitted ? (
                 <motion.div 
                   key="form"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="w-full max-w-md"
                 >
                   <form onSubmit={handleEmailSubmit} className="relative">
                     <div className="relative flex items-center">
                       <Mail className="absolute left-4 text-gray-500" size={20} />
                       <input
                         type="email"
                         placeholder="Váš e-mail pro upozornění..."
                         value={emailInput}
                         onChange={(e) => setEmailInput(e.target.value)}
                         className="w-full bg-slate-800/80 border border-white/10 rounded-xl py-4 pl-12 pr-32 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                         required
                       />
                       <button 
                         type="submit"
                         className="absolute right-2 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-all shadow-lg"
                       >
                         Sledovat
                       </button>
                     </div>
                     {error && (
                        <p className="text-red-400 text-sm mt-3 text-left pl-2">
                           {error}
                        </p>
                     )}
                     <p className="text-gray-500 text-xs mt-4">
                       Zanecháním e-mailu získáte přednostní přístup k beta verzi zdarma.
                     </p>
                   </form>
                 </motion.div>
               ) : (
                 <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex flex-col items-center"
                 >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black mb-3 shadow-lg shadow-green-500/20">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Děkujeme!</h3>
                    <p className="text-green-200/80 text-sm">
                      Dáme Vám vědět hned, jak bude asistent připraven.
                    </p>
                 </motion.div>
               )}
             </AnimatePresence>
             
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisor;
