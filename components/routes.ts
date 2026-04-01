/**
 * Centralized route configuration.
 * Maps old page IDs to new URL paths.
 */

export const ROUTES: Record<string, string> = {
    'home': '/',
    'about': '/about',
    'playbooks': '/playbooks',
    'playbook': '/playbook/moonlighters-playbook',
    'tools': '/tools',
    'salary-calculator': '/tools/salary-calculator',
    'side-hustle-estimator': '/tools/side-hustle-estimator',
    'financial-guide': '/playbook/freelancers-professionals-playbook',
    'glossary': '/glossary',
    'glossary-changes': '/glossary/changes',
};

/**
 * Converts an old page ID (e.g. 'about') to the new URL path (e.g. '/about').
 * For topic pages, generates a slug from the topic name.
 */
export const getRoutePath = (pageId: string, topic?: string): string => {
    if (pageId === 'topic' && topic) {
        return `/topic/${encodeURIComponent(topic.toLowerCase().replace(/\s+/g, '-'))}`;
    }
    if (pageId === 'glossary-changes' && topic) {
        return `/glossary/changes?highlight=${encodeURIComponent(topic)}`;
    }
    return ROUTES[pageId] || '/';
};
