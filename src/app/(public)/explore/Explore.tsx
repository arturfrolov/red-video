'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Compass } from 'lucide-react';

import { Heading } from '@/ui/heading/Heading';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { useAuth } from '@/hooks/useAuth';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

import { videoService } from '@/services/video.service';

export function Explore() {
  const { user } = useAuth();

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['explore', user?.id],
    queryFn: ({ pageParam }) =>
      videoService.getExploreVideos(
        user?.id,
        {
          page: pageParam.page,
          limit: 12,
        },
        pageParam.excludeIds
      ),
    initialPageParam: { page: 1, excludeIds: [] as string[] },
    getNextPageParam: (lastPage, allPages) => {
      const { page, totalPages } = lastPage;
      const allVideoIds = allPages.flatMap((page) => page.videos.map((video) => video.id));

      return page < totalPages ? { page: page + 1, excludeIds: allVideoIds } : undefined;
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
      <Heading Icon={Compass}>Explore</Heading>
      <section className='grid-6-cols pb-5'>
        {isLoading && !allVideos.length ? (
          <SkeletonLoader
            count={6}
            className='h-48 rounded-md'
          />
        ) : (
          allVideos.map((video) => (
            <VideoItem
              key={video.id}
              video={video}
            />
          ))
        )}

        {isFetchingNextPage && (
          <SkeletonLoader
            count={6}
            className='h-48 rounded-md'
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
