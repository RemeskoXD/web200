
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SectionID } from '../types';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'O mně', id: SectionID.ABOUT },
    { name: 'Služby', id: SectionID.SERVICES },
    { name: 'Diagnostika', id: SectionID.INBODY },
    { name: 'Blog', id: SectionID.BLOG },
    { name: 'Kontakt', id: SectionID.CONTACT },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        <div 
          onClick={() => scrollTo(SectionID.HOME)} 
          className="text-2xl font-black cursor-pointer tracking-tighter flex items-center gap-2"
        >
          <span className="text-dark font-heading">HLATKÝ</span>
          <span className="text-primary text-4xl leading-none">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm font-bold uppercase tracking-wider transition-colors relative group ${scrolled ? 'text-gray-600 hover:text-primary' : 'text-gray-800 hover:text-primary'}`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </button>
          ))}
          <button 
             onClick={() => scrollTo(SectionID.CONTACT)}
             className="px-6 py-2.5 bg-primary text-white font-bold rounded-full hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
          >
            Rezervovat termín
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-dark" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-lg font-bold text-gray-700 hover:text-primary py-2 border-b border-gray-50"
                >
                  {link.name}
                </button>
              ))}
              <button 
                 onClick={() => scrollTo(SectionID.CONTACT)}
                 className="mt-4 w-full py-3 bg-primary text-white font-bold rounded-xl"
              >
                Rezervovat termín
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
