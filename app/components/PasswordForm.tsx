'use client';

import { useState } from 'react';
import { changePasswordAction } from '../dashboard/(buyer)/settings/actions';
import { Lock, Key, Eye, EyeOff, Check, AlertCircle, ShieldCheck } from 'lucide-react';

export default function PasswordForm() {
    const [message, setMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsSaving(true);
        setMessage('');

        const result = await changePasswordAction(formData);

        setIsSaving(false);
        if (result.success) {
            setMessage('Password updated successfully!');
            (document.getElementById('password-form') as HTMLFormElement).reset();
        } else {
            setMessage(result.error || 'Failed to update password.');
        }
    };

    return (
        <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0'
        }}>
            <form id="password-form" action={handleSubmit}>
                {/* Security Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                    }}>
                        <ShieldCheck size={24} color="white" />
                    </div>
                    <div>
                        <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '15px' }}>
                            Keep your account secure
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                            Use a strong password with at least 6 characters
                        </div>
                    </div>
                </div>

                {/* New Password Field */}
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="newPassword" style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#334155',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        New Password
                    </label>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#94a3b8'
                        }}>
                            <Key size={18} />
                        </div>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type={showPassword ? 'text' : 'password'}
                            required
                            minLength={6}
                            placeholder="Enter new password"
                            style={{
                                width: '100%',
                                padding: '14px 48px 14px 44px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                fontSize: '15px',
                                transition: 'all 0.2s'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#94a3b8',
                                padding: '4px'
                            }}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password Field */}
                <div style={{ marginBottom: '24px' }}>
                    <label htmlFor="confirmPassword" style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#334155',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Confirm New Password
                    </label>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#94a3b8'
                        }}>
                            <Lock size={18} />
                        </div>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirm ? 'text' : 'password'}
                            required
                            minLength={6}
                            placeholder="Confirm new password"
                            style={{
                                width: '100%',
                                padding: '14px 48px 14px 44px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                fontSize: '15px',
                                transition: 'all 0.2s'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            style={{
                                position: 'absolute',
                                right: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#94a3b8',
                                padding: '4px'
                            }}
                        >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Message */}
                {message && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        background: message.includes('success') ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                        border: message.includes('success') ? '1px solid #bbf7d0' : '1px solid #fecaca',
                        color: message.includes('success') ? '#166534' : '#dc2626',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        {message.includes('success') ? <Check size={18} /> : <AlertCircle size={18} />}
                        {message}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSaving}
                    style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        color: 'white',
                        padding: '14px 24px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        fontSize: '15px',
                        border: 'none',
                        cursor: isSaving ? 'not-allowed' : 'pointer',
                        opacity: isSaving ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                    }}
                >
                    <Lock size={18} />
                    {isSaving ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </div>
    );
}
