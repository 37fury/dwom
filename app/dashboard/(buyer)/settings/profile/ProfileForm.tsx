'use client';

import { useState } from 'react';
import { updateProfileAction } from './actions';
import { User } from '@/app/lib/db';

export default function ProfileForm({ user }: { user: User }) {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setMsg('');

        const res = await updateProfileAction(formData);
        setLoading(false);

        if (res.success) {
            setMsg('✅ Profile updated successfully!');
        } else {
            setMsg(`❌ Error: ${res.error}`);
        }
    }

    return (
        <form action={handleSubmit} style={{ maxWidth: '600px' }}>
            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
                <input
                    name="full_name"
                    defaultValue={user.name}
                    required
                    className="input"
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
            </div>

            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Username (dwom.com/store/...)
                </label>
                <input
                    name="username"
                    defaultValue={user.username || ''}
                    required
                    placeholder="e.g. koficodes"
                    className="input"
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                    This will be your public store URL.
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Bio</label>
                <textarea
                    name="bio"
                    defaultValue={user.bio || ''}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="input"
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Social Links</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px' }}>Twitter / X</label>
                    <input name="twitter" defaultValue={user.socialLinks?.twitter || ''} placeholder="@username" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px' }}>Instagram</label>
                    <input name="instagram" defaultValue={user.socialLinks?.instagram || ''} placeholder="@username" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px' }}>YouTube</label>
                    <input name="youtube" defaultValue={user.socialLinks?.youtube || ''} placeholder="Channel URL" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px' }}>Website</label>
                    <input name="website" defaultValue={user.socialLinks?.website || ''} placeholder="https://" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
            </div>

            <div style={{ marginBottom: '24px', marginTop: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Banner Image URL</label>
                <input
                    name="banner_url"
                    defaultValue={user.bannerUrl || ''}
                    placeholder="https://imgur.com/..."
                    className="input"
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                    Paste a direct image link for now.
                </div>
            </div>

            {msg && <div style={{ padding: '12px', background: msg.includes('Error') ? '#fee2e2' : '#dcfce7', color: msg.includes('Error') ? '#991b1b' : '#166534', borderRadius: '6px', marginBottom: '16px' }}>{msg}</div>}

            <button
                type="submit"
                disabled={loading}
                style={{
                    padding: '12px 24px', background: 'black', color: 'white',
                    border: 'none', borderRadius: '6px', fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1
                }}
            >
                {loading ? 'Saving...' : 'Save Profile'}
            </button>
        </form>
    );
}
