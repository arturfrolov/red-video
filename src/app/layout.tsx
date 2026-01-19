import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import { Layout } from '@/components/layout/layout';

import './globals.css';

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Red Video',
  description: 'Best app for video watching',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${notoSans.variable} antialiased font-sans text-white bg-bg text-base`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
