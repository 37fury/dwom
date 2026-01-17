import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        // Verify ownership before deleting
        const { error } = await supabase
            .from('coupons')
            .delete()
            .eq('id', id)
            .eq('seller_id', user.id);

        if (error) {
            console.error('Delete discount error:', error);
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Delete Discount API Error:', err);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
