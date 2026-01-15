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
    // Crypto State
    const [cryptoHash, setCryptoHash] = useState('');
    const USDT_ADDRESS = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; // Tron USDT example (Binance Hot Wallet for demo)

    const [method, setMethod] = useState<'momo' | 'card' | 'crypto'>('momo');
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
            const { processOrder } = await import('../checkout/actions');

            // Handle Crypto Flow
            if (method === 'crypto') {
                if (!cryptoHash || cryptoHash.length < 10) {
                    alert('Please enter a valid Transaction Hash.');
                    setLoading(false);
                    return;
                }
                const result = await processOrder(productId, 'crypto', {
                    hash: cryptoHash
                });

                if (result.success && result.redirectUrl) {
                    window.location.href = result.redirectUrl;
                } else {
                    alert(result.error || 'Crypto order failed. Please contact support.');
                    setLoading(false);
                }
                return;
            }

            // Paystack Flow
            // We pass the details, but Paystack handles the actual collection securey on their page.
            // We mainly need to init the transaction.
            const result = await processOrder(productId, method, {
                network, phoneNumber, cardNumber
            });

            if (result.success && result.authorizationUrl) {
                // Redirect to Paystack
                window.location.href = result.authorizationUrl;
            } else {
                alert(result.error || 'Payment initialization failed. Please try again.');
                setLoading(false);
            }

        } catch (error) {
            console.error(error);
            alert('Payment processing error');
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
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => setMethod('momo')} style={{ padding: '12px', borderBottom: method === 'momo' ? '2px solid #f97316' : '2px solid transparent', color: method === 'momo' ? '#0f172a' : '#64748b', fontWeight: '500', background: 'none', cursor: 'pointer' }}>Mobile Money</button>
                <button type="button" onClick={() => setMethod('card')} style={{ padding: '12px', borderBottom: method === 'card' ? '2px solid #f97316' : '2px solid transparent', color: method === 'card' ? '#0f172a' : '#64748b', fontWeight: '500', background: 'none', cursor: 'pointer' }}>Card</button>
                <button type="button" onClick={() => setMethod('crypto')} style={{ padding: '12px', borderBottom: method === 'crypto' ? '2px solid #f97316' : '2px solid transparent', color: method === 'crypto' ? '#0f172a' : '#64748b', fontWeight: '500', background: 'none', cursor: 'pointer' }}>Crypto (USDT)</button>
            </div>

            <form onSubmit={handlePayment}>
                {method === 'crypto' && (
                    <div style={{ marginBottom: '24px', background: '#f0fdf4', padding: '16px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>₮</div>
                            <p style={{ fontWeight: 'bold', color: '#15803d' }}>Send USDT (TRC20)</p>
                            <p style={{ fontSize: '12px', color: '#166534' }}>To the address below:</p>
                        </div>

                        <div style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px dashed #22c55e', fontSize: '12px', fontFamily: 'monospace', wordBreak: 'break-all', textAlign: 'center', marginBottom: '16px', color: '#15803d' }}>
                            {USDT_ADDRESS}
                        </div>

                        <div style={{ marginBottom: '8px' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#166534', marginBottom: '4px' }}>Transaction Hash (TXID)</label>
                            <input
                                type="text"
                                required
                                placeholder="Enter transaction hash after sending..."
                                value={cryptoHash}
                                onChange={(e) => setCryptoHash(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #86efac', fontSize: '14px' }}
                            />
                        </div>
                        <p style={{ fontSize: '11px', color: '#166534', lineHeight: '1.4' }}>
                            * Orders are manually verified. Access will be granted within 15 mins of confirmation.
                        </p>
                    </div>
                )}

                {method !== 'crypto' && (
                    <div style={{ marginBottom: '24px', color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
                        You will be redirected to Paystack's secure checkout page to complete your payment via <strong>{method === 'momo' ? 'Mobile Money' : 'Card'}</strong>.
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: method === 'crypto' ? '#16a34a' : '#f97316',
                            color: 'white',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '16px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            border: 'none'
                        }}
                    >
                        {loading ? 'Processing...' : method === 'crypto' ? 'Submit Crypto Payment' : `Pay ${currency}${finalPrice.toFixed(2)}`}
                    </button>
                    <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
                        <span role="img" aria-label="lock">🔒</span> Secured by {method === 'crypto' ? 'Blockchain' : 'Paystack'}
                    </p>
                </div>
            </form>
        </div>
    );
}
