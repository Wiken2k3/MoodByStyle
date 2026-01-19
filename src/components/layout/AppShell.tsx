import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Player } from './Player';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="grid h-screen grid-rows-[1fr_auto] bg-background-primary">
      {/* Top */}
      <div className="grid grid-cols-[280px_1fr] overflow-hidden">
        <Sidebar />

        <main className="overflow-y-auto bg-background-secondary p-10">
          {children}
        </main>
      </div>

      {/* Bottom */}
      <Player />
    </div>
  );
}
