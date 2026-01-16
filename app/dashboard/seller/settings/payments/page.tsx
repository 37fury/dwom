'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Save, DollarSign } from 'lucide-react';

export default function PaymentSettingsPage() {
    const [saving, setSaving] = useState(false);
    const [currency, setCurrency] = useState('GHS');

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 1000));
        setSaving(false);
        alert('Payment settings saved!');
    };

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
                    <CreditCard size={28} />
                    Payment Settings
                </h1>
                <p style={{ color: '#64748b', fontSize: '15px' }}>
                    Configure your pricing and payment preferences.
                </p>
            </header>

            <div style={{
                background: 'white',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                padding: '32px'
            }}>
                {/* Default Currency */}
                <div style={{ marginBottom: '28px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '12px'
                    }}>Default Currency</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                        {[
                            { value: 'GHS', label: 'GH₵', name: 'Cedis' },
                            { value: 'NGN', label: '₦', name: 'Naira' },
                            { value: 'USD', label: '$', name: 'USD' },
                        ].map((c) => (
                            <button
                                key={c.value}
                                type="button"
                                onClick={() => setCurrency(c.value)}
                                style={{
                                    padding: '16px',
                                    borderRadius: '12px',
                                    border: currency === c.value ? '2px solid #f97316' : '2px solid #e2e8f0',
                                    background: currency === c.value ? '#fff7ed' : 'white',
                                    cursor: 'pointer',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                                    {c.label}
                                </div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>{c.name}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Payment Methods Accepted */}
                <div style={{ marginBottom: '28px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '12px'
                    }}>Accept Payments Via</label>
                    {[
                        { id: 'momo', label: 'Mobile Money', desc: 'MTN, Vodafone, AirtelTigo' },
                        { id: 'card', label: 'Card Payments', desc: 'Visa, Mastercard' },
                        { id: 'crypto', label: 'Cryptocurrency', desc: 'Bitcoin, USDT (Coming soon)', disabled: true },
                    ].map((method) => (
                        <label
                            key={method.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                marginBottom: '12px',
                                cursor: method.disabled ? 'not-allowed' : 'pointer',
                                opacity: method.disabled ? 0.5 : 1
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: '600', color: '#0f172a' }}>{method.label}</div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>{method.desc}</div>
                            </div>
                            <input
                                type="checkbox"
                                defaultChecked={!method.disabled}
                                disabled={method.disabled}
                                style={{ width: '20px', height: '20px', accentColor: '#f97316' }}
                            />
                        </label>
                    ))}
                </div>

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
                        cursor: saving ? 'not-allowed' : 'pointer'
                    }}
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>
        </div>
    );
}
