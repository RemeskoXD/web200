
import { ServiceItem, ContactInfo } from './types';
import { Scale, Apple, BookOpen } from 'lucide-react';
import React from 'react';

export const CONTACT_INFO: ContactInfo = {
  name: "Hlatký Ondřej",
  role: "Výživový poradce",
  phone: "775 004 015",
  email: "ondrej.hlatky@seznam.cz"
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'diagnostika',
    title: "Komplexní diagnostika InBody",
    description: "Bioimpedanční analýza na přístroji InBody 580 není jen vážení. Je to detailní mapa Vašeho těla. Zjistíme přesné rozložení svalů a tuků v jednotlivých končetinách, změříme nebezpečný viscerální tuk kolem orgánů a odhalíme případnou svalovou dysbalanci. Tato data jsou klíčová pro nastavení jakéhokoliv plánu, který má fungovat.",
    icon: 'scale',
    details: [
      "Analýza poměru svalů a tuků",
      "Měření viscerálního (útrobního) tuku",
      "Segmentální analýza (levá vs. pravá ruka/noha)",
      "Celková tělesná voda a otoky",
      "Minerální látky a hustota kostí"
    ]
  },
  {
    id: 'jidelnicek',
    title: "Nutriční plán na míru",
    description: "Zapomeňte na kopírované jídelníčky z internetu. Vytvářím plány založené na Vašem bazálním metabolismu, denním výdeji a chuťových preferencích. Cílem není krátkodobá dieta, ale udržitelný systém stravování, který Vám dodá energii, zlepší spánek a pomůže dosáhnout optimální váhy bez jo-jo efektu.",
    icon: 'apple',
    details: [
      "Výpočet makroživin dle Vašich cílů",
      "Zohlednění alergií a intolerancí",
      "Recepty a tipy na nákup potravin",
      "Pravidelné kontroly a úpravy plánu"
    ]
  },
  {
    id: 'skripta',
    title: "Edukace a Dlouhodobá péče",
    description: "Mým cílem je naučit Vás rozumět svému tělu. Poskytuji Vám nejen výsledky, ale i know-how – edukační materiály a skripta, která Vám vysvětlí souvislosti mezi stravou, hormonální soustavou a psychikou. Stanete se sami sobě výživovým poradcem a nebudete odkázáni na neustálé rady ostatních.",
    icon: 'book',
    details: [
      "Vysvětlení fungování metabolismu",
      "Jak číst etikety na potravinách",
      "Psychologie hubnutí a motivace",
      "Odborná skripta a studijní materiály"
    ]
  }
];

export const STORY_TEXT = `Dlouhé úsilí a přípravy mají svůj význam a hodnotu. A konečně – je to tady. 
S velkou radostí Vám oznamuji, že zanedlouho pro Vás otevírám VÝŽIVOVÉ PORADENSTVÍ A DIAGNOSTIKU ORGANISMU.

Cesta k tomuto cíli nebyla jednoduchá. Trvalo to dlouho, stálo to spoustu práce, úsilí i trpělivosti. 
Poděkování patří především mému týmu, který usilovně pracoval na tom, aby vše bylo tak, jak jsem plánoval, přesně tak, jak jsem si vše představoval.
Povedlo se.

Vždy byl můj sen dělat práci, za kterou bude vidět výsledek. Výsledek, který se stane mým podpisem.
Pomáhat lidem stát se SILNĚJŠÍMI, ZDRAVĚJŠÍMI, SEBEVĚDOMĚJŠÍMI.

Jste to jen Vy, kdo má v rukou Vaše zdraví. Vaši budoucnost.`;

export const getIcon = (type: ServiceItem['icon']) => {
  switch(type) {
    case 'scale': return <Scale className="w-10 h-10" />;
    case 'apple': return <Apple className="w-10 h-10" />;
    case 'book': return <BookOpen className="w-10 h-10" />;
    default: return null;
  }
};
