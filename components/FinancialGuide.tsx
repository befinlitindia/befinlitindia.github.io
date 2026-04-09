import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, Globe, IndianRupee, ShieldCheck, ShieldAlert } from 'lucide-react';

interface Props {
    onOpenConsultation?: () => void;
}

const FinancialGuide: React.FC<Props> = ({ onOpenConsultation }) => {

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
                {(
                    <div className="md:absolute md:left-0">
                        <Link
                            to="/playbooks"
                            className="flex items-center gap-2 text-befinlit-navy/40 hover:text-befinlit-navy transition-colors font-bold text-xs uppercase tracking-widest"
                        >
                            <ArrowLeft size={16} /> Back to Playbooks
                        </Link>
                    </div>
                )}
                <span className="inline-block py-1 px-3 border border-befinlit-navy/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-befinlit-navy">
                    Freelance 101
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
                    The gig economy has liberated talent from traditional employment. Whether you're a consultant, a designer, or a developer, you are your own boss. But with great freedom comes great compliance. From income tax slabs to GST registrations, navigating the regulatory maze is the price of admission for your independent career. Let's navigate this complexity together through this playbook.
                </p>
            </div>

            {/* Who is a Professional & Primers */}
            <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5 mb-16 space-y-6">
                <div>
                    <h3 className="text-2xl font-serif font-bold text-left text-befinlit-navy mb-4">Who is a Professional?</h3>
                    <p className="text-left text-sm text-befinlit-navy/70 leading-relaxed">
                        A professional is someone who earns money by selling their specialized skill, knowledge, or intellectual talent rather than selling a physical product. Instead of selling goods, they help people solve problems using their specialized training - like a software developer writing code, a designer creating a logo, or a doctor treating a patient.
                    </p>
                </div>
                <div className="pt-6 border-t border-befinlit-navy/10">
                    <p className="text-left text-sm text-befinlit-navy/80 leading-relaxed font-serif">We will use the <b className="font-bold text-befinlit-navy"><Link to="/glossary/changes" className="underline cursor-pointer hover:text-befinlit-gold transition-colors">Income Tax Act, 2025<sup>*</sup></Link></b> as our primary guide for understanding how to navigate this maze. According to the <b className="font-bold text-befinlit-navy"><Link to="/glossary/changes" className="underline cursor-pointer hover:text-befinlit-gold transition-colors">Income Tax Act, 2025<sup>*</sup></Link></b>, a professional can operate their work in different business structures like <b className="font-bold text-befinlit-navy">Sole Proprietorship (Individual), Partnership, Limited Liability Partnership (LLP), One Person Company (OPC) and Private Limited Company (Pvt Ltd)</b>. To understand the differences between these business structures and compare their pros and cons,{' '}
                        <Link to="/playbook/moonlighters-playbook" className="text-befinlit-gold font-bold underline hover:text-befinlit-navy transition-colors inline-block">
                            refer to the Moonlighter's Playbook.
                        </Link>
                    </p>
                </div>
            </div>

            {/* Internal Navigation */}
            <nav className="bg-befinlit-navy/95 backdrop-blur-md rounded-sm border border-befinlit-navy/10 sticky top-[138px] z-40 mb-12 shadow-sm print:hidden w-full transition-all duration-300">
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-between w-full text-xs md:text-sm font-bold tracking-wider divide-y md:divide-y-0 md:divide-x divide-white/10">
                    <li className="flex-1">
                        <a href="#income-tax" className="block py-4 px-2 text-center text-white/80 hover:text-befinlit-gold hover:bg-white/5 transition-all">
                            Income Tax
                        </a>
                    </li>
                    <li className="flex-1">
                        <a href="#books-of-accounts" className="block py-4 px-2 text-center text-white/80 hover:text-befinlit-gold hover:bg-white/5 transition-all">
                            Books
                        </a>
                    </li>
                    <li className="flex-1">
                        <a href="#withholding-tax" className="block py-4 px-2 text-center text-white/80 hover:text-befinlit-gold hover:bg-white/5 transition-all">
                            Withholding Tax
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

                {/* Section 1: Income Tax Act, 2025 */}
                <section id="income-tax" className="scroll-mt-32">
                    <h2 className="text-2xl font-bold font-serif text-left mb-8 text-befinlit-navy flex items-center gap-3">
                        <FileText className="text-befinlit-gold" /> <Link to="/glossary/changes" className="underline cursor-pointer hover:text-befinlit-gold transition-colors">Income Tax Act, 2025<sup className="text-befinlit-gold">*</sup></Link>
                    </h2>

                    <div className="flex flex-col gap-8">
                        {/* General Rule - 3 Column Layout */}
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5">
                            <h3 className="text-2xl font-serif font-bold mb-4 text-befinlit-navy">What does running a business mean?</h3>
                            <p className="text-sm text-befinlit-navy/70 leading-relaxed mb-6">
                                By default, <b className="font-bold text-befinlit-navy">all</b> professionals in <b className="font-bold text-befinlit-navy">all</b> business structures (Sole Proprietorship, Partnership, LLP, OPC and Pvt Ltd) are required to:
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-befinlit-navy border border-befinlit-navy/10 p-6 rounded-sm text-left">
                                    <h4 className="font-bold text-befinlit-gold mb-2">Maintain Detailed Books</h4>
                                    <p className="text-sm text-white/80">Involves following double entry accounting system to prepare financial statements.</p>
                                </div>
                                <div className="bg-befinlit-navy border border-befinlit-navy/10 p-6 rounded-sm text-left">
                                    <h4 className="font-bold text-befinlit-gold mb-2">File Detailed Return of Income</h4>
                                    <p className="text-sm text-white/80">Involves ITR 3, ITR 5 or ITR 6 as applicable for business entity with profit and loss account and balance sheet figures.</p>
                                </div>
                                <div className="bg-befinlit-navy border border-befinlit-navy/10 p-6 rounded-sm text-left">
                                    <h4 className="font-bold text-befinlit-gold mb-2">Keep documentary evidence</h4>
                                    <p className="text-sm text-white/80">Involves documenting all expenses and incomes for 8 years</p>
                                </div>
                            </div>

                            <p className="text-sm text-befinlit-navy/60 italic border-t border-befinlit-navy/10 pt-4">This is the "heavier foundation" required for most businesses. However, for small businesses, there is a better, more simplified way to structure your compliance.</p>
                        </div>

                        {/* Simplified Scheme - Expanded Layout */}
                        {/* Simplified Scheme - Expanded Layout */}
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-2/3 space-y-8">
                                <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5 h-full flex flex-col relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-befinlit-gold text-befinlit-navy text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                                        Optimization Hack
                                    </div>
                                    <div className="flex-grow flex flex-col">
                                        <h3 className="text-2xl font-serif font-bold mb-4 text-befinlit-navy"><span>Section <Link to="/glossary/changes?highlight=58" className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">58<sup>*</sup></Link>: The Presumptive Taxation Scheme for Professionals</span></h3>

                                        <div className="bg-befinlit-navy/5 p-6 rounded-sm border border-befinlit-navy/10 flex-grow flex flex-col justify-center mb-8">
                                            <h4 className="font-bold text-lg text-befinlit-navy mb-3">How is this simplified?</h4>
                                            <p className="text-sm text-befinlit-navy/70 leading-relaxed mb-4">
                                                Your profit is calculated at <b className="font-bold text-befinlit-navy">50% of your gross receipts</b> (or actual profit, whichever is higher), and you only pay tax on that amount.
                                            </p>
                                            <p className="text-sm text-befinlit-navy/70 leading-relaxed">
                                                You are completely exempt from the "heavier foundation". Instead, you just need to:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-befinlit-navy/80 text-sm mt-3 pl-4">
                                                <li>Maintain simple books (invoices, bank statement, cash book, debtors, and creditors).</li>
                                                <li>File the simplified <b className="font-bold">ITR-4</b> (if no other income sources are present).</li>
                                                <li>Not maintain documentary evidence of every expense and income for 8 years.</li>
                                            </ul>
                                        </div>

                                        <div className="pt-2">
                                            <p className="text-befinlit-navy/90 mb-6 leading-relaxed font-bold bg-white p-5 rounded-sm shadow-sm border border-befinlit-navy/5">
                                                Usage of this section is <b className="text-befinlit-gold font-bold">restricted</b>. It is available only if you meet all the following conditions:
                                            </p>
                                            <div className="grid md:grid-cols-3 gap-6">
                                                <div className="bg-befinlit-navy border border-befinlit-navy/10 p-5 rounded-sm text-left">
                                                    <h4 className="font-bold text-befinlit-gold mb-3">Specified Professional</h4>
                                                    <p className="text-xs text-white/80 leading-relaxed">Only selected professionals are eligible for this list. <a href="#specified-prof-list" className="text-befinlit-gold underline hover:text-white transition-colors block mt-2">Check the list →</a></p>
                                                </div>
                                                <div className="bg-befinlit-navy border border-befinlit-navy/10 p-5 rounded-sm text-left">
                                                    <h4 className="font-bold text-befinlit-gold mb-3">Receipts Limit</h4>
                                                    <p className="text-xs text-white/80 leading-relaxed mb-2">Your annual receipts should be:</p>
                                                    <ul className="text-xs text-white/80 space-y-1 list-disc pl-4">
                                                        <li>Up to ₹50 Lakh (Standard)</li>
                                                        <li>Up to ₹75 Lakh (If 95% of receipts are via banking channels)</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-befinlit-navy border border-befinlit-navy/10 p-5 rounded-sm text-left">
                                                    <h4 className="font-bold text-befinlit-gold mb-3">Structure</h4>
                                                    <p className="text-xs text-white/80 leading-relaxed mb-2">Must be <b className="font-bold text-white">Sole Proprietorship</b> or <b className="font-bold text-white">Partnership</b>.</p>
                                                    <p className="text-[10px] text-white/60 italic">(LLPs, OPCs & Pvt Ltd excluded)</p>
                                                </div>
                                            </div>

                                            {/* The 44AD Debate */}
                                            <div id="debate-section" className="mt-8 bg-befinlit-navy/5 p-6 rounded-sm border border-befinlit-navy/10 flex-grow">
                                                <h4 className="font-bold text-lg text-befinlit-navy mb-3">Debate: Not in the <a href="#specified-prof-list" className="text-befinlit-gold underline hover:text-befinlit-navy transition-colors">specified professional list</a>?</h4>
                                                <p className="text-sm text-befinlit-navy/70 leading-relaxed mb-3">
                                                    In case you do not fall directly in the list of specified professionals, you can choose to opt for the alternate presumptive scheme for non-specified professionals as per <b>Section <Link to="/glossary/changes?highlight=58" className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">58<sup>*</sup></Link> of the Act</b> wherein your taxable profit is calculated at 6% (or 8%) or actual profit, whichever is higher. However, the basic logic of this scheme is meant for businesses which are trading in goods, and therefore, purchases become a major expense for such entities, leading to a profit margin close to 6-8%. For professionals, it is recommended to conservatively file as specified professionals only.
                                                </p>
                                                <p className="text-sm text-befinlit-navy/70 leading-relaxed">
                                                    <b className="font-bold text-red-600">Caution:</b> If your clients withholds your TDS as fees for technical or professional services, but you declare your income as a non-specified professional business, this may trigger <b className="font-bold text-befinlit-navy">red flags</b> and inquiries from the Income Tax Department.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="specified-prof-list" className="bg-befinlit-navy text-befinlit-cream p-8 rounded-sm h-full flex flex-col w-full md:w-1/3">
                                <h3 className="text-xl font-bold mb-1 text-befinlit-gold text-center font-serif">Specified Professions</h3>
                                <p className="text-[10px] text-white/50 mb-6 text-center italic tracking-wider">as provided in Section <Link to="/glossary/changes?highlight=62" className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">62*</Link> of the Act</p>
                                <p className="text-[11px] text-white/70 mb-2 text-left leading-relaxed font-bold">
                                    You can be eligible, if the nature of your profession (examples provided) is specified below:
                                </p>
                                <p className="text-[10px] text-white/50 mb-6 text-left italic tracking-wider leading-relaxed">
                                    Please note: This is not an exhaustive list.
                                </p>
                                <div className="space-y-4 text-sm font-medium flex-1 pb-8">
                                    <div className="flex gap-3 items-start">
                                        <span className="text-befinlit-gold mt-1">✓</span>
                                        <div>
                                            <span className="font-bold underline">Legal:</span> <span className="text-xs text-white/70 font-normal ml-1">Advocates, Solicitors, Legal Consultants.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-befinlit-gold mt-1">✓</span>
                                        <div>
                                            <span className="font-bold underline">Medical:</span> <span className="text-xs text-white/70 font-normal ml-1">Physicians, Surgeons, Dentists.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-befinlit-gold mt-1">✓</span>
                                        <div>
                                            <span className="font-bold underline">Engineering:</span> <span className="text-xs text-white/70 font-normal ml-1">Civil, Mechanical, Electrical Engineers.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-befinlit-gold mt-1">✓</span>
                                        <div>
                                            <span className="font-bold underline">Architectural:</span> <span className="text-xs text-white/70 font-normal ml-1">Certified Architects, Town Planners.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-befinlit-gold mt-1">✓</span>
                                        <div>
                                            <span className="font-bold underline">Accountancy:</span> <span className="text-xs text-white/70 font-normal ml-1">Chartered Accountants.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-befinlit-gold mt-1">✓</span>
                                        <div>
                                            <span className="font-bold underline">Technical Consultancy:</span> <span className="text-xs text-white/70 font-normal ml-1">Management consultants, Technical advisors.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-befinlit-gold mt-1">✓</span>
                                        <div>
                                            <span className="font-bold underline">Interior Decoration:</span> <span className="text-xs text-white/70 font-normal ml-1">Interior designers, Consultants.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-befinlit-gold mt-1">✓</span>
                                        <div>
                                            <span className="font-bold underline">Information Technology:</span> <span className="text-xs text-white/70 font-normal ml-1">Software developers, Web designers, IT consultants.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-befinlit-gold mt-1">✓</span>
                                        <div>
                                            <span className="font-bold underline">Authorized Representatives:</span> <span className="text-xs text-white/70 font-normal ml-1">Representatives for a fee before Tribunal or authority.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-befinlit-gold mt-1">✓</span>
                                        <div>
                                            <span className="font-bold underline">Film Artists:</span> <span className="text-xs text-white/70 font-normal ml-1">Actors, Producers, Directors.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <span className="text-befinlit-gold">✓</span>
                                        <span className="font-bold underline">Company Secretary</span>
                                    </div>
                                </div>

                                {/* Moved Social Media Influencers block */}
                                <div className="mt-auto bg-white/5 p-5 rounded-sm border border-white/10 flex-grow-0 pt-5">
                                    <h4 className="font-bold text-sm text-befinlit-gold mb-2">Social Media Influencers?</h4>
                                    <p className="text-xs text-white/80 leading-relaxed mb-2">
                                        Recently, a dedicated professional code was specified for social media influencers ('SMI'). However, they have not been added to this above mentioned list in the Income Tax Act. This has led to a confusion amongst SMI.
                                    </p>
                                    <p className="text-xs text-white/80 leading-relaxed">
                                        If an SMI works as a film artist, consultant, etc from the above mentioned fields, they fall under the purview of the specified professionals. For other SMIs, <a href="#debate-section" className="text-befinlit-gold underline hover:text-white transition-colors">as mentioned</a>, alternate scheme under <b>section <Link to="/glossary/changes?highlight=58" className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">58<sup>*</sup></Link> of the Act</b> for non-specified professionals and businesses can be chosen. However, as a conservative approach, opt for scheme as a professional.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Books of Accounts Section */}
                < section id="books-of-accounts" className="scroll-mt-32" >
                    <h2 className="text-2xl font-bold font-serif text-left mb-8 text-befinlit-navy flex items-center gap-3">
                        <BookOpen className="text-befinlit-gold" /> Books of Accounts & Presumptive Taxation Scheme
                    </h2>
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5">
                        <p className="text-sm text-befinlit-navy/80 leading-relaxed mb-8">
                            Simple Accounting can be broken down in 4 parts: The first and often misunderstood part is to invoice your services. Meaning bill your client. Second, record your receipts. Third, distinguish between your invoice and bank receipt. Fourth, accounting is done on an <a href="#jargons" className="underline cursor-pointer hover:text-befinlit-gold transition-colors font-bold text-befinlit-navy">accrual basis</a>, not receipt basis.
                        </p>
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
                                        <p className="text-sm text-befinlit-navy/70 leading-relaxed">You do <b className="font-bold text-befinlit-navy">not</b> need complex accounting. Just keep basic records of what comes in and what goes out.</p>
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
                                    <p className="font-bold text-xs uppercase tracking-widest text-red-500">← Maintain all if ←</p>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase">Tax Audit Required</p>
                                </div>
                                <div className="w-full md:w-2/5">
                                    <div className="p-6 rounded-sm bg-red-50 border border-red-100 h-full text-center">
                                        <h4 className="font-bold text-lg text-red-800 mb-2">When Tax Audit is Required</h4>
                                        <p className="text-sm text-red-700/80 mb-3">You must opt out of Section <Link to="/glossary/changes?highlight=58" className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">58<sup>*</sup></Link> and get a tax audit if either of these conditions apply:</p>
                                        <ul className="text-sm text-red-700/80 list-disc list-inside space-y-1 text-left inline-block">
                                            <li>Your profits are <b className="font-bold">&lt; 50%</b> of gross receipts.</li>
                                            <li>Your gross receipts exceed the presumptive limits (<b className="font-bold">₹50 lakh or ₹75 lakh</b>).</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 44AD vs ADA Nuance */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-befinlit-navy mb-6 flex items-center gap-3">
                            <ShieldAlert className="text-befinlit-gold" />
                            <span>The <Link to="/glossary/changes?highlight=58" className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">58<sup>*</sup></Link> vs <Link to="/glossary/changes?highlight=58" className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">58<sup>*</sup></Link> "Grey Area"</span>
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5">
                            <div>
                                <p className="text-befinlit-navy/80 mb-4 text-sm leading-relaxed">
                                    Many freelancers file under <Link to="/glossary/changes?highlight=58" className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">58<sup>*</sup></Link> (declaring 6%/8% profit) because it's more beneficial than <Link to="/glossary/changes?highlight=58" className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">58<sup>*</sup></Link> (50% profit).
                                </p>
                                <p className="text-befinlit-navy/80 mb-4 text-sm leading-relaxed font-bold">
                                    Is it wrong? Technically, no. Is it safe? Absolutely not.
                                </p>
                                <p className="text-befinlit-navy/70 text-xs leading-relaxed">
                                    If your TDS is deducted under *<Link to="/glossary/changes?highlight=393" className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">393<sup>*</sup></Link> (Technical / Professional Services), claiming to be a "trader" under <Link to="/glossary/changes?highlight=58" className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">58<sup>*</sup></Link> invites the officer to ask you to prove you <em>don't</em> fall under the notified professional list. That is a litigation battle you want to avoid.
                                </p>
                            </div>
                            <div className="bg-befinlit-navy text-white p-6 rounded-sm text-center">
                                <p className="font-serif italic text-lg mb-4">"Compliance is expensive. Non-compliance is unaffordable."</p>
                            </div>
                        </div>
                    </div>
                </section >

                {/* Withholding Tax Flowchart */}
                <section id="withholding-tax" className="scroll-mt-32">
                    <h2 className="text-2xl font-bold font-serif text-left mb-8 text-befinlit-navy flex items-center gap-3">
                        <Globe className="text-befinlit-gold" /> Taxes Paid Abroad (Withholding Tax)
                    </h2>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-2/3 space-y-8">
                            <div className="bg-white p-8 rounded-sm shadow-sm border border-befinlit-navy/5 h-full">
                                <div className="text-left mb-10">
                                    <h3 className="text-2xl font-bold text-befinlit-navy mb-3">What is DTAA?</h3>
                                    <p className="text-sm text-befinlit-navy/70 leading-relaxed">
                                        A <b className="font-bold text-befinlit-navy">D</b>ouble <b className="font-bold text-befinlit-navy">T</b>axation <b className="font-bold text-befinlit-navy">A</b>voidance <b className="font-bold text-befinlit-navy">A</b>greement (DTAA) is a tax treaty between India and another country. It ensures that you don't pay tax on the same income in both countries. By using the DTAA, your foreign client can deduct tax at a lower rate (e.g., 10%) instead of their country's default rate.
                                    </p>
                                    <p className="text-sm text-befinlit-navy/90 font-bold mt-4">
                                        Below are the steps to be taken to ensure you receive this benefit:
                                    </p>
                                </div>
                                <div className="space-y-6 max-w-4xl mx-auto">
                                    <div className="grid md:grid-cols-2 gap-6 items-start">
                                        <div className="bg-befinlit-navy border border-befinlit-navy/10 p-6 rounded-sm text-center h-full">
                                            <h4 className="font-bold text-befinlit-gold mb-2">Step 1: Provide Documents to Client</h4>
                                            <p className="text-sm text-white/80 mb-4">To get the benefit of a lower tax deduction rate under DTAA, your client will ask for:</p>
                                            <p className="font-bold text-befinlit-navy text-[11px] bg-white py-2 px-3 inline-block rounded-sm">Invoice + PAN + TRC + No-PE Declaration</p>
                                        </div>
                                        <div className="bg-befinlit-navy/5 border border-befinlit-navy/10 p-6 rounded-sm text-center h-full">
                                            <h4 className="font-bold text-befinlit-navy mb-2">Step 2: Obtain Proof of Tax Paid</h4>
                                            <p className="text-sm text-befinlit-navy/70">The client will deduct tax at the DTAA rate. Afterwards, obtain proof of this tax payment (e.g., a tax certificate or return copy from their country).</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6 items-start">
                                        <div className="bg-white border-2 border-befinlit-gold/30 p-6 rounded-sm text-center h-full shadow-sm">
                                            <h4 className="font-bold text-befinlit-navy mb-2">Step 3: File Form 44</h4>
                                            <p className="text-sm text-befinlit-navy/70">To validate your FTC claim, you must file <Link to="/glossary/changes" className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">Form 44<sup>*</sup></Link> on the Income Tax portal.</p>
                                        </div>
                                        <div className="bg-befinlit-cream border border-befinlit-navy/10 p-6 rounded-sm text-center h-full">
                                            <h4 className="font-bold text-befinlit-navy mb-2">Step 4: Claim Foreign Tax Credit (FTC)</h4>
                                            <p className="text-sm text-befinlit-navy/70">In your Income Tax Return (ITR), claim the credit for the foreign tax paid. This amount will offset your Indian tax liability.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Side Margin: Definitions */}
                        <div id="jargons" className="bg-befinlit-navy text-befinlit-cream p-8 rounded-sm h-full flex flex-col w-full md:w-1/3 scroll-mt-32">
                            <h3 className="text-xl font-bold mb-1 text-befinlit-gold text-center font-serif">Decoding jargons</h3>
                            <p className="text-[11px] text-white/70 mb-6 text-center leading-relaxed font-bold">
                                What do these terms & documents mean?
                            </p>
                            
                            <div className="space-y-6 text-sm font-medium flex-1 pb-8 text-left">
                                <div className="flex flex-col gap-1 items-start">
                                    <span className="font-bold underline text-befinlit-gold">Accrual basis</span>
                                    <span className="text-xs text-white/80 leading-relaxed font-normal">An accounting method where revenue or expenses are recorded when a transaction occurs rather than when payment is received or made. It accurately reflects business income for the period.</span>
                                </div>
                                <div className="flex flex-col gap-1 items-start">
                                    <span className="font-bold underline text-befinlit-gold">Invoice</span>
                                    <span className="text-xs text-white/80 leading-relaxed font-normal">A commercial document issued by you (the seller) to your client (the buyer, in this case, being a foreign buyer), detailing the services provided and the amount due.</span>
                                </div>
                                <div className="flex flex-col gap-1 items-start">
                                    <span className="font-bold underline text-befinlit-gold">PE / No-PE</span>
                                    <span className="text-xs text-white/80 leading-relaxed font-normal"><b className="text-white">Permanent Establishment.</b> A No-PE declaration states that you do not have a fixed place of business (like an office or branch) in the client's country.</span>
                                </div>
                                <div className="flex flex-col gap-1 items-start">
                                    <span className="font-bold underline text-befinlit-gold">TRC</span>
                                    <span className="text-xs text-white/80 leading-relaxed font-normal"><b className="text-white">Tax Residency Certificate.</b> An official document issued by the Indian Income Tax Department proving that you are a tax resident of India. It can be obtained vide Filing Form 42 and the AO will issue you the certificate vide Form 43. This is as per Rule 75 of the Income Tax Rules, 1962.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: GST Provisions */}
                < section id="gst" className="scroll-mt-32" >
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
                </section >

                {/* Section 3: FEMA & RBI Guidelines */}
                < section id="fema" className="scroll-mt-32" >
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
                </section >

                {/* Section 4: Payment Options */}
                < section id="payments" className="scroll-mt-32" >
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
                </section >

                {/* Glossary */}
                <section className="mb-16 border-t border-befinlit-navy/10 pt-12 print:hidden">
                    <h2 className="text-2xl font-bold text-befinlit-navy mb-6 flex items-center gap-2 font-serif">
                        <span className="text-befinlit-gold">*</span> Glossary of Changes
                    </h2>
                    <p className="text-sm text-befinlit-navy/70 mb-8 leading-relaxed italic font-serif text-center md:text-left">
                        The above sections and forms are in line with the Income Tax Act, 2025 which came into effect from 1 April 2026. The earlier sections pertaining to Income Tax Act, 1961 have been updated below:
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse bg-white border border-befinlit-navy/10 rounded-sm overflow-hidden shadow-sm">
                            <thead className="bg-befinlit-navy text-white text-xs tracking-widest font-bold">
                                <tr>
                                    <th className="p-4 border-b border-white/10 text-center">Particulars</th>
                                    <th className="p-4 border-b border-white/10 text-center">Section in 2025</th>
                                    <th className="p-4 border-b border-white/10 text-center">Section in 1961</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-befinlit-navy/80">
                                <tr className="hover:bg-befinlit-gold/5 transition-colors">
                                    <td className="p-4 border-b border-befinlit-navy/5">Presumptive Taxation (Business & Professionals)</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">58</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">44AD & 44ADA</td>
                                </tr>
                                <tr className="hover:bg-befinlit-gold/5 transition-colors bg-gray-50/30">
                                    <td className="p-4 border-b border-befinlit-navy/5">TDS (Professional Services & Non-Residents)</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">393</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">194J & 195</td>
                                </tr>
                                <tr className="hover:bg-befinlit-gold/5 transition-colors">
                                    <td className="p-4 border-b border-befinlit-navy/5">Maintenance of Accounts</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">62</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">44AA</td>
                                </tr>
                                <tr className="hover:bg-befinlit-gold/5 transition-colors bg-gray-50/30">
                                    <td className="p-4 border-b border-befinlit-navy/5">Statement of income from a country outside India and Foreign Tax Credit</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 font-bold text-befinlit-navy text-center">Form 44 (Income-tax Rules, 2026)</td>
                                    <td className="p-4 border-b border-befinlit-navy/5 text-center">Form 67 (Income-tax Rules, 1962)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Call to Action similar to other Playbooks */}
                < section className="mt-16 bg-befinlit-navy text-befinlit-cream p-10 rounded-sm text-center" >
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
                </section >




            </main >
        </article >
    );
};

export default FinancialGuide;
