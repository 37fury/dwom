import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ discounts: [] });

        const { data, error } = await supabase
            .from('coupons')
            .select('*')
            .eq('seller_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Fetch discounts error:', error);
            return NextResponse.json({ discounts: [] });
        }

        const discounts = data.map((d: any) => ({
            id: d.id,
            code: d.code,
            discountPercentage: d.discount_percentage,
            usageCount: d.usage_count || 0,
            maxUses: d.max_uses,
            expiresAt: d.expires_at,
            isActive: d.is_active,
            createdAt: d.created_at,
        }));

        return NextResponse.json({ discounts });
    } catch (err) {
        console.error('Discounts API Error:', err);
        return NextResponse.json({ discounts: [] }, { status: 200 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { code, discountPercentage, maxUses, expiresAt } = body;

        if (!code || !discountPercentage) {
            return NextResponse.json({ success: false, error: 'Code and percentage required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('coupons')
            .insert({
                code: code.toUpperCase(),
                discount_percentage: discountPercentage,
                max_uses: maxUses || null,
                expires_at: expiresAt || null,
                seller_id: user.id,
                is_active: true,
                usage_count: 0,
            })
            .select()
            .single();

        if (error) {
            console.error('Create discount error:', error);
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, discount: data });
    } catch (err) {
        console.error('Create Discount API Error:', err);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
