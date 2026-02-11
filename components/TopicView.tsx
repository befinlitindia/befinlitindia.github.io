import React from 'react';
import { ArrowRight, BookOpen, Calculator, Tag, Clock, Landmark, Wrench } from 'lucide-react';
import { getResourcesByTag, ResourceItem } from './data';

interface TopicViewProps {
    topic: string;
    onNavigate: (page: any) => void;
}

const TopicView: React.FC<TopicViewProps> = ({ topic, onNavigate }) => {
    const resources = getResourcesByTag(topic);

    return (
        <div className="animate-fade-in pt-40 pb-20 px-6 max-w-7xl mx-auto">
            <header className="mb-16 border-b border-befinlit-navy/10 pb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Tag className="text-befinlit-gold" size={20} />
                    <span className="text-befinlit-gold font-bold tracking-[0.2em] uppercase text-xs">Topic</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-befinlit-navy mb-6 font-serif">{topic}</h1>
                <p className="text-lg text-befinlit-navy/60 max-w-2xl leading-relaxed">
                    Curated resources, playbooks, and tools related to {topic}.
                </p>
            </header>

            {resources.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-sm border border-dashed border-gray-300">
                    <p className="text-befinlit-navy/40 italic">No resources found for this topic yet.</p>
                    <button onClick={() => onNavigate('home')} className="mt-4 text-befinlit-navy font-bold hover:text-befinlit-gold transition-colors text-sm">
                        Go back Home
                    </button>
                </div>
            ) : (
                <div className="space-y-12">
                    {resources.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className="group cursor-pointer bg-white border border-befinlit-navy/5 p-8 rounded-sm hover:border-befinlit-gold transition-all shadow-sm hover:shadow-md flex flex-col md:flex-row gap-8"
                        >
                            <div className={`w-full md:w-1/3 aspect-[4/3] rounded-sm flex items-center justify-center p-6 relative overflow-hidden shrink-0 ${item.type === 'tool' ? 'bg-befinlit-gold' : 'bg-befinlit-navy'
                                }`}>
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(${item.type === 'tool' ? '#0F172A' : '#C5A059'} 1px, transparent 1px)`, backgroundSize: '16px 16px' }}></div>

                                {item.type === 'tool' ? (
                                    <Landmark size={40} className="text-befinlit-navy opacity-10 absolute -bottom-2 -right-2" />
                                ) : (
                                    <BookOpen size={40} className="text-befinlit-gold opacity-10 absolute -bottom-2 -right-2" />
                                )}

                                <div className={`${item.type === 'tool' ? 'text-befinlit-navy' : 'text-white'} text-center font-bold font-serif leading-tight`}>
                                    {item.type === 'tool' && <Calculator size={32} className="mx-auto mb-2 text-befinlit-navy" />}
                                    <p className="text-lg">{item.title}</p>
                                </div>
                            </div>

                            <div className="flex-grow">
                                <div className="flex items-center gap-4 mb-3 text-[10px] uppercase tracking-widest font-bold">
                                    <span className="text-befinlit-gold flex items-center gap-1"><Tag size={12} /> {item.tag}</span>
                                    {item.type === 'playbook' && (
                                        <span className="text-befinlit-navy/40 flex items-center gap-1"><Clock size={12} /> {item.readTime}</span>
                                    )}
                                    {item.type === 'tool' && (
                                        <span className="text-green-600 flex items-center gap-1">• {item.status}</span>
                                    )}
                                </div>

                                <h3 className="text-2xl font-bold text-befinlit-navy mb-3 group-hover:text-befinlit-gold transition-colors">
                                    <span className="block text-lg font-medium opacity-80 mb-1">{item.title}</span>
                                    {item.subtitle}
                                </h3>

                                <p className="text-befinlit-navy/70 text-sm mb-6 leading-relaxed">
                                    {item.description}
                                </p>

                                <div className="flex items-center gap-2 text-befinlit-navy font-bold text-sm">
                                    {item.linkText || 'View Resource'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopicView;
