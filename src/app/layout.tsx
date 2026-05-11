import type { Metadata, Viewport } from 'next';
import { Noto_Sans } from 'next/font/google';

import { Providers } from '@/providers/Providers';

import { SITE_NAME, SITE_URL } from '@/constants/constants';

import './globals.css';

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
    apple: '/images/256.png',
    other: {
      rel: 'touch-icons',
      url: '/images/256.png',
      sizes: '256x256',
      type: 'image/png',
    },
  },
  title: {
    absolute: 'Red Video',
    template: `%s | Red Video`,
  },
  description: 'Best app for video watching',
  openGraph: {
    type: 'website',
    siteName: `${SITE_NAME}`,
    images: [
      {
        url: '/images/og.jpg',
        width: 909,
        height: 500,
        alt: `${SITE_NAME}`,
      },
    ],
  },
  metadataBase: new URL(SITE_URL),
  applicationName: `${SITE_NAME}`,
  manifest: '/manifest.json',
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#191B28',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${notoSans.variable} bg-bg font-sans text-base text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
