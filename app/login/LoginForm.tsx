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
    const [captchaToken, setCaptchaToken] = useState<string>('');
    const [error, setError] = useState<string | null>(message || null);
    const captchaRef = useRef<HCaptcha>(null);

    const handleCaptchaVerify = (token: string) => {
        setCaptchaToken(token);
        setError(null);
    };

    const handleCaptchaExpire = () => {
        setCaptchaToken('');
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

                {/* Hidden captcha token for form submission */}
                <input type="hidden" name="captchaToken" value={captchaToken} />

                {/* hCaptcha Widget */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                    <HCaptcha
                        ref={captchaRef}
                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001'}
                        onVerify={handleCaptchaVerify}
                        onExpire={handleCaptchaExpire}
                        theme="light"
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        type="submit"
                        formAction={login}
                        className={styles.buttonPrimary}
                        disabled={!captchaToken}
                        style={{ opacity: !captchaToken ? 0.6 : 1 }}
                    >
                        Log in
                    </button>
                    <button
                        type="submit"
                        formAction={signup}
                        className={styles.buttonSecondary}
                        disabled={!captchaToken}
                        style={{ opacity: !captchaToken ? 0.6 : 1 }}
                    >
                        Create Account
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

