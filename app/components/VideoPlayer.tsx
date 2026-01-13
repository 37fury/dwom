'use client';

export default function VideoPlayer({ url, title }: { url: string, title: string }) {
    return (
        <div style={{ width: '100%', aspectRatio: '16/9', background: 'black', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <iframe
                src={url}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%' }}
            ></iframe>
        </div>
    );
}
