'use client';

import { signout } from '@/app/login/actions';

export default function BannedPage() {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fef2f2',
            color: '#991b1b',
            fontFamily: 'sans-serif',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚫 Account Suspended</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '500px', marginBottom: '2rem' }}>
                Your account has been suspended due to a violation of our terms of service.
                If you believe this is a mistake, please contact support.
            </p>

            <form action={signout}>
                <button
                    style={{
                        padding: '12px 24px',
                        background: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    Sign Out
                </button>
            </form>
        </div>
    );
}
