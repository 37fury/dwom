import SellerSidebar from '../../components/SellerSidebar';

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: 'flex' }}>
            <SellerSidebar />
            <main style={{ flex: 1, padding: '32px', background: '#f8fafc', minHeight: '100vh' }}>
                {children}
            </main>
        </div>
    );
}
