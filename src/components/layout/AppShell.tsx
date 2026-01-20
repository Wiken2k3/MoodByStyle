'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { PlayerBar } from './PlayerBar';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthPage) {
    return <main className="min-h-screen w-full bg-black">{children}</main>;
  }

  return (
    <div className="flex h-dvh w-screen flex-col bg-black overflow-hidden">
      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile, visible from md */}
        <div className="hidden md:flex md:flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden w-full">
          {/* TopBar (sticky) */}
          <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-neutral-800/50">
            <TopBar />
          </div>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
            <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Player bar - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-neutral-800/50 bg-black/95 backdrop-blur-md">
        <PlayerBar />
      </div>
    </div>
  );
}
