
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import InBodyShowcase from './components/InBodyShowcase';
import StatsSection from './components/StatsSection';
import Testimonials from './components/Testimonials';
import BlogList from './components/BlogList';
import Contact from './components/Contact';
import HumanChat from './components/HumanChat';
import AdminPanel from './components/AdminPanel';
import AIAdvisor from './components/AIAdvisor';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');

  // Check URL for /admin simulation on load
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setShowAdminLogin(true);
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      setShowAdminLogin(false);
    } else {
      alert('Nesprávné heslo');
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setShowAdminLogin(false);
    window.history.pushState({}, '', '/');
  };

  // Admin Login View
  if (showAdminLogin && !isAdmin) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6">Administrace</h2>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Heslo (admin123)" 
              className="w-full p-4 border rounded-xl bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-green-700">Přihlásit se</button>
          </form>
          <button onClick={() => { setShowAdminLogin(false); window.history.pushState({}, '', '/'); }} className="mt-4 text-gray-500 text-sm hover:underline">Zpět na web</button>
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  if (isAdmin) {
    return <AdminPanel onLogout={logout} />;
  }

  // Main Website View
  return (
    <div className="min-h-screen bg-light text-dark font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <StatsSection />
        <Services />
        <InBodyShowcase />
        <Testimonials />
        <BlogList />
        <AIAdvisor />
      </main>
      <Contact />
      
      <HumanChat />
      
      {/* Hidden Admin Link in Footer area simulation */}
      <div className="bg-dark py-2 text-center">
         <button 
           onClick={() => setShowAdminLogin(true)} 
           className="text-[10px] text-gray-700 hover:text-gray-500 uppercase tracking-widest"
         >
           Admin Vstup
         </button>
      </div>
    </div>
  );
}

export default App;
