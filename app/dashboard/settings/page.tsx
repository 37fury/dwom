import { db } from '../../lib/db';
import ProfileForm from '../../components/ProfileForm';
import VerificationForm from '../../components/VerificationForm';

export default async function SettingsPage() {
    const user = await db.getUser();

    return (
        <div style={{ maxWidth: '800px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Settings</h1>
                <p style={{ color: '#64748b' }}>Manage your profile and payment details.</p>
            </div>

            <div style={{ display: 'grid', gap: '32px' }}>
                <ProfileForm user={user} />
                <VerificationForm user={user} />
            </div>
        </div>
    );
}
