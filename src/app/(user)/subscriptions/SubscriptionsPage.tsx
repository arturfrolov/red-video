'use client';
import { Heart } from 'lucide-react';

import { Heading } from '@/ui/heading/Heading';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { useProfile } from '@/hooks/useProfile';

export function SubscriptionsPage() {
  const { profile, isLoading } = useProfile();

  return (
    <section>
      <Heading
        isPageHeading
        Icon={Heart}
      >
        Subscriptions
      </Heading>
      <div className='grid-6-cols'>
        {isLoading ? (
          <SkeletonLoader
            count={6}
            className='h-45 rounded-md'
          />
        ) : profile?.subscribedVideos?.length ? (
          profile?.subscribedVideos?.map((video) => (
            <VideoItem
              key={video.id}
              video={video}
            />
          ))
        ) : (
          <p>Subscriptions results</p>
        )}
      </div>
    </section>
  );
}
