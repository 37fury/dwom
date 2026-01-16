'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, Save, Mail, MessageSquare, TrendingUp, Star, ShoppingBag } from 'lucide-react';

export default function NotificationsPage() {
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 1000));
        setSaving(false);
        alert('Notification preferences saved!');
    };

    const notifications = [
        { id: 'sales', label: 'New Sales', desc: 'When someone purchases your product', icon: ShoppingBag, defaultOn: true },
        { id: 'reviews', label: 'New Reviews', desc: 'When a customer leaves a review', icon: Star, defaultOn: true },
        { id: 'messages', label: 'Customer Messages', desc: 'When a customer sends you a message', icon: MessageSquare, defaultOn: true },
        { id: 'analytics', label: 'Weekly Analytics', desc: 'Weekly summary of your store performance', icon: TrendingUp, defaultOn: false },
        { id: 'marketing', label: 'Tips & Updates', desc: 'Marketing tips and dwom updates', icon: Mail, defaultOn: false },
    ];

    return (
        <div style={{ maxWidth: '600px', width: '100%', paddingBottom: '48px' }}>
            <Link
                href="/dashboard/seller/settings"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '24px'
                }}
            >
                <ArrowLeft size={16} />
                Back to Settings
            </Link>

            <header style={{ marginBottom: '32px' }}>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                }}>
                    <Bell size={28} />
                    Notifications
                </h1>
                <p style={{ color: '#64748b', fontSize: '15px' }}>
                    Choose what notifications you want to receive.
                </p>
            </header>

            <div style={{
                background: 'white',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                padding: '24px'
            }}>
                {notifications.map((notif, i) => {
                    const Icon = notif.icon;
                    return (
                        <label
                            key={notif.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '16px',
                                borderBottom: i < notifications.length - 1 ? '1px solid #f1f5f9' : 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{
                                width: '44px',
                                height: '44px',
                                background: '#f8fafc',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#64748b'
                            }}>
                                <Icon size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '2px' }}>
                                    {notif.label}
                                </div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>
                                    {notif.desc}
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                defaultChecked={notif.defaultOn}
                                style={{ width: '20px', height: '20px', accentColor: '#f97316' }}
                            />
                        </label>
                    );
                })}

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '16px',
                        background: saving ? '#94a3b8' : 'linear-gradient(135deg, #f97316, #ea580c)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '14px',
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        marginTop: '20px'
                    }}
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save Preferences'}
                </button>
            </div>
        </div>
    );
}
