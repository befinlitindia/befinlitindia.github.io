import React from 'react';
import { HelpCircle } from 'lucide-react';
import { UserInput } from './types';
import { preventNonNumericInput } from '../utils';

interface LTACalculatorProps {
    ltaReceived: number;
    ltaSpent: number;
    onChange: (name: keyof UserInput, value: any) => void;
}

const LTACalculator: React.FC<LTACalculatorProps> = ({
    ltaReceived,
    ltaSpent,
    onChange
}) => {
    const exemption = Math.min(ltaReceived, ltaSpent);
    const isReceivedLower = ltaReceived <= ltaSpent && ltaReceived > 0;
    const isSpentLower = ltaSpent < ltaReceived && ltaSpent > 0;

    return (
        <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm col-span-full">
            <h4 className="text-sm font-bold text-[#000a2e] mb-5 flex items-center gap-2">
                Leave Travel Allowance (LTA)
                <div className="group/tooltip relative">
                    <HelpCircle className="w-3 h-3 text-slate-300 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-[#000a2e] text-white text-[10px] rounded-sm opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 font-normal shadow-lg leading-relaxed">
                        LTA Exemption is limited to the actual amount spent on domestic travel for self and family, up to the amount received.
                    </div>
                </div>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                    <div className="relative">
                        <label className="block text-xs font-bold text-slate-600 mb-2">LTA Amount Received</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                            <input
                                type="number"
                                onKeyDown={preventNonNumericInput}
                                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                value={ltaReceived || ''}
                                onChange={(e) => onChange('ltaReceived', parseFloat(e.target.value) || 0)}
                                className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold focus:ring-1 focus:ring-[#000a2e] outline-none"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-xs font-bold text-slate-600 mb-2">Actual LTA Travel Expense</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                            <input
                                type="number"
                                onKeyDown={preventNonNumericInput}
                                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                value={ltaSpent || ''}
                                onChange={(e) => onChange('ltaSpent', parseFloat(e.target.value) || 0)}
                                className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold focus:ring-1 focus:ring-[#000a2e] outline-none"
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-sm space-y-3">
                    <p className="text-xs font-bold text-slate-400 mb-2 text-center">Exemption Rule</p>
                    <div className={`flex justify-between items-center text-xs font-semibold border-b border-slate-200 pb-2 ${isReceivedLower ? 'text-green-600' : 'text-slate-500'}`}>
                        <span>LTA Received</span>
                        <span>₹{ltaReceived.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={`flex justify-between items-center text-xs font-semibold pt-1 ${isSpentLower ? 'text-green-600' : 'text-slate-500'}`}>
                        <span>Actual Spent</span>
                        <span>₹{ltaSpent.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="mt-4 p-4 bg-[#000a2e] rounded-sm text-center">
                        <p className="text-[10px] font-bold text-slate-400 mb-1">Final LTA Exemption (Lower of the two)</p>
                        <p className="text-xl font-bold text-yellow-400">₹{exemption.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LTACalculator;
