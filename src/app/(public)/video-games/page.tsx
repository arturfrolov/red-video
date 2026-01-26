import { Flame, Gamepad2 } from 'lucide-react';
import type { Metadata } from 'next';

import { Heading } from '@/ui/heading/Heading';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { PAGE } from '@/config/public-page.cofig';

import { videoService } from '@/services/video.service';

export const revalidate = 100;

export const metadata: Metadata = {
  title: 'Video games',
  description: 'Best video games',
  alternates: {
    canonical: PAGE.VIDEO_GAMES,
  },
  openGraph: {
    type: 'website',
    url: PAGE.VIDEO_GAMES,
    title: 'Video games',
  },
};

export default async function VideoGamesPage() {
  const data = await videoService.getVideoGames();

  return (
    <section>
      <Heading Icon={Gamepad2}>Video games</Heading>
      <div className='grid-6-cols'>
        {data?.length ? (
          data.map((video) => (
            <VideoItem
              key={video.id}
              video={video}
            />
          ))
        ) : (
          <p>Video games are temporarily unavailable</p>
        )}
      </div>
    </section>
  );
}
