import ProductCard from './ProductCard';
import styles from './MarketplaceGrid.module.css';

// Mock data adapted for African market
const PRODUCTS = [
    { id: '1', title: 'Accra Forex Kings', category: 'Forex & Crypto', price: 'GH₵ 500/mo', rating: 4.9, imageUrl: '' },
    { id: '2', title: 'Afrobeats Mastery Kit', category: 'Music', price: 'GH₵ 250', rating: 4.8, imageUrl: '' },
    { id: '3', title: 'Naija Tech Bro Circle', category: 'Tech Skills', price: 'Free', rating: 4.7, imageUrl: '' },
    { id: '4', title: 'Kumasi Bet Signals', category: 'Betting', price: 'GH₵ 100/mo', rating: 4.5, imageUrl: '' },
    { id: '5', title: 'Jollof & Chill Events', category: 'Event Tickets', price: 'GH₵ 150', rating: 4.9, imageUrl: '' },
    { id: '6', title: 'Lagos Real Estate Guide', category: 'Real Estate', price: '₦ 50,000', rating: 4.6, imageUrl: '' },
];

export default function MarketplaceGrid() {
    return (
        <section className={styles.gridSection}>
            <div className="container">
                <h2 className={styles.heading}>Trending in Africa</h2>
                <div className={styles.grid}>
                    {PRODUCTS.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
