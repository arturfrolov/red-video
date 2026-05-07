import { Bell, LayoutGrid, PlusSquare } from 'lucide-react';
import Link from 'next/link';

import { STUDIO_PAGE } from '@/config/studio-page.config';

export function HeaderLinks() {
  return (
    <div className='flex items-center gap-2'>
      <Link
        href={STUDIO_PAGE.UPLOAD_VIDEO}
        className='p-1.5 opacity-50 transition-opacity hover:opacity-100'
        aria-label='Upload video'
      >
        <PlusSquare size={20} />
      </Link>
      <Link
        href={STUDIO_PAGE.HOME}
        className='p-1.5 opacity-50 transition-opacity hover:opacity-100'
        aria-label='Studio'
      >
        <LayoutGrid size={20} />
      </Link>
      <Link
        href={STUDIO_PAGE.HOME}
        className='p-1.5 opacity-50 transition-opacity hover:opacity-100'
        aria-label='Notifications'
      >
        <Bell size={20} />
      </Link>
    </div>
  );
}
