import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "dwom | The African Digital Marketplace",
  description: 'The #1 platform for African creators to sell courses, communities, and software. Get paid instantly in Cedis, Naira, or Crypto.',
  openGraph: {
    title: 'dwom | The African Digital Marketplace',
    description: 'Sell digital products and communities across Africa. Payment via Momo, Card, and Crypto.',
    url: 'https://dwom.com', // Placeholder URL
    siteName: 'dwom',
    images: [
      {
        url: '/window.svg', // Placeholder image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dwom | The African Digital Marketplace',
    description: 'The #1 platform for African creators to sell courses, communities, and software.',
    images: ['/window.svg'], // Placeholder
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
