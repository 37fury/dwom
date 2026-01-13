import { Referral } from '../lib/db';

export default function ReferralTable({ referrals }: { referrals: Referral[] }) {
    return (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <tr>
                        <th style={{ padding: '16px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>User</th>
                        <th style={{ padding: '16px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Date</th>
                        <th style={{ padding: '16px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Status</th>
                        <th style={{ padding: '16px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600', textAlign: 'right' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {referrals.map((ref, i) => (
                        <tr key={i} style={{ borderBottom: i === referrals.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                            <td style={{ padding: '16px', fontWeight: '500', color: '#0f172a' }}>{ref.user}</td>
                            <td style={{ padding: '16px', color: '#64748b' }}>{ref.date}</td>
                            <td style={{ padding: '16px' }}>
                                <span style={{
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    background: ref.status === 'Paid' ? '#dcfce7' : '#fff7ed',
                                    color: ref.status === 'Paid' ? '#166534' : '#c2410c'
                                }}>
                                    {ref.status}
                                </span>
                            </td>
                            <td style={{ padding: '16px', textAlign: 'right', fontWeight: '500', color: '#0f172a' }}>
                                GH₵{ref.amount.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                    {referrals.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>No referrals yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
