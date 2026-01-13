import { Review } from '../lib/db';

export default function ReviewList({ reviews }: { reviews: Review[] }) {
    if (!reviews || reviews.length === 0) return null;

    return (
        <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>
                Reviews ({reviews.length})
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
                {reviews.map((review) => (
                    <div key={review.id} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={{ fontWeight: '600', fontSize: '14px' }}>{review.user}</span>
                                <div style={{ display: 'flex', color: '#fbbf24', fontSize: '14px' }}>
                                    {'★'.repeat(review.rating)}
                                    <span style={{ color: '#cbd5e1' }}>{'★'.repeat(5 - review.rating)}</span>
                                </div>
                            </div>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{review.date}</span>
                        </div>
                        <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.5' }}>"{review.comment}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
