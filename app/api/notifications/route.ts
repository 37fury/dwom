import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const notifications = await db.getNotifications();
        return NextResponse.json({ notifications });
    } catch (err) {
        console.error('Notifications API Error:', err);
        return NextResponse.json({ notifications: [] }, { status: 200 });
    }
}
