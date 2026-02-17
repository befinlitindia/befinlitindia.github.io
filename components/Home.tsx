import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, BookOpen, Wrench, Calculator, Calendar } from 'lucide-react';
import { MOONLIGHTER_PLAYBOOK_DESCRIPTION, SALARY_TAX_CALCULATOR_DESCRIPTION, SUCCESS_PENALTY_CALCULATOR_DESCRIPTION } from './content';

interface HomeProps {
  onNavigate: (page: 'home' | 'about' | 'playbooks' | 'playbook' | 'tools' | 'salary-calculator' | 'side-hustle-estimator') => void;
  onOpenConsultation?: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-befinlit-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-befinlit-navy/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-befinlit-gold/5 rounded-full blur-3xl"></div>

        {/* Floating Icons - Visible mostly on larger screens */}
        <div className="hidden 2xl:block absolute bottom-1/3 right-12 opacity-10 -rotate-12 text-befinlit-navy animate-pulse" style={{ animationDuration: '5s' }}>
          <ShieldCheck size={140} />
        </div>
        <div className="hidden xl:block absolute top-1/4 right-8 opacity-5 rotate-45 text-befinlit-gold">
          <Calculator size={100} />
        </div>
        <div className="hidden xl:block absolute bottom-40 left-8 opacity-5 -rotate-12 text-befinlit-gold">
          <BookOpen size={90} />
        </div>
      </div>

      <div className="relative z-10 animate-fade-in">
        {/* Hero Section */}
        <section className="pt-32 md:pt-48 pb-16 md:pb-24 px-4 md:px-8 max-w-[1400px] mx-auto text-center">
          <span className="inline-block py-1 px-3 border border-befinlit-navy/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-befinlit-navy mb-8 bg-white/50 backdrop-blur-sm">
            Your Finance Experts
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-befinlit-navy mb-10 leading-tight">
            Financial Literacy,<br /><span className="italic font-serif text-befinlit-gold underline decoration-befinlit-navy/10 underline-offset-8">Simplified.</span>
          </h1>
          <p className="text-lg text-befinlit-navy/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            Empowering you over the financial jargons. Master the complexities of Indian taxation, wealth creation, and compliance.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-stretch items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('playbooks')}
              className="bg-befinlit-navy text-befinlit-cream px-6 py-4 rounded-sm font-bold flex items-center justify-center gap-2 hover:bg-befinlit-gold hover:text-befinlit-navy transition-all w-full hover:shadow-lg hover:-translate-y-0.5 text-sm"
            >
              Explore our Playbooks <BookOpen size={18} />
            </button>
            <button
              onClick={() => onNavigate('tools')}
              className="bg-befinlit-gold text-befinlit-navy px-6 py-4 rounded-sm font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all w-full hover:shadow-lg hover:-translate-y-0.5 text-sm"
            >
              Use our Toolkits <Wrench size={18} />
            </button>
            <button
              onClick={onOpenConsultation}
              className="border border-befinlit-navy text-befinlit-navy px-6 py-4 rounded-sm font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all w-full bg-white/30 backdrop-blur-sm text-sm"
            >
              Schedule a Consultation <Calendar size={18} />
            </button>
          </div>
        </section>

        {/* What are our goals? */}
        <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto border-t border-befinlit-navy/5 relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[120px] md:text-[180px] font-bold text-befinlit-navy/[0.03] pointer-events-none select-none leading-0.8 md:leading-none z-0 font-serif text-center w-full">
            OUR<br className="md:hidden" />GOALS
          </div>

          <div className="relative z-10 flex flex-col items-center mb-16">
            <div className="h-16 w-px bg-gradient-to-b from-transparent to-befinlit-gold/50 mb-6"></div>
            <h2 className="text-sm md:text-base uppercase tracking-[0.3em] font-bold text-befinlit-gold text-center shadow-sm">
              What are our goals?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-befinlit-navy/5 group-hover:bg-befinlit-navy/10 flex items-center justify-center rounded-full text-befinlit-navy transition-colors">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-lg font-bold text-befinlit-navy">Tax Strategy</h4>
              <p className="text-sm text-befinlit-navy/60 leading-relaxed max-w-xs">
                Navigate the complex Indian tax regime with expert-backed structures that maximize your take-home pay.
              </p>
            </div>
            <div className="space-y-4 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-befinlit-navy/5 group-hover:bg-befinlit-navy/10 flex items-center justify-center rounded-full text-befinlit-navy transition-colors">
                <TrendingUp size={32} />
              </div>
              <h4 className="text-lg font-bold text-befinlit-navy">Wealth Creation</h4>
              <p className="text-sm text-befinlit-navy/60 leading-relaxed max-w-xs">
                Beyond saving tax—we focus on building long-term generational wealth through disciplined financial planning.
              </p>
            </div>
            <div className="space-y-4 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-befinlit-navy/5 group-hover:bg-befinlit-navy/10 flex items-center justify-center rounded-full text-befinlit-navy transition-colors">
                <BookOpen size={32} />
              </div>
              <h4 className="text-lg font-bold text-befinlit-navy">Compliance</h4>
              <p className="text-sm text-befinlit-navy/60 leading-relaxed max-w-xs">
                Stay ahead of the taxman. We demystify 26AS, AIS, and GST links to keep your financial record pristine.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Content Card */}
        {/* Featured Content Card */}
        <section className="bg-white/60 backdrop-blur-md pt-12 pb-20 border-y border-befinlit-navy/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-befinlit-gold/20 to-transparent"></div>
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
            <h2 className="text-sm md:text-base uppercase tracking-[0.3em] font-bold text-befinlit-gold mb-10 text-center shadow-sm">Featured Playbook</h2>
            <div
              onClick={() => onNavigate('playbook')}
              className="group cursor-pointer bg-befinlit-cream border border-befinlit-navy/10 p-8 md:p-12 rounded-sm flex flex-col md:flex-row gap-8 items-center hover:border-befinlit-gold transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="w-full md:w-1/2 overflow-hidden rounded-sm shadow-inner">
                <div className="aspect-[4/3] bg-befinlit-navy flex items-center justify-center p-12 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#C5A059 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                  <BookOpen size={80} className="text-befinlit-gold opacity-20 absolute -bottom-4 -right-4 rotate-12" />
                  <div className="text-white text-center z-10">
                    <h3 className="text-3xl font-bold leading-tight">The Moonlighter's<br />Playbook</h3>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-befinlit-navy mb-4 group-hover:text-befinlit-gold transition-colors">
                  <span className="block text-lg font-medium opacity-80 mb-1">The Moonlighter's Playbook</span>
                  How to Side-Hustle Without Getting into Trouble
                </h3>
                <p className="text-sm text-befinlit-navy/60 mb-6 leading-relaxed text-justify">
                  {MOONLIGHTER_PLAYBOOK_DESCRIPTION}
                </p>
                <div className="flex items-center gap-2 text-befinlit-navy font-bold text-sm group/btn">
                  Read Playbook <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Toolkit Section */}
        <section className="pt-12 pb-20 bg-transparent relative">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
            <h2 className="text-sm md:text-base uppercase tracking-[0.3em] font-bold text-befinlit-gold mb-10 text-center shadow-sm">Featured Toolkit</h2>
            <div
              onClick={() => onNavigate('side-hustle-estimator')}
              className="group cursor-pointer bg-white border border-befinlit-navy/10 p-8 md:p-12 rounded-sm flex flex-col md:flex-row-reverse gap-8 items-center hover:border-befinlit-gold transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="w-full md:w-1/2 overflow-hidden rounded-sm shadow-inner">
                <div className="aspect-[4/3] bg-befinlit-gold flex items-center justify-center p-12 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                  <Calculator size={80} className="text-befinlit-navy opacity-20 absolute -bottom-4 -left-4 -rotate-12" />
                  <div className="text-befinlit-navy text-center z-10">
                    <h3 className="text-3xl font-bold leading-tight">The Side-Hustle<br />Tax Realizer</h3>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-befinlit-navy mb-2 group-hover:text-befinlit-gold transition-colors">The Side-Hustle Tax Realizer</h3>
                <p className="text-befinlit-navy/40 text-sm mb-4 font-medium italic">The Success Penalty Calculator</p>
                <p className="text-sm text-befinlit-navy/60 mb-6 leading-relaxed">
                  {SUCCESS_PENALTY_CALCULATOR_DESCRIPTION}
                </p>
                <div className="flex items-center gap-2 text-befinlit-navy font-bold text-sm group/btn">
                  Launch Toolkit <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;