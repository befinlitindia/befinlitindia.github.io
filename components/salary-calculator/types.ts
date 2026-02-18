export interface CustomComponent {
    id: string;
    name: string;
    value: number;
}

export interface DonationItem {
    id: string;
    fundName: string;
    amount: number;
    blockType: 1 | 2 | 3 | 4;
}

export interface UserInput {
    userAge: number;
    fatherAge?: number;
    motherAge?: number;
    isMetro: boolean;
    isGovtEmployee: boolean;

    // --- Block 1: Fixed Taxable Components ---
    basicSalary: number;
    da: number;
    specialAllowance: number;
    leaveEncashment: number;
    joiningBonus: number;
    perquisites: number;
    customAllowances: CustomComponent[];

    // --- Block 2: Partially Exempted Particulars ---
    hraReceived: number;
    actualRentPaid: number;
    rentFrequency: 'monthly' | 'annual';
    ltaReceived: number;
    ltaSpent: number;
    customExemptions: CustomComponent[];

    // --- Block 3: Deductions & Statutory Items ---
    professionalTax: number;
    entertainmentAllowance: number;
    section80C: number;

    // Section 80CCD
    section80CCD1B: number;
    section80CCD2: number;

    // Section 80D Granular
    section80D_SelfInsurance: number;
    section80D_ParentsInsurance: number;
    section80D_PreventiveCheckup: number;

    section80D_Self: number;
    section80D_Parents: number;

    section80E: number;
    section24b: number;
    interestSavings: number;
    interestFD: number;
    rentalIncomeReceived: number;
    isHomeLoanSelfOccupied: boolean;
    section80GG: number;
    section80G: number;
    donationsList: DonationItem[];
    customDeductions: CustomComponent[];
}

export interface TaxResult {
    grossTotalIncome: number;
    totalDeductions: number;
    netTaxableIncome: number;
    baseTax: number;
    rebate87A: number;
    surcharge: number;
    marginalRelief: number;
    cess: number;
    totalTax: number;
    effectiveRate: number;
    standardDeduction: number;
    slabBreakdown: { limit: string; rate: string; amount: number }[];
}

export type Regime = 'OLD' | 'NEW';

export interface ComparisonResult {
    oldRegime: TaxResult;
    newRegime: TaxResult;
    recommendation: Regime;
    savings: number;
    hraBreakdown: {
        received: number;
        limit1: number;
        limit2: number;
        exemption: number;
    };
    ltaExemption: number;
    section80G_Breakdown: {
        ati: number;
        ql: number;
        reliefBlock1: number;
        reliefBlock2: number;
        reliefBlock3: number;
        reliefBlock4: number;
        total: number;
    };
    section80GG_Breakdown: {
        ati: number;
        limit1: number;
        limit2: number;
        limit3: number;
        eligibleDeduction: number;
    };
    section80CCD_Breakdown: {
        eligible1B: number;
        eligible2_Old: number;
        eligible2_New: number;
    };
}

export type TaxDetails = UserInput;

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
    isError?: boolean;
}
