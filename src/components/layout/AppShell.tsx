import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { PlayerBar } from './PlayerBar';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col bg-black">
      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden gap-2 p-2">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg bg-background-primary">
          {/* TopBar (sticky) */}
          <div className="sticky top-0 z-30 bg-background-primary/80 backdrop-blur">
            <TopBar />
          </div>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto px-10 py-8 pb-24">
            {children}
          </main>
        </div>
      </div>

      {/* Player bar */}
      <PlayerBar />
    </div>
  );
}
