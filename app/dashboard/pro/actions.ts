'use server';

import { createClient } from '@/utils/supabase/server';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

export async function initProSubscription(plan: 'monthly' | 'annual') {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'Please log in to subscribe' };
    }

    const pricing = {
        monthly: 29,
        annual: 249,
    };

    const amount = pricing[plan];
    const amountInPesewas = amount * 100;

    try {
        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                amount: amountInPesewas,
                currency: 'GHS',
                reference: `pro_${plan}_${Date.now()}_${user.id.substring(0, 6)}`,
                metadata: {
                    type: 'pro_subscription',
                    userId: user.id,
                    plan: plan,
                    custom_fields: [
                        { display_name: 'Subscription', variable_name: 'subscription', value: `dwom Pro (${plan})` }
                    ]
                },
                callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://dwom.store'}/dashboard/pro/verify`
            }),
        });

        const data = await response.json();

        if (!data.status) {
            console.error('Pro Subscription Init Error:', data);
            return { success: false, error: data.message || 'Payment initialization failed' };
        }

        return {
            success: true,
            authorizationUrl: data.data.authorization_url,
            reference: data.data.reference
        };

    } catch (error: any) {
        console.error('Pro Subscription Error:', error);
        return { success: false, error: 'Payment processing failed' };
    }
}

export async function verifyProSubscription(reference: string) {
    if (!reference) return { success: false, error: 'No reference provided' };

    const supabase = await createClient();

    try {
        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
            },
        });

        const data = await response.json();

        if (!data.status || data.data.status !== 'success') {
            return { success: false, error: `Payment status is ${data.data?.status || 'unknown'}` };
        }

        // Payment successful - update user's pro status
        const { metadata } = data.data;
        const userId = metadata?.userId;
        const plan = metadata?.plan as 'monthly' | 'annual';

        if (!userId) {
            return { success: false, error: 'Missing user information' };
        }

        // Calculate expiry date
        const now = new Date();
        const expiresAt = new Date(now);
        if (plan === 'monthly') {
            expiresAt.setMonth(expiresAt.getMonth() + 1);
        } else {
            expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        }

        // Update user profile with pro status
        const { error } = await supabase
            .from('profiles')
            .update({
                is_pro: true,
                pro_plan: plan,
                pro_expires_at: expiresAt.toISOString(),
            })
            .eq('id', userId);

        if (error) {
            console.error('Failed to update pro status:', error);
            return { success: false, error: 'Failed to activate Pro subscription' };
        }

        return { success: true, plan, expiresAt: expiresAt.toISOString() };

    } catch (error: any) {
        console.error('Pro Verify Error:', error);
        return { success: false, error: `System Error: ${error.message}` };
    }
}
