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
        else if (!/@/.test(formData.email)) newErrors.email = 'Email is invalid (must contain @)';

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

    const handleSubmit = async () => {
        setIsSubmitting(true);
        console.log("Starting form submission...");

        // Hardcoded fallback URL for convenience, allows form to work without secrets
        const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbxRt3I-INKoUp-kZftQS8nzMoQBkWr9dTytIpOBXhdYWrQzyDIegFdgYtP1Rd8t58qkBA/exec";

        if (!GOOGLE_SCRIPT_URL) {
            console.error("VITE_GOOGLE_SCRIPT_URL is not defined in environment variables.");
            alert('Service configuration missing. Please try again later or contact befinlitindia@gmail.com');
            setIsSubmitting(false);
            return;
        }

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                whatsapp: formData.whatsapp,
                query: formData.query,
                consultation_type: formData.consultationType === 'email' ? 'Email Reply' : 'Audio/Video Call',
                payment_preference: 'Pay Now',
                created_at: new Date().toISOString()
            };
            console.log("Payload:", payload);

            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // Response will be opaque
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(payload)
            });

            console.log("Fetch response received. Mode: no-cors (opaque). Status check skipped.");

            // With 'no-cors', we can't check response.ok, but we assume success if no network error was thrown.
            alert('Thank you! Your request has been received. We will contact you shortly.');
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

        } catch (error) {
            console.error("Submission error:", error);
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                alert('Network error: Request failed. Please check your internet connection or ad blocker.');
            } else {
                alert('Something went wrong. Please try again later or contact us directly at befinlitindia@gmail.com');
            }
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
                    type="text"
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
            <p className="text-[10px] text-center text-befinlit-navy/40 mt-4 leading-relaxed">
                <span className="font-bold flex items-center justify-center gap-1"><CheckCircle size={10} /> Data Privacy:</span> Information provided is intended solely for connecting with you. No data sharing will be done with any third party.
            </p>
        </div>
    );

    const renderEmailStep = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-blue-50 p-4 border border-blue-100 rounded-sm">
                <h4 className="font-bold text-befinlit-navy flex items-center gap-2 mb-2">
                    <Clock size={16} /> Timeline & Process
                </h4>
                <ul className="text-sm text-befinlit-navy/80 space-y-2 list-disc pl-4">
                    <li><strong>Process:</strong> We may revert via email to clarify facts before drafting the final advisory.</li>
                    <li><strong>Buffer Time:</strong> We require a minimum of <strong>3 days</strong> to draft the advisory after verifying all facts.</li>
                </ul>
            </div>

            <div className="bg-yellow-50 p-4 border border-yellow-100 rounded-sm">
                <h4 className="font-bold text-befinlit-navy flex items-center gap-2 mb-2">
                    <CreditCard size={16} /> Consultation Fees
                </h4>
                <p className="text-sm text-befinlit-navy/80 mb-2">
                    Flat fee: <strong>₹1,999</strong>.
                </p>
                <p className="text-xs text-befinlit-navy/60 italic">
                    Invoice will be shared before sharing the final delivery of the advisory over email.
                </p>
            </div>

            <div className="space-y-3">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full p-4 border border-befinlit-navy/20 rounded-sm flex items-center justify-between hover:border-befinlit-gold group bg-white hover:bg-befinlit-cream transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="text-left">
                        <span className="block font-bold text-befinlit-navy">{isSubmitting ? 'Sending...' : 'Submit Request'}</span>
                        <span className="text-xs text-befinlit-navy/60">Pay at time of invoice</span>
                    </div>
                    <span className="text-befinlit-navy font-bold group-hover:text-befinlit-gold">₹1,999</span>
                </button>
            </div>

            <button
                onClick={handleBack}
                className="text-befinlit-navy/60 text-sm hover:text-befinlit-navy flex items-center gap-1 mx-auto mt-4"
            >
                <ArrowLeft size={14} /> Back
            </button>
        </div>
    );

    const renderCallStep = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-blue-50 p-4 border border-blue-100 rounded-sm">
                <h4 className="font-bold text-befinlit-navy flex items-center gap-2 mb-2">
                    <Clock size={16} /> Timeline & Process
                </h4>
                <ul className="text-sm text-befinlit-navy/80 space-y-2 list-disc pl-4">
                    <li><strong>Process:</strong> We may revert via email, WhatsApp, or call to clarify facts before scheduling the final call.</li>
                    <li><strong>Buffer Time:</strong> We require a minimum of <strong>3 days</strong> to prepare for the call after verifying all facts.</li>
                </ul>
            </div>

            <div className="bg-yellow-50 p-4 border border-yellow-100 rounded-sm">
                <h4 className="font-bold text-befinlit-navy flex items-center gap-2 mb-2">
                    <CreditCard size={16} /> Consultation Fees
                </h4>
                <p className="text-sm text-befinlit-navy/80 mb-2">
                    Video consultation flat fee: <strong>₹2,499</strong>.
                </p>
                <p className="text-xs text-befinlit-navy/60 italic">
                    Invoice will be shared before the video call.
                </p>
            </div>

            <div className="space-y-3">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full p-4 border border-befinlit-navy/20 rounded-sm flex items-center justify-between hover:border-befinlit-gold group bg-white hover:bg-befinlit-cream transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="text-left">
                        <span className="block font-bold text-befinlit-navy">{isSubmitting ? 'Sending...' : 'Submit Request'}</span>
                        <span className="text-xs text-befinlit-navy/60">Pay before call</span>
                    </div>
                    <span className="text-befinlit-navy font-bold group-hover:text-befinlit-gold">₹2,499</span>
                </button>
            </div>

            <button
                onClick={handleBack}
                className="text-befinlit-navy/60 text-sm hover:text-befinlit-navy flex items-center gap-1 mx-auto mt-4"
            >
                <ArrowLeft size={14} /> Back
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
