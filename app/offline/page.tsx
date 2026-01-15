'use client';

import Link from 'next/link';
import styles from '../dashboard/dashboard.module.css'; // Re-use simplified styles or inline

export default function OfflinePage() {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>You are offline 📶</h1>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>Please check your internet connection and try again.</p>
            <button
                onClick={() => window.location.reload()}
                style={{
                    padding: '12px 24px',
                    background: '#ff5f00',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                Retry
            </button>
        </div>
    );
}
