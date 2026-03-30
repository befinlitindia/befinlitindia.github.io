import React, { useState } from 'react';
import { TrendingDown, ChevronUp, ChevronDown } from 'lucide-react';
import { ComparisonResult } from './types';

interface StickyTaxSummaryProps {
    result: ComparisonResult;
}

const StickyTaxSummary: React.FC<StickyTaxSummaryProps> = ({ result }) => {
    const [expanded, setExpanded] = useState(false);
    const formatINR = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

    const hasAnyIncome = result.oldRegime.grossTotalIncome > 0 || result.newRegime.grossTotalIncome > 0;
    if (!hasAnyIncome) return null;

    const isNewBetter = result.recommendation === 'NEW';

    return (
        <>
            {/* Desktop: Floating card bottom-right */}
            <div className="hidden lg:block fixed bottom-8 right-24 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-sm shadow-2xl p-5 w-[320px]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <TrendingDown className="w-4 h-4 text-befinlit-navy" />
                            <span className="text-[10px] font-black text-befinlit-navy uppercase tracking-widest">Live Tax Summary</span>
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${isNewBetter ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                            {result.recommendation} Regime
                        </span>
                    </div>

                    {/* Tax Comparison */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className={`p-3 rounded-sm transition-all ${!isNewBetter ? 'bg-green-50 border border-green-200 ring-1 ring-green-300' : 'bg-slate-50 border border-slate-100'}`}>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Old Regime</p>
                            <p className={`text-sm font-black tabular-nums ${!isNewBetter ? 'text-green-700' : 'text-slate-700'}`}>{formatINR(result.oldRegime.totalTax)}</p>
                        </div>
                        <div className={`p-3 rounded-sm transition-all ${isNewBetter ? 'bg-green-50 border border-green-200 ring-1 ring-green-300' : 'bg-slate-50 border border-slate-100'}`}>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">New Regime</p>
                            <p className={`text-sm font-black tabular-nums ${isNewBetter ? 'text-green-700' : 'text-slate-700'}`}>{formatINR(result.newRegime.totalTax)}</p>
                        </div>
                    </div>

                    {/* Savings */}
                    {result.savings > 0 && (
                        <div className="bg-[#000a2e] rounded-sm p-3 text-center">
                            <p className="text-[9px] font-bold text-slate-400 mb-0.5">You save by choosing {result.recommendation}</p>
                            <p className="text-lg font-black text-yellow-400 tabular-nums">{formatINR(result.savings)}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile: Sticky bottom bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-2xl">
                    {/* Collapsed View */}
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full px-4 py-3 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <TrendingDown className="w-4 h-4 text-befinlit-navy" />
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-500">Old</span>
                                <span className={`text-xs font-black tabular-nums ${!isNewBetter ? 'text-green-700' : 'text-slate-700'}`}>{formatINR(result.oldRegime.totalTax)}</span>
                                <span className="text-slate-300">|</span>
                                <span className="text-[10px] font-bold text-slate-500">New</span>
                                <span className={`text-xs font-black tabular-nums ${isNewBetter ? 'text-green-700' : 'text-slate-700'}`}>{formatINR(result.newRegime.totalTax)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${isNewBetter ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                ✓ {result.recommendation}
                            </span>
                            {expanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
                        </div>
                    </button>

                    {/* Expanded Detail */}
                    {expanded && (
                        <div className="px-4 pb-4 animate-in slide-in-from-bottom-2 duration-200">
                            {result.savings > 0 && (
                                <div className="bg-[#000a2e] rounded-sm p-3 text-center">
                                    <p className="text-[9px] font-bold text-slate-400 mb-0.5">Save by choosing {result.recommendation} Regime</p>
                                    <p className="text-lg font-black text-yellow-400 tabular-nums">{formatINR(result.savings)}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default StickyTaxSummary;
