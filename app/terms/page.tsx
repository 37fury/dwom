import React from 'react';

export default function TermsPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', lineHeight: '1.6', color: '#334155' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px', color: '#0f172a' }}>Terms of Service</h1>
            <p style={{ marginBottom: '16px' }}>Last updated: January 14, 2026</p>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>1. Introduction</h2>
                <p>Welcome to dwom ("Company", "we", "our", "us"). These Terms of Service ("Terms", "Terms of Service") govern your use of our website and marketplace located at dwom.com (together or individually "Service") operated by dwom Inc.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>2. Use of Service</h2>
                <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>
                <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginTop: '12px' }}>
                    <li>You must be at least 18 years old to use this Service.</li>
                    <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                    <li>You agree not to use the Service for any illegal or unauthorized purpose.</li>
                </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>3. Marketplace Transactions</h2>
                <p>dwom facilitates transactions between Buyers and Sellers. We are not a party to the transaction itself.</p>
                <p>Sellers are responsible for their products, and Buyers are responsible for reading product descriptions before purchasing. Refunds are handled according to the Seller's policy, unless otherwise required by law.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>4. Content</h2>
                <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>5. Termination</h2>
                <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
            </section>

            <p style={{ marginTop: '48px', color: '#64748b', fontSize: '14px' }}>
                Contact us at support@dwom.com for any questions.
            </p>
        </div>
    );
}
