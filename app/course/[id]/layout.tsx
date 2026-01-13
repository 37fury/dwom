import { db } from '../../lib/db';
import CourseSidebar from '../../components/CourseSidebar';
import { notFound } from 'next/navigation';

export default async function CourseLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await db.getProduct(id);

    if (!product || !product.content) {
        notFound();
    }

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <CourseSidebar
                modules={product.content}
                productId={id}
            />
            <main style={{ flex: 1, overflowY: 'auto', background: 'white' }}>
                {children}
            </main>
        </div>
    );
}
