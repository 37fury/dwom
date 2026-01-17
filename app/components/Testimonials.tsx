'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        id: 1,
        name: 'Kofi Mensah',
        role: 'Course Creator',
        avatar: '/avatars/1.jpg',
        rating: 5,
        text: "Dwom helped me reach thousands of students across Ghana. The payout process is seamless and I've earned over GH₵50,000 in just 3 months!",
        productsSold: 847,
    },
    {
        id: 2,
        name: 'Ama Asante',
        role: 'Digital Artist',
        avatar: '/avatars/2.jpg',
        rating: 5,
        text: "Finally, a platform that understands African creators. Mobile Money payments make it so easy for my customers to buy my design templates.",
        productsSold: 1203,
    },
    {
        id: 3,
        name: 'Kwame Boateng',
        role: 'Forex Trader',
        avatar: '/avatars/3.jpg',
        rating: 5,
        text: "I moved my trading courses to Dwom and my sales doubled! The affiliate system brings in customers I never could have reached on my own.",
        productsSold: 2156,
    },
    {
        id: 4,
        name: 'Efua Dadzie',
        role: 'Beauty Entrepreneur',
        avatar: '/avatars/4.jpg',
        rating: 5,
        text: "The best decision I made was joining Dwom. My beauty tutorials now reach women across West Africa. Support team is incredibly responsive!",
        productsSold: 634,
    },
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>Testimonials</span>
                    <h2 className={styles.title}>Loved by 10,000+ African Creators</h2>
                    <p className={styles.subtitle}>
                        Join the community of sellers who are building their digital empires with Dwom
                    </p>
                </div>

                <div className={styles.carousel}>
                    <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous">
                        <ChevronLeft size={24} />
                    </button>

                    <div className={styles.cardsWrapper}>
                        {testimonials.map((t, index) => (
                            <div
                                key={t.id}
                                className={`${styles.card} ${index === activeIndex ? styles.active : ''}`}
                                style={{
                                    transform: `translateX(${(index - activeIndex) * 100}%)`,
                                    opacity: index === activeIndex ? 1 : 0.3,
                                    scale: index === activeIndex ? '1' : '0.85',
                                }}
                            >
                                <Quote className={styles.quoteIcon} size={32} />
                                <p className={styles.text}>{t.text}</p>

                                <div className={styles.rating}>
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                                    ))}
                                </div>

                                <div className={styles.author}>
                                    <div className={styles.avatar}>
                                        {t.name.charAt(0)}
                                    </div>
                                    <div className={styles.authorInfo}>
                                        <span className={styles.authorName}>{t.name}</span>
                                        <span className={styles.authorRole}>{t.role}</span>
                                    </div>
                                    <div className={styles.stats}>
                                        <span className={styles.statValue}>{t.productsSold.toLocaleString()}</span>
                                        <span className={styles.statLabel}>Sales</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className={styles.navBtn} onClick={handleNext} aria-label="Next">
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className={styles.dots}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
                            onClick={() => { setIsAutoPlaying(false); setActiveIndex(index); }}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
