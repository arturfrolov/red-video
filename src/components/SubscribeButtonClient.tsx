'use client';

import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

const DynamicSubscribeButton = dynamic<{ slug: string }>(
  () => import('@/components/SubscribeButton').then((mod) => mod.SubscribeButton),
  {
    ssr: false,
    loading: () => <SkeletonLoader className='mb-0 h-10 w-40 rounded-md' />,
  }
);

export function SubscribeButtonClient({ slug }: { slug: string }) {
  return <DynamicSubscribeButton slug={slug} />;
}
