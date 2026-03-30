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

    const CollapsibleBreakdown = ({ label, total, items, type }: { label: string, total: number, items: { name: string, value: number }[], type: 'exempt' | 'deduct' }) => {
        const [isOpen, setIsOpen] = React.useState(false);
        const colorClass = 'text-red-500';

        return (
            <div className="space-y-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors py-1 group"
                >
                    <span className="flex items-center gap-1">
                        {label}
                        {items.length > 0 && (
                            isOpen ? <ChevronUp className="w-3 h-3 text-slate-400 group-hover:text-[#000a2e]" /> : <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-[#000a2e]" />
                        )}
                    </span>
                    <span className={`${colorClass} font-black`}>- ₹{formatINR(total)}</span>
                </button>
                {isOpen && items.length > 0 && (
                    <div className="pl-4 space-y-2 border-l-2 border-slate-100 mb-2 animate-in slide-in-from-top-1 duration-200">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-[10px] font-bold text-slate-500">
                                <span>{item.name}</span>
                                <span className="tabular-nums">₹{formatINR(item.value)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const TaxBreakdownSection = ({ regime, title }: { regime: any, title: string }) => (
        <div className="bg-white p-8 rounded-sm border border-slate-100 h-full flex flex-col shadow-sm">
            <h4 className="text-[12px] font-black text-[#000a2e] mb-8 uppercase tracking-widest border-b border-slate-100 pb-4 flex items-center justify-between">
                {title} Details
                {regime.marginalRelief > 0 && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[9px] font-black tracking-normal uppercase">Relief Applied</span>}
            </h4>

            <div className="space-y-6 flex-1">
                {/* Income Summary */}
                <div className="flex justify-between text-sm font-black text-[#000a2e] pb-3 border-b border-slate-50">
                    <span className="text-slate-500 font-bold">Gross Total Income</span>
                    <span>₹{formatINR(regime.grossTotalIncome)}</span>
                </div>

                {/* Deductions Section */}
                <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deductions & Exemptions</p>

                    <div className="flex justify-between text-xs font-bold text-slate-600">
                        <span>Standard Deduction u/s 16(ia)</span>
                        <span className="text-red-500 font-black">- ₹{formatINR(regime.standardDeduction)}</span>
                    </div>

                    {regime.entertainmentAllowance > 0 && (
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                            <span>Entertainment Allowance u/s 16(ii)</span>
                            <span className="text-red-500 font-black">- ₹{formatINR(regime.entertainmentAllowance)}</span>
                        </div>
                    )}

                    {regime.professionalTax > 0 && (
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                            <span>Professional Tax u/s 16(iii)</span>
                            <span className="text-red-500 font-black">- ₹{formatINR(regime.professionalTax)}</span>
                        </div>
                    )}

                    {regime.totalExemptions > 0 && (
                        <CollapsibleBreakdown
                            label="Exemptions"
                            total={regime.totalExemptions}
                            items={regime.itemizedExemptions}
                            type="exempt"
                        />
                    )}

                    <CollapsibleBreakdown
                        label="Deductions under Chapter VI-A"
                        total={regime.chapterVIA}
                        items={regime.itemizedDeductions}
                        type="deduct"
                    />

                    <div className="flex justify-between text-xs font-black text-red-600 pt-2 border-t border-dotted border-slate-200">
                        <span>Total Deductions</span>
                        <span>- ₹{formatINR(regime.totalDeductions)}</span>
                    </div>
                </div>

                {/* Net Taxable */}
                <div className="flex justify-between text-sm font-black text-green-700 py-4 border-y border-slate-100 bg-slate-50/50 -mx-8 px-8">
                    <span>Net Taxable Income</span>
                    <span>₹{formatINR(regime.netTaxableIncome)}</span>
                </div>

                {/* Tax Calculation */}
                <div className="space-y-3 pt-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax Calculation Details</p>
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                        <span>Base Tax (as per slabs)</span>
                        <span className="text-[#000a2e] font-black">₹{formatINR(regime.baseTax)}</span>
                    </div>
                    {regime.rebate87A > 0 && (
                        <div className="flex justify-between text-xs font-bold text-green-600">
                            <span>Section 87A Rebate</span>
                            <span className="font-black">- ₹{formatINR(regime.rebate87A)}</span>
                        </div>
                    )}
                    {regime.marginalRelief > 0 && (
                        <div className="flex justify-between text-xs font-bold text-blue-600">
                            <span>Marginal Relief</span>
                            <span className="font-black">- ₹{formatINR(regime.marginalRelief)}</span>
                        </div>
                    )}
                    {regime.surcharge > 0 && (
                        <div className="flex justify-between text-xs font-bold text-orange-600">
                            <span>Surcharge</span>
                            <span className="font-black">+ ₹{formatINR(regime.surcharge)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                        <span>Health & Education Cess (4%)</span>
                        <span className="font-black">+ ₹{formatINR(regime.cess)}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-stretch text-sm font-black text-white bg-[#000a2e] -mx-8 -mb-8 p-8 mt-8 rounded-b-sm">
                <div className="flex justify-between items-center">
                    <span>Total Tax Payable</span>
                    <span className="text-3xl text-yellow-400 tabular-nums">₹{formatINR(regime.totalTax)}</span>
                </div>
                {regime.grossTotalIncome > 0 && (
                    <div className="mt-3 flex justify-end">
                        <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-[10px] font-black tracking-wide">
                            Effective Tax Rate: {regime.effectiveRate.toFixed(1)}%
                        </span>
                    </div>
                )}
            </div>
        </div>
    );

    const SlabTable = ({ title, slabs }: { title: string, slabs: any[] }) => (
        <div className="bg-white p-5 rounded-sm border border-slate-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
                <h4 className="text-[12px] font-black text-[#000a2e] uppercase tracking-widest">{title}</h4>
            </div>
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-[11px]">
                    <thead>
                        <tr className="text-slate-400 font-black border-b border-slate-100 uppercase tracking-tighter">
                            <th className="text-left py-3">Income Slab</th>
                            <th className="text-center py-3">Rate</th>
                            <th className="text-right py-3">Tax Amount</th>
                        </tr>
                    </thead>
                    <tbody className="font-bold text-slate-600">
                        {slabs.map((s, i) => (
                            <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="py-3 text-[#000a2e]">{s.limit}</td>
                                <td className="text-center py-3">{s.rate}</td>
                                <td className="text-right py-3 text-[#000a2e]">₹{formatINR(s.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-sm p-8 shadow-sm border-l-4 border-[#000a2e]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-slate-100 pb-6 gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-[#000a2e]">Tax Projection</h2>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-black">Assessment Year 2026-27</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="bg-blue-50 px-5 py-3 rounded-sm border border-blue-100 shadow-sm">
                        <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1">Recommended Regime</p>
                        <p className="text-2xl font-black text-blue-900">{result.recommendation}</p>
                    </div>
                    {result.savings > 0 && (
                        <div className="bg-green-50 px-5 py-3 rounded-sm border border-green-100 shadow-sm">
                            <p className="text-[10px] text-green-600 font-black uppercase tracking-widest mb-1">Annual Savings</p>
                            <p className="text-2xl font-black text-green-700">₹{formatINR(result.savings)}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Side: Summary & Chart */}
                <div className="lg:col-span-5 flex flex-col">
                    <div className="flex-1 bg-slate-50/50 rounded-sm p-6 border border-slate-100 relative min-h-[400px]">
                        <div className="absolute top-4 left-6">
                            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Tax Comparison</h4>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 40, right: 20, left: 20, bottom: 20 }}>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12, fill: '#1e293b', fontWeight: 800 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{ borderRadius: 4, border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '13px', fontWeight: 'bold', padding: '12px' }}
                                />
                                <Bar dataKey="tax" radius={[4, 4, 0, 0]} barSize={60}>
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.name.toUpperCase().includes(result.recommendation) ? '#16a34a' : '#ef4444'}
                                            fillOpacity={entry.name.toUpperCase().includes(result.recommendation) ? 1 : 0.9}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Strategy Alert for Marginal Relief */}
                    {result.newRegime.marginalRelief > 0 && (
                        <div className="mt-8 p-5 bg-blue-50 border border-blue-100 rounded-sm flex gap-4 items-start">
                            <div className="bg-blue-600 p-2 rounded-sm shrink-0">
                                <Info className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-[12px] leading-relaxed">
                                <p className="font-black text-blue-900 uppercase tracking-wider mb-1">Tax Cliff Protection Applied</p>
                                <p className="text-blue-800 font-medium italic">
                                    <strong>Marginal relief</strong> has capped your tax liability to only the extra income earned above the limit.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Detailed Breakdowns */}
                <div className="lg:col-span-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                        <TaxBreakdownSection title="Old Regime" regime={result.oldRegime} />
                        <TaxBreakdownSection title="New Regime" regime={result.newRegime} />
                    </div>
                </div>
            </div>

            {/* Detailed Slab Breakdown Trigger */}
            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                <button
                    onClick={() => setShowSlabs(!showSlabs)}
                    className="inline-flex items-center gap-4 px-8 py-3 bg-slate-50 border border-slate-200 rounded-full text-[12px] font-black text-[#000a2e] hover:bg-slate-100 transition-all uppercase tracking-widest shadow-sm"
                >
                    {showSlabs ? 'Hide Tax Slab Calculation' : 'View Side-by-Side Tax Slab Calculation'}
                    {showSlabs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showSlabs && (
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in duration-700 slide-in-from-top-6 text-left">
                        <SlabTable
                            title="Old Regime Slabs"
                            slabs={result.oldRegime.slabBreakdown}
                        />
                        <SlabTable
                            title="New Regime Slabs"
                            slabs={result.newRegime.slabBreakdown}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultsView;
