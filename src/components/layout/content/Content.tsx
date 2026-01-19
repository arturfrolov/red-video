import type { PropsWithChildren } from 'react';

import { Header } from '@/components/layout/content/header/Header';

export function Content({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='flex-1'>
      <Header />
      <section className='p-layout'>{children}</section>
    </div>
  );
}
