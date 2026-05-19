import type { PropsWithChildren } from 'react';

import { Header } from '@/components/layout/content/header/Header';

interface Props extends PropsWithChildren {
  openMobileSidebar: () => void;
}

export function Content({ children, openMobileSidebar }: Props) {
  return (
    <div className='relative min-w-0 flex-1'>
      <Header openMobileSidebar={openMobileSidebar} />
      <section className='p-4 sm:p-layout'>{children}</section>
    </div>
  );
}
