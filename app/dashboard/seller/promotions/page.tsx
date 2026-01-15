import { db } from '../../../lib/db';
import PromotionsClient from './PromotionsClient';

export default async function PromotionsPage() {
    const campaigns = await db.getCampaigns();
    const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
    const totalRemaining = campaigns.reduce((acc, c) => acc + c.remainingBudget, 0);
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

    return (
        <PromotionsClient
            campaigns={campaigns}
            stats={{
                activeCampaigns,
                totalBudget,
                totalRemaining
            }}
        />
    );
}
