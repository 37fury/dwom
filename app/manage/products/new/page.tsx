'use client';

import { useState } from 'react';
import styles from './new.module.css';

export default function CreateProductPage() {
    const [published, setPublished] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPublished(true);
    };

    if (published) {
        return (
            <div className={styles.success}>
                <div className={styles.icon}>✓</div>
                <h2>Product Published!</h2>
                <p>Your product is now live on the marketplace.</p>
                <button className={styles.btnSecondary} onClick={() => setPublished(false)}>Create Another</button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Product</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Product Title</label>
                    <input type="text" placeholder="e.g. Learn Forex Trading" required className={styles.input} />
                </div>

                <div className={styles.row}>
                    <div className={styles.formGroup}>
                        <label>Price</label>
                        <input type="number" placeholder="500" required className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Currency</label>
                        <select className={styles.input}>
                            <option>GH₵ (Cedis)</option>
                            <option>₦ (Naira)</option>
                            <option>$ (USD)</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Description</label>
                    <textarea placeholder="Describe your product..." className={styles.textarea} rows={5}></textarea>
                </div>

                <div className={styles.actions}>
                    <button type="submit" className={styles.btnPrimary}>Publish Product</button>
                </div>
            </form>
        </div>
    );
}
