import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { LikedVideosPage } from '@/app/(user)/liked-videos/LikedVideosPage';

export const metadata: Metadata = {
  title: 'Liked videos',
  ...NO_INDEX_PAGE, // { robots: { index: false, follow: false } }
};

export default function Page() {
  return <LikedVideosPage />;
}
