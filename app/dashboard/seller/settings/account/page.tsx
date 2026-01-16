'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, AtSign, Mail, Lock, Check, Shield, Phone, Calendar, MapPin, Upload, Camera } from 'lucide-react';
import styles from './account.module.css';

export default function SellerAccountPage() {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        // Simulate save
        await new Promise(r => setTimeout(r, 1000));
        setLoading(false);
        setMsg('success');
    }

    return (
        <div className={styles.container}>
            <Link href="/dashboard/seller/settings" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Settings
            </Link>

            <header className={styles.header}>
                <h1 className={styles.title}>
                    <User size={28} />
                    Account Settings
                </h1>
                <p className={styles.subtitle}>Manage your profile and account details.</p>
            </header>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Profile Photo */}
                <div className={styles.photoSection}>
                    <div className={styles.photoWrapper}>
                        <div className={styles.photoPlaceholder}>
                            <User size={40} />
                        </div>
                        <div className={styles.photoOverlay}>
                            <Camera size={18} />
                        </div>
                    </div>
                    <button type="button" className={styles.uploadBtn}>
                        <Upload size={16} />
                        Upload Photo
                    </button>
                    <p className={styles.hint}>Square image, at least 400×400px</p>
                </div>

                {/* Basic Info */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>
                        <User size={18} />
                        Personal Information
                    </h3>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Full Name</label>
                        <input type="text" className={styles.input} placeholder="Your legal name" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <AtSign size={14} />
                            Username
                        </label>
                        <div className={styles.inputPrefix}>
                            <span>dwom.store/</span>
                            <input type="text" className={styles.input} placeholder="yourstore" />
                        </div>
                        <p className={styles.hint}>Your public store URL</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <Mail size={14} />
                            Email Address
                        </label>
                        <input type="email" className={`${styles.input} ${styles.disabled}`} disabled placeholder="your@email.com" />
                        <p className={styles.hint}>
                            <Lock size={12} />
                            Email cannot be changed
                        </p>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <Phone size={14} />
                                Phone Number
                            </label>
                            <input type="tel" className={styles.input} placeholder="024 XXX XXXX" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <Calendar size={14} />
                                Date of Birth
                            </label>
                            <input type="date" className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <MapPin size={14} />
                            Location
                        </label>
                        <input type="text" className={styles.input} placeholder="Accra, Ghana" />
                    </div>
                </div>

                {/* Bio */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>About You</h3>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Bio</label>
                        <textarea className={styles.textarea} rows={4} placeholder="Tell customers about yourself..." />
                    </div>
                </div>

                {/* Admin Notice */}
                <div className={styles.adminNotice}>
                    <Shield size={18} />
                    <div>
                        <strong>Security Information</strong>
                        <p>Phone, DOB, and location are visible only to administrators for verification purposes.</p>
                    </div>
                </div>

                {/* Message */}
                {msg === 'success' && (
                    <div className={styles.successMessage}>
                        <Check size={18} />
                        Profile updated successfully!
                    </div>
                )}

                <button type="submit" disabled={loading} className={styles.submitBtn}>
                    <Check size={18} />
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}
