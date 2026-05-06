'use client';
import { Heart } from 'lucide-react';

import { Heading } from '@/ui/heading/Heading';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { HorizontalVideoItem } from '@/ui/video-item/HorizontalVideoItem';

import { useProfile } from '@/hooks/useProfile';

export function LikedVideosPage() {
  const { profile, isLoading } = useProfile();

  return (
    <section className='w-1/2'>
      <div className='mb-10 flex items-center gap-8'>
        <Heading
          isPageHeading
          Icon={Heart}
          className='mb-0'
        >
          Liked videos
        </Heading>
        {!!profile?.likes.length && <span>{profile?.likes.length} videos</span>}
      </div>
      <div>
        {isLoading ? (
          <SkeletonLoader
            count={3}
            className='mb-6 h-28 rounded-md'
          />
        ) : profile?.likes?.length ? (
          profile?.likes?.map((like) => (
            <HorizontalVideoItem
              key={like.id}
              video={like.video}
            />
          ))
        ) : (
          <p>Liked videos not found</p>
        )}
      </div>
    </section>
  );
}
