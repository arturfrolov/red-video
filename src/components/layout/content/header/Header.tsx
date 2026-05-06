'use client';

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

export function Header() {
  return (
    <header className='flex items-center justify-between border-b border-border p-layout'>
      <SearchField />
      <div className='flex items-center gap-8'>
        <HeaderLinks />
        <DynamicHeaderProfile />
      </div>
    </header>
  );
}
