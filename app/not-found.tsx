import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function NotFound() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#020617', color: 'white' }}>
            <Navbar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
                <h1 style={{ fontSize: '120px', fontWeight: 'bold', margin: 0, background: 'linear-gradient(to right, #fb923c, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
                <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Page Not Found</h2>
                <p style={{ color: '#94a3b8', maxWidth: '400px', marginBottom: '32px' }}>
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>
                <Link href="/" style={{ padding: '12px 24px', background: 'white', color: 'black', borderRadius: '8px', fontWeight: '600', textDecoration: 'none' }}>
                    Return Home
                </Link>
            </div>
            <Footer />
        </div>
    );
}
