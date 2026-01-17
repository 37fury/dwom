import { ChevronDown, HelpCircle, MessageCircle, Mail, Search } from 'lucide-react';
import Link from 'next/link';
import styles from './faq.module.css';

const faqs = [
    {
        category: 'Getting Started',
        questions: [
            {
                q: 'How do I create an account on Dwom?',
                a: 'Click "Sign Up" at the top of the page, enter your email and create a password. You can also sign up with your Google account for faster access.'
            },
            {
                q: 'Is Dwom free to use?',
                a: 'Yes! Creating an account and buying products is completely free. Sellers pay a small commission (10%) only when they make a sale. No upfront costs.'
            },
            {
                q: 'What can I sell on Dwom?',
                a: 'You can sell digital products like online courses, ebooks, templates, software, music, art, and more. Physical products are coming soon!'
            },
        ]
    },
    {
        category: 'Payments',
        questions: [
            {
                q: 'What payment methods are accepted?',
                a: 'We accept MTN Mobile Money, Vodafone Cash, AirtelTigo Money, and all major debit/credit cards through our secure Paystack integration.'
            },
            {
                q: 'How do I receive payouts as a seller?',
                a: 'Go to Seller Dashboard > Payouts, enter your mobile money or bank details, and request a withdrawal. Payouts are processed within 24-48 hours.'
            },
            {
                q: 'What is the minimum withdrawal amount?',
                a: 'The minimum withdrawal is GH₵10. There are no maximum limits on how much you can withdraw.'
            },
            {
                q: 'Are there any hidden fees?',
                a: 'No hidden fees! Buyers pay the listed price. Sellers receive 90% of each sale (we take a 10% platform fee to cover payment processing and hosting).'
            },
        ]
    },
    {
        category: 'Selling',
        questions: [
            {
                q: 'How do I become a seller?',
                a: 'Go to your Dashboard and click "Become a Seller". Fill out your store details, add your payout information, and start creating products!'
            },
            {
                q: 'What is Dwom Pro?',
                a: 'Dwom Pro is our premium seller plan that reduces platform fees, provides priority support, advanced analytics, and a verified badge on your products.'
            },
            {
                q: 'How do I create discount codes?',
                a: 'Go to Seller Dashboard > Discounts. Click "Create Code", set the percentage discount and optional expiry date. Share the code with your customers!'
            },
        ]
    },
    {
        category: 'Buying',
        questions: [
            {
                q: 'How do I access my purchased products?',
                a: 'After purchase, go to your Dashboard > My Purchases. You\'ll find all your purchased courses, downloads, and community access there.'
            },
            {
                q: 'Can I get a refund?',
                a: 'Refund policies vary by product and seller. Digital products are generally non-refundable, but you can contact the seller or our support team if you have issues.'
            },
            {
                q: 'How do I leave a review?',
                a: 'After purchasing a product, visit the product page and scroll down to the reviews section. Click "Write a Review" to share your experience.'
            },
        ]
    },
    {
        category: 'Account & Security',
        questions: [
            {
                q: 'How do I reset my password?',
                a: 'Click "Login", then "Forgot Password". Enter your email and we\'ll send you a reset link. Check your spam folder if you don\'t see it.'
            },
            {
                q: 'Is my payment information secure?',
                a: 'Absolutely! We use Paystack, a PCI-DSS compliant payment processor. We never store your card details on our servers.'
            },
        ]
    },
];

export default function FAQPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1><HelpCircle size={36} /> Help Center</h1>
                <p>Find answers to common questions about Dwom</p>

                <div className={styles.searchBox}>
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        className={styles.searchInput}
                    />
                </div>
            </header>

            <div className={styles.content}>
                <main className={styles.faqList}>
                    {faqs.map((section, idx) => (
                        <section key={idx} className={styles.category}>
                            <h2 className={styles.categoryTitle}>{section.category}</h2>
                            <div className={styles.questions}>
                                {section.questions.map((faq, qIdx) => (
                                    <details key={qIdx} className={styles.faqItem}>
                                        <summary className={styles.question}>
                                            {faq.q}
                                            <ChevronDown size={20} className={styles.chevron} />
                                        </summary>
                                        <p className={styles.answer}>{faq.a}</p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    ))}
                </main>

                <aside className={styles.sidebar}>
                    <div className={styles.contactCard}>
                        <h3>Still need help?</h3>
                        <p>Our support team is here to assist you.</p>

                        <Link href="/contact" className={styles.contactBtn}>
                            <MessageCircle size={18} />
                            Chat with us
                        </Link>

                        <a href="mailto:support@dwom.store" className={styles.emailLink}>
                            <Mail size={16} />
                            support@dwom.store
                        </a>
                    </div>

                    <div className={styles.linksCard}>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/terms">Terms of Service</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/dashboard/seller">Seller Dashboard</Link></li>
                            <li><Link href="/dashboard">My Dashboard</Link></li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
