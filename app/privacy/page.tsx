import React from 'react';
import Link from 'next/link';
import styles from './privacy.module.css';

export default function PrivacyPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.updated}>Last updated: January 18, 2026</p>
            <p className={styles.lawBanner}>
                This Privacy Policy is prepared in accordance with the <strong>Data Protection Act, 2012 (Act 843)</strong> of
                the Republic of Ghana. dwam is registered as a data controller with the Data Protection Commission of Ghana.
            </p>

            <section className={styles.section}>
                <h2>1. Introduction</h2>
                <p>
                    dwam (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your personal data and respecting your privacy.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                    use our digital marketplace platform.
                </p>
            </section>

            <section className={styles.section}>
                <h2>2. Data Controller</h2>
                <p>For the purposes of the Data Protection Act, 2012 (Act 843), the data controller is:</p>
                <ul className={styles.contactList}>
                    <li><strong>Company:</strong> dwam</li>
                    <li><strong>Location:</strong> Accra, Ghana</li>
                    <li><strong>Email:</strong> privacy@dwam.store</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>3. Information We Collect</h2>
                <h3>3.1 Information You Provide</h3>
                <ul>
                    <li>Account information: name, email address, phone number, password</li>
                    <li>Profile information: profile picture, bio, location</li>
                    <li>Payment information: mobile money number, bank account details (for sellers)</li>
                    <li>Transaction information: purchase history, sales records</li>
                </ul>

                <h3>3.2 Information Collected Automatically</h3>
                <ul>
                    <li>Device information: device type, operating system, browser type</li>
                    <li>Log data: IP address, access times, pages viewed</li>
                    <li>Location data: approximate location based on IP address</li>
                    <li>Cookies and similar technologies</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>4. Legal Basis for Processing</h2>
                <p>Under the Data Protection Act, 2012 (Act 843), we process your personal data on the following lawful grounds:</p>
                <ul>
                    <li><strong>Consent:</strong> Where you have given explicit consent for specific purposes</li>
                    <li><strong>Contractual Necessity:</strong> Processing necessary for the performance of our service agreement</li>
                    <li><strong>Legal Obligation:</strong> Processing necessary for compliance with Ghanaian law</li>
                    <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate business interests</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>5. How We Use Your Information</h2>
                <ul>
                    <li>To create and manage your account</li>
                    <li>To process transactions and payments</li>
                    <li>To provide customer support</li>
                    <li>To send transactional communications (receipts, confirmations)</li>
                    <li>To improve and personalize our services</li>
                    <li>To detect and prevent fraud</li>
                    <li>To comply with legal obligations</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>6. Data Sharing</h2>
                <p>We may share your personal data with:</p>
                <ul>
                    <li><strong>Other Users:</strong> Limited profile information is visible to facilitate transactions</li>
                    <li><strong>Payment Processors:</strong> Paystack and mobile money providers for payment processing</li>
                    <li><strong>Service Providers:</strong> Third parties who assist in operating our platform</li>
                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>7. Your Data Protection Rights</h2>
                <p>Under the Data Protection Act, 2012 (Act 843), you have the following rights:</p>
                <ul>
                    <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                    <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                    <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
                    <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
                </ul>
                <p>To exercise any of these rights, contact us at <strong>privacy@dwam.store</strong>. We will respond within 30 days.</p>
            </section>

            <section className={styles.section}>
                <h2>8. Data Security</h2>
                <p>
                    In accordance with the Data Protection Act and the Cybersecurity Act, 2020 (Act 1038),
                    we implement appropriate technical and organizational measures including SSL/TLS encryption,
                    access controls, regular security assessments, and incident response procedures.
                </p>
            </section>

            <section className={styles.section}>
                <h2>9. Cookies</h2>
                <ul>
                    <li><strong>Essential Cookies:</strong> Required for the operation of our website</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                </ul>
                <p>You can manage cookie preferences through your browser settings.</p>
            </section>

            <section className={styles.section}>
                <h2>10. Data Retention</h2>
                <ul>
                    <li>Active accounts: Data retained while account is active</li>
                    <li>Closed accounts: Data retained for 7 years for legal compliance</li>
                    <li>Marketing data: Retained until consent is withdrawn</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>11. Complaints</h2>
                <p>If you have concerns about how we handle your personal data, you may:</p>
                <ul>
                    <li>Contact our Data Protection Officer at privacy@dwam.store</li>
                    <li>Lodge a complaint with the Data Protection Commission of Ghana at www.dataprotection.org.gh</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>12. Contact Us</h2>
                <ul className={styles.contactList}>
                    <li><strong>Email:</strong> privacy@dwam.store</li>
                    <li><strong>General Support:</strong> support@dwam.store</li>
                    <li><strong>Address:</strong> Accra, Ghana</li>
                </ul>
            </section>

            <div className={styles.footer}>
                <p>This Privacy Policy is compliant with the Data Protection Act, 2012 (Act 843) of Ghana.</p>
                <div className={styles.links}>
                    <Link href="/terms">Terms of Service</Link>
                    <Link href="/faq">FAQ / Help</Link>
                </div>
            </div>
        </div>
    );
}
