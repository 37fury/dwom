import { db } from '../../../lib/db';
import CustomerList from '../../../components/CustomerList';

export default async function CustomersPage() {
    // In a real app we'd get the logged in userId
    const customers = await db.getCustomers('u1');

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Customers</h1>
                <p style={{ color: '#64748b' }}>Manage your students and customers.</p>
            </div>

            <CustomerList customers={customers} />
        </div>
    );
}
