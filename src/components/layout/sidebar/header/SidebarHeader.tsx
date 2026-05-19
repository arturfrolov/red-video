import cn from 'clsx';
import { Menu, X } from 'lucide-react';

import { Logo } from '@/components/layout/sidebar/header/Logo';

interface Props {
  toggleSidebar: () => void;
  closeMobileSidebar: () => void;
  isShowedSidebar: boolean;
}

export function SidebarHeader({ toggleSidebar, closeMobileSidebar, isShowedSidebar }: Props) {
  return (
    <div className='mb-8 flex items-center gap-4 lg:mb-12'>
      <button
        type='button'
        className='hidden cursor-pointer opacity-85 transition-opacity hover:opacity-100 lg:inline-flex'
        onClick={toggleSidebar}
        title='Toggle sidebar'
        aria-label='Toggle sidebar'
      >
        <Menu />
      </button>
      <button
        type='button'
        className='inline-flex cursor-pointer opacity-85 transition-opacity hover:opacity-100 lg:hidden'
        onClick={closeMobileSidebar}
        title='Close sidebar'
        aria-label='Close sidebar'
      >
        <X />
      </button>
      <div className={cn('min-w-0', !isShowedSidebar && 'lg:hidden')}>
        <Logo />
      </div>
    </div>
  );
}
