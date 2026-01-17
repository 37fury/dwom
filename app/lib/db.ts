
import { createClient } from '@/utils/supabase/server';
import { sendEmail } from '@/app/lib/email';
import { EmailTemplates } from '@/app/lib/email-templates';

// --- Type Definitions (kept for compatibility) ---
export type Product = {
    id: string;
    title: string;
    price: number;
    currency: string;
    image: string;
    rating: number;
    reviews: number;
    description: string;
    commission: number;
    category: string;
    product_type: 'course' | 'software' | 'community'; // New field
    download_url?: string; // New field
    videoUrl?: string;
    features: string[];
    content?: CourseModule[];
    discordUrl?: string;
    telegramUrl?: string;
    whatsappUrl?: string;
    reviewsList?: Review[];
    sellerId: string;
};

export type Lesson = {
    id: string;
    title: string;
    duration: string;
    videoUrl: string;
    description?: string;
};

export type Membership = {
    id: string;
    productId: string;
    productName: string;
    status: 'active' | 'cancelled';
    nextBilling: string;
    nextBillingDate?: string;
    productType?: 'course' | 'software' | 'community';
    licenseKey?: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    balance: number;
    memberships: Membership[];
    role?: 'user' | 'admin';

    // Pro Subscription
    isPro?: boolean;
    proExpiresAt?: string;
    proPlan?: 'monthly' | 'annual';

    // Profile Fields
    username?: string;
    bio?: string;
    bannerUrl?: string;
    avatarUrl?: string;
    phone?: string;
    dateOfBirth?: string;
    location?: string;
    socialLinks?: {
        twitter?: string;
        instagram?: string;
        website?: string;
        youtube?: string;
    };

    sellerStats?: {
        totalRevenue: number;
        pendingPayouts: number;
        activeCustomers: number;
        salesCount: number;
    };
    listings: string[];
    kycStatus?: 'pending' | 'verified' | 'unverified' | 'rejected';
    kycRejectionReason?: string;
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

export type Customer = {
    id: string;
    name: string;
    email: string;
    totalSpent: number;
    productsPurchased: number;
    joinedDate: string;
    avatarUrl?: string;
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

export type PayoutMethod = {
    id: string;
    provider: 'MTN Mobile Money' | 'Vodafone Cash' | 'Bank Transfer' | 'Crypto (USDT)';
    details: string;
    isDefault: boolean;
};

export type PayoutTransaction = {
    id: string;
    date: string;
    amount: number;
    currency: string;
    status: 'Paid' | 'Processing' | 'Failed';
    method: string;
};

export type WalletTransaction = {
    id: string;
    userId: string;
    amount: number;
    type: 'credit' | 'debit';
    description: string;
    status: 'completed' | 'pending' | 'failed';
    date: string;
};

export type CampaignType = 'music' | 'product' | 'event' | 'app' | 'business' | 'course' | 'custom';

export type Campaign = {
    id: string;
    type: CampaignType;
    customType?: string;  // For custom type name
    title: string;        // Song title / Product name / Event name etc.
    subtitle?: string;    // Artist name / Brand / Venue etc.
    audioUrl?: string;    // For music campaigns
    coverImage?: string;
    budget: number;
    remainingBudget: number;
    ratePer1kViews: number;
    status: 'active' | 'completed' | 'paused';
    requirements: string;
    // Legacy fields for backwards compatibility
    artistName?: string;
    songTitle?: string;
};

export type Submission = {
    id: string;
    campaignId: string;
    campaignTitle?: string;
    creatorId: string;
    creatorName?: string;
    videoUrl: string;
    platform: 'tiktok' | 'instagram' | 'youtube' | 'twitter' | 'other';
    views: number;
    earnings: number;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
    reviewedAt?: string;
    rejectionReason?: string;
};


export type Conversation = {
    id: string;
    participants: string[]; // User IDs
    lastMessageAt: string;
    unreadCount?: number;
    otherUserName?: string;
    lastMessage?: string;
};

export type Message = {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    createdAt: string;
    isRead: boolean;
};

export type AnalyticsEvent = {
    id: string;
    eventType: string;
    targetId?: string;
    userId?: string;
    metadata?: any;
    createdAt: string;
};

export type Notification = {
    id: string;
    userId: string;
    type: 'sale' | 'purchase' | 'payout' | 'review' | 'message' | 'system';
    title: string;
    body: string;
    link?: string;
    isRead: boolean;
    createdAt: string;
};

// --- Helpers to map DB snake_case to Types camelCase ---

const mapProduct = (row: any): Product => ({
    id: row.id,
    title: row.title,
    price: Number(row.price),
    currency: row.currency || 'USD',
    image: row.image_url || '/placeholder.svg',
    rating: Number(row.rating) || 0,
    reviews: row.reviews_count || 0,
    description: row.description || '',
    commission: Number(row.commission_rate) || 0,
    category: row.category || 'misc',
    product_type: row.product_type || 'course',
    download_url: row.download_url,
    videoUrl: row.video_url,
    features: row.features || [], // Assumes JSONB or array in DB
    reviewsList: [], // Fetch separately if needed
    content: [], // Fetch separately if needed
    sellerId: row.seller_id
});

const mapCampaign = (row: any): Campaign => ({
    id: row.id,
    type: row.type || 'music',  // Default to music for legacy data
    customType: row.custom_type,
    title: row.title || row.song_title || '',
    subtitle: row.subtitle || row.artist_name || '',
    audioUrl: row.audio_url || '#',
    coverImage: row.cover_image_url || '/placeholder.svg',
    budget: Number(row.total_budget),
    remainingBudget: Number(row.remaining_budget),
    ratePer1kViews: Number(row.rate_per_1k_views),
    status: row.status,
    requirements: row.requirements || '',
    // Legacy fields
    artistName: row.artist_name,
    songTitle: row.song_title
});

const mapSubmission = (row: any): Submission => ({
    id: row.id,
    campaignId: row.campaign_id,
    campaignTitle: row.campaign_title || '',
    creatorId: row.creator_id,
    creatorName: row.creator_name || 'Unknown',
    videoUrl: row.video_url,
    platform: row.platform || 'other',
    views: row.views_count || 0,
    earnings: Number(row.earnings) || 0,
    status: row.status,
    submittedAt: new Date(row.created_at).toISOString(),
    reviewedAt: row.reviewed_at ? new Date(row.reviewed_at).toISOString() : undefined,
    rejectionReason: row.rejection_reason
});

// --- Constants / Mock Fallbacks for missing features ---
// (We keep some mocks for features not yet in DB schema like AffiliateStats or Payouts)
const mockAffiliateStats: AffiliateStats = {
    clicks: 1240,
    signups: 54,
    pendingEarnings: 450.00,
    totalPaid: 2100.00,
    recentReferrals: []
};

// --- Data Access Layer ---

export const db = {
    // LICENSES (SOFTWARE)
    addLicenseKeys: async (productId: string, keys: string[]): Promise<{ added: number; error?: any }> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { added: 0, error: 'Unauthorized' };

        // Verify ownership
        const { data: product } = await supabase
            .from('products')
            .select('seller_id')
            .eq('id', productId)
            .single();

        if (!product || product.seller_id !== user.id) {
            return { added: 0, error: 'Not product owner' };
        }

        const payload = keys.map(key => ({
            product_id: productId,
            license_key: key,
            status: 'available'
        }));

        const { error, count } = await supabase
            .from('licenses')
            .insert(payload)
            .select('id'); // Just select ID to verify insertion

        if (error) return { added: 0, error };
        return { added: keys.length };
    },

    getSellerLicenses: async (productId: string) => {
        const supabase = await createClient();
        const { count } = await supabase
            .from('licenses')
            .select('*', { count: 'exact', head: true })
            .eq('product_id', productId)
            .eq('status', 'available');

        return { available: count || 0 };
    },

    claimLicense: async (productId: string, userId: string, orderId: string) => {
        const supabase = await createClient();

        // Find one available key
        const { data: keys } = await supabase
            .from('licenses')
            .select('id')
            .eq('product_id', productId)
            .eq('status', 'available')
            .limit(1);

        if (!keys || keys.length === 0) return false;

        const keyId = keys[0].id;

        // Atomic update
        const { error } = await supabase
            .from('licenses')
            .update({
                status: 'used',
                user_id: userId,
                order_id: orderId
            })
            .eq('id', keyId)
            .eq('status', 'available'); // Ensure optimistic lock

        return !error;
    },

    getUserLicense: async (productId: string) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data } = await supabase
            .from('licenses')
            .select('license_key')
            .eq('product_id', productId)
            .eq('user_id', user.id)
            .maybeSingle();

        return data?.license_key;
    },

    // PRODUCTS
    getProduct: async (id: string): Promise<Product | undefined> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) return undefined;
        return mapProduct(data);
    },

    getAllProducts: async (query?: string, category?: string): Promise<Product[]> => {
        const supabase = await createClient();
        let dbQuery = supabase.from('products').select('*');

        if (query) {
            dbQuery = dbQuery.ilike('title', `%${query}%`);
        }

        if (category && category !== 'All') {
            dbQuery = dbQuery.eq('category', category);
        }

        const { data, error } = await dbQuery;
        if (error || !data) return [];
        return data.map(mapProduct);
    },

    // USER & PROFILE - OPTIMIZED with parallel queries
    getUser: async (): Promise<User | null> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return null;

        // Run all queries in parallel for faster loading
        const [profileResult, balanceResult, membershipsResult, salesResult] = await Promise.all([
            // 1. Fetch profile
            supabase.from('profiles').select('*').eq('id', user.id).single(),

            // 2. Fetch balance via RPC
            supabase.rpc('get_user_balance', { user_uuid: user.id }),

            // 3. Fetch memberships
            supabase.from('memberships').select(`*, products (title)`).eq('user_id', user.id),

            // 4. Fetch sales for seller stats
            supabase.from('orders').select(`total_amount, user_id, products!inner(seller_id)`)
                .eq('products.seller_id', user.id).eq('status', 'completed')
        ]);

        const profile = profileResult.data;

        // Handle balance - fallback if RPC fails
        let balance = 0.00;
        if (!balanceResult.error && balanceResult.data !== null) {
            balance = Number(balanceResult.data);
        }

        // Map memberships
        const realMemberships: Membership[] = membershipsResult.data ? membershipsResult.data.map((m: any) => ({
            id: m.id,
            productId: m.product_id,
            productName: m.products?.title || 'Unknown Product',
            status: m.status,
            nextBilling: m.next_billing_date ? new Date(m.next_billing_date).toLocaleDateString() : 'N/A',
            nextBillingDate: m.next_billing_date
        })) : [];

        // Calculate seller stats
        let totalRevenue = 0;
        let salesCount = 0;
        let activeCustomers = 0;

        if (salesResult.data) {
            const customerSet = new Set<string>();
            salesResult.data.forEach((order: any) => {
                totalRevenue += Number(order.total_amount);
                salesCount++;
                if (order.user_id) customerSet.add(order.user_id);
            });
            activeCustomers = customerSet.size;
        }

        // Construct User object
        return {
            id: user.id,
            name: profile?.full_name || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            balance: balance,
            memberships: realMemberships,
            sellerStats: {
                totalRevenue: totalRevenue,
                pendingPayouts: balance,
                activeCustomers: activeCustomers,
                salesCount: salesCount
            },
            listings: [],
            kycStatus: profile?.kyc_status || 'unverified',
            payoutDetails: profile?.payout_details || undefined
        };
    },

    // GET USER BY ID (for emails, notifications)
    getUserById: async (userId: string): Promise<{ id: string; email: string; full_name: string } | null> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('profiles')
            .select('id, email, full_name')
            .eq('id', userId)
            .single();

        if (error || !data) return null;
        return data;
    },

    // AFFILIATES
    getAffiliateStats: async (): Promise<AffiliateStats> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return mockAffiliateStats; // Fallback if no user

        // Calculate real stats from submissions/referrals
        // Calculate real stats from submissions/referrals
        const { data: submissions } = await supabase
            .from('submissions')
            .select('earnings')
            .eq('creator_id', user.id);

        const videoEarnings = submissions?.reduce((acc, curr) => acc + Number(curr.earnings), 0) || 0;

        // Fetch Referrals
        const { data: referrals } = await supabase
            .from('referrals')
            .select('created_at, commission_earned, status')
            .eq('referrer_id', user.id);

        const referralCount = referrals?.length || 0;
        const referralEarnings = referrals?.reduce((acc, curr) => acc + Number(curr.commission_earned), 0) || 0;

        // Fetch Recent Referrals Details
        const { data: recentReferralsData } = await supabase
            .from('referrals')
            .select(`
                created_at,
                commission_earned,
                status,
                referee:profiles(full_name)
             `)
            .eq('referrer_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5);

        const recentReferrals = recentReferralsData?.map((r: any) => ({
            user: r.referee?.full_name || 'Unknown User',
            date: new Date(r.created_at).toLocaleDateString(),
            status: r.status === 'paid' ? 'Paid' : 'Pending', // Map DB status to UI type
            amount: Number(r.commission_earned)
        })) || []; // Cast to Referral[]

        return {
            clicks: 1240, // Need analytics query
            signups: referralCount,
            pendingEarnings: videoEarnings + referralEarnings, // Sum of both sources
            totalPaid: 0, // Need payouts table integration for "paid" history
            recentReferrals: recentReferrals as Referral[]
        };
    },

    // CUSTOMERS
    getCustomers: async (sellerId: string): Promise<Customer[]> => {
        const supabase = await createClient();

        // Fetch users who have purchased products from this seller
        // This requires a join: members -> products -> seller_id check
        const { data, error } = await supabase
            .from('memberships')
            .select(`
                user_id,
                created_at,
                profiles:user_id (full_name, email, avatar_url),
                products!inner (seller_id, price)
            `)
            .eq('products.seller_id', sellerId);

        if (error || !data) return [];

        // Aggregate by user
        const customerMap = new Map<string, Customer>();

        data.forEach((m: any) => {
            const uid = m.user_id;
            const profile = m.profiles;
            const price = Number(m.products?.price) || 0;

            if (customerMap.has(uid)) {
                const c = customerMap.get(uid)!;
                c.totalSpent += price;
                c.productsPurchased += 1;
            } else {
                customerMap.set(uid, {
                    id: uid,
                    name: profile?.full_name || 'Unknown',
                    email: profile?.email || '',
                    totalSpent: price,
                    productsPurchased: 1,
                    joinedDate: new Date(m.created_at).toLocaleDateString(),
                    avatarUrl: profile?.avatar_url
                });
            }
        });

        return Array.from(customerMap.values());
    },

    // SELLER DASHBOARD
    getSellerProducts: async (userId: string): Promise<Product[]> => {
        const supabase = await createClient();
        // In our schema, products have 'seller_id'.
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('seller_id', userId);

        if (error || !data) return [];
        return data.map(mapProduct);
    },

    getRevenueAnalytics: async (): Promise<{ name: string; revenue: number }[]> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        // Fetch completed orders for this seller's products
        // We need to join products to filter by seller_id
        const { data: orders } = await supabase
            .from('orders')
            .select(`
                created_at,
                total_amount,
                products!inner(seller_id)
            `)
            .eq('products.seller_id', user.id)
            .eq('status', 'completed')
            .gte('created_at', new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()); // Last 30 days

        if (!orders) return [];

        // Aggregate by day
        const dailyRevenue = new Map<string, number>();

        // Initialize last 7 days with 0 so chart looks complete
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            dailyRevenue.set(key, 0);
        }

        orders.forEach((order: any) => {
            const date = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const amount = Number(order.total_amount);

            // Note: If order is older than 7 days but within 30, it won't be in the initial map
            // Use set to add it or update
            const current = dailyRevenue.get(date) || 0;
            dailyRevenue.set(date, current + amount);
        });

        // Convert to array and take last 7 days for the main view
        // Or return all. Let's return the entries sorted by date?
        // Actually, the Map iteration order isn't guaranteed for keys added later.
        // Let's stick to the 7 entries we initialized + any others?
        // Simpler: Just take Array.from(dailyRevenue) and sort if needed. 
        // But for the specific "Last 7 Days" chart, we likely just want those 7 keys.

        return Array.from(dailyRevenue).map(([name, revenue]) => ({ name, revenue }));
    },

    // PAYOUTS
    getPayoutMethods: async (): Promise<PayoutMethod[]> => {
        // Payout methods are currently stored in user metadata? Or we can use a new table if we wanted.
        // For now, let's assume we store them in a simple JSONB column in profiles or just fetch logic.
        // To avoid schema complexity, let's keep it mocked or minimal.
        // BUT, the plan said "Save to profiles (jsonb)".

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data } = await supabase
            .from('profiles')
            .select('payout_details') // We need to add this column or use existing metadata
            .eq('id', user.id)
            .single();

        // If we don't have the column yet, let's just return a placeholder or empty.
        // Actually, let's just create a `payouts` query for history.
        return [{ id: 'pm1', provider: 'MTN Mobile Money', details: 'Stored in Profile', isDefault: true }];
    },

    getPayoutHistory: async (): Promise<PayoutTransaction[]> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('payouts')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error || !data) return [];

        return data.map((p: any) => ({
            id: p.id,
            date: new Date(p.created_at).toLocaleDateString(),
            amount: Number(p.amount),
            currency: p.currency,
            status: p.status === 'processing' ? 'Processing' : p.status === 'paid' ? 'Paid' : 'Failed',
            method: p.provider
        }));
    },
    addPayoutMethod: async (provider: any, details: string) => {
        // Implement save to profile logic if needed.
        return {
            id: Math.random().toString(36).substr(2, 9),
            provider,
            details,
            isDefault: true
        };
    },

    // ORDER PROCESSING
    createOrder: async (userId: string, productId: string, paymentMethod: string, amount: number, affiliateCode?: string) => {
        const supabase = await createClient();

        // 1. Create Order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: userId,
                product_id: productId,
                total_amount: amount,
                payment_method: paymentMethod,
                status: 'completed'
            })
            .select()
            .single();

        if (orderError) {
            console.error('Order Error:', orderError);
            return { success: false };
        }

        // 1.5 Affiliate Commission
        if (affiliateCode) {
            // Find link
            const { data: link } = await supabase
                .from('affiliate_links')
                .select('id, user_id, product_id')
                .eq('code', affiliateCode)
                .maybeSingle();

            // Check if it's the correct product and not self-referral
            if (link && link.product_id === productId && link.user_id !== userId) {
                // Calculate 20% commission (default for now)
                const commission = amount * 0.20;

                await supabase.from('affiliate_sales').insert({
                    affiliate_link_id: link.id,
                    order_id: order.id,
                    commission_amount: commission,
                    status: 'pending' // Earnings are pending until payout or 30 days
                });
            }
        }

        // 2. Create Membership (Grant access)
        const { error: memberError } = await supabase
            .from('memberships')
            .insert({
                user_id: userId,
                product_id: productId,
                status: 'active'
            });

        if (memberError) {
            console.error('Membership Error:', memberError);
            // In real app, might want to rollback order or retry
        }

        // 4. Send Email Notification
        // Need to fetch user email and product details first
        const { data: userData } = await supabase.auth.admin.getUserById(userId);
        const { data: productData } = await supabase
            .from('products')
            .select('title, product_type')
            .eq('id', productId)
            .single();

        // 3.5. Assign License if Software
        let licenseKey = null;
        if (productData?.product_type === 'software') {
            await db.claimLicense(productId, userId, order.id);
            // Fetch the assigned key to send in email
            licenseKey = await db.getUserLicense(productId);
        }

        const email = userData?.user?.email;
        if (email && productData) {
            await sendEmail({
                to: email,
                subject: 'Order Confirmation - Dwom',
                html: EmailTemplates.orderConfirmation(productData.title, amount, 'USD') // Assuming USD for now
            });
            // TODO: We should ideally update orderConfirmation template to include the key
        }

        // 3. Create Wallet Transaction if paid? (Optional, if we track platform revenue)

        return { success: true, orderId: order.id };
    },
    validateCoupon: async (code: string) => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('coupons')
            .select('*')
            .eq('code', code.toUpperCase())
            .eq('is_active', true)
            .single();

        if (error || !data) {
            return { valid: false, discountPercentage: 0 };
        }

        return { valid: true, discountPercentage: Number(data.discount_percentage) };
    },

    // PROFILE UPDATES
    updateProfile: async (userId: string, data: { name?: string; email?: string; username?: string; bio?: string; banner_url?: string; avatar_url?: string; social_links?: any }) => {
        const supabase = await createClient();

        // Check uniqueness if changing username
        if (data.username) {
            const { count } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('username', data.username).neq('id', userId);
            if (count && count > 0) return { success: false, error: 'Username taken' };
        }

        const updates: any = {};
        if (data.name) updates.full_name = data.name;
        // if (data.email) updates.email = data.email; // Profiles usually don't store email directly if using Auth, but preserving if exists
        if (data.username) updates.username = data.username;
        if (data.bio) updates.bio = data.bio;
        if (data.banner_url) updates.banner_url = data.banner_url;
        if (data.avatar_url) updates.avatar_url = data.avatar_url;
        if (data.social_links) updates.social_links = data.social_links;

        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId);

        return { success: !error, error: error?.message };
    },

    // ADMIN: USER MANAGEMENT
    getAllUsers: async () => {
        const supabase = await createClient();
        // Ensure only admin can call this? RLS should handle it, 
        // but for now we assume the caller checks or RLS is open for this dev phase/admin role.
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error || !data) return [];
        return data.map((p: any) => ({
            id: p.id,
            name: p.full_name || 'Unknown',
            email: p.email || 'No Email',
            role: p.is_admin ? 'Admin' : 'User', // Assuming is_admin exists or we default
            joined: new Date(p.created_at).toLocaleDateString(),
            isBanned: p.is_banned || false,
            kycStatus: p.kyc_status
        }));
    },

    updateUserBanStatus: async (userId: string, isBanned: boolean) => {
        const supabase = await createClient();
        const { error } = await supabase
            .from('profiles')
            .update({ is_banned: isBanned })
            .eq('id', userId);
        return !error;
    },

    submitVerification: async (userId: string, data: { provider: string, number: string, documentUrl?: string }) => {
        const supabase = await createClient();
        const { error } = await supabase
            .from('profiles')
            .update({
                kyc_status: 'pending',
                payout_details: { provider: data.provider, number: data.number },
                ...(data.documentUrl && { id_document_url: data.documentUrl })
            })
            .eq('id', userId);

        return !error;
    },

    // REVIEWS
    getReviews: async (productId: string): Promise<Review[]> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('reviews')
            .select(`
                id,
                rating,
                comment,
                created_at,
                profiles(full_name)
            `)
            .eq('product_id', productId)
            .order('created_at', { ascending: false });

        if (error || !data) return [];

        return data.map((r: any) => ({
            id: r.id,
            user: r.profiles?.full_name || 'Anonymous',
            rating: r.rating,
            comment: r.comment,
            date: new Date(r.created_at).toLocaleDateString()
        }));
    },

    createReview: async (productId: string, rating: number, comment: string) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { error } = await supabase
            .from('reviews')
            .insert({
                product_id: productId,
                user_id: user.id, // RLS checks this too
                rating,
                comment
            });

        return !error;
    },

    // MUSIC PROMO
    getCampaigns: async (): Promise<Campaign[]> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('campaigns')
            .select('*')
            .order('created_at', { ascending: false });

        if (error || !data) return [];
        return data.map(mapCampaign);
    },

    createCampaign: async (data: Omit<Campaign, 'id' | 'remainingBudget' | 'status'>) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error('Unauthorized');

        const { data: newRow, error } = await supabase
            .from('campaigns')
            .insert({
                seller_id: user.id,
                type: data.type || 'music',
                custom_type: data.customType,
                title: data.title,
                subtitle: data.subtitle,
                artist_name: data.artistName || data.subtitle,
                song_title: data.songTitle || data.title,
                audio_url: data.audioUrl,
                cover_image_url: data.coverImage,
                total_budget: data.budget,
                remaining_budget: data.budget,
                rate_per_1k_views: data.ratePer1kViews,
                requirements: data.requirements,
                status: 'active'
            })
            .select()
            .single();

        if (error) throw error;
        return mapCampaign(newRow);
    },

    createReferral: async (referrerCode: string, refereeId: string) => {
        // referrerCode is essentially the username (full_name) from the URL
        if (!referrerCode) return;

        const supabase = await createClient();

        // Find referrer by name (case insensitive ideally, or exact match for now)
        // In production, use a unique handle or code column.
        const { data: referrer } = await supabase
            .from('profiles')
            .select('id')
            .ilike('full_name', referrerCode) // Simple match
            .single();

        if (!referrer || referrer.id === refereeId) return; // Can't refer self

        await supabase
            .from('referrals')
            .insert({
                referrer_id: referrer.id,
                referee_id: refereeId,
                status: 'pending'
            });
    },

    createSubmission: async (campaignId: string, videoUrl: string) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Unauthorized');

        // Fetch campaign to get rate
        const { data: campaign } = await supabase
            .from('campaigns')
            .select('rate_per_1k_views, remaining_budget')
            .eq('id', campaignId)
            .single();

        if (!campaign) throw new Error('Campaign not found');

        // Mock Logic for earnings
        const views = Math.floor(Math.random() * 50000) + 1000;
        const earnings = (views / 1000) * Number(campaign.rate_per_1k_views);

        // Transaction: Insert Submission + Update Campaign Budget
        // (For simplicity we do independent calls, in production use RPC or transaction)

        const { data: newSub, error } = await supabase
            .from('submissions')
            .insert({
                campaign_id: campaignId,
                creator_id: user.id,
                video_url: videoUrl,
                views_count: views,
                earnings: earnings,
                status: 'approved' // Auto-approve for demo
            })
            .select()
            .single();

        if (error) throw error;

        // Update budget
        await supabase
            .from('campaigns')
            .update({ remaining_budget: Number(campaign.remaining_budget) - earnings })
            .eq('id', campaignId);

        return mapSubmission(newSub);
    },

    getUserSubmissions: async (userId: string): Promise<Submission[]> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('submissions')
            .select('*')
            .eq('creator_id', userId)
            .order('created_at', { ascending: false });

        if (error || !data) return [];
        return data.map(mapSubmission);
    },

    getUserMemberships: async (userId: string): Promise<Membership[]> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('memberships')
            .select(`
                *,
                product:products (
                    title
                )
            `)
            .eq('user_id', userId);

        if (error || !data) return [];

        return data.map((m: any) => ({
            id: m.id,
            productId: m.product_id,
            productName: m.product?.title || 'Unknown Product',
            status: m.status,
            nextBilling: m.next_billing_date ? new Date(m.next_billing_date).toLocaleDateString() : 'N/A',
            nextBillingDate: m.next_billing_date
        }));
    },

    createWalletTransaction: async (userId: string, amount: number, type: 'credit' | 'debit', description: string) => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('wallet_transactions')
            .insert({
                user_id: userId,
                amount: type === 'debit' ? -Math.abs(amount) : Math.abs(amount),
                type,
                description,
                status: 'completed'
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    getWalletTransactions: async (userId: string): Promise<WalletTransaction[]> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('wallet_transactions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error || !data) return [];

        return data.map((tx: any) => ({
            id: tx.id,
            userId: tx.user_id,
            amount: Number(tx.amount),
            type: tx.type,
            description: tx.description,
            status: tx.status,
            date: new Date(tx.created_at).toLocaleDateString()
        }));
    },

    // NEW: Product Creation
    createProduct: async (productData: Omit<Product, 'id' | 'rating' | 'reviews' | 'sellerId'>) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Unauthorized');

        const { data: newProd, error } = await supabase
            .from('products')
            .insert({
                seller_id: user.id,
                title: productData.title,
                price: productData.price,
                currency: productData.currency,
                description: productData.description,
                commission_rate: productData.commission,
                video_url: productData.videoUrl,
                product_type: productData.product_type || 'course',
                download_url: productData.download_url
                // Handle features array if your DB schema supports JSON/Arrays
                // For now assuming the schema has features or I ignore it
            })
            .select()
            .single();

        if (error) throw error;
        return mapProduct(newProd);
    },

    // ADMIN
    getPendingVerifications: async () => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('kyc_status', 'pending');

        return data || [];
    },

    updateVerificationStatus: async (userId: string, status: 'verified' | 'rejected') => {
        const supabase = await createClient();
        const { error } = await supabase
            .from('profiles')
            .update({ kyc_status: status })
            .eq('id', userId);

        return !error;
    },

    // MESSAGING
    getConversations: async (): Promise<Conversation[]> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('conversations')
            .select('*')
            .contains('participant_ids', [user.id])
            .order('last_message_at', { ascending: false });

        if (error || !data) return [];

        return data.map((c: any) => ({
            id: c.id,
            participants: c.participant_ids,
            lastMessageAt: new Date(c.last_message_at).toLocaleDateString(),
            unreadCount: 0 // Mock for now, would need join with messages
        }));
    },

    getMessages: async (conversationId: string): Promise<Message[]> => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });

        if (error || !data) return [];

        return data.map((m: any) => ({
            id: m.id,
            conversationId: m.conversation_id,
            senderId: m.sender_id,
            content: m.content,
            createdAt: m.created_at,
            isRead: m.is_read
        }));
    },

    createConversationIfNotExists: async (targetUserId: string): Promise<string | null> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        // Check if conversation exists (simple check for now)
        const { data: existing } = await supabase
            .from('conversations')
            .select('id')
            .contains('participant_ids', [user.id, targetUserId])
            .maybeSingle();

        if (existing) {
            return existing.id;
        }

        // Create new
        const { data: newConvo, error } = await supabase
            .from('conversations')
            .insert({
                participant_ids: [user.id, targetUserId]
            })
            .select('id')
            .single();

        if (error || !newConvo) {
            console.error('Error creating convo:', error);
            return null;
        }
        return newConvo.id;
    },

    sendMessage: async (conversationId: string, content: string) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Unauthorized');

        const { data, error } = await supabase
            .from('messages')
            .insert({
                conversation_id: conversationId,
                sender_id: user.id,
                content: content
            })
            .select()
            .single();

        if (error) throw error;

        // Update conversation timestamp
        await supabase
            .from('conversations')
            .update({ last_message_at: new Date().toISOString() })
            .eq('id', conversationId);

        return {
            id: data.id,
            conversationId: data.conversation_id,
            senderId: data.sender_id,
            content: data.content,
            isRead: data.is_read,
            createdAt: new Date(data.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    },

    startConversation: async (participantIds: string[]) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Unauthorized');

        // Ensure I am in the list
        const uniqueParticipants = Array.from(new Set([...participantIds, user.id]));

        const { data, error } = await supabase
            .from('conversations')
            .insert({
                participant_ids: uniqueParticipants
            })
            .select()
            .single();

        if (error) throw error;
        return data.id;
    },

    // ANALYTICS
    trackEvent: async (type: string, targetId?: string, metadata?: any) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // Fire and forget, don't block
        await supabase.from('analytics_events').insert({
            event_type: type,
            target_id: targetId,
            user_id: user?.id,
            metadata: metadata
        });
    },

    getAnalytics: async (metricType: string, targetId?: string, daysBack: number = 30) => {
        const supabase = await createClient();

        const { data, error } = await supabase.rpc('get_daily_metrics', {
            metric_type: metricType,
            target_uuid: targetId,
            days_back: daysBack
        });

        if (error) {
            console.error('Analytics Error:', error);
            return [];
        }

        return data.map((d: any) => ({
            date: new Date(d.day).toLocaleDateString(),
            value: Number(d.count)
        }));
    },

    // ADMIN - CRYPTO & PAYOUTS
    getPendingCryptoOrders: async () => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                user:profiles!user_id(email, full_name),
                product:products(title)
            `)
            .eq('status', 'pending_crypto')
            .order('created_at', { ascending: false });

        if (error || !data) return [];
        return data.map((o: any) => ({
            id: o.id,
            userEmail: o.user?.email || 'Unknown',
            userName: o.user?.full_name || 'Unknown',
            productTitle: o.product?.title || 'Unknown',
            amount: o.total_amount,
            hash: o.payment_details?.hash || 'N/A', // Assuming we stored hash in payment_details jsonb
            date: new Date(o.created_at).toLocaleDateString()
        }));
    },

    approveCryptoOrder: async (orderId: string) => {
        const supabase = await createClient();

        // 1. Get Order
        const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single();
        if (!order) return false;

        // 2. Update Order Status
        const { error: updateError } = await supabase
            .from('orders')
            .update({ status: 'completed' })
            .eq('id', orderId);

        if (updateError) return false;

        // 3. Grant Access (Membership)
        const { error: memberError } = await supabase
            .from('memberships')
            .insert({
                user_id: order.user_id,
                product_id: order.product_id,
                status: 'active'
            });

        return !memberError;
    },

    rejectCryptoOrder: async (orderId: string) => {
        const supabase = await createClient();
        const { error } = await supabase
            .from('orders')
            .update({ status: 'failed' })
            .eq('id', orderId);
        return !error;
    },

    getPendingPayouts: async () => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('payouts')
            .select(`
                *,
                user:profiles!user_id(email, full_name, payout_details)
            `)
            .eq('status', 'processing')
            .order('created_at', { ascending: false });

        if (error || !data) return [];

        return data.map((p: any) => ({
            id: p.id,
            sellerName: p.user?.full_name || 'Unknown',
            amount: p.amount,
            method: p.provider,
            details: p.user?.payout_details || {}, // Or whereever we stored specific request details
            date: new Date(p.created_at).toLocaleDateString()
        }));
    },

    processPayout: async (payoutId: string) => {
        const supabase = await createClient();
        const { error } = await supabase
            .from('payouts')
            .update({ status: 'paid' })
            .eq('id', payoutId);
        return !error;
    },

    rejectPayout: async (payoutId: string) => {
        const supabase = await createClient();
        const { error } = await supabase
            .from('payouts')
            .update({ status: 'rejected' })
            .eq('id', payoutId);
        return !error;
    },

    // AFFILIATE SYSTEM
    createAffiliateLink: async (productId: string, customCode?: string) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { success: false, error: 'Unauthorized' };

        // Generate a code if not provided: USERNAME-PRODUCT (simplified)
        // For now, let's use a random hash to allow quick generation
        const code = customCode || `${user.id.split('-')[0]}-${Math.random().toString(36).substr(2, 5)}`.toUpperCase();

        const { data, error } = await supabase
            .from('affiliate_links')
            .insert({
                user_id: user.id,
                product_id: productId,
                code: code
            })
            .select()
            .single();

        return { success: !error, code: data?.code, error };
    },

    getAffiliateLink: async (productId: string) => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data } = await supabase
            .from('affiliate_links')
            .select('code, clicks')
            .eq('user_id', user.id)
            .eq('product_id', productId)
            .maybeSingle();

        return data; // { code, clicks }
    },

    recordAffiliateClick: async (code: string) => {
        const supabase = await createClient();
        // RPC for atomic increment is best, but for now fetch-update is okay for MVP
        // Or if we had an RPC 'increment_clicks'

        // Let's just lookup ID first
        const { data: link } = await supabase.from('affiliate_links').select('id, clicks').eq('code', code).single();

        if (link) {
            await supabase
                .from('affiliate_links')
                .update({ clicks: link.clicks + 1 })
                .eq('id', link.id);
        }
    },

    resolveAffiliateCode: async (code: string) => {
        const supabase = await createClient();
        const { data } = await supabase
            .from('affiliate_links')
            .select('id, product_id, user_id')
            .eq('code', code)
            .maybeSingle();
        return data;
    },

    getUserAffiliateStats: async () => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        // Fetch user's links
        const { data: links } = await supabase
            .from('affiliate_links')
            .select(`
                id, code, clicks, 
                products (title, price),
                sales:affiliate_sales (count, commission_amount, status)
            `)
            .eq('user_id', user.id);

        if (!links) return [];

        return links.map((l: any) => {
            const sales = l.sales || [];
            const totalEarnings = sales.reduce((acc: number, s: any) => acc + Number(s.commission_amount), 0);
            const pendingEarnings = sales
                .filter((s: any) => s.status === 'pending')
                .reduce((acc: number, s: any) => acc + Number(s.commission_amount), 0);

            return {
                id: l.id,
                code: l.code,
                productName: l.products?.title || 'Unknown',
                productPrice: l.products?.price || 0,
                clicks: l.clicks,
                salesCount: sales.length,
                totalEarnings,
                pendingEarnings
            };
        });
    },

    // STOREFRONT SYSTEM


    getProfileByUsername: async (username: string) => {
        const supabase = await createClient();
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .single();
        return data;
    },

    getUserProducts: async (userId: string) => {
        const supabase = await createClient();
        const { data } = await supabase
            .from('products')
            .select('*')
            .eq('sellerId', userId)
            // .eq('status', 'active') // if we had status
            .order('created_at', { ascending: false });

        return data ? data.map(mapProduct) : [];
    },

    // SELLER ORDERS
    getSellerOrders: async (): Promise<any[]> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('orders')
            .select(`
                id,
                total_amount,
                status,
                created_at,
                payment_channel,
                payment_reference,
                products (id, title),
                profiles!orders_user_id_fkey (full_name, email)
            `)
            .eq('products.seller_id', user.id)
            .order('created_at', { ascending: false });

        if (error || !data) return [];

        return data.map((o: any) => ({
            id: o.id,
            amount: o.total_amount,
            status: o.status,
            createdAt: o.created_at,
            channel: o.payment_channel,
            reference: o.payment_reference,
            productId: o.products?.id,
            productTitle: o.products?.title,
            customerName: o.profiles?.full_name,
            customerEmail: o.profiles?.email,
        }));
    },

    // NOTIFICATIONS
    getNotifications: async (): Promise<Notification[]> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(20);

        if (error || !data) return [];

        return data.map((n: any) => ({
            id: n.id,
            userId: n.user_id,
            type: n.type,
            title: n.title,
            body: n.body,
            link: n.link,
            isRead: n.is_read,
            createdAt: n.created_at
        }));
    },

    getUnreadCount: async (): Promise<number> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return 0;

        const { count } = await supabase
            .from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('is_read', false);

        return count || 0;
    },

    markNotificationAsRead: async (notificationId: string): Promise<boolean> => {
        const supabase = await createClient();
        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', notificationId);

        return !error;
    },

    markAllNotificationsAsRead: async (): Promise<boolean> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', user.id)
            .eq('is_read', false);

        return !error;
    },

    createNotification: async (
        userId: string,
        type: Notification['type'],
        title: string,
        body: string,
        link?: string
    ): Promise<boolean> => {
        const supabase = await createClient();
        const { error } = await supabase
            .from('notifications')
            .insert({
                user_id: userId,
                type,
                title,
                body,
                link,
                is_read: false
            });

        return !error;
    },

    // ACTIVITY LOGS
    getActivityLogs: async (): Promise<any[]> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('activity_logs')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(50);

        if (error || !data) return [];

        return data.map((log: any) => ({
            id: log.id,
            action: log.action,
            device: log.device,
            ipAddress: log.ip_address,
            location: log.location,
            createdAt: log.created_at,
        }));
    },

    logActivity: async (action: string, metadata?: { device?: string; ipAddress?: string; location?: string }): Promise<boolean> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { error } = await supabase
            .from('activity_logs')
            .insert({
                user_id: user.id,
                action,
                device: metadata?.device || null,
                ip_address: metadata?.ipAddress || null,
                location: metadata?.location || null,
            });

        return !error;
    },

    // REFUNDS
    requestRefund: async (orderId: string, reason: string): Promise<{ success: boolean; error?: string }> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { success: false, error: 'Unauthorized' };

        // Check if order belongs to user
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('id, status, total_amount')
            .eq('id', orderId)
            .eq('user_id', user.id)
            .single();

        if (orderError || !order) {
            return { success: false, error: 'Order not found' };
        }

        if (order.status === 'refunded') {
            return { success: false, error: 'Order already refunded' };
        }

        // Create refund request
        const { error } = await supabase
            .from('refund_requests')
            .insert({
                user_id: user.id,
                order_id: orderId,
                reason,
                status: 'pending',
                amount: order.total_amount,
            });

        if (error) {
            return { success: false, error: 'Failed to submit refund request' };
        }

        return { success: true };
    },

    getRefundRequests: async (): Promise<any[]> => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('refund_requests')
            .select(`
                id,
                reason,
                status,
                amount,
                created_at,
                orders (id, products (title))
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error || !data) return [];

        return data.map((r: any) => ({
            id: r.id,
            reason: r.reason,
            status: r.status,
            amount: r.amount,
            createdAt: r.created_at,
            orderId: r.orders?.id,
            productTitle: r.orders?.products?.title,
        }));
    }

};
