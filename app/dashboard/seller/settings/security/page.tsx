'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Save, Key, Smartphone, Eye, EyeOff, Lock } from 'lucide-react';

export default function SecurityPage() {
    const [saving, setSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 1000));
        setSaving(false);
        alert('Security settings saved!');
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
                    <Shield size={28} />
                    Security & Privacy
                </h1>
                <p style={{ color: '#64748b', fontSize: '15px' }}>
                    Keep your account secure with these settings.
                </p>
            </header>

            {/* Two-Factor Auth Card */}
            <div style={{
                background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                borderRadius: '20px',
                border: '1px solid #bae6fd',
                padding: '24px',
                marginBottom: '24px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: '#0ea5e9',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <Smartphone size={22} />
                    </div>
                    <div>
                        <div style={{ fontWeight: '700', color: '#0c4a6e', marginBottom: '2px' }}>
                            Two-Factor Authentication
                        </div>
                        <div style={{ fontSize: '13px', color: '#0369a1' }}>
                            Add extra security to your account
                        </div>
                    </div>
                </div>
                <button style={{
                    width: '100%',
                    padding: '14px',
                    background: '#0ea5e9',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                }}>
                    <Key size={16} />
                    Enable 2FA
                </button>
            </div>

            {/* Change Password */}
            <div style={{
                background: 'white',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                padding: '32px',
                marginBottom: '24px'
            }}>
                <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px'
                }}>
                    <Lock size={18} />
                    Change Password
                </h3>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '8px'
                    }}>Current Password</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter current password"
                            style={{
                                width: '100%',
                                padding: '14px 50px 14px 16px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                fontSize: '15px',
                                boxSizing: 'border-box'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                color: '#64748b',
                                cursor: 'pointer'
                            }}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '8px'
                    }}>New Password</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
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

                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '8px'
                    }}>Confirm New Password</label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
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
                    {saving ? 'Updating...' : 'Update Password'}
                </button>
            </div>

            {/* Danger Zone */}
            <div style={{
                background: '#fef2f2',
                borderRadius: '16px',
                border: '1px solid #fecaca',
                padding: '20px'
            }}>
                <div style={{ fontWeight: '600', color: '#991b1b', marginBottom: '8px' }}>Danger Zone</div>
                <p style={{ fontSize: '13px', color: '#b91c1c', marginBottom: '16px' }}>
                    Delete your account and all associated data. This action cannot be undone.
                </p>
                <button style={{
                    padding: '12px 20px',
                    background: 'white',
                    border: '1px solid #fca5a5',
                    borderRadius: '10px',
                    color: '#dc2626',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}>
                    Delete Account
                </button>
            </div>
        </div>
    );
}
