'use client';

import { useState } from 'react';
import styles from './integrations.module.css';
import { Link2, Check, ExternalLink } from 'lucide-react';

export default function IntegrationsPage() {
    const [connecting, setConnecting] = useState<string | null>(null);
    const [connected, setConnected] = useState<string[]>(['telegram']);

    const handleConnect = (platform: string) => {
        setConnecting(platform);
        setTimeout(() => {
            setConnected(prev => [...prev, platform]);
            setConnecting(null);
        }, 2000);
    };

    const handleDisconnect = (platform: string) => {
        setConnected(prev => prev.filter(p => p !== platform));
    };

    const connectedCount = connected.length;

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>
                <Link2 size={28} />
                Connected Accounts
            </h2>
            <p className={styles.subheading}>
                Connect your accounts to claim access to communities, signals, and exclusive content.
            </p>

            <div className={styles.grid}>
                {/* WhatsApp Card */}
                <div className={`${styles.card} ${connected.includes('whatsapp') ? styles.whatsappConnected : ''}`}>
                    <div className={styles.cardHeader}>
                        <div className={styles.icon} style={{ background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#ffffff"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.894-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                        </div>
                        <div className={styles.cardInfo}>
                            <h3>WhatsApp</h3>
                            <p>Receive trading signals and join community chats.</p>
                        </div>
                    </div>
                    {connected.includes('whatsapp') ? (
                        <>
                            <div className={styles.connectedBadge} style={{ color: '#166534', background: '#dcfce7' }}>
                                <Check size={18} />
                                <span>Connected to +233 55 XXX XXXX</span>
                            </div>
                            <div className={styles.cardFooter}>
                                <button className={styles.disconnectBtn} onClick={() => handleDisconnect('whatsapp')}>
                                    Disconnect
                                </button>
                                <button className={styles.manageBtn}>
                                    <ExternalLink size={14} style={{ marginRight: '4px' }} />
                                    Manage
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            className={styles.btnConnect}
                            onClick={() => handleConnect('whatsapp')}
                            disabled={connecting === 'whatsapp'}
                        >
                            {connecting === 'whatsapp' ? 'Scanning QR Code...' : 'Connect WhatsApp'}
                        </button>
                    )}
                </div>

                {/* Telegram Card */}
                <div className={`${styles.card} ${connected.includes('telegram') ? styles.cardConnected : ''}`}>
                    <div className={styles.cardHeader}>
                        <div className={styles.icon} style={{ background: '#0088cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#ffffff">
                                <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                            </svg>
                        </div>
                        <div className={styles.cardInfo}>
                            <h3>Telegram</h3>
                            <p>Unlock access to private channels and bots.</p>
                        </div>
                    </div>
                    {connected.includes('telegram') ? (
                        <>
                            <div className={styles.connectedBadge} style={{ color: '#0369a1', background: '#e0f2fe' }}>
                                <Check size={18} />
                                <span>Connected as @deezy</span>
                            </div>
                            <div className={styles.cardFooter}>
                                <button className={styles.disconnectBtn} onClick={() => handleDisconnect('telegram')}>
                                    Disconnect
                                </button>
                                <button className={styles.manageBtn}>
                                    <ExternalLink size={14} style={{ marginRight: '4px' }} />
                                    Open Telegram
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            className={styles.btnConnect}
                            onClick={() => handleConnect('telegram')}
                            disabled={connecting === 'telegram'}
                        >
                            {connecting === 'telegram' ? 'Connecting...' : 'Connect Telegram'}
                        </button>
                    )}
                </div>

                {/* Discord Card */}
                <div className={`${styles.card} ${connected.includes('discord') ? styles.discordConnected : ''}`}>
                    <div className={styles.cardHeader}>
                        <div className={styles.icon} style={{ background: '#5865F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#ffffff"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" /></svg>
                        </div>
                        <div className={styles.cardInfo}>
                            <h3>Discord</h3>
                            <p>Claim roles and access private servers.</p>
                        </div>
                    </div>
                    {connected.includes('discord') ? (
                        <>
                            <div className={styles.connectedBadge} style={{ color: '#4338ca', background: '#e0e7ff' }}>
                                <Check size={18} />
                                <span>Connected as Deezy#1234</span>
                            </div>
                            <div className={styles.cardFooter}>
                                <button className={styles.disconnectBtn} onClick={() => handleDisconnect('discord')}>
                                    Disconnect
                                </button>
                                <button className={styles.manageBtn}>
                                    <ExternalLink size={14} style={{ marginRight: '4px' }} />
                                    Open Discord
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            className={styles.btnConnect}
                            onClick={() => handleConnect('discord')}
                            disabled={connecting === 'discord'}
                        >
                            {connecting === 'discord' ? 'Authorizing...' : 'Connect Discord'}
                        </button>
                    )}
                </div>
            </div>

            {/* Connection Stats */}
            <div className={styles.statusSection}>
                <h3 className={styles.statusTitle}>Connection Status</h3>
                <div className={styles.statusGrid}>
                    <div className={styles.statusItem}>
                        <div className={styles.statusValue} style={{ color: '#22c55e' }}>{connectedCount}</div>
                        <div className={styles.statusLabel}>Connected</div>
                    </div>
                    <div className={styles.statusItem}>
                        <div className={styles.statusValue}>{3 - connectedCount}</div>
                        <div className={styles.statusLabel}>Pending</div>
                    </div>
                    <div className={styles.statusItem}>
                        <div className={styles.statusValue}>3</div>
                        <div className={styles.statusLabel}>Available</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
