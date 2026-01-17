import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const count = await db.getUnreadCount();
        return NextResponse.json({ count });
    } catch (err) {
        console.error('Notification Count API Error:', err);
        return NextResponse.json({ count: 0 }, { status: 200 });
    }
}
