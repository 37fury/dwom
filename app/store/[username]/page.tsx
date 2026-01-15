import { db } from '../../lib/db';
import ProductCard from '../../components/ProductCard';
import Link from 'next/link';
import { BadgeCheck, Twitter, Instagram, Youtube, Globe, Frown } from 'lucide-react';

export default async function StorePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const profile = await db.getProfileByUsername(username);

    if (!profile) {
        return (
            <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                    <Frown size={48} color="#94a3b8" />
                </div>
                <h1>Store Not Found</h1>
                <p>The user @{username} does not exist.</p>
                <Link href="/" style={{ color: '#ff5f00', marginTop: '16px', display: 'inline-block' }}>Back Home</Link>
            </div>
        );
    }

    const products = await db.getUserProducts(profile.id);

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
            {/* Banner */}
            <div style={{
                height: '200px',
                background: profile.banner_url ? `url(${profile.banner_url}) center/cover` : 'linear-gradient(to right, #0f172a, #334155)',
                position: 'relative'
            }}>
            </div>

            <div className="container" style={{ position: 'relative', marginTop: '-60px', paddingBottom: '60px' }}>
                {/* Profile Header */}
                <div style={{
                    background: 'white', borderRadius: '16px', padding: '32px',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start'
                }}>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', width: '100%', flexWrap: 'wrap' }}>
                        {/* Avatar */}
                        <div style={{
                            width: '120px', height: '120px', borderRadius: '50%',
                            background: '#e2e8f0', border: '4px solid white',
                            overflow: 'hidden', flexShrink: 0
                        }}>
                            {/* Placeholder Avatar */}
                            <img
                                src={`https://ui-avatars.com/api/?name=${profile.full_name || username}&background=random&size=256`}
                                alt={username}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, paddingBottom: '12px' }}>
                            <h1 style={{ fontSize: '32px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {profile.full_name || username}
                                {profile.kyc_status === 'verified' && (
                                    <BadgeCheck size={28} color="#3b82f6" fill="#3b82f6" />
                                )}
                            </h1>
                            <p style={{ color: '#64748b', fontSize: '16px' }}>@{username}</p>
                        </div>

                        {/* Socials */}
                        <div style={{ display: 'flex', gap: '12px', paddingBottom: '12px' }}>
                            {profile.social_links?.twitter && <SocialLink href={`https://twitter.com/${profile.social_links.twitter.replace('@', '')}`} icon={<Twitter size={18} />} />}
                            {profile.social_links?.instagram && <SocialLink href={`https://instagram.com/${profile.social_links.instagram.replace('@', '')}`} icon={<Instagram size={18} />} />}
                            {profile.social_links?.youtube && <SocialLink href={profile.social_links.youtube} icon={<Youtube size={18} />} />}
                            {profile.social_links?.website && <SocialLink href={profile.social_links.website} icon={<Globe size={18} />} />}
                        </div>
                    </div>

                    {/* Bio */}
                    {profile.bio && (
                        <p style={{ maxWidth: '600px', lineHeight: '1.6', color: '#334155' }}>
                            {profile.bio}
                        </p>
                    )}
                </div>

                {/* Products Grid */}
                <div style={{ marginTop: '48px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Products</h2>

                    {products.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
                            No products listed yet.
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '24px'
                        }}>
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', color: '#475569', transition: 'background 0.2s'
            }}
        >
            {icon}
        </a>
    )
}

