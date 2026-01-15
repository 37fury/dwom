'use server';

import { db } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export async function requestPayoutAction(amount: number, provider: string, number: string) {
    const user = await db.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    if (amount > user.balance) {
        return { success: false, error: 'Insufficient balance' };
    }

    if (amount < 10) {
        return { success: false, error: 'Minimum payout is GH₵10' };
    }

    const supabase = await createClient();

    // 1. Create Payout Record
    const { error: payoutError } = await supabase.from('payouts').insert({
        user_id: user.id,
        amount: amount,
        currency: 'GHS',
        status: 'processing',
        provider: provider,
        details: { number }
    });

    if (payoutError) {
        console.error(payoutError);
        return { success: false, error: 'Failed to create payout request' };
    }

    // 2. Deduct from Balance (Create Wallet Transaction)
    try {
        await db.createWalletTransaction(
            user.id,
            amount,
            'debit',
            `Payout Request to ${provider} (${number})`
        );
    } catch (e) {
        console.error('Wallet Error:', e);
        // Ideally rollback payout here
        return { success: false, error: 'Failed to update wallet' };
    }

    revalidatePath('/dashboard/seller/payouts');
    return { success: true };
}
