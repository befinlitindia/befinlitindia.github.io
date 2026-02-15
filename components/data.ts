import { MOONLIGHTER_PLAYBOOK_DESCRIPTION, SALARY_TAX_CALCULATOR_DESCRIPTION, SUCCESS_PENALTY_CALCULATOR_DESCRIPTION } from './content';

export interface ResourceItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    tag: string;
    type: 'playbook' | 'tool';
    readTime?: string; // Specific to playbooks
    status?: string;   // Specific to tools
    linkText?: string; // Custom text for the button
}

export const playbooksList: ResourceItem[] = [
    {
        id: 'playbook',
        title: "The Moonlighter's Playbook",
        subtitle: "How to Side-Hustle Without Getting into Trouble",
        description: MOONLIGHTER_PLAYBOOK_DESCRIPTION,
        tag: "Freelance 101",
        readTime: "12 min read",
        type: 'playbook',
        linkText: 'Read Playbook'
    },
    {
        id: 'financial-guide',
        title: "The Freelancer's and Professional's Playbook",
        subtitle: "Navigate through all the compliances in one place.",
        description: "A master blueprint covering Income Tax Act 2025, Withholding Taxes, GST for exporters, Foreign Exchange Management Act (FEMA) and RBI guidelines for the professionals and freelancers.",
        tag: "Freelance 101",
        readTime: "15 min read",
        type: 'playbook',
        linkText: 'Read Playbook'
    }
];

export const toolsList: ResourceItem[] = [
    {
        id: 'salary-calculator',
        title: "The Salary Tax Calculator",
        subtitle: "New Regime vs Old Regime Showdown",
        description: SALARY_TAX_CALCULATOR_DESCRIPTION,
        tag: "Calculator",
        status: "Ready",
        type: 'tool',
        linkText: 'Launch Tool'
    },
    {
        id: 'side-hustle-estimator',
        title: "The Side-Hustle Tax Realizer",
        subtitle: "The Success Penalty Calculator",
        description: SUCCESS_PENALTY_CALCULATOR_DESCRIPTION,
        tag: "Freelance 101",
        status: "Ready",
        type: 'tool',
        linkText: 'Launch Tool'
    }
];

export const getAllResources = () => [...playbooksList, ...toolsList];

export const getResourcesByTag = (tag: string) => {
    return getAllResources().filter(item => item.tag === tag);
};

export const getUniqueTags = () => {
    const tags = new Set(getAllResources().map(item => item.tag));
    return Array.from(tags);
};
