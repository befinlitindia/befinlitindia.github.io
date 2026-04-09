import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface Props {
    onOpenConsultation?: () => void;
    highlightId?: string;
}

const GlossaryOfChanges: React.FC<Props> = ({ onOpenConsultation, highlightId }) => {

    // Handle smooth scrolling for internal links
    useEffect(() => {
        if (highlightId) {
            // small timeout to ensure rendering is complete
            setTimeout(() => {
                const el = document.getElementById(`row-${highlightId}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [highlightId]);

    return (
        <article className="max-w-[1400px] mx-auto px-4 md:px-8 pt-32 md:pt-48 pb-32">
            <div className="relative flex flex-col md:flex-row items-center justify-center mb-6 gap-4 md:gap-0">
                <div className="md:absolute md:left-0">
                    <Link
                        to="/glossary"
                        className="flex items-center gap-2 text-befinlit-navy/40 hover:text-befinlit-navy transition-colors font-bold text-xs uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} /> Back to Glossary
                    </Link>
                </div>
                <span className="inline-block py-1 px-3 border border-befinlit-navy/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-befinlit-navy">
                    Regulatory Updates
                </span>
            </div>

            {/* Header */}
            <header className="text-center mb-16 border-b border-befinlit-navy/10 pb-12">
                <h1 className="text-3xl md:text-5xl font-bold font-serif text-befinlit-navy leading-tight mb-6 flex items-center justify-center gap-2">
                    <span className="text-befinlit-gold">*</span> Glossary of Changes
                </h1>
                <p className="text-lg md:text-xl text-befinlit-navy/70 leading-relaxed italic font-serif max-w-4xl mx-auto">
                    The above sections and forms are in line with the Income Tax Act, 1961. However, the Income Tax Act, 2025 will come into effect from 1 April 2026. The relevant sections and the content changes have been updated below:
                </p>
            </header>

            {/* Glossary content */}
            <section className="print:hidden">
                <div className="overflow-x-auto max-w-7xl mx-auto space-y-12">
                    {/* Sections Table */}
                    <div>
                        <h3 className="text-2xl font-bold font-serif text-befinlit-navy mb-4 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-befinlit-gold inline-block"></span>
                            Sections
                        </h3>
                        <table className="w-full text-left border-collapse bg-white border border-befinlit-navy/10 rounded-sm overflow-hidden shadow-sm">
                            <thead className="bg-befinlit-navy text-white text-xs tracking-widest font-bold">
                                <tr>
                                    <th className="p-4 border-b border-white/10 text-center">Particulars</th>
                                    <th className="p-4 border-b border-white/10 text-center">Section in 1961</th>
                                    <th className="p-4 border-b border-white/10 text-center">Section in 2025</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-befinlit-navy/80">
                                <tr id="row-62" className={`transition-all duration-700 ${highlightId === '44AA' || highlightId === '62' ? 'bg-befinlit-gold/20 scale-[1.01] shadow-sm relative z-10 border-l-4 border-befinlit-gold' : 'hover:bg-befinlit-gold/5'}`}>
                                    <td className="p-4 border-b border-befinlit-navy/5">Maintenance of Accounts</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">44AA</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">62</td>
                                </tr>
                                <tr id="row-58" className={`transition-all duration-700 ${highlightId === '44ADA' || highlightId === '44AD' || highlightId === '58' ? 'bg-befinlit-gold/20 scale-[1.01] shadow-sm relative z-10 border-l-4 border-befinlit-gold' : 'hover:bg-befinlit-gold/5 bg-gray-50/30'}`}>
                                    <td className="p-4 border-b border-befinlit-navy/5">Presumptive Taxation (Business & Professionals)</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">44AD & 44ADA</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">58</td>
                                </tr>
                                <tr id="row-87A" className={`transition-all duration-700 ${highlightId === '87A' ? 'bg-befinlit-gold/20 scale-[1.01] shadow-sm relative z-10 border-l-4 border-befinlit-gold' : 'hover:bg-befinlit-gold/5'}`}>
                                    <td className="p-4 border-b border-befinlit-navy/5">Tax Rebate</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">87A</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">156</td>
                                </tr>
                                <tr className="hover:bg-befinlit-gold/5 transition-colors bg-gray-50/30">
                                    <td className="p-4 border-b border-befinlit-navy/5">Simplified/New Tax Regime</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">115BAC</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">202</td>
                                </tr>
                                <tr id="row-393" className={`transition-all duration-700 ${highlightId === '194J' || highlightId === '195' || highlightId === '393' ? 'bg-befinlit-gold/20 scale-[1.01] shadow-sm relative z-10 border-l-4 border-befinlit-gold' : 'hover:bg-befinlit-gold/5'}`}>
                                    <td className="p-4 border-b border-befinlit-navy/5">TDS (Professional Services & Non-Residents)</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">194J & 195</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">393</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Forms Table */}
                    <div>
                        <h3 className="text-2xl font-bold font-serif text-befinlit-navy mb-4 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-befinlit-gold inline-block"></span>
                            Forms
                        </h3>
                        <table className="w-full text-left border-collapse bg-white border border-befinlit-navy/10 rounded-sm overflow-hidden shadow-sm">
                            <thead className="bg-befinlit-navy text-white text-xs tracking-widest font-bold">
                                <tr>
                                    <th className="p-4 border-b border-white/10 text-center">Particulars</th>
                                    <th className="p-4 border-b border-white/10 text-center">Form in 1961</th>
                                    <th className="p-4 border-b border-white/10 text-center">Form in 2025</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-befinlit-navy/80">
                                <tr className="hover:bg-befinlit-gold/5 transition-colors">
                                    <td className="p-4 border-b border-befinlit-navy/5">Annual Tax Statement</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">26AS</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">168</td>
                                </tr>
                                <tr className="hover:bg-befinlit-gold/5 transition-colors bg-gray-50/30">
                                    <td className="p-4 border-b border-befinlit-navy/5">Statement of income from a country outside India and Foreign Tax Credit</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">Form 67</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">Form 44</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default GlossaryOfChanges;
