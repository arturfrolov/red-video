import { Flame } from 'lucide-react';
import type { Metadata } from 'next';

import { Heading } from '@/ui/heading/Heading';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { PAGE } from '@/config/public-page.config';

import { videoService } from '@/services/video.service';

export const revalidate = 100;

export const metadata: Metadata = {
  title: 'Trending',
  description: 'Trending videos',
  alternates: {
    canonical: PAGE.TRENDING,
  },
  openGraph: {
    type: 'website',
    url: PAGE.TRENDING,
    title: 'Trending',
  },
};

export default async function TrendingPage() {
  const data = await videoService.getTrendingVideos();

  return (
    <section>
      <Heading Icon={Flame}>Trending</Heading>
      <div className='grid-6-cols'>
        {data?.data.length ? (
          data?.data.map((video) => (
            <VideoItem
              key={video.id}
              video={video}
              Icon={Flame}
            />
          ))
        ) : (
          <p>Trends are temporarily unavailable</p>
        )}
      </div>
    </section>
  );
}
