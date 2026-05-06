import { type LucideIcon } from 'lucide-react';
import * as m from 'motion/react-m';
import Image from 'next/image';
import Link from 'next/link';

import { VideoChannelName } from '@/ui/video-item/VideoChannelName';
import { VideoItemTitle } from '@/ui/video-item/VideoItemTitle';

import { PAGE } from '@/config/public-page.config';

import { transformCount } from '@/utils/transform-count';
import { transformDate } from '@/utils/transform-date';

import type { IVideo } from '@/types/video.types';

interface Props {
  video: IVideo;
  Icon?: LucideIcon;
  isImagePriority?: boolean;
}

export function VideoItem({ video, Icon, isImagePriority }: Props) {
  return (
    <m.div
      style={{ willChange: 'transform' }}
      whileHover={{
        y: -5,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      <div className='relative mb-1.5'>
        <Link
          href={PAGE.VIDEO(video.publicId)}
          className='relative block aspect-video overflow-hidden rounded-md'
        >
          <Image
            src={video.thumbnailUrl}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw'
            alt={video.title}
            className='object-cover'
            priority={isImagePriority}
          />
        </Link>
        <Link
          href={PAGE.CHANNEL(video.channel.slug)}
          className='absolute bottom-2 left-1.5'
        >
          <Image
            src={video.channel.avatarUrl}
            width={35}
            height={35}
            alt={video.channel.user.name ? video.channel.user.name : 'Channel avatar'}
            className='rounded-full shadow'
            priority={isImagePriority}
          />
        </Link>
      </div>
      <div className='mb-1.5 flex items-center justify-between'>
        <div className='flex items-center gap-0.5'>
          {Icon && (
            <Icon
              size={20}
              className='text-red-600'
            />
          )}
          <span className='text-sm text-gray-400'>{transformCount(video.viewsCount)} views</span>
        </div>
        <div>
          <span className='text-xs text-gray-400'>{transformDate(video.createdAt)}</span>
        </div>
      </div>
      <div className='mb-1'>
        <VideoItemTitle video={video} />
      </div>
      <div>
        <VideoChannelName channel={video.channel} />
      </div>
    </m.div>
  );
}
