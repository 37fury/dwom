import { db } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { notificationId } = await request.json();

        if (!notificationId) {
            return NextResponse.json({ success: false, error: 'Missing notificationId' }, { status: 400 });
        }

        const success = await db.markNotificationAsRead(notificationId);
        return NextResponse.json({ success });
    } catch (err) {
        console.error('Mark Read API Error:', err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
