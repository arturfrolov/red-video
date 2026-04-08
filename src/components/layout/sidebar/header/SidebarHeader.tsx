import { Menu } from 'lucide-react';

import { Logo } from '@/components/layout/sidebar/header/Logo';

export function SidebarHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <div className='mb-12 flex items-center gap-6'>
      <button
        className='cursor-pointer opacity-85 transition-opacity hover:opacity-100'
        onClick={toggleSidebar}
        title='Toggle sidebar'
      >
        <Menu />
      </button>
      <Logo />
    </div>
  );
}
