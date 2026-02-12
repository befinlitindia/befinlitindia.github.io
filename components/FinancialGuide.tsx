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
        <article className="max-w-6xl mx-auto px-6 pt-48 pb-12">
            <div className="relative flex items-center justify-center mb-6">
                {onNavigate && (
                    <button
                        onClick={() => onNavigate('playbooks')}
                        className="absolute left-0 flex items-center gap-2 text-befinlit-navy/40 hover:text-befinlit-navy transition-colors font-bold text-xs uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
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
            <nav className="bg-white/80 backdrop-blur-md rounded-sm border border-befinlit-navy/10 p-4 sticky top-24 z-10 mb-12 shadow-sm print:hidden">
                <ul className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 md:gap-8 text-sm font-bold uppercase tracking-wider">
                    <li><a href="#income-tax" className="text-befinlit-navy/60 hover:text-befinlit-gold transition-colors">Income Tax</a></li>
                    <li><a href="#withholding-tax" className="text-befinlit-navy/60 hover:text-befinlit-gold transition-colors">Withholding Tax</a></li>
                    <li><a href="#books-of-accounts" className="text-befinlit-navy/60 hover:text-befinlit-gold transition-colors">Books</a></li>
                    <li><a href="#gst" className="text-befinlit-navy/60 hover:text-befinlit-gold transition-colors">GST</a></li>
                    <li><a href="#fema" className="text-befinlit-navy/60 hover:text-befinlit-gold transition-colors">FEMA/RBI</a></li>
                    <li><a href="#payments" className="text-befinlit-navy/60 hover:text-befinlit-gold transition-colors">Payments</a></li>
                </ul>
            </nav>

            {/* Main Content */}
            <main className="w-full space-y-16">

                {/* Section 1: Income Tax Act, 1961 */}
                <section id="income-tax" className="scroll-mt-32">
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5 mb-8">
                        <h3 className="text-xl font-serif font-bold text-center text-befinlit-navy mb-2">Who is a Professional?</h3>
                        <p className="text-center text-befinlit-navy/70 leading-relaxed">A professional includes an individual or partnership firm engaged in a vocation requiring intellectual skill or manual skill controlled by the operator's intellectual skill.</p>
                    </div>

                    <h2 className="text-3xl font-bold font-serif text-center mb-8 text-befinlit-navy flex items-center justify-center gap-3">
                        <FileText className="text-befinlit-gold" /> Income Tax Act 2025
                    </h2>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-2/3 space-y-8">
                            <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5 h-full flex flex-col">
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-serif font-bold mb-4 text-befinlit-navy">Section 58<sup>*</sup>: Presumptive Taxation</h3>
                                    <p className="text-befinlit-navy/70 mb-8 leading-relaxed">A simplified taxation scheme for Resident Individuals and Partnership Firms (not LLPs) who are specified professionals.</p>
                                    <h4 className="font-bold text-xs uppercase tracking-widest text-befinlit-navy/50 mb-4">Turnover Criteria (FY 2024-25 / AY 2025-26)</h4>
                                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                        <div className="flex-1 text-center bg-befinlit-navy/5 p-6 rounded-sm border border-befinlit-navy/10">
                                            <p className="font-serif font-bold text-2xl text-befinlit-navy mb-1">≤ ₹50 Lakh</p>
                                            <p className="text-xs uppercase tracking-wider text-befinlit-navy/60">Standard Gross Receipts Limit</p>
                                        </div>
                                        <div className="flex-1 text-center bg-green-50 p-6 rounded-sm border border-green-200">
                                            <p className="font-serif font-bold text-2xl text-green-700 mb-1">≤ ₹75 Lakh</p>
                                            <p className="text-xs uppercase tracking-wider text-green-800/60">If ≥95% receipts via non-cash</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-6 text-befinlit-navy/80 text-sm leading-relaxed border-t border-befinlit-navy/10 pt-6">Under this scheme, a <b className="font-bold text-befinlit-navy">minimum of 50%</b> of your total gross receipts is considered your profit. Income tax is calculated based on the profits disclosed. The advance tax liability rises on the last quarter of the Financial Year (15th of March).</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3">
                            <div className="bg-befinlit-navy text-befinlit-cream p-8 rounded-sm h-full flex flex-col justify-center">
                                <h3 className="text-xl font-bold mb-4 text-befinlit-gold text-center font-serif">Professionals Notified u/s 62<sup>*</sup></h3>
                                <p className="text-xs text-white/60 mb-8 text-center uppercase tracking-widest">Eligible for Section 58<sup>*</sup></p>
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
                    <h2 className="text-3xl font-bold font-serif text-center mb-8 text-befinlit-navy flex items-center justify-center gap-3">
                        <Globe className="text-befinlit-gold" /> Taxes Paid Abroad (Withholding Tax)
                    </h2>
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5">
                        <div className="text-center mb-10">
                            <h3 className="text-xl font-bold text-befinlit-navy mb-3">What is DTAA?</h3>
                            <p className="text-befinlit-navy/70 max-w-2xl mx-auto leading-relaxed">A <b className="font-bold text-befinlit-navy">D</b>ouble <b className="font-bold text-befinlit-navy">T</b>axation <b className="font-bold text-befinlit-navy">A</b>voidance <b className="font-bold text-befinlit-navy">A</b>greement (DTAA) is a tax treaty between India and another country. It ensures that you don't pay tax on the same income in both countries. By using the DTAA, your foreign client can deduct tax at a lower rate (e.g., 10%) instead of their country's default rate.</p>
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
                    <h2 className="text-3xl font-bold font-serif text-center mb-8 text-befinlit-navy flex items-center justify-center gap-3">
                        <BookOpen className="text-befinlit-gold" /> Books of Accounts & Presumptive Scheme
                    </h2>
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5">
                        <div className="space-y-8">
                            {/* Row 1: Basic Books */}
                            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6">
                                <div className="w-full md:w-2/5">
                                    <div className="p-6 rounded-sm border border-befinlit-gold/30 bg-befinlit-gold/5 h-full">
                                        <h4 className="font-bold text-center text-befinlit-navy mb-4 font-serif">Basic Books for Section 58<sup>*</sup></h4>
                                        <ul className="text-sm text-befinlit-navy/80 space-y-2 list-disc list-inside">
                                            <li>Capital Account</li>
                                            <li>Sundry Creditors</li>
                                            <li>Sundry Debtors</li>
                                            <li>Cash & Bank Balances</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/5 text-center hidden md:block">
                                    <p className="font-bold text-xs uppercase tracking-widest text-befinlit-navy">→ Maintain needed →</p>
                                </div>
                                <div className="w-full md:w-2/5">
                                    <div className="p-6 rounded-sm bg-gray-50 border border-gray-200 h-full flex flex-col justify-center text-center">
                                        <h4 className="font-bold text-lg text-befinlit-navy mb-2">The Best Part of Section 58<sup>*</sup></h4>
                                        <p className="text-sm text-befinlit-navy/70 leading-relaxed">You are <b className="font-bold text-befinlit-navy">not required to maintain detailed books</b> of accounts. Only basic records are needed to fill your ITR.</p>
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
                                        <p className="text-sm text-red-700/80 mb-3">You must opt out of Section 58<sup>*</sup> and get a tax audit if either of these conditions apply:</p>
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
                    <h2 className="text-3xl font-bold font-serif text-center mb-8 text-befinlit-navy flex items-center justify-center gap-3">
                        <ShieldCheck className="text-befinlit-gold" /> GST for Service Providers
                    </h2>
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5">
                        <h3 className="text-2xl font-bold font-serif text-center mb-6 text-befinlit-navy">When to get GST Registration?</h3>
                        <div className="grid md:grid-cols-2 gap-6 text-center mb-10">
                            <div className="bg-red-50 p-6 rounded-sm border border-red-200">
                                <h4 className="font-bold text-lg mb-2 text-red-800">Compulsory Registration</h4>
                                <p className="text-red-700/80 text-sm leading-relaxed">You <b className="font-bold">must</b> register for GST if your aggregate turnover from export of services or domestic services or both exceeds <b className="font-bold">₹20 lakh (₹10 lakh for special category states)</b> in a financial year.</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-sm border border-green-200">
                                <h4 className="font-bold text-lg mb-2 text-green-800">Voluntary Registration</h4>
                                <p className="text-green-800/80 text-sm leading-relaxed">You can choose to register even if your turnover is below ₹20 lakh. The main benefit is that you can claim the GST paid on your business expenses (Input Tax Credit - ITC).</p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold font-serif text-center mt-12 mb-8 text-befinlit-navy">Compliance after Registration (for exporters)</h3>
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
                    <h2 className="text-3xl font-bold font-serif text-center mb-8 text-befinlit-navy flex items-center justify-center gap-3">
                        <Globe className="text-befinlit-gold" /> FEMA & RBI Guidelines for Forex
                    </h2>
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5">
                        <h3 className="text-2xl font-bold font-serif text-center mb-8 text-befinlit-navy">Receiving Foreign Payments Correctly</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-befinlit-cream p-6 rounded-sm border border-befinlit-navy/10">
                                <h4 className="font-bold text-lg mb-2 text-befinlit-navy">FIRC is Crucial</h4>
                                <p className="text-sm text-befinlit-navy/70 leading-relaxed">Obtain a <b className="text-befinlit-gold">Foreign Inward Remittance Certificate (FIRC)</b> from your bank/payment platform. It's essential proof for tax, GST, and audit purposes.</p>
                            </div>
                            <div className="bg-befinlit-cream p-6 rounded-sm border border-befinlit-navy/10">
                                <h4 className="font-bold text-lg mb-2 text-befinlit-navy">Correct Purpose Codes</h4>
                                <p className="text-sm text-befinlit-navy/70 leading-relaxed">Use the correct RBI purpose code for every transaction (e.g., <b className="font-bold text-befinlit-navy">P0802</b> for software consultancy, <b className="font-bold text-befinlit-navy">P0806</b> for other business services).</p>
                            </div>
                            <div className="bg-befinlit-cream p-6 rounded-sm border border-befinlit-navy/10">
                                <h4 className="font-bold text-lg mb-2 text-befinlit-navy">Timely Repatriation</h4>
                                <p className="text-sm text-befinlit-navy/70 leading-relaxed">Bring export proceeds to India within <b className="font-bold text-befinlit-navy">9 months</b> from the export date. Track this via the EDPMS system at your bank. Failure can lead to penalties.</p>
                            </div>
                            <div className="bg-befinlit-cream p-6 rounded-sm border border-befinlit-navy/10">
                                <h4 className="font-bold text-lg mb-2 text-befinlit-navy">Softex Compliance</h4>
                                <p className="text-sm text-befinlit-navy/70 leading-relaxed">For export of <b className="font-bold text-befinlit-navy">software products</b> not exported as goods, Softex filing is mandatory. For IT-enabled services (ITeS), Softex filing does not apply.</p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Section 4: Payment Options */}
                <section id="payments" className="scroll-mt-32">
                    <h2 className="text-3xl font-bold font-serif text-center mb-8 text-befinlit-navy flex items-center justify-center gap-3">
                        <IndianRupee className="text-befinlit-gold" /> Choosing a Payment Platform (2025)
                    </h2>
                    <div className="bg-white p-6 rounded-sm shadow-sm border border-befinlit-navy/5 overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="bg-befinlit-navy text-white text-xs uppercase tracking-widest">
                                <tr>
                                    <th className="p-4 rounded-tl-sm">Method</th>
                                    <th className="p-4">Fees & Forex Markup</th>
                                    <th className="p-4">FIRA/FIRC</th>
                                    <th className="p-4">Speed</th>
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
                        className="bg-befinlit-gold text-befinlit-navy font-bold px-8 py-3 rounded-sm hover:bg-white transition-all shadow-lg"
                    >
                        Schedule a Consultation
                    </button>
                </section>

                {/* Glossary */}
                <section className="border-t border-befinlit-navy/10 pt-12 print:hidden">
                    <h3 className="text-xl font-bold font-serif text-befinlit-navy mb-4">Glossary of Changes (Income Tax Act 2025)</h3>
                    <div className="bg-gray-50 p-6 rounded-sm border border-gray-200">
                        <ul className="space-y-2 text-sm text-befinlit-navy/70">
                            <li><b className="text-befinlit-navy">Section 58<sup>*</sup>:</b> Corresponds to Section 44ADA of the Income Tax Act, 1961 (Presumptive Taxation).</li>
                            <li><b className="text-befinlit-navy">Section 62<sup>*</sup>:</b> Corresponds to Section 44AA of the Income Tax Act, 1961 (Maintenance of Accounts).</li>
                            <li><b className="text-befinlit-navy">Section 393<sup>*</sup>:</b> Corresponds to Section 195 of the Income Tax Act, 1961 (TDS on Non-Residents).</li>
                        </ul>
                    </div>
                </section>


            </main>
        </article>
    );
};

export default FinancialGuide;
