import React, { useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Section, InputField, ToggleField, DynamicRow } from './salary-calculator/FormSections';
import ResultsView from './salary-calculator/ResultsView';
import Compliances from './salary-calculator/Compliances';
import LeadForm from './salary-calculator/LeadForm';
import { UserInput, CustomComponent } from './salary-calculator/types';
import { calculateTax } from './salary-calculator/services/taxService';
import { getTaxSuggestions } from './salary-calculator/services/geminiService';
import AIAdvisor from './salary-calculator/AIAdvisor';
import HRACalculator from './salary-calculator/HRACalculator';
import LTACalculator from './salary-calculator/LTACalculator';
import Section80DCalculator from './salary-calculator/Section80DCalculator';
import Section80CCDCalculator from './salary-calculator/Section80CCDCalculator';
import Section80GCalculator from './salary-calculator/Section80GCalculator';
import Section80GGCalculator from './salary-calculator/Section80GGCalculator';

const initialInput: UserInput = {
    userAge: 0, fatherAge: 0, motherAge: 0, isMetro: true,
    basicSalary: 0, da: 0, specialAllowance: 0, leaveEncashment: 0,
    joiningBonus: 0, perquisites: 0, customAllowances: [],
    hraReceived: 0, actualRentPaid: 0, rentFrequency: 'monthly',
    ltaReceived: 0, ltaSpent: 0,
    professionalTax: 0, entertainmentAllowance: 0,
    section24b: 0, rentalIncomeReceived: 0, interestSavings: 0, interestFD: 0, isHomeLoanSelfOccupied: true,
    section80C: 0,
    section80CCD1B: 0, section80CCD2: 0,
    section80D_SelfInsurance: 0, section80D_ParentsInsurance: 0, section80D_PreventiveCheckup: 0,
    section80D_Self: 0, section80D_Parents: 0,
    section80E: 0, section80GG: 0, section80G: 0, donationsList: [],
    customDeductions: []
};

interface Props {
    onNavigate: (page: any) => void;
}

const SalaryTaxCalculator: React.FC<Props> = ({ onNavigate }) => {
    const [inputs, setInputs] = useState<UserInput>(initialInput);
    const [showTips, setShowTips] = useState(false);
    const [tips, setTips] = useState<string | null>(null);
    const [loadingTips, setLoadingTips] = useState(false);

    const results = useMemo(() => calculateTax(inputs), [inputs]);

    const handleInputChange = (name: keyof UserInput, value: any) => {
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const addCustomItem = (key: 'customAllowances' | 'customDeductions') => {
        const newItem: CustomComponent = { id: Date.now().toString(), name: '', value: 0 };
        setInputs(prev => ({ ...prev, [key]: [newItem, ...prev[key]] }));
    };

    const removeCustomItem = (key: 'customAllowances' | 'customDeductions', id: string) => {
        setInputs(prev => ({ ...prev, [key]: prev[key].filter(x => x.id !== id) }));
    };

    const updateCustomItem = (key: 'customAllowances' | 'customDeductions', id: string, field: 'name' | 'value', value: any) => {
        setInputs(prev => ({
            ...prev,
            [key]: prev[key].map(item => item.id === id ? { ...item, [field]: value } : item)
        }));
    };

    const fetchTips = async () => {
        setShowTips(true);
        setLoadingTips(true);
        const result = await getTaxSuggestions(inputs, results);
        setTips(result);
        setLoadingTips(false);
    };

    return (
        <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-[#000a2e]/10">

            <main className="max-w-[1600px] mx-auto px-6 pt-10 pb-24">

                {/* Back Button */}
                {/* Back Button & Pill Container */}
                <div className="relative flex items-center justify-center mb-6">
                    <button
                        onClick={() => onNavigate('tools')}
                        className="absolute left-0 flex items-center gap-2 text-befinlit-navy/40 hover:text-befinlit-navy transition-colors font-bold text-xs uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} /> Back to Toolkits
                    </button>
                    <div className="inline-block px-4 py-1.5 rounded-full border border-slate-200 text-[10px] font-bold text-slate-500 tracking-[0.15em]">
                        Tax Efficiency Engine
                    </div>
                </div>

                {/* Blog-style Intro Section */}
                <div className="mb-20 text-center max-w-4xl mx-auto">



                    <h1 className="text-3xl md:text-5xl font-black text-[#000a2e] mb-6 leading-[1.1] tracking-tight">
                        Income Tax Optimizer for Salaried Individuals: AY 2026-27 Version
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto italic opacity-80">
                        This comprehensive tool helps salaried individuals estimate their tax liability for the Financial Year 2025-26.
                        Simply enter your income details and deductions to instantly compare the Old vs. New Regime and optimize your tax planning.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
                    <div className="xl:col-span-7 space-y-20">

                        {/* SECTION A */}
                        <div className="space-y-8">
                            <div className="border-b-2 border-[#000a2e] pb-4">
                                <h2 className="text-3xl font-black text-[#000a2e] tracking-tight">Section A: Taxpayer Profile</h2>
                            </div>
                            <Section title="Demographic Details" description="Foundational details required to determine tax slab eligibility." delay={100}>
                                <InputField label="Current Age" name="userAge" value={inputs.userAge} onChange={handleInputChange} showCurrency={false} tooltip="Determines tax slab limits in Old Regime." />
                                <ToggleField label="Residence Location" name="isMetro" value={inputs.isMetro} onChange={handleInputChange} leftLabel="Metro City" rightLabel="Non-Metro" subText="Metro: Mumbai, Delhi, Kolkata, Chennai." />
                                <InputField label="Father's Age" name="fatherAge" value={inputs.fatherAge || 0} onChange={handleInputChange} showCurrency={false} />
                                <InputField label="Mother's Age" name="motherAge" value={inputs.motherAge || 0} onChange={handleInputChange} showCurrency={false} />
                            </Section>
                        </div>

                        {/* SECTION B: SALARY COMPONENTS */}
                        <div className="space-y-12">
                            <div className="border-b-2 border-[#000a2e] pb-4">
                                <h2 className="text-3xl font-black text-[#000a2e] tracking-tight">Section B: Salary Components</h2>
                            </div>

                            {/* BLOCK 1: FIXED TAXABLE COMPONENTS */}
                            <Section
                                title="Block 1: Fixed Taxable Components"
                                description="For details on each particulars, do check your Form 16 or CTC."
                                delay={150}
                            >
                                <InputField label="Basic Salary" name="basicSalary" value={inputs.basicSalary} onChange={handleInputChange} />
                                <InputField label="Dearness Allowance (DA)" name="da" value={inputs.da} onChange={handleInputChange} />
                                <InputField label="Special / Flexi Allowance" name="specialAllowance" value={inputs.specialAllowance} onChange={handleInputChange} />
                                <InputField label="Bonus" name="joiningBonus" value={inputs.joiningBonus} onChange={handleInputChange} />
                                <InputField label="Perks" name="perquisites" value={inputs.perquisites} onChange={handleInputChange} tooltip="Aggregated value of taxable benefits." />
                                <InputField label="Leave Encashment" name="leaveEncashment" value={inputs.leaveEncashment} onChange={handleInputChange} />
                                <DynamicRow
                                    title="Other fixed components"
                                    items={inputs.customAllowances}
                                    onAdd={() => addCustomItem('customAllowances')}
                                    onRemove={(id) => removeCustomItem('customAllowances', id)}
                                    onChange={(id, field, val) => updateCustomItem('customAllowances', id, field, val)}
                                />
                            </Section>

                            {/* BLOCK 2: PARTIALLY EXEMPTED PARTICULARS */}
                            <Section
                                title="Block 2: Partially Exempted Particulars"
                                description="This is the place where you can optimise your tax liability. Note: Only the most commonly used partially exempt allowances are included here."
                                delay={200}
                            >
                                <HRACalculator
                                    hraReceived={inputs.hraReceived}
                                    actualRentPaid={inputs.actualRentPaid}
                                    rentFrequency='monthly'
                                    hraBreakdown={results.hraBreakdown}
                                    isMetro={inputs.isMetro}
                                    onChange={handleInputChange}
                                />

                                <LTACalculator
                                    ltaReceived={inputs.ltaReceived}
                                    ltaSpent={inputs.ltaSpent}
                                    onChange={handleInputChange}
                                />
                            </Section>

                            {/* BLOCK 3: DEDUCTIONS & STATUTORY ITEMS */}
                            <Section
                                title="Block 3: Deductions & Statutory Items"
                                description="Final tax-saving investments and statutory deductions from gross income."
                                delay={250}
                            >
                                <div className="col-span-full mb-4">
                                    <InputField
                                        label="Professional Tax"
                                        name="professionalTax"
                                        value={inputs.professionalTax}
                                        onChange={handleInputChange}
                                        tooltip="Section 16(iii) deduction. Check the salary slip to know the amount deducted as Professional tax, if any."
                                    />
                                </div>

                                <DynamicRow
                                    title="Other exemptions / deductions"
                                    items={inputs.customDeductions}
                                    onAdd={() => addCustomItem('customDeductions')}
                                    onRemove={(id) => removeCustomItem('customDeductions', id)}
                                    onChange={(id, field, val) => updateCustomItem('customDeductions', id, field, val)}
                                />

                                <div className="col-span-full mt-10 space-y-12">
                                    <InputField
                                        label="Section 80C Investments"
                                        name="section80C"
                                        value={inputs.section80C}
                                        onChange={handleInputChange}
                                        tooltip="Includes contributions to EPF, LIC premium, PPF, ELSS, School fees, Principal repayment of home loan, etc. Max limit ₹1.5 Lakh."
                                    />

                                    <Section80CCDCalculator inputs={inputs} onChange={handleInputChange} />

                                    <Section80DCalculator inputs={inputs} onChange={handleInputChange} />

                                    <Section80GCalculator inputs={inputs} breakdown={results.section80G_Breakdown} onChange={handleInputChange} />

                                    <Section80GGCalculator inputs={inputs} breakdown={results.section80GG_Breakdown} onChange={handleInputChange} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-8">
                                            <InputField
                                                label="Section 80E: Interest on Education Loan"
                                                name="section80E"
                                                value={inputs.section80E}
                                                onChange={handleInputChange}
                                                tooltip="Available for loans taken from Indian banks or notified financial institutions for higher education."
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField
                                                    label="Interest on Savings"
                                                    name="interestSavings"
                                                    value={inputs.interestSavings}
                                                    onChange={handleInputChange}
                                                    tooltip="Interest earned from savings accounts. Eligible for Sec 80TTA (max 10k) or 80TTB (seniors)."
                                                />
                                                <InputField
                                                    label="Interest on FDs"
                                                    name="interestFD"
                                                    value={inputs.interestFD}
                                                    onChange={handleInputChange}
                                                    tooltip="Interest earned from Fixed Deposits/Recurring Deposits. Eligible for Sec 80TTB (seniors only)."
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            <InputField label="Home Loan Interest (Section 24B)" name="section24b" value={inputs.section24b} onChange={handleInputChange} tooltip="Interest payable on capital borrowed for purchase, construction, repair, or reconstruction of house property." />
                                            <ToggleField label="Loan Property Status" name="isHomeLoanSelfOccupied" value={inputs.isHomeLoanSelfOccupied} onChange={handleInputChange} leftLabel="Self Occupied" rightLabel="Let Out" />
                                            {!inputs.isHomeLoanSelfOccupied && (
                                                <InputField
                                                    label="Annual Rental Income Received"
                                                    name="rentalIncomeReceived"
                                                    value={inputs.rentalIncomeReceived}
                                                    onChange={handleInputChange}
                                                    tooltip="Total rental income received from the let-out property during the year."
                                                    helpText="Note: Standard 30% deduction is applied automatically."
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Section>
                        </div>
                    </div>

                    <div className="xl:col-span-5">
                        <div className="sticky top-32 space-y-12">
                            <ResultsView result={results} />

                            {!showTips ? (
                                <button
                                    onClick={fetchTips}
                                    className="w-full py-6 rounded-sm bg-[#000a2e] text-white font-bold text-sm shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 tracking-widest"
                                >
                                    💡 Get AI tax saving tips
                                </button>
                            ) : (
                                <div className="bg-white rounded-sm p-10 border-l-8 border-yellow-400 shadow-2xl animate-in zoom-in duration-300">
                                    <div className="flex items-center justify-between mb-8">
                                        <h4 className="text-sm font-black text-[#000a2e]">AI optimization strategy</h4>
                                        <button onClick={() => setShowTips(false)} className="text-slate-400 hover:text-[#000a2e] transition-colors">✕</button>
                                    </div>
                                    {loadingTips ? (
                                        <div className="flex flex-col items-center py-12">
                                            <div className="w-10 h-10 border-4 border-[#000a2e] border-t-transparent rounded-full animate-spin"></div>
                                            <p className="text-xs font-bold text-slate-400 mt-6 tracking-widest">Analyzing data...</p>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-slate-700 leading-relaxed space-y-4 font-medium" dangerouslySetInnerHTML={{ __html: tips ? tips.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') : '' }} />
                                    )}
                                </div>
                            )}

                            <Compliances />
                            <LeadForm />
                        </div>
                    </div>
                </div>
            </main>

            <AIAdvisor taxDetails={inputs} taxResult={results} />
        </div>
    );
};

export default SalaryTaxCalculator;