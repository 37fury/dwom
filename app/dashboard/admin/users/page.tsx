import Link from 'next/link';
import { ArrowLeft, Users, Search, MoreVertical } from 'lucide-react';
import styles from './users.module.css';

export default function AdminUsersPage() {
    // Mock users data
    const users = [
        { id: '1', name: 'Kofi Mensah', email: 'kofi@example.com', role: 'seller', status: 'verified', joined: '2024-01-10' },
        { id: '2', name: 'Ama Osei', email: 'ama@example.com', role: 'seller', status: 'pending', joined: '2024-01-12' },
        { id: '3', name: 'Yaw Asante', email: 'yaw@example.com', role: 'buyer', status: 'active', joined: '2024-01-08' },
        { id: '4', name: 'Akua Darko', email: 'akua@example.com', role: 'seller', status: 'verified', joined: '2024-01-05' },
    ];

    return (
        <div className={styles.container}>
            <Link href="/dashboard/admin" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <header className={styles.header}>
                <h1 className={styles.title}>
                    <Users size={28} />
                    User Management
                </h1>
                <p className={styles.subtitle}>View and manage all platform users</p>
            </header>

            {/* Search Bar */}
            <div className={styles.searchBar}>
                <Search size={18} />
                <input type="text" placeholder="Search users..." />
            </div>

            {/* Users List */}
            <div className={styles.usersList}>
                {users.map(user => (
                    <div key={user.id} className={styles.userCard}>
                        <div className={styles.userHeader}>
                            <div className={styles.userAvatar}>
                                {user.name.charAt(0)}
                            </div>
                            <div className={styles.userInfo}>
                                <h4>{user.name}</h4>
                                <span>{user.email}</span>
                            </div>
                        </div>
                        <div className={styles.userMeta}>
                            <span className={`${styles.badge} ${styles[user.role]}`}>
                                {user.role}
                            </span>
                            <span className={`${styles.badge} ${styles[user.status]}`}>
                                {user.status}
                            </span>
                            <span className={styles.joinedDate}>
                                Joined {user.joined}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
