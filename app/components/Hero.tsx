import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.content}`}>
                <h1 className={styles.title}>
                    <span>Turn your digital hustle</span>
                    <br />
                    <span className="text-gradient">into a global business</span>
                </h1>
                <p className={styles.subtitle}>
                    The #1 platform for African creators to sell courses, communities, and software. Get paid instantly in Cedis, Naira, or Crypto.
                </p>
                <div className={styles.actions}>
                    <button className="btn btn-primary">Explore Marketplace</button>
                    <button className="btn btn-secondary">Start Selling</button>
                </div>
            </div>
        </section>
    );
}
