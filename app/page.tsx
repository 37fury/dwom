import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CategoryList from './components/CategoryList';
import MarketplaceGrid from './components/MarketplaceGrid';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CategoryList />
      <MarketplaceGrid />
      <Footer />
    </main>
  );
}
