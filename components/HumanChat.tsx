
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createTicket } from '../services/mockDatabase';

const HumanChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showBubble, setShowBubble] = useState(false);

  // Show the marketing bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    
    createTicket(formData.name, formData.email, formData.message);
    setStep('success');
    
    // Reset after delay
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        setStep('form');
        setFormData({ name: '', email: '', message: '' });
      }, 500);
    }, 3000);
  };

  // Profile image URL (matching the style of the website)
  const profileImage = "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop";

  return (
    <>
      {/* Marketing Bubble (Tooltip) */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-30 bg-white px-4 py-3 rounded-2xl shadow-xl border border-gray-100 max-w-[200px] hidden md:block"
          >
            <div className="text-sm text-dark font-bold relative">
              👋 Mohu Vám pomoci s jídelníčkem?
              <div className="absolute -bottom-5 right-6 w-4 h-4 bg-white transform rotate-45 border-b border-r border-gray-100"></div>
            </div>
            <button 
              onClick={() => setShowBubble(false)} 
              className="absolute -top-2 -left-2 bg-gray-200 rounded-full p-0.5 text-gray-500 hover:bg-gray-300"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button - Z-Index set to 40 to be below Navbar (50) */}
      <motion.button
        onClick={() => { setIsOpen(true); setShowBubble(false); }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 z-40 bg-primary text-white p-1 pr-6 rounded-full shadow-2xl hover:bg-green-700 transition-all flex items-center gap-3 group border-4 border-white/20"
      >
        <div className="relative">
          <img 
            src={profileImage} 
            alt="Ondřej Hlatký" 
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></div>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs font-normal text-green-100 uppercase tracking-wider">Online</span>
          <span className="font-bold text-sm whitespace-nowrap">Napsat zprávu</span>
        </div>
      </motion.button>

      {/* Chat Window - Z-Index 50 (same as navbar, but usually opens over page content) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[340px] md:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                   <img 
                    src={profileImage} 
                    alt="Ondřej Hlatký" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-primary rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Ondřej Hlatký</h3>
                  <p className="text-xs text-green-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></span>
                    Odpovídám obvykle do 24h
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white relative z-10 hover:bg-white/10 p-1 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 bg-slate-50 min-h-[320px]">
              {step === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="bg-white p-3 rounded-xl rounded-tl-none border border-gray-100 shadow-sm text-sm text-gray-600 mb-6">
                    Dobrý den! 👋<br/>
                    Zajímá vás jídelníček na míru nebo diagnostika? Napište mi, rád poradím.
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Vaše jméno"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-white"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Váš e-mail (pro odpověď)"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-white"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <textarea
                      placeholder="Napište svou zprávu..."
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm resize-none bg-white"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100 hover:shadow-green-200 hover:-translate-y-0.5"
                  >
                    <Send size={18} /> Odeslat zprávu
                  </button>
                </form>
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="w-20 h-20 bg-green-100 text-primary rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-dark mb-2">Zpráva odeslána!</h3>
                  <p className="text-gray-500 text-sm max-w-[250px]">
                    Děkuji. Odpověď Vám pošlu na <strong>{formData.email}</strong> co nejdříve.
                  </p>
                </div>
              )}
            </div>
            
            {/* Footer decoration */}
            <div className="bg-white p-3 text-center text-[10px] text-gray-400 border-t border-gray-100 flex justify-center items-center gap-1">
              <span>Hlatký Nutrition</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>Premium Care</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HumanChat;