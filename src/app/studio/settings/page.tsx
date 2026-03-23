import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Settings',
  ...NO_INDEX_PAGE, // { robots: { index: false, follow: false } }
};

export default function SettingsPage() {
  return <div>Settings</div>;
}
