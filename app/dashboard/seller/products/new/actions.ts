'use server';

import { db } from '../../../../lib/db';
import { redirect } from 'next/navigation';

export async function createProductAction(formData: FormData, imageUrl: string) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const currency = formData.get('currency') as string;
    const videoUrl = formData.get('videoUrl') as string;

    const productType = (formData.get('productType') as 'course' | 'software' | 'community') || 'course';
    const licenseKeysRaw = formData.get('licenseKeys') as string;

    const newProduct = await db.createProduct({
        title,
        description,
        price,
        currency, // was hardcoded to GHS, fixed
        image: imageUrl || '',
        commission: 0,
        category: 'misc',
        videoUrl,
        features: [],
        product_type: productType,
        download_url: ''
    });

    // If software and keys provided, add them
    if (productType === 'software' && licenseKeysRaw && newProduct.id) {
        const keys = licenseKeysRaw.split('\n').map(k => k.trim()).filter(k => k.length > 0);
        if (keys.length > 0) {
            await db.addLicenseKeys(newProduct.id, keys);
        }
    }

    redirect('/dashboard/seller/products');
}
