import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Tag, ArrowRight } from 'lucide-react';

const Glossary: React.FC = () => {
    return (
        <div className="animate-fade-in pt-32 md:pt-48 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto">
            <header className="mb-16 border-b border-befinlit-navy/10 pb-12">
                <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="text-befinlit-gold" size={20} />
                    <span className="text-befinlit-gold font-bold tracking-[0.2em] uppercase text-xs">Reference Materials</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-befinlit-navy mb-6 font-serif">The Glossary</h1>
                <p className="text-lg text-befinlit-navy/60 leading-relaxed italic">
                    Your comprehensive index of financial terms, regulatory updates, and compliance changes in India.
                </p>
            </header>

            <div className="space-y-12">
                {/* Glossary of Changes Card */}
                <Link
                    to="/glossary/changes"
                    className="group cursor-pointer bg-white border border-befinlit-navy/5 p-8 rounded-sm hover:border-befinlit-gold transition-all shadow-sm hover:shadow-md flex flex-col md:flex-row gap-8 block"
                >
                    {/* Distinct color styling for Glossary: navy/gold gradient */}
                    <div className="w-full md:w-1/3 aspect-[4/3] bg-gradient-to-br from-befinlit-navy via-befinlit-navy/90 to-befinlit-gold/80 rounded-sm flex items-center justify-center p-6 relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#C5A059 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                        <BookOpen size={40} className="text-befinlit-gold opacity-20 absolute -bottom-2 -right-2" />
                        <div className="text-white text-center font-bold font-serif leading-tight">
                            <p className="text-lg">Glossary of Changes</p>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center gap-4 mb-3 text-[10px] uppercase tracking-widest font-bold">
                            <span className="text-befinlit-gold flex items-center gap-1"><Tag size={12} /> Regulatory Updates</span>
                        </div>
                        <h3 className="text-2xl font-bold text-befinlit-navy mb-3 group-hover:text-befinlit-gold transition-colors">
                            <span className="block text-lg font-medium opacity-80 mb-1">Income Tax Act</span>
                            Glossary of Changes 2025
                        </h3>
                        <p className="text-befinlit-navy/70 text-sm mb-6 leading-relaxed text-justify">
                            A comprehensive mapping of essential sections from the Income Tax Act, 1961 to the upcoming changes outlined in the new Income Tax Act, 2025 (effective April 1, 2026). Essential reference for taxpayers preparing for the transition.
                        </p>
                        <div className="flex items-center gap-2 text-befinlit-navy font-bold text-sm">
                            View Glossary <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Glossary;
