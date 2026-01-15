import { db } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import ProfileForm from './ProfileForm';

export default async function ProfileSettingsPage() {
    const user = await db.getUser();
    if (!user) redirect('/login');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '48px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Store Profile 🏪</h1>
            <p style={{ color: '#666', marginBottom: '32px' }}>
                Customize how your store looks to the world.
            </p>

            <ProfileForm user={user} />
        </div>
    );
}
