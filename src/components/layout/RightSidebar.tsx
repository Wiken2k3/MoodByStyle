'use client';

import { QueuePanel } from '@/components/QueuePanel';
import { LyricsPanel } from '@/components/LyricsPanel';

export function RightSidebar({ view = 'queue' }: { view?: string }) {
  return (
    <div suppressHydrationWarning className="flex h-full flex-col bg-black/80 backdrop-blur-md border-l border-neutral-800/50 w-[240px] sm:w-[360px]">
      {view === 'queue' && <QueuePanel />}
      {view === 'lyrics' && <LyricsPanel />}
    </div>
  );}