'use client';
import cn from 'clsx';
import { type PropsWithChildren, useEffect, useState } from 'react';

import { Content } from '@/components/layout/content/Content';
import { Sidebar } from '@/components/layout/sidebar/Sidebar';

import { authService } from '@/services/auth.service';

export function Layout({ children }: PropsWithChildren<unknown>) {
  const [isShowedSidebar, setIsShowedSidebar] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsShowedSidebar((isShowed) => !isShowed);
  const openMobileSidebar = () => setIsMobileSidebarOpen(true);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  useEffect(() => {
    authService.initializeAuth();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileSidebarOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileSidebarOpen]);

  return (
    <main className='min-h-screen overflow-x-hidden lg:flex'>
      <button
        type='button'
        className={cn(
          'fixed inset-0 z-40 bg-black/60 opacity-0 transition-opacity lg:hidden',
          isMobileSidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none'
        )}
        aria-label='Close sidebar'
        onClick={closeMobileSidebar}
      />
      <Sidebar
        toggleSidebar={toggleSidebar}
        closeMobileSidebar={closeMobileSidebar}
        isShowedSidebar={isShowedSidebar}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />
      <Content openMobileSidebar={openMobileSidebar}>{children}</Content>
    </main>
  );
}
