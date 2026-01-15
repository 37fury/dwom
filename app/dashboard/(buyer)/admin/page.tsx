import { db } from '@/app/lib/db';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AdminView from './AdminView';

export default async function AdminPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const ADMIN_EMAILS = ['deezyweezy@gmail.com', 'admin@dwom.com', 'user@example.com', 'adapt365@gmail.com']; // Temporary allowlist
    // Note: user@example.com added for testing if you are using that.

    if (!ADMIN_EMAILS.includes(user.email || '')) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Access Denied 🛡️</h1>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }

    // Parallel fetching
    const [pendingVerifications, pendingCrypto, pendingPayouts, users] = await Promise.all([
        db.getPendingVerifications(),
        db.getPendingCryptoOrders(),
        db.getPendingPayouts(),
        db.getAllUsers()
    ]);

    return (
        <AdminView
            pendingCrypto={pendingCrypto}
            pendingPayouts={pendingPayouts}
            pendingVerifications={pendingVerifications}
            users={users}
        />
    );
}
