import Link from 'next/link';
import { ArrowLeft, Settings, Shield, Bell, Globe } from 'lucide-react';

export default function AdminSettingsPage() {
    return (
        <div style={{ maxWidth: '800px' }}>
            <Link href="/dashboard/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', fontSize: '14px', marginBottom: '24px' }}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    <Settings size={28} />
                    Platform Settings
                </h1>
                <p style={{ fontSize: '15px', color: '#64748b' }}>Configure platform-wide settings</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(220, 38, 38, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                        <Shield size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Security Settings</h3>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Manage admin access and 2FA</p>
                    </div>
                    <button style={{ padding: '10px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                        Configure
                    </button>
                </div>

                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                        <Bell size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Notification Settings</h3>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Configure admin alerts and notifications</p>
                    </div>
                    <button style={{ padding: '10px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                        Configure
                    </button>
                </div>

                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
                        <Globe size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Platform Configuration</h3>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Fees, currencies, and general settings</p>
                    </div>
                    <button style={{ padding: '10px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                        Configure
                    </button>
                </div>
            </div>
        </div>
    );
}
