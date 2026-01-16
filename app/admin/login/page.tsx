import Link from 'next/link';
import { adminLogin } from './actions';
import styles from './admin-login.module.css';
import { Shield, Lock, Mail, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function AdminLoginPage({
    searchParams
}: {
    searchParams: { error?: string }
}) {
    const error = searchParams.error;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Link href="/" className={styles.backLink}>
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                        <Shield size={32} />
                    </div>
                    <h1 className={styles.title}>Admin Access</h1>
                    <p className={styles.subtitle}>
                        Authorized personnel only. This login is for dwom administrators.
                    </p>
                </div>

                {error && (
                    <div className={styles.errorBox}>
                        <AlertTriangle size={18} />
                        <span>
                            {error === 'unauthorized'
                                ? 'Access denied. This account is not authorized for admin access.'
                                : error}
                        </span>
                    </div>
                )}

                <form action={adminLogin} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <Mail size={16} />
                            Admin Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="admin@dwom.store"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <Lock size={16} />
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            className={styles.input}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        <Lock size={18} />
                        Access Admin Dashboard
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>Not an admin? <Link href="/login">Regular login</Link></p>
                </div>
            </div>
        </div>
    );
}
