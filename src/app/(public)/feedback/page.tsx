import { MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

import { Heading } from '@/ui/heading/Heading';

import { PAGE } from '@/config/public-page.config';

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Send feedback to Red Video',
  alternates: {
    canonical: PAGE.FEEDBACK,
  },
};

export default function FeedbackPage() {
  return (
    <section className='max-w-2xl'>
      <Heading
        isPageHeading
        Icon={MessageSquare}
      >
        Feedback
      </Heading>
      <p className='text-gray-400'>
        Feedback form is temporarily unavailable. Please check back later.
      </p>
    </section>
  );
}
