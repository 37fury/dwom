'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Wallet, Plus, Smartphone, Building2, Save, Trash2 } from 'lucide-react';

export default function PayoutMethodsPage() {
    const [saving, setSaving] = useState(false);
    const [provider, setProvider] = useState('mtn');
    const [number, setNumber] = useState('');

    const handleSave = async () => {
        if (!number) {
            alert('Please enter your account number');
            return;
        }
        setSaving(true);
        await new Promise(r => setTimeout(r, 1000));
        setSaving(false);
        alert('Payout method saved!');
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
                    <Wallet size={28} />
                    Payout Methods
                </h1>
                <p style={{ color: '#64748b', fontSize: '15px' }}>
                    Set up how you want to receive your earnings.
                </p>
            </header>

            <div style={{
                background: 'white',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                padding: '32px'
            }}>
                {/* Provider Selection */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '12px'
                    }}>Payment Provider</label>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {[
                            { value: 'mtn', label: 'MTN MoMo', color: '#ffc107' },
                            { value: 'vodafone', label: 'Vodafone Cash', color: '#e60000' },
                            { value: 'airteltigo', label: 'AirtelTigo', color: '#004c99' },
                            { value: 'bank', label: 'Bank Transfer', color: '#0f172a' },
                        ].map((p) => (
                            <button
                                key={p.value}
                                type="button"
                                onClick={() => setProvider(p.value)}
                                style={{
                                    flex: '1 1 calc(50% - 6px)',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: provider === p.value ? `2px solid ${p.color}` : '2px solid #e2e8f0',
                                    background: provider === p.value ? `${p.color}10` : 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    justifyContent: 'center'
                                }}
                            >
                                {p.value === 'bank' ? <Building2 size={18} /> : <Smartphone size={18} />}
                                <span style={{ fontWeight: '600', color: '#334155' }}>{p.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Account Number */}
                <div style={{ marginBottom: '28px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '8px'
                    }}>
                        {provider === 'bank' ? 'Account Number' : 'Phone Number'}
                    </label>
                    <input
                        type="tel"
                        placeholder={provider === 'bank' ? '0123456789' : '024 XXX XXXX'}
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            fontSize: '15px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                {provider === 'bank' && (
                    <div style={{ marginBottom: '28px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#334155',
                            marginBottom: '8px'
                        }}>Bank Name</label>
                        <select style={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            fontSize: '15px',
                            background: 'white',
                            boxSizing: 'border-box'
                        }}>
                            <option>Select Bank</option>
                            <option>GCB Bank</option>
                            <option>Ecobank</option>
                            <option>Stanbic Bank</option>
                            <option>Fidelity Bank</option>
                            <option>CalBank</option>
                            <option>Access Bank</option>
                            <option>Zenith Bank</option>
                        </select>
                    </div>
                )}

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
                        background: saving ? '#94a3b8' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '14px',
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: saving ? 'not-allowed' : 'pointer'
                    }}
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save Payout Method'}
                </button>
            </div>
        </div>
    );
}
