import { db } from '@/app/lib/db';
import { ArrowLeft, Activity, Monitor, Smartphone, Globe, Clock, MapPin, Shield, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import styles from './activity.module.css';

export default async function ActivityLogPage() {
    const user = await db.getUser();
    if (!user) return <div>Unauthorized</div>;

    // Fetch activity logs
    const logs = await db.getActivityLogs();

    const getDeviceIcon = (device: string) => {
        if (device.toLowerCase().includes('mobile') || device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) {
            return <Smartphone size={18} />;
        }
        return <Monitor size={18} />;
    };

    const getActionIcon = (action: string) => {
        if (action.includes('login')) return <Shield size={16} />;
        if (action.includes('failed')) return <AlertTriangle size={16} />;
        return <Activity size={16} />;
    };

    const getActionColor = (action: string) => {
        if (action.includes('failed')) return '#ef4444';
        if (action.includes('login')) return '#22c55e';
        if (action.includes('password')) return '#f59e0b';
        return '#3b82f6';
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard/settings" className={styles.backLink}>
                <ArrowLeft size={18} /> Back to Settings
            </Link>

            <header className={styles.header}>
                <Activity size={28} />
                <div>
                    <h1>Activity Log</h1>
                    <p>Review your account activity and login history</p>
                </div>
            </header>

            {logs.length === 0 ? (
                <div className={styles.empty}>
                    <Activity size={48} />
                    <h3>No activity yet</h3>
                    <p>Your login and security activity will appear here</p>
                </div>
            ) : (
                <div className={styles.logList}>
                    {logs.map((log: any, index: number) => (
                        <div key={index} className={styles.logItem}>
                            <div
                                className={styles.actionIcon}
                                style={{ background: `${getActionColor(log.action)}15`, color: getActionColor(log.action) }}
                            >
                                {getActionIcon(log.action)}
                            </div>

                            <div className={styles.logContent}>
                                <p className={styles.action}>{log.action}</p>
                                <div className={styles.meta}>
                                    <span className={styles.metaItem}>
                                        {getDeviceIcon(log.device || 'desktop')}
                                        {log.device || 'Unknown device'}
                                    </span>
                                    <span className={styles.metaItem}>
                                        <Globe size={14} />
                                        {log.ipAddress || 'Unknown IP'}
                                    </span>
                                    {log.location && (
                                        <span className={styles.metaItem}>
                                            <MapPin size={14} />
                                            {log.location}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className={styles.timestamp}>
                                <Clock size={14} />
                                {new Date(log.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.securityTip}>
                <Shield size={20} />
                <div>
                    <h4>Security Tip</h4>
                    <p>If you see any suspicious activity, change your password immediately and enable 2FA.</p>
                </div>
            </div>
        </div>
    );
}
