import { Menu } from 'lucide-react';

import { Logo } from '@/components/layout/sidebar/header/Logo';

export function SidebarHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <div className='flex items-center gap-6 mb-12'>
      <button
        className='opacity-85 hover:opacity-100 transition-opacity cursor-pointer'
        onClick={toggleSidebar}
      >
        <Menu />
      </button>
      <Logo />
    </div>
  );
}
