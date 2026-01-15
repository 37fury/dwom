'use client';

import { useState } from 'react';
import { Play, X, Lock } from 'lucide-react';
import styles from './FreePreview.module.css';

interface Lesson {
    id: string;
    title: string;
    videoUrl: string;
    duration: string;
    description?: string;
}

interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

interface FreePreviewProps {
    productTitle: string;
    content?: Module[];
    previewVideoUrl?: string;
}

export default function FreePreview({ productTitle, content, previewVideoUrl }: FreePreviewProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Get the first lesson as the free preview
    const previewLesson = content?.[0]?.lessons?.[0];
    const videoUrl = previewVideoUrl || previewLesson?.videoUrl;

    if (!videoUrl) {
        return null; // No preview available
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={styles.previewButton}
            >
                <Play size={18} fill="currentColor" />
                <span>Watch Free Preview</span>
            </button>

            {isOpen && (
                <div className={styles.overlay} onClick={() => setIsOpen(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.header}>
                            <div>
                                <span className={styles.badge}>Free Preview</span>
                                <h3 className={styles.title}>{previewLesson?.title || productTitle}</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className={styles.videoContainer}>
                            <video
                                src={videoUrl}
                                controls
                                autoPlay
                                className={styles.video}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.previewInfo}>
                                <Lock size={16} />
                                <span>This is a free preview. Purchase to access full content.</span>
                            </div>
                            {content && content.length > 0 && (
                                <div className={styles.contentPreview}>
                                    <h4>What's included:</h4>
                                    <ul>
                                        {content.slice(0, 3).map((mod, i) => (
                                            <li key={mod.id}>
                                                {mod.title} ({mod.lessons.length} lessons)
                                            </li>
                                        ))}
                                        {content.length > 3 && (
                                            <li className={styles.moreContent}>
                                                +{content.length - 3} more modules
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
