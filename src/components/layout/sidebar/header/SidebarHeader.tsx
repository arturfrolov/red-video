import { Menu, SquarePlay } from 'lucide-react';
import Link from 'next/link';

import { PAGE } from '@/config/public-page.cofig';

export function SidebarHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <div className='flex items-center gap-6 mb-12'>
      <button
        className='opacity-85 hover:opacity-100 transition-opacity cursor-pointer'
        onClick={toggleSidebar}
      >
        <Menu />
      </button>
      <Link
        href={PAGE.HOME}
        className='flex items-center gap-1.5'
      >
        <SquarePlay
          className='text-primary'
          size={29}
        />
        <span className='font-medium text-xl'>RED video</span>
      </Link>
    </div>
  );
}
