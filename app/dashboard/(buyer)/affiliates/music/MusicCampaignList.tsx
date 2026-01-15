'use client';

import { useState } from 'react';
import SubmissionModal from '../../../../components/SubmissionModal';
import { db } from '../../../../lib/db'; // Note: db is server-side usually, we need a server action or API. 
// For this mock demo, we'll simulate the server action inside this file or pass it down. 
// Actually, db calls shouldn't be here. We need a server action file.
// Let's create a simple Server Action in a separate file or inline if Next.js allows (it does in page usually).
// Better approach: Pass server action as prop? Or import from actions file.
// Let's assume we create an action file. For now, let's mock it using a prop or direct import if it was client-safe (it's not).

// We will use a Server Action in `actions.ts`.

import { submitLinkAction } from './actions';
import { Disc3, Download } from 'lucide-react';

export default function MusicCampaignList({ campaigns }: { campaigns: any[] }) {
    const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {campaigns.map((campaign) => (
                    <div key={campaign.id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '140px', background: 'linear-gradient(45deg, #1e293b, #0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Disc3 size={56} color="#f97316" strokeWidth={1.5} />
                        </div>

                        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>{campaign.songTitle}</h3>
                            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>by {campaign.artistName}</p>

                            <div style={{
                                background: '#f0fdf4',
                                padding: '12px',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                border: '1px solid #dcfce7'
                            }}>
                                <div style={{ fontSize: '12px', color: '#166534', textTransform: 'uppercase', fontWeight: 'bold' }}>Earnings Rate</div>
                                <div style={{ fontSize: '20px', fontWeight: '800', color: '#15803d' }}>
                                    GH₵ {campaign.ratePer1kViews} <span style={{ fontSize: '14px', fontWeight: '500', color: '#166534' }}>/ 1k views</span>
                                </div>
                            </div>

                            <div style={{ marginBottom: '16px', fontSize: '14px', color: '#475569', flex: 1 }}>
                                <strong>Requirements:</strong><br />
                                {campaign.requirements}
                            </div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #cbd5e1',
                                    background: 'white',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    cursor: 'pointer'
                                }}>
                                    <Download size={16} /> Download Sound
                                </button>
                                <button
                                    onClick={() => setSelectedCampaign(campaign.id)}
                                    style={{
                                        flex: 2,
                                        padding: '12px',
                                        borderRadius: '8px',
                                        background: '#ff5f00',
                                        color: 'white',
                                        fontWeight: '600',
                                        border: 'none',
                                        fontSize: '14px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Submit Link
                                </button>
                            </div>
                        </div>

                        <div style={{ padding: '12px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Budget Left: GH₵ {campaign.remainingBudget.toLocaleString()}</span>
                            <span style={{ color: '#22c55e' }}>● Active</span>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCampaign && (
                <SubmissionModal
                    campaignId={selectedCampaign}
                    onClose={() => setSelectedCampaign(null)}
                    onSubmit={submitLinkAction}
                // We will pass the server action here
                />
            )}
        </div>
    );
}
