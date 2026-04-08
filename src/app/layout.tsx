import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import { Providers } from '@/providers/Providers';

import { SITE_URL } from '@/constants/constants';

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
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${notoSans.variable} bg-bg font-sans text-base text-white antialiased`}>
        <Providers>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
