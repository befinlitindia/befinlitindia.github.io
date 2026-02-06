import React from 'react';
import { Mail, ShieldCheck, Award, BookOpen, Wrench, Calendar } from 'lucide-react';

interface AboutUsProps {
  onNavigate?: (page: 'home' | 'about' | 'playbooks' | 'playbook' | 'tools' | 'salary-calculator' | 'side-hustle-estimator') => void;
  onOpenConsultation?: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="animate-fade-in">
      <section className="pt-48 pb-20 px-6 max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 border border-befinlit-navy/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-befinlit-navy mb-8 bg-white/50 backdrop-blur-sm">
            Our Story
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-befinlit-navy mb-10 leading-tight">
            The BeFinLit India<br />Mission.
          </h1>
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] md:text-[150px] font-bold text-befinlit-navy/[0.03] pointer-events-none select-none whitespace-nowrap leading-none z-0 font-serif">
              MISSION
            </div>
            <p className="relative z-10 text-xl text-befinlit-navy/70 italic leading-relaxed py-10 border-y border-befinlit-navy/10">
              "To empower the modern Indian professional with the financial intelligence required to navigate a high-growth economy."
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mt-20">
          <div className="space-y-6 text-befinlit-navy/80 leading-relaxed py-2">
            <p>
              BeFinLit India (Become Financially Literate) started as a response to the growing confusion in the Indian financial landscape. With the rapid changes in tax laws and the rise of the creator and freelance economies, the gap between traditional advice and modern needs has never been wider.
            </p>
            <p>
              Our goal isn't just to provide a service—it's to provide literacy. We believe that when an individual understands the "why" behind their taxes and investments, they make choices that lead to long-term prosperity.
            </p>

            <div className="pt-8 border-t border-befinlit-navy/10 mt-8">
              <blockquote className="text-xl text-befinlit-navy/70 italic leading-relaxed">
                "Financial literacy isn't a luxury—it's a survival skill for the modern professional."
              </blockquote>
            </div>
          </div>

          {/* Optimized Trust Section with adjusted sizing */}
          <div className="bg-befinlit-navy p-8 rounded-sm shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl md:text-2xl font-bold italic text-befinlit-gold leading-tight">
                #BecomeFinanciallyLiterate
              </h3>
            </div>

            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <ShieldCheck className="text-befinlit-gold shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-white text-sm font-bold leading-snug mb-0.5">Professional-Led Research</p>
                  <p className="text-white/60 text-[13px] leading-relaxed">
                    Our content is vetted for technical accuracy against the latest Income Tax Act and Finance Act.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Award className="text-befinlit-gold shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-white text-sm font-bold leading-snug mb-0.5">Professional Focus</p>
                  <p className="text-white/60 text-[13px] leading-relaxed">
                    We tailor advice specifically for salaried professionals, freelancers, and small business owners.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="text-befinlit-gold shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-white text-sm font-bold leading-snug mb-0.5">Direct Support</p>
                  <p className="text-white/60 text-[13px] leading-relaxed">
                    We provide direct channels for personalized paid consultations for complex cases.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-befinlit-navy text-befinlit-cream py-20 px-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Be the master of your own money.</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">
            Join thousands of professionals who rely on BeFinLit India to keep their finances compliant and their wealth growing.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-stretch items-center justify-center gap-4">
            <button
              onClick={() => onNavigate && onNavigate('playbooks')}
              className="bg-befinlit-gold text-befinlit-navy px-6 py-4 rounded-sm font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 w-full sm:w-80"
            >
              Explore our Playbooks <BookOpen size={18} />
            </button>
            <button
              onClick={() => onNavigate && onNavigate('tools')}
              className="bg-befinlit-gold text-befinlit-navy px-6 py-4 rounded-sm font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 w-full sm:w-80"
            >
              Use our Toolkits <Wrench size={18} />
            </button>
            <button
              onClick={onOpenConsultation}
              className="bg-befinlit-gold text-befinlit-navy px-6 py-4 rounded-sm font-bold hover:bg-white transition-all flex items-center justify-center gap-2 w-full sm:w-80"
            >
              Schedule a Consultation <Calendar size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;