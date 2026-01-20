'use client';

import { QueuePanel } from '@/components/player/QueuePanel';

export function RightSidebar() {
  return (
    <div className="flex h-full flex-col bg-black/80 backdrop-blur-md border-l border-neutral-800/50 w-[240px] sm:w-[360px]">
      <QueuePanel />
    </div>
  );}