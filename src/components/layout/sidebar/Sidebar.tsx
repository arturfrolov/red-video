import { SidebarHeader } from '@/components/layout/sidebar/header/SidebarHeader';
import { SidebarMenu } from '@/components/layout/sidebar/menus/SidebarMenu';
import { SidebarSubscriptions } from '@/components/layout/sidebar/menus/subscriptions/SidebarSubscriptions';
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA } from '@/components/layout/sidebar/sidebar.data';

export function Sidebar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <aside className='p-layout border-r border-border whitespace-nowrap overflow-hidden'>
      <SidebarHeader toggleSidebar={toggleSidebar} />
      <SidebarMenu menu={SIDEBAR_DATA} />
      <SidebarSubscriptions />
      <SidebarMenu
        title='More from Red Video'
        menu={MORE_SIDEBAR_DATA}
      />
    </aside>
  );
}
