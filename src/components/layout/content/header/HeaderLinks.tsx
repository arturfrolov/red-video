import { Bell, LayoutGrid, PlusSquare } from 'lucide-react';
import Link from 'next/link';

import { STUDIO_PAGE } from '@/config/studio-page.cofig';

export function HeaderLinks() {
  return (
    <div className='flex items-center gap-5'>
      <Link
        href={STUDIO_PAGE.UPLOAD_VIDEO}
        className='opacity-50 transition-opacity hover:opacity-100 '
      >
        <PlusSquare size={20} />
      </Link>
      <Link
        href={STUDIO_PAGE.HOME}
        className='opacity-50 transition-opacity hover:opacity-100 '
      >
        <LayoutGrid size={20} />
      </Link>
      <Link
        href={STUDIO_PAGE.HOME}
        className='opacity-50 transition-opacity hover:opacity-100 '
      >
        <Bell size={20} />
      </Link>
    </div>
  );
}
