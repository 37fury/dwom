'use server';

import { db } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { sendPayoutNotification } from '@/app/lib/email';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

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

    try {
        // Step 1: Create or get transfer recipient
        const recipientCode = await createTransferRecipient(
            user.name || 'Seller',
            number,
            provider
        );

        if (!recipientCode) {
            return { success: false, error: 'Failed to create payment recipient. Check your payout details.' };
        }

        // Step 2: Initiate the transfer
        const transferResult = await initiateTransfer(
            amount,
            recipientCode,
            `Payout to ${user.name} - ${user.id.substring(0, 8)}`
        );

        if (!transferResult.success) {
            return { success: false, error: transferResult.error || 'Transfer failed' };
        }

        // Step 3: Create Payout Record
        const { data: payout, error: payoutError } = await supabase.from('payouts').insert({
            user_id: user.id,
            amount: amount,
            currency: 'GHS',
            status: transferResult.status === 'success' ? 'paid' : 'processing',
            provider: provider,
            details: { number },
            transfer_code: transferResult.transfer_code,
            transfer_reference: transferResult.reference
        }).select().single();

        if (payoutError) {
            console.error('Payout record error:', payoutError);
            return { success: false, error: 'Failed to create payout request' };
        }

        // Step 4: Deduct from Balance
        try {
            await db.createWalletTransaction(
                user.id,
                amount,
                'debit',
                `Payout to ${provider} (${number})`
            );
        } catch (e) {
            console.error('Wallet Error:', e);
        }

        // Step 5: Send notification
        await db.createNotification(
            user.id,
            'payout',
            'Payout Processing',
            `Your payout of GH₵${amount.toFixed(2)} is being processed.`,
            '/dashboard/seller/payouts'
        );

        // Step 6: Send email
        try {
            const userData = await db.getUserById(user.id);
            if (userData?.email) {
                await sendPayoutNotification(userData.email, {
                    sellerName: user.name || 'there',
                    amount: `GH₵${amount.toFixed(2)}`,
                    status: transferResult.status === 'success' ? 'sent' : 'approved',
                });
            }
        } catch (emailError) {
            console.error('Payout email error:', emailError);
        }

        revalidatePath('/dashboard/seller/payouts');
        return { success: true, status: transferResult.status };

    } catch (error: any) {
        console.error('Payout Error:', error);
        return { success: false, error: error.message || 'Payout processing failed' };
    }
}

// Create a transfer recipient in Paystack
async function createTransferRecipient(
    name: string,
    accountNumber: string,
    provider: string
): Promise<string | null> {
    try {
        // Map provider to bank code
        const bankCode = getMobileMoneyCodes(provider);

        const response = await fetch('https://api.paystack.co/transferrecipient', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'mobile_money',
                name: name,
                account_number: accountNumber,
                bank_code: bankCode,
                currency: 'GHS',
            }),
        });

        const data = await response.json();

        if (data.status && data.data?.recipient_code) {
            return data.data.recipient_code;
        }

        console.error('Recipient creation failed:', data);
        return null;
    } catch (error) {
        console.error('Create recipient error:', error);
        return null;
    }
}

// Initiate transfer
async function initiateTransfer(
    amount: number,
    recipientCode: string,
    reason: string
): Promise<{ success: boolean; transfer_code?: string; reference?: string; status?: string; error?: string }> {
    try {
        const reference = `payout_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

        const response = await fetch('https://api.paystack.co/transfer', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                source: 'balance',
                amount: amount * 100, // Convert to pesewas
                recipient: recipientCode,
                reason: reason,
                reference: reference,
                currency: 'GHS',
            }),
        });

        const data = await response.json();

        if (data.status) {
            return {
                success: true,
                transfer_code: data.data?.transfer_code,
                reference: reference,
                status: data.data?.status || 'pending',
            };
        }

        console.error('Transfer initiation failed:', data);
        return { success: false, error: data.message || 'Transfer failed' };
    } catch (error: any) {
        console.error('Initiate transfer error:', error);
        return { success: false, error: error.message };
    }
}

// Map provider names to Paystack bank codes for Ghana Mobile Money
function getMobileMoneyCodes(provider: string): string {
    const codes: Record<string, string> = {
        'Mobile Money': 'MTN', // Default to MTN
        'MTN Mobile Money': 'MTN',
        'MTN MoMo': 'MTN',
        'Vodafone Cash': 'VOD',
        'AirtelTigo Money': 'ATL',
        'Bank': 'GH', // For bank transfers, need bank code
    };
    return codes[provider] || 'MTN';
}
