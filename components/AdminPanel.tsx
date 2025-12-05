
import React, { useState, useEffect, useRef } from 'react';
import { BlogPost, Ticket, MarketingLead } from '../types';
import { getBlogPosts, saveBlogPost, deleteBlogPost, getTickets, replyToTicket, getMarketingLeads } from '../services/mockDatabase';
import { LayoutDashboard, MessageSquare, PenTool, LogOut, Check, Reply, Trash2, Plus, Bold, Italic, Underline, List, ListOrdered, Type, Users, Download, FileText } from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
}

// --- RICH TEXT EDITOR COMPONENT ---
interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync initial value or updates from parent (e.g. loading a different post)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      editorRef.current.focus();
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-1 items-center flex-wrap">
        <button 
          type="button" 
          onClick={() => handleCommand('bold')} 
          className="p-2 hover:bg-gray-200 rounded text-gray-700" 
          title="Tučné"
        >
          <Bold size={18} />
        </button>
        <button 
          type="button" 
          onClick={() => handleCommand('italic')} 
          className="p-2 hover:bg-gray-200 rounded text-gray-700" 
          title="Kurzíva"
        >
          <Italic size={18} />
        </button>
        <button 
          type="button" 
          onClick={() => handleCommand('underline')} 
          className="p-2 hover:bg-gray-200 rounded text-gray-700" 
          title="Podtržené"
        >
          <Underline size={18} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <button 
          type="button" 
          onClick={() => handleCommand('formatBlock', 'H3')} 
          className="p-2 hover:bg-gray-200 rounded text-gray-700 flex items-center gap-1 font-bold" 
          title="Nadpis"
        >
          <Type size={18} />
          <span className="text-xs">H3</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <button 
          type="button" 
          onClick={() => handleCommand('insertUnorderedList')} 
          className="p-2 hover:bg-gray-200 rounded text-gray-700" 
          title="Seznam s odrážkami"
        >
          <List size={18} />
        </button>
        <button 
          type="button" 
          onClick={() => handleCommand('insertOrderedList')} 
          className="p-2 hover:bg-gray-200 rounded text-gray-700" 
          title="Číslovaný seznam"
        >
          <ListOrdered size={18} />
        </button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="w-full p-4 h-80 focus:outline-none overflow-y-auto prose max-w-none text-gray-700 leading-relaxed"
        style={{ minHeight: '300px' }}
      ></div>
    </div>
  );
};

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [view, setView] = useState<'dashboard' | 'chat' | 'blog' | 'marketing'>('chat');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [leads, setLeads] = useState<MarketingLead[]>([]);
  
  // Blog Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});

  // Chat Reply State
  const [replyText, setReplyText] = useState('');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setTickets(getTickets());
    setPosts(getBlogPosts());
    setLeads(getMarketingLeads());
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost.title || !currentPost.content) return;

    const newPost: BlogPost = {
      id: currentPost.id || Date.now().toString(),
      title: currentPost.title,
      content: currentPost.content,
      image: currentPost.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop',
      date: currentPost.date || new Date().toLocaleDateString('cs-CZ')
    };

    saveBlogPost(newPost);
    setIsEditing(false);
    setCurrentPost({});
    refreshData();
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Opravdu smazat tento článek?')) {
      deleteBlogPost(id);
      refreshData();
    }
  };

  const handleReply = (ticketId: string) => {
    if (!replyText) return;
    replyToTicket(ticketId, replyText);
    setReplyText('');
    setActiveTicketId(null);
    refreshData();
    alert('Odpověď byla simulovaně odeslána na e-mail klienta.');
  };

  // Export Functions
  const exportToTxt = () => {
    const content = leads.map(l => l.email).join(' ');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `emails_export_${new Date().toISOString().slice(0,10)}.txt`;
    link.click();
  };

  const exportToCsv = () => {
    const header = "Email,First Interaction,Last Interaction,Interaction Count\n";
    const rows = leads.map(l => 
      `${l.email},"${l.firstInteraction}","${l.lastInteraction}",${l.interactionCount}`
    ).join("\n");
    
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `marketing_leads_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-dark text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-bold text-xl tracking-wider">ADMIN <span className="text-primary">PANEL</span></h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setView('chat')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${view === 'chat' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <MessageSquare size={20} /> Chat / Tikety
            {tickets.filter(t => t.status === 'new').length > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-auto">
                {tickets.filter(t => t.status === 'new').length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setView('blog')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${view === 'blog' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <PenTool size={20} /> Blog / Články
          </button>
          <button 
            onClick={() => setView('marketing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${view === 'marketing' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Users size={20} /> Marketing
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={onLogout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <LogOut size={18} /> Odhlásit se
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        
        {/* CHAT VIEW */}
        {view === 'chat' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-dark mb-8">Zprávy od klientů</h1>
            <div className="space-y-4">
              {tickets.length === 0 && <p className="text-gray-500 italic">Žádné zprávy.</p>}
              {tickets.map(ticket => (
                <div key={ticket.id} className={`bg-white p-6 rounded-2xl shadow-sm border ${ticket.status === 'new' ? 'border-primary/50 ring-1 ring-primary/20' : 'border-gray-100 opacity-75'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-dark">{ticket.name}</h3>
                      <p className="text-sm text-gray-500">{ticket.email}</p>
                    </div>
                    <span className="text-xs text-gray-400">{ticket.date}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-gray-700 mb-4">
                    {ticket.message}
                  </div>
                  
                  {ticket.status === 'replied' ? (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 p-3 rounded-lg">
                      <Check size={16} /> Odpovězeno: "{ticket.reply}"
                    </div>
                  ) : (
                    <div>
                      {activeTicketId === ticket.id ? (
                        <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                          <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary mb-2"
                            placeholder="Napište odpověď..."
                            rows={3}
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <button onClick={() => handleReply(ticket.id)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700">Odeslat</button>
                            <button onClick={() => setActiveTicketId(null)} className="text-gray-500 px-4 py-2 text-sm hover:underline">Zrušit</button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => setActiveTicketId(ticket.id)} className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                          <Reply size={16} /> Odpovědět
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG VIEW */}
        {view === 'blog' && (
          <div className="max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-dark">Správa Blogu</h1>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 shadow-lg shadow-green-200">
                    <Plus size={20} /> Nový článek
                  </button>
                )}
             </div>

             {isEditing ? (
               <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                  <h3 className="font-bold text-xl mb-6">{currentPost.id ? 'Upravit článek' : 'Nový článek'}</h3>
                  <form onSubmit={handleSavePost} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nadpis</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-primary"
                        value={currentPost.title || ''}
                        onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">URL Obrázku</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-primary"
                        value={currentPost.image || ''}
                        onChange={e => setCurrentPost({...currentPost, image: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Obsah</label>
                      {/* Using the Custom Rich Text Editor */}
                      <RichTextEditor 
                        value={currentPost.content || ''} 
                        onChange={(html) => setCurrentPost({...currentPost, content: html})} 
                      />
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700">Uložit</button>
                      <button type="button" onClick={() => { setIsEditing(false); setCurrentPost({}); }} className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-300">Zrušit</button>
                    </div>
                  </form>
               </div>
             ) : (
               <div className="grid gap-6">
                 {posts.map(post => (
                   <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
                     <img src={post.image} alt={post.title} className="w-24 h-24 rounded-xl object-cover" />
                     <div className="flex-1">
                       <h3 className="font-bold text-lg text-dark">{post.title}</h3>
                       <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                       <div className="text-gray-600 line-clamp-2 text-sm" dangerouslySetInnerHTML={{ __html: post.content.replace(/<[^>]+>/g, '') }}></div>
                     </div>
                     <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                         onClick={() => { setCurrentPost(post); setIsEditing(true); }}
                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                       >
                         <PenTool size={20} />
                       </button>
                       <button 
                         onClick={() => handleDeletePost(post.id)}
                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                       >
                         <Trash2 size={20} />
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}

        {/* MARKETING VIEW */}
        {view === 'marketing' && (
            <div className="max-w-5xl mx-auto">
               <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-dark">Marketing & Leady</h1>
                    <p className="text-gray-500 mt-2">Uživatelé, kteří odemkli AI Asistenta.</p>
                  </div>
                  <div className="flex gap-3">
                     <button onClick={exportToTxt} className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-50">
                        <FileText size={18} /> Export .TXT
                     </button>
                     <button onClick={exportToCsv} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700">
                        <Download size={18} /> Export .CSV
                     </button>
                  </div>
               </div>

               <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                     <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                           <th className="p-4 font-bold text-gray-600 text-sm uppercase">E-mail</th>
                           <th className="p-4 font-bold text-gray-600 text-sm uppercase">První interakce</th>
                           <th className="p-4 font-bold text-gray-600 text-sm uppercase">Poslední interakce</th>
                           <th className="p-4 font-bold text-gray-600 text-sm uppercase text-center">Počet dotazů</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {leads.length === 0 ? (
                           <tr>
                              <td colSpan={4} className="p-8 text-center text-gray-500 italic">Zatím žádné nasbírané e-maily.</td>
                           </tr>
                        ) : (
                           leads.map((lead, idx) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                 <td className="p-4 font-medium text-dark">{lead.email}</td>
                                 <td className="p-4 text-gray-500 text-sm">{lead.firstInteraction}</td>
                                 <td className="p-4 text-gray-500 text-sm">{lead.lastInteraction}</td>
                                 <td className="p-4 text-center">
                                    <span className="inline-block bg-primary/10 text-primary font-bold px-2 py-1 rounded-md text-sm">
                                       {lead.interactionCount}x
                                    </span>
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;
