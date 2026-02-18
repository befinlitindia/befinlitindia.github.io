import React from 'react';
import { HelpCircle } from 'lucide-react';
import { UserInput, ComparisonResult } from './types';
import { preventNonNumericInput } from '../utils';

interface HRACalculatorProps {
    hraReceived: number;
    actualRentPaid: number;
    rentFrequency: 'monthly' | 'annual';
    hraBreakdown: ComparisonResult['hraBreakdown'];
    isMetro: boolean;
    onChange: (name: keyof UserInput, value: any) => void;
}

const HRACalculator: React.FC<HRACalculatorProps> = ({
    hraReceived,
    actualRentPaid,
    rentFrequency,
    hraBreakdown,
    isMetro,
    onChange,
}) => {
    const formatCurrency = (value: number) => `₹${Math.round(value).toLocaleString('en-IN')}`;

    return (
        <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm col-span-full">
            <h4 className="text-sm font-bold text-[#000a2e] mb-5 flex items-center gap-2">
                House Rent Allowance (HRA)
                <div className="group/tooltip relative">
                    <HelpCircle className="w-3 h-3 text-slate-300 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-[#000a2e] text-white text-[10px] rounded-sm opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 font-normal shadow-lg leading-relaxed">
                        HRA Exemption is the least of: Actual HRA, (Rent Paid - 10% Salary), or (40/50% Salary).
                    </div>
                </div>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                    <div className="relative">
                        <label className="block text-sm font-bold text-slate-600 mb-2">Annual HRA Received</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                            <input
                                type="number"
                                onKeyDown={preventNonNumericInput}
                                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                value={hraReceived || ''}
                                onChange={(e) => onChange('hraReceived', parseFloat(e.target.value) || 0)}
                                className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold focus:ring-1 focus:ring-[#000a2e] outline-none"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-bold text-slate-600 mb-2">Rent Paid Details</label>
                        <div className="flex bg-slate-100 p-1 rounded-sm gap-1.5 mb-2">
                            <button
                                onClick={() => onChange('rentFrequency', 'monthly')}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-sm transition-all duration-300 ${rentFrequency === 'monthly' ? 'bg-[#000a2e] text-white shadow-lg' : 'text-slate-500 hover:bg-white/50'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => onChange('rentFrequency', 'annual')}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-sm transition-all duration-300 ${rentFrequency === 'annual' ? 'bg-[#000a2e] text-white shadow-lg' : 'text-slate-500 hover:bg-white/50'}`}
                            >
                                Annual
                            </button>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                            <input
                                type="number"
                                onKeyDown={preventNonNumericInput}
                                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                value={actualRentPaid || ''}
                                onChange={(e) => onChange('actualRentPaid', parseFloat(e.target.value) || 0)}
                                className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold focus:ring-1 focus:ring-[#000a2e] outline-none"
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-sm space-y-3">
                    <p className="text-xs font-bold text-slate-400 mb-2 text-center">Calculation Breakdown</p>
                    <div className={`flex justify-between items-center text-xs font-semibold border-b border-slate-200 pb-2 ${(hraBreakdown.exemption === hraBreakdown.limit1 && hraReceived > 0 && actualRentPaid > 0) ? 'text-green-600' : ''}`}>
                        <span className={(hraBreakdown.exemption === hraBreakdown.limit1 && hraReceived > 0 && actualRentPaid > 0) ? 'text-green-600' : 'text-slate-500'}>Rent Less 10% Salary</span>
                        <span className={(hraBreakdown.exemption === hraBreakdown.limit1 && hraReceived > 0 && actualRentPaid > 0) ? 'text-green-600' : 'text-[#000a2e]'}>{formatCurrency(hraBreakdown.limit1)}</span>
                    </div>
                    <div className={`flex justify-between items-center text-xs font-semibold border-b border-slate-200 pb-2 ${(hraBreakdown.exemption === hraBreakdown.limit2 && hraReceived > 0 && actualRentPaid > 0) ? 'text-green-600' : ''}`}>
                        <span className={(hraBreakdown.exemption === hraBreakdown.limit2 && hraReceived > 0 && actualRentPaid > 0) ? 'text-green-600' : 'text-slate-500'}>{isMetro ? '50% Salary (Metro)' : '40% Salary (Non-Metro)'}</span>
                        <span className={(hraBreakdown.exemption === hraBreakdown.limit2 && hraReceived > 0 && actualRentPaid > 0) ? 'text-green-600' : 'text-[#000a2e]'}>{formatCurrency(hraBreakdown.limit2)}</span>
                    </div>
                    <div className={`flex justify-between items-center text-xs font-semibold pt-1 ${(hraBreakdown.exemption === hraReceived && hraReceived > 0 && actualRentPaid > 0) ? 'text-green-600' : ''}`}>
                        <span className={(hraBreakdown.exemption === hraReceived && hraReceived > 0 && actualRentPaid > 0) ? 'text-green-600' : 'text-slate-500'}>Actual HRA Received</span>
                        <span className={(hraBreakdown.exemption === hraReceived && hraReceived > 0 && actualRentPaid > 0) ? 'text-green-600' : 'text-[#000a2e]'}>{formatCurrency(hraReceived)}</span>
                    </div>
                    <div className="mt-4 p-4 bg-[#000a2e] rounded-sm text-center">
                        <p className="text-[10px] font-bold text-slate-400 mb-1">Maximum Exemption Eligible (Lowest of the three)</p>
                        <p className="text-xl font-bold text-yellow-400">₹{hraBreakdown.exemption.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRACalculator;
