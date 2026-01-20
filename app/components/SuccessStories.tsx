'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

type Story = {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    quote: string;
    revenue: string;
    country: string;
    flag: string;
};

type Props = {
    stories?: Story[];
};

const defaultStories: Story[] = [
    {
        id: '1',
        name: 'Kofi Mensah',
        role: 'Tech Educator',
        quote: 'I went from teaching 20 students locally to reaching 5,000+ across Africa. dwam made it possible to earn in my sleep!',
        revenue: 'GH₵45,000/month',
        country: 'Ghana',
        flag: '🇬🇭'
    },
    {
        id: '2',
        name: 'Amara Okafor',
        role: 'Finance Coach',
        quote: 'The affiliate system brought me customers I never knew existed. My community grew 10x in just 3 months.',
        revenue: '₦2.5M/month',
        country: 'Nigeria',
        flag: '🇳🇬'
    },
    {
        id: '3',
        name: 'David Mwangi',
        role: 'Software Developer',
        quote: 'Selling my templates on dwam changed everything. Now I focus on creating while the platform handles payments.',
        revenue: 'KES 800K/month',
        country: 'Kenya',
        flag: '🇰🇪'
    },
    {
        id: '4',
        name: 'Fatima Diallo',
        role: 'Language Teacher',
        quote: 'From teaching French in my living room to having students in 12 countries. dwam opened doors I never imagined.',
        revenue: 'XOF 3M/month',
        country: 'Senegal',
        flag: '🇸🇳'
    }
];

export default function SuccessStories({ stories = defaultStories }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextStory = () => {
        setCurrentIndex((prev) => (prev + 1) % stories.length);
    };

    const prevStory = () => {
        setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    };

    const story = stories[currentIndex];
    const initials = story.name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <section style={{
            padding: '80px 0',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        background: 'rgba(249, 115, 22, 0.2)',
                        color: '#f97316',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '600',
                        marginBottom: '16px'
                    }}>
                        SUCCESS STORIES
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(28px, 5vw, 40px)',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '12px'
                    }}>
                        Creators Winning on dwam
                    </h2>
                    <p style={{
                        color: '#94a3b8',
                        fontSize: '16px',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        Real stories from African creators building their digital empires
                    </p>
                </div>

                {/* Story Card */}
                <div style={{
                    maxWidth: '700px',
                    margin: '0 auto',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '24px',
                    padding: '40px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative'
                }}>
                    {/* Quote Icon */}
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '40px',
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #f97316, #ea580c)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <Quote size={24} />
                    </div>

                    {/* Quote */}
                    <p style={{
                        fontSize: '20px',
                        lineHeight: '1.7',
                        color: 'white',
                        marginBottom: '32px',
                        marginTop: '16px',
                        fontStyle: 'italic'
                    }}>
                        "{story.quote}"
                    </p>

                    {/* Author */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '20px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {story.avatar ? (
                                <img
                                    src={story.avatar}
                                    alt={story.name}
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '2px solid rgba(255, 255, 255, 0.2)'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '700',
                                    fontSize: '18px',
                                    border: '2px solid rgba(255, 255, 255, 0.2)'
                                }}>
                                    {initials}
                                </div>
                            )}
                            <div>
                                <div style={{
                                    color: 'white',
                                    fontWeight: '700',
                                    fontSize: '17px',
                                    marginBottom: '2px'
                                }}>
                                    {story.name} {story.flag}
                                </div>
                                <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                                    {story.role}
                                </div>
                            </div>
                        </div>

                        {/* Revenue Badge */}
                        <div style={{
                            background: 'rgba(34, 197, 94, 0.2)',
                            padding: '12px 20px',
                            borderRadius: '12px',
                            border: '1px solid rgba(34, 197, 94, 0.3)'
                        }}>
                            <div style={{ color: '#86efac', fontSize: '12px', marginBottom: '2px' }}>
                                Earning
                            </div>
                            <div style={{ color: '#22c55e', fontWeight: '700', fontSize: '18px' }}>
                                {story.revenue}
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '12px',
                        marginTop: '32px'
                    }}>
                        <button
                            onClick={prevStory}
                            style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Dots */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {stories.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    style={{
                                        width: index === currentIndex ? '24px' : '8px',
                                        height: '8px',
                                        borderRadius: '4px',
                                        background: index === currentIndex ? '#f97316' : 'rgba(255, 255, 255, 0.3)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextStory}
                            style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
