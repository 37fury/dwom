'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings, Shield, Bell, Globe, X, Save } from 'lucide-react';
import styles from './settings.module.css';

export default function AdminSettingsPage() {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [settings, setSettings] = useState({
        twoFactorEnabled: false,
        adminNotifications: true,
        sellerNotifications: true,
        platformFee: 10,
        currency: 'GHS'
    });

    const handleSave = () => {
        alert('Settings saved successfully!');
        setActiveModal(null);
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard/admin" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <header className={styles.header}>
                <h1 className={styles.title}>
                    <Settings size={28} />
                    Platform Settings
                </h1>
                <p className={styles.subtitle}>Configure platform-wide settings</p>
            </header>

            <div className={styles.settingsList}>
                <div className={styles.settingCard}>
                    <div className={styles.settingIcon} style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' }}>
                        <Shield size={24} />
                    </div>
                    <div className={styles.settingContent}>
                        <h3>Security Settings</h3>
                        <p>Manage admin access and 2FA</p>
                    </div>
                    <button className={styles.configureBtn} onClick={() => setActiveModal('security')}>
                        Configure
                    </button>
                </div>

                <div className={styles.settingCard}>
                    <div className={styles.settingIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                        <Bell size={24} />
                    </div>
                    <div className={styles.settingContent}>
                        <h3>Notification Settings</h3>
                        <p>Configure admin alerts and notifications</p>
                    </div>
                    <button className={styles.configureBtn} onClick={() => setActiveModal('notifications')}>
                        Configure
                    </button>
                </div>

                <div className={styles.settingCard}>
                    <div className={styles.settingIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                        <Globe size={24} />
                    </div>
                    <div className={styles.settingContent}>
                        <h3>Platform Configuration</h3>
                        <p>Fees, currencies, and general settings</p>
                    </div>
                    <button className={styles.configureBtn} onClick={() => setActiveModal('platform')}>
                        Configure
                    </button>
                </div>
            </div>

            {/* Security Modal */}
            {activeModal === 'security' && (
                <>
                    <div className={styles.modalOverlay} onClick={() => setActiveModal(null)} />
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3><Shield size={20} /> Security Settings</h3>
                            <button onClick={() => setActiveModal(null)}><X size={20} /></button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.toggleRow}>
                                <div>
                                    <h4>Two-Factor Authentication</h4>
                                    <p>Require 2FA for admin logins</p>
                                </div>
                                <label className={styles.toggle}>
                                    <input
                                        type="checkbox"
                                        checked={settings.twoFactorEnabled}
                                        onChange={(e) => setSettings(s => ({ ...s, twoFactorEnabled: e.target.checked }))}
                                    />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.saveBtn} onClick={handleSave}>
                                <Save size={16} /> Save Changes
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Notifications Modal */}
            {activeModal === 'notifications' && (
                <>
                    <div className={styles.modalOverlay} onClick={() => setActiveModal(null)} />
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3><Bell size={20} /> Notification Settings</h3>
                            <button onClick={() => setActiveModal(null)}><X size={20} /></button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.toggleRow}>
                                <div>
                                    <h4>Admin Notifications</h4>
                                    <p>Receive alerts for KYC submissions</p>
                                </div>
                                <label className={styles.toggle}>
                                    <input
                                        type="checkbox"
                                        checked={settings.adminNotifications}
                                        onChange={(e) => setSettings(s => ({ ...s, adminNotifications: e.target.checked }))}
                                    />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                            <div className={styles.toggleRow}>
                                <div>
                                    <h4>Seller Notifications</h4>
                                    <p>Receive alerts for new sellers</p>
                                </div>
                                <label className={styles.toggle}>
                                    <input
                                        type="checkbox"
                                        checked={settings.sellerNotifications}
                                        onChange={(e) => setSettings(s => ({ ...s, sellerNotifications: e.target.checked }))}
                                    />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.saveBtn} onClick={handleSave}>
                                <Save size={16} /> Save Changes
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Platform Modal */}
            {activeModal === 'platform' && (
                <>
                    <div className={styles.modalOverlay} onClick={() => setActiveModal(null)} />
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3><Globe size={20} /> Platform Configuration</h3>
                            <button onClick={() => setActiveModal(null)}><X size={20} /></button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.inputGroup}>
                                <label>Platform Fee (%)</label>
                                <input
                                    type="number"
                                    value={settings.platformFee}
                                    onChange={(e) => setSettings(s => ({ ...s, platformFee: Number(e.target.value) }))}
                                    min={0}
                                    max={100}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Default Currency</label>
                                <select
                                    value={settings.currency}
                                    onChange={(e) => setSettings(s => ({ ...s, currency: e.target.value }))}
                                >
                                    <option value="GHS">GHS (Ghana Cedis)</option>
                                    <option value="USD">USD (US Dollars)</option>
                                    <option value="NGN">NGN (Nigerian Naira)</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.saveBtn} onClick={handleSave}>
                                <Save size={16} /> Save Changes
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
