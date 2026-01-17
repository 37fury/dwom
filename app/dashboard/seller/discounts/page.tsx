'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Copy, Check, Tag } from 'lucide-react';
import Link from 'next/link';
import styles from './discounts.module.css';

interface DiscountCode {
    id: string;
    code: string;
    discountPercentage: number;
    usageCount: number;
    maxUses: number | null;
    expiresAt: string | null;
    isActive: boolean;
    createdAt: string;
}

export default function DiscountsPage() {
    const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    // Form state
    const [code, setCode] = useState('');
    const [percentage, setPercentage] = useState(10);
    const [maxUses, setMaxUses] = useState<number | null>(null);
    const [expiresAt, setExpiresAt] = useState('');
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const fetchDiscounts = async () => {
        try {
            const res = await fetch('/api/seller/discounts');
            if (res.ok) {
                const data = await res.json();
                setDiscounts(data.discounts || []);
            }
        } catch (err) {
            console.error('Failed to fetch discounts:', err);
        }
        setLoading(false);
    };

    const generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCode(result);
    };

    const createDiscount = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        try {
            const res = await fetch('/api/seller/discounts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: code.toUpperCase(),
                    discountPercentage: percentage,
                    maxUses: maxUses || null,
                    expiresAt: expiresAt || null,
                }),
            });
            if (res.ok) {
                fetchDiscounts();
                setShowCreateModal(false);
                resetForm();
            }
        } catch (err) {
            console.error('Failed to create discount:', err);
        }
        setCreating(false);
    };

    const deleteDiscount = async (id: string) => {
        if (!confirm('Delete this discount code?')) return;
        try {
            await fetch(`/api/seller/discounts/${id}`, { method: 'DELETE' });
            setDiscounts(prev => prev.filter(d => d.id !== id));
        } catch (err) {
            console.error('Failed to delete discount:', err);
        }
    };

    const copyCode = (discountCode: string) => {
        navigator.clipboard.writeText(discountCode);
        setCopied(discountCode);
        setTimeout(() => setCopied(null), 2000);
    };

    const resetForm = () => {
        setCode('');
        setPercentage(10);
        setMaxUses(null);
        setExpiresAt('');
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard/seller" className={styles.backLink}>
                <ArrowLeft size={18} /> Back to Dashboard
            </Link>

            <div className={styles.header}>
                <div>
                    <h1><Tag size={24} /> Discount Codes</h1>
                    <p>Create and manage discount codes for your products</p>
                </div>
                <button className={styles.createBtn} onClick={() => setShowCreateModal(true)}>
                    <Plus size={18} /> Create Code
                </button>
            </div>

            {loading ? (
                <div className={styles.loading}>Loading...</div>
            ) : discounts.length === 0 ? (
                <div className={styles.empty}>
                    <Tag size={48} />
                    <h3>No discount codes yet</h3>
                    <p>Create your first discount code to boost sales</p>
                    <button onClick={() => setShowCreateModal(true)} className={styles.createBtn}>
                        <Plus size={18} /> Create Code
                    </button>
                </div>
            ) : (
                <div className={styles.grid}>
                    {discounts.map(discount => (
                        <div key={discount.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.codeLabel}>
                                    {discount.code}
                                </span>
                                <button
                                    className={styles.copyBtn}
                                    onClick={() => copyCode(discount.code)}
                                >
                                    {copied === discount.code ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                            <div className={styles.discountValue}>
                                {discount.discountPercentage}% OFF
                            </div>
                            <div className={styles.cardStats}>
                                <span>Used: {discount.usageCount}{discount.maxUses ? ` / ${discount.maxUses}` : ''}</span>
                                {discount.expiresAt && (
                                    <span>Expires: {new Date(discount.expiresAt).toLocaleDateString()}</span>
                                )}
                            </div>
                            <div className={styles.cardActions}>
                                <span className={`${styles.status} ${discount.isActive ? styles.active : styles.inactive}`}>
                                    {discount.isActive ? 'Active' : 'Inactive'}
                                </span>
                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => deleteDiscount(discount.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <h2>Create Discount Code</h2>
                        <form onSubmit={createDiscount}>
                            <div className={styles.formGroup}>
                                <label>Code</label>
                                <div className={styles.codeInput}>
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={e => setCode(e.target.value.toUpperCase())}
                                        placeholder="e.g. SAVE20"
                                        required
                                        maxLength={20}
                                    />
                                    <button type="button" onClick={generateCode}>Generate</button>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Discount Percentage</label>
                                <input
                                    type="number"
                                    value={percentage}
                                    onChange={e => setPercentage(Number(e.target.value))}
                                    min={1}
                                    max={100}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Max Uses (optional)</label>
                                <input
                                    type="number"
                                    value={maxUses || ''}
                                    onChange={e => setMaxUses(e.target.value ? Number(e.target.value) : null)}
                                    placeholder="Unlimited"
                                    min={1}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Expires At (optional)</label>
                                <input
                                    type="date"
                                    value={expiresAt}
                                    onChange={e => setExpiresAt(e.target.value)}
                                />
                            </div>

                            <div className={styles.formActions}>
                                <button type="button" onClick={() => setShowCreateModal(false)}>Cancel</button>
                                <button type="submit" disabled={creating}>
                                    {creating ? 'Creating...' : 'Create Code'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
