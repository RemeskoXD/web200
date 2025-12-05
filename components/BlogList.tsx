
import React, { useEffect, useState } from 'react';
import { SectionID, BlogPost } from '../types';
import { getBlogPosts } from '../services/mockDatabase';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getBlogPosts());
  }, []);

  // Helper function to strip HTML tags for preview
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <section id={SectionID.BLOG} className="py-24 bg-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">Vzdělávání</span>
          <h2 className="text-4xl font-heading font-black text-dark mt-2 mb-4">Blog & Novinky</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Zajímavosti ze světa výživy, tipy pro zdravější život a příběhy z praxe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">
                  <Calendar size={14} />
                  {post.date}
                </div>
                <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                {/* Clean preview without HTML tags */}
                <p className="text-gray-600 mb-6 line-clamp-3 flex-1">
                  {stripHtml(post.content)}
                </p>
                <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all self-start">
                  Číst více <ArrowRight size={18} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
