import React from 'react';
import { HelpCircle, Check, AlertTriangle } from 'lucide-react';
import { UserInput } from './types';
import { preventNonNumericInput } from '../utils';

/* Inline progress bar for 80D fields */
const D_ProgressBar: React.FC<{ value: number; max: number }> = ({ value, max }) => {
    const pct = Math.min(100, (value / max) * 100);
    const isApproaching = pct >= 80 && pct < 100;
    const isMaxed = pct >= 100;
    const barColor = isMaxed ? 'bg-green-500' : isApproaching ? 'bg-amber-500' : 'bg-slate-300';
    const fmt = (v: number) => `₹${Math.round(v).toLocaleString('en-IN')}`;

    return (
        <div className="mt-2 space-y-1">
            <div className="w-full h-[3px] bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`} style={{ width: `${pct}%` }} />
            </div>
            <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-400 tabular-nums">{fmt(Math.min(value, max))} / {fmt(max)}</span>
                {isMaxed && <span className="text-[9px] font-bold text-green-600 flex items-center gap-1 animate-in fade-in slide-in-from-bottom-1 duration-300"><Check className="w-3 h-3" /> Max limit reached!</span>}
                {isApproaching && !isMaxed && <span className="text-[9px] font-bold text-amber-600 flex items-center gap-1 animate-in fade-in slide-in-from-bottom-1 duration-300"><AlertTriangle className="w-3 h-3" /> Limit approaching</span>}
            </div>
        </div>
    );
};

interface Section80DCalculatorProps {
    inputs: UserInput;
    onChange: (name: keyof UserInput, value: any) => void;
}

const Section80DCalculator: React.FC<Section80DCalculatorProps> = ({ inputs, onChange }) => {
    const selfLimit = inputs.userAge >= 60 ? 50000 : 25000;
    const parentsLimit = Math.max(inputs.fatherAge || 0, inputs.motherAge || 0) >= 60 ? 50000 : 25000;

    return (
        <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm col-span-full">
            <h4 className="text-sm font-bold text-[#000a2e] mb-5 flex items-center gap-2">
                Section 80D: Medical Insurance & Expenses
                <div className="group/tooltip relative">
                    <HelpCircle className="w-3 h-3 text-slate-300 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#000a2e] text-white text-[10px] rounded-sm opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 font-normal shadow-lg leading-relaxed">
                        Deductions for medical insurance premiums. <strong>Note:</strong> Only payments via bank/digital modes are allowed. Cash payments (except for preventive checkups) are not eligible.
                    </div>
                </div>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Self/Spouse/Kids Insurance */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600">
                        Insurance (Self/Spouse/Kids)
                        <span className="text-[9px] text-slate-400 font-normal ml-1">Max ₹{(selfLimit / 1000).toFixed(0)}K</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                        <input
                            type="number"
                            onKeyDown={preventNonNumericInput}
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            value={inputs.section80D_SelfInsurance || ''}
                            onChange={(e) => onChange('section80D_SelfInsurance', parseFloat(e.target.value) || 0)}
                            className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold focus:ring-1 focus:ring-[#000a2e] outline-none"
                            placeholder="0"
                        />
                    </div>
                    {inputs.section80D_SelfInsurance > 0 && (
                        <D_ProgressBar value={inputs.section80D_SelfInsurance} max={selfLimit} />
                    )}
                </div>

                {/* Parents Insurance */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600">
                        Insurance (Parents)
                        <span className="text-[9px] text-slate-400 font-normal ml-1">Max ₹{(parentsLimit / 1000).toFixed(0)}K</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                        <input
                            type="number"
                            onKeyDown={preventNonNumericInput}
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            value={inputs.section80D_ParentsInsurance || ''}
                            onChange={(e) => onChange('section80D_ParentsInsurance', parseFloat(e.target.value) || 0)}
                            className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold focus:ring-1 focus:ring-[#000a2e] outline-none"
                            placeholder="0"
                        />
                    </div>
                    {inputs.section80D_ParentsInsurance > 0 && (
                        <D_ProgressBar value={inputs.section80D_ParentsInsurance} max={parentsLimit} />
                    )}
                </div>

                {/* Preventive Checkup */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600 flex items-center gap-1">
                        Preventive Checkup
                        <div className="group/help relative">
                            <HelpCircle className="w-2.5 h-2.5 text-slate-300 cursor-help" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-40 p-2 bg-[#000a2e] text-white text-[9px] rounded-sm opacity-0 group-hover/help:opacity-100 pointer-events-none font-normal">
                                Max ₹5,000 as per Act.
                            </div>
                        </div>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                        <input
                            type="number"
                            onKeyDown={preventNonNumericInput}
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            value={inputs.section80D_PreventiveCheckup || ''}
                            onChange={(e) => onChange('section80D_PreventiveCheckup', parseFloat(e.target.value) || 0)}
                            className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold focus:ring-1 focus:ring-[#000a2e] outline-none"
                            placeholder="0"
                        />
                    </div>
                    {inputs.section80D_PreventiveCheckup > 0 && (
                        <D_ProgressBar value={inputs.section80D_PreventiveCheckup} max={5000} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Section80DCalculator;
