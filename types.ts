
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details?: string[];
  icon: 'scale' | 'apple' | 'book';
}

export interface ContactInfo {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
}

export interface Ticket {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'new' | 'replied';
  reply?: string;
}

export interface MarketingLead {
  email: string;
  firstInteraction: string;
  lastInteraction: string;
  interactionCount: number;
}

export enum SectionID {
  HOME = 'home',
  ABOUT = 'o-mne',
  SERVICES = 'sluzby',
  INBODY = 'diagnostika',
  BLOG = 'blog',
  CONTACT = 'kontakt',
  ADMIN = 'admin',
  AI = 'ai'
}
