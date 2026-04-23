import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { HistoryPage } from '@/app/(user)/history/HistoryPage';

export const metadata: Metadata = {
  title: 'History',
  ...NO_INDEX_PAGE, // { robots: { index: false, follow: false } }
};

export default function Page() {
  return <HistoryPage />;
}
