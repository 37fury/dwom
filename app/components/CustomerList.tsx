'use client';

import { Customer } from '../lib/db';

export default function CustomerList({ customers }: { customers: Customer[] }) {
    if (!customers || customers.length === 0) {
        return (
            <div style={{ padding: '32px', textAlign: 'center', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b' }}>No customers found.</p>
            </div>
        );
    }

    return (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                        <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>Name</th>
                        <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>Email</th>
                        <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>Total Spent</th>
                        <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>Products</th>
                        <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <td style={{ padding: '16px', color: '#0f172a', fontWeight: '500' }}>{customer.name}</td>
                            <td style={{ padding: '16px', color: '#64748b' }}>{customer.email}</td>
                            <td style={{ padding: '16px', color: '#0f172a' }}>GH₵ {customer.totalSpent.toFixed(2)}</td>
                            <td style={{ padding: '16px', color: '#64748b' }}>{customer.productsPurchased}</td>
                            <td style={{ padding: '16px', color: '#64748b' }}>{customer.joinedDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
