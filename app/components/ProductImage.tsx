'use client';

import { useState } from 'react';

interface Props {
    src?: string;
    alt: string;
    className?: string; // Allow passing styles/classes
    style?: React.CSSProperties;
}

export default function ProductImage({ src, alt, className, style }: Props) {
    const [error, setError] = useState(false);

    if (!src || error) {
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                    color: '#64748b',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                }}
            >
                {alt.charAt(0)}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={style}
            onError={() => setError(true)}
        />
    );
}
