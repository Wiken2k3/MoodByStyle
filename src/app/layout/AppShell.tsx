import { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { PlayerBar } from '@/components/layout/PlayerBar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { MobileNav } from '@/components/layout/MobileNav';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col bg-gradient-to-br from-neutral-950 via-black to-neutral-950 overflow-hidden">
      {/* Top Navigation Bar - Sticky with Backdrop */}
      <div className="sticky top-0 z-30 border-b border-neutral-800/50 bg-black/40 backdrop-blur-xl shadow-lg shadow-black/50">
        <TopBar />
      </div>

      {/* Main Layout Container - 3 Columns (Hidden on mobile) with Smooth Scrolling */}
      <div className="flex flex-1 overflow-hidden gap-0">
        {/* Left Sidebar - Fixed (Hidden on mobile) with Glass Effect */}
        <div className="hidden md:flex md:w-[240px] lg:w-[280px] flex-shrink-0 border-r border-neutral-800/50 bg-black/80 backdrop-blur-md">
          <Sidebar />
        </div>

        {/* Main Content - Flexible with Gradient Background */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-neutral-950/50 via-black to-black scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent hover:scrollbar-thumb-neutral-700 pb-24 sm:pb-24">
          <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            {children}
          </div>
        </main>

        {/* Right Sidebar - Fixed (Hidden on mobile) (Queue/Now Playing) with Glass Effect */}
        <div className="hidden lg:flex lg:w-[240px] xl:w-[360px] flex-shrink-0 border-l border-neutral-800/50 bg-black/80 backdrop-blur-md">
          <RightSidebar />
        </div>
      </div>

      {/* Mobile Navigation - Only on mobile */}
      <MobileNav />

      {/* Player Bar - Fixed Bottom with Backdrop */}
      <div className="border-t border-neutral-800/50 bg-black/60 backdrop-blur-xl">
        <PlayerBar />
      </div>
    </div>
  );
}