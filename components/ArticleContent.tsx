import React, { useState } from 'react';
import { FileSearch, TrendingUp, ShieldAlert, BookOpen, User, Mail, Phone, ChevronRight, X, Check, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';

// --- Sub-components for better organization ---

const IncomeImpactCalculator = () => {
  const [salary, setSalary] = useState('');
  const [freelance, setFreelance] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [result, setResult] = useState<null | {
    taxDiff: number,
    salaryTax: number,
    combinedTax: number,
    salaryIncome: number,
    combinedIncome: number,
    freelanceRaw: number
  }>(null);

  /**
   * Refined Tax Calculation Logic following the required 5-Step structure
   */
  const calculateTaxBudget2024 = (grossIncome: number, isSalaried: boolean) => {
    // Step 1: Taxable Income (Net_Income)
    let netIncome = grossIncome;
    if (isSalaried) {
      netIncome = Math.max(0, grossIncome - 75000);
    }

    // Step 2: Slab Calculation (Progressive)
    // Slabs: 0-4L (0%), 4-8L (5%), 8-12L (10%), 12-16L (15%), 16-20L (20%), 20-24L (25%), >24L (30%)
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
    if (netIncome > 2400000) {
      baseTax += (netIncome - 2400000) * 0.30;
    }

    // Step 3: Rebate & Marginal Relief (u/s 87A)
    // If Net_Income <= 12L, Base_Tax = 0.
    // If Net_Income > 12L, Marginal Relief caps tax at (Net_Income - 12L).
    if (netIncome <= 1200000) {
      baseTax = 0;
    } else {
      const reliefCap = netIncome - 1200000;
      if (baseTax > reliefCap) {
        baseTax = reliefCap;
      }
    }

    // Step 4: Surcharge & Marginal Relief
    let surcharge = 0;
    if (netIncome > 5000000) {
      let rate = 0;
      let threshold = 5000000;
      let taxAtThreshold = 1080000; // Calculated base tax at 50L (sum of slabs: 300k + (26L * 0.3 = 780k))
      let surchargeAtThreshold = 0;

      if (netIncome > 20000000) {
        rate = 0.25; threshold = 20000000; taxAtThreshold = 5580000; surchargeAtThreshold = 837000; // 15% surcharge at 2Cr
      } else if (netIncome > 10000000) {
        rate = 0.15; threshold = 10000000; taxAtThreshold = 2580000; surchargeAtThreshold = 258000; // 10% surcharge at 1Cr
      } else {
        rate = 0.10; threshold = 5000000; taxAtThreshold = 1080000; surchargeAtThreshold = 0;
      }

      surcharge = baseTax * rate;
      const totalTaxWithSurcharge = baseTax + surcharge;
      const cap = (taxAtThreshold + surchargeAtThreshold) + (netIncome - threshold);

      if (totalTaxWithSurcharge > cap) {
        surcharge = Math.max(0, cap - baseTax);
      }
    }

    // Step 5: Final Tax
    const totalTax = (baseTax + surcharge) * 1.04; // Cess 4%
    // Round off to nearest 10
    return Math.round(totalTax / 10) * 10;
  };

  const performCalculation = () => {
    const s = parseFloat(salary.replace(/,/g, '')) || 0;
    const f = parseFloat(freelance.replace(/,/g, '')) || 0;

    // Total Income = Annual Gross salary + Freelance Revenue (presumptive taxable portion)
    const freelanceTaxableIncome = f >= 7500000 ? f * 0.8 : f * 0.5;

    const salaryTax = calculateTaxBudget2024(s, true);
    const combinedTax = calculateTaxBudget2024(s + freelanceTaxableIncome, true);

    setResult({
      salaryTax,
      combinedTax,
      taxDiff: combinedTax - salaryTax,
      salaryIncome: s,
      combinedIncome: s + freelanceTaxableIncome,
      freelanceRaw: f
    });
  };

  const handleCalculateClick = () => {
    if (!salary || !freelance) return;
    if (hasUnlocked) {
      performCalculation();
    } else {
      setShowPopup(true);
    }
  }

  // Lead Gen State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Strictly 10 digits
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  // --- CONFIGURATION ---
  // PASTE YOUR GOOGLE APPS SCRIPT WEB URL INSIDE THE QUOTES BELOW
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwNoxsLR-NxlNO1CHLsBUfvatKrUPiqLT4GkvsOxTb7T8uqaD10Qfmj5EGPenaLg3kv1Q/exec";
  // ---------------------

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to send data
  const sendDataToSheet = async (eventType: 'LEAD_GEN' | 'CALCULATION' | 'RESET', additionalData = {}) => {
    if (!GOOGLE_SHEET_URL) {
      console.warn("Google Sheet URL not set. Data not sent.");
      return;
    }

    const payload = {
      timestamp: new Date().toISOString(),
      eventType: eventType,
      name: leadName || 'N/A',
      email: leadEmail || 'N/A',
      phone: leadPhone || 'N/A',
      salaryInput: salary,
      freelanceInput: freelance,
      source: "Moonlighter's Playbook",
      ...additionalData
    };

    try {
      // mode: 'no-cors' is essential for Google Scripts to work without error in browser
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });
      console.log(`Sent ${eventType} data to sheet`);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPhoneError('');

    let isValid = true;

    if (!validateEmail(leadEmail)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!validatePhone(leadPhone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      isValid = false;
    }

    if (!isValid) return;

    setIsSubmitting(true);

    // 1. Send Lead Gen Data
    await sendDataToSheet('LEAD_GEN');

    // 2. Unlock
    setIsSubmitting(false);
    setHasUnlocked(true);
    performCalculation(); // This will trigger the first calculation
    setShowPopup(false);
  };

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const getImplications = () => {
    if (!result) return [];
    const f = result.freelanceRaw;
    const notes = [];
    if (f > 2000000) {
      notes.push("You have crossed the ₹20 Lakhs GST threshold. Obtaining a GST registration and filing returns is now mandatory.");
    }
    if (f > 5000000) {
      notes.push("With revenue above ₹50 Lakhs, if any part of your freelance income is received in cash (exceeding 5% threshold), a Tax Audit becomes mandatory.");
    }
    if (f >= 7500000) {
      notes.push("Revenue has crossed ₹75 Lakhs: You can no longer opt for Section 44ADA. You must undergo a mandatory Tax Audit, and your taxable base is now calculated at 80% of revenue by default for this estimation.");
    }
    return notes;
  };

  const implications = getImplications();

  const handleStartOver = () => {
    sendDataToSheet('RESET');
    setResult(null);
  };

  return (
    <div className="bg-befinlit-navy text-befinlit-cream p-8 rounded-sm shadow-xl my-10 relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-befinlit-gold mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          The "Success Penalty" Calculator
        </h3>
        <p className="text-sm text-white/70 mb-1 italic">
          Based on New Tax Regime rules.
        </p>
        <p className="text-[11px] text-white/50 mb-6 italic leading-relaxed">
          Note: We apply 50% presumptive rate (u/s 44ADA) on freelance revenue and follow the new tax regime by default.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-white/50 block mb-2">Annual Gross Salary (₹)</label>
            <input
              type="number"
              value={salary}
              onChange={e => setSalary(e.target.value)}
              className="w-full bg-white/10 border border-white/20 p-3 rounded-sm text-white focus:border-befinlit-gold outline-none"
              placeholder="e.g. 4200000"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-white/50 block mb-2">Freelance Revenue (₹)</label>
            <input
              type="number"
              value={freelance}
              onChange={e => setFreelance(e.target.value)}
              className="w-full bg-white/10 border border-white/20 p-3 rounded-sm text-white focus:border-befinlit-gold outline-none"
              placeholder="e.g. 2500000"
            />
          </div>
        </div>

        {!result ? (
          <button onClick={handleCalculateClick} className="w-full bg-befinlit-gold text-befinlit-navy font-bold py-3 rounded-sm hover:bg-white transition-colors">
            Calculate Impact
          </button>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 border border-white/10 rounded-sm">
                <p className="text-[10px] uppercase text-white/40 mb-1">Before Side-Hustle</p>
                <p className="text-sm font-medium text-white/80">Salary Only Tax</p>
                <p className="text-xl font-bold text-white mt-1">{formatINR(result.salaryTax)}</p>
              </div>
              <div className="bg-white/5 p-4 border border-white/10 rounded-sm">
                <p className="text-[10px] uppercase text-white/40 mb-1">With Side-Hustle</p>
                <p className="text-sm font-medium text-white/80">Combined Total Tax</p>
                <p className="text-xl font-bold text-white mt-1">{formatINR(result.combinedTax)}</p>
              </div>
              <div className="bg-befinlit-gold/20 p-4 border border-befinlit-gold/30 rounded-sm">
                <p className="text-[10px] uppercase text-befinlit-gold mb-1">Additional Liability</p>
                <p className="text-sm font-medium text-befinlit-gold">The "Success Penalty"</p>
                <p className="text-xl font-bold text-befinlit-gold mt-1">{formatINR(result.taxDiff)}</p>
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-sm border border-befinlit-gold/30">
              <div className="text-center">
                <p className="text-xs uppercase text-white/60 mb-2 font-bold">The Verdict</p>
                <p className="text-2xl font-bold text-befinlit-gold">
                  {formatINR(result.taxDiff)}
                </p>
                <p className="text-xs text-white/50 mt-2">
                  {result.taxDiff > 0
                    ? "Your side-hustle revenue is taxed at a high marginal rate due to slab jumping and reduction in available rebates."
                    : result.combinedTax === 0
                      ? "Your combined income still stays within the tax-free rebate limit (Section 87A), resulting in zero additional tax liability."
                      : "Your combined income results in no additional tax liability compared to your salary alone."}
                </p>
              </div>
            </div>

            {implications.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-sm">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-red-400 mb-2 flex items-center gap-2">
                  <AlertCircle size={14} /> Critical Implications
                </h4>
                <ul className="space-y-2">
                  {implications.map((note, i) => (
                    <li key={i} className="text-xs text-white/70 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button onClick={handleStartOver} className="text-xs text-white/40 hover:text-white underline block mx-auto">Start Over</button>
          </div>
        )}
      </div>

      {/* Lead Gen Popup */}
      {showPopup && !hasUnlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-befinlit-navy/90 backdrop-blur-sm">
          <div className="bg-befinlit-cream text-befinlit-navy p-8 rounded-sm max-w-md w-full relative shadow-2xl">
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={20} /></button>
            <h4 className="text-xl font-bold mb-2">Unlock Your Comparison Report</h4>
            <p className="text-sm text-gray-600 mb-6">We use official New Tax Regime slabs to generate your personalized tax impact report.</p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="relative">
                <User size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={leadName}
                  onChange={e => setLeadName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:border-befinlit-navy outline-none"
                />
              </div>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={leadEmail}
                  onChange={e => {
                    setLeadEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-sm outline-none focus:border-befinlit-navy ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                />
                {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
              </div>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  required
                  type="tel"
                  placeholder="Phone Number (10 digits)"
                  value={leadPhone}
                  onChange={e => {
                    // Allow only numbers
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setLeadPhone(val);
                    if (phoneError) setPhoneError('');
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-sm outline-none focus:border-befinlit-navy ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
                />
                {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-befinlit-navy text-white font-bold py-3 rounded-sm hover:bg-befinlit-lightNavy disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Unlocking..." : "Reveal Comparison"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StructureExplorer = () => {
  const [activeTab, setActiveTab] = useState('prop');

  const structures: Record<string, {
    name: string;
    content?: string;
    description?: string;
    pros?: string[];
    cons?: string[];
  }> = {
    prop: {
      name: 'Individually',
      description: 'Single individual owner, no separate legal entity.',
      pros: [
        'Lowest compliance cost',
        'Easiest setup & closure',
        'No separate tax registration (PAN based)',
        'Audit if Turnover ≥ ₹50L (cash transactions > 5%) or ₹75L'
      ],
      cons: [
        'Unlimited liability (personal assets at risk)',
        'Difficult to raise funding',
        'Taxed at individual slab rates (can hit 42%+)'
      ],
    },
    part: {
      name: 'Partnership',
      description: 'Two or more persons agreeing to share profits.',
      pros: [
        'Partners salaries & interest allowed as expense',
        'Simplified shared management',
        'Easy to draft and execute partnership deed',
        'Ease of exit - Easy',
        'Audit if Turnover ≥ ₹50L (cash transactions > 5%) or ₹75L'
      ],
      cons: [
        'Unlimited liability for all partners',
        '30% flat tax rate (expensive for low revenue)',
        'Legal risk of partner disputes'
      ],
    },
    llp: {
      name: 'LLP',
      description: 'Hybrid of partnership and corporate body.',
      pros: [
        'Limited liability protection',
        'No surcharge on tax if income < ₹1Cr',
        'Flexibility of a partnership with corporate status',
        'Ease of exit - Moderate'
      ],
      cons: [
        '30% flat tax rate',
        'Higher compliance than proprietorship/partnership',
        'Foreign funding involves more scrutiny',
        'Audit if Turnover ≥ ₹40L or Contribution ≥ ₹25L'
      ],
    },
    opc: {
      name: 'OPC',
      description: 'Company with only one member.',
      pros: [
        'Solo ownership with corporate status',
        'Limited liability protection',
        '25% corporate tax rate'
      ],
      cons: [
        'Mandatory Statutory Audit',
        'High compliance costs for a solo founder',
        'Ease of exit - Difficult',
        'Maximum Turnover limit is ₹2Cr'
      ],
    },
    pvt: {
      name: 'Pvt Ltd',
      description: 'Private company with restricted share transfers.',
      pros: [
        'Gold standard for raising external funding',
        '25% corporate tax rate',
        'Separate legal entity status'
      ],
      cons: [
        'Mandatory Statutory Audit',
        'Minimum 2 directors required',
        'Ease of exit - Difficult'
      ],
    },
    huf: {
      name: 'HUF',
      description: 'HUF',
      content: 'Hindu Undivided Family (HUF) is a separate tax entity formed by family members. Not recommended for professional side-hustles due to legal scrutiny.',
    }
  };

  const matrixRows = [
    {
      label: 'Tax rate',
      prop: { val: 'Slab Rate', type: 'gradient-rg' },
      part: { val: '30% + Cess', type: 'con' },
      llp: { val: '30% + Cess', type: 'con' },
      opc: { val: '25% + Cess', type: 'pro' },
      pvt: { val: '25% + Cess', type: 'pro' },
      huf: { val: '', type: 'huf' }
    },
    {
      label: 'Audit',
      prop: { val: 'T.O ≥ ₹50L/₹75L', type: 'pro' },
      part: { val: 'T.O ≥ ₹50L/₹75L', type: 'pro' },
      llp: { val: 'T.O ≥ ₹40L or Contribution ≥ ₹25L', type: 'con' },
      opc: { val: 'Mandatory', type: 'con' },
      pvt: { val: 'Mandatory', type: 'con' },
      huf: { val: '', type: 'huf' }
    },
    {
      label: 'Compliance',
      prop: { val: 'Low', type: 'pro' },
      part: { val: 'Medium', type: 'gradient-gr-more-g' },
      llp: { val: 'Medium/High', type: 'gradient-rg-more-r' },
      opc: { val: 'High', type: 'con' },
      pvt: { val: 'High', type: 'con' },
      huf: { val: '', type: 'huf' }
    },
    {
      label: 'Scalability',
      prop: { val: 'Low', type: 'con' },
      part: { val: 'Medium', type: 'gradient-rg-equal' },
      llp: { val: 'High', type: 'pro' },
      opc: { val: 'Medium', type: 'gradient-rg-equal' },
      pvt: { val: 'High', type: 'pro' },
      huf: { val: '', type: 'huf' }
    },
    {
      label: 'Taking Money Out',
      prop: { val: 'Easy', type: 'pro' },
      part: { val: 'Easy', type: 'pro' },
      llp: { val: 'Easy', type: 'pro' },
      opc: { val: 'Difficult', type: 'con' },
      pvt: { val: 'Difficult', type: 'con' },
      huf: { val: '', type: 'huf' }
    },
    {
      label: 'Liability',
      prop: { val: 'Unlimited', type: 'con' },
      part: { val: 'Unlimited', type: 'con' },
      llp: { val: 'Limited', type: 'pro' },
      opc: { val: 'Limited', type: 'pro' },
      pvt: { val: 'Limited', type: 'pro' },
      huf: { val: '', type: 'huf' }
    },
    {
      label: 'Deemed Dividend',
      prop: { val: 'N/A', type: 'pro' },
      part: { val: 'N/A', type: 'pro' },
      llp: { val: 'N/A', type: 'pro' },
      opc: { val: 'Applicable', type: 'con' },
      pvt: { val: 'Applicable', type: 'con' },
      huf: { val: '', type: 'huf' }
    },
  ];

  const getCellBg = (type: string) => {
    switch (type) {
      case 'pro': return 'bg-green-100/60';
      case 'con': return 'bg-red-100/60';
      case 'gradient-rg': return 'bg-gradient-to-r from-green-100/60 to-red-100/60';
      case 'gradient-gr-more-g': return 'bg-gradient-to-r from-green-200/60 via-green-100/60 to-red-100/20';
      case 'gradient-rg-more-r': return 'bg-gradient-to-r from-green-100/20 via-red-100/60 to-red-200/60';
      case 'gradient-rg-equal': return 'bg-gradient-to-r from-red-100/60 to-green-100/60';
      case 'huf': return 'bg-gray-100/30';
      default: return '';
    }
  };

  return (
    <div className="my-10 space-y-12">
      {/* Tabbed Section */}
      <div className="border border-gray-200 rounded-sm shadow-sm bg-white overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-200">
          {Object.entries(structures).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-3 text-sm font-medium transition-colors flex-grow md:flex-grow-0 ${activeTab === key
                ? 'bg-befinlit-navy text-white'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              {data.name}
            </button>
          ))}
        </div>

        <div className="p-8 relative min-h-[250px]">
          {activeTab === 'huf' && (
            <div className="absolute inset-0 bg-red-50/90 z-10 flex flex-col items-center justify-center text-center p-6 backdrop-blur-[1px]">
              <XCircle size={64} className="text-red-500 mb-4" />
              <h4 className="text-2xl font-bold text-red-800 mb-2">Not Recommended for Freelancers</h4>
              <p className="text-red-700 max-w-lg">
                Using an HUF for professional income is aggressively litigated. Unless you have independent employees and physical infrastructure, this income is often clubbed with your personal salary.
              </p>
            </div>
          )}

          <div className={`${activeTab === 'huf' ? 'opacity-20 blur-sm' : ''}`}>
            <h3 className="text-2xl font-bold text-befinlit-navy mb-2">{structures[activeTab].name}</h3>
            <p className="text-sm text-gray-500 mb-6 italic">{structures[activeTab].description}</p>

            {structures[activeTab].pros ? (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-green-600 mb-4 flex items-center gap-2">
                    <Check size={14} /> Pros
                  </h4>
                  <ul className="space-y-3">
                    {structures[activeTab].pros?.map((pro, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-red-600 mb-4 flex items-center gap-2">
                    <X size={14} /> Cons
                  </h4>
                  <ul className="space-y-3">
                    {structures[activeTab].cons?.map((con, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">{structures[activeTab].content}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overall Comparison Section */}
      <div className="border border-gray-200 rounded-sm shadow-sm bg-white overflow-hidden">
        <div className="bg-befinlit-navy p-6 text-white">
          <h3 className="text-xl font-bold">Overall Entity Comparison</h3>
          <p className="text-xs text-white/60 uppercase tracking-widest mt-1">Cross-Functional Matrix</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 border font-bold text-befinlit-navy w-40">Organisation</th>
                <th className="p-4 border text-center">
                  <div className="font-bold">Individually</div>
                  <div className="text-[10px] text-gray-400 font-normal mt-1 leading-tight">Solo owner, no legal separate identity.</div>
                </th>
                <th className="p-4 border text-center">
                  <div className="font-bold">Partnership</div>
                  <div className="text-[10px] text-gray-400 font-normal mt-1 leading-tight">Shared ownership between members.</div>
                </th>
                <th className="p-4 border text-center">
                  <div className="font-bold">LLP</div>
                  <div className="text-[10px] text-gray-400 font-normal mt-1 leading-tight">Limited liability with firm flexibility.</div>
                </th>
                <th className="p-4 border text-center">
                  <div className="font-bold">OPC</div>
                  <div className="text-[10px] text-gray-400 font-normal mt-1 leading-tight">One person corporate entity.</div>
                </th>
                <th className="p-4 border text-center">
                  <div className="font-bold">Pvt Ltd</div>
                  <div className="text-[10px] text-gray-400 font-normal mt-1 leading-tight">Standard corporate entity for growth.</div>
                </th>
                <th className="p-4 border text-center bg-red-50 relative overflow-hidden group">
                  <div className="font-bold text-red-800">HUF</div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <X size={80} className="text-red-500 stroke-[4]" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {matrixRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="p-4 border font-bold text-befinlit-navy bg-gray-50/50">{row.label}</td>
                  <td className={`p-4 border text-center font-medium ${getCellBg(row.prop.type)}`}>{row.prop.val}</td>
                  <td className={`p-4 border text-center font-medium ${getCellBg(row.part.type)}`}>{row.part.val}</td>
                  <td className={`p-4 border text-center font-medium ${getCellBg(row.llp.type)}`}>{row.llp.val}</td>
                  <td className={`p-4 border text-center font-medium ${getCellBg(row.opc.type)}`}>{row.opc.val}</td>
                  <td className={`p-4 border text-center font-medium ${getCellBg(row.pvt.type)}`}>{row.pvt.val}</td>
                  <td className={`p-4 border text-center relative ${getCellBg(row.huf.type)}`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                      <X size={24} className="text-red-500" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface EntityTaxEstimatorProps {
  onOpenConsultation?: () => void;
}

const EntityTaxEstimator: React.FC<EntityTaxEstimatorProps> = ({ onOpenConsultation }) => {
  return (
    <div className="bg-befinlit-cream border border-befinlit-gold/30 p-8 rounded-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold text-befinlit-navy mb-2">Compare Entity Tax Liabilities</h4>
          <p className="text-sm text-befinlit-navy/70 max-w-4xl">
            Want to see exactly how much tax you save in an individually owned business vs other business organisations for your specific income? We have a comprehensive model. Reach out to us over email. <br /><br />
            <button
              onClick={onOpenConsultation}
              className="mt-4 inline-block bg-befinlit-navy text-befinlit-cream px-6 py-3 rounded-sm font-bold hover:bg-befinlit-gold hover:text-befinlit-navy transition-all shadow-md">
              Schedule a paid Consultation
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main Article Content ---

interface Props {
  onNavigate?: (page: any) => void;
  onOpenConsultation?: () => void;
}

const ArticleContent: React.FC<Props> = ({ onNavigate, onOpenConsultation }) => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <article className="max-w-6xl mx-auto px-6 pt-48 pb-12">
      <div className="relative flex items-center justify-center mb-6">
        {onNavigate && (
          <button
            onClick={() => onNavigate('playbooks')}
            className="absolute left-0 flex items-center gap-2 text-befinlit-navy/40 hover:text-befinlit-navy transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Playbooks
          </button>
        )}
        <span className="inline-block py-1 px-3 border border-befinlit-navy/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-befinlit-navy">
          Tax knowledge
        </span>
      </div>

      {/* Header */}
      <header className="text-center mb-16 border-b border-befinlit-navy/10 pb-12">


        <h1 className="text-3xl md:text-5xl font-bold font-serif text-befinlit-navy leading-tight mb-6">
          The Moonlighter’s Playbook: How to Side-Hustle Without Getting into Trouble
        </h1>
        <p className="text-lg md:text-xl text-befinlit-navy/70 italic font-serif leading-relaxed max-w-2xl mx-auto">
          The side-hustle is the new startup. But while moonlighting isn't technically illegal in India, it is definitely frowned upon. Here is the playbook to navigating the grey.
        </p>
      </header>

      {/* Intro */}
      <div className="prose prose-lg prose-slate font-serif mx-auto text-befinlit-navy/80 mb-16">
        <p>
          The remote work boom has blurred the lines between the 9-to-5 and the 5-to-9. Platforms like Upwork have democratized access to global capital. But distinguishing between what you <em>can</em> do and what you <em>should</em> do is where the taxman comes in.
        </p>
        <div className="bg-white p-6 border-l-4 border-befinlit-navy shadow-sm mt-10">
          <h4 className="font-bold text-befinlit-navy mb-2">The Reality Check</h4>
          <p className="text-sm italic">
            The Indian tax ecosystem is quieter than ever, but it watches everything. The days of "cash under the table" are dead. The system is silent, but it never forgets.
          </p>
        </div>
      </div>

      {/* The Initial Start */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-befinlit-navy mb-6 flex items-center gap-3">
          <FileSearch className="text-befinlit-gold" />
          The Initial Start: Testing the Waters
        </h2>
        <div className="bg-white p-6 rounded-sm shadow-sm space-y-4">
          <p className="text-befinlit-navy/80 text-sm leading-relaxed">
            Most journeys start with confusion. You get a gig, you give your PAN, and you get paid. You think no one notices because it's "just a small amount."
          </p>
          <ul className="list-disc pl-5 space-y-3 text-befinlit-navy/70 text-sm">
            <li><strong>26AS & AIS:</strong> This is your financial horoscope. Every time a client deducts TDS, it hits this ledger. Employers doing background checks don't need a detective; they just need access to your AIS.</li>
            <li><strong>The GST-PAN Link:</strong> GST is legally linked to your PAN. Since the GST portal is public, anyone with access to your PAN can easily verify if you have an active GST registration. Companies frequently use this during background checks (BGV) to identify side-hustles that may not have been disclosed.</li>
          </ul>
        </div>
      </section>

      {/* Growth Phase & Calculator */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-befinlit-navy mb-6 flex items-center gap-3">
          <TrendingUp className="text-befinlit-gold" />
          The Growth Phase: When the Same PAN Hurts
        </h2>
        <p className="text-befinlit-navy/80 mb-6 text-sm leading-relaxed">
          As you scale, you hit the "Surcharge Trap". Your side income is added to your salary, often pushing you into the 10% or 15% surcharge brackets. Suddenly, your effective tax rate isn't 30%—it's 42%+.
        </p>

        {/* Interactive Income Impact Calculator */}
        <IncomeImpactCalculator />
      </section>

      {/* The Next Common Step */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-befinlit-navy mb-6 flex items-center gap-3">
          <ShieldAlert className="text-befinlit-gold" />
          The Next Common Step: "The Indian Jugaad"
        </h2>
        <div className="bg-befinlit-cream p-8 border border-befinlit-navy/10 rounded-sm">
          <h3 className="font-bold text-befinlit-navy text-lg mb-4">"I'll just bill it in my Mom's name."</h3>
          <p className="text-sm text-befinlit-navy/70 leading-relaxed mb-4">
            It sounds genius. She has no income, so you use her basic exemption limit. But here is the risk that nobody talks about.
          </p>
          <div className="bg-red-50 p-4 rounded-sm border border-red-100 space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-700 shrink-0 mt-1" size={18} />
              <div className="text-sm text-red-800">
                <p className="font-bold mb-1">The Internal Auditor Block</p>
                <p>
                  Most corporate clients (especially MNCs) have strict internal audit rules. They cannot pay "Mrs. Sharma (Homemaker)" for "Python Development Services". It flags as a vendor discrepancy or potential money laundering.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-700 shrink-0 mt-1" size={18} />
              <div className="text-sm text-red-800">
                <p className="font-bold mb-1">No Long-term Sustainability</p>
                <p>
                  This approach is not sustainable for a long term plan where you do not show your personal income increasing over the years. Therefore, in the long run if you require income proof for any loans, visas, insurance, or credit cards - it will be extremely bothersome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structuring Your Hustle */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-befinlit-navy mb-6 flex items-center gap-3">
          <BookOpen className="text-befinlit-gold" />
          Structuring Your Hustle
        </h2>
        <p className="text-sm text-befinlit-navy/70 mb-6">
          Click on the tabs below to understand which vehicle suits your journey.
        </p>

        {/* Structure Tabs Component */}
        <StructureExplorer />
      </section>

      {/* 44AD vs ADA Nuance */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-befinlit-navy mb-6 flex items-center gap-3">
          <ShieldAlert className="text-befinlit-gold" />
          The 44AD vs 44ADA "Grey Area"
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-befinlit-navy/80 mb-4 text-sm leading-relaxed">
              Many freelancers file under 44AD (declaring 6%/8% profit) because it's cheaper than 44ADA (50% profit).
            </p>
            <p className="text-befinlit-navy/80 mb-4 text-sm leading-relaxed font-bold">
              Is it wrong? Technically, no. Is it safe? Absolutely not.
            </p>
            <p className="text-befinlit-navy/70 text-xs leading-relaxed">
              If your TDS is deducted under 194J (Technical / Professional Services), claiming to be a "trader" under 44AD invites the officer to ask you to prove you <em>don't</em> fall under the notified professional list. That is a litigation battle you want to avoid.
            </p>
          </div>
          <div className="bg-befinlit-navy text-white p-6 rounded-sm text-center">
            <p className="font-serif italic text-lg mb-4">"Compliance is expensive. Non-compliance is unaffordable."</p>
          </div>
        </div>
      </section>

      {/* Final Lead Gen / Entity Estimator */}
      <section className="mb-12">
        <EntityTaxEstimator onOpenConsultation={onOpenConsultation} />
      </section>

      {/* Contact Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-befinlit-navy/90 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-sm max-sm w-full relative text-center">
            <button onClick={() => setShowHelpModal(false)} className="absolute top-4 right-4 text-gray-400"><X size={20} /></button>
            <Mail size={48} className="text-befinlit-gold mx-auto mb-4" />
            <h3 className="text-xl font-bold text-befinlit-navy mb-2">Let's Discuss</h3>
            <p className="text-gray-600 text-sm mb-6">
              Every case is unique. Drop us a line and we'll help you structure this right.
            </p>
            <a href="mailto:befinlitindia@gmail.com" className="block w-full bg-befinlit-navy text-white font-bold py-3 rounded-sm hover:bg-befinlit-lightNavy">
              befinlitindia@gmail.com
            </a>
          </div>
        </div>
      )}

    </article>
  );
};

export default ArticleContent;