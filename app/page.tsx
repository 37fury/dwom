import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CategoryList from './components/CategoryList';
import MarketplaceGrid from './components/MarketplaceGrid';
import LiveActivity from './components/LiveActivity';
import ExitIntent from './components/ExitIntent';
import Leaderboard, { mockTopSellers } from './components/Leaderboard';
import SuccessStories from './components/SuccessStories';

import { createClient } from '@/utils/supabase/server';
import { db } from './lib/db';

import FadeIn from './components/FadeIn';

export default async function Home(props: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch real products with filters
  const products = await db.getAllProducts(searchParams.q, searchParams.category);

  return (
    <main>
      <Navbar user={user} />
      <FadeIn>
        <Hero />
        <CategoryList />
        <MarketplaceGrid products={products} />

        {/* Leaderboard Section */}
        <section style={{ padding: '60px 0', background: '#f8fafc' }}>
          <div className="container" style={{ maxWidth: '500px' }}>
            <Leaderboard sellers={mockTopSellers} />
          </div>
        </section>

        {/* Success Stories */}
        <SuccessStories />
      </FadeIn>
      <Footer />
      <LiveActivity />
      <ExitIntent />
    </main>
  );
}

