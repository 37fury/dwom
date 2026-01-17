import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';
import { db } from '@/app/lib/db';
import { sendPurchaseConfirmation, sendSellerSaleNotification, sendProWelcome } from '@/app/lib/email';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || '';

// Verify Paystack signature
function verifySignature(payload: string, signature: string): boolean {
    const hash = crypto
        .createHmac('sha512', PAYSTACK_SECRET)
        .update(payload)
        .digest('hex');
    return hash === signature;
}

export async function POST(request: NextRequest) {
    try {
        const payload = await request.text();
        const signature = request.headers.get('x-paystack-signature') || '';

        // Verify webhook signature
        if (!verifySignature(payload, signature)) {
            console.error('Paystack Webhook: Invalid signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const event = JSON.parse(payload);
        console.log('Paystack Webhook Event:', event.event);

        // Handle different event types
        switch (event.event) {
            case 'charge.success':
                await handleChargeSuccess(event.data);
                break;
            case 'charge.failed':
                await handleChargeFailed(event.data);
                break;
            case 'refund.processed':
                await handleRefund(event.data);
                break;
            default:
                console.log('Unhandled webhook event:', event.event);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Paystack Webhook Error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}

async function handleChargeSuccess(data: any) {
    const { reference, metadata, amount, channel } = data;

    console.log(`Processing successful charge: ${reference}`);

    // Check if this is a Pro subscription
    if (metadata?.type === 'pro_subscription' || metadata?.type === 'seller_pro_subscription') {
        await handleProSubscription(data);
        return;
    }

    // Regular product purchase
    const productId = metadata?.productId;
    const userId = metadata?.userId;
    const affiliateRef = metadata?.affiliateRef;

    if (!productId || !userId) {
        console.error('Missing product or user metadata:', metadata);
        return;
    }

    // Check if order already exists (prevent duplicates)
    const supabase = await createClient();
    const { data: existingOrder } = await supabase
        .from('orders')
        .select('id')
        .eq('payment_reference', reference)
        .maybeSingle();

    if (existingOrder) {
        console.log('Order already processed:', reference);
        return;
    }

    // Create order
    const result = await db.createOrder(userId, productId, channel, amount / 100, affiliateRef);

    if (result.success) {
        console.log('Order created via webhook:', result.orderId);

        // Update order with payment reference
        await supabase
            .from('orders')
            .update({ payment_reference: reference })
            .eq('id', result.orderId);

        // Send email notifications
        try {
            const product = await db.getProduct(productId);
            const buyer = await db.getUserById(userId);

            if (product && buyer && buyer.email) {
                const seller = product.sellerId ? await db.getUserById(product.sellerId) : null;

                // Purchase confirmation to buyer
                await sendPurchaseConfirmation(buyer.email, {
                    buyerName: buyer.full_name || 'there',
                    productName: product.title,
                    amount: `GH₵${(amount / 100).toFixed(2)}`,
                    sellerName: seller?.full_name || 'Seller',
                    downloadLink: 'https://dwom.store/dashboard',
                });

                // Sale notification to seller
                if (seller && seller.email) {
                    await sendSellerSaleNotification(seller.email, {
                        sellerName: seller.full_name || 'Seller',
                        productName: product.title,
                        amount: `GH₵${(amount / 100).toFixed(2)}`,
                        buyerName: buyer.full_name || 'A customer',
                    });
                }

                // Create notifications
                await db.createNotification(
                    userId,
                    'purchase',
                    'Purchase Confirmed',
                    `Your purchase of ${product.title} is confirmed!`,
                    '/dashboard'
                );

                if (product.sellerId) {
                    await db.createNotification(
                        product.sellerId,
                        'sale',
                        'New Sale! 🎉',
                        `${buyer.full_name || 'Someone'} purchased ${product.title}`,
                        '/dashboard/seller'
                    );
                }
            }
        } catch (emailError) {
            console.error('Webhook email notification error:', emailError);
        }
    }
}

async function handleProSubscription(data: any) {
    const { metadata, amount } = data;
    const userId = metadata?.userId;
    const plan = metadata?.plan as 'monthly' | 'annual';

    if (!userId || !plan) {
        console.error('Missing Pro subscription metadata');
        return;
    }

    const supabase = await createClient();

    // Calculate expiry
    const expiresAt = new Date();
    if (plan === 'monthly') {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
    } else {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    }

    // Update profile
    const { error } = await supabase
        .from('profiles')
        .update({
            is_pro: true,
            pro_plan: plan,
            pro_expires_at: expiresAt.toISOString(),
        })
        .eq('id', userId);

    if (error) {
        console.error('Failed to update Pro status via webhook:', error);
        return;
    }

    console.log(`Pro subscription activated for ${userId}`);

    // Send welcome email
    try {
        const { data: profile } = await supabase
            .from('profiles')
            .select('email, full_name')
            .eq('id', userId)
            .single();

        if (profile?.email) {
            await sendProWelcome(profile.email, {
                userName: profile.full_name || 'there',
                plan,
                expiresAt: expiresAt.toISOString(),
            });
        }

        // Create notification
        await db.createNotification(
            userId,
            'system',
            'Welcome to Pro! 👑',
            `Your ${plan} Pro subscription is now active.`,
            '/dashboard'
        );
    } catch (emailError) {
        console.error('Pro welcome email error:', emailError);
    }
}

async function handleChargeFailed(data: any) {
    const { reference, metadata } = data;

    console.log(`Charge failed: ${reference}`);

    const userId = metadata?.userId;
    if (userId) {
        await db.createNotification(
            userId,
            'system',
            'Payment Failed',
            'Your payment could not be processed. Please try again.',
            '/checkout'
        );
    }
}

async function handleRefund(data: any) {
    const { reference, amount } = data;

    console.log(`Refund processed: ${reference}, Amount: ${amount}`);

    const supabase = await createClient();

    // Find and update order status
    const { data: order } = await supabase
        .from('orders')
        .select('id, user_id')
        .eq('payment_reference', reference)
        .single();

    if (order) {
        await supabase
            .from('orders')
            .update({ status: 'refunded' })
            .eq('id', order.id);

        await db.createNotification(
            order.user_id,
            'system',
            'Refund Processed',
            `Your refund of GH₵${(amount / 100).toFixed(2)} has been processed.`,
            '/dashboard'
        );
    }
}
