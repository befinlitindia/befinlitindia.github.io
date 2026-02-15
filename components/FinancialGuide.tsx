import React, { useEffect } from 'react';
import { ArrowLeft, BookOpen, FileText, Globe, IndianRupee, ShieldCheck } from 'lucide-react';

interface Props {
    onNavigate?: (page: any) => void;
    onOpenConsultation?: () => void;
}

const FinancialGuide: React.FC<Props> = ({ onNavigate, onOpenConsultation }) => {

    // Handle smooth scrolling for internal links
    useEffect(() => {
        const handleSmoothScroll = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const id = target.getAttribute('href')?.substring(1);
                const element = document.getElementById(id || '');
                if (element) {
                    const offset = 100;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        };

        document.addEventListener('click', handleSmoothScroll);
        return () => document.removeEventListener('click', handleSmoothScroll);
    }, []);

    return (
        <article className="max-w-[1400px] mx-auto px-4 md:px-8 pt-32 md:pt-48 pb-12">
            <div className="relative flex flex-col md:flex-row items-center justify-center mb-6 gap-4 md:gap-0">
                {onNavigate && (
                    <div className="md:absolute md:left-0">
                        <button
                            onClick={() => onNavigate('playbooks')}
                            className="flex items-center gap-2 text-befinlit-navy/40 hover:text-befinlit-navy transition-colors font-bold text-xs uppercase tracking-widest"
                        >
                            <ArrowLeft size={16} /> Back to Playbooks
                        </button>
                    </div>
                )}
                <span className="inline-block py-1 px-3 border border-befinlit-navy/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-befinlit-navy">
                    Finance 101
                </span>
            </div>

            {/* Header */}
            <header className="text-center mb-16 border-b border-befinlit-navy/10 pb-12">
                <h1 className="text-3xl md:text-5xl font-bold font-serif text-befinlit-navy leading-tight mb-6">
                    The Freelancer's and Professional's Playbook
                </h1>
                <p className="text-lg md:text-xl text-befinlit-navy/70 italic font-serif leading-relaxed max-w-2xl mx-auto">
                    The Ultimate Playbook for all Indian Freelancers & Professionals to build a compliant, tax-efficient and audit-proof professional practice in India.
                </p>
            </header>

            {/* Intro */}
            <div className="prose prose-lg prose-slate font-serif mx-auto text-befinlit-navy/80 mb-16">
                <p>
                    The gig economy has liberated talent from traditional employment. Whether you're a consultant, a designer, or a developer, you are your own boss. But with great freedom comes great compliance. From income tax slabs to GST registrations, navigating the regulatory maze is the price of admission for your independent career.
                </p>
            </div>

            {/* Internal Navigation */}
            {/* Internal Navigation */}
            <nav className="bg-befinlit-navy/95 backdrop-blur-md rounded-sm border border-befinlit-navy/10 sticky top-[138px] z-40 mb-12 shadow-sm print:hidden w-full transition-all duration-300">
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-between w-full text-xs md:text-sm font-bold tracking-wider divide-y md:divide-y-0 md:divide-x divide-white/10">
                    <li className="flex-1">
                        <a href="#income-tax" className="block py-4 px-2 text-center text-white/80 hover:text-befinlit-gold hover:bg-white/5 transition-all">
                            Income Tax
                        </a>
                    </li>
                    <li className="flex-1">
                        <a href="#withholding-tax" className="block py-4 px-2 text-center text-white/80 hover:text-befinlit-gold hover:bg-white/5 transition-all">
                            Withholding Tax
                        </a>
                    </li>
                    <li className="flex-1">
                        <a href="#books-of-accounts" className="block py-4 px-2 text-center text-white/80 hover:text-befinlit-gold hover:bg-white/5 transition-all">
                            Books
                        </a>
                    </li>
                    <li className="flex-1">
                        <a href="#gst" className="block py-4 px-2 text-center text-white/80 hover:text-befinlit-gold hover:bg-white/5 transition-all">
                            GST
                        </a>
                    </li>
                    <li className="flex-1">
                        <a href="#fema" className="block py-4 px-2 text-center text-white/80 hover:text-befinlit-gold hover:bg-white/5 transition-all">
                            FEMA/RBI
                        </a>
                    </li>
                    <li className="flex-1">
                        <a href="#payments" className="block py-4 px-2 text-center text-white/80 hover:text-befinlit-gold hover:bg-white/5 transition-all">
                            Payments
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <main className="w-full space-y-16">

                {/* Section 1: Income Tax Act, 1961 */}
                <section id="income-tax" className="scroll-mt-32">
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5 mb-8">
                        <h3 className="text-2xl font-serif font-bold text-left text-befinlit-navy mb-4">Who is a Professional?</h3>
                        <p className="text-left text-befinlit-navy/70 leading-relaxed">A professional is someone who earns money by selling their specialized skill, knowledge, or intellectual talent rather than selling a physical product. Instead of selling goods, they help people solve problems using their specialized training—like a software developer writing code, a designer creating a logo, or a doctor treating a patient.</p>
                    </div>

                    <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5 mb-12">
                        <p className="text-left text-befinlit-navy/80 leading-relaxed font-serif">
                            While different Acts (like GST) might have their own rules, we will use the <b className="font-bold text-befinlit-navy">Income Tax Act, 2025</b> as our primary guide. According to the Act, a professional can operate their work in different business structures like <b className="font-bold text-befinlit-navy">Sole Proprietorship (Individual), Partnership, LLP, and Pvt Ltd</b>. To understand the differences between these business structures and compare their pros and cons,{' '}
                            <button onClick={() => onNavigate && onNavigate('playbook')} className="text-befinlit-gold font-bold underline hover:text-befinlit-navy transition-colors inline-block">
                                refer to the Moonlighter's Playbook.
                            </button>
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold font-serif text-left mb-8 text-befinlit-navy flex items-center gap-3">
                        <FileText className="text-befinlit-gold" /> Income Tax Act 2025
                    </h2>

                    <div className="flex flex-col gap-8">
                        {/* General Rule - Full Width */}
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5">
                            <h3 className="text-2xl font-serif font-bold mb-4 text-befinlit-navy">General Rule: Income Tax for All Professionals</h3>
                            <p className="text-befinlit-navy/70 leading-relaxed mb-6">
                                By default, <b className="font-bold text-befinlit-navy">ALL</b> professionals in <b className="font-bold text-befinlit-navy">ALL</b> business structures (Sole Proprietorship, Partnership, LLP, Pvt Ltd) are required to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-befinlit-navy/80 mb-6 pl-4">
                                <li>Maintain <b className="font-bold">detailed books of accounts</b> (Profit & Loss, Balance Sheet, etc.).</li>
                                <li>File <b className="font-bold">ITR-3</b> (or applicable corporate return), declaring actual income and expenses.</li>
                                <li>Keep proof of every expense claimed.</li>
                            </ul>
                            <p className="text-sm text-befinlit-navy/60 italic border-t border-befinlit-navy/10 pt-4">This is the "heavier foundation" required for most businesses.</p>
                        </div>

                        {/* Simplified Scheme - Split Layout */}
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-2/3 space-y-8">
                                <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5 h-full flex flex-col relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-befinlit-gold text-befinlit-navy text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                                        Optimization Hack
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-serif font-bold mb-4 text-befinlit-navy"><span>Section 58: The Simplified Exception</span></h3>
                                        <p className="text-befinlit-navy/70 mb-6 leading-relaxed">
                                            Usage of this section is <b className="font-bold text-befinlit-navy">RESTRICTED</b>. It is available ONLY if you meet BOTH conditions:
                                        </p>
                                        <ul className="space-y-3 mb-8 text-sm">
                                            <li className="flex items-start gap-3">
                                                <span className="bg-befinlit-navy text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                                                <span className="text-befinlit-navy/80">You are a <b className="font-bold text-befinlit-navy">Specified Professional</b> (see list →).</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="bg-befinlit-navy text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                                                <span className="text-befinlit-navy/80">Your structure is a <b className="font-bold text-befinlit-navy">Sole Proprietorship</b> or <b className="font-bold text-befinlit-navy">Partnership</b> (LLPs & Pvt Ltd cannot use this).</span>
                                            </li>
                                        </ul>

                                        <div className="bg-befinlit-navy/5 p-6 rounded-sm border border-befinlit-navy/10 mb-6">
                                            <h4 className="font-bold text-lg text-befinlit-navy mb-2">The Benefit: Pay Tax on Half</h4>
                                            <p className="text-sm text-befinlit-navy/70 leading-relaxed">If eligible, you can declare just 50% of your gross receipts as profit and pay tax on that. No detailed books required!</p>
                                        </div>

                                        <h4 className="font-bold text-xs uppercase tracking-widest text-befinlit-navy/50 mb-4">Who is Eligible? (Income Limit)</h4>
                                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                            <div className="flex-1 text-center bg-white border border-befinlit-navy/20 p-4 rounded-sm">
                                                <p className="font-serif font-bold text-xl text-befinlit-navy mb-1">≤ ₹50 Lakh</p>
                                                <p className="text-[10px] uppercase tracking-wider text-befinlit-navy/60">Standard Limit</p>
                                            </div>
                                            <div className="flex-1 text-center bg-green-50 border border-green-200 p-4 rounded-sm">
                                                <p className="font-serif font-bold text-xl text-green-700 mb-1">≤ ₹75 Lakh</p>
                                                <p className="text-[10px] uppercase tracking-wider text-green-800/60">If 95% Digital</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-befinlit-navy text-befinlit-cream p-8 rounded-sm h-full flex flex-col justify-center">
                                <h3 className="text-xl font-bold mb-4 text-befinlit-gold text-center font-serif">Specified Professionals</h3>
                                <p className="text-xs text-white/60 mb-8 text-center uppercase tracking-widest leading-relaxed">
                                    Only these professions are eligible for the simplified Section 58 scheme
                                </p>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm font-medium">
                                    <span>✓ Legal</span>
                                    <span>✓ Medical</span>
                                    <span>✓ Engineering</span>
                                    <span>✓ Architectural</span>
                                    <span>✓ Accountancy</span>
                                    <span>✓ Tech Consultancy</span>
                                    <span>✓ Interior Decor</span>
                                    <span>✓ Co. Secretary</span>
                                    <span>✓ IT Professional</span>
                                    <span>✓ Auth. Rep</span>
                                    <span className="col-span-2">✓ Film Artist (actor, etc.)</span>
                                    <span className="col-span-2">✓ Other notified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Withholding Tax Flowchart */}
                <section id="withholding-tax" className="scroll-mt-32">
                    <h2 className="text-2xl font-bold font-serif text-left mb-8 text-befinlit-navy flex items-center gap-3">
                        <Globe className="text-befinlit-gold" /> Taxes Paid Abroad (Withholding Tax)
                    </h2>
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5">
                        <div className="text-left mb-10">
                            <h3 className="text-2xl font-bold text-befinlit-navy mb-3">What is DTAA?</h3>
                            <p className="text-befinlit-navy/70 max-w-2xl leading-relaxed">A <b className="font-bold text-befinlit-navy">D</b>ouble <b className="font-bold text-befinlit-navy">T</b>axation <b className="font-bold text-befinlit-navy">A</b>voidance <b className="font-bold text-befinlit-navy">A</b>greement (DTAA) is a tax treaty between India and another country. It ensures that you don't pay tax on the same income in both countries. By using the DTAA, your foreign client can deduct tax at a lower rate (e.g., 10%) instead of their country's default rate.</p>
                        </div>
                        <div className="space-y-6 max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-6 items-start">
                                <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm text-center h-full">
                                    <h4 className="font-bold text-befinlit-navy mb-2">Step 1: Provide Documents to Client</h4>
                                    <p className="text-sm text-befinlit-navy/70 mb-3">To get the benefit of a lower tax deduction rate under DTAA, your client will ask for:</p>
                                    <p className="font-bold text-befinlit-navy text-sm bg-white py-2 px-3 inline-block rounded-sm border border-gray-200">PAN + Form 10F + TRC + No-PE Declaration</p>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm text-center h-full">
                                    <h4 className="font-bold text-befinlit-navy mb-2">Step 2: Obtain Proof of Tax Paid</h4>
                                    <p className="text-sm text-befinlit-navy/70">The client will deduct tax at the DTAA rate. Afterwards, obtain proof of this tax payment (e.g., a tax certificate or return copy from their country).</p>
                                </div>
                            </div>
                            <div className="text-center text-2xl text-befinlit-navy/20">↓</div>
                            <div className="grid md:grid-cols-2 gap-6 items-start">
                                <div className="bg-green-50 border border-green-200 p-6 rounded-sm text-center h-full">
                                    <h4 className="font-bold text-green-800 mb-2">Step 3: Claim Foreign Tax Credit (FTC)</h4>
                                    <p className="text-sm text-green-800/80">In your Income Tax Return (ITR), claim the credit for the foreign tax paid. This amount will offset your Indian tax liability.</p>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm text-center h-full">
                                    <h4 className="font-bold text-befinlit-navy mb-2">Step 4: File Form 67</h4>
                                    <p className="text-sm text-befinlit-navy/70">To validate your FTC claim, you must file Form 67 on the Income Tax portal by the <b className="font-bold text-red-500">31st of March of the relevant Assessment Year</b>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Books of Accounts Section */}
                <section id="books-of-accounts" className="scroll-mt-32">
                    <h2 className="text-2xl font-bold font-serif text-left mb-8 text-befinlit-navy flex items-center gap-3">
                        <BookOpen className="text-befinlit-gold" /> Books of Accounts & Presumptive Scheme
                    </h2>
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5">
                        <div className="space-y-8">
                            {/* Row 1: Basic Books */}
                            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6">
                                <div className="w-full md:w-2/5">
                                    <div className="p-6 rounded-sm border border-befinlit-gold/30 bg-befinlit-gold/5 h-full">
                                        <h4 className="font-bold text-center text-befinlit-navy mb-4 font-serif">Simple Records You Need</h4>
                                        <ul className="text-sm text-befinlit-navy/80 space-y-2 list-disc list-inside">
                                            <li>Business Expenses</li>
                                            <li>Money you owe</li>
                                            <li>Money owed to you</li>
                                            <li>Cash & Bank Balances</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/5 text-center hidden md:block">
                                    <p className="font-bold text-xs uppercase tracking-widest text-befinlit-navy">→ Maintain needed →</p>
                                </div>
                                <div className="w-full md:w-2/5">
                                    <div className="p-6 rounded-sm bg-gray-50 border border-gray-200 h-full flex flex-col justify-center text-center">
                                        <h4 className="font-bold text-lg text-befinlit-navy mb-2">The Best Part</h4>
                                        <p className="text-sm text-befinlit-navy/70 leading-relaxed">You do <b className="font-bold text-befinlit-navy">NOT</b> need complex accounting. Just keep basic records of what comes in and what goes out.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Detailed Books for Audit */}
                            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6">
                                <div className="w-full md:w-2/5">
                                    <div className="p-6 rounded-sm border border-green-200 bg-green-50 h-full">
                                        <h4 className="font-bold text-center text-green-800 mb-4 font-serif">Additional Books for Audit</h4>
                                        <ul className="text-sm text-green-800/80 space-y-2 list-disc list-inside">
                                            <li>Journals & Ledgers</li>
                                            <li>Fixed Asset Ledgers</li>
                                            <li>Party-wise ledgers</li>
                                            <li>Sales Invoices & expense bills</li>
                                            <li>(This is not an exhaustive list)</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/5 text-center hidden md:block">
                                    <p className="font-bold text-xs uppercase tracking-widest text-red-500">← Maintain ALL if ←</p>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase">Tax Audit Required</p>
                                </div>
                                <div className="w-full md:w-2/5">
                                    <div className="p-6 rounded-sm bg-red-50 border border-red-100 h-full text-center">
                                        <h4 className="font-bold text-lg text-red-800 mb-2">When Tax Audit is Required</h4>
                                        <p className="text-sm text-red-700/80 mb-3">You must opt out of Section 58 and get a tax audit if either of these conditions apply:</p>
                                        <ul className="text-sm text-red-700/80 list-disc list-inside space-y-1 text-left inline-block">
                                            <li>Your profits are <b className="font-bold">&lt; 50%</b> of gross receipts.</li>
                                            <li>Your gross receipts exceed the presumptive limits (<b className="font-bold">₹50 lakh or ₹75 lakh</b>).</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: GST Provisions */}
                <section id="gst" className="scroll-mt-32">
                    <h2 className="text-2xl font-bold font-serif text-left mb-8 text-befinlit-navy flex items-center gap-3">
                        <ShieldCheck className="text-befinlit-gold" /> GST for Service Providers
                    </h2>
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5">
                        <h3 className="text-2xl font-bold font-serif text-left mb-6 text-befinlit-navy">When to get GST Registration?</h3>
                        <div className="grid md:grid-cols-2 gap-6 text-center mb-10">
                            <div className="bg-red-50 p-6 rounded-sm border border-red-200">
                                <h4 className="font-bold text-lg mb-2 text-red-800">Mandatory Registration</h4>
                                <p className="text-red-700/80 text-sm leading-relaxed">You <b className="font-bold">must</b> register for GST if your total income from services (India + Abroad) crosses <b className="font-bold">₹20 Lakh</b> in a year.</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-sm border border-green-200">
                                <h4 className="font-bold text-lg mb-2 text-green-800">Voluntary Registration</h4>
                                <p className="text-green-800/80 text-sm leading-relaxed">You can choose to register even if your turnover is below ₹20 lakh. The main benefit is that you can claim the GST paid on your business expenses (Input Tax Credit - ITC).</p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold font-serif text-left mt-12 mb-8 text-befinlit-navy">Compliance after Registration (for exporters)</h3>
                        <div className="space-y-6 max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-6 items-start">
                                <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm h-full">
                                    <h4 className="font-bold text-befinlit-navy mb-2">Step 1: Understand Zero-Rated Supply</h4>
                                    <p className="text-sm text-befinlit-navy/70 leading-relaxed">Your service must qualify as an 'export of services' under Sec 2(6) of the IGST Act, 2017. If so, no GST is required to be paid.<br />
                                        <span className="block mt-2 text-xs bg-red-100 text-red-600 p-2 rounded-sm">Note: Payments received via Cryptos are <b className="font-bold">not valid export receipts</b>, and hence, GST will be applicable.</span></p>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm h-full">
                                    <h4 className="font-bold text-befinlit-navy mb-2">Step 2: File a Letter of Undertaking (LUT)</h4>
                                    <p className="text-sm text-befinlit-navy/70 leading-relaxed">To export services without paying IGST upfront, you must file an LUT on the GST portal. This is valid for one financial year and must be renewed annually.</p>
                                </div>
                            </div>
                            <div className="text-center text-2xl text-befinlit-navy/20">↓</div>
                            <div className="grid md:grid-cols-2 gap-6 items-start">
                                <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm h-full">
                                    <h4 className="font-bold text-befinlit-navy mb-2">Step 3: Reduce Compliance Burden</h4>
                                    <p className="text-sm text-befinlit-navy/70 leading-relaxed">Opt for the <b className="font-bold">QRMP scheme</b> (Quarterly Return Monthly Payment) to file your main GSTR-3B returns quarterly instead of monthly, simplifying compliance.</p>
                                </div>
                                <div className="bg-green-50 border border-green-200 p-6 rounded-sm h-full">
                                    <h4 className="font-bold text-green-800 mb-2">Step 4: Claim ITC Refund</h4>
                                    <p className="text-sm text-green-800/80 leading-relaxed">File a refund application for the GST you've paid on inputs (e.g., software, professional fees, etc.). This makes your operational costs lower.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: FEMA & RBI Guidelines */}
                <section id="fema" className="scroll-mt-32">
                    <h2 className="text-2xl font-bold font-serif text-left mb-8 text-befinlit-navy flex items-center gap-3">
                        <Globe className="text-befinlit-gold" /> FEMA & RBI Guidelines for Forex
                    </h2>
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5">
                        <h3 className="text-2xl font-bold font-serif text-left mb-8 text-befinlit-navy">Receiving Foreign Payments Correctly</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-befinlit-cream p-6 rounded-sm border border-befinlit-navy/10">
                                <h4 className="font-bold text-lg mb-2 text-befinlit-navy">FIRC (Your Proof)</h4>
                                <p className="text-sm text-befinlit-navy/70 leading-relaxed">Always get a <b className="text-befinlit-gold">FIRC</b> (Foreign Inward Remittance Certificate). It is your official proof of foreign income for tax and audits.</p>
                            </div>
                            <div className="bg-befinlit-cream p-6 rounded-sm border border-befinlit-navy/10">
                                <h4 className="font-bold text-lg mb-2 text-befinlit-navy">Use Right Codes</h4>
                                <p className="text-sm text-befinlit-navy/70 leading-relaxed">Tell the bank why you got paid using the right RBI purpose code (e.g., <b className="font-bold text-befinlit-navy">P0802</b> for software, <b className="font-bold text-befinlit-navy">P0806</b> for other services).</p>
                            </div>
                            <div className="bg-befinlit-cream p-6 rounded-sm border border-befinlit-navy/10">
                                <h4 className="font-bold text-lg mb-2 text-befinlit-navy">Bring Money Home Fast</h4>
                                <p className="text-sm text-befinlit-navy/70 leading-relaxed">Foreign income must hit your Indian bank account within <b className="font-bold text-befinlit-navy">9 months</b> of invoicing.</p>
                            </div>
                            <div className="bg-befinlit-cream p-6 rounded-sm border border-befinlit-navy/10">
                                <h4 className="font-bold text-lg mb-2 text-befinlit-navy">Softex Form</h4>
                                <p className="text-sm text-befinlit-navy/70 leading-relaxed">If you export <b className="font-bold text-befinlit-navy">software code/products</b>, you must file a Softex form. For pure IT services, you might not need it.</p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Section 4: Payment Options */}
                <section id="payments" className="scroll-mt-32">
                    <h2 className="text-2xl font-bold font-serif text-left mb-8 text-befinlit-navy flex items-center gap-3">
                        <IndianRupee className="text-befinlit-gold" /> Choosing a Payment Platform (2025)
                    </h2>
                    <div className="bg-white p-6 rounded-sm shadow-sm border border-befinlit-navy/5 overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="bg-befinlit-navy text-white text-xs uppercase tracking-widest">
                                <tr>
                                    <th className="p-4 rounded-tl-sm">Method</th>
                                    <th className="p-4">Cost (Fees + Forex Markup)</th>
                                    <th className="p-4">Proof of Payment (FIRC)</th>
                                    <th className="p-4">How Fast?</th>
                                    <th className="p-4 rounded-tr-sm">Best For</th>
                                </tr>
                            </thead>
                            <tbody className="text-befinlit-navy divide-y divide-gray-100">
                                <tr className="bg-white hover:bg-befinlit-cream/50 transition-colors">
                                    <td className="p-4 font-bold">Skydo</td>
                                    <td className="p-4">Flat Fee: $19-$29 or 0.3%. <br /><b className="text-green-600 font-bold block mt-1">Zero Forex Markup.</b></td>
                                    <td className="p-4">Instant & free</td>
                                    <td className="p-4">Fast (&lt;24-48 hrs)</td>
                                    <td className="p-4 text-xs text-gray-500 uppercase tracking-wide">High-value invoices</td>
                                </tr>
                                <tr className="bg-gray-50/50 hover:bg-befinlit-cream/50 transition-colors">
                                    <td className="p-4 font-bold">Wise</td>
                                    <td className="p-4">Variable Fee: ~1.6% - 1.9%. <br /><b className="text-green-600 font-bold block mt-1">Zero Forex Markup.</b></td>
                                    <td className="p-4">eFIRC (~$2.50 fee)</td>
                                    <td className="p-4">Fast (1-3 days)</td>
                                    <td className="p-4 text-xs text-gray-500 uppercase tracking-wide">Small payments</td>
                                </tr>
                                <tr className="bg-white hover:bg-befinlit-cream/50 transition-colors">
                                    <td className="p-4 font-bold">Payoneer</td>
                                    <td className="p-4"><b className="text-red-500 font-bold">High.</b> ~1% fee + up to 3% Forex Markup.</td>
                                    <td className="p-4">Yes (Digital)</td>
                                    <td className="p-4">Variable (0-3 days)</td>
                                    <td className="p-4 text-xs text-gray-500 uppercase tracking-wide">Marketplace / Upwork</td>
                                </tr>
                                <tr className="bg-gray-50/50 hover:bg-befinlit-cream/50 transition-colors">
                                    <td className="p-4 font-bold">PayPal</td>
                                    <td className="p-4"><b className="text-red-500 font-bold">Very High.</b> 4.4% + fixed fee + ~4% Forex Markup.</td>
                                    <td className="p-4">Yes (monthly)</td>
                                    <td className="p-4">Fast (1-3 days)</td>
                                    <td className="p-4 text-xs text-gray-500 uppercase tracking-wide">Convenience / Small txns</td>
                                </tr>
                                <tr className="bg-white hover:bg-befinlit-cream/50 transition-colors">
                                    <td className="p-4 font-bold">Bank Wire (SWIFT)</td>
                                    <td className="p-4"><b className="text-red-500 font-bold">Very High.</b> High fixed fees + high Forex Markup.</td>
                                    <td className="p-4">Yes (Physical)</td>
                                    <td className="p-4">Slow (3-5 days)</td>
                                    <td className="p-4 text-xs text-gray-500 uppercase tracking-wide">Traditional Corp Txns</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5 text-center">
                            <h3 className="text-xl font-bold font-serif mb-3 text-befinlit-navy">Professional Tax</h3>
                            <p className="text-befinlit-navy/70 text-sm leading-relaxed">A small, mandatory state-level tax applicable to all professionals. Ensure you comply with your state's regulations to avoid penalties.</p>
                        </div>
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5 text-center">
                            <h3 className="text-xl font-bold font-serif mb-3 text-befinlit-navy">Trade License</h3>
                            <p className="text-befinlit-navy/70 text-sm leading-relaxed">While not mandatory for most freelancers working from home, if you are running the same as a full-time business from a commercial premises (co-shared workspace) or if your local authority insists, it is a good practice to obtain one.</p>
                        </div>
                    </div>
                </section>

                {/* Call to Action similar to other Playbooks */}
                <section className="mt-16 bg-befinlit-navy text-befinlit-cream p-10 rounded-sm text-center">
                    <h2 className="text-2xl font-bold font-serif mb-4 text-befinlit-gold">Need Personalized Financial Guidance?</h2>
                    <p className="text-white/70 max-w-2xl mx-auto mb-8">
                        Navigating the complex world of freelance taxes and compliance can be overwhelming. Schedule a consultation with us to get advice tailored to your specific situation.
                    </p>
                    <button
                        onClick={onOpenConsultation}
                        className="w-full bg-befinlit-gold text-befinlit-navy font-bold px-8 py-4 rounded-sm hover:bg-white transition-all shadow-lg"
                    >
                        Schedule a Consultation
                    </button>
                </section>

                {/* Glossary */}
                <section className="mb-16 border-t border-befinlit-navy/10 pt-12 print:hidden">
                    <h2 className="text-2xl font-bold text-befinlit-navy mb-6 flex items-center gap-2 font-serif">
                        <span className="text-befinlit-gold">*</span> Glossary of Changes
                    </h2>
                    <p className="text-sm text-befinlit-navy/70 mb-8 leading-relaxed italic font-serif text-center md:text-left">
                        The above sections are in line with the Income Tax Act, 1961. However, the Income Tax Act, 2025 will come into effect from 1 April 2026. The relevant sections and the content changes have been updated below:
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse bg-white border border-befinlit-navy/10 rounded-sm overflow-hidden shadow-sm">
                            <thead className="bg-befinlit-navy text-white text-xs tracking-widest font-bold">
                                <tr>
                                    <th className="p-4 border-b border-white/10 text-center">Particulars</th>
                                    <th className="p-4 border-b border-white/10 text-center">Section in 1961</th>
                                    <th className="p-4 border-b border-white/10 text-center">Section in 2025</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-befinlit-navy/80">
                                <tr className="hover:bg-befinlit-gold/5 transition-colors">
                                    <td className="p-4 border-b border-befinlit-navy/5">Presumptive Taxation (Business & Professionals)</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">44AD & 44ADA</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">58</td>
                                </tr>
                                <tr className="hover:bg-befinlit-gold/5 transition-colors bg-gray-50/30">
                                    <td className="p-4 border-b border-befinlit-navy/5">Maintenance of Accounts</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">44AA</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">62</td>
                                </tr>
                                <tr className="hover:bg-befinlit-gold/5 transition-colors">
                                    <td className="p-4 border-b border-befinlit-navy/5">Tax Rebate</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">87A</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">156</td>
                                </tr>
                                <tr className="hover:bg-befinlit-gold/5 transition-colors bg-gray-50/30">
                                    <td className="p-4 border-b border-befinlit-navy/5">Simplified/New Tax Regime</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">115BAC</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">202</td>
                                </tr>
                                <tr className="hover:bg-befinlit-gold/5 transition-colors">
                                    <td className="p-4 border-b border-befinlit-navy/5">TDS (Professional Services & Non-Residents)</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">194J & 195</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">393</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>


            </main>
        </article >
    );
};

export default FinancialGuide;
