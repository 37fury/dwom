'use server';

import { db } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';

export async function topUpWallet(amount: number) {
    try {
        const user = await db.getUser();
        if (!user) throw new Error('Unauthorized');

        await db.createWalletTransaction(
            user.id,
            amount,
            'credit',
            'Top Up via Mobile Money (Simulated)'
        );

        revalidatePath('/dashboard/wallet');
        return { success: true };
    } catch (error) {
        console.error('Top up failed:', error);
        return { success: false, error: 'Failed to process top up' };
    }
}

export async function withdrawFunds(amount: number, phoneNumber: string) {
    try {
        const user = await db.getUser();
        if (!user) throw new Error('Unauthorized');

        // Check balance
        const transactions = await db.getWalletTransactions(user.id);
        const currentBalance = transactions.reduce((sum, t) => sum + t.amount, 0);

        if (currentBalance < amount) {
            return { success: false, error: 'Insufficient funds' };
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing

        await db.createWalletTransaction(
            user.id,
            amount,
            'debit',
            `Withdrawal to ${phoneNumber}`
        );

        revalidatePath('/dashboard/wallet');
        return { success: true };
    } catch (error) {
        console.error('Withdrawal failed:', error);
        return { success: false, error: 'Failed to process withdrawal' };
    }
}
