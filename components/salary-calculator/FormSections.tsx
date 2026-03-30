import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Plus, Trash2, ChevronDown, Check, AlertTriangle } from 'lucide-react';
import { CustomComponent } from './types';
import { preventNonNumericInput } from '../utils';

/* ------------------------------------------------------------------ */
/*  AccordionSection                                                   */
/* ------------------------------------------------------------------ */
interface AccordionSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    delay?: number;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({ title, description, children, defaultOpen = false, delay = 0 }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState<string>(defaultOpen ? 'none' : '0px');

    useEffect(() => {
        if (isOpen) {
            // Set to scrollHeight first, then switch to 'none' for dynamic content
            const el = contentRef.current;
            if (el) {
                setMaxHeight(`${el.scrollHeight}px`);
                const timer = setTimeout(() => setMaxHeight('none'), 500);
                return () => clearTimeout(timer);
            }
        } else {
            // Collapse: first set explicit height, then to 0
            const el = contentRef.current;
            if (el) {
                setMaxHeight(`${el.scrollHeight}px`);
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setMaxHeight('0px');
                    });
                });
            }
        }
    }, [isOpen]);

    return (
        <div
            className="bg-white rounded-sm shadow-sm border-t border-slate-100 hover:shadow-xl transition-all duration-500 animate-in slide-in-from-bottom-8 fade-in"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Clickable Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-8 text-left group cursor-pointer"
            >
                <div>
                    <h3 className="text-lg font-bold font-serif text-befinlit-navy mb-1 group-hover:text-befinlit-navy/80 transition-colors">{title}</h3>
                    <p className="text-xs text-slate-500 font-medium italic opacity-80">{description}</p>
                </div>
                <div className={`ml-4 shrink-0 w-8 h-8 rounded-full bg-slate-100 group-hover:bg-befinlit-navy/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-befinlit-navy" />
                </div>
            </button>

            {/* Collapsible Content */}
            <div
                ref={contentRef}
                className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                style={{ maxHeight }}
            >
                <div className="px-8 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Legacy Section (kept for backward compatibility)                   */
/* ------------------------------------------------------------------ */
interface SectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
    delay?: number;
}

export const Section: React.FC<SectionProps> = ({ title, description, children, delay = 0 }) => (
    <div
        className="bg-white rounded-sm p-8 shadow-sm border-t border-slate-100 hover:shadow-xl transition-all duration-500 animate-in slide-in-from-bottom-8 fade-in"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="mb-10">
            <h3 className="text-lg font-bold font-serif text-befinlit-navy mb-4">{title}</h3>
            <p className="text-xs text-slate-500 font-medium italic opacity-80">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children}
        </div>
    </div>
);

/* ------------------------------------------------------------------ */
/*  LimitProgressBar – reusable progress bar + limit hints             */
/* ------------------------------------------------------------------ */
interface LimitProgressBarProps {
    value: number;
    maxLimit: number;
}

const LimitProgressBar: React.FC<LimitProgressBarProps> = ({ value, maxLimit }) => {
    const percentage = Math.min(100, (value / maxLimit) * 100);
    const isApproaching = percentage >= 80 && percentage < 100;
    const isMaxed = percentage >= 100;

    const barColor = isMaxed
        ? 'bg-green-500'
        : isApproaching
            ? 'bg-amber-500'
            : 'bg-slate-300';

    const formatINR = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

    return (
        <div className="mt-2 space-y-1">
            {/* Progress Bar */}
            <div className="w-full h-[3px] bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Usage Label */}
            <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-400 tabular-nums">
                    {formatINR(Math.min(value, maxLimit))} / {formatINR(maxLimit)}
                </span>

                {/* Limit Hint with animation */}
                {isMaxed && (
                    <span className="text-[9px] font-bold text-green-600 flex items-center gap-1 animate-in fade-in slide-in-from-bottom-1 duration-300">
                        <Check className="w-3 h-3" /> Max limit reached!
                    </span>
                )}
                {isApproaching && !isMaxed && (
                    <span className="text-[9px] font-bold text-amber-600 flex items-center gap-1 animate-in fade-in slide-in-from-bottom-1 duration-300">
                        <AlertTriangle className="w-3 h-3" /> Limit approaching
                    </span>
                )}
            </div>
        </div>
    );
};


/* ------------------------------------------------------------------ */
/*  InputField                                                         */
/* ------------------------------------------------------------------ */
interface InputFieldProps {
    label: string;
    name: string;
    value: number;
    onChange: (name: any, value: any) => void;
    tooltip?: string;
    helpText?: string;
    showCurrency?: boolean;
    warning?: string;
    maxLimit?: number;
}

export const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, tooltip, helpText, showCurrency = true, warning, maxLimit }) => (
    <div className="relative group">
        <label className="block text-sm font-bold text-slate-700 mb-2.5 flex items-center gap-1.5 transition-colors group-hover:text-[#000a2e]">
            {label}
            {tooltip && (
                <div className="group/tooltip relative">
                    <HelpCircle className="w-3 h-3 text-slate-300 cursor-help hover:text-[#000a2e] transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 p-3 bg-[#000a2e] text-white text-[10px] rounded-sm opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 font-normal shadow-2xl leading-relaxed">
                        {tooltip}
                    </div>
                </div>
            )}
        </label>
        <div className="relative">
            {showCurrency && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs group-focus-within:text-[#000a2e]">₹</span>}
            <input
                type="number"
                onKeyDown={preventNonNumericInput}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                value={value === 0 ? '' : value}
                onChange={(e) => onChange(name, parseFloat(e.target.value) || 0)}
                className={`w-full ${showCurrency ? 'pl-8' : 'pl-3'} pr-3 py-2 bg-slate-50 border ${warning ? 'border-amber-400' : 'border-slate-200'} rounded-sm text-sm text-[#000a2e] font-bold focus:outline-none focus:ring-1 ${warning ? 'focus:ring-amber-500' : 'focus:ring-[#000a2e]'} focus:bg-white transition-all hover:border-slate-300 placeholder-slate-300`}
                placeholder="0"
            />
        </div>
        {warning && <p className="text-[10px] text-amber-600 mt-1 font-bold flex items-center gap-1">⚠️ {warning}</p>}
        {helpText && <p className="text-[10px] text-slate-400 mt-2 font-semibold italic">{helpText}</p>}
        {maxLimit !== undefined && value > 0 && (
            <LimitProgressBar value={value} maxLimit={maxLimit} />
        )}
    </div>
);

/* ------------------------------------------------------------------ */
/*  ToggleField                                                        */
/* ------------------------------------------------------------------ */
interface ToggleFieldProps {
    label: string;
    name: string;
    value: boolean;
    onChange: (name: any, value: any) => void;
    leftLabel: string;
    rightLabel: string;
    subText?: string;
    tooltip?: string;
}

export const ToggleField: React.FC<ToggleFieldProps> = ({ label, name, value, onChange, leftLabel, rightLabel, subText, tooltip }) => (
    <div className="flex flex-col group">
        <label className="block text-sm font-bold text-slate-700 mb-2.5 transition-colors group-hover:text-[#000a2e]">{label}</label>
        <div className="flex bg-slate-100 p-1.5 rounded-sm gap-1.5">
            <button
                onClick={() => onChange(name, true)}
                className={`flex-1 py-2 rounded-sm text-xs font-bold transition-all duration-300 ${value ? 'bg-[#000a2e] text-white shadow-lg' : 'text-slate-500 hover:bg-white/50'}`}
            >
                {leftLabel}
            </button>
            <button
                onClick={() => onChange(name, false)}
                className={`flex-1 py-2 rounded-sm text-xs font-bold transition-all duration-300 ${!value ? 'bg-[#000a2e] text-white shadow-lg' : 'text-slate-500 hover:bg-white/50'}`}
            >
                {rightLabel}
            </button>
        </div>
        {subText && <p className="text-[10px] text-slate-400 mt-2 font-semibold">{subText}</p>}
    </div>
);

/* ------------------------------------------------------------------ */
/*  DynamicRow                                                         */
/* ------------------------------------------------------------------ */
interface DynamicRowProps {
    items: CustomComponent[];
    onAdd: () => void;
    onRemove: (id: string) => void;
    onChange: (id: string, field: 'name' | 'value', value: any) => void;
    title: string;
}

export const DynamicRow: React.FC<DynamicRowProps> = ({ items, onAdd, onRemove, onChange, title }) => {
    return (
        <div className="md:col-span-2 lg:col-span-3 mt-6">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                <span className="text-sm font-black text-[#000a2e] tracking-tight">{title}</span>
                <button
                    onClick={onAdd}
                    className="text-xs font-bold text-[#000a2e] flex items-center gap-1.5 hover:bg-slate-100 px-3 py-1.5 rounded-sm transition-colors border border-slate-200"
                >
                    <Plus className="w-4 h-4" /> Add Component
                </button>
            </div>

            <div className="space-y-4">
                {items.length === 0 && <p className="text-[10px] text-slate-400 font-bold italic py-2">No additional components added yet.</p>}
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => onChange(item.id, 'name', e.target.value)}
                            placeholder="Component Name"
                            className="flex-1 py-2 px-4 bg-white border border-slate-200 rounded-sm text-sm text-[#000a2e] font-bold focus:outline-none focus:border-[#000a2e]"
                        />
                        <div className="relative w-40 md:w-56">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                            <input
                                type="number"
                                value={item.value === 0 ? '' : item.value}
                                onChange={(e) => onChange(item.id, 'value', parseFloat(e.target.value) || 0)}
                                placeholder="0"
                                className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-sm text-sm text-[#000a2e] font-bold focus:outline-none focus:border-[#000a2e] placeholder-slate-300"
                            />
                        </div>
                        <button
                            onClick={() => onRemove(item.id)}
                            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
