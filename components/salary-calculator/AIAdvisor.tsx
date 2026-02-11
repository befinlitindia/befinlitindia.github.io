import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, X, Loader2 } from 'lucide-react';
import { TaxDetails, ComparisonResult, ChatMessage } from './types';
import { sendMessageToGemini } from './services/geminiService';

interface AIAdvisorProps {
    taxDetails: TaxDetails;
    taxResult: ComparisonResult;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ taxDetails, taxResult }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            role: 'model',
            text: "Namaste! I'm your BeFinLit Tax Advisor. I can help you analyze your tax savings or explain deduction sections. Ask me anything!",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await sendMessageToGemini(userMsg.text, { details: taxDetails, result: taxResult });
            const aiMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            const errorMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: "Sorry, I encountered an error. Please try again.",
                timestamp: new Date(),
                isError: true
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-24 right-6 bg-[#000a2e] text-white p-4 rounded-sm shadow-xl hover:bg-[#1e293b] transition-all duration-300 z-50 flex items-center gap-2 group border border-white/10"
                >
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span className="font-bold text-sm pr-2 group-hover:block hidden">Ask AI Advisor</span>
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 h-[600px] max-h-[80vh] bg-white rounded-sm shadow-2xl flex flex-col z-50 border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <div className="bg-[#000a2e] p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/10 p-2 rounded-sm">
                                <Bot className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <h3 className="font-bold tracking-tight">BeFinLit Advisor</h3>
                                <p className="text-xs text-gray-300 font-medium">AI Powered</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-sm">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-[#fdfbf7] space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-3 rounded-sm text-sm leading-relaxed shadow-sm border ${msg.role === 'user'
                                        ? 'bg-[#000a2e] text-white border-[#000a2e]'
                                        : 'bg-white text-gray-800 border-gray-100'
                                        }`}
                                >
                                    <div dangerouslySetInnerHTML={{
                                        __html: msg.text
                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/\n/g, '<br />')
                                    }} />
                                    <div className={`text-[10px] mt-2 text-right font-bold ${msg.role === 'user' ? 'text-gray-400' : 'text-gray-400'}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-[#000a2e]" />
                                    <span className="text-xs text-gray-500 font-bold">Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-sm border border-gray-200 focus-within:ring-1 focus-within:ring-[#000a2e] transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your tax question..."
                                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder-gray-400 px-2 font-medium"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="bg-[#000a2e] text-white p-2 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1e293b] transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-[10px] text-center text-gray-400 mt-2 font-medium">
                            AI can make mistakes. Verify with a CA.
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIAdvisor;
