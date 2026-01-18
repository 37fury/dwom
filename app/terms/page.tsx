import React from 'react';
import Link from 'next/link';
import styles from './terms.module.css';

export default function TermsPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.updated}>Last updated: January 18, 2026</p>
            <p className={styles.lawBanner}>
                These Terms are governed by the laws of the Republic of Ghana, including the Electronic Transactions Act, 2008 (Act 772),
                Data Protection Act, 2012 (Act 843), and other applicable legislation.
            </p>

            <section className={styles.section}>
                <h2>1. Introduction and Acceptance</h2>
                <p>
                    Welcome to dwom (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;), a digital marketplace platform registered and operating
                    under the laws of the Republic of Ghana. These Terms of Service (&quot;Terms&quot;) constitute a legally binding
                    agreement between you and dwom, governing your access to and use of our website at dwom.store and all
                    related services (collectively, the &quot;Service&quot;).
                </p>
                <p>
                    By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound
                    by these Terms in accordance with the <strong>Electronic Transactions Act, 2008 (Act 772)</strong> of Ghana,
                    which provides the legal framework for electronic contracts and agreements.
                </p>
            </section>

            <section className={styles.section}>
                <h2>2. Eligibility and Registration</h2>
                <p>To use our Service, you must:</p>
                <ul>
                    <li>Be at least 18 years of age, or the age of legal majority in your jurisdiction</li>
                    <li>Have the legal capacity to enter into binding contracts under Ghanaian law</li>
                    <li>Provide accurate, current, and complete registration information</li>
                    <li>Maintain the security and confidentiality of your account credentials</li>
                    <li>Comply with all applicable laws of Ghana, including but not limited to the Companies Act, 2019 (Act 992) if operating as a business</li>
                </ul>
                <p>
                    Sellers conducting business on our platform may be required to register with relevant Ghanaian authorities,
                    including the Registrar General&apos;s Department and the Ghana Revenue Authority.
                </p>
            </section>

            <section className={styles.section}>
                <h2>3. Data Protection and Privacy</h2>
                <p>
                    We are committed to protecting your personal data in accordance with the <strong>Data Protection Act, 2012 (Act 843)</strong> of Ghana.
                    As a registered data controller with the Data Protection Commission of Ghana, we adhere to the following principles:
                </p>
                <ul>
                    <li><strong>Lawfulness:</strong> We process personal data only on lawful grounds with your consent or as permitted by law</li>
                    <li><strong>Purpose Limitation:</strong> Your data is collected for specified, explicit, and legitimate purposes</li>
                    <li><strong>Data Minimization:</strong> We collect only the data necessary for the specified purposes</li>
                    <li><strong>Accuracy:</strong> We take reasonable steps to ensure personal data is accurate and up-to-date</li>
                    <li><strong>Storage Limitation:</strong> Personal data is retained only for as long as necessary</li>
                    <li><strong>Security:</strong> We implement appropriate technical and organizational measures to protect your data</li>
                    <li><strong>Accountability:</strong> We maintain records demonstrating compliance with data protection requirements</li>
                </ul>
                <p>
                    <strong>Your Data Rights:</strong> Under the Data Protection Act, you have the right to access, correct, delete,
                    object to processing, withdraw consent, and lodge complaints with the Data Protection Commission.
                </p>
                <p>For data protection inquiries, contact our Data Protection Officer at privacy@dwom.store</p>
            </section>

            <section className={styles.section}>
                <h2>4. Electronic Transactions</h2>
                <p>
                    All transactions conducted on our platform are governed by the <strong>Electronic Transactions Act, 2008 (Act 772)</strong>
                    and comply with the requirements for valid electronic contracts in Ghana.
                </p>
                <ul>
                    <li>Electronic signatures and records have the same legal effect as their physical counterparts</li>
                    <li>You consent to receive communications, notices, and records electronically</li>
                    <li>Transaction confirmations and receipts will be provided electronically</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>5. Payments and Financial Services</h2>
                <p>
                    Payment processing on our platform is conducted in accordance with the <strong>Payment Systems and Services Act, 2019 (Act 987)</strong>
                    and regulations issued by the Bank of Ghana.
                </p>
                <ul>
                    <li>We partner with licensed payment service providers (including Paystack) authorized by the Bank of Ghana</li>
                    <li>Mobile Money transactions are processed through licensed telecommunications operators</li>
                    <li>All payment processing complies with anti-money laundering (AML) and counter-terrorist financing (CTF) requirements</li>
                </ul>
                <p>
                    <strong>Seller Payouts:</strong> Sellers receive payments via mobile money or bank transfer.
                    A platform fee of 10% is deducted from each transaction. Payouts are processed within 24-48 hours of request.
                </p>
            </section>

            <section className={styles.section}>
                <h2>6. Taxation</h2>
                <p>Users are responsible for complying with all applicable tax obligations under Ghanaian law, including:</p>
                <ul>
                    <li><strong>Value Added Tax (VAT):</strong> As per the Value Added Tax Act, 2013 (Act 870), VAT may apply to digital services</li>
                    <li><strong>Income Tax:</strong> Sellers are responsible for declaring and paying income tax on their earnings</li>
                    <li><strong>Withholding Tax:</strong> Where applicable, we may be required to withhold taxes as mandated by the Ghana Revenue Authority</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>7. Consumer Protection</h2>
                <p>We are committed to fair trading practices and consumer protection in accordance with Ghanaian law:</p>
                <ul>
                    <li>All product descriptions must be accurate and not misleading</li>
                    <li>Pricing must be clearly displayed in Ghana Cedis (GH₵)</li>
                    <li>Sellers must honor their stated refund policies</li>
                    <li>Unsolicited marketing communications are prohibited without consent</li>
                </ul>
                <p>
                    <strong>Refunds:</strong> Refund policies vary by product and seller. To request a refund,
                    visit your <Link href="/dashboard/refunds">Refund Requests</Link> page.
                </p>
            </section>

            <section className={styles.section}>
                <h2>8. Intellectual Property</h2>
                <p>
                    Intellectual property rights are protected in accordance with the Copyright Act, 2005 (Act 690) and
                    Trade Marks Act, 2004 (Act 664) of Ghana. Sellers warrant that they own or have the right to sell the digital products listed.
                </p>
            </section>

            <section className={styles.section}>
                <h2>9. Cybersecurity</h2>
                <p>
                    In compliance with the <strong>Cybersecurity Act, 2020 (Act 1038)</strong>, we implement appropriate security measures
                    including secure encryption (SSL/TLS), regular security audits, and incident response procedures.
                </p>
            </section>

            <section className={styles.section}>
                <h2>10. Prohibited Content</h2>
                <p>The following are strictly prohibited on our platform:</p>
                <ul>
                    <li>Content that violates any law of Ghana</li>
                    <li>Fraudulent, deceptive, or misleading products</li>
                    <li>Hate speech, harassment, or discriminatory content</li>
                    <li>Malware, viruses, or harmful code</li>
                    <li>Counterfeit goods or unauthorized reproductions</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>11. Dispute Resolution</h2>
                <p>Disputes shall be resolved through negotiation, mediation under the Alternative Dispute Resolution Act, 2010 (Act 798),
                    or arbitration in Accra, Ghana. The courts of Ghana shall have exclusive jurisdiction.</p>
            </section>

            <section className={styles.section}>
                <h2>12. Limitation of Liability</h2>
                <p>
                    To the maximum extent permitted by Ghanaian law, dwom acts as an intermediary platform and is not liable for
                    transactions between users. Our liability shall not exceed the fees paid by you in the 12 months preceding the claim.
                </p>
            </section>

            <section className={styles.section}>
                <h2>13. Governing Law</h2>
                <p>These Terms shall be governed by the laws of the Republic of Ghana, including:</p>
                <ul>
                    <li>Electronic Transactions Act, 2008 (Act 772)</li>
                    <li>Data Protection Act, 2012 (Act 843)</li>
                    <li>Cybersecurity Act, 2020 (Act 1038)</li>
                    <li>Payment Systems and Services Act, 2019 (Act 987)</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>14. Contact Information</h2>
                <p>For questions about these Terms:</p>
                <ul className={styles.contactList}>
                    <li><strong>Email:</strong> support@dwom.store</li>
                    <li><strong>Data Protection:</strong> privacy@dwom.store</li>
                    <li><strong>Address:</strong> Accra, Ghana</li>
                </ul>
            </section>

            <div className={styles.footer}>
                <p>By using dwom, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.</p>
                <div className={styles.links}>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/faq">FAQ / Help</Link>
                </div>
            </div>
        </div>
    );
}
