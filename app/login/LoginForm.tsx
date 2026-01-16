'use client';

import { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Eye, EyeOff } from 'lucide-react';
import { login, signup } from './actions';
import styles from './login.module.css';

interface LoginFormProps {
    redirectTo?: string;
    message?: string;
}

export default function LoginForm({ redirectTo, message }: LoginFormProps) {
    const [captchaToken, setCaptchaToken] = useState<string>('');
    const [error, setError] = useState<string | null>(message || null);
    const [showPassword, setShowPassword] = useState(false);
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
                    <div style={{ position: 'relative' }}>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            className={styles.input}
                            placeholder="••••••••"
                            style={{ paddingRight: '48px' }}
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
                                cursor: 'pointer',
                                color: '#64748b',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
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

