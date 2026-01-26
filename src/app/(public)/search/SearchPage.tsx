'use client';

import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { Heading } from '@/ui/heading/Heading';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { videoService } from '@/services/video.service';

export function SearchPage() {
  const searchParams = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ['search', searchParams.get('term')],
    queryFn: () => videoService.getAll(searchParams.get('term')),
  });

  return (
    <section>
      <Heading
        isH1
        Icon={Search}
      >
        Search &quot;{searchParams.get('term')}&quot;
      </Heading>
      <div className='grid-6-cols'>
        {isLoading ? (
          <SkeletonLoader
            count={6}
            className='h-45 rounded-md'
          />
        ) : data?.length ? (
          data.map((video) => (
            <VideoItem
              key={video.id}
              video={video}
            />
          ))
        ) : (
          <p>No results</p>
        )}
      </div>
    </section>
  );
}
