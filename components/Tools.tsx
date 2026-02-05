import React from 'react';
import { ArrowRight, Calculator, Wrench, Landmark } from 'lucide-react';
import { SALARY_TAX_CALCULATOR_DESCRIPTION, SUCCESS_PENALTY_CALCULATOR_DESCRIPTION } from './content';

interface ToolsProps {
  onNavigate: (page: 'home' | 'about' | 'playbooks' | 'playbook' | 'tools' | 'salary-calculator' | 'side-hustle-estimator') => void;
}

const Tools: React.FC<ToolsProps> = ({ onNavigate }) => {
  const toolsList = [
    {
      id: 'salary-calculator',
      title: "The Salary Tax Calculator",
      subtitle: "New Regime vs Old Regime Showdown",
      description: SALARY_TAX_CALCULATOR_DESCRIPTION,
      tag: "Calculator",
      status: "Ready"
    },
    {
      id: 'side-hustle-estimator',
      title: "The Side-Hustle Surcharge Estimator",
      subtitle: "The Success Penalty Calculator",
      description: SUCCESS_PENALTY_CALCULATOR_DESCRIPTION,
      tag: "Risk Analysis",
      status: "Ready"
    }
  ];

  return (
    <div className="animate-fade-in pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-16 border-b border-befinlit-navy/10 pb-12">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="text-befinlit-gold" size={24} />
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-befinlit-gold">The Audit-Proof Toolkit</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-befinlit-navy mb-6 font-serif">The Audit-Proof Toolkit.</h1>
        <p className="text-lg text-befinlit-navy/60 max-w-2xl leading-relaxed italic">
          Witty calculators and compliance-checkers designed to keep the taxman happy and your bank balance healthy.
        </p>
      </header>

      <div className="grid gap-8">
        {toolsList.map((tool) => (
          <div
            key={tool.id}
            onClick={() => tool.status === "Ready" && onNavigate(tool.id as any)}
            className={`group p-8 rounded-sm border transition-all duration-300 flex flex-col md:flex-row gap-8 shadow-sm ${tool.status === "Ready"
              ? 'cursor-pointer bg-white border-befinlit-navy/5 hover:border-befinlit-gold hover:shadow-md'
              : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
              }`}
          >
            <div className={`w-full md:w-1/3 aspect-[4/3] rounded-sm flex items-center justify-center p-6 relative overflow-hidden shrink-0 ${tool.status === "Ready" ? 'bg-befinlit-navy' : 'bg-gray-300'
              }`}>
              <Landmark size={40} className="text-befinlit-gold opacity-10 absolute -bottom-2 -right-2" />
              <div className="text-white text-center font-bold font-serif leading-tight">
                <Calculator size={32} className="mx-auto mb-2 text-befinlit-gold" />
                <p className="text-sm uppercase tracking-widest text-befinlit-gold mb-1">Utility</p>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-4 mb-3 text-[10px] uppercase tracking-widest font-bold">
                <span className="text-befinlit-gold">{tool.tag}</span>
                <span className={tool.status === "Ready" ? "text-green-600" : "text-gray-400"}>
                  • {tool.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-befinlit-navy mb-2 group-hover:text-befinlit-gold transition-colors">{tool.title}</h3>
              <p className="text-befinlit-navy/40 text-sm mb-4 font-medium italic">{tool.subtitle}</p>
              <p className="text-befinlit-navy/70 text-sm mb-6 leading-relaxed">
                {tool.description}
              </p>
              {tool.status === "Ready" && (
                <div className="flex items-center gap-2 text-befinlit-navy font-bold text-sm">
                  Launch Tool <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;