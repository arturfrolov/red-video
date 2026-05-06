import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { SinglePlaylist } from '@/app/my/playlists/[id]/SinglePlaylist';

export const metadata: Metadata = {
  title: 'Playlist',
  ...NO_INDEX_PAGE, // { robots: { index: false, follow: false } }
};

export default function Page() {
  return <SinglePlaylist />;
}
