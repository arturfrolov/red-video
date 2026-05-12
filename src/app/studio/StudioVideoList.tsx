'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Video } from 'lucide-react';

import { Heading } from '@/ui/heading/Heading';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { StudioVideoItem } from '@/ui/studio-video-item/StudioVideoItem';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

import { studioVideoService } from '@/services/studio/studio-video.service';

export function StudioVideoList() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['studioVideoList'],
    queryFn: ({ pageParam }) =>
      studioVideoService.getAll({
        page: pageParam.page,
        limit: 8,
      }),
    initialPageParam: { page: 1 },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage;

      return page < totalPages ? { page: page + 1 } : undefined;
    },
  });

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const allVideos = data?.pages.flatMap((page) => page.videos) || [];

  return (
    <>
      <Heading
        Icon={Video}
        isPageHeading
        className='mb-8'
      >
        Content
      </Heading>
      <section className='pb-5'>
        {isLoading && !allVideos.length ? (
          <SkeletonLoader
            count={3}
            className='mb-8 h-48 rounded-md'
          />
        ) : (
          allVideos.map((video) => (
            <StudioVideoItem
              key={video.id}
              video={video}
            />
          ))
        )}

        {isFetchingNextPage && (
          <SkeletonLoader
            count={3}
            className='mb-8 h-48 rounded-md'
          />
        )}
      </section>

      <div
        ref={loadMoreRef}
        className='h-1'
        aria-hidden='true'
      />
    </>
  );
}
