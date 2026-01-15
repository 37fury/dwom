'use client';

import { useState } from 'react';
import { uploadFile } from '@/app/lib/storage';
import { createProductAction } from './actions';

export default function ProductForm() {
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [productType, setProductType] = useState('course');

    async function handleSubmit(formData: FormData) {
        setUploading(true);
        try {
            let imageUrl = '';

            if (imageFile) {
                const { url, error } = await uploadFile('product-media', imageFile);
                if (error) {
                    alert('Image upload failed: ' + error);
                    setUploading(false);
                    return;
                }
                imageUrl = url;
            }

            // Call Server Action with form data and the uploaded image URL
            await createProductAction(formData, imageUrl);

        } catch (err) {
            console.error(err);
            alert('Failed to create product');
            setUploading(false);
        }
    }

    return (
        <form action={handleSubmit} style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
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

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>Product Type</label>
                <select
                    name="productType"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}
                >
                    <option value="course">Online Course</option>
                    <option value="software">Software / License Key</option>
                    <option value="community">Community Access</option>
                </select>
            </div>

            {
                productType === 'software' && (
                    <div style={{ marginBottom: '20px', padding: '16px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                        <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600', color: '#0369a1', marginBottom: '8px' }}>License Keys (One per line)</label>
                        <textarea
                            name="licenseKeys"
                            rows={5}
                            placeholder={'KEY-1234-5678\nKEY-ABCD-EFGH\n...'}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #7dd3fc', fontFamily: 'monospace' }}
                        />
                        <p style={{ fontSize: '12px', color: '#0c4a6e', marginTop: '8px' }}>
                            These keys will be automatically distributed to buyers after purchase. One key per customer working down the list.
                        </p>
                    </div>
                )
            }

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>Product Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>Product Demo Video (Optional URL)</label>
                <input name="videoUrl" type="url" placeholder="https://www.youtube.com/watch?v=..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>Description</label>
                <textarea name="description" required rows={4} placeholder="Describe what you are selling..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <button type="submit" disabled={uploading} style={{ width: '100%', padding: '14px', background: uploading ? '#94a3b8' : '#0f172a', color: 'white', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: uploading ? 'not-allowed' : 'pointer' }}>
                {uploading ? 'Uploading...' : 'Create Product'}
            </button>
        </form >
    );
}
