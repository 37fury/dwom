'use client';

import { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { login, signup } from './actions';
import styles from './login.module.css';

interface LoginFormProps {
    redirectTo?: string;
    message?: string;
}

export default function LoginForm({ redirectTo, message }: LoginFormProps) {
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(message || null);
    const [isLoading, setIsLoading] = useState(false);
    const captchaRef = useRef<HCaptcha>(null);

    const handleSubmit = async (formData: FormData, action: 'login' | 'signup') => {
        if (!captchaToken) {
            setError('Please complete the captcha');
            return;
        }

        setIsLoading(true);
        setError(null);

        formData.append('captchaToken', captchaToken);

        try {
            if (action === 'login') {
                await login(formData);
            } else {
                await signup(formData);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            captchaRef.current?.resetCaptcha();
            setCaptchaToken(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {error && (
                <div className={styles.errorMessage}>
                    {error}
                </div>
            )}

            <form>
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className={styles.input}
                        placeholder="name@example.com"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className={styles.input}
                        placeholder="••••••••"
                    />
                </div>
                {redirectTo && (
                    <input type="hidden" name="redirect" value={redirectTo} />
                )}

                {/* hCaptcha Widget */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                    <HCaptcha
                        ref={captchaRef}
                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
                        onVerify={(token) => setCaptchaToken(token)}
                        onExpire={() => setCaptchaToken(null)}
                        theme="dark"
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        type="submit"
                        formAction={(formData) => handleSubmit(formData, 'login')}
                        className={styles.buttonPrimary}
                        disabled={isLoading || !captchaToken}
                        style={{ opacity: !captchaToken ? 0.6 : 1 }}
                    >
                        {isLoading ? 'Signing in...' : 'Log in'}
                    </button>
                    <button
                        type="submit"
                        formAction={(formData) => handleSubmit(formData, 'signup')}
                        className={styles.buttonSecondary}
                        disabled={isLoading || !captchaToken}
                        style={{ opacity: !captchaToken ? 0.6 : 1 }}
                    >
                        {isLoading ? 'Creating...' : 'Create Account'}
                    </button>
                </div>
                <a href="/forgot-password" style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '16px',
                    fontSize: '14px',
                    color: '#f97316',
                    textDecoration: 'none'
                }}>
                    Forgot Password?
                </a>
            </form>
        </>
    );
}
