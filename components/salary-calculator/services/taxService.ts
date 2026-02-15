import { UserInput, ComparisonResult, TaxResult } from '../types';

const STANDARD_DEDUCTION_NEW = 75000;
const STANDARD_DEDUCTION_OLD = 50000;
const CESS_RATE = 0.04;

// Helper to round to nearest integer
const round = (val: number) => Math.round(val);

// Helper to round to nearest 10 (Section 288A/288B)
const roundTo10 = (val: number) => {
    // Standard Income Tax rounding: Round to the nearest 10.
    // If last digit is 5 or more, round up. Else round down.
    return Math.round(val / 10) * 10;
};

/**
 * Calculates Surcharge and Surcharge Marginal Relief based on Finance Act 2025
 * Tax Payable = Min(Tax on Income + Surcharge, Tax on Threshold + (Actual Income - Threshold))
 */
const calculateSurchargeWithRelief = (baseTax: number, income: number, isNewRegime: boolean, calculateTaxFn: (inc: number) => number): { surcharge: number; marginalRelief: number } => {
    let rate = 0;
    let threshold = 0;

    // Thresholds: 50L, 1Cr, 2Cr, (5Cr for Old)
    if (!isNewRegime && income > 50000000) { threshold = 50000000; rate = 0.37; }
    else if (income > 20000000) { threshold = 20000000; rate = 0.25; }
    else if (income > 10000000) { threshold = 10000000; rate = 0.15; }
    else if (income > 5000000) { threshold = 5000000; rate = 0.10; }

    if (rate === 0) return { surcharge: 0, marginalRelief: 0 };

    const rawSurcharge = round(baseTax * rate);
    const totalTaxWithSurcharge = baseTax + rawSurcharge;

    // Calculate Tax at Threshold
    const taxAtThreshold = calculateTaxFn(threshold);
    // Surcharge at threshold is the rate of the previous bracket
    let surchargeRateAtThreshold = 0;
    if (threshold === 50000000) surchargeRateAtThreshold = 0.25;
    else if (threshold === 20000000) surchargeRateAtThreshold = 0.15;
    else if (threshold === 10000000) surchargeRateAtThreshold = 0.10;
    else if (threshold === 5000000) surchargeRateAtThreshold = 0;

    const surchargeAtThreshold = round(taxAtThreshold * surchargeRateAtThreshold);
    const limitAmount = (taxAtThreshold + surchargeAtThreshold) + (income - threshold);

    if (totalTaxWithSurcharge > limitAmount) {
        const relief = round(totalTaxWithSurcharge - limitAmount);
        return { surcharge: rawSurcharge, marginalRelief: relief };
    }

    return { surcharge: rawSurcharge, marginalRelief: 0 };
};

const calculateOldRegimeTax = (taxableIncome: number, age: number): { baseTax: number; slabs: any[] } => {
    let tax = 0;
    const slabs = [];
    let slabLimit = 250000;

    if (age >= 80) slabLimit = 500000;
    else if (age >= 60) slabLimit = 300000;

    slabs.push({ limit: `Up to ₹${slabLimit.toLocaleString('en-IN')}`, rate: '0%', amount: 0 });

    if (taxableIncome > slabLimit) {
        const taxable5 = Math.min(taxableIncome, 500000) - slabLimit;
        const amount5 = round(Math.max(0, taxable5 * 0.05));
        tax += amount5;
        slabs.push({ limit: `₹${(slabLimit / 1000).toFixed(0)}k - ₹5L`, rate: '5%', amount: amount5 });

        if (taxableIncome > 500000) {
            const taxable20 = Math.min(taxableIncome, 1000000) - 500000;
            const amount20 = round(Math.max(0, taxable20 * 0.20));
            tax += amount20;
            slabs.push({ limit: '₹5L - ₹10L', rate: '20%', amount: amount20 });
        }

        if (taxableIncome > 1000000) {
            const taxable30 = taxableIncome - 1000000;
            const amount30 = round(Math.max(0, taxable30 * 0.30));
            tax += amount30;
            slabs.push({ limit: 'Above ₹10L', rate: '30%', amount: amount30 });
        }
    }

    return { baseTax: round(tax), slabs };
};

const calculateNewRegimeTax = (taxableIncome: number): { baseTax: number; slabs: any[] } => {
    let tax = 0;
    const slabs = [];
    const brackets = [
        { limit: 400000, label: 'Up to ₹4L', rate: 0, rateStr: '0%' },
        { limit: 800000, label: '₹4L - ₹8L', rate: 0.05, rateStr: '5%' },
        { limit: 1200000, label: '₹8L - ₹12L', rate: 0.10, rateStr: '10%' },
        { limit: 1600000, label: '₹12L - ₹16L', rate: 0.15, rateStr: '15%' },
        { limit: 2000000, label: '₹16L - ₹20L', rate: 0.20, rateStr: '20%' },
        { limit: 2400000, label: '₹20L - ₹24L', rate: 0.25, rateStr: '25%' },
        { limit: Infinity, label: 'Above ₹24L', rate: 0.30, rateStr: '30%' }
    ];

    let prevLimit = 0;
    for (const bracket of brackets) {
        if (taxableIncome > prevLimit) {
            const taxableAmount = Math.min(taxableIncome, bracket.limit) - prevLimit;
            const amount = round(taxableAmount * bracket.rate);
            tax += amount;
            slabs.push({ limit: bracket.label, rate: bracket.rateStr, amount });
            prevLimit = bracket.limit;
        } else {
            break;
        }
    }

    return { baseTax: round(tax), slabs };
};

export const calculateTax = (input: UserInput): ComparisonResult => {
    const totalInterest = (input.interestSavings || 0) + (input.interestFD || 0);

    let salaryIncome = input.basicSalary + input.da + input.specialAllowance + input.leaveEncashment +
        input.joiningBonus + input.perquisites + input.hraReceived + input.ltaReceived;
    input.customAllowances.forEach(c => salaryIncome += c.value);

    let netHPIncomeOld = 0;
    if (input.isHomeLoanSelfOccupied) netHPIncomeOld = -Math.min(input.section24b, 200000);
    else netHPIncomeOld = Math.max(-200000, (input.rentalIncomeReceived * 0.7) - input.section24b);
    netHPIncomeOld = round(netHPIncomeOld);

    let netHPIncomeNew = 0;
    if (!input.isHomeLoanSelfOccupied) netHPIncomeNew = Math.max(0, (input.rentalIncomeReceived * 0.7) - input.section24b);
    netHPIncomeNew = round(netHPIncomeNew);

    const gtiOld = round(salaryIncome + netHPIncomeOld + totalInterest);
    const gtiNew = round(salaryIncome + netHPIncomeNew + totalInterest);

    const salaryForExemptions = input.basicSalary + input.da;
    const annualRent = input.rentFrequency === 'monthly' ? input.actualRentPaid * 12 : input.actualRentPaid;
    const l1HRA = Math.max(0, annualRent - (0.10 * salaryForExemptions));
    const l2HRA = (input.isMetro ? 0.50 : 0.40) * salaryForExemptions;
    const hraEx = round(Math.min(input.hraReceived, l1HRA, l2HRA));
    const ltaEx = round(Math.min(input.ltaReceived, input.ltaSpent));

    const stdOld = Math.min(salaryIncome, STANDARD_DEDUCTION_OLD);
    const stdNew = Math.min(salaryIncome, STANDARD_DEDUCTION_NEW);

    const selfLim = input.userAge >= 60 ? 50000 : 25000;
    const parentsLim = Math.max(input.fatherAge || 0, input.motherAge || 0) >= 60 ? 50000 : 25000;
    const ded80D = round(Math.min(input.section80D_SelfInsurance + Math.min(input.section80D_PreventiveCheckup, 5000), selfLim) + Math.min(input.section80D_ParentsInsurance, parentsLim));
    const ded80CCD1B = Math.min(input.section80CCD1B, 50000);

    // 80CCD(2) Logic:
    // Old Regime: 14% for Govt, 10% for Non-Govt
    // New Regime: 14% for All (as per latest Finance Act)
    // However, since we need to calculate 'deductible' amount before regime comparison, we calculate both potentials or use the input structure to derive it.
    // The previous logic was: const ded80CCD2 = round(Math.min(input.section80CCD2, 0.10 * salaryForExemptions));
    // We need to be careful here because 'baseDedsATI' uses deductions common to Old Regime primarily.
    // For the sake of 'baseDedsATI' (which feeds into Old Regime Gross), we use Old Regime logic.
    // For New Regime, we will recalculate deduction limit if needed, but standard practice explains:
    // Old Regime Deduction:
    const limit80CCD2_Old = (input.isGovtEmployee ? 0.14 : 0.10) * salaryForExemptions;
    const ded80CCD2_Old = round(Math.min(input.section80CCD2, limit80CCD2_Old));

    // New Regime Deduction: always 14%
    const limit80CCD2_New = 0.14 * salaryForExemptions;
    const ded80CCD2_New = round(Math.min(input.section80CCD2, limit80CCD2_New));

    const dedTTA_TTB = input.userAge >= 60 ? Math.min(totalInterest, 50000) : Math.min(input.interestSavings || 0, 10000);
    const ded80C = Math.min(input.section80C, 150000);
    let customDeds = 0; input.customDeductions.forEach(d => customDeds += d.value);

    // baseDedsATI is used for Old Regime specific calculations (like 80GG)
    const baseDedsATI = stdOld + input.professionalTax + ded80C + ded80D + ded80CCD1B + ded80CCD2_Old + dedTTA_TTB + input.section80E + hraEx + ltaEx + customDeds;

    let ded80GG = 0;
    let ggBreakdown = { ati: 0, limit1: 0, limit2: 0, limit3: 0, eligibleDeduction: 0 };
    if (input.hraReceived === 0 && annualRent > 0) {
        const atiGG = Math.max(0, gtiOld - baseDedsATI);
        const gl1 = 60000, gl2 = 0.25 * atiGG, gl3 = Math.max(0, annualRent - (0.10 * atiGG));
        ded80GG = round(Math.min(gl1, gl2, gl3));
        ggBreakdown = { ati: round(atiGG), limit1: round(gl1), limit2: round(gl2), limit3: round(gl3), eligibleDeduction: ded80GG };
    }

    const ati80G = Math.max(0, gtiOld - (baseDedsATI + ded80GG));
    const ql80G = 0.10 * ati80G;
    let b1 = 0, b2 = 0, b3 = 0, b4 = 0;
    (input.donationsList || []).forEach(d => {
        if (d.blockType === 1) b1 += d.amount; else if (d.blockType === 2) b2 += d.amount; else if (d.blockType === 3) b3 += d.amount; else if (d.blockType === 4) b4 += d.amount;
    });
    const r1 = b1, r2 = b2 * 0.5, b3Elig = Math.min(b3, ql80G), r3 = b3Elig, r4 = Math.min(b4, Math.max(0, ql80G - b3Elig)) * 0.5;
    const total80G = round(r1 + r2 + r3 + r4);

    const totalDeductionsOld = baseDedsATI + ded80GG + total80G;
    const unroundedNetOld = Math.max(0, gtiOld - totalDeductionsOld);
    const netOld = roundTo10(unroundedNetOld);

    const totalDeductionsNew = stdNew + ded80CCD2_New + customDeds;
    const unroundedNetNew = Math.max(0, gtiNew - totalDeductionsNew);
    const netNew = roundTo10(unroundedNetNew);

    // --- CALC OLD ---
    const oldBaseRes = calculateOldRegimeTax(netOld, input.userAge);
    const oldRebate87A = netOld <= 500000 ? oldBaseRes.baseTax : 0;
    const oldTaxAfterRebate = Math.max(0, oldBaseRes.baseTax - oldRebate87A);
    const oldSurchargeRes = calculateSurchargeWithRelief(oldTaxAfterRebate, netOld, false, (inc) => calculateOldRegimeTax(inc, input.userAge).baseTax);
    const oldFinalCess = round((oldTaxAfterRebate + oldSurchargeRes.surcharge - oldSurchargeRes.marginalRelief) * CESS_RATE);

    // --- CALC NEW ---
    const newBaseRes = calculateNewRegimeTax(netNew);
    let newRebate87A = netNew <= 1200000 ? newBaseRes.baseTax : 0;
    let newMarginalRelief87A = 0;
    if (netNew > 1200000 && netNew <= 1275000) {
        const taxVal = newBaseRes.baseTax;
        const incomeExcess = netNew - 1200000;
        if (taxVal > incomeExcess) newMarginalRelief87A = taxVal - incomeExcess;
    }
    const newTaxAfterRelief87A = Math.max(0, newBaseRes.baseTax - newRebate87A - newMarginalRelief87A);
    const newSurchargeRes = calculateSurchargeWithRelief(newTaxAfterRelief87A, netNew, true, (inc) => {
        const b = calculateNewRegimeTax(inc).baseTax;
        if (inc <= 1200000) return 0;
        if (inc <= 1275000) return Math.min(b, inc - 1200000);
        return b;
    });
    const newFinalCess = round((newTaxAfterRelief87A + newSurchargeRes.surcharge - newSurchargeRes.marginalRelief) * CESS_RATE);

    const oldTotal = roundTo10(oldTaxAfterRebate + oldSurchargeRes.surcharge - oldSurchargeRes.marginalRelief + oldFinalCess);
    const newTotal = roundTo10(newTaxAfterRelief87A + newSurchargeRes.surcharge - newSurchargeRes.marginalRelief + newFinalCess);

    return {
        oldRegime: {
            grossTotalIncome: gtiOld,
            totalDeductions: totalDeductionsOld,
            netTaxableIncome: unroundedNetOld, // Display unrounded value first
            baseTax: oldBaseRes.baseTax,
            rebate87A: oldRebate87A,
            surcharge: oldSurchargeRes.surcharge,
            marginalRelief: oldSurchargeRes.marginalRelief,
            cess: oldFinalCess,
            totalTax: oldTotal,
            effectiveRate: gtiOld > 0 ? (oldTotal / gtiOld) * 100 : 0,
            standardDeduction: stdOld,
            slabBreakdown: oldBaseRes.slabs
        },
        newRegime: {
            grossTotalIncome: gtiNew,
            totalDeductions: totalDeductionsNew,
            netTaxableIncome: unroundedNetNew, // Display unrounded value
            baseTax: newBaseRes.baseTax,
            rebate87A: newRebate87A,
            surcharge: newSurchargeRes.surcharge,
            marginalRelief: newMarginalRelief87A + newSurchargeRes.marginalRelief,
            cess: newFinalCess,
            totalTax: newTotal,
            effectiveRate: gtiNew > 0 ? (newTotal / gtiNew) * 100 : 0,
            standardDeduction: stdNew,
            slabBreakdown: newBaseRes.slabs
        },
        recommendation: newTotal <= oldTotal ? 'NEW' : 'OLD',
        savings: Math.max(0, Math.abs(newTotal - oldTotal)),
        hraBreakdown: { received: input.hraReceived, limit1: round(l1HRA), limit2: round(l2HRA), exemption: hraEx },
        ltaExemption: ltaEx,
        section80G_Breakdown: { ati: round(ati80G), ql: round(ql80G), reliefBlock1: round(r1), reliefBlock2: round(r2), reliefBlock3: round(r3), reliefBlock4: round(r4), total: total80G },
        section80GG_Breakdown: ggBreakdown,
        section80CCD_Breakdown: {
            eligible1B: ded80CCD1B,
            eligible2_Old: ded80CCD2_Old,
            eligible2_New: ded80CCD2_New
        }
    };
};
