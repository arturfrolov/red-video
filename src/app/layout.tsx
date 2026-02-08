import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import { Layout } from '@/components/layout/layout';

import { Providers } from '@/providers/Providers';

import './globals.css';

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    absolute: 'Red Video',
    template: `%s | Red Video`,
  },
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
        <Providers>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
