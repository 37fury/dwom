import { redirect } from 'next/navigation';
import { getAdminUser } from '@/app/admin/login/actions';
import AdminSidebar from './AdminSidebar';
import styles from './admin-layout.module.css';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const adminUser = await getAdminUser();

    if (!adminUser) {
        redirect('/admin/login');
    }

    return (
        <div className={styles.container}>
            <AdminSidebar userEmail={adminUser.email || ''} />
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
