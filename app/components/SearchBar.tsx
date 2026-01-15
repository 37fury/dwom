'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition, useEffect, useRef } from 'react';
import { Search, TrendingUp, X } from 'lucide-react';
import Link from 'next/link';
import styles from './SearchBar.module.css';

// Sample trending searches (can be dynamic later)
const trendingSearches = ['Forex', 'Trading', 'Sports Betting', 'Music Production', 'Digital Marketing'];

// Sample products for instant results (ideally fetched from API)
const sampleProducts = [
    { id: '1', title: 'Ultimate Forex Mastery Course', category: 'Trading', price: 550, currency: 'GHS' },
    { id: '2', title: 'Sports Betting Mastery', category: 'Sports', price: 299, currency: 'GHS' },
    { id: '3', title: 'Afrobeats Production Pro', category: 'Music', price: 450, currency: 'GHS' },
    { id: '4', title: 'Digital Marketing Academy', category: 'Marketing', price: 350, currency: 'GHS' },
    { id: '5', title: 'Crypto Trading Secrets', category: 'Crypto', price: 499, currency: 'GHS' },
];

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [isPending, startTransition] = useTransition();
    const [isFocused, setIsFocused] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Filter suggestions based on query
    const filteredProducts = query.length > 0
        ? sampleProducts.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
        : [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setShowDropdown(false);
        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            if (query) {
                params.set('q', query);
            } else {
                params.delete('q');
            }
            router.push(`/?${params.toString()}`);
        });
    };

    const handleTrendingClick = (term: string) => {
        setQuery(term);
        setShowDropdown(false);
        startTransition(() => {
            router.push(`/?q=${encodeURIComponent(term)}`);
        });
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.searchWrapper} ref={dropdownRef}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <div className={styles.inputWrapper}>
                    <Search size={20} className={styles.searchIcon} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => { setIsFocused(true); setShowDropdown(true); }}
                        placeholder="Search courses, communities, software..."
                        className={styles.input}
                    />
                    {query && (
                        <button
                            type="button"
                            className={styles.clearBtn}
                            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isPending}
                    className={styles.button}
                >
                    {isPending ? '...' : 'Search'}
                </button>
            </form>

            {/* Dropdown */}
            {showDropdown && (
                <div className={styles.dropdown}>
                    {/* Instant Results */}
                    {filteredProducts.length > 0 && (
                        <div className={styles.section}>
                            <h4 className={styles.sectionTitle}>Products</h4>
                            {filteredProducts.map(product => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    className={styles.resultItem}
                                    onClick={() => setShowDropdown(false)}
                                >
                                    <div className={styles.resultInfo}>
                                        <span className={styles.resultTitle}>{product.title}</span>
                                        <span className={styles.resultCategory}>{product.category}</span>
                                    </div>
                                    <span className={styles.resultPrice}>{product.currency} {product.price}</span>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Trending Searches - Show when no query */}
                    {query.length === 0 && (
                        <div className={styles.section}>
                            <h4 className={styles.sectionTitle}>
                                <TrendingUp size={14} /> Trending
                            </h4>
                            <div className={styles.trendingTags}>
                                {trendingSearches.map(term => (
                                    <button
                                        key={term}
                                        className={styles.trendingTag}
                                        onClick={() => handleTrendingClick(term)}
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Results */}
                    {query.length > 0 && filteredProducts.length === 0 && (
                        <div className={styles.noResults}>
                            No products found for "{query}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
