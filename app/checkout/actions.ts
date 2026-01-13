'use server';

import { db } from '../lib/db';
import { redirect } from 'next/navigation';

export async function processOrder(productId: string, paymentMethod: string, details: any) {
    // In a real app we'd access the session to get the userId
    // Here we hardcode to our mock user 'u1'
    const userId = 'u1';

    try {
        const result = await db.createOrder(userId, productId, paymentMethod);
        return { success: result.success, orderId: result.orderId };
    } catch (error) {
        console.error('Order failed:', error);
        return { success: false, error: 'Payment failed' };
    }
}

export async function verifyCouponCode(code: string) {
    return await db.validateCoupon(code);
}
