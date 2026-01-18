import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
    const sectionStyle = { marginBottom: '32px' };
    const h2Style = { fontSize: '24px', fontWeight: 'bold' as const, marginBottom: '16px', color: '#0f172a' };
    const pStyle = { marginBottom: '12px' };
    const listStyle = { listStyle: 'disc' as const, paddingLeft: '24px', marginTop: '12px' };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px', lineHeight: '1.8', color: '#334155' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '12px', color: '#0f172a' }}>Terms of Service</h1>
            <p style={{ marginBottom: '8px', color: '#64748b' }}>Last updated: January 18, 2026</p>
            <p style={{ marginBottom: '32px', padding: '16px', background: '#fef3c7', borderRadius: '8px', fontSize: '14px' }}>
                These Terms are governed by the laws of the Republic of Ghana, including the Electronic Transactions Act, 2008 (Act 772),
                Data Protection Act, 2012 (Act 843), and other applicable legislation.
            </p>

            <section style={sectionStyle}>
                <h2 style={h2Style}>1. Introduction and Acceptance</h2>
                <p style={pStyle}>
                    Welcome to dwom ("Company", "we", "our", "us"), a digital marketplace platform registered and operating
                    under the laws of the Republic of Ghana. These Terms of Service ("Terms") constitute a legally binding
                    agreement between you and dwom, governing your access to and use of our website at dwom.store and all
                    related services (collectively, the "Service").
                </p>
                <p style={pStyle}>
                    By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound
                    by these Terms in accordance with the <strong>Electronic Transactions Act, 2008 (Act 772)</strong> of Ghana,
                    which provides the legal framework for electronic contracts and agreements.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>2. Eligibility and Registration</h2>
                <p style={pStyle}>To use our Service, you must:</p>
                <ul style={listStyle}>
                    <li>Be at least 18 years of age, or the age of legal majority in your jurisdiction</li>
                    <li>Have the legal capacity to enter into binding contracts under Ghanaian law</li>
                    <li>Provide accurate, current, and complete registration information</li>
                    <li>Maintain the security and confidentiality of your account credentials</li>
                    <li>Comply with all applicable laws of Ghana, including but not limited to the Companies Act, 2019 (Act 992) if operating as a business</li>
                </ul>
                <p style={{ ...pStyle, marginTop: '16px' }}>
                    Sellers conducting business on our platform may be required to register with relevant Ghanaian authorities,
                    including the Registrar General's Department and the Ghana Revenue Authority.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>3. Data Protection and Privacy</h2>
                <p style={pStyle}>
                    We are committed to protecting your personal data in accordance with the <strong>Data Protection Act, 2012 (Act 843)</strong> of Ghana.
                    As a registered data controller with the Data Protection Commission of Ghana, we adhere to the following principles:
                </p>
                <ul style={listStyle}>
                    <li><strong>Lawfulness:</strong> We process personal data only on lawful grounds with your consent or as permitted by law</li>
                    <li><strong>Purpose Limitation:</strong> Your data is collected for specified, explicit, and legitimate purposes</li>
                    <li><strong>Data Minimization:</strong> We collect only the data necessary for the specified purposes</li>
                    <li><strong>Accuracy:</strong> We take reasonable steps to ensure personal data is accurate and up-to-date</li>
                    <li><strong>Storage Limitation:</strong> Personal data is retained only for as long as necessary</li>
                    <li><strong>Security:</strong> We implement appropriate technical and organizational measures to protect your data</li>
                    <li><strong>Accountability:</strong> We maintain records demonstrating compliance with data protection requirements</li>
                </ul>
                <p style={{ ...pStyle, marginTop: '16px' }}>
                    <strong>Your Data Rights:</strong> Under the Data Protection Act, you have the right to:
                </p>
                <ul style={listStyle}>
                    <li>Access your personal data held by us</li>
                    <li>Request correction of inaccurate personal data</li>
                    <li>Request deletion of your personal data (subject to legal requirements)</li>
                    <li>Object to processing of your personal data</li>
                    <li>Withdraw consent at any time</li>
                    <li>Lodge a complaint with the Data Protection Commission</li>
                </ul>
                <p style={{ ...pStyle, marginTop: '16px' }}>
                    For data protection inquiries, contact our Data Protection Officer at privacy@dwom.store
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>4. Electronic Transactions</h2>
                <p style={pStyle}>
                    All transactions conducted on our platform are governed by the <strong>Electronic Transactions Act, 2008 (Act 772)</strong>
                    and comply with the requirements for valid electronic contracts in Ghana.
                </p>
                <ul style={listStyle}>
                    <li>Electronic signatures and records have the same legal effect as their physical counterparts</li>
                    <li>You consent to receive communications, notices, and records electronically</li>
                    <li>Transaction confirmations and receipts will be provided electronically</li>
                    <li>Electronic records of transactions will be maintained as required by law</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>5. Payments and Financial Services</h2>
                <p style={pStyle}>
                    Payment processing on our platform is conducted in accordance with the <strong>Payment Systems and Services Act, 2019 (Act 987)</strong>
                    and regulations issued by the Bank of Ghana.
                </p>
                <ul style={listStyle}>
                    <li>We partner with licensed payment service providers (including Paystack) authorized by the Bank of Ghana</li>
                    <li>Mobile Money transactions are processed through licensed telecommunications operators</li>
                    <li>All payment processing complies with anti-money laundering (AML) and counter-terrorist financing (CTF) requirements</li>
                    <li>Transaction fees and charges are clearly disclosed before payment confirmation</li>
                </ul>
                <p style={{ ...pStyle, marginTop: '16px' }}>
                    <strong>Seller Payouts:</strong> Sellers receive payments via mobile money or bank transfer.
                    A platform fee of 10% is deducted from each transaction. Payouts are processed within 24-48 hours of request.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>6. Taxation</h2>
                <p style={pStyle}>
                    Users are responsible for complying with all applicable tax obligations under Ghanaian law, including:
                </p>
                <ul style={listStyle}>
                    <li><strong>Value Added Tax (VAT):</strong> As per the Value Added Tax Act, 2013 (Act 870), VAT may apply to digital services and products sold on our platform</li>
                    <li><strong>Income Tax:</strong> Sellers are responsible for declaring and paying income tax on their earnings</li>
                    <li><strong>Withholding Tax:</strong> Where applicable, we may be required to withhold taxes as mandated by the Ghana Revenue Authority</li>
                </ul>
                <p style={{ ...pStyle, marginTop: '16px' }}>
                    We recommend consulting with a qualified tax professional regarding your specific tax obligations.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>7. Consumer Protection</h2>
                <p style={pStyle}>
                    We are committed to fair trading practices and consumer protection in accordance with Ghanaian law:
                </p>
                <ul style={listStyle}>
                    <li>All product descriptions must be accurate and not misleading</li>
                    <li>Pricing must be clearly displayed in Ghana Cedis (GH₵)</li>
                    <li>Sellers must honor their stated refund policies</li>
                    <li>Unsolicited marketing communications are prohibited without consent</li>
                    <li>Users have the right to lodge complaints through our dispute resolution process</li>
                </ul>
                <p style={{ ...pStyle, marginTop: '16px' }}>
                    <strong>Refunds:</strong> Refund policies vary by product and seller. For digital products, refunds may be limited
                    unless the product is defective or substantially different from the description. To request a refund,
                    visit your <Link href="/dashboard/refunds" style={{ color: '#f97316' }}>Refund Requests</Link> page.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>8. Intellectual Property</h2>
                <p style={pStyle}>
                    Intellectual property rights are protected in accordance with the Copyright Act, 2005 (Act 690) and
                    Trade Marks Act, 2004 (Act 664) of Ghana:
                </p>
                <ul style={listStyle}>
                    <li>Sellers warrant that they own or have the right to sell the digital products listed</li>
                    <li>Users may not copy, reproduce, or distribute content without authorization</li>
                    <li>We respect intellectual property rights and will respond to valid infringement notices</li>
                    <li>Repeat infringers may have their accounts terminated</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>9. Cybersecurity</h2>
                <p style={pStyle}>
                    In compliance with the <strong>Cybersecurity Act, 2020 (Act 1038)</strong>, we implement appropriate security measures:
                </p>
                <ul style={listStyle}>
                    <li>Secure encryption for data transmission (SSL/TLS)</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Incident response procedures for security breaches</li>
                    <li>User authentication and access controls</li>
                </ul>
                <p style={{ ...pStyle, marginTop: '16px' }}>
                    Users are responsible for maintaining the security of their accounts and reporting any
                    unauthorized access immediately.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>10. Prohibited Content and Activities</h2>
                <p style={pStyle}>The following are strictly prohibited on our platform:</p>
                <ul style={listStyle}>
                    <li>Content that violates any law of Ghana or any other applicable jurisdiction</li>
                    <li>Fraudulent, deceptive, or misleading products or practices</li>
                    <li>Content promoting illegal activities or violence</li>
                    <li>Hate speech, harassment, or discriminatory content</li>
                    <li>Adult content involving minors</li>
                    <li>Malware, viruses, or harmful code</li>
                    <li>Pyramid schemes or unlicensed financial products</li>
                    <li>Counterfeit goods or unauthorized reproductions</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>11. Dispute Resolution</h2>
                <p style={pStyle}>
                    Any disputes arising from these Terms shall be resolved as follows:
                </p>
                <ul style={listStyle}>
                    <li><strong>Negotiation:</strong> Parties shall first attempt to resolve disputes amicably</li>
                    <li><strong>Mediation:</strong> If negotiation fails, disputes may be referred to mediation under the
                        Alternative Dispute Resolution Act, 2010 (Act 798)</li>
                    <li><strong>Arbitration:</strong> Unresolved disputes may be submitted to arbitration in Accra, Ghana</li>
                    <li><strong>Jurisdiction:</strong> The courts of Ghana shall have exclusive jurisdiction over any legal proceedings</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>12. Limitation of Liability</h2>
                <p style={pStyle}>
                    To the maximum extent permitted by Ghanaian law:
                </p>
                <ul style={listStyle}>
                    <li>dwom acts as an intermediary platform and is not liable for transactions between users</li>
                    <li>We do not guarantee the quality, safety, or legality of products listed by sellers</li>
                    <li>Our liability shall not exceed the fees paid by you in the 12 months preceding the claim</li>
                    <li>We are not liable for indirect, incidental, or consequential damages</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>13. Termination</h2>
                <p style={pStyle}>
                    We may suspend or terminate your account for violations of these Terms or applicable laws.
                    Upon termination:
                </p>
                <ul style={listStyle}>
                    <li>Your right to access the Service will cease immediately</li>
                    <li>You remain liable for any outstanding obligations</li>
                    <li>Provisions that by their nature should survive termination will remain in effect</li>
                    <li>We will process any pending payouts in accordance with our payout policy</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>14. Amendments</h2>
                <p style={pStyle}>
                    We reserve the right to modify these Terms at any time. Changes will be effective upon posting
                    to our website. Continued use of the Service after changes constitutes acceptance of the modified Terms.
                    Material changes will be communicated via email or notification on the platform.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>15. Governing Law</h2>
                <p style={pStyle}>
                    These Terms shall be governed by and construed in accordance with the laws of the Republic of Ghana,
                    without regard to conflict of law principles. The applicable laws include but are not limited to:
                </p>
                <ul style={listStyle}>
                    <li>Electronic Transactions Act, 2008 (Act 772)</li>
                    <li>Data Protection Act, 2012 (Act 843)</li>
                    <li>Cybersecurity Act, 2020 (Act 1038)</li>
                    <li>Payment Systems and Services Act, 2019 (Act 987)</li>
                    <li>Companies Act, 2019 (Act 992)</li>
                    <li>Value Added Tax Act, 2013 (Act 870)</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>16. Contact Information</h2>
                <p style={pStyle}>
                    For questions about these Terms or our Service, please contact us:
                </p>
                <ul style={{ ...listStyle, listStyle: 'none', paddingLeft: '0' }}>
                    <li><strong>Email:</strong> support@dwom.store</li>
                    <li><strong>Data Protection:</strong> privacy@dwom.store</li>
                    <li><strong>Address:</strong> Accra, Ghana</li>
                </ul>
            </section>

            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                    By using dwom, you acknowledge that you have read and understood these Terms of Service
                    and agree to be bound by them.
                </p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
                    <Link href="/privacy" style={{ color: '#f97316', fontSize: '14px' }}>Privacy Policy</Link>
                    <Link href="/faq" style={{ color: '#f97316', fontSize: '14px' }}>FAQ / Help</Link>
                </div>
            </div>
        </div>
    );
}
