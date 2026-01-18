import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
    const sectionStyle = { marginBottom: '32px' };
    const h2Style = { fontSize: '24px', fontWeight: 'bold' as const, marginBottom: '16px', color: '#0f172a' };
    const pStyle = { marginBottom: '12px' };
    const listStyle = { listStyle: 'disc' as const, paddingLeft: '24px', marginTop: '12px' };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px', lineHeight: '1.8', color: '#334155' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '12px', color: '#0f172a' }}>Privacy Policy</h1>
            <p style={{ marginBottom: '8px', color: '#64748b' }}>Last updated: January 18, 2026</p>
            <p style={{ marginBottom: '32px', padding: '16px', background: '#dbeafe', borderRadius: '8px', fontSize: '14px' }}>
                This Privacy Policy is prepared in accordance with the <strong>Data Protection Act, 2012 (Act 843)</strong> of
                the Republic of Ghana. dwom is registered as a data controller with the Data Protection Commission of Ghana.
            </p>

            <section style={sectionStyle}>
                <h2 style={h2Style}>1. Introduction</h2>
                <p style={pStyle}>
                    dwom ("we", "us", "our") is committed to protecting your personal data and respecting your privacy.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                    use our digital marketplace platform.
                </p>
                <p style={pStyle}>
                    We process your personal data in compliance with the Data Protection Act, 2012 (Act 843) and the
                    principles established by the Data Protection Commission of Ghana.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>2. Data Controller</h2>
                <p style={pStyle}>
                    For the purposes of the Data Protection Act, 2012 (Act 843), the data controller is:
                </p>
                <ul style={{ ...listStyle, listStyle: 'none', paddingLeft: '0' }}>
                    <li><strong>Company:</strong> dwom</li>
                    <li><strong>Location:</strong> Accra, Ghana</li>
                    <li><strong>Email:</strong> privacy@dwom.store</li>
                    <li><strong>Data Protection Officer:</strong> privacy@dwom.store</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>3. Information We Collect</h2>
                <p style={pStyle}>We collect the following categories of personal data:</p>

                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '16px 0 8px', color: '#0f172a' }}>3.1 Information You Provide</h3>
                <ul style={listStyle}>
                    <li>Account information: name, email address, phone number, password</li>
                    <li>Profile information: profile picture, bio, location</li>
                    <li>Payment information: mobile money number, bank account details (for sellers)</li>
                    <li>Transaction information: purchase history, sales records</li>
                    <li>Communications: messages, support tickets, reviews</li>
                </ul>

                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '16px 0 8px', color: '#0f172a' }}>3.2 Information Collected Automatically</h3>
                <ul style={listStyle}>
                    <li>Device information: device type, operating system, browser type</li>
                    <li>Log data: IP address, access times, pages viewed</li>
                    <li>Location data: approximate location based on IP address</li>
                    <li>Cookies and similar technologies (see Section 10)</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>4. Legal Basis for Processing</h2>
                <p style={pStyle}>
                    Under the Data Protection Act, 2012 (Act 843), we process your personal data on the following lawful grounds:
                </p>
                <ul style={listStyle}>
                    <li><strong>Consent:</strong> Where you have given explicit consent for specific purposes</li>
                    <li><strong>Contractual Necessity:</strong> Processing necessary for the performance of our service agreement with you</li>
                    <li><strong>Legal Obligation:</strong> Processing necessary for compliance with Ghanaian law</li>
                    <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate business interests, provided these do not override your rights</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>5. How We Use Your Information</h2>
                <p style={pStyle}>We use your personal data for the following purposes:</p>
                <ul style={listStyle}>
                    <li>To create and manage your account</li>
                    <li>To process transactions and payments</li>
                    <li>To provide customer support</li>
                    <li>To send transactional communications (receipts, confirmations)</li>
                    <li>To send marketing communications (with your consent)</li>
                    <li>To improve and personalize our services</li>
                    <li>To detect and prevent fraud</li>
                    <li>To comply with legal obligations</li>
                    <li>To enforce our terms of service</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>6. Data Sharing and Disclosure</h2>
                <p style={pStyle}>We may share your personal data with:</p>
                <ul style={listStyle}>
                    <li><strong>Other Users:</strong> Limited profile information is visible to facilitate transactions</li>
                    <li><strong>Payment Processors:</strong> Paystack and mobile money providers for payment processing</li>
                    <li><strong>Service Providers:</strong> Third parties who assist in operating our platform (hosting, email, analytics)</li>
                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                </ul>
                <p style={{ ...pStyle, marginTop: '16px' }}>
                    We require all third parties to respect the security of your personal data and to treat it in
                    accordance with the Data Protection Act, 2012.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>7. International Data Transfers</h2>
                <p style={pStyle}>
                    Your personal data may be transferred to and processed in countries outside Ghana, including
                    countries that may not have equivalent data protection laws. In such cases, we will ensure
                    appropriate safeguards are in place in accordance with Section 40 of the Data Protection Act, 2012, including:
                </p>
                <ul style={listStyle}>
                    <li>Contractual provisions requiring the recipient to protect your data</li>
                    <li>Transfers to countries with adequate data protection laws</li>
                    <li>Your explicit consent for the transfer</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>8. Your Data Protection Rights</h2>
                <p style={pStyle}>
                    Under the Data Protection Act, 2012 (Act 843), you have the following rights:
                </p>
                <ul style={listStyle}>
                    <li><strong>Right of Access:</strong> Request a copy of your personal data we hold</li>
                    <li><strong>Right to Rectification:</strong> Request correction of inaccurate personal data</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your personal data (subject to legal requirements)</li>
                    <li><strong>Right to Restrict Processing:</strong> Request limitation of processing in certain circumstances</li>
                    <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                    <li><strong>Right to Data Portability:</strong> Request transfer of your data to another provider</li>
                    <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time (without affecting lawfulness of prior processing)</li>
                </ul>
                <p style={{ ...pStyle, marginTop: '16px' }}>
                    To exercise any of these rights, contact us at <strong>privacy@dwom.store</strong>.
                    We will respond within 30 days as required by law.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>9. Data Security</h2>
                <p style={pStyle}>
                    In accordance with the Data Protection Act and the Cybersecurity Act, 2020 (Act 1038),
                    we implement appropriate technical and organizational measures to protect your personal data, including:
                </p>
                <ul style={listStyle}>
                    <li>SSL/TLS encryption for data in transit</li>
                    <li>Encryption of sensitive data at rest</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Regular security assessments and audits</li>
                    <li>Employee training on data protection</li>
                    <li>Incident response procedures</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>10. Cookies and Tracking Technologies</h2>
                <p style={pStyle}>
                    We use cookies and similar technologies to enhance your experience. Types of cookies we use:
                </p>
                <ul style={listStyle}>
                    <li><strong>Essential Cookies:</strong> Required for the operation of our website</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                    <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
                </ul>
                <p style={{ ...pStyle, marginTop: '16px' }}>
                    You can manage cookie preferences through your browser settings. Note that disabling certain
                    cookies may affect functionality.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>11. Data Retention</h2>
                <p style={pStyle}>
                    We retain your personal data only for as long as necessary to fulfill the purposes for
                    which it was collected, including:
                </p>
                <ul style={listStyle}>
                    <li>Active accounts: Data retained while account is active</li>
                    <li>Closed accounts: Data retained for 7 years for legal and regulatory compliance</li>
                    <li>Transaction records: Retained as required by tax and financial regulations</li>
                    <li>Marketing data: Retained until consent is withdrawn</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>12. Children's Privacy</h2>
                <p style={pStyle}>
                    Our Service is not intended for individuals under 18 years of age. We do not knowingly
                    collect personal data from children. If we become aware that we have collected personal
                    data from a child without parental consent, we will take steps to delete that information.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>13. Data Breach Notification</h2>
                <p style={pStyle}>
                    In accordance with the Data Protection Act, 2012, we will notify the Data Protection
                    Commission and affected individuals of any personal data breach as soon as reasonably
                    practicable, where the breach is likely to result in a risk to your rights and freedoms.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>14. Complaints</h2>
                <p style={pStyle}>
                    If you have concerns about how we handle your personal data, you may:
                </p>
                <ul style={listStyle}>
                    <li>Contact our Data Protection Officer at privacy@dwom.store</li>
                    <li>Lodge a complaint with the Data Protection Commission of Ghana:
                        <ul style={{ listStyle: 'circle', paddingLeft: '24px', marginTop: '8px' }}>
                            <li>Website: www.dataprotection.org.gh</li>
                            <li>Location: Accra, Ghana</li>
                        </ul>
                    </li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>15. Changes to This Policy</h2>
                <p style={pStyle}>
                    We may update this Privacy Policy from time to time. We will notify you of any material
                    changes by posting the new policy on this page and updating the "Last updated" date.
                    Your continued use of the Service after changes constitutes acceptance of the updated policy.
                </p>
            </section>

            <section style={sectionStyle}>
                <h2 style={h2Style}>16. Contact Us</h2>
                <p style={pStyle}>
                    For questions about this Privacy Policy or our data practices:
                </p>
                <ul style={{ ...listStyle, listStyle: 'none', paddingLeft: '0' }}>
                    <li><strong>Email:</strong> privacy@dwom.store</li>
                    <li><strong>General Support:</strong> support@dwom.store</li>
                    <li><strong>Address:</strong> Accra, Ghana</li>
                </ul>
            </section>

            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                    This Privacy Policy is compliant with the Data Protection Act, 2012 (Act 843) of Ghana.
                </p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
                    <Link href="/terms" style={{ color: '#f97316', fontSize: '14px' }}>Terms of Service</Link>
                    <Link href="/faq" style={{ color: '#f97316', fontSize: '14px' }}>FAQ / Help</Link>
                </div>
            </div>
        </div>
    );
}
