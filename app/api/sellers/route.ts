import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient();

        const { data: sellers, error } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url, store_name')
            .eq('is_seller', true)
            .order('full_name', { ascending: true });

        if (error) {
            console.error('Error fetching sellers:', error);
            return NextResponse.json({ sellers: [] }, { status: 200 });
        }

        return NextResponse.json({ sellers: sellers || [] });
    } catch (err) {
        console.error('Sellers API Error:', err);
        return NextResponse.json({ sellers: [] }, { status: 200 });
    }
}
