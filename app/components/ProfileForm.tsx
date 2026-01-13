'use client';

import { useState } from 'react';
import { db } from '../lib/db';

export default function ProfileForm({ user }: { user: any }) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        // Simulate server action
        const success = await db.updateProfile(user.id, { name, email });

        setIsSaving(false);
        if (success) {
            setMessage('Profile updated successfully!');
        } else {
            setMessage('Failed to update profile.');
        }
    };

    return (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>Profile Details</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#475569' }}>Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#475569' }}>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                </div>

                {message && <p style={{ color: message.includes('success') ? 'green' : 'red', fontSize: '14px', marginBottom: '16px' }}>{message}</p>}

                <button
                    type="submit"
                    disabled={isSaving}
                    style={{
                        background: '#0f172a',
                        color: 'white',
                        padding: '10px 24px',
                        borderRadius: '8px',
                        fontWeight: '500',
                        fontSize: '14px',
                        border: 'none',
                        cursor: isSaving ? 'not-allowed' : 'pointer',
                        opacity: isSaving ? 0.7 : 1
                    }}
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}
