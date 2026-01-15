import SellerSidebar from '../../components/SellerSidebar';
import styles from './seller-layout.module.css';

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            <SellerSidebar />
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
