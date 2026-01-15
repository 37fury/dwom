'use client';

import { CourseModule } from '../lib/db';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function CourseSidebar({
    modules,
    productId
}: {
    modules: CourseModule[],
    productId: string
}) {
    const searchParams = useSearchParams();
    const activeLessonId = searchParams.get('lessonId');

    return (
        <aside style={{ width: '320px', background: 'white', borderRight: '1px solid #e2e8f0', height: '100vh', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
                <Link href="/dashboard" style={{ fontSize: '12px', color: '#64748b', textDecoration: 'none', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ArrowLeft size={14} /> Back to Dashboard
                </Link>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Course Content</h3>
                <div style={{ marginTop: '8px', height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '15%', height: '100%', background: '#f97316' }}></div>
                </div>
                <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>15% Complete</p>
            </div>

            <div style={{ flex: 1 }}>
                {modules.map((module, mIndex) => (
                    <div key={module.id}>
                        <div style={{ padding: '16px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontWeight: '600', fontSize: '14px', color: '#334155' }}>
                            {module.title}
                        </div>
                        <div>
                            {module.lessons.map((lesson, lIndex) => {
                                const isActive = lesson.id === activeLessonId;
                                return (
                                    <Link
                                        key={lesson.id}
                                        href={`/course/${productId}?lessonId=${lesson.id}`}
                                        style={{
                                            display: 'flex',
                                            padding: '12px 24px',
                                            textDecoration: 'none',
                                            background: isActive ? '#fff0eb' : 'white',
                                            borderLeft: isActive ? '3px solid #f97316' : '3px solid transparent',
                                            alignItems: 'center',
                                            borderBottom: '1px solid #f1f5f9'
                                        }}
                                    >
                                        <div style={{ width: '24px', height: '24px', background: isActive ? '#f97316' : '#cbd5e1', borderRadius: '50%', color: 'white', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', flexShrink: 0 }}>
                                            {lIndex + 1}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '13px', color: isActive ? '#c2410c' : '#0f172a', fontWeight: isActive ? '600' : '400' }}>{lesson.title}</div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{lesson.duration}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}
