import { Resend } from 'resend';

// Initialize Resend with API Key from env, or null if missing
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM_EMAIL = 'dwam <noreply@dwam.store>';

// Email templates
const templates = {
    purchaseConfirmation: (data: {
        buyerName: string;
        productName: string;
        amount: string;
        sellerName: string;
        downloadLink?: string;
    }) => ({
        subject: `🎉 Your purchase of "${data.productName}" is confirmed!`,
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <div style="text-align: center; margin-bottom: 32px;">
                    <h1 style="color: #f97316; font-size: 28px; margin: 0;">dwam</h1>
                </div>
                <div style="background: #1e293b; border-radius: 16px; padding: 32px; color: white;">
                    <h2 style="margin: 0 0 16px; font-size: 20px;">Hey ${data.buyerName}! 👋</h2>
                    <p style="color: #cbd5e1; line-height: 1.6;">Thank you for your purchase!</p>
                    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin: 24px 0;">
                        <p style="margin: 0 0 8px; color: #94a3b8; font-size: 14px;">Product</p>
                        <p style="margin: 0; font-size: 18px; font-weight: 600;">${data.productName}</p>
                        <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">by ${data.sellerName}</p>
                    </div>
                    <div style="background: rgba(249, 115, 22, 0.1); border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid rgba(249, 115, 22, 0.3);">
                        <p style="margin: 0; color: #f97316; font-size: 14px;">Amount Paid</p>
                        <p style="margin: 4px 0 0; font-size: 28px; font-weight: 700; color: #f97316;">${data.amount}</p>
                    </div>
                    ${data.downloadLink ? `<a href="${data.downloadLink}" style="display: block; text-align: center; background: linear-gradient(135deg, #f97316, #ea580c); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600;">Access Your Purchase →</a>` : ''}
                </div>
                <p style="color: #64748b; font-size: 13px; text-align: center; margin-top: 32px;">Need help? Visit <a href="https://dwam.store" style="color: #f97316;">dwam.store</a></p>
            </div>
        `,
    }),

    payoutNotification: (data: {
        sellerName: string;
        amount: string;
        status: 'approved' | 'sent' | 'rejected';
        reason?: string;
    }) => ({
        subject: data.status === 'sent'
            ? `💰 Your payout of ${data.amount} has been sent!`
            : data.status === 'approved'
                ? `✅ Your payout of ${data.amount} has been approved`
                : `❌ Payout request update`,
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <div style="text-align: center; margin-bottom: 32px;">
                    <h1 style="color: #f97316; font-size: 28px; margin: 0;">dwam</h1>
                </div>
                <div style="background: #1e293b; border-radius: 16px; padding: 32px; color: white;">
                    <h2 style="margin: 0 0 16px; font-size: 20px;">Hey ${data.sellerName}! 👋</h2>
                    ${data.status === 'sent' ? `
                        <div style="background: rgba(34, 197, 94, 0.1); border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid rgba(34, 197, 94, 0.3);">
                            <p style="margin: 0; font-size: 32px; font-weight: 700; color: #22c55e;">${data.amount}</p>
                            <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">Sent to your payout method</p>
                        </div>
                    ` : data.status === 'approved' ? `
                        <p style="color: #cbd5e1;">Your payout of <strong>${data.amount}</strong> has been approved and will be processed soon.</p>
                    ` : `
                        <p style="color: #ef4444;">Payout declined. ${data.reason ? `Reason: ${data.reason}` : ''}</p>
                    `}
                </div>
            </div>
        `,
    }),

    proWelcome: (data: {
        userName: string;
        plan: 'monthly' | 'annual';
        expiresAt: string;
    }) => ({
        subject: `👑 Welcome to dwam Pro!`,
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <div style="text-align: center; margin-bottom: 32px;">
                    <h1 style="color: #f97316; font-size: 28px; margin: 0;">dwam</h1>
                </div>
                <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; padding: 32px; color: white; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 16px;">👑</div>
                    <h2 style="margin: 0 0 16px; font-size: 28px;">Welcome to Pro, ${data.userName}!</h2>
                    <p style="color: #cbd5e1; line-height: 1.6;">Your ${data.plan} subscription is now active.</p>
                    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; text-align: left; margin: 24px 0;">
                        <p style="margin: 0 0 12px; color: #f97316; font-weight: 600;">Pro Benefits:</p>
                        <ul style="margin: 0; padding-left: 20px; color: #cbd5e1;">
                            <li>Express same-day payouts</li>
                            <li>Custom domain connection</li>
                            <li>Full branding customization</li>
                            <li>Priority support</li>
                        </ul>
                    </div>
                    <a href="https://dwam.store/dashboard" style="display: inline-block; background: linear-gradient(135deg, #f97316, #ea580c); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600;">Go to Dashboard →</a>
                </div>
            </div>
        `,
    }),

    sellerSaleNotification: (data: {
        sellerName: string;
        productName: string;
        amount: string;
        buyerName: string;
    }) => ({
        subject: `🎉 New sale: ${data.productName}`,
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <div style="text-align: center; margin-bottom: 32px;">
                    <h1 style="color: #f97316; font-size: 28px; margin: 0;">dwam</h1>
                </div>
                <div style="background: #1e293b; border-radius: 16px; padding: 32px; color: white;">
                    <h2 style="margin: 0 0 16px; font-size: 20px;">Congratulations, ${data.sellerName}! 🎉</h2>
                    <div style="background: rgba(34, 197, 94, 0.1); border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid rgba(34, 197, 94, 0.3);">
                        <p style="margin: 0 0 8px; color: #94a3b8; font-size: 14px;">Product Sold</p>
                        <p style="margin: 0; font-size: 18px; font-weight: 600;">${data.productName}</p>
                        <p style="margin: 16px 0 0; font-size: 28px; font-weight: 700; color: #22c55e;">${data.amount}</p>
                        <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">by ${data.buyerName}</p>
                    </div>
                    <a href="https://dwam.store/dashboard/seller" style="display: block; text-align: center; background: linear-gradient(135deg, #f97316, #ea580c); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600;">View Dashboard →</a>
                </div>
            </div>
        `,
    }),
};

// Core send function (exported for legacy compatibility)
export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
    if (!resend) {
        console.log(`[MOCK EMAIL] To: ${to}, Subject: ${subject}`);
        return { success: true, id: 'mock-id' };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [to],
            subject,
            html,
        });

        if (error) {
            console.error('Resend Error:', error);
            return { success: false, error };
        }
        return { success: true, id: data?.id };
    } catch (err) {
        console.error('Email Exception:', err);
        return { success: false, error: err };
    }
}

// Exported functions for different email types
export async function sendPurchaseConfirmation(email: string, data: Parameters<typeof templates.purchaseConfirmation>[0]) {
    const template = templates.purchaseConfirmation(data);
    return sendEmail({ to: email, subject: template.subject, html: template.html });
}

export async function sendPayoutNotification(email: string, data: Parameters<typeof templates.payoutNotification>[0]) {
    const template = templates.payoutNotification(data);
    return sendEmail({ to: email, subject: template.subject, html: template.html });
}

export async function sendProWelcome(email: string, data: Parameters<typeof templates.proWelcome>[0]) {
    const template = templates.proWelcome(data);
    return sendEmail({ to: email, subject: template.subject, html: template.html });
}

export async function sendSellerSaleNotification(email: string, data: Parameters<typeof templates.sellerSaleNotification>[0]) {
    const template = templates.sellerSaleNotification(data);
    return sendEmail({ to: email, subject: template.subject, html: template.html });
}
