import { db } from '../../../../lib/db';
import { redirect } from 'next/navigation';

export default function NewProductPage() {

    async function createProductAction(formData: FormData) {
        'use server';

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const currency = formData.get('currency') as string;

        await db.createProduct({
            title,
            description,
            price,
            currency,
            image: '/placeholder.svg',
            features: ['Instant Access', 'Secure Payment']
        });

        redirect('/dashboard/seller/products');
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Create New Product</h1>

            <form action={createProductAction} style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>Product Title</label>
                    <input name="title" required type="text" placeholder="e.g. Masterclass: Intro to Forex" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                        <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>Price</label>
                        <input name="price" required type="number" placeholder="0.00" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>Currency</label>
                        <select name="currency" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}>
                            <option value="GH₵">GH₵ (Cedis)</option>
                            <option value="₦">₦ (Naira)</option>
                            <option value="$">USD</option>
                        </select>
                    </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>Description</label>
                    <textarea name="description" required rows={4} placeholder="Describe what you are selling..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>

                <button type="submit" style={{ width: '100%', padding: '14px', background: '#0f172a', color: 'white', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>
                    Create Product
                </button>
            </form>
        </div>
    );
}
