import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { PlaylistsPage } from '@/app/(user)/playlists/PlaylistsPage';

export const metadata: Metadata = {
  title: 'Playlists',
  ...NO_INDEX_PAGE, // { robots: { index: false, follow: false } }
};

export default function Page() {
  return <PlaylistsPage />;
}
