-- Create Profiles table (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user', -- 'seller' or 'affiliate' or 'user'
  kyc_status text default 'unverified', -- 'unverified', 'pending', 'verified', 'rejected'
  id_document_url text, -- URL to government ID
  payout_details jsonb, -- { provider: '', number: '' }
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create Products table
create table public.products (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references public.profiles(id) not null,
  title text not null,
  description text,
  price numeric not null,
  currency text default 'USD',
  image_url text,
  video_url text, -- For demo videos
  commission_rate numeric default 0, -- Affiliate commission percentage
  rating numeric default 0,
  reviews_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.products enable row level security;

-- Create Campaigns table (Music Promo)
create table public.campaigns (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references public.profiles(id) not null,
  artist_name text not null,
  song_title text not null,
  audio_url text,
  cover_image_url text,
  total_budget numeric not null,
  remaining_budget numeric not null,
  rate_per_1k_views numeric not null,
  requirements text,
  status text default 'active', -- 'active', 'paused', 'completed'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.campaigns enable row level security;

-- Create Submissions table (Music Promo Submissions)
create table public.submissions (
  id uuid default gen_random_uuid() primary key,
  campaign_id uuid references public.campaigns(id) not null,
  creator_id uuid references public.profiles(id) not null,
  video_url text not null,
  views_count integer default 0,
  earnings numeric default 0,
  status text default 'pending', -- 'pending', 'approved', 'rejected'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.submissions enable row level security;

-- RLS Policies (Basic Setup)

-- Profiles: Public read, User can update own
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- Products: Public read, Sellers can insert/update own
create policy "Products are viewable by everyone."
  on public.products for select
  using ( true );

create policy "Sellers can insert products."
  on public.products for insert
  with check ( auth.uid() = seller_id );
  
create policy "Sellers can update own products."
  on public.products for update
  using ( auth.uid() = seller_id );

-- Campaigns: Public read, Sellers can insert/update own
create policy "Campaigns are viewable by everyone."
  on public.campaigns for select
  using ( true );
  
create policy "Sellers can insert campaigns."
  on public.campaigns for insert
  with check ( auth.uid() = seller_id );

-- Submissions: Creators can insert, view own. Sellers can view submissions for their campaigns.
create policy "Creators can insert submissions."
  on public.submissions for insert
  with check ( auth.uid() = creator_id );

create policy "Creators can view own submissions."
  on public.submissions for select
  using ( auth.uid() = creator_id );

create policy "Sellers can view submissions for their campaigns."
  on public.submissions for select
  using ( 
    exists (
      select 1 from public.campaigns
      where public.campaigns.id = submissions.campaign_id
      and public.campaigns.seller_id = auth.uid()
    )
  );

-- Function to handle new user signup (Trigger)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create Memberships table
create table public.memberships (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id) not null,
  status text default 'active', -- 'active', 'cancelled', 'expired'
  start_date timestamp with time zone default timezone('utc'::text, now()) not null,
  next_billing_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.memberships enable row level security;

-- Create Wallet Transactions table
create table public.wallet_transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  amount numeric not null, -- Positive for earnings/deposits, Negative for purchases/withdrawals
  type text not null, -- 'deposit', 'withdrawal', 'earning', 'purchase', 'referral'
  description text,
  reference_id text, -- Optional ID of related order/payout
  status text default 'completed', -- 'pending', 'completed', 'failed'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.wallet_transactions enable row level security;

-- RLS Policies for New Tables

-- Memberships: Users can view their own
create policy "Users can view own memberships."
  on public.memberships for select
  using ( auth.uid() = user_id );

-- Wallet: Users can view their own transactions
create policy "Users can view own wallet transactions."
  on public.wallet_transactions for select
  using ( auth.uid() = user_id );

-- Function to calculate user balance
create or replace function public.get_user_balance(user_uuid uuid)
returns numeric
language plpgsql
security definer
as $$
declare
  total_balance numeric;
begin
  select coalesce(sum(amount), 0)
  into total_balance
  from public.wallet_transactions
  where user_id = user_uuid and status = 'completed';
  
  return total_balance;
end;
$$;

-- Create Orders table
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id) not null, -- Simple single-product order for now
  total_amount numeric not null,
  currency text default 'USD',
  status text default 'completed', -- 'pending', 'completed', 'failed'
  payment_method text, -- 'mobile_money', 'card', 'wallet'
  coupon_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.orders enable row level security;

-- Create Coupons table
create table public.coupons (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,
  discount_percentage numeric not null,
  seller_id uuid references public.profiles(id), -- Optional: if seller-specific
  max_uses integer,
  current_uses integer default 0,
  expiry_date timestamp with time zone,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.coupons enable row level security;

-- Create Payouts table
create table public.payouts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  amount numeric not null,
  currency text default 'USD',
  status text default 'pending', -- 'pending', 'processing', 'paid', 'failed'
  provider text not null, -- 'mobile_money', 'bank', 'crypto'
  details jsonb not null, -- { "phone": "...", "network": "..." }
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  processed_at timestamp with time zone
);

-- Enable RLS
alter table public.payouts enable row level security;

-- RLS Policies

-- Orders: Users can view own, Sellers can view orders for their products
create policy "Users can view own orders."
  on public.orders for select
  using ( auth.uid() = user_id );

create policy "Sellers can view orders for their products."
  on public.orders for select
  using ( 
    exists (
      select 1 from public.products
      where public.products.id = orders.product_id
      and public.products.seller_id = auth.uid()
    )
  );

-- Coupons: Public read (or restricted to validity check function), Sellers update own
create policy "Coupons are viewable by everyone."
  on public.coupons for select
  using ( true );

-- Payouts: Users can view own
create policy "Users can view own payouts."
  on public.payouts for select
  using ( auth.uid() = user_id );

-- Insert initial Coupons
('WELCOME10', 10),
('AFRICA20', 20);

-- Create Conversations table
create table public.conversations (
  id uuid default gen_random_uuid() primary key,
  participant_ids uuid[] not null, -- Array of user IDs
  last_message_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.conversations enable row level security;

-- Create Messages table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations(id) not null,
  sender_id uuid references public.profiles(id) not null,
  content text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.messages enable row level security;

-- Enable Realtime for Messages
alter publication supabase_realtime add table public.messages;

-- RLS Policies

-- Conversations: Users can view conversations they are part of
create policy "Users can view their conversations."
  on public.conversations for select
  using ( auth.uid() = any(participant_ids) );

create policy "Users can insert conversations."
  on public.conversations for insert
  with check ( auth.uid() = any(participant_ids) );

-- Messages: Users can view messages in their conversations
create policy "Users can view messages in their conversations."
  on public.messages for select
  using ( 
    exists (
      select 1 from public.conversations
      where public.conversations.id = messages.conversation_id
      and auth.uid() = any(public.conversations.participant_ids)
    )
  );

create policy "Users can insert messages in their conversations."
  on public.messages for insert
  with check ( 
    exists (
      select 1 from public.conversations
      where public.conversations.id = messages.conversation_id
      and auth.uid() = any(public.conversations.participant_ids)
    )
  );

-- Create Analytics Events table
create table public.analytics_events (
  id uuid default gen_random_uuid() primary key,
  event_type text not null, -- 'view_product', 'click_affiliate', 'purchase'
  target_id uuid, -- product_id or campaign_id
  user_id uuid references public.profiles(id), -- Optional, valid if logged in
  metadata jsonb, -- Extra details like source, referer
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.analytics_events enable row level security;

-- Policies
create policy "Public can insert analytics."
  on public.analytics_events for insert
  with check ( true );

create policy "Users can view own analytics."
  on public.analytics_events for select
  using ( auth.uid() = user_id );

-- Function for Daily Aggregation (Simple)
create or replace function public.get_daily_metrics(
  metric_type text, 
  target_uuid uuid default null, 
  days_back int default 30
)
returns table (
  day timestamp, 
  count bigint
) 
language plpgsql
security definer
as $$
begin
  return query
  select 
    date_trunc('day', created_at) as day,
    count(*) as count
  from public.analytics_events
  where event_type = metric_type
  and (target_uuid is null or target_id = target_uuid)
  and created_at > (now() - (days_back || ' days')::interval)
  group by 1
  order by 1;
end;

-- Create Referrals table
create table public.referrals (
  id uuid default gen_random_uuid() primary key,
  referrer_id uuid references public.profiles(id) not null,
  referee_id uuid references public.profiles(id) not null,
  status text default 'pending', -- 'pending', 'paid', 'converted'
  commission_earned numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.referrals enable row level security;

-- Policies
create policy "Referrers can view their referrals."
  on public.referrals for select
  using ( auth.uid() = referrer_id );

-- System can insert referrals (via server action or trigger), but let's allow public insert for now for the callback flow if needed,
-- or strictly control via RLS. Ideally, only authenticated or system role inserts.
-- For callback flow, the user is signing up, so they are authenticated as 'authenticated' role roughly or anon?
-- Actually, the callback happens on server side, so we use service_role key or similar.
-- But for client-side insertion potential:
create policy "Authenticated users can insert referrals."
  on public.referrals for insert
  with check ( auth.uid() = referee_id ); -- The new user is the referee

