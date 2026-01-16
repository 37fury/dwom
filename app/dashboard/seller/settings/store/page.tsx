'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Store, Upload, Save } from 'lucide-react';

export default function StoreProfilePage() {
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        // Simulate save
        await new Promise(r => setTimeout(r, 1000));
        setSaving(false);
        alert('Store profile saved!');
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
                    <Store size={28} />
                    Store Profile
                </h1>
                <p style={{ color: '#64748b', fontSize: '15px' }}>
                    Customize how your store appears to customers.
                </p>
            </header>

            <div style={{
                background: 'white',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                padding: '32px'
            }}>
                {/* Store Logo */}
                <div style={{ marginBottom: '28px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '12px'
                    }}>Store Logo</label>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '28px',
                            fontWeight: '700'
                        }}>
                            D
                        </div>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 20px',
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            color: '#334155',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            <Upload size={16} />
                            Upload Logo
                        </button>
                    </div>
                </div>

                {/* Store Name */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '8px'
                    }}>Store Name</label>
                    <input
                        type="text"
                        placeholder="Your Store Name"
                        defaultValue=""
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

                {/* Store Username/URL */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '8px'
                    }}>Store URL</label>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden'
                    }}>
                        <span style={{
                            padding: '14px 16px',
                            background: '#f8fafc',
                            color: '#64748b',
                            fontSize: '15px',
                            borderRight: '1px solid #e2e8f0'
                        }}>dwom.store/</span>
                        <input
                            type="text"
                            placeholder="yourstore"
                            style={{
                                flex: 1,
                                padding: '14px 16px',
                                border: 'none',
                                fontSize: '15px',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                {/* Store Description */}
                <div style={{ marginBottom: '28px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '8px'
                    }}>Store Description</label>
                    <textarea
                        rows={4}
                        placeholder="Tell customers about your store..."
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            fontSize: '15px',
                            resize: 'vertical',
                            boxSizing: 'border-box'
                        }}
                    />
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
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}
