import React from 'react';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { MOONLIGHTER_PLAYBOOK_DESCRIPTION } from './content';
import { playbooksList } from './data';

interface PlaybooksProps {
  onNavigate: (page: 'home' | 'about' | 'playbooks' | 'playbook' | 'financial-guide') => void;
}

const Playbooks: React.FC<PlaybooksProps> = ({ onNavigate }) => {


  return (
    <div className="animate-fade-in pt-32 md:pt-48 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto">
      <header className="mb-16 border-b border-befinlit-navy/10 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-befinlit-gold" size={20} />
          <span className="text-befinlit-gold font-bold tracking-[0.2em] uppercase text-xs">Articles and Content</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-befinlit-navy mb-6 font-serif">The Playbooks</h1>
        <p className="text-lg text-befinlit-navy/60 leading-relaxed italic">
          In-depth technical guides and strategic blueprints for the modern Indian professional.
        </p>
      </header>

      <div className="space-y-12">
        {playbooksList.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.id as any)}
            className="group cursor-pointer bg-white border border-befinlit-navy/5 p-8 rounded-sm hover:border-befinlit-gold transition-all shadow-sm hover:shadow-md flex flex-col md:flex-row gap-8"
          >
            <div className="w-full md:w-1/3 aspect-[4/3] bg-befinlit-navy rounded-sm flex items-center justify-center p-6 relative overflow-hidden shrink-0">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#C5A059 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
              <BookOpen size={40} className="text-befinlit-gold opacity-10 absolute -bottom-2 -right-2" />
              <div className="text-white text-center font-bold font-serif leading-tight">
                <p className="text-lg">{item.title}</p>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-4 mb-3 text-[10px] uppercase tracking-widest font-bold">
                <span className="text-befinlit-gold flex items-center gap-1"><Tag size={12} /> {item.tag}</span>
                <span className="text-befinlit-navy/40 flex items-center gap-1"><Clock size={12} /> {item.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold text-befinlit-navy mb-3 group-hover:text-befinlit-gold transition-colors">
                <span className="block text-lg font-medium opacity-80 mb-1">{item.title}</span>
                {item.subtitle}
              </h3>
              <p className="text-befinlit-navy/70 text-sm mb-6 leading-relaxed text-justify">
                {item.description}
              </p>
              <div className="flex items-center gap-2 text-befinlit-navy font-bold text-sm">
                Read Playbook <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playbooks;