import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { SectionID } from '../types';

const Contact: React.FC = () => {
  return (
    <footer id={SectionID.CONTACT} className="bg-dark text-white py-16">
      <div className="container mx-auto px-6">
        <div className="bg-primary rounded-[3rem] p-8 md:p-12 -mt-32 mb-16 shadow-2xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="relative z-10">
             <h2 className="text-3xl font-bold text-white mb-2">Jste připraveni?</h2>
             <p className="text-white/90">Udělejte první krok ke svému zdravějšímu já ještě dnes.</p>
           </div>
           <a 
              href={`mailto:${CONTACT_INFO.email}`}
              className="relative z-10 px-8 py-4 bg-white text-primary font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
            >
              Napište mi
            </a>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-8">
          
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter">
              HLATKÝ<span className="text-primary">.</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Profesionální diagnostika a výživové poradenství. Přátelský přístup a reálné výsledky.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-primary">Kontakt</h3>
            <div className="space-y-4">
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors justify-center md:justify-start">
                <Phone size={18} className="text-primary" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors justify-center md:justify-start">
                <Mail size={18} className="text-primary" />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                <MapPin size={18} className="text-primary" />
                <span>Česká republika</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-primary">Otevírací doba</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Po - Pá</span> <span>8:00 - 18:00</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>So</span> <span>Na objednání</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Ne</span> <span>Zavřeno</span></li>
            </ul>
          </div>
          
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-600 text-sm">
          <p>
            &copy; {new Date().getFullYear()} <a href="https://mescon.cz/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">Mescon Digital s.r.o.</a> Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;