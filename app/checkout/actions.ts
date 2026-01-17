'use server';

import { db } from '../lib/db';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { sendPurchaseConfirmation, sendSellerSaleNotification } from '../lib/email';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

export async function processOrder(productId: string, paymentMethod: string, details: any) {
    const user = await db.getUser();
    if (!user) {
        return { success: false, error: 'User not logged in' };
    }

    const product = await db.getProduct(productId);
    if (!product) {
        return { success: false, error: 'Product not found' };
    }

    // Get Affiliate Cookie
    const cookieStore = await cookies();
    const affiliateRef = cookieStore.get('affiliate_ref')?.value;

    try {
        // Crypto Flow
        if (paymentMethod === 'crypto') {
            const hash = details?.hash;
            if (!hash) return { success: false, error: 'Transaction hash missing' };

            const supabase = await (await import('@/utils/supabase/server')).createClient();

            // Insert order with 'pending_crypto' status
            // TODO: Store affiliateRef in payment_details for crypto later approval
            const { data, error } = await supabase.from('orders').insert({
                user_id: user.id,
                product_id: product.id,
                total_amount: product.price,
                payment_method: 'crypto',
                status: 'pending_crypto',
                payment_details: { hash, affiliateRef } // Store ref here
            }).select().single();

            if (error) {
                console.error('Crypto Order Error:', error);
                return { success: false, error: 'Failed to create crypto order' };
            }

            return { success: true, redirectUrl: `/checkout/success?orderId=${data.id}&pending=true` };
        }

        const amountInKobo = Math.round(product.price * 100);

        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                amount: amountInKobo,
                currency: product.currency || 'GHS',
                reference: `dwom_${Date.now()}_${user.id.substring(0, 4)}`,
                metadata: {
                    productId: product.id,
                    userId: user.id,
                    affiliateRef: affiliateRef, // Pass to Paystack
                    custom_fields: [
                        { display_name: "Product", variable_name: "product", value: product.title }
                    ]
                },
                callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/verify`
            }),
        });

        const data = await response.json();

        if (!data.status) {
            console.error('Paystack Init Error:', data);
            return { success: false, error: data.message || 'Payment initialization failed' };
        }

        return { success: true, authorizationUrl: data.data.authorization_url, reference: data.data.reference };

    } catch (error) {
        console.error('Order failed:', error);
        return { success: false, error: 'Payment processing failed' };
    }
}

export async function verifyPayment(reference: string) {
    if (!reference) return { success: false, error: 'No reference provided' };

    try {
        console.log(`Verifying payment for Ref: ${reference}`);
        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
            },
        });

        const data = await response.json();
        console.log('Paystack Verify Response:', JSON.stringify(data.data?.status));

        if (!data.status || data.data.status !== 'success') {
            console.error('Paystack Status Failed:', data);
            return { success: false, error: `Payment status is ${data.data?.status || 'unknown'}` };
        }

        // Payment was successful!
        const { metadata, amount, currency, channel } = data.data;
        const productId = metadata?.productId;
        const userId = metadata?.userId;
        const affiliateRef = metadata?.affiliateRef;

        console.log(`Payment Success. Creating Order for Product: ${productId}, User: ${userId}, Ref: ${affiliateRef}`);

        if (!productId || !userId) {
            console.error('Missing metadata:', metadata);
            return { success: false, error: 'Missing transaction metadata (Product/User)' };
        }

        // Fulfill Order in DB (Pass Affiliate Ref)
        const result = await db.createOrder(userId, productId, channel, amount / 100, affiliateRef);

        if (result.success) {
            console.log('Order created successfully:', result.orderId);

            // Send email notifications (non-blocking)
            try {
                const product = await db.getProduct(productId);
                const buyer = await db.getUserById(userId);

                if (product && buyer && buyer.email) {
                    // Get seller name
                    const seller = product.sellerId ? await db.getUserById(product.sellerId) : null;

                    // Send purchase confirmation to buyer
                    await sendPurchaseConfirmation(buyer.email, {
                        buyerName: buyer.full_name || 'there',
                        productName: product.title,
                        amount: `GH₵${(amount / 100).toFixed(2)}`,
                        sellerName: seller?.full_name || 'Seller',
                        downloadLink: `https://dwom.store/dashboard`,
                    });

                    // Send sale notification to seller
                    if (seller && seller.email) {
                        await sendSellerSaleNotification(seller.email, {
                            sellerName: seller.full_name || 'Seller',
                            productName: product.title,
                            amount: `GH₵${(amount / 100).toFixed(2)}`,
                            buyerName: buyer.full_name || 'A customer',
                        });
                    }
                }
            } catch (emailError) {
                console.error('Email notification failed (non-critical):', emailError);
            }

            return { success: true, orderId: result.orderId };
        } else {
            console.error('DB Order Creation Failed');
            return { success: false, error: 'Database failed to record order. Please contact support.' };
        }

    } catch (error: any) {
        console.error('Verify Execution Error:', error);
        return { success: false, error: `System Error: ${error.message}` };
    }
}

export async function verifyCouponCode(code: string) {
    return await db.validateCoupon(code);
}
