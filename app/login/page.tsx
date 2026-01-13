import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <Link href="/" className={styles.logo}>dwom</Link>
                <h1 className={styles.title}>Welcome back</h1>
                <p className={styles.subtitle}>Sign in to access your purchased products.</p>

                <div className={styles.actions}>
                    <button className={`${styles.btn} ${styles.btnGoogle}`}>
                        <img src="/google.svg" alt="G" className={styles.icon} />
                        Continue with Google
                    </button>
                    <button className={`${styles.btn} ${styles.btnEmail}`}>
                        Continue with Email
                    </button>
                </div>

                <p className={styles.disclaimer}>
                    By continuing, you agree to dwom's <Link href="#">Terms</Link> and <Link href="#">Privacy Policy</Link>.
                </p>
            </div>
        </main>
    );
}
