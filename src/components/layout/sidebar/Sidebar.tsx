'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import { SidebarHeader } from '@/components/layout/sidebar/header/SidebarHeader';
import { SidebarMenu } from '@/components/layout/sidebar/menus/SidebarMenu';
import {
  MORE_SIDEBAR_DATA,
  SIDEBAR_DATA,
  STUDIO_SIDEBAR_DATA,
} from '@/components/layout/sidebar/sidebar.data';

import { STUDIO_PAGE } from '@/config/studio-page.config';

const DynamicLogout = dynamic(
  () => import('@/components/layout/sidebar/Logout').then((mod) => mod.Logout),
  { ssr: false }
);

export function Sidebar({
  toggleSidebar,
  isShowedSidebar,
}: {
  toggleSidebar: () => void;
  isShowedSidebar: boolean;
}) {
  const pathname = usePathname();

  return (
    <aside className='overflow-hidden border-r border-border p-layout whitespace-nowrap'>
      <SidebarHeader toggleSidebar={toggleSidebar} />

      <SidebarMenu
        menu={SIDEBAR_DATA}
        isShowedSidebar={isShowedSidebar}
      />

      {pathname.includes(STUDIO_PAGE.HOME) && (
        <>
          <SidebarMenu
            title='Studio'
            menu={STUDIO_SIDEBAR_DATA}
            isShowedSidebar={isShowedSidebar}
          />
          <span className='my-5 block h-px w-full bg-border'></span>
        </>
      )}

      <SidebarMenu
        title='More from Red Video'
        menu={MORE_SIDEBAR_DATA}
        isShowedSidebar={isShowedSidebar}
      />

      <DynamicLogout />
    </aside>
  );
}
