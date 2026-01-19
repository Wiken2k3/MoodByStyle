import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Player } from './Player';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="h-screen grid grid-rows-[1fr_auto] bg-background-primary">
      {/* Top area */}
      <div className="grid grid-cols-[280px_1fr] overflow-hidden">
        <Sidebar />

        <main className="overflow-y-auto bg-background-secondary p-6">
          {children}
        </main>
      </div>

      {/* Bottom Player */}
      <Player />
    </div>
  );
}
