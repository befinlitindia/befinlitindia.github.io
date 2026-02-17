import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'about' | 'playbooks' | 'playbook' | 'tools' | 'salary-calculator' | 'side-hustle-estimator' | 'financial-guide' | 'topic', topic?: string) => void;
  onOpenConsultation?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <footer className="bg-befinlit-navy text-befinlit-cream py-16 mt-20 border-t-4 border-befinlit-gold">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2
              className="text-2xl font-black tracking-tighter mb-4 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              BeFinLit India
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-sm">
              Empowering Indian professionals to master their finances. From tax saving to wealth creation, we simplify the complex world of money.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/befinlit_india?igsh=N3dnaHlmZW9ienp3" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-befinlit-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/befinlit_india?s=11" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-befinlit-gold transition-colors">
                {/* X Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"></path></svg>
              </a>
              <a href="https://www.linkedin.com/company/befinlit-india/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-befinlit-gold transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.reddit.com/r/IndiaTaxation/s/fQQ7hYsCOQ" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-befinlit-gold transition-colors">
                {/* Reddit Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-befinlit-gold text-xs uppercase tracking-widest font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => onNavigate('playbooks')} className="hover:text-white transition-colors text-left">The Playbooks</button></li>
                <li><button onClick={() => onNavigate('tools')} className="hover:text-white transition-colors text-left">The Toolkits</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-befinlit-gold text-xs uppercase tracking-widest font-semibold mb-4">Browse by Topic</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><button onClick={() => onNavigate('topic', 'Freelance 101')} className="hover:text-white transition-colors text-left">Freelance 101</button></li>

              </ul>
            </div>
            <div>
              <h4 className="text-befinlit-gold text-xs uppercase tracking-widest font-semibold mb-4">Connect with Us</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="mailto:befinlitindia@gmail.com" className="hover:text-white transition-colors">Email Us</a></li>
                <li><button onClick={onOpenConsultation} className="hover:text-white transition-colors text-left font-normal">Schedule a Consultation</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>BeFinLit India: Empowering Financial Intelligence. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>befinlitindia@gmail.com</span>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;