
import { BlogPost, Ticket, MarketingLead } from '../types';

// Keys for LocalStorage
const BLOG_KEY = 'hlatky_blog_posts';
const TICKET_KEY = 'hlatky_chat_tickets';
const MARKETING_KEY = 'hlatky_marketing_leads';

// --- BLOG SERVICES ---

export const getBlogPosts = (): BlogPost[] => {
  const data = localStorage.getItem(BLOG_KEY);
  if (!data) {
    // Return some default dummy data for the first load
    return [
      {
        id: '1',
        title: 'Proč diety nefungují dlouhodobě?',
        content: 'Většina diet je založena na drastickém omezení kalorií, což vede ke zpomalení metabolismu a následnému jo-jo efektu. Klíčem je metabolická rovnováha a pochopení vlastního těla skrze diagnostiku.',
        date: new Date().toLocaleDateString('cs-CZ'),
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop'
      },
      {
        id: '2',
        title: 'Viscerální tuk: Tichý nepřítel',
        content: 'I štíhlý člověk může mít vysoké množství viscerálního tuku. Tento tuk obklopuje orgány a zvyšuje riziko civilizačních chorob. InBody nám ho odhalí přesně.',
        date: new Date(Date.now() - 86400000 * 2).toLocaleDateString('cs-CZ'),
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop'
      }
    ];
  }
  return JSON.parse(data);
};

export const saveBlogPost = (post: BlogPost): void => {
  const posts = getBlogPosts();
  const existingIndex = posts.findIndex(p => p.id === post.id);
  
  if (existingIndex >= 0) {
    posts[existingIndex] = post;
  } else {
    posts.unshift(post);
  }
  
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
};

export const deleteBlogPost = (id: string): void => {
  const posts = getBlogPosts().filter(p => p.id !== id);
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
};

// --- TICKET / CHAT SERVICES ---

export const getTickets = (): Ticket[] => {
  const data = localStorage.getItem(TICKET_KEY);
  return data ? JSON.parse(data) : [];
};

export const createTicket = (name: string, email: string, message: string): Ticket => {
  const tickets = getTickets();
  const newTicket: Ticket = {
    id: Date.now().toString(),
    name,
    email,
    message,
    date: new Date().toLocaleString('cs-CZ'),
    status: 'new'
  };
  
  tickets.unshift(newTicket);
  localStorage.setItem(TICKET_KEY, JSON.stringify(tickets));
  return newTicket;
};

export const replyToTicket = (id: string, replyMessage: string): void => {
  const tickets = getTickets();
  const ticketIndex = tickets.findIndex(t => t.id === id);
  
  if (ticketIndex >= 0) {
    tickets[ticketIndex].status = 'replied';
    tickets[ticketIndex].reply = replyMessage;
    localStorage.setItem(TICKET_KEY, JSON.stringify(tickets));
  }
};

// --- MARKETING LEADS SERVICES ---

export const getMarketingLeads = (): MarketingLead[] => {
  const data = localStorage.getItem(MARKETING_KEY);
  return data ? JSON.parse(data) : [];
};

export const trackMarketingLead = (email: string): void => {
  const leads = getMarketingLeads();
  const existingIndex = leads.findIndex(l => l.email === email);
  const now = new Date().toLocaleString('cs-CZ');

  if (existingIndex >= 0) {
    // Lead exists, increment counter
    leads[existingIndex].interactionCount += 1;
    leads[existingIndex].lastInteraction = now;
  } else {
    // New lead
    const newLead: MarketingLead = {
      email,
      firstInteraction: now,
      lastInteraction: now,
      interactionCount: 1
    };
    leads.push(newLead);
  }

  localStorage.setItem(MARKETING_KEY, JSON.stringify(leads));
};
