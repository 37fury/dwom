import { db, Lesson } from '../../lib/db';
import VideoPlayer from '../../components/VideoPlayer';
import ReviewForm from '../../components/ReviewForm';
import ReviewList from '../../components/ReviewList';

export default async function CoursePage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ lessonId?: string }>
}) {
    const { id } = await params;
    const { lessonId } = await searchParams;
    const product = await db.getProduct(id);

    if (!product || !product.content) return <div>Course not found</div>;

    // Determine active lesson (default to first lesson of first module)
    let activeLesson: Lesson | undefined;

    if (lessonId) {
        // Find specific lesson
        for (const mod of product.content) {
            const found = mod.lessons.find(l => l.id === lessonId);
            if (found) {
                activeLesson = found;
                break;
            }
        }
    } else {
        // Default to first
        activeLesson = product.content[0]?.lessons[0];
    }

    if (!activeLesson) return <div>No lessons found</div>;

    return (
        <div style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
                <VideoPlayer url={activeLesson.videoUrl} title={activeLesson.title} />
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>
                {activeLesson.title}
            </h1>
            <p style={{ color: '#64748b' }}>
                {activeLesson.description || 'Watch this lesson to learn more about the topic.'}
            </p>

            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ marginBottom: '32px' }}>
                    <ReviewForm />
                </div>
                {product.reviewsList && <ReviewList reviews={product.reviewsList} />}
            </div>
        </div>
    );
}
