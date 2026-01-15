'use client';

import { useState } from 'react';
import Link from 'next/link';
import { requestPasswordReset } from './actions';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.set('email', email);

        const result = await requestPasswordReset(formData);

        setIsLoading(false);
        if (result.success) {
            setSubmitted(true);
            setMessage(result.message || '');
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
                {!submitted ? (
                    <>
                        <Link href="/login" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#64748b',
                            fontSize: '14px',
                            marginBottom: '24px',
                            textDecoration: 'none'
                        }}>
                            <ArrowLeft size={16} />
                            Back to Login
                        </Link>

                        <h1 style={{
                            fontSize: '28px',
                            fontWeight: '800',
                            color: '#0f172a',
                            marginBottom: '8px'
                        }}>
                            Forgot Password?
                        </h1>
                        <p style={{
                            color: '#64748b',
                            fontSize: '15px',
                            marginBottom: '32px'
                        }}>
                            No worries! Enter your email and we'll send you a reset link.
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
                                    Email Address
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8'
                                    }}>
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
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

                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    opacity: isLoading ? 0.7 : 1
                                }}
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Link'}
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
                            Check Your Email
                        </h2>
                        <p style={{
                            color: '#64748b',
                            fontSize: '15px',
                            marginBottom: '24px'
                        }}>
                            {message}
                        </p>
                        <Link href="/login" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#f97316',
                            fontSize: '14px',
                            fontWeight: '600',
                            textDecoration: 'none'
                        }}>
                            <ArrowLeft size={16} />
                            Back to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
