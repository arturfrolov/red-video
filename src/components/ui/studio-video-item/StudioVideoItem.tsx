import dayjs from 'dayjs';
import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';

import { StudioActions } from '@/ui/studio-video-item/StudioActions';

import { PAGE } from '@/config/public-page.config';
import { STUDIO_PAGE } from '@/config/studio-page.config';

import { processHtmlContent } from '@/utils/process-html-content';

import type { IFullVideo } from '@/types/video.types';

interface Props {
  video: IFullVideo;
}

export function StudioVideoItem({ video }: Props) {
  const { initialContent } = processHtmlContent(video.description, 1);

  return (
    <div
      className='mb-6 grid grid-cols-[0.49fr_1.1fr_0.3fr_0.3fr_0.3fr_0.2fr_0.5fr] gap-6 border-b
        border-b-border pb-6 last:border-none'
    >
      <Link
        href={PAGE.VIDEO(video.publicId)}
        target='_blank'
        className='relative block aspect-video shrink-0 overflow-hidden rounded-md'
      >
        <Image
          src={video.thumbnailUrl}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw'
          alt={video.title}
          className='object-cover'
        />
      </Link>

      <div>
        <Link
          href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
          className='mb-1 line-clamp-1 text-lg'
        >
          {video.title}
        </Link>
        <div className='opacity-50'>{parse(initialContent)}</div>
      </div>

      <div>
        <div className='text-gray-400'>{dayjs(video.createdAt).format('DD MMM YYYY')}</div>
        <div className='text-gray-600'>Published</div>
      </div>

      <div>
        <div className='text-gray-400'>{video.viewsCount.toLocaleString('en-US')} views</div>
      </div>

      <div>
        <div className='text-gray-400'>
          {video.comments.length.toLocaleString('en-US')} comments
        </div>
      </div>

      <div>
        <div className='text-gray-400'>{video.likes.length.toLocaleString('en-US')} likes</div>
      </div>

      <StudioActions video={video} />
    </div>
  );
}
