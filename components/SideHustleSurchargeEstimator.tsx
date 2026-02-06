import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, Info, ArrowLeft, BookOpen, Calculator, Landmark } from 'lucide-react';

interface Props {
  onNavigate: (page: any) => void;
}

const SideHustleSurchargeEstimator: React.FC<Props> = ({ onNavigate }) => {
  const [salary, setSalary] = useState('');
  const [freelance, setFreelance] = useState('');

  // New State for Contact Details & Validation
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [usageCount, setUsageCount] = useState(0);

  const [result, setResult] = useState<null | any>(null);

  useEffect(() => {
    // Load usage count from local storage on mount
    const savedCount = localStorage.getItem('moonlighter_calculator_usage');
    if (savedCount) {
      setUsageCount(parseInt(savedCount, 10));
    }
  }, []);

  const validateEmail = (email: string) => {
    const allowedDomains = [
      'gmail.com', 'yahoo.com', 'yahoo.co.in', 'rediffmail.com',
      'hotmail.com', 'outlook.com', 'icloud.com'
    ];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) return false;

    const domain = email.split('@')[1];
    return allowedDomains.includes(domain.toLowerCase());
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const calculateTax = (grossIncome: number, isSalaried: boolean) => {
    let netIncome = grossIncome;
    if (isSalaried) netIncome = Math.max(0, grossIncome - 75000);

    let baseTax = 0;
    const slabs = [
      { limit: 400000, rate: 0.00 },
      { limit: 800000, rate: 0.05 },
      { limit: 1200000, rate: 0.10 },
      { limit: 1600000, rate: 0.15 },
      { limit: 2000000, rate: 0.20 },
      { limit: 2400000, rate: 0.25 },
    ];

    let prevLimit = 0;
    for (const slab of slabs) {
      if (netIncome > slab.limit) {
        baseTax += (slab.limit - prevLimit) * slab.rate;
        prevLimit = slab.limit;
      } else {
        baseTax += (netIncome - prevLimit) * slab.rate;
        prevLimit = netIncome;
        break;
      }
    }
    if (netIncome > 2400000) baseTax += (netIncome - 2400000) * 0.30;

    if (netIncome <= 1200000) {
      baseTax = 0;
    } else {
      const reliefCap = netIncome - 1200000;
      if (baseTax > reliefCap) baseTax = reliefCap;
    }

    let surcharge = 0;
    if (netIncome > 5000000) {
      let rate = 0;
      if (netIncome > 20000000) rate = 0.25;
      else if (netIncome > 10000000) rate = 0.15;
      else rate = 0.10;
      surcharge = baseTax * rate;
    }

    return Math.round(((baseTax + surcharge) * 1.04) / 10) * 10;
  };

  const performCalculation = () => {
    // Reset Errors
    setEmailError('');
    setPhoneError('');

    let isValid = true;

    // Validate Email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please use a valid personal email (Gmail, Yahoo, Rediff, etc.)');
      isValid = false;
    }

    // Validate Phone
    if (!phone) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      isValid = false;
    }

    if (!isValid) return;

    const s = parseFloat(salary) || 0;
    const f = parseFloat(freelance) || 0;
    const freelanceTaxable = f >= 7500000 ? f * 0.8 : f * 0.5;

    const sTax = calculateTax(s, true);
    const combinedTax = calculateTax(s + freelanceTaxable, true);

    const calcResult = {
      sTax,
      combinedTax,
      diff: combinedTax - sTax,
      fRaw: f,
      fTaxable: freelanceTaxable,
      totalIncome: s + freelanceTaxable
    };

    setResult(calcResult);

    // Track Usage
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('moonlighter_calculator_usage', newCount.toString());

    // Log Data for "Collection"
    console.log("Moonlighter Calculator Submission:", {
      contact: { email, phone },
      inputs: { salary: s, freelance: f },
      results: calcResult,
      meta: {
        usageCount: newCount,
        timestamp: new Date().toISOString()
      }
    });
  };

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="animate-fade-in pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="relative flex items-center justify-center mb-6">
        <button
          onClick={() => onNavigate('tools')}
          className="absolute left-0 flex items-center gap-2 text-befinlit-navy/40 hover:text-befinlit-navy transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Toolkits
        </button>
        <div className="inline-block px-4 py-1.5 rounded-full border border-slate-200 text-[10px] font-bold text-slate-500 tracking-[0.15em]">
          Surcharge Reality Check
        </div>
      </div>

      {/* Intro Header */}
      <div className="mb-12 text-center max-w-4xl mx-auto">

      </div>

      <div className="bg-white border border-befinlit-navy/10 rounded-sm shadow-xl overflow-hidden mb-12">
        <div className="bg-befinlit-navy p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-befinlit-gold" size={24} />
            <h2 className="text-2xl font-bold font-serif italic">The "Success Penalty" Calculator</h2>
          </div>
          <p className="text-white/60 text-sm max-w-2xl leading-relaxed">
            Side-hustles are taxed at your highest marginal rate because they sit "on top" of your salary. This tool calculates the exact tax impact of adding freelance revenue to your existing salary under latest Income Tax Act.
          </p>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] font-bold text-befinlit-navy/40">Annual Gross Salary (₹)</label>
              <input
                type="number"
                value={salary}
                onChange={e => setSalary(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm outline-none focus:border-befinlit-gold transition-colors text-lg"
                placeholder="e.g. 4200000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] font-bold text-befinlit-navy/40">Freelance Revenue (₹)</label>
              <input
                type="number"
                value={freelance}
                onChange={e => setFreelance(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm outline-none focus:border-befinlit-gold transition-colors text-lg"
                placeholder="e.g. 2500000"
              />
            </div>
          </div>

          {/* Contact Details Section for Validation */}
          <div className="border-t border-dashed border-gray-200 pt-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Required for Analysis</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-bold text-befinlit-navy/40">
                  Email Address
                  {emailError && <span className="text-red-500 ml-2 normal-case tracking-normal">({emailError})</span>}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className={`w-full bg-gray-50 border p-4 rounded-sm outline-none transition-colors text-lg ${emailError ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-befinlit-gold'}`}
                  placeholder="yourname@gmail.com"
                />
                <p className="text-[10px] text-gray-400">Accepted: Gmail, Yahoo, Rediff, Outlook, etc.</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-bold text-befinlit-navy/40">
                  Phone Number
                  {phoneError && <span className="text-red-500 ml-2 normal-case tracking-normal">({phoneError})</span>}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhone(val);
                    if (phoneError) setPhoneError('');
                  }}
                  className={`w-full bg-gray-50 border p-4 rounded-sm outline-none transition-colors text-lg ${phoneError ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-befinlit-gold'}`}
                  placeholder="9876543210"
                />
              </div>
            </div>
          </div>

          <button
            onClick={performCalculation}
            className="w-full bg-befinlit-gold text-befinlit-navy font-bold py-4 rounded-sm hover:bg-befinlit-navy hover:text-white transition-all text-sm uppercase tracking-widest shadow-lg"
          >
            Calculate Tax Leakage
          </button>

          {result && (
            <div className="mt-12 space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-6 rounded-sm border border-gray-100">
                  <p className="text-[10px] uppercase text-gray-400 mb-1 font-bold">Standard Tax</p>
                  <p className="text-xl font-bold text-befinlit-navy">{formatINR(result.sTax)}</p>
                  <p className="text-[10px] text-gray-400 mt-2">Salary Only</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-sm border border-gray-100">
                  <p className="text-[10px] uppercase text-gray-400 mb-1 font-bold">New Liability</p>
                  <p className="text-xl font-bold text-befinlit-navy">{formatINR(result.combinedTax)}</p>
                  <p className="text-[10px] text-gray-400 mt-2">Combined Income</p>
                </div>
                <div className="bg-befinlit-navy p-6 rounded-sm text-white">
                  <p className="text-[10px] uppercase text-befinlit-gold mb-1 font-bold">Success Penalty</p>
                  <p className="text-2xl font-bold text-befinlit-gold">{formatINR(result.diff)}</p>
                  <p className="text-[10px] text-white/40 mt-2">The "Hidden" Cost</p>
                </div>
              </div>

              <div className="bg-befinlit-cream border border-befinlit-gold/20 p-8 rounded-sm">
                <h3 className="text-lg font-bold text-befinlit-navy mb-4 flex items-center gap-2">
                  <Info size={20} className="text-befinlit-gold" />
                  Detailed Breakdown
                </h3>
                <div className="space-y-4 text-sm text-befinlit-navy/70 leading-relaxed">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Taxable Base (Freelance u/s 44ADA)</span>
                    <span className="font-bold text-befinlit-navy">{formatINR(result.fTaxable)}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Total Effective Taxable Income</span>
                    <span className="font-bold text-befinlit-navy">{formatINR(result.totalIncome)}</span>
                  </div>
                  <p className="text-xs italic pt-2">
                    Note: For revenue above ₹75L, we have applied the mandatory 80% default margin for this estimation as Presumptive Taxation (44ADA) ceases to apply.
                  </p>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-8">
              {(result.fRaw >= 2000000 || result.fRaw >= 5000000 || result.fRaw >= 7500000) && (
                <div className="bg-[#1e1e2e] border border-red-500/30 p-8 rounded-sm mb-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                  <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <AlertCircle size={16} /> Critical Implications
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-300 leading-relaxed list-disc pl-5 marker:text-red-500">
                    {result.fRaw >= 2000000 && (
                      <li>You have crossed the ₹20 Lakhs GST threshold. Obtaining a GST registration and filing returns is now mandatory.</li>
                    )}
                    {result.fRaw >= 5000000 && (
                      <li>With revenue above ₹50 Lakhs, if any part of your freelance income is received in cash (exceeding 5% threshold), a Tax Audit becomes mandatory.</li>
                    )}
                    {result.fRaw >= 7500000 && (
                      <li>Revenue has crossed ₹75 Lakhs: You can no longer opt for Section 44ADA. You must undergo a mandatory Tax Audit, and your taxable base is now calculated at 80% of revenue by default for this estimation.</li>
                    )}
                  </ul>
                </div>
              )}

              <div className="bg-befinlit-navy/5 border border-befinlit-navy/10 p-6 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <BookOpen size={32} className="text-befinlit-gold shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-befinlit-navy">Deep Dive Required?</p>
                    <p className="text-xs text-befinlit-navy/60">Learn how to structure your entity to reduce this penalty.</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('playbook')}
                  className="bg-befinlit-navy text-white text-xs font-bold px-6 py-3 rounded-sm hover:bg-befinlit-gold transition-colors uppercase tracking-widest"
                >
                  Read Moonlighter's Playbook
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setSalary('');
                    setFreelance('');
                    setEmail('');
                    setPhone('');
                    setResult(null);
                  }}
                  className="text-befinlit-navy/40 font-bold uppercase text-xs tracking-widest hover:text-befinlit-navy transition-colors border-b border-transparent hover:border-befinlit-navy pb-1"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-befinlit-navy/40 font-bold uppercase tracking-[0.2em] mb-2">Crafted by BeFinLit India Specialists</p>
        <p className="text-[10px] text-befinlit-navy/30">Usage Count: {usageCount}</p>
      </div>
    </div>
  );
};

export default SideHustleSurchargeEstimator;