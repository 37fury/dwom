import { db } from '@/app/lib/db';
import AdminProductsClient from './AdminProductsClient';

export default async function AdminProductsPage() {
    const products = await db.getAllProducts();

    return <AdminProductsClient products={products} />;
}
