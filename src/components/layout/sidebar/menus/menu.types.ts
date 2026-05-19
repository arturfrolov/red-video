import type { ISidebarItem } from '@/components/layout/sidebar/sidebar.types';

export interface IMenuItemProps {
  item: ISidebarItem;
  isActive: boolean;
  isShowedSidebar: boolean;
  onItemClick?: () => void;
}
