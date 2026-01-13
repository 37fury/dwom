import Link from 'next/link';
import Image from 'next/image';

type Props = {
    platform: 'discord' | 'telegram' | 'whatsapp';
    url: string;
    name: string;
};

export default function CommunityCard({ platform, url, name }: Props) {
    const config = {
        discord: { color: '#5865F2', label: 'Discord', icon: '/discord.svg' }, // We might not have icons yet, so we'll simulate or use text
        telegram: { color: '#24A1DE', label: 'Telegram', icon: '/telegram.svg' },
        whatsapp: { color: '#25D366', label: 'WhatsApp', icon: '/whatsapp.svg' }
    };

    const { color, label } = config[platform];

    return (
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: color, borderRadius: '50%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                {label[0]}
            </div>
            <h3 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px', color: '#0f172a' }}>{name}</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Join the private {label} community.</p>

            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    background: color,
                    color: 'white',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    textDecoration: 'none',
                    width: '100%'
                }}
            >
                Join {label}
            </a>
        </div>
    );
}
