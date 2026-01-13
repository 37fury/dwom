'use client';
import { useState } from 'react';

export default function ReviewForm() {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app we'd call a server action here
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div style={{ padding: '24px', background: '#f0fdf4', borderRadius: '12px', textAlign: 'center', color: '#166534' }}>
                <p style={{ fontWeight: '600' }}>Thank you for your review!</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>Leave a Review</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Rating</label>
                    <div style={{ display: 'flex', gap: '4px', cursor: 'pointer' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                style={{
                                    fontSize: '24px',
                                    color: star <= rating ? '#fbbf24' : '#cbd5e1',
                                    background: 'none',
                                    border: 'none',
                                    padding: 0
                                }}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Comment</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience..."
                        rows={3}
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        background: '#0f172a',
                        color: 'white',
                        padding: '10px 24px',
                        borderRadius: '8px',
                        fontWeight: '500',
                        fontSize: '14px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
}
