'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyCouponCode } from '../checkout/actions';

type Props = {
    productId: string;
    productPrice: number;
    currency: string;
    productTitle: string;
};

export default function CheckoutForm({ productId, productPrice, currency, productTitle }: Props) {
    const router = useRouter();
    const [method, setMethod] = useState<'momo' | 'card'>('momo');
    const [loading, setLoading] = useState(false);

    // Coupon State
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0); // Percentage
    const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setCouponMessage(null);

        try {
            const result = await verifyCouponCode(couponCode);
            if (result.valid) {
                setDiscount(result.discountPercentage);
                setCouponMessage({ type: 'success', text: `Coupon applied! ${result.discountPercentage}% off.` });
            } else {
                setDiscount(0);
                setCouponMessage({ type: 'error', text: 'Invalid coupon code.' });
            }
        } catch (error) {
            setCouponMessage({ type: 'error', text: 'Error applying coupon.' });
        }
    };

    const finalPrice = productPrice * (1 - discount / 100);

    // Momo State
    const [network, setNetwork] = useState('MTN');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Mock Card State
    const [cardNumber, setCardNumber] = useState('');

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Import dynamically or assume it's passed/imported at top. 
            // Since this is a client component, we imported `processOrder` at the top (I need to add the import).
            const { processOrder } = await import('../checkout/actions'); // Dynamic import to avoid build issues if mixed

            const result = await processOrder(productId, method, {
                network, phoneNumber, cardNumber
            });

            if (result.success) {
                router.push(`/checkout/success?orderId=${result.orderId}`);
            } else {
                alert('Payment failed. Please try again.');
            }

        } catch (error) {
            console.error(error);
            alert('Payment processing error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Pay with</h3>

            {/* Price Summary with Coupon */}
            <div style={{ marginBottom: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Subtotal</span>
                    <span style={{ fontWeight: '500' }}>{currency}{productPrice.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#16a34a' }}>
                        <span>Discount ({discount}%)</span>
                        <span>-{currency}{(productPrice - finalPrice).toFixed(2)}</span>
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #e2e8f0', fontSize: '18px', fontWeight: 'bold' }}>
                    <span>Total</span>
                    <span>{currency}{finalPrice.toFixed(2)}</span>
                </div>
            </div>

            {/* Coupon Input */}
            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Discount Code</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. AFRICA20"
                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                    <button
                        type="button"
                        onClick={handleApplyCoupon}
                        style={{ background: '#334155', color: 'white', padding: '10px 16px', borderRadius: '8px', fontWeight: '500', border: 'none', cursor: 'pointer', fontSize: '14px' }}
                    >
                        Apply
                    </button>
                </div>
                {couponMessage && (
                    <p style={{ fontSize: '13px', marginTop: '4px', color: couponMessage.type === 'success' ? '#16a34a' : '#ef4444' }}>
                        {couponMessage.text}
                    </p>
                )}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid #e2e8f0' }}>
                <button
                    onClick={() => setMethod('momo')}
                    style={{
                        padding: '12px',
                        borderBottom: method === 'momo' ? '2px solid #f97316' : '2px solid transparent',
                        color: method === 'momo' ? '#0f172a' : '#64748b',
                        fontWeight: '500',
                        background: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Mobile Money
                </button>
                <button
                    onClick={() => setMethod('card')}
                    style={{
                        padding: '12px',
                        borderBottom: method === 'card' ? '2px solid #f97316' : '2px solid transparent',
                        color: method === 'card' ? '#0f172a' : '#64748b',
                        fontWeight: '500',
                        background: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Card
                </button>
            </div>

            <form onSubmit={handlePayment}>
                {method === 'momo' && (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>Network</label>
                            <select
                                value={network} onChange={(e) => setNetwork(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}
                            >
                                <option value="MTN">MTN Mobile Money</option>
                                <option value="VOD">Vodafone Cash</option>
                                <option value="AIR">AirtelTigo Money</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>Phone Number</label>
                            <input
                                type="tel"
                                placeholder="055 123 4567"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            />
                        </div>
                    </div>
                )}

                {method === 'card' && (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>Card Number</label>
                            <input
                                type="text"
                                placeholder="4242 4242 4242 4242"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>Expiry</label>
                                <input type="text" placeholder="MM/YY" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>CVC</label>
                                <input type="text" placeholder="123" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ marginTop: '32px' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: '#f97316',
                            color: 'white',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '16px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            border: 'none'
                        }}
                    >
                        {loading ? 'Processing...' : `Pay ${currency}${finalPrice.toFixed(2)}`}
                    </button>
                    <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
                        <span role="img" aria-label="lock">🔒</span> Secured by Paystack (Simulated)
                    </p>
                </div>
            </form>
        </div>
    );
}
