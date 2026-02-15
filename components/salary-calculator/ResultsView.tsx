import React from 'react';
import { ComparisonResult } from './types';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ResultsView: React.FC<{ result: ComparisonResult }> = ({ result }) => {
    const [showSlabs, setShowSlabs] = React.useState(false);
    const chartData = [
        { name: 'Old Regime', tax: result.oldRegime.totalTax },
        { name: 'New Regime', tax: result.newRegime.totalTax },
    ];

    const formatINR = (val: number) => Math.round(val).toLocaleString('en-IN');

    const TaxBreakdownSection = ({ regime, title }: { regime: any, title: string }) => (
        <div className="bg-slate-50 p-5 rounded-sm border border-slate-100 h-full flex flex-col">
            <h4 className="text-[11px] font-black text-[#000a2e] mb-4 uppercase tracking-widest border-b border-slate-200 pb-2 flex items-center justify-between">
                {title} Detailed Breakdown
                {regime.marginalRelief > 0 && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-black">RELIEF APPLIED</span>}
            </h4>
            <div className="space-y-2.5 flex-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Standard Deduction (u/s 16ia)</span>
                    <span className="text-red-500">- ₹{formatINR(regime.standardDeduction)}</span>
                </div>
                {regime.totalDeductions > regime.standardDeduction && (
                    <div className="flex justify-between text-[11px] font-bold text-slate-500">
                        <span>Other Deductions/Exemptions</span>
                        <span className="text-red-500">- ₹{formatINR(Math.max(0, regime.totalDeductions - regime.standardDeduction))}</span>
                    </div>
                )}
                <div className="flex justify-between text-[11px] font-black text-[#000a2e] pt-1 border-t border-slate-100 mt-1">
                    <span>Base Tax (as per slabs)</span>
                    <span>₹{formatINR(regime.baseTax)}</span>
                </div>
                {regime.rebate87A > 0 && (
                    <div className="flex justify-between text-[11px] font-bold text-green-600">
                        <span>Section 87A Rebate</span>
                        <span>- ₹{formatINR(regime.rebate87A)}</span>
                    </div>
                )}
                {regime.marginalRelief > 0 && (
                    <div className="flex justify-between text-[11px] font-bold text-blue-600">
                        <span>Marginal Relief</span>
                        <span>- ₹{formatINR(regime.marginalRelief)}</span>
                    </div>
                )}
                {regime.surcharge > 0 && (
                    <div className="flex justify-between text-[11px] font-bold text-orange-600">
                        <span>Surcharge</span>
                        <span>+ ₹{formatINR(regime.surcharge)}</span>
                    </div>
                )}
                <div className="flex justify-between text-[11px] font-bold text-slate-400">
                    <span>Health & Education Cess (4%)</span>
                    <span>+ ₹{formatINR(regime.cess)}</span>
                </div>
            </div>
            <div className="flex justify-between text-sm font-black text-[#000a2e] pt-4 mt-2 border-t border-slate-200">
                <span>Total Tax Payable</span>
                <span className="text-xl">₹{formatINR(regime.totalTax)}</span>
            </div>
        </div>
    );

    const SlabTable = ({ title, slabs, subtitle }: { title: string, slabs: any[], subtitle?: string }) => (
        <div className="bg-white p-5 rounded-sm border border-slate-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
                <h4 className="text-[11px] font-black text-[#000a2e] uppercase tracking-wider">{title}</h4>
                {subtitle && <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2 py-0.5 rounded-sm uppercase">{subtitle}</span>}
            </div>
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-[11px]">
                    <thead>
                        <tr className="text-slate-400 font-bold border-b border-slate-100">
                            <th className="text-left py-2 font-black">Income Slab</th>
                            <th className="text-center py-2 font-black">Rate</th>
                            <th className="text-right py-2 font-black">Tax Amount</th>
                        </tr>
                    </thead>
                    <tbody className="font-semibold text-slate-600">
                        {slabs.map((s, i) => (
                            <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                <td className="py-2.5">{s.limit}</td>
                                <td className="text-center py-2.5 text-[#000a2e]">{s.rate}</td>
                                <td className="text-right py-2.5 font-bold">₹{formatINR(s.amount)}</td>
                            </tr>
                        ))}
                        {slabs.length < 7 && Array.from({ length: 7 - slabs.length }).map((_, i) => (
                            <tr key={`empty-${i}`} className="border-b border-transparent">
                                <td className="py-2.5 opacity-0">-</td>
                                <td className="py-2.5 opacity-0">-</td>
                                <td className="py-2.5 opacity-0">-</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* High-Level Summary Card */}
            <div className="bg-white rounded-sm p-6 shadow-sm border border-slate-100 animate-in slide-in-from-top-4 duration-500 overflow-hidden">
                <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-2">
                    <h3 className="text-sm font-black text-[#000a2e] uppercase tracking-wider">Tax calculation summary</h3>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Full Regime Comparison</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    {/* Common Gross Income */}
                    <div className="space-y-1 pr-4 py-2 md:py-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gross Income</p>
                        <p className="text-lg font-black text-[#000a2e]">₹{formatINR(result.oldRegime.grossTotalIncome)}</p>
                        <p className="text-[9px] font-bold text-slate-300 italic">Pre-deduction</p>
                    </div>

                    {/* Old Regime Summary */}
                    <div className="space-y-1 px-0 md:px-4 py-4 md:py-0 bg-slate-50/30 md:bg-transparent -mx-6 md:mx-0 px-6 md:px-4">
                        <p className="text-[10px] font-bold text-[#000a2e] uppercase tracking-wider">Deductions (Old)</p>
                        <p className="text-lg font-black text-red-500">- ₹{formatINR(result.oldRegime.totalDeductions)}</p>
                        <p className="text-[9px] font-bold text-slate-400 italic">Exempt + 80C + 80D...</p>
                    </div>
                    <div className="space-y-1 px-0 md:px-4 py-4 md:py-0">
                        <p className="text-[10px] font-bold text-[#000a2e] uppercase tracking-wider">Net Taxable (Old)</p>
                        <p className="text-lg font-black text-green-600">₹{formatINR(result.oldRegime.netTaxableIncome)}</p>
                        <p className="text-[9px] font-bold text-slate-400 italic">Final Assessment</p>
                    </div>

                    {/* New Regime Summary */}
                    <div className="space-y-1 px-0 md:px-4 py-4 md:py-0 bg-blue-50/20 md:bg-transparent -mx-6 md:mx-0 px-6 md:px-4">
                        <p className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">Deductions (New)</p>
                        <p className="text-lg font-black text-red-400">- ₹{formatINR(result.newRegime.totalDeductions)}</p>
                        <p className="text-[9px] font-bold text-slate-400 italic">Std Ded + 80CCD(2)</p>
                    </div>
                    <div className="space-y-1 pl-0 md:pl-4 py-4 md:py-0">
                        <p className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">Net Taxable (New)</p>
                        <p className="text-lg font-black text-blue-600">₹{formatINR(result.newRegime.netTaxableIncome)}</p>
                        <p className="text-[9px] font-bold text-slate-400 italic">Final Assessment</p>
                    </div>
                </div>
            </div>

            {/* Projection Main Card */}
            <div className="bg-white rounded-sm p-6 shadow-sm border-l-4 border-[#000a2e]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold tracking-tight text-[#000a2e]">Tax Projection</h2>
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-3 py-1 rounded-full">
                        AY 2026-27
                    </span>
                </div>

                <div className="h-48 mb-8 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: 4, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} />
                            <Bar dataKey="tax" radius={[2, 2, 0, 0]} barSize={40}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.name.includes(result.recommendation) ? '#16a34a' : '#000a2e'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Strategy Alert for Marginal Relief */}
                {result.newRegime.marginalRelief > 0 && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-sm flex gap-3 animate-in zoom-in duration-500">
                        <div className="bg-blue-600 p-1.5 rounded-sm h-fit">
                            <Info className="w-3.5 h-3.5 text-white shrink-0" />
                        </div>
                        <div className="text-[11px] leading-relaxed">
                            <p className="font-black text-blue-900 uppercase tracking-wider mb-1">Tax Cliff Protection Applied</p>
                            <p className="text-blue-800 font-medium italic">
                                The Law ensures that if you earn slightly above ₹12 Lakh, you don't pay high tax instantly.
                                <strong> Marginal relief</strong> has capped your tax liability to only the extra income earned above the limit.
                            </p>
                        </div>
                    </div>
                )}

                {/* Grid for Side-by-Side Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <TaxBreakdownSection title="Old Regime" regime={result.oldRegime} />
                    <TaxBreakdownSection title="New Regime" regime={result.newRegime} />
                </div>

                {result.savings > 0 && (
                    <div className="mt-8 p-5 bg-[#000a2e] rounded-sm text-center shadow-2xl hover:scale-[1.02] transition-transform duration-500">
                        <p className="text-slate-400 text-[10px] font-bold mb-1 uppercase tracking-[0.2em]">Recommended Regime: {result.recommendation}</p>
                        <p className="text-xs text-slate-300 mb-1">Total Annual Savings</p>
                        <p className="text-4xl font-black tracking-tighter text-yellow-400">₹{formatINR(result.savings)}</p>
                    </div>
                )}

                {/* Detailed Slab Breakdown Trigger */}
                <div className="mt-10 pt-6 border-t border-slate-50">
                    <button
                        onClick={() => setShowSlabs(!showSlabs)}
                        className="w-full flex items-center justify-between text-[11px] font-black text-slate-400 hover:text-[#000a2e] transition-colors uppercase tracking-widest"
                    >
                        View Side-by-Side Slab Calculation
                        {showSlabs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showSlabs && (
                        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500 slide-in-from-top-4">
                            <SlabTable
                                title="Old Regime Slabs"
                                subtitle="Standard"
                                slabs={result.oldRegime.slabBreakdown}
                            />
                            <SlabTable
                                title="New Regime Slabs (AY 26-27)"
                                subtitle="4L Increments"
                                slabs={result.newRegime.slabBreakdown}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultsView;
