import Sidebar from '../components/Sidebar';
import styles from './dashboard.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.main}>
                <header className={styles.header}>
                    <h1 className={styles.pageTitle}>Dashboard</h1>
                    <div className={styles.userMenu}>DW</div>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}
