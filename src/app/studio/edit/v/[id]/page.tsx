import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { EditVideoForm } from '@/app/studio/edit/v/[id]/EditVideoForm';

export const metadata: Metadata = {
  title: 'Edit video',
  ...NO_INDEX_PAGE, // { robots: { index: false, follow: false } }
};

export default function EditVideoPage() {
  return <EditVideoForm />;
}
