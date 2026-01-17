'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, Search, Loader2, User } from 'lucide-react';
import { startConversationAction } from '../actions';
import styles from './NewConversationModal.module.css';

interface Seller {
    id: string;
    full_name: string;
    avatar_url?: string;
    store_name?: string;
}

export default function NewConversationButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [loading, setLoading] = useState(false);
    const [starting, setStarting] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            fetchSellers();
        }
    }, [isOpen]);

    const fetchSellers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/sellers');
            if (res.ok) {
                const data = await res.json();
                setSellers(data.sellers || []);
            }
        } catch (err) {
            console.error('Failed to fetch sellers:', err);
        }
        setLoading(false);
    };

    const handleStartConversation = async (sellerId: string) => {
        setStarting(sellerId);
        try {
            const result = await startConversationAction(sellerId);
            if (result.success && result.conversationId) {
                setIsOpen(false);
                router.push(`/dashboard/messages?id=${result.conversationId}`);
                router.refresh();
            }
        } catch (err) {
            console.error('Failed to start conversation:', err);
        }
        setStarting(null);
    };

    const filteredSellers = sellers.filter(seller =>
        seller.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        seller.store_name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <button
                className={styles.newChatBtn}
                title="New Message"
                onClick={() => setIsOpen(true)}
                type="button"
            >
                <Plus size={18} />
            </button>

            {isOpen && (
                <>
                    <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>New Conversation</h2>
                            <button
                                className={styles.closeBtn}
                                onClick={() => setIsOpen(false)}
                                type="button"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className={styles.searchBox}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search sellers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>

                        <div className={styles.sellersList}>
                            {loading ? (
                                <div className={styles.loadingState}>
                                    <Loader2 size={24} className={styles.spinner} />
                                    <span>Loading sellers...</span>
                                </div>
                            ) : filteredSellers.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <p>No sellers found</p>
                                </div>
                            ) : (
                                filteredSellers.map(seller => (
                                    <button
                                        key={seller.id}
                                        className={styles.sellerItem}
                                        onClick={() => handleStartConversation(seller.id)}
                                        disabled={starting === seller.id}
                                        type="button"
                                    >
                                        <div className={styles.sellerAvatar}>
                                            {seller.avatar_url ? (
                                                <img src={seller.avatar_url} alt={seller.full_name} />
                                            ) : (
                                                <User size={20} />
                                            )}
                                        </div>
                                        <div className={styles.sellerInfo}>
                                            <span className={styles.sellerName}>{seller.full_name}</span>
                                            {seller.store_name && (
                                                <span className={styles.storeName}>{seller.store_name}</span>
                                            )}
                                        </div>
                                        {starting === seller.id && (
                                            <Loader2 size={18} className={styles.spinner} />
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
