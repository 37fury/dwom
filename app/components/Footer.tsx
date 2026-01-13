import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.brand}>dwom</Link>
                        <p className={styles.tagline}>Empowering African creators.</p>
                    </div>
                    <div className={styles.links}>
                        <div className={styles.column}>
                            <h4>Discover</h4>
                            <Link href="#">Trading</Link>
                            <Link href="#">Sports</Link>
                            <Link href="#">Software</Link>
                        </div>
                        <div className={styles.column}>
                            <h4>Sell</h4>
                            <Link href="#">Pricing</Link>
                            <Link href="#">Features</Link>
                            <Link href="#">Affiliates</Link>
                        </div>
                        <div className={styles.column}>
                            <h4>Support</h4>
                            <Link href="#">Help Center</Link>
                            <Link href="#">Terms</Link>
                            <Link href="#">Privacy</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>&copy; 2024 dwom Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
