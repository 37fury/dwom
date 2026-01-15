import React from 'react';

export default function PrivacyPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', lineHeight: '1.6', color: '#334155' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px', color: '#0f172a' }}>Privacy Policy</h1>
            <p style={{ marginBottom: '16px' }}>Last updated: January 14, 2026</p>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>1. Information Collection</h2>
                <p>We collect information you provide directly to us, such as when you create an account, update your profile, make a purchase, or communicate with us.</p>
                <p>Types of data collected: Email address, First name and last name, Phone number, Address, Cookies and Usage Data.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>2. Use of Data</h2>
                <p>dwom uses the collected data for various purposes:</p>
                <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginTop: '12px' }}>
                    <li>To provide and maintain our Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To allow you to participate in interactive features of our Service</li>
                    <li>To provide customer support</li>
                    <li>To monitor the usage of our Service</li>
                    <li>To detect, prevent and address technical issues</li>
                </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>3. Data Security</h2>
                <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>4. Service Providers</h2>
                <p>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), provide the Service on our behalf, perform Service-related services or assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
            </section>

            <p style={{ marginTop: '48px', color: '#64748b', fontSize: '14px' }}>
                Contact us at privacy@dwom.com for any questions.
            </p>
        </div>
    );
}
