'use client';

import { useState } from 'react';
import { submitReviewAction } from '../product/actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="btn btn-primary"
            style={{ marginTop: '10px' }}
        >
            {pending ? 'Submitting...' : 'Post Review'}
        </button>
    );
}

export default function ReviewList({ productId, reviews }: { productId: string, reviews: any[] }) {
    const [rating, setRating] = useState(5);
    const [showForm, setShowForm] = useState(false);

    return (
        <div style={{ marginTop: '40px', borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Reviews ({reviews.length})</h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    style={{ background: 'none', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}
                >
                    {showForm ? 'Cancel' : 'Write a Review'}
                </button>
            </div>

            {showForm && (
                <form
                    action={async (formData) => {
                        await submitReviewAction(productId, formData);
                        setShowForm(false);
                    }}
                    style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}
                >
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Rating</label>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    style={{
                                        fontSize: '24px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: star <= rating ? '#fbbf24' : '#cbd5e1'
                                    }}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <input type="hidden" name="rating" value={rating} />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Comment</label>
                        <textarea
                            name="comment"
                            required
                            rows={4}
                            placeholder="Share your experience..."
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1' }}
                        />
                    </div>

                    <SubmitButton />
                </form>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {reviews.length === 0 ? (
                    <p style={{ color: '#64748b', fontStyle: 'italic' }}>No reviews yet. Be the first!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                                <div style={{
                                    width: '30px', height: '30px', borderRadius: '50%', background: '#e2e8f0',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px'
                                }}>
                                    {review.user.charAt(0)}
                                </div>
                                <span style={{ fontWeight: 'bold' }}>{review.user}</span>
                                <span style={{ color: '#94a3b8', fontSize: '14px' }}>• {review.date}</span>
                            </div>
                            <div style={{ color: '#fbbf24', marginBottom: '5px' }}>
                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                            </div>
                            <p style={{ color: '#334155', lineHeight: '1.5' }}>{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
