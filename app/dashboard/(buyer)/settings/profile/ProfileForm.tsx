'use client';

import { useState } from 'react';
import { updateProfileAction } from './actions';
import { User } from '@/app/lib/db';
import {
    User as UserIcon,
    AtSign,
    FileText,
    Link as LinkIcon,
    Upload,
    Camera,
    Twitter,
    Instagram,
    Youtube,
    Globe,
    Check,
    Shield,
    Lock,
    Calendar,
    Phone,
    MapPin
} from 'lucide-react';
import styles from './profile.module.css';

export default function ProfileForm({ user }: { user: User }) {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setMsg('');

        const res = await updateProfileAction(formData);
        setLoading(false);

        if (res.success) {
            setMsg('success');
        } else {
            setMsg(`error:${res.error}`);
        }
    }

    return (
        <form action={handleSubmit} className={styles.form}>
            {/* Profile Photo Section */}
            <div className={styles.photoSection}>
                <div className={styles.photoWrapper}>
                    <div className={styles.photoPlaceholder}>
                        {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt="Profile" className={styles.photo} />
                        ) : (
                            <UserIcon size={40} />
                        )}
                    </div>
                    <div className={styles.photoOverlay}>
                        <Camera size={20} />
                    </div>
                </div>
                <button type="button" className={styles.uploadBtn}>
                    <Upload size={16} />
                    Upload Photo
                </button>
                <p className={styles.photoHint}>Recommended: Square image, at least 400×400px. Max 5MB.</p>
            </div>

            {/* Basic Info Section */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    <UserIcon size={18} />
                    Basic Information
                </h3>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input
                        name="full_name"
                        defaultValue={user.name}
                        required
                        className={styles.input}
                        placeholder="Your legal full name"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        <AtSign size={14} />
                        Username
                    </label>
                    <div className={styles.inputWithPrefix}>
                        <span className={styles.prefix}>dwom.store/</span>
                        <input
                            name="username"
                            defaultValue={user.username || ''}
                            required
                            placeholder="yourname"
                            className={styles.input}
                        />
                    </div>
                    <p className={styles.inputHint}>This will be your public store URL. Choose carefully!</p>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className={`${styles.input} ${styles.disabled}`}
                    />
                    <p className={styles.inputHint}>
                        <Lock size={12} />
                        Email cannot be changed
                    </p>
                </div>

                <div className={styles.row}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <Phone size={14} />
                            Phone Number
                        </label>
                        <input
                            name="phone"
                            type="tel"
                            defaultValue={user.phone || ''}
                            className={styles.input}
                            placeholder="024 XXX XXXX"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <Calendar size={14} />
                            Date of Birth
                        </label>
                        <input
                            name="dateOfBirth"
                            type="date"
                            defaultValue={user.dateOfBirth || ''}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        <MapPin size={14} />
                        Location
                    </label>
                    <input
                        name="location"
                        defaultValue={user.location || ''}
                        className={styles.input}
                        placeholder="City, Country (e.g. Accra, Ghana)"
                    />
                </div>
            </div>

            {/* Bio Section */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    <FileText size={18} />
                    About You
                </h3>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Bio</label>
                    <textarea
                        name="bio"
                        defaultValue={user.bio || ''}
                        rows={4}
                        placeholder="Tell customers about yourself and what you sell..."
                        className={styles.textarea}
                    />
                    <p className={styles.inputHint}>This appears on your public store page</p>
                </div>
            </div>

            {/* Social Links Section */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    <LinkIcon size={18} />
                    Social Links
                </h3>
                <p className={styles.sectionDesc}>Connect your social accounts to build trust with buyers</p>

                <div className={styles.socialGrid}>
                    <div className={styles.socialInput}>
                        <div className={styles.socialIcon} style={{ background: '#1da1f2' }}>
                            <Twitter size={16} />
                        </div>
                        <input
                            name="twitter"
                            defaultValue={user.socialLinks?.twitter || ''}
                            placeholder="@username"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.socialInput}>
                        <div className={styles.socialIcon} style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}>
                            <Instagram size={16} />
                        </div>
                        <input
                            name="instagram"
                            defaultValue={user.socialLinks?.instagram || ''}
                            placeholder="@username"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.socialInput}>
                        <div className={styles.socialIcon} style={{ background: '#ff0000' }}>
                            <Youtube size={16} />
                        </div>
                        <input
                            name="youtube"
                            defaultValue={user.socialLinks?.youtube || ''}
                            placeholder="Channel URL"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.socialInput}>
                        <div className={styles.socialIcon} style={{ background: '#0f172a' }}>
                            <Globe size={16} />
                        </div>
                        <input
                            name="website"
                            defaultValue={user.socialLinks?.website || ''}
                            placeholder="https://yourwebsite.com"
                            className={styles.input}
                        />
                    </div>
                </div>
            </div>

            {/* Admin-Only Info Notice */}
            <div className={styles.adminNotice}>
                <Shield size={18} />
                <div>
                    <strong>Security Information</strong>
                    <p>Your date of birth, phone number, and location are visible only to platform administrators for verification and security purposes.</p>
                </div>
            </div>

            {/* Message */}
            {msg && (
                <div className={`${styles.message} ${msg.startsWith('error') ? styles.error : styles.success}`}>
                    {msg.startsWith('error') ? (
                        <>❌ {msg.replace('error:', '')}</>
                    ) : (
                        <>
                            <Check size={18} />
                            Profile updated successfully!
                        </>
                    )}
                </div>
            )}

            {/* Submit Button */}
            <button type="submit" disabled={loading} className={styles.submitBtn}>
                <Check size={18} />
                {loading ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    );
}
