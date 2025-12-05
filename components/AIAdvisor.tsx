
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot, Lightbulb, AlertCircle, Lock, Mail, Activity, CheckCircle2 } from 'lucide-react';
import { getHealthTip } from '../services/geminiService';
import { SectionID } from '../types';
import { trackMarketingLead } from '../services/mockDatabase';

const DiagnosticLoader: React.FC<{ progress: number }> = ({ progress }) => {
  // Color calculation: Red -> Yellow -> Green
  const getColor = (p: number) => {
    if (p < 40) return '#ef4444'; // Red
    if (p < 80) return '#eab308'; // Yellow
    return '#22c55e'; // Green
  };

  const currentColor = getColor(progress);

  // Status messages based on progress
  const getStatusText = (p: number) => {
    if (p < 25) return "Inicializace skenu...";
    if (p < 50) return "Analýza klíčových slov...";
    if (p < 75) return "Porovnávání studií...";
    if (p < 95) return "Syntéza doporučení...";
    return "Dokončování...";
  };

  return (
    <div className="relative w-full max-w-lg mx-auto py-10 flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-black/20 border border-white/5">
      
      {/* Background Grid Animation */}
      <div className="absolute inset-0 opacity-20">
         <div className="w-full h-full bg-[linear-gradient(to_right,#22c55e15_1px,transparent_1px),linear-gradient(to_bottom,#22c55e15_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
      
      {/* Scanning Bar Effect */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-primary/50 blur-sm shadow-[0_0_15px_rgba(34,197,94,0.6)]"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 w-48 h-48 flex items-center justify-center">
        {/* Outer Rotating Ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-dashed border-gray-600/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Active Ring */}
        <motion.div 
          className="absolute inset-2 rounded-full border-t-2 border-r-2 border-primary/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Counter Ring */}
        <motion.div 
          className="absolute inset-4 rounded-full border-b-2 border-l-2 border-primary/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Progress SVG Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 p-6 drop-shadow-xl">
          <circle
            cx="50%"
            cy="50%"
            r="44%"
            stroke="#1e293b"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="44%"
            stroke={currentColor}
            strokeWidth="8"
            fill="none"
            strokeDasharray="276" // Approx circ
            strokeDashoffset={276 - (276 * progress) / 100}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="flex flex-col items-center relative z-10">
          <motion.span 
            className="text-5xl font-black font-mono tracking-tighter"
            style={{ color: currentColor }}
          >
            {Math.round(progress)}%
          </motion.span>
          <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mt-1">
            Proces
          </span>
        </div>
      </div>
      
      {/* Dynamic Status Text */}
      <div className="mt-8 text-center relative z-10 min-h-[60px]">
        <motion.div
           key={getStatusText(progress)}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-lg font-bold text-white tracking-wide"
        >
           {progress === 100 ? "Hotovo!" : getStatusText(progress)}
        </motion.div>

        {/* Fake Data Stream Visual */}
        <div className="flex gap-1 justify-center mt-3 opacity-60">
           {[1,2,3,4,5,6].map(i => (
              <motion.div 
                key={i}
                className="w-1 bg-primary"
                animate={{ height: [4, 16, 4], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              />
           ))}
        </div>
      </div>
    </div>
  );
};

const AIAdvisor: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  
  // Custom Loading State
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [error, setError] = useState<string | null>(null);
  
  // Auth/Gate State
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [showEmailGate, setShowEmailGate] = useState(true);

  // Refs for animation intervals
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Check if user already provided email in this browser
    const storedEmail = localStorage.getItem('hlatky_user_email');
    if (storedEmail) {
      setUserEmail(storedEmail);
      setShowEmailGate(false);
    }

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setError('Prosím zadejte platný e-mail.');
      return;
    }
    
    // Save locally and track in DB
    localStorage.setItem('hlatky_user_email', emailInput);
    setUserEmail(emailInput);
    trackMarketingLead(emailInput); // Initial tracking
    
    setShowEmailGate(false);
    setError(null);
  };

  const startScanningAnimation = () => {
    setProgress(0);
    // Increment progress artificially
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        // Slow down as we approach 90% if the API is still thinking
        if (prev >= 90) return 90; 
        // Random increment for "realism"
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 50);
  };

  const completeScanning = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    // Fast forward to 100
    setProgress(100);
  };

  const performSearch = async (searchText: string) => {
    if (!searchText.trim()) return;
    
    // Tracking usage
    if (userEmail) {
      trackMarketingLead(userEmail);
    }

    setLoading(true);
    setResponse(null);
    setError(null);
    startScanningAnimation();
    
    try {
      const result = await getHealthTip(searchText);
      
      // Ensure the animation runs for at least a moment for effect
      // Then complete it
      completeScanning();
      
      // Small delay to show the "100% Green" state before showing text
      setTimeout(() => {
        setResponse(result);
        setLoading(false);
      }, 800);
      
    } catch (err) {
      setLoading(false);
      setError("Došlo k chybě. Zkuste to prosím později.");
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showEmailGate) {
        setError('Pro pokračování prosím zadejte svůj e-mail.');
        return;
    }

    if (!query.trim()) {
      setError('Prosím, zadejte text dotazu před odesláním.');
      return;
    }
    
    await performSearch(query);
  };

  const handleQuickTip = () => {
    if (showEmailGate) return;
    const tip = "Jaká je nejlepší svačina před cvičením?";
    setQuery(tip);
    setError(null);
    performSearch(tip);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (error) setError(null);
  };

  return (
    <section id={SectionID.AI} className="py-24 bg-gradient-to-b from-dark to-slate-900 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-card rounded-3xl p-1 shadow-2xl border border-primary/20 overflow-hidden">
          <div className="bg-dark/90 p-8 md:p-12 rounded-[22px] backdrop-blur-xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
             
             {/* Abstract background effect */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10"></div>

             <div className="flex items-center gap-4 mb-8">
               <div className="p-3 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg shadow-primary/20">
                 <Bot className="w-8 h-8 text-white" />
               </div>
               <div>
                 <h2 className="text-2xl md:text-3xl font-bold text-white">AI Nutri-Asistent</h2>
                 <p className="text-gray-400 text-sm">Zeptejte se na rychlý tip ohledně zdraví</p>
               </div>
             </div>

             {/* EMAIL GATE or CHAT INTERFACE */}
             <AnimatePresence mode="wait">
               {showEmailGate ? (
                 <motion.div 
                   key="gate"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-md"
                 >
                   <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary animate-pulse">
                     <Lock size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">Odemknout asistenta zdarma</h3>
                   <p className="text-gray-400 mb-6 max-w-md mx-auto">
                     Pro přístup k AI asistentovi a získávání zdravotních tipů prosím zadejte svůj e-mail.
                   </p>
                   
                   <form onSubmit={handleEmailSubmit} className="max-w-sm mx-auto">
                     <div className="relative mb-4">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                       <input
                         type="email"
                         placeholder="Váš e-mail..."
                         value={emailInput}
                         onChange={(e) => setEmailInput(e.target.value)}
                         className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                         required
                       />
                     </div>
                     <button 
                       type="submit"
                       className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-900/20"
                     >
                       Vstoupit do aplikace
                     </button>
                     {error && (
                        <p className="text-red-400 text-sm mt-3 flex items-center justify-center gap-2 bg-red-900/20 p-2 rounded-lg">
                           <AlertCircle size={14} /> {error}
                        </p>
                     )}
                   </form>
                 </motion.div>
               ) : (
                 <motion.div
                    key="chat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full"
                 >
                   {/* Input Area - Hidden when loading/animating */}
                   {!loading && !response && (
                     <>
                        <form onSubmit={handleAsk} className="relative mb-2">
                          <input
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Např.: Jaký je nejlepší čas na jídlo po tréninku?"
                            className={`w-full bg-slate-800/50 border ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'} rounded-xl py-4 pl-6 pr-16 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner`}
                          />
                          <button 
                            type="submit"
                            className="absolute right-2 top-2 p-2 bg-primary text-black rounded-lg hover:bg-white transition-all shadow-lg"
                          >
                            <Send className="w-6 h-6" />
                          </button>
                        </form>

                        {error && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex items-center gap-2 text-red-400 text-sm mb-4 pl-2"
                          >
                            <AlertCircle size={14} />
                            <span>{error}</span>
                          </motion.div>
                        )}

                        <div className={`flex justify-center ${error ? 'mt-2' : 'mt-4'} mb-8`}>
                            <button 
                              type="button"
                              onClick={handleQuickTip}
                              className="flex items-center gap-2 text-xs text-gray-400 hover:text-primary transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5 hover:border-primary/30"
                            >
                              <Lightbulb size={14} className="text-yellow-500" />
                              <span>Získat tip: "Jaká je nejlepší svačina před cvičením?"</span>
                            </button>
                        </div>
                     </>
                   )}

                   {/* DIAGNOSTIC LOADER ANIMATION */}
                   {loading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                         <DiagnosticLoader progress={progress} />
                      </motion.div>
                   )}

                   {/* RESULT DISPLAY */}
                   <AnimatePresence mode="wait">
                     {response && !loading && (
                       <motion.div
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ type: "spring", duration: 0.6 }}
                         className="bg-white/5 border border-white/10 rounded-xl p-8 relative shadow-2xl backdrop-blur-md"
                       >
                         {/* Header Result */}
                         <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                            <div className="bg-primary/20 p-1.5 rounded-lg">
                               <Activity className="text-primary" size={20} />
                            </div>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">Analýza dokončena</span>
                            <span className="ml-auto text-xs text-white bg-green-600 px-2 py-0.5 rounded-full font-mono">100% SUCCESS</span>
                         </div>
                         
                         <Sparkles className="absolute -top-3 -left-3 w-8 h-8 text-yellow-400 fill-yellow-400/20 animate-pulse" />
                         
                         <p className="text-gray-200 leading-relaxed font-light text-lg md:text-xl">
                           {response}
                         </p>
                         
                         <div className="mt-8 pt-4 border-t border-white/5 flex justify-center">
                            <button 
                                onClick={() => { setResponse(null); setQuery(''); }}
                                className="text-sm text-gray-400 hover:text-white underline hover:no-underline hover:bg-white/5 px-4 py-2 rounded-lg transition-all"
                            >
                                Položit další dotaz
                            </button>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </motion.div>
               )}
             </AnimatePresence>
             
             {/* Stats footer (visible only when gated open) */}
             {!showEmailGate && (
               <div className="absolute bottom-4 right-6 text-[10px] text-gray-600 font-mono">
                  ID session: {userEmail?.split('@')[0]}...
               </div>
             )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisor;
