import type { Metadata } from 'next';
import { Suspense } from 'react';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { SearchPage } from './SearchPage';

export const metadata: Metadata = {
  title: 'Search',
  ...NO_INDEX_PAGE,
};

export default function SPage() {
  return (
    <Suspense
      fallback={
        <div className='grid-6-cols'>
          <SkeletonLoader
            count={3}
            className='mb-0 w-10 rounded-md'
          />
        </div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}
