import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// Generate a simple HTML invoice
function generateInvoiceHTML(order: any): string {
    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice #${order.id.substring(0, 8)}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #1e293b; }
        .invoice { max-width: 800px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
        .logo { font-size: 32px; font-weight: bold; color: #f97316; }
        .invoice-meta { text-align: right; }
        .invoice-meta h2 { font-size: 24px; color: #1e293b; margin-bottom: 8px; }
        .invoice-meta p { color: #64748b; font-size: 14px; }
        .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
        .party h3 { font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 8px; letter-spacing: 1px; }
        .party p { font-size: 14px; line-height: 1.6; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .items-table th { text-align: left; padding: 12px; background: #f8fafc; font-size: 12px; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; }
        .items-table td { padding: 16px 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
        .items-table .amount { text-align: right; font-weight: 600; }
        .totals { margin-left: auto; width: 280px; margin-bottom: 40px; }
        .totals-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
        .totals-row.total { font-size: 18px; font-weight: 700; border-top: 2px solid #1e293b; padding-top: 16px; margin-top: 8px; }
        .footer { text-align: center; padding-top: 40px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 13px; }
        .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
        .status-completed { background: #dcfce7; color: #166534; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-refunded { background: #fecaca; color: #991b1b; }
    </style>
</head>
<body>
    <div class="invoice">
        <div class="header">
            <div>
                <div class="logo">dwom</div>
                <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Digital Marketplace</p>
            </div>
            <div class="invoice-meta">
                <h2>INVOICE</h2>
                <p><strong>Invoice #:</strong> ${order.id.substring(0, 8).toUpperCase()}</p>
                <p><strong>Date:</strong> ${formatDate(order.created_at)}</p>
                <p style="margin-top: 8px;">
                    <span class="status-badge status-${order.status}">${order.status}</span>
                </p>
            </div>
        </div>

        <div class="parties">
            <div class="party">
                <h3>From</h3>
                <p><strong>${order.sellerName || 'Seller'}</strong></p>
                <p>via dwom.store</p>
            </div>
            <div class="party">
                <h3>To</h3>
                <p><strong>${order.buyerName || 'Customer'}</strong></p>
                <p>${order.buyerEmail || ''}</p>
            </div>
        </div>

        <table class="items-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th style="text-align: right;">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${order.productTitle || 'Digital Product'}</td>
                    <td>1</td>
                    <td class="amount">GH₵${Number(order.total_amount).toFixed(2)}</td>
                </tr>
            </tbody>
        </table>

        <div class="totals">
            <div class="totals-row">
                <span>Subtotal</span>
                <span>GH₵${Number(order.total_amount).toFixed(2)}</span>
            </div>
            <div class="totals-row">
                <span>Platform Fee</span>
                <span>GH₵0.00</span>
            </div>
            <div class="totals-row total">
                <span>Total</span>
                <span>GH₵${Number(order.total_amount).toFixed(2)}</span>
            </div>
        </div>

        <div class="footer">
            <p><strong>Payment Method:</strong> ${order.payment_channel || 'Mobile Money'}</p>
            <p style="margin-top: 16px;">Thank you for your purchase!</p>
            <p style="margin-top: 8px;">Questions? Contact support@dwom.store</p>
        </div>
    </div>
</body>
</html>
    `;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = await createClient();

        // Fetch order with related data
        const { data: order, error } = await supabase
            .from('orders')
            .select(`
                id,
                total_amount,
                status,
                created_at,
                payment_channel,
                payment_reference,
                products (title, seller_id, profiles!products_seller_id_fkey (full_name)),
                profiles!orders_user_id_fkey (full_name, email)
            `)
            .eq('id', id)
            .single();

        if (error || !order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Format data for invoice
        const invoiceData = {
            ...order,
            productTitle: (order.products as any)?.title,
            sellerName: (order.products as any)?.profiles?.full_name,
            buyerName: (order.profiles as any)?.full_name,
            buyerEmail: (order.profiles as any)?.email,
        };

        const html = generateInvoiceHTML(invoiceData);

        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html',
                'Content-Disposition': `inline; filename="invoice-${id.substring(0, 8)}.html"`,
            },
        });
    } catch (err) {
        console.error('Invoice Error:', err);
        return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 });
    }
}
