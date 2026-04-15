'use client';

import cn from 'clsx';
import { useState } from 'react';

import { Heading } from '@/ui/heading/Heading';
import { VideoPlayer } from '@/ui/video-player/VideoPlayer';

import { SimilarVideos } from '@/app/(public)/v/[publicId]/SimilarVideos';
import { VideoDescription } from '@/app/(public)/v/[publicId]/description/VideoDescription';
import { VideoActions } from '@/app/(public)/v/[publicId]/video-actions/VideoActions';
import { VideoChannel } from '@/app/(public)/v/[publicId]/video-channel/VideoChannel';
import type { ISingleVideoResponse } from '@/types/video.types';

interface Props {
  video: ISingleVideoResponse;
}

export function SingleVideo({ video }: Props) {
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  return (
    <section className='relative grid grid-cols-[3fr_.8fr] gap-20'>
      <div>
        <div className={cn(isTheaterMode ? 'absolute top-0 left-0 w-full' : 'relative')}>
          <VideoPlayer
            fileName={video.videoFileName}
            toggleTheaterMode={() => {
              setIsTheaterMode(!isTheaterMode);
            }}
          />
        </div>

        <div
          className={cn('mb-6 flex items-start justify-between border-b border-border pb-6', {
            'pt-222': isTheaterMode,
          })}
        >
          <div>
            <Heading
              classNameHeading='text-xl'
              className='mb-1 leading-none'
            >
              {video.title}
            </Heading>
            <div className='text-gray-400'>{video.viewsCount.toLocaleString('en-US')} views</div>
          </div>
          <VideoActions video={video} />
        </div>
        <VideoChannel video={video} />
        <VideoDescription description={video.description} />
      </div>

      {!!video.similarVideos.length && (
        <div className={cn({ 'pt-222': isTheaterMode })}>
          <SimilarVideos videos={video.similarVideos} />
        </div>
      )}
    </section>
  );
}
