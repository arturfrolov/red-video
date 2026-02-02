import { BadgeCheck, type LucideIcon } from 'lucide-react';
import * as m from 'motion/react-m';
import Image from 'next/image';
import Link from 'next/link';

import { PAGE } from '@/config/public-page.cofig';

import { transformDate } from '@/utils/transform-date';
import { transformViews } from '@/utils/transform-views';

import type { IVideo } from '@/types/video.types';

interface Props {
  video: IVideo;
  Icon?: LucideIcon;
}

export function VideoItem({ video, Icon }: Props) {
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
          href={PAGE.VIDEO(video.id)}
          className='block relative aspect-video overflow-hidden rounded-md'
        >
          <Image
            src={video.thumbnailUrl}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw'
            alt={video.title}
            className='object-cover'
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
            alt={video.channel.user.name}
            className='rounded-full shadow'
          />
        </Link>
      </div>
      <div className='flex justify-between items-center mb-1.5'>
        <div className='flex items-center gap-0.5'>
          {Icon && (
            <Icon
              size={20}
              className='text-red-600'
            />
          )}
          <span className='text-gray-400 text-sm'>{transformViews(video.viewsCount)}</span>
        </div>
        <div>
          <span className='text-gray-400 text-xs'>{transformDate(video.createdAt)}</span>
        </div>
      </div>
      <div className='mb-1'>
        <Link
          href={PAGE.VIDEO(video.id)}
          className='line-clamp-2 leading-[1.3]'
        >
          {video.title}
        </Link>
      </div>
      <div>
        <Link
          href={PAGE.CHANNEL(video.channel.slug)}
          className='flex items-center gap-1'
        >
          <span className='text-gray-400 text-sm'>{video.channel.user.name}</span>
          {video.channel.isVerified && (
            <span>
              <BadgeCheck
                className='text-green-500'
                size={15}
              />
            </span>
          )}
        </Link>
      </div>
    </m.div>
  );
}
