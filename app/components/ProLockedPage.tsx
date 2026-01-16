import Link from 'next/link';
import { ArrowLeft, Crown, Lock } from 'lucide-react';

interface ProLockedPageProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    backHref?: string;
}

export default function ProLockedPage({ title, description, icon, backHref = '/dashboard/seller/settings' }: ProLockedPageProps) {
    return (
        <div style={{ maxWidth: '600px', width: '100%', paddingBottom: '48px' }}>
            <Link
                href={backHref}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '24px'
                }}
            >
                <ArrowLeft size={16} />
                Back to Settings
            </Link>

            <div style={{
                background: 'white',
                borderRadius: '24px',
                border: '1px solid #e2e8f0',
                padding: '48px 32px',
                textAlign: 'center'
            }}>
                {/* Icon */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    position: 'relative',
                    color: '#94a3b8'
                }}>
                    {icon}
                    <div style={{
                        position: 'absolute',
                        bottom: '-4px',
                        right: '-4px',
                        width: '28px',
                        height: '28px',
                        background: 'linear-gradient(135deg, #f97316, #ea580c)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)'
                    }}>
                        <Lock size={14} />
                    </div>
                </div>

                <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                    {title}
                </h1>
                <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px', maxWidth: '300px', margin: '0 auto 32px' }}>
                    {description}
                </p>

                {/* Pro Badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    marginBottom: '24px'
                }}>
                    <Crown size={18} style={{ color: '#f59e0b' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#92400e' }}>
                        This is a Pro feature
                    </span>
                </div>

                {/* CTA */}
                <Link
                    href="/dashboard/seller/settings/upgrade"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%',
                        maxWidth: '280px',
                        margin: '0 auto',
                        padding: '16px',
                        background: 'linear-gradient(135deg, #f97316, #ea580c)',
                        color: 'white',
                        borderRadius: '14px',
                        fontSize: '15px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        boxShadow: '0 4px 16px rgba(249, 115, 22, 0.3)',
                        transition: 'all 0.2s'
                    }}
                >
                    <Crown size={18} />
                    Upgrade to Pro
                </Link>
            </div>
        </div>
    );
}
