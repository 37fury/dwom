import styles from './integrations.module.css';

export default function IntegrationsPage() {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Connected Accounts</h2>
            <p className={styles.subheading}>Connect your accounts to claim access to communities and signals.</p>

            <div className={styles.grid}>
                {/* WhatsApp Card */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.icon} style={{ background: '#25D366' }}>WA</div>
                        <div className={styles.cardInfo}>
                            <h3>WhatsApp</h3>
                            <p>Receive trading signals and join community chats.</p>
                        </div>
                    </div>
                    <button className={styles.btnConnect}>Connect Number</button>
                </div>

                {/* Telegram Card */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.icon} style={{ background: '#0088cc' }}>TG</div>
                        <div className={styles.cardInfo}>
                            <h3>Telegram</h3>
                            <p>Unlock access to private channels and bots.</p>
                        </div>
                    </div>
                    <div className={styles.connectedBadge}>
                        <span className={styles.dot}></span> Connected as @deezy
                    </div>
                </div>

                {/* Discord Card */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.icon} style={{ background: '#5865F2' }}>DC</div>
                        <div className={styles.cardInfo}>
                            <h3>Discord</h3>
                            <p>Claim roles and access private servers.</p>
                        </div>
                    </div>
                    <button className={styles.btnConnect}>Connect Discord</button>
                </div>
            </div>
        </div>
    );
}
