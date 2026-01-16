import Link from 'next/link';
import { ArrowLeft, CreditCard, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function AdminPayoutsPage() {
    // Mock payout requests
    const payouts = [
        { id: '1', seller: 'Kofi Mensah', amount: 450, method: 'MTN MoMo', status: 'pending', date: '2024-01-15' },
        { id: '2', seller: 'Ama Osei', amount: 1200, method: 'Vodafone Cash', status: 'pending', date: '2024-01-14' },
        { id: '3', seller: 'Yaw Asante', amount: 320, method: 'Bank Transfer', status: 'completed', date: '2024-01-12' },
    ];

    return (
        <div style={{ maxWidth: '1200px' }}>
            <Link href="/dashboard/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', fontSize: '14px', marginBottom: '24px' }}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    <CreditCard size={28} />
                    Payout Requests
                </h1>
                <p style={{ fontSize: '15px', color: '#64748b' }}>Review and process seller payout requests</p>
            </header>

            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
                {payouts.map((payout, idx) => (
                    <div key={payout.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', borderBottom: idx < payouts.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <CreditCard size={20} />
                            </div>
                            <div>
                                <p style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>{payout.seller}</p>
                                <p style={{ fontSize: '13px', color: '#64748b' }}>{payout.method} • {payout.date}</p>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <div>
                                <p style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>GH₵{payout.amount}</p>
                                <span style={{ padding: '4px 10px', background: payout.status === 'pending' ? '#fef3c7' : '#dcfce7', color: payout.status === 'pending' ? '#d97706' : '#16a34a', borderRadius: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
                                    {payout.status}
                                </span>
                            </div>
                            {payout.status === 'pending' && (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button style={{ padding: '10px 16px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                                        Approve
                                    </button>
                                    <button style={{ padding: '10px 16px', background: 'white', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
