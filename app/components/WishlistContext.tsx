'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistContextType {
    wishlist: string[];
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    toggleWishlist: (productId: string) => void;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('dwom_wishlist');
        if (stored) {
            try {
                setWishlist(JSON.parse(stored));
            } catch {
                setWishlist([]);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('dwom_wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, isLoaded]);

    const addToWishlist = (productId: string) => {
        setWishlist(prev => {
            if (prev.includes(productId)) return prev;
            return [...prev, productId];
        });
    };

    const removeFromWishlist = (productId: string) => {
        setWishlist(prev => prev.filter(id => id !== productId));
    };

    const isInWishlist = (productId: string) => {
        return wishlist.includes(productId);
    };

    const toggleWishlist = (productId: string) => {
        if (isInWishlist(productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            toggleWishlist,
            wishlistCount: wishlist.length,
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
