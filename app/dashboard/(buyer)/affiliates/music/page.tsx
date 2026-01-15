import { db } from '../../../../lib/db';
import CreatorHubClient from './CreatorHubClient';

export default async function CreatorHubPage() {
    const campaigns = await db.getCampaigns();
    const activeCampaigns = campaigns.filter(c => c.status === 'active');

    const totalBudget = activeCampaigns.reduce((acc, c) => acc + (c.budget || 0), 0);
    const remainingBudget = activeCampaigns.reduce((acc, c) => acc + (c.remainingBudget || 0), 0);

    return (
        <CreatorHubClient
            campaigns={activeCampaigns}
            stats={{
                activeCampaigns: activeCampaigns.length,
                totalBudget,
                remainingBudget
            }}
        />
    );
}
