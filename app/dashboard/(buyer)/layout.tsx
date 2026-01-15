import Sidebar from '../../components/Sidebar';
import styles from '../dashboard.module.css';
import { db } from '../../lib/db';
import Link from 'next/link';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await db.getUser();

    // Generate initials from user name
    const getInitials = (name: string) => {
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const initials = user?.name ? getInitials(user.name) : 'U';

    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.main}>
                <header className={styles.header}>
                    <h1 className={styles.pageTitle}>Dashboard</h1>
                    <Link href="/dashboard/settings" className={styles.userMenu}>
                        {initials}
                    </Link>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}
