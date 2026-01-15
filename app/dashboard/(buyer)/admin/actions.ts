'use server'

import { db } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { sendEmail } from '@/app/lib/email'
import { EmailTemplates } from '@/app/lib/email-templates'
import { createClient } from '@/utils/supabase/server'

export async function approveKYCAction(userId: string) {
    const supabase = await createClient();

    const success = await db.updateVerificationStatus(userId, 'verified')

    if (success) {
        // Fetch user email and name
        const { data: profile } = await supabase
            .from('profiles')
            .select('email, full_name')
            .eq('id', userId)
            .single();

        if (profile?.email) {
            await sendEmail({
                to: profile.email,
                subject: 'Your Seller Verification is Approved! ✅',
                html: EmailTemplates.kycApproved(profile.full_name || 'Seller')
            }).catch(e => console.error('Failed to send KYC approval email:', e));
        }

        revalidatePath('/dashboard/admin')
    }
    return success
}

export async function rejectKYCAction(userId: string) {
    const supabase = await createClient();

    const success = await db.updateVerificationStatus(userId, 'rejected')

    if (success) {
        // Fetch user email and name
        const { data: profile } = await supabase
            .from('profiles')
            .select('email, full_name')
            .eq('id', userId)
            .single();

        if (profile?.email) {
            await sendEmail({
                to: profile.email,
                subject: 'Verification Update Required',
                html: EmailTemplates.kycRejected(profile.full_name || 'Seller')
            }).catch(e => console.error('Failed to send KYC rejection email:', e));
        }

        revalidatePath('/dashboard/admin')
    }
    return success
}

export async function approveCryptoOrderAction(orderId: string) {
    const success = await db.approveCryptoOrder(orderId)
    if (success) {
        revalidatePath('/dashboard/admin')
    }
    return success
}

export async function rejectCryptoOrderAction(orderId: string) {
    const success = await db.rejectCryptoOrder(orderId)
    if (success) {
        revalidatePath('/dashboard/admin')
    }
    return success
}

export async function processPayoutAction(payoutId: string) {
    const supabase = await createClient();

    const { data: payout } = await supabase.from('payouts').select('*, profiles(email)').eq('id', payoutId).single();

    const success = await db.processPayout(payoutId)

    if (success && payout) {
        const email = payout.profiles?.email;

        if (email) {
            await sendEmail({
                to: email,
                subject: 'Payout Approved! 💸',
                html: EmailTemplates.payoutApproved(payout.amount, payout.currency)
            }).catch(e => console.error('Failed to send payout email:', e));
        }

        revalidatePath('/dashboard/admin')
    }
    return success
}

export async function rejectPayoutAction(payoutId: string) {
    const supabase = await createClient();

    // Fetch payout details before rejection
    const { data: payout } = await supabase
        .from('payouts')
        .select('*, profiles(email)')
        .eq('id', payoutId)
        .single();

    const success = await db.rejectPayout(payoutId)

    if (success && payout) {
        const email = payout.profiles?.email;

        if (email) {
            await sendEmail({
                to: email,
                subject: 'Payout Request Update',
                html: EmailTemplates.payoutRejected(payout.amount, payout.currency)
            }).catch(e => console.error('Failed to send payout rejection email:', e));
        }

        revalidatePath('/dashboard/admin')
    }
    return success
}

export async function toggleUserBanAction(userId: string, isBanned: boolean) {
    const success = await db.updateUserBanStatus(userId, isBanned);
    if (success) {
        revalidatePath('/dashboard/admin');
    }
    return success;
}

