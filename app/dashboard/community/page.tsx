import { db } from '../../lib/db';
import CommunityCard from '../../components/CommunityCard';

export default async function CommunityPage() {
    const user = await db.getUser();

    // Get all products the user has memberships for
    // In a real app we'd filter memberships where status is active
    const productIds = user.memberships.map(m => m.productId);

    // Fetch products to check for community links
    // This is inefficient in mock loop but fine for demo
    const products = (await Promise.all(
        productIds.map(id => db.getProduct(id))
    )).filter(p => p !== undefined);

    return (
        <div>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>My Communities</h1>
                <p style={{ color: '#64748b' }}>Access private groups for your products.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {products.map(product => {
                    if (!product) return null;
                    const items = [];

                    if (product.telegramUrl) {
                        items.push({ platform: 'telegram', url: product.telegramUrl });
                    }
                    if (product.whatsappUrl) {
                        items.push({ platform: 'whatsapp', url: product.whatsappUrl });
                    }
                    if (product.discordUrl) {
                        items.push({ platform: 'discord', url: product.discordUrl });
                    }

                    return items.map((item) => (
                        <CommunityCard
                            key={`${product.id}-${item.platform}`}
                            platform={item.platform as any}
                            url={item.url}
                            name={`${product.title} ${item.platform === 'whatsapp' ? 'Group' : 'Channel'}`}
                        />
                    ));
                })}

                {products.length === 0 && (
                    <p>You haven't joined any communities yet.</p>
                )}
            </div>
        </div>
    );
}
