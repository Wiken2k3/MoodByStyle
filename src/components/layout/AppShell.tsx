'use client';

import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { PlayerBar } from './PlayerBar';
import { RightSidebar } from './RightSidebar';
import { MobileNav } from './MobileNav';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // 'queue' | 'lyrics' | null
  const [rightSidebarView, setRightSidebarView] = useState<string | null>(null);
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  const handleToggleSidebar = (view: string) => {
    if (rightSidebarView === view) {
      setRightSidebarView(null); // Close if clicking same view
    } else {
      setRightSidebarView(view); // Switch view
    }
  };

  return (
    <div suppressHydrationWarning className="flex h-dvh w-screen flex-col bg-black overflow-hidden">
      {/* Main layout */}
      <div suppressHydrationWarning className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile, visible from md */}
        {!isAuthPage && (
          <div suppressHydrationWarning className="hidden md:flex md:shrink-0">
            <Sidebar />
          </div>
        )}

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden w-full">
          {/* TopBar (sticky) */}
          {!isAuthPage && (
            <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-neutral-800/50">
              <TopBar />
            </div>
          )}

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
            <div className={!isAuthPage ? "w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10" : "min-h-screen w-full bg-black"}>
              {children}
            </div>
          </main>
        </div>

        {/* Right Sidebar - Queue */}
        {!isAuthPage && rightSidebarView && (
          <div className="hidden xl:flex xl:shrink-0 transition-all duration-300">
            <RightSidebar view={rightSidebarView} />
          </div>
        )}
      </div>

      {!isAuthPage && <MobileNav />}

      {/* Player bar - Fixed at bottom */}
      {!isAuthPage && (
        <div className="shrink-0 border-t border-neutral-800/50 bg-black/95 backdrop-blur-md">
          <PlayerBar 
            activeView={rightSidebarView}
            onToggleView={handleToggleSidebar} 
          />
        </div>
      )}
    </div>
  );
}
