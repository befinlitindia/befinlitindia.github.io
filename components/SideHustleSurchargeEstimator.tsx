import React, { useState } from 'react';
import { TrendingUp, AlertCircle, Info, ArrowLeft, BookOpen, Calculator, Landmark } from 'lucide-react';

interface Props {
  onNavigate: (page: any) => void;
}

const SideHustleSurchargeEstimator: React.FC<Props> = ({ onNavigate }) => {
  const [salary, setSalary] = useState('');
  const [freelance, setFreelance] = useState('');
  const [result, setResult] = useState<null | any>(null);

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

    return Math.round(((baseTax + surcharge) * 1.04) / 10) * 10;
  };

  const performCalculation = () => {
    const s = parseFloat(salary) || 0;
    const f = parseFloat(freelance) || 0;
    const freelanceTaxable = f >= 7500000 ? f * 0.8 : f * 0.5;

    const sTax = calculateTax(s, true);
    const combinedTax = calculateTax(s + freelanceTaxable, true);

    const calcResult = {
      sTax,
      combinedTax,
      diff: Math.max(0, combinedTax - sTax),
      fRaw: f,
      fTaxable: freelanceTaxable,
      totalIncome: s + freelanceTaxable
    };

    setResult(calcResult);
  };

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="animate-fade-in pt-48 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="relative flex flex-col md:flex-row items-center justify-center mb-6 gap-4 md:gap-0">
        <div className="md:absolute md:left-0">
          <button
            onClick={() => onNavigate('tools')}
            className="flex items-center gap-2 text-befinlit-navy/40 hover:text-befinlit-navy transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Toolkits
          </button>
        </div>
        <span className="inline-block py-1 px-3 border border-befinlit-navy/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-befinlit-navy">
          Freelance 101
        </span>
      </div>

      <header className="text-center mb-16 border-b border-befinlit-navy/10 pb-12">
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-befinlit-navy leading-tight mb-6">
          The Side-Hustle Tax Realizer
        </h1>
        <p className="text-lg md:text-xl text-befinlit-navy/70 italic font-serif leading-relaxed max-w-2xl mx-auto">
          Side-hustles are taxed at your highest marginal rate because they sit "on top" of your salary. This tool calculates the exact tax impact of adding freelance revenue to your income.
        </p>
      </header>

      <div className="bg-befinlit-navy text-befinlit-cream border border-befinlit-gold/20 rounded-sm shadow-2xl overflow-hidden mb-12">
        <div className="p-8">
          <p className="text-sm text-white/70 mb-1 italic">
            Based on New Tax Regime rules.
          </p>
          <p className="text-[11px] text-white/50 mb-6 italic leading-relaxed">
            Note: We apply 50% presumptive rate (u/s 44ADA<sup>*</sup>) on freelance revenue and follow the new tax regime by default.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50">Annual Gross Salary (₹)</label>
              <input
                type="number"
                value={salary}
                onChange={e => setSalary(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-sm outline-none focus:border-befinlit-gold transition-colors text-lg text-white"
                placeholder="e.g. 4200000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50">Freelance Revenue (₹)</label>
              <input
                type="number"
                value={freelance}
                onChange={e => setFreelance(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-sm outline-none focus:border-befinlit-gold transition-colors text-lg text-white"
                placeholder="e.g. 2500000"
              />
            </div>
          </div>


          <button
            onClick={performCalculation}
            className="w-full bg-befinlit-gold text-befinlit-navy font-bold py-4 rounded-sm hover:bg-white transition-all text-sm shadow-lg"
          >
            {result ? "Recalculate Results" : "Calculate Tax Leakage"}
          </button>

          {result && (
            <div className="mt-12 space-y-8 animate-fade-in text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 border border-white/10 rounded-sm">
                  <p className="text-[10px] text-white/40 mb-1">Before Side-Hustle</p>
                  <p className="text-sm font-medium text-white/80">Salary Only Tax</p>
                  <p className="text-xl font-bold text-white mt-1">{formatINR(result.sTax)}</p>
                </div>
                <div className="bg-white/5 p-4 border border-white/10 rounded-sm">
                  <p className="text-[10px] text-white/40 mb-1">With Side-Hustle</p>
                  <p className="text-sm font-medium text-white/80">Combined Total Tax</p>
                  <p className="text-xl font-bold text-white mt-1">{formatINR(result.combinedTax)}</p>
                </div>
                <div className="bg-befinlit-gold/20 p-4 border border-befinlit-gold/30 rounded-sm">
                  <p className="text-[10px] text-befinlit-gold mb-1">Additional Liability</p>
                  <p className="text-sm font-medium text-befinlit-gold">The "Success Penalty"</p>
                  <p className="text-xl font-bold text-befinlit-gold mt-1">{formatINR(result.diff)}</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Info size={20} className="text-befinlit-gold" />
                  Detailed Breakdown
                </h3>
                <div className="space-y-4 text-sm text-white/70 leading-relaxed">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Taxable Base {result.fRaw < 7500000 && <>(u/s 44ADA<sup>*</sup>)</>}</span>
                    <span className="font-bold text-white">{formatINR(result.fTaxable)}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Total Effective Taxable Income</span>
                    <span className="font-bold text-white">{formatINR(result.totalIncome)}</span>
                  </div>
                  {result.fRaw >= 7500000 && (
                    <p className="text-[11px] italic pt-2 text-white/40">
                      Note: For revenue above ₹75L, we have applied an approx. 80% default margin for this estimation as Presumptive Taxation (44ADA<sup>*</sup>) ceases to apply.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-8">
              {(result.fRaw >= 2000000 || result.fRaw >= 5000000 || result.fRaw >= 7500000) && (
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-sm mb-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                  <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2 text-xs">
                    <AlertCircle size={16} /> Critical Implications
                  </h3>
                  <ul className="space-y-2 text-sm text-white/70 leading-relaxed list-disc pl-5 marker:text-red-500 text-left">
                    {result.fRaw >= 2000000 && (
                      <li>You have crossed the ₹20 Lakhs GST threshold. Obtaining a GST registration and filing returns is now mandatory.</li>
                    )}
                    {result.fRaw >= 5000000 && (
                      <li>With revenue above ₹50 Lakhs, if any part of your freelance income is received in cash (exceeding 5% threshold), a Tax Audit becomes mandatory.</li>
                    )}
                    {result.fRaw >= 7500000 && (
                      <li>Revenue has crossed ₹75 Lakhs: You can no longer opt for Section 44ADA<sup>*</sup>. You must undergo a mandatory Tax Audit, and your taxable base is now calculated at 80% of revenue by default for this estimation.</li>
                    )}
                  </ul>
                </div>
              )}

              <div className="bg-white/5 border border-white/10 p-6 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-8 text-left">
                <div className="flex items-center gap-4">
                  <BookOpen size={32} className="text-befinlit-gold shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-white">Deep Dive Required?</p>
                    <p className="text-xs text-white/50">Learn how to structure your entity to reduce this penalty.</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('playbook')}
                  className="w-full bg-befinlit-gold text-befinlit-navy text-xs font-bold px-6 py-4 rounded-sm hover:bg-white transition-colors"
                >
                  Read Moonlighter's Playbook
                </button>
              </div>

              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => {
                    setSalary('');
                    setFreelance('');
                    setResult(null);
                  }}
                  className="text-white/20 hover:text-red-400 transition-colors text-[10px]"
                >
                  Reset All Fields
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="mb-16 border-t border-befinlit-navy/10 pt-12 print:hidden">
        <h2 className="text-2xl font-bold text-befinlit-navy mb-6 flex items-center gap-2 font-serif">
          <span className="text-befinlit-gold">*</span> Glossary of Changes
        </h2>
        <p className="text-sm text-befinlit-navy/70 mb-8 leading-relaxed italic font-serif text-center md:text-left">
          The above sections and forms are in line with the Income Tax Act, 1961. However, the Income Tax Act, 2025 will come into effect from 1 April 2026. The relevant sections and the content changes have been updated below:
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
            </tbody>
          </table>
        </div>
      </section>

      <div className="text-center">
        <p className="text-xs text-befinlit-navy/40 font-bold mb-2">Crafted by BeFinLit India Specialists</p>
      </div>
    </div>
  );
};

export default SideHustleSurchargeEstimator;