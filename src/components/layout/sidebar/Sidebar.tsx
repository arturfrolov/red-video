'use client';

import cn from 'clsx';
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
  closeMobileSidebar,
  isShowedSidebar,
  isMobileSidebarOpen,
}: {
  toggleSidebar: () => void;
  closeMobileSidebar: () => void;
  isShowedSidebar: boolean;
  isMobileSidebarOpen: boolean;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        `fixed inset-y-0 left-0 z-50 flex h-dvh w-64 flex-col overflow-y-auto border-r border-border
        bg-bg p-layout whitespace-nowrap transition-[transform,width] duration-300 lg:sticky
        lg:top-0 lg:z-auto lg:h-screen lg:shrink-0 lg:translate-x-0`,
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        isShowedSidebar ? 'lg:w-(--sidebar-width)' : 'lg:w-16 lg:px-4'
      )}
    >
      <SidebarHeader
        toggleSidebar={toggleSidebar}
        closeMobileSidebar={closeMobileSidebar}
        isShowedSidebar={isShowedSidebar}
      />

      <SidebarMenu
        menu={SIDEBAR_DATA}
        isShowedSidebar={isShowedSidebar}
        onItemClick={closeMobileSidebar}
      />

      {pathname.includes(STUDIO_PAGE.HOME) && (
        <>
          <SidebarMenu
            title='Studio'
            menu={STUDIO_SIDEBAR_DATA}
            isShowedSidebar={isShowedSidebar}
            onItemClick={closeMobileSidebar}
          />
          <span className='my-5 block h-px w-full bg-border'></span>
        </>
      )}

      <SidebarMenu
        title='More from Red Video'
        menu={MORE_SIDEBAR_DATA}
        isShowedSidebar={isShowedSidebar}
        onItemClick={closeMobileSidebar}
      />

      <DynamicLogout
        isShowedSidebar={isShowedSidebar}
        onItemClick={closeMobileSidebar}
      />
    </aside>
  );
}
