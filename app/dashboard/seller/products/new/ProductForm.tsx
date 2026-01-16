'use client';

import { useState } from 'react';
import { uploadFile } from '@/app/lib/storage';
import { createProductAction } from './actions';
import {
    GraduationCap,
    Code,
    Users,
    Music,
    FileText,
    Gamepad2,
    Palette,
    BookOpen,
    Sparkles,
    Crown,
    Lock
} from 'lucide-react';
import styles from './ProductForm.module.css';

const productTypes = [
    { value: 'course', label: 'Online Course', icon: GraduationCap, description: 'Video lessons, tutorials, masterclasses' },
    { value: 'ebook', label: 'E-Book / PDF', icon: BookOpen, description: 'Digital books, guides, checklists' },
    { value: 'software', label: 'Software / License', icon: Code, description: 'Apps, tools, license keys' },
    { value: 'community', label: 'Community Access', icon: Users, description: 'Discord, Telegram, private groups' },
    { value: 'music', label: 'Music / Audio', icon: Music, description: 'Beats, samples, albums, podcasts' },
    { value: 'template', label: 'Templates / Assets', icon: FileText, description: 'Designs, presets, Notion templates' },
    { value: 'gaming', label: 'Gaming / Digital Goods', icon: Gamepad2, description: 'In-game items, accounts, services' },
    { value: 'art', label: 'Digital Art / NFT', icon: Palette, description: 'Artwork, illustrations, NFTs' },
    { value: 'other', label: 'Other (Custom)', icon: Sparkles, description: 'Something unique? Describe it!', premium: true },
];

export default function ProductForm() {
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [productType, setProductType] = useState('course');
    const [customTypeDescription, setCustomTypeDescription] = useState('');
    const [isPremiumUser] = useState(false); // This would come from user context

    async function handleSubmit(formData: FormData) {
        setUploading(true);
        try {
            let imageUrl = '';

            if (imageFile) {
                const { url, error } = await uploadFile('product-media', imageFile);
                if (error) {
                    alert('Image upload failed: ' + error);
                    setUploading(false);
                    return;
                }
                imageUrl = url;
            }

            // Add custom type description to form data if "other" is selected
            if (productType === 'other' && customTypeDescription) {
                formData.append('customTypeDescription', customTypeDescription);
            }

            await createProductAction(formData, imageUrl);

        } catch (err) {
            console.error(err);
            alert('Failed to create product');
            setUploading(false);
        }
    }

    const selectedType = productTypes.find(t => t.value === productType);

    return (
        <form action={handleSubmit} className={styles.form}>
            {/* Product Title */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Product Title</label>
                <input
                    name="title"
                    required
                    type="text"
                    placeholder="e.g. Masterclass: Intro to Forex"
                    className={styles.input}
                />
            </div>

            {/* Price & Currency */}
            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Price</label>
                    <input
                        name="price"
                        required
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Currency</label>
                    <select name="currency" className={styles.select}>
                        <option value="GH₵">GH₵ (Cedis)</option>
                        <option value="₦">₦ (Naira)</option>
                        <option value="$">$ (USD)</option>
                        <option value="KES">KES (Shilling)</option>
                        <option value="ZAR">ZAR (Rand)</option>
                    </select>
                </div>
            </div>

            {/* Product Type */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Product Type</label>
                <div className={styles.typeGrid}>
                    {productTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = productType === type.value;
                        const isLocked = type.premium && !isPremiumUser;

                        return (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => {
                                    if (isLocked) {
                                        alert('Upgrade to Pro to create custom product types!');
                                        return;
                                    }
                                    setProductType(type.value);
                                }}
                                className={`${styles.typeCard} ${isSelected ? styles.typeCardSelected : ''} ${isLocked ? styles.typeCardLocked : ''}`}
                            >
                                <div className={styles.typeIcon}>
                                    <Icon size={20} />
                                </div>
                                <div className={styles.typeInfo}>
                                    <div className={styles.typeLabel}>
                                        {type.label}
                                        {type.premium && (
                                            <span className={styles.proBadge}>
                                                <Crown size={10} /> Pro
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.typeDesc}>{type.description}</div>
                                </div>
                                {isLocked && (
                                    <div className={styles.lockIcon}>
                                        <Lock size={14} />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
                <input type="hidden" name="productType" value={productType} />
            </div>

            {/* Custom Type Description (for "Other" - Premium Feature) */}
            {productType === 'other' && (
                <div className={styles.premiumSection}>
                    <div className={styles.premiumHeader}>
                        <Sparkles size={18} />
                        <span>Describe Your Custom Product Type</span>
                    </div>
                    <textarea
                        value={customTypeDescription}
                        onChange={(e) => setCustomTypeDescription(e.target.value)}
                        placeholder="Tell us what kind of product this is. Our team will review and add it to the platform..."
                        rows={3}
                        className={styles.textarea}
                        required={productType === 'other'}
                    />
                    <p className={styles.premiumNote}>
                        Your custom category will be reviewed within 24 hours. Once approved, it will be available for all sellers!
                    </p>
                </div>
            )}

            {/* License Keys (for Software) */}
            {productType === 'software' && (
                <div className={styles.softwareSection}>
                    <label className={styles.label}>
                        <Code size={16} />
                        License Keys (One per line)
                    </label>
                    <textarea
                        name="licenseKeys"
                        rows={5}
                        placeholder={'KEY-1234-5678\nKEY-ABCD-EFGH\n...'}
                        className={styles.codeTextarea}
                    />
                    <p className={styles.helperText}>
                        These keys will be automatically distributed to buyers after purchase.
                    </p>
                </div>
            )}

            {/* Product Image */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Product Image</label>
                <div className={styles.fileUpload}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className={styles.fileInput}
                        id="product-image"
                    />
                    <label htmlFor="product-image" className={styles.fileLabel}>
                        {imageFile ? (
                            <span className={styles.fileName}>{imageFile.name}</span>
                        ) : (
                            <>
                                <span>Click to upload</span>
                                <span className={styles.fileHint}>PNG, JPG up to 5MB</span>
                            </>
                        )}
                    </label>
                </div>
            </div>

            {/* Video URL */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Product Demo Video (Optional)</label>
                <input
                    name="videoUrl"
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={styles.input}
                />
            </div>

            {/* Description */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <textarea
                    name="description"
                    required
                    rows={4}
                    placeholder="Describe what you are selling, what's included, and why buyers should purchase..."
                    className={styles.textarea}
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={uploading}
                className={styles.submitBtn}
            >
                {uploading ? 'Creating...' : 'Create Product'}
            </button>
        </form>
    );
}
