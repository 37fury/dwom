'use client';

import { useState } from 'react';
import { Shield, Smartphone, Check, X, RefreshCw } from 'lucide-react';
import styles from './TwoFactorAuth.module.css';

interface TwoFactorAuthProps {
    isEnabled: boolean;
    onEnable: (code: string) => Promise<{ success: boolean; error?: string }>;
    onDisable: (code: string) => Promise<{ success: boolean; error?: string }>;
    onGenerateSecret: () => Promise<{ secret: string; qrCode: string }>;
}

export default function TwoFactorAuth({
    isEnabled,
    onEnable,
    onDisable,
    onGenerateSecret
}: TwoFactorAuthProps) {
    const [showSetup, setShowSetup] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleStartSetup = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await onGenerateSecret();
            setSecret(result.secret);
            setQrCode(result.qrCode);
            setShowSetup(true);
        } catch (err) {
            setError('Failed to generate 2FA secret');
        }
        setLoading(false);
    };

    const handleEnable = async () => {
        if (code.length !== 6) {
            setError('Please enter a 6-digit code');
            return;
        }
        setLoading(true);
        setError('');
        const result = await onEnable(code);
        if (result.success) {
            setSuccess('2FA enabled successfully!');
            setShowSetup(false);
            setCode('');
        } else {
            setError(result.error || 'Invalid code');
        }
        setLoading(false);
    };

    const handleDisable = async () => {
        if (code.length !== 6) {
            setError('Please enter your 2FA code to disable');
            return;
        }
        setLoading(true);
        setError('');
        const result = await onDisable(code);
        if (result.success) {
            setSuccess('2FA disabled');
            setCode('');
        } else {
            setError(result.error || 'Invalid code');
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <Shield size={24} />
                </div>
                <div>
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                </div>
                <span className={`${styles.status} ${isEnabled ? styles.enabled : styles.disabled}`}>
                    {isEnabled ? 'Enabled' : 'Disabled'}
                </span>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            {!isEnabled && !showSetup && (
                <button
                    className={styles.enableBtn}
                    onClick={handleStartSetup}
                    disabled={loading}
                >
                    {loading ? <RefreshCw className={styles.spin} size={18} /> : <Shield size={18} />}
                    Enable 2FA
                </button>
            )}

            {showSetup && (
                <div className={styles.setup}>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <span className={styles.stepNum}>1</span>
                            <div>
                                <h4>Scan QR Code</h4>
                                <p>Use an authenticator app like Google Authenticator or Authy</p>
                            </div>
                        </div>

                        <div className={styles.qrContainer}>
                            {qrCode ? (
                                <img src={qrCode} alt="2FA QR Code" className={styles.qrCode} />
                            ) : (
                                <div className={styles.qrPlaceholder}>
                                    <Smartphone size={48} />
                                </div>
                            )}
                        </div>

                        <div className={styles.secretKey}>
                            <span>Manual entry key:</span>
                            <code>{secret}</code>
                        </div>

                        <div className={styles.step}>
                            <span className={styles.stepNum}>2</span>
                            <div>
                                <h4>Enter Verification Code</h4>
                                <p>Enter the 6-digit code from your authenticator app</p>
                            </div>
                        </div>

                        <div className={styles.codeInput}>
                            <input
                                type="text"
                                maxLength={6}
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                placeholder="000000"
                            />
                        </div>

                        <div className={styles.actions}>
                            <button
                                className={styles.cancelBtn}
                                onClick={() => { setShowSetup(false); setCode(''); setError(''); }}
                            >
                                Cancel
                            </button>
                            <button
                                className={styles.confirmBtn}
                                onClick={handleEnable}
                                disabled={loading || code.length !== 6}
                            >
                                {loading ? 'Verifying...' : 'Enable 2FA'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isEnabled && (
                <div className={styles.disableSection}>
                    <p>Enter your 2FA code to disable two-factor authentication:</p>
                    <div className={styles.disableForm}>
                        <input
                            type="text"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="000000"
                        />
                        <button
                            onClick={handleDisable}
                            disabled={loading || code.length !== 6}
                            className={styles.disableBtn}
                        >
                            {loading ? 'Verifying...' : 'Disable 2FA'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
