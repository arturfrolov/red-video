import type { Metadata } from 'next';

import { Heading } from '@/ui/heading/Heading';
import { VideoPlayer } from '@/ui/video-player/VideoPlayer';

import { stripHtml } from '@/utils/strip-html';

import { SimilarVideos } from '@/app/(public)/v/[publicId]/SimilarVideos';
import { VideoDescription } from '@/app/(public)/v/[publicId]/description/VideoDescription';
import { VideoActions } from '@/app/(public)/v/[publicId]/video-actions/VideoActions';
import { VideoChannel } from '@/app/(public)/v/[publicId]/video-channel/VideoChannel';
import { videoService } from '@/services/video.service';
import type { TPagePublicIdProp } from '@/types/page.types';

export const revalidate = 100;

export async function generateMetadata({ params }: TPagePublicIdProp): Promise<Metadata> {
  const { publicId } = await params;
  const data = await videoService.byPublicId(publicId);
  const video = data.data;

  return {
    title: video.title,
    description: stripHtml(video.description).slice(0, 150),
    openGraph: {
      type: 'video.other',
      images: [video.thumbnailUrl],
    },
  };
}

export async function generateStaticParams() {
  const data = await videoService.getAll();
  return data.data.videos.map((video) => ({
    publicId: video.publicId,
  }));
}

export default async function VideoPage({ params }: TPagePublicIdProp) {
  const { publicId } = await params;
  const data = await videoService.byPublicId(publicId);
  const video = data.data;

  return (
    <section className='grid grid-cols-[3fr_.8fr] gap-20'>
      <div>
        <div className='relative mb-6 w-full overflow-hidden rounded-2xl shadow-md'>
          <VideoPlayer fileName={video.videoFileName} />
        </div>
        <div className='mb-6 flex items-start justify-between border-b border-border pb-6'>
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
      {!!video.similarVideos.length && <SimilarVideos videos={video.similarVideos} />}
    </section>
  );
}
