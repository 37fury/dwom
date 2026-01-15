export const EmailTemplates = {
    welcome: (name: string) => `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h1 style="color: #ff5f00;">Welcome to dwom! 🚀</h1>
            <p>Hi ${name},</p>
            <p>We are thrilled to have you join the premier digital marketplace for Africa.</p>
            <p>Here you can sell courses, software, communities, and get paid instantly.</p>
            <br/>
            <a href="https://dwom.com/dashboard" style="background: #ff5f00; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
        </div>
    `,
    orderConfirmation: (productName: string, amount: number, currency: string) => `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h1 style="color: #15803d;">Order Confirmed ✅</h1>
            <p>You have successfully purchased <strong>${productName}</strong>.</p>
            <p>Total: <strong>${amount} ${currency}</strong></p>
            <br/>
            <p>You can access your product in your dashboard.</p>
            <a href="https://dwom.com/dashboard/memberships" style="background: #15803d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View My Products</a>
        </div>
    `,
    payoutApproved: (amount: number, currency: string) => `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h1 style="color: #15803d;">Payout Approved! 💸</h1>
            <p>Your payout request for <strong>${amount} ${currency}</strong> has been approved.</p>
            <p>It should arrive in your mobile money or bank account shortly.</p>
        </div>
    `,
    payoutRejected: (amount: number, currency: string, reason?: string) => `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h1 style="color: #dc2626;">Payout Request Declined ❌</h1>
            <p>Your payout request for <strong>${amount} ${currency}</strong> was not approved.</p>
            ${reason ? `<p>Reason: ${reason}</p>` : ''}
            <p>Please contact support if you have questions.</p>
        </div>
    `,
    kycApproved: (name: string) => `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h1 style="color: #15803d;">Verification Complete! ✅</h1>
            <p>Hi ${name},</p>
            <p>Your seller verification has been approved. You can now:</p>
            <ul>
                <li>Request payouts to your bank or mobile money</li>
                <li>Access all seller features</li>
            </ul>
            <a href="https://dwom.com/dashboard/seller" style="background: #15803d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Seller Dashboard</a>
        </div>
    `,
    kycRejected: (name: string, reason?: string) => `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h1 style="color: #dc2626;">Verification Needs Attention ⚠️</h1>
            <p>Hi ${name},</p>
            <p>Unfortunately, we couldn't verify your seller account at this time.</p>
            ${reason ? `<p>Reason: ${reason}</p>` : ''}
            <p>Please re-submit your verification documents.</p>
            <a href="https://dwom.com/dashboard/settings/kyc" style="background: #ff5f00; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Re-submit Documents</a>
        </div>
    `,
    passwordReset: (resetUrl: string) => `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h1 style="color: #ff5f00;">Reset Your Password 🔐</h1>
            <p>You requested to reset your password.</p>
            <p>Click the button below to create a new password:</p>
            <br/>
            <a href="${resetUrl}" style="background: #ff5f00; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
            <br/><br/>
            <p style="color: #666; font-size: 12px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
        </div>
    `
};

