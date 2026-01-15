import CampaignForm from './CampaignForm';
import styles from '../../../dashboard.module.css';

export default function NewCampaignPage() {
    return (
        <div className={styles.container} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 className={styles.title} style={{ marginBottom: '32px' }}>Create Promo Campaign</h1>
            <CampaignForm />
        </div>
    );
}
