import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { UploadVideoForm } from '@/app/studio/upload/UploadVideoForm';

export const metadata: Metadata = {
  title: 'Upload video',
  ...NO_INDEX_PAGE, // { robots: { index: false, follow: false } }
};

export default function UploadVideoPage() {
  return <UploadVideoForm />;
}
