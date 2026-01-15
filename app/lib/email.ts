import { Resend } from 'resend';

// Initialize Resend with API Key from env, or null if missing
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

type EmailPayload = {
    to: string;
    subject: string;
    html: string;
};

export async function sendEmail({ to, subject, html }: EmailPayload) {
    // 1. Mock Mode (Default if no key)
    if (!resend) {
        console.log(`
==================================================
[MOCK EMAIL SENT]
To: ${to}
Subject: ${subject}
--------------------------------------------------
${html.replace(/<[^>]*>?/gm, '').substring(0, 200)}... (truncated HTML for log)
==================================================
        `);
        return { success: true, id: 'mock-id' };
    }

    // 2. Real Sending
    try {
        const { data, error } = await resend.emails.send({
            from: 'Dwom <onboarding@resend.dev>', // Default Resend testing domain
            to: [to],
            subject: subject,
            html: html,
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
