'use client';

import { Menu } from 'lucide-react';
import dynamic from 'next/dynamic';

import { HeaderLinks } from '@/components/layout/content/header/HeaderLinks';
import { SearchField } from '@/components/layout/content/header/SearchField';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

const DynamicHeaderProfile = dynamic(
  () =>
    import('@/components/layout/content/header/profile/HeaderProfile').then(
      (mod) => mod.HeaderProfile
    ),
  { ssr: false, loading: () => <SkeletonLoader className='mb-0 w-10 rounded-md' /> }
);

export function Header({ openMobileSidebar }: { openMobileSidebar: () => void }) {
  return (
    <header
      className='flex flex-wrap items-center gap-6 border-b border-border p-4 sm:flex-nowrap
        sm:gap-3 sm:p-layout'
    >
      <button
        type='button'
        className='inline-flex cursor-pointer opacity-85 transition-opacity hover:opacity-100
          lg:hidden'
        onClick={openMobileSidebar}
        title='Open sidebar'
        aria-label='Open sidebar'
      >
        <Menu />
      </button>
      <div className='order-3 w-full min-w-0 sm:order-0 sm:flex-1'>
        <SearchField />
      </div>
      <div className='ml-auto flex shrink-0 items-center gap-3 sm:gap-5 lg:gap-8'>
        <HeaderLinks />
        <DynamicHeaderProfile />
      </div>
    </header>
  );
}
