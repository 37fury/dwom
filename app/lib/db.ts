export type Product = {
    id: string;
    title: string;
    price: number;
    currency: string;
    image: string;
    rating: number; // Added missing property
    reviews: number; // Added missing property
    description: string; // Added missing property
    features: string[];
    content?: CourseModule[];
    discordUrl?: string;
    telegramUrl?: string;
    whatsappUrl?: string;
    reviewsList?: Review[];
};

export type Lesson = {
    id: string;
    title: string;
    duration: string;
    videoUrl: string;
};

export type Membership = {
    id: string;
    productId: string;
    productName: string;
    status: 'active' | 'cancelled';
    nextBilling: string;
    nextBillingDate?: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    balance: number;
    memberships: Membership[];
    sellerStats?: {
        totalRevenue: number;
        pendingPayouts: number;
        activeCustomers: number;
        salesCount: number;
    };
    listings: string[];
    kycStatus?: 'pending' | 'verified' | 'unverified';
    payoutDetails?: {
        provider: 'Mobile Money' | 'Bank';
        number: string;
        name: string;
    };
};

export type Review = {
    id: string;
    user: string;
    rating: number; // 1-5
    comment: string;
    date: string;
};

export type CourseModule = {
    id: string;
    title: string;
    lessons: Lesson[];
};

// ... (existing helper types)
export type Customer = {
    id: string;
    name: string;
    email: string;
    totalSpent: number;
    productsPurchased: number;
    joinedDate: string;
};

// Mock Data
const products: Product[] = [
    {
        id: '1',
        title: 'Accra Forex Kings',
        price: 500,
        currency: 'GH₵',
        image: '/globe.svg',
        rating: 4.9,
        reviews: 128,
        description: 'Join the #1 Forex community in Ghana. Daily signals, weekly zoom calls, and a comprehensive video course to take you from beginner to pro.',
        features: ['Daily Gold & UsdPy Signals', 'Weekly Live Zoom Sessions', 'Full Video Course Access', 'Private WhatsApp Group'],
        telegramUrl: 'https://t.me/accraforexkings_vip',
        whatsappUrl: 'https://chat.whatsapp.com/Gj8921jkd91',
        reviewsList: [
            { id: 'r1', user: 'Emmanuel K.', rating: 5, comment: 'Best forex group in Gh! The signals are 90% accurate.', date: 'Oct 24, 2024' },
            { id: 'r2', user: 'Sarah A.', rating: 5, comment: 'I recovered my subscription fee in just 2 days. Highly recommend.', date: 'Oct 20, 2024' },
            { id: 'r3', user: 'Kwame J.', rating: 4, comment: 'Great content but the zoom calls are sometimes late. Signals are solid though.', date: 'Oct 15, 2024' }
        ],
        content: [
            {
                id: 'mod1',
                title: 'Module 1: Forex Basics',
                lessons: [
                    { id: 'l1', title: 'What is Forex?', duration: '12:00', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }, // Placeholder
                    { id: 'l2', title: 'Understanding Pips & Lots', duration: '15:30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
                ]
            },
            {
                id: 'mod2',
                title: 'Module 2: Technical Analysis',
                lessons: [
                    { id: 'l3', title: 'Support & Resistance Basics', duration: '20:00', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                    { id: 'l4', title: 'Trendlines & Channels', duration: '18:45', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
                ]
            }
        ]
    },
    {
        id: '2',
        title: 'Naira Tech Mentors',
        price: 15000,
        currency: '₦',
        image: '/window.svg',
        rating: 4.8,
        reviews: 85,
        description: 'Master backend engineering with our intensive bootcamp.',
        features: ['1-on-1 Mentorship', 'Code Reviews', 'Job Placement Help'],
        reviewsList: [
            { id: 'r1', user: 'Tunde B.', rating: 5, comment: 'Changed my career. The mentorship is invaluable.', date: 'Nov 01, 2024' }
        ]
    }
];

const user: User = {
    id: 'u1',
    name: 'Deezy',
    email: 'deezy@dwom.com',
    balance: 1250.00,
    memberships: [
        { id: 'm1', productId: '1', productName: 'Accra Forex Kings', status: 'active', nextBilling: 'Nov 12, 2024' },
        { id: 'm2', productId: '3', productName: 'Tech Mentors GH', status: 'active', nextBilling: 'Nov 15, 2024' }
    ],
    sellerStats: {
        totalRevenue: 5400.00,
        pendingPayouts: 1200.00,
        activeCustomers: 45,
        salesCount: 128
    },
    listings: ['1'], // Simulating that Deezy owns "Accra Forex Kings"
    // New fields for Profile/KYC
    kycStatus: 'unverified',
    payoutDetails: undefined
};

export type Referral = {
    user: string;
    date: string;
    status: 'Paid' | 'Pending';
    amount: number;
};

export type AffiliateStats = {
    clicks: number;
    signups: number;
    pendingEarnings: number;
    totalPaid: number;
    recentReferrals: Referral[];
};

const affiliateStats: AffiliateStats = {
    clicks: 1240,
    signups: 54,
    pendingEarnings: 450.00,
    totalPaid: 2100.00,
    recentReferrals: [
        { user: 'Kofi A.', date: 'Oct 24, 2024', status: 'Paid', amount: 50.00 },
        { user: 'Ama B.', date: 'Oct 23, 2024', status: 'Pending', amount: 100.00 },
        { user: 'Yaw D.', date: 'Oct 21, 2024', status: 'Paid', amount: 25.00 },
        { user: 'Tunde B.', date: 'Dec 12, 2024', status: 'Paid', amount: 45.00 }
    ]
};

const customers: Customer[] = [
    { id: 'c1', name: 'Emmanuel K.', email: 'emmanuel@gmail.com', totalSpent: 500.00, productsPurchased: 1, joinedDate: 'Oct 24, 2024' },
    { id: 'c2', name: 'Sarah A.', email: 'sarah.a@yahoo.com', totalSpent: 1000.00, productsPurchased: 2, joinedDate: 'Oct 20, 2024' },
    { id: 'c3', name: 'Kwame J.', email: 'kwame.j@outlook.com', totalSpent: 500.00, productsPurchased: 1, joinedDate: 'Oct 15, 2024' },
    { id: 'c4', name: 'Tunde B.', email: 'tunde.b@gmail.com', totalSpent: 15000.00, productsPurchased: 1, joinedDate: 'Nov 01, 2024' },
    { id: 'c5', name: 'Ama O.', email: 'ama.o@gmail.com', totalSpent: 0.00, productsPurchased: 0, joinedDate: 'Nov 05, 2024' }
];

// "Database" Methods
export const db = {
    getProduct: async (id: string): Promise<Product | undefined> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 50));
        return products.find(p => p.id === id);
    },

    getAllProducts: async (): Promise<Product[]> => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return products;
    },

    getUser: async (): Promise<User> => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return user;
    },

    getAffiliateStats: async (): Promise<AffiliateStats> => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return affiliateStats;
    },

    getCustomers: async (sellerId: string): Promise<Customer[]> => {
        await new Promise(resolve => setTimeout(resolve, 50));
        // In a real app, we would filter by sellerId. 
        // For visual demo, we return all mock customers.
        return customers;
    },

    // New: Get products owned by the seller
    getSellerProducts: async (userId: string): Promise<Product[]> => {
        await new Promise(resolve => setTimeout(resolve, 50));
        // Simple logic: In a real DB we'd filter by ownerId. 
        // Here we rely on the user object having the IDs.
        const currentUser = user;
        if (currentUser.id !== userId) return [];
        return products.filter(p => currentUser.listings.includes(p.id));
    },

    // New: Simulate creating a product
    createProduct: async (productData: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newProduct: Product = {
            ...productData,
            id: Math.random().toString(36).substr(2, 9),
            rating: 0,
            reviews: 0
        };
        products.push(newProduct);
        user.listings.push(newProduct.id);
        return newProduct;
    },

    // New: Process an order
    createOrder: async (userId: string, productId: string, paymentMethod: string) => {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate payment processing

        const product = products.find(p => p.id === productId);
        if (!product) throw new Error('Product not found');

        // Add membership to user
        const newMembership: Membership = {
            id: Math.random().toString(36).substr(2, 9),
            productId: product.id,
            productName: product.title,
            status: 'active',
            nextBilling: 'Lifetime',
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };

        // In a real app we would check if user exists, but here we update the mock singleton 'user'
        if (user.id === userId) {
            user.memberships.push(newMembership);

            // Update seller stats if applicable
            // For simplicity, we just increment the mock stats
            if (user.sellerStats) {
                user.sellerStats.totalRevenue += product.price;
                user.sellerStats.salesCount += 1;
            }
        }

        return { success: true, orderId: Math.random().toString(36).substr(2, 12) };
    },

    // New: Validate Coupon
    validateCoupon: async (code: string) => {
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate delay

        const coupons: Record<string, number> = {
            'WELCOME10': 10,
            'AFRICA20': 20,
            'DWOM50': 50
        };

        const discount = coupons[code.toUpperCase()];
        if (discount) {
            return { valid: true, discountPercentage: discount };
        }
        return { valid: false, discountPercentage: 0 };
    },

    // New: Update Profile
    updateProfile: async (userId: string, data: { name: string; email: string }) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (user.id === userId) {
            user.name = data.name;
            user.email = data.email;
            return true;
        }
        return false;
    },

    // New: Submit Verification (KYC)
    submitVerification: async (userId: string, data: { number: string; provider: 'Mobile Money' | 'Bank' }) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        if (user.id === userId) {
            user.kycStatus = 'pending';
            user.payoutDetails = {
                provider: data.provider,
                number: data.number,
                name: user.name
            };
            return true;
        }
        return false;
    }
};
