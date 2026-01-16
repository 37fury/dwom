import Link from 'next/link';
import { ArrowLeft, Users, Search, MoreVertical, Shield, Mail, Calendar } from 'lucide-react';

export default function AdminUsersPage() {
    // Mock users data
    const users = [
        { id: '1', name: 'Kofi Mensah', email: 'kofi@example.com', role: 'seller', status: 'verified', joined: '2024-01-10' },
        { id: '2', name: 'Ama Osei', email: 'ama@example.com', role: 'seller', status: 'pending', joined: '2024-01-12' },
        { id: '3', name: 'Yaw Asante', email: 'yaw@example.com', role: 'buyer', status: 'active', joined: '2024-01-08' },
        { id: '4', name: 'Akua Darko', email: 'akua@example.com', role: 'seller', status: 'verified', joined: '2024-01-05' },
    ];

    return (
        <div style={{ maxWidth: '1200px' }}>
            <Link href="/dashboard/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', fontSize: '14px', marginBottom: '24px' }}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    <Users size={28} />
                    User Management
                </h1>
                <p style={{ fontSize: '15px', color: '#64748b' }}>View and manage all platform users</p>
            </header>

            {/* Search Bar */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                    <Search size={18} style={{ color: '#94a3b8' }} />
                    <input type="text" placeholder="Search users..." style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
                </div>
            </div>

            {/* Users Table */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc' }}>
                            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>User</th>
                            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Role</th>
                            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Joined</th>
                            <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{user.name}</p>
                                            <p style={{ fontSize: '13px', color: '#64748b' }}>{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{ padding: '4px 10px', background: user.role === 'seller' ? '#dbeafe' : '#f3e8ff', color: user.role === 'seller' ? '#2563eb' : '#7c3aed', borderRadius: '6px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>
                                        {user.role}
                                    </span>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{ padding: '4px 10px', background: user.status === 'verified' ? '#dcfce7' : user.status === 'pending' ? '#fef3c7' : '#f1f5f9', color: user.status === 'verified' ? '#16a34a' : user.status === 'pending' ? '#d97706' : '#64748b', borderRadius: '6px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>
                                        {user.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>{user.joined}</td>
                                <td style={{ padding: '16px', textAlign: 'right' }}>
                                    <button style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
