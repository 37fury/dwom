import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const success = await db.markAllNotificationsAsRead();
        return NextResponse.json({ success });
    } catch (err) {
        console.error('Mark All Read API Error:', err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
