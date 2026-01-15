'use client';

import { useState } from 'react';
import { uploadFile } from '@/app/lib/storage';
import { createCampaignAction } from './actions';
import {
    Music,
    Package,
    Calendar,
    Smartphone,
    Store,
    GraduationCap,
    Sparkles,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { CampaignType } from '@/app/lib/db';

const campaignTypes: { type: CampaignType; label: string; icon: React.ComponentType<{ size?: number }>; color: string; description: string }[] = [
    { type: 'music', label: 'Music', icon: Music, color: '#f97316', description: 'Promote songs and audio' },
    { type: 'product', label: 'Product', icon: Package, color: '#3b82f6', description: 'Brand & product promotions' },
    { type: 'event', label: 'Event', icon: Calendar, color: '#8b5cf6', description: 'Events & tickets' },
    { type: 'app', label: 'App', icon: Smartphone, color: '#22c55e', description: 'App downloads' },
    { type: 'business', label: 'Business', icon: Store, color: '#ec4899', description: 'Local business promos' },
    { type: 'course', label: 'Course', icon: GraduationCap, color: '#eab308', description: 'Education & courses' },
    { type: 'custom', label: 'Custom', icon: Sparkles, color: '#06b6d4', description: 'Create your own type' }
];

export default function CampaignForm() {
    const [uploading, setUploading] = useState(false);
    const [selectedType, setSelectedType] = useState<CampaignType>('music');
    const [customTypeName, setCustomTypeName] = useState('');
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);

    const selectedTypeConfig = campaignTypes.find(t => t.type === selectedType)!;

    async function handleSubmit(formData: FormData) {
        setUploading(true);
        try {
            let audioUrl = '';
            let coverImageUrl = '';

            // Upload Audio (only required for music)
            if (audioFile) {
                const { url, error } = await uploadFile('campaign-media', audioFile);
                if (error) {
                    alert('Audio upload failed: ' + error);
                    setUploading(false);
                    return;
                }
                audioUrl = url;
            } else if (selectedType === 'music') {
                alert('Audio file is required for music campaigns');
                setUploading(false);
                return;
            }

            // Upload Cover Image (Optional)
            if (coverFile) {
                const { url, error } = await uploadFile('campaign-media', coverFile);
                if (!error) {
                    coverImageUrl = url;
                }
            }

            // Add type to form data
            formData.set('type', selectedType);
            if (selectedType === 'custom' && customTypeName) {
                formData.set('customType', customTypeName);
            }

            await createCampaignAction(formData, { audioUrl, coverImageUrl });

        } catch (err) {
            console.error(err);
            alert('Failed to create campaign');
            setUploading(false);
        }
    }

    // Dynamic field labels based on type
    const getFieldLabels = () => {
        switch (selectedType) {
            case 'music':
                return { title: 'Song Title', subtitle: 'Artist Name' };
            case 'product':
                return { title: 'Product Name', subtitle: 'Brand Name' };
            case 'event':
                return { title: 'Event Name', subtitle: 'Venue / Location' };
            case 'app':
                return { title: 'App Name', subtitle: 'Platform (iOS/Android)' };
            case 'business':
                return { title: 'Business Name', subtitle: 'Business Category' };
            case 'course':
                return { title: 'Course Title', subtitle: 'Instructor Name' };
            case 'custom':
                return { title: 'Campaign Title', subtitle: 'Subtitle' };
            default:
                return { title: 'Title', subtitle: 'Subtitle' };
        }
    };

    const labels = getFieldLabels();

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            {/* Back Link */}
            <Link href="/dashboard/seller/promotions" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '24px'
            }}>
                <ArrowLeft size={16} />
                Back to Promotions
            </Link>

            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '32px' }}>
                Create Campaign
            </h1>

            {/* Type Selector */}
            <div style={{ marginBottom: '32px' }}>
                <label style={{
                    display: 'block',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#64748b',
                    marginBottom: '12px'
                }}>
                    Campaign Type
                </label>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    {campaignTypes.map(typeConfig => {
                        const Icon = typeConfig.icon;
                        const isSelected = selectedType === typeConfig.type;
                        return (
                            <button
                                key={typeConfig.type}
                                type="button"
                                onClick={() => setSelectedType(typeConfig.type)}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border: isSelected ? `2px solid ${typeConfig.color}` : '1px solid #e2e8f0',
                                    background: isSelected ? `${typeConfig.color}10` : 'white',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    minWidth: 'fit-content'
                                }}
                            >
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    background: `${typeConfig.color}20`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: typeConfig.color,
                                    flexShrink: 0
                                }}>
                                    <Icon size={16} />
                                </div>
                                <div style={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: isSelected ? typeConfig.color : '#334155',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {typeConfig.label}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Custom Type Name (only for custom) */}
            {selectedType === 'custom' && (
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'block',
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#64748b',
                        marginBottom: '8px'
                    }}>
                        Custom Type Name
                    </label>
                    <input
                        value={customTypeName}
                        onChange={(e) => setCustomTypeName(e.target.value)}
                        required
                        placeholder="e.g. Podcast, Webinar, Challenge"
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1'
                        }}
                    />
                </div>
            )}

            {/* Form */}
            <form action={handleSubmit} style={{
                background: 'white',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0'
            }}>
                {/* Title Field */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'block',
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#64748b',
                        marginBottom: '8px'
                    }}>
                        {labels.title}
                    </label>
                    <input
                        name="title"
                        required
                        placeholder={`Enter ${labels.title.toLowerCase()}`}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1'
                        }}
                    />
                </div>

                {/* Subtitle Field */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'block',
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#64748b',
                        marginBottom: '8px'
                    }}>
                        {labels.subtitle}
                    </label>
                    <input
                        name="subtitle"
                        required
                        placeholder={`Enter ${labels.subtitle.toLowerCase()}`}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1'
                        }}
                    />
                </div>

                {/* Budget & Rate */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    <div>
                        <label style={{
                            display: 'block',
                            textTransform: 'uppercase',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#64748b',
                            marginBottom: '8px'
                        }}>
                            Total Budget (GH₵)
                        </label>
                        <input
                            name="budget"
                            type="number"
                            required
                            placeholder="5000"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{
                            display: 'block',
                            textTransform: 'uppercase',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#64748b',
                            marginBottom: '8px'
                        }}>
                            Rate per 1k Views (GH₵)
                        </label>
                        <input
                            name="rate"
                            type="number"
                            required
                            placeholder="50"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1'
                            }}
                        />
                    </div>
                </div>

                {/* Requirements */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'block',
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#64748b',
                        marginBottom: '8px'
                    }}>
                        Content Requirements
                    </label>
                    <textarea
                        name="requirements"
                        rows={4}
                        required
                        placeholder="Describe what kind of content you want from creators..."
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1'
                        }}
                    />
                </div>

                {/* Audio Upload (Music only) */}
                {selectedType === 'music' && (
                    <div style={{
                        padding: '24px',
                        background: `${selectedTypeConfig.color}10`,
                        borderRadius: '12px',
                        marginBottom: '24px',
                        border: `1px dashed ${selectedTypeConfig.color}40`
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: selectedTypeConfig.color }}>
                            Upload Audio File (Required)
                        </h3>
                        <input
                            type="file"
                            accept="audio/*"
                            required={selectedType === 'music'}
                            onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                )}

                {/* Cover Image */}
                <div style={{
                    padding: '24px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    marginBottom: '32px',
                    border: '1px dashed #e2e8f0'
                }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                        Cover Image (Optional)
                    </h3>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={uploading}
                    style={{
                        width: '100%',
                        padding: '16px',
                        background: `linear-gradient(135deg, ${selectedTypeConfig.color}, ${selectedTypeConfig.color}dd)`,
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: '600',
                        fontSize: '15px',
                        cursor: uploading ? 'not-allowed' : 'pointer',
                        opacity: uploading ? 0.7 : 1,
                        transition: 'all 0.2s'
                    }}
                >
                    {uploading ? 'Launching...' : 'Launch Campaign 🚀'}
                </button>
            </form>
        </div>
    );
}
