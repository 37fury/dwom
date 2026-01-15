'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { confirmPasswordReset } from '../forgot-password/actions';
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        const result = await confirmPasswordReset(formData);

        setIsLoading(false);
        if (result.success) {
            setSuccess(true);
            setTimeout(() => router.push('/login'), 2000);
        } else {
            setError(result.error || 'Failed to reset password');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                background: 'white',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)'
            }}>
                {!success ? (
                    <>
                        <h1 style={{
                            fontSize: '28px',
                            fontWeight: '800',
                            color: '#0f172a',
                            marginBottom: '8px'
                        }}>
                            Create New Password
                        </h1>
                        <p style={{
                            color: '#64748b',
                            fontSize: '15px',
                            marginBottom: '32px'
                        }}>
                            Your new password must be at least 6 characters.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: '#334155',
                                    marginBottom: '8px',
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
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                        style={{
                                            width: '100%',
                                            padding: '14px 48px 14px 44px',
                                            borderRadius: '12px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '15px'
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
                                            color: '#94a3b8'
                                        }}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: '#334155',
                                    marginBottom: '8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Confirm Password
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
                                        type={showPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px 14px 44px',
                                            borderRadius: '12px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '15px'
                                        }}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div style={{
                                    padding: '12px 16px',
                                    background: '#fef2f2',
                                    border: '1px solid #fecaca',
                                    borderRadius: '10px',
                                    color: '#dc2626',
                                    fontSize: '14px',
                                    marginBottom: '20px'
                                }}>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    opacity: isLoading ? 0.7 : 1,
                                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                                }}
                            >
                                {isLoading ? 'Updating...' : 'Reset Password'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
                        }}>
                            <CheckCircle size={32} color="white" />
                        </div>
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#0f172a',
                            marginBottom: '12px'
                        }}>
                            Password Updated!
                        </h2>
                        <p style={{
                            color: '#64748b',
                            fontSize: '15px',
                            marginBottom: '24px'
                        }}>
                            Redirecting you to login...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
