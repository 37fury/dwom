import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './components/ThemeProvider';
import { WishlistProvider } from './components/WishlistContext';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ff5f00',
};

export const metadata: Metadata = {
  title: "dwom | The African Digital Marketplace",
  description: 'The #1 platform for African creators to sell courses, communities, and software. Get paid instantly in Cedis, Naira, or Crypto.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'dwom | The African Digital Marketplace',
    description: 'Sell digital products and communities across Africa. Payment via Momo, Card, and Crypto.',
    url: 'https://dwom.com', // Placeholder URL
    siteName: 'dwom',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dwom | The African Digital Marketplace',
    description: 'The #1 platform for African creators to sell courses, communities, and software.',
    images: ['/logo.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'dwom',
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
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

