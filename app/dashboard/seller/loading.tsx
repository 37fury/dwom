'use client';

export default function Loading() {
    return (
        <div style={{ maxWidth: '1200px', width: '100%', paddingBottom: '48px' }}>
            {/* Header Skeleton */}
            <div style={{ marginBottom: '32px' }}>
                <div style={{
                    height: '32px',
                    width: '250px',
                    background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    borderRadius: '8px',
                    marginBottom: '8px'
                }}></div>
                <div style={{
                    height: '18px',
                    width: '350px',
                    background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    borderRadius: '6px'
                }}></div>
            </div>

            {/* Stats Grid Skeleton */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                marginBottom: '32px'
            }}>
                {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{
                        height: '140px',
                        background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite',
                        borderRadius: '16px'
                    }}></div>
                ))}
            </div>

            {/* Content Skeleton */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0'
            }}>
                {[1, 2, 3].map(i => (
                    <div key={i} style={{
                        height: '20px',
                        width: i === 3 ? '60%' : '100%',
                        background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite',
                        borderRadius: '6px',
                        marginBottom: '12px'
                    }}></div>
                ))}
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
}
