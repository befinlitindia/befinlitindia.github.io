import React, { useState } from 'react';
import { X, Calendar, Mail, Phone, Clock, CreditCard, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ConsultationType = 'email' | 'call' | null;

interface FormData {
    name: string;
    email: string;
    whatsapp: string;
    query: string;
    consultationType: ConsultationType;
    payLater: boolean;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        whatsapp: '',
        query: '',
        consultationType: null,
        payLater: false
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const validateStep1 = () => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.whatsapp.trim()) newErrors.whatsapp = 'Whatsapp number is required';
        else if (!/^\d{10}$/.test(formData.whatsapp)) newErrors.whatsapp = 'Must be exactly 10 digits';

        if (!formData.query.trim()) newErrors.query = 'Query is required';
        if (!formData.consultationType) newErrors.consultationType = 'Please select a preference';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        }
    };

    const handleBack = () => {
        setStep(1);
        setFormData(prev => ({ ...prev, payLater: false }));
    };

    const handleSubmit = async (payLater: boolean) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("https://formsubmit.co/ajax/befinlitindia@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    query: formData.query,
                    consultation_type: formData.consultationType === 'email' ? 'Email Reply' : 'Audio/Video Call',
                    payment_preference: payLater ? 'Pay Later' : 'Pay Now',
                    _subject: `New Consultation Request: ${formData.name}`,
                    _template: 'table',
                    _captcha: 'false'
                })
            });

            if (response.ok) {
                alert('Thank you! Your request has been received. Please check your email inbox (and spam) for a confirmation if this is your first time.');
                onClose();
                // Reset form
                setTimeout(() => {
                    setStep(1);
                    setFormData({
                        name: '',
                        email: '',
                        whatsapp: '',
                        query: '',
                        consultationType: null,
                        payLater: false
                    });
                }, 500);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again later or contact us directly at befinlitindia@gmail.com');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-4 animate-fade-in">
            <div>
                <label className="block text-sm font-bold text-befinlit-navy mb-1">Name</label>
                <input
                    type="text"
                    className={`w-full p-3 bg-white border ${errors.name ? 'border-red-500' : 'border-befinlit-navy/20'} rounded-sm focus:outline-none focus:border-befinlit-gold transition-colors`}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-befinlit-navy mb-1">Email ID</label>
                <input
                    type="email"
                    className={`w-full p-3 bg-white border ${errors.email ? 'border-red-500' : 'border-befinlit-navy/20'} rounded-sm focus:outline-none focus:border-befinlit-gold transition-colors`}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-befinlit-navy mb-1">Whatsapp Number</label>
                <input
                    type="tel"
                    className={`w-full p-3 bg-white border ${errors.whatsapp ? 'border-red-500' : 'border-befinlit-navy/20'} rounded-sm focus:outline-none focus:border-befinlit-gold transition-colors`}
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    placeholder="10-digit number"
                />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-befinlit-navy mb-1">What is your query?</label>
                <textarea
                    className={`w-full p-3 bg-white border ${errors.query ? 'border-red-500' : 'border-befinlit-navy/20'} rounded-sm focus:outline-none focus:border-befinlit-gold transition-colors min-h-[100px] resize-y`}
                    value={formData.query}
                    onChange={e => setFormData({ ...formData, query: e.target.value })}
                    placeholder="Brief description of your query or idea..."
                />
                {errors.query && <p className="text-red-500 text-xs mt-1">{errors.query}</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-befinlit-navy mb-3">How would you like us to revert?</label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, consultationType: 'email' })}
                        className={`p-4 border rounded-sm flex flex-col items-center gap-2 transition-all ${formData.consultationType === 'email'
                            ? 'bg-befinlit-navy text-befinlit-cream border-befinlit-navy ring-1 ring-befinlit-navy'
                            : 'bg-white text-befinlit-navy border-befinlit-navy/20 hover:border-befinlit-gold'
                            }`}
                    >
                        <Mail size={24} />
                        <span className="font-bold text-sm">Email Reply</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, consultationType: 'call' })}
                        className={`p-4 border rounded-sm flex flex-col items-center gap-2 transition-all ${formData.consultationType === 'call'
                            ? 'bg-befinlit-navy text-befinlit-cream border-befinlit-navy ring-1 ring-befinlit-navy'
                            : 'bg-white text-befinlit-navy border-befinlit-navy/20 hover:border-befinlit-gold'
                            }`}
                    >
                        <Phone size={24} />
                        <span className="font-bold text-sm">Audio/Video Call</span>
                    </button>
                </div>
                {errors.consultationType && <p className="text-red-500 text-xs mt-2">{errors.consultationType}</p>}
            </div>

            <button
                onClick={handleNext}
                className="w-full bg-befinlit-gold text-befinlit-navy font-bold py-4 rounded-sm mt-4 hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
            >
                Continue to Details <ArrowRight size={18} />
            </button>
        </div>
    );

    const renderEmailStep = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-blue-50 p-4 border border-blue-100 rounded-sm">
                <h4 className="font-bold text-befinlit-navy flex items-center gap-2 mb-2">
                    <Clock size={16} /> Timeline & Process
                </h4>
                <ul className="text-sm text-befinlit-navy/80 space-y-2 list-disc pl-4">
                    <li><strong>Buffer Time:</strong> We require a minimum of <strong>3 days</strong> to draft the advisory after verifying all facts.</li>
                    <li><strong>Process:</strong> We may revert via email to clarify facts before drafting the final advisory.</li>
                </ul>
            </div>

            <div className="bg-yellow-50 p-4 border border-yellow-100 rounded-sm">
                <h4 className="font-bold text-befinlit-navy flex items-center gap-2 mb-2">
                    <CreditCard size={16} /> Consultation Fees
                </h4>
                <p className="text-sm text-befinlit-navy/80 mb-2">
                    Starts from <strong>₹1,999</strong>. Final quote depends on query complexity.
                </p>
                <p className="text-xs text-befinlit-navy/60 italic">
                    Proforma invoice will be shared after receiving your query.
                </p>
            </div>

            <div className="space-y-3">
                <label className="block text-sm font-bold text-befinlit-navy">Select Payment Option</label>

                <button
                    onClick={() => handleSubmit(false)}
                    disabled={isSubmitting}
                    className="w-full p-4 border border-befinlit-navy/20 rounded-sm flex items-center justify-between hover:border-befinlit-gold group bg-white hover:bg-befinlit-cream transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="text-left">
                        <span className="block font-bold text-befinlit-navy">{isSubmitting ? 'Sending...' : 'Pay Now'}</span>
                        <span className="text-xs text-befinlit-navy/60">Pay at time of proforma invoice</span>
                    </div>
                    <span className="text-befinlit-navy font-bold group-hover:text-befinlit-gold">₹1,999+</span>
                </button>

                <button
                    onClick={() => handleSubmit(true)}
                    disabled={isSubmitting}
                    className="w-full p-4 border border-befinlit-navy/20 rounded-sm flex items-center justify-between hover:border-befinlit-gold group bg-white hover:bg-befinlit-cream transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="text-left">
                        <span className="block font-bold text-befinlit-navy">{isSubmitting ? 'Sending...' : 'Pay Later'}</span>
                        <span className="text-xs text-befinlit-navy/60">Pay before final draft (Includes ₹299 fee)</span>
                    </div>
                    <span className="text-befinlit-navy font-bold group-hover:text-befinlit-gold">₹2,298+</span>
                </button>
            </div>

            <button
                onClick={handleBack}
                className="text-befinlit-navy/60 text-sm hover:text-befinlit-navy flex items-center gap-1 mx-auto mt-4"
            >
                <ArrowLeft size={14} /> Back to Query
            </button>
        </div>
    );

    const renderCallStep = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-befinlit-navy/20 rounded-sm p-4 text-center">
                <h5 className="font-bold text-befinlit-navy mb-1 flex items-center justify-center gap-2">
                    <Calendar size={16} /> Available Dates
                </h5>
                <p className="text-xs text-befinlit-navy/60 font-medium mb-3">
                    {(() => {
                        const today = new Date();
                        const end = new Date(today);
                        end.setDate(today.getDate() + 29);

                        const startMonth = today.toLocaleString('default', { month: 'long' });
                        const startYear = today.getFullYear();
                        const endMonth = end.toLocaleString('default', { month: 'long' });
                        const endYear = end.getFullYear();

                        if (startMonth === endMonth && startYear === endYear) {
                            return `${startMonth} ${startYear}`;
                        } else if (startYear === endYear) {
                            return `${startMonth} - ${endMonth} ${startYear}`;
                        } else {
                            return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
                        }
                    })()}
                </p>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-2 text-xs font-bold text-befinlit-navy/60">
                    <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {(() => {
                        const today = new Date();
                        const days = [];
                        const PUBLIC_HOLIDAYS_2026 = [
                            "2026-01-26", "2026-03-04", "2026-03-21", "2026-03-26", "2026-03-31",
                            "2026-04-03", "2026-05-01", "2026-05-27", "2026-06-26", "2026-08-15",
                            "2026-08-26", "2026-09-04", "2026-10-02", "2026-10-20", "2026-11-08",
                            "2026-11-24", "2026-12-25"
                        ];

                        // Generate 30 days
                        for (let i = 0; i < 30; i++) {
                            const date = new Date(today);
                            date.setDate(today.getDate() + i);

                            const dateString = date.toISOString().split('T')[0];
                            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                            const isHoliday = PUBLIC_HOLIDAYS_2026.includes(dateString);
                            const isUnavailable = isWeekend || isHoliday;

                            days.push(
                                <div
                                    key={i}
                                    className={`
                                            aspect-square flex items-center justify-center text-xs rounded-sm relative group
                                            ${isUnavailable
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-befinlit-cream text-befinlit-navy font-bold border border-befinlit-gold/30 hover:bg-befinlit-gold hover:text-white cursor-default'
                                        }
                                        `}
                                    title={isHoliday ? "Public Holiday" : isWeekend ? "Weekend (Closed)" : "Available"}
                                >
                                    {date.getDate()}
                                    {isUnavailable && (
                                        <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 bg-befinlit-navy text-white text-[10px] p-1 rounded whitespace-nowrap z-10 mb-1">
                                            {isHoliday ? "Holiday" : "Closed"}
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return days;
                    })()}
                </div>
                <p className="text-[10px] text-befinlit-navy/40 mt-2 text-center">
                    *Grey dates are unavailable. Showing next 30 days.
                </p>

                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert("Redirecting to BeFinLit India Calendar..."); }}
                    className="mt-4 block w-full py-2 bg-befinlit-navy text-befinlit-cream text-xs font-bold rounded-sm hover:bg-befinlit-lightNavy transition-colors"
                >
                    View Full Calendar
                </a>
            </div>

            <div className="bg-yellow-50 p-4 border border-yellow-100 rounded-sm">
                <h4 className="font-bold text-befinlit-navy flex items-center gap-2 mb-2">
                    <CreditCard size={16} /> Consultation Fees
                </h4>
                <p className="text-sm text-befinlit-navy/80 mb-2">
                    Video consultation starts from <strong>₹2,999</strong>.
                </p>
            </div>

            <div className="space-y-3">
                <label className="block text-sm font-bold text-befinlit-navy">Select Payment Option</label>

                <button
                    onClick={() => handleSubmit(false)}
                    disabled={isSubmitting}
                    className="w-full p-4 border border-befinlit-navy/20 rounded-sm flex items-center justify-between hover:border-befinlit-gold group bg-white hover:bg-befinlit-cream transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="text-left">
                        <span className="block font-bold text-befinlit-navy">{isSubmitting ? 'Sending...' : 'Pay Now'}</span>
                        <span className="text-xs text-befinlit-navy/60">Standard Rate</span>
                    </div>
                    <span className="text-befinlit-navy font-bold group-hover:text-befinlit-gold">₹2,999</span>
                </button>

                <button
                    onClick={() => handleSubmit(true)}
                    disabled={isSubmitting}
                    className="w-full p-4 border border-befinlit-navy/20 rounded-sm flex items-center justify-between hover:border-befinlit-gold group bg-white hover:bg-befinlit-cream transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="text-left">
                        <span className="block font-bold text-befinlit-navy">{isSubmitting ? 'Sending...' : 'Pay Later'}</span>
                        <span className="text-xs text-befinlit-navy/60">Pay before call (Includes ₹399 fee)</span>
                    </div>
                    <span className="text-befinlit-navy font-bold group-hover:text-befinlit-gold">₹3,398</span>
                </button>
            </div>

            <button
                onClick={handleBack}
                className="text-befinlit-navy/60 text-sm hover:text-befinlit-navy flex items-center gap-1 mx-auto mt-4"
            >
                <ArrowLeft size={14} /> Back to Query
            </button>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-befinlit-navy/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-befinlit-cream rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-befinlit-cream border-b border-befinlit-navy/10 p-6 flex items-center justify-between">
                    <h2 className="text-xl font-black text-befinlit-navy uppercase tracking-wide">
                        Schedule Consultation
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-befinlit-navy/5 rounded-full text-befinlit-navy/60 hover:text-befinlit-navy transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Branding Line */}
                <div className="h-1 bg-gradient-to-r from-befinlit-navy via-befinlit-gold to-befinlit-navy"></div>

                {/* Body */}
                <div className="p-6 md:p-8">
                    {step === 1 && renderStep1()}
                    {step === 2 && (
                        <>
                            {formData.consultationType === 'email' && renderEmailStep()}
                            {formData.consultationType === 'call' && renderCallStep()}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConsultationModal;
