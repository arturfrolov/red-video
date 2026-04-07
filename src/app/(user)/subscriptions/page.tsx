import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { SubscriptionsPage } from '@/app/(user)/subscriptions/SubscriptionsPage';

export const metadata: Metadata = {
  title: 'Subscriptions',
  ...NO_INDEX_PAGE, // { robots: { index: false, follow: false } }
};

export default function SubsPage() {
  return <SubscriptionsPage />;
}
