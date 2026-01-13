'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutOverlay from './CheckoutOverlay';

interface PurchaseButtonProps {
    productTitle: string;
    price: number;
    currency: string;
    className?: string;
    children: React.ReactNode;
}

export default function PurchaseButton({ productTitle, price, currency, className, children }: PurchaseButtonProps) {
    const [showOverlay, setShowOverlay] = useState(false);
    const router = useRouter();

    const handleSuccess = () => {
        // In a real app, this would verify the transaction
        setShowOverlay(false);
        router.push('/dashboard/integrations');
    };

    return (
        <>
            <button className={className} onClick={() => setShowOverlay(true)}>
                {children}
            </button>

            {showOverlay && (
                <CheckoutOverlay
                    productTitle={productTitle}
                    price={price}
                    currency={currency}
                    onClose={() => setShowOverlay(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </>
    );
}
