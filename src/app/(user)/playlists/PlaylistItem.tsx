import * as m from 'motion/react-m';
import Image from 'next/image';
import Link from 'next/link';

import { PAGE } from '@/config/public-page.config';

import type { IPlaylist } from '@/types/playlist.types';

interface Props {
  playlist: IPlaylist;
}

export function PlaylistItem({ playlist }: Props) {
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
      <div className='mb-6'>
        <Link
          href={PAGE.PLAYLISTS(playlist.id)}
          className='relative block aspect-video shrink-0'
        >
          <div
            className='shadoe-lg absolute -top-3 left-[8.5%] h-full w-10/12 rounded-lg bg-[#666876]'
          />
          <div
            className='shadoe-lg absolute -top-1.5 left-[4.2%] h-full w-11/12 rounded-lg
              bg-[#9294a1]'
          />
          {!!playlist.videos[0]?.thumbnailUrl ? (
            <Image
              src={playlist.videos[0]?.thumbnailUrl || ''}
              fill
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw'
              className='rounded-lg object-cover'
              alt={playlist.title}
            />
          ) : (
            <div className='relative block aspect-video shrink-0 rounded-lg bg-gray-500 shadow-lg' />
          )}

          <div
            className='shadoe-lg absolute right-1.5 bottom-1.5 rounded bg-black/40 px-1.5 py-0.5
              text-xs font-medium'
          >
            {playlist.videos.length} videos
          </div>
        </Link>

        <div className='mt-2 font-medium'>
          <Link
            href={PAGE.PLAYLISTS(playlist.id)}
            className='line-clamp-2 leading-[1.3]'
          >
            {playlist.title}
          </Link>
        </div>
      </div>
    </m.div>
  );
}
