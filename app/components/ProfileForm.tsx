'use client';

import { useState, useRef } from 'react';
import { updateProfileAction } from '../dashboard/(buyer)/settings/actions';
import { Camera, Upload, User, Trash2, Check } from 'lucide-react';

export default function ProfileForm({ user }: { user: any }) {
    const [message, setMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (formData: FormData) => {
        setIsSaving(true);
        setMessage('');

        const success = await updateProfileAction(user.id, formData);

        setIsSaving(false);
        if (success) {
            setMessage('Profile updated successfully!');
        } else {
            setMessage('Failed to update profile.');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const currentImage = previewUrl || user?.avatar_url;

    return (
        <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0'
        }}>
            <form action={handleSubmit}>
                {/* Modern Photo Upload Section */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '32px',
                    marginBottom: '24px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    borderRadius: '16px',
                    border: '1px dashed #cbd5e1'
                }}>
                    {/* Avatar Container */}
                    <div style={{ position: 'relative', marginBottom: '20px' }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: currentImage ? 'transparent' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '4px solid white',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                        }}>
                            {currentImage ? (
                                <img
                                    src={currentImage}
                                    alt="Profile"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <User size={48} color="white" />
                            )}
                        </div>

                        {/* Camera Badge */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                                position: 'absolute',
                                bottom: '0',
                                right: '0',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                border: '3px solid white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
                            }}
                        >
                            <Camera size={16} color="white" />
                        </button>
                    </div>

                    {/* Upload Buttons */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Upload size={16} />
                            Upload Photo
                        </button>

                        {currentImage && (
                            <button
                                type="button"
                                onClick={handleRemovePhoto}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px 20px',
                                    background: 'white',
                                    color: '#ef4444',
                                    border: '1px solid #fecaca',
                                    borderRadius: '10px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                <Trash2 size={16} />
                                Remove
                            </button>
                        )}
                    </div>

                    <p style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                        marginTop: '16px',
                        textAlign: 'center'
                    }}>
                        Recommended: Square image, at least 400x400px. Max 5MB.
                    </p>

                    <input
                        ref={fileInputRef}
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>

                {/* Form Fields */}
                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="name" style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#334155',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Full Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={user?.name}
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '10px',
                            border: '1px solid #e2e8f0',
                            fontSize: '15px',
                            transition: 'all 0.2s'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label htmlFor="email" style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#334155',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={user?.email}
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '10px',
                            border: '1px solid #e2e8f0',
                            fontSize: '15px',
                            background: '#f8fafc',
                            color: '#64748b'
                        }}
                        disabled
                    />
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                        Email cannot be changed
                    </p>
                </div>

                {message && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        marginBottom: '16px',
                        background: message.includes('success') ? '#f0fdf4' : '#fef2f2',
                        color: message.includes('success') ? '#166534' : '#dc2626',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        {message.includes('success') && <Check size={16} />}
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSaving}
                    style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: 'white',
                        padding: '14px 24px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        fontSize: '15px',
                        border: 'none',
                        cursor: isSaving ? 'not-allowed' : 'pointer',
                        opacity: isSaving ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
                    }}
                >
                    {isSaving ? 'Saving...' : (
                        <>
                            <Check size={18} />
                            Save Changes
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
