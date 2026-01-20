import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './components/ThemeProvider';
import { WishlistProvider } from './components/WishlistContext';
import PWAInstallPrompt from './components/PWAInstallPrompt';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ff5f00',
};

export const metadata: Metadata = {
  title: "dwam | #1 Digital Marketplace in Africa",
  description: 'The #1 platform for African creators to sell courses, communities, and software. Get paid instantly in Cedis, Naira, or Crypto.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  metadataBase: new URL('https://dwam.vercel.app'),
  openGraph: {
    title: 'dwam | #1 Digital Marketplace in Africa',
    description: 'Sell courses, communities & software. Get paid instantly via Momo, Card, or Crypto.',
    url: 'https://dwam.store',
    siteName: 'dwam',
    images: [
      {
        url: '/login_hero.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dwam | #1 Digital Marketplace in Africa',
    description: 'Sell courses, communities & software across Africa. Instant payments.',
    images: ['/login_hero.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'dwam',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <WishlistProvider>
            {children}
            <PWAInstallPrompt />
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

