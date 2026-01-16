import Link from 'next/link';
import { Crown, ArrowLeft, Check, Zap, Shield, Globe, Palette, FileText, Sparkles } from 'lucide-react';

const proFeatures = [
    { icon: Globe, text: 'Custom domain connection' },
    { icon: Palette, text: 'Full branding customization' },
    { icon: FileText, text: 'Professional invoices' },
    { icon: Sparkles, text: 'Custom product categories' },
    { icon: Shield, text: 'Priority support' },
];

export default function UpgradePage() {
    return (
        <div style={{ maxWidth: '600px', width: '100%', paddingBottom: '48px' }}>
            <Link
                href="/dashboard/seller/settings"
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
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                borderRadius: '24px',
                padding: '40px 32px',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 8px 32px rgba(249, 115, 22, 0.4)',
                    position: 'relative'
                }}>
                    <Crown size={36} />
                </div>

                <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', position: 'relative' }}>
                    Upgrade to Pro
                </h1>
                <p style={{ fontSize: '16px', opacity: 0.8, marginBottom: '32px', position: 'relative' }}>
                    Unlock premium features to grow your business faster.
                </p>

                {/* Price */}
                <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '32px',
                    position: 'relative'
                }}>
                    <div style={{ fontSize: '48px', fontWeight: '800', marginBottom: '4px' }}>
                        GH₵99<span style={{ fontSize: '18px', fontWeight: '500' }}>/month</span>
                    </div>
                    <p style={{ fontSize: '14px', opacity: 0.7 }}>
                        or GH₵899/year (save 25%)
                    </p>
                </div>

                {/* Features */}
                <div style={{
                    textAlign: 'left',
                    marginBottom: '32px',
                    position: 'relative'
                }}>
                    {proFeatures.map((feature, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            padding: '12px 0',
                            borderBottom: i < proFeatures.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                        }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: 'rgba(249, 115, 22, 0.2)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#f97316'
                            }}>
                                <feature.icon size={16} />
                            </div>
                            <span style={{ fontSize: '15px' }}>{feature.text}</span>
                            <Check size={18} style={{ marginLeft: 'auto', color: '#22c55e' }} />
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <button style={{
                    width: '100%',
                    padding: '18px',
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: '17px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    position: 'relative'
                }}>
                    <Zap size={20} />
                    Upgrade Now
                </button>

                <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '16px', position: 'relative' }}>
                    Cancel anytime. 14-day money-back guarantee.
                </p>
            </div>
        </div>
    );
}
