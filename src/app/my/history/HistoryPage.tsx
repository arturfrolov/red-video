'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { History } from 'lucide-react';

import { Button } from '@/ui/button/Button';
import { Heading } from '@/ui/heading/Heading';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { HorizontalVideoItem } from '@/ui/video-item/HorizontalVideoItem';

import { watchHistoryService } from '@/services/watch-history.service';

export function HistoryPage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['watch-history'],
    queryFn: () => watchHistoryService.getUserHistory(),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['clear-history'],
    mutationFn: () => watchHistoryService.clearHistory(),
    onSuccess: () => refetch(),
  });

  return (
    <section className='w-1/2'>
      <div className='mb-10 flex items-center justify-between'>
        <Heading
          isPageHeading
          Icon={History}
          className='mb-0'
        >
          History
        </Heading>
        <Button
          variant='simple'
          isLoading={isPending}
          onClick={() => mutate()}
        >
          Clear history
        </Button>
      </div>
      <div>
        {isLoading ? (
          <SkeletonLoader
            count={3}
            className='mb-6 h-28 rounded-md'
          />
        ) : data?.data?.length ? (
          data?.data?.map((history) => (
            <HorizontalVideoItem
              key={history.video.id}
              video={history.video}
            />
          ))
        ) : (
          <p>Watch history not found</p>
        )}
      </div>
    </section>
  );
}
