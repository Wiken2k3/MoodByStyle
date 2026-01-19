'use client';

import { useState } from 'react';
import { ProgressBar } from '@/components/player/ProgressBar';

export function Player() {
  const [current, setCurrent] = useState(42);
  const duration = 192;

  return (
    <div className="h-20 bg-background-tertiary border-t border-neutral-800 px-10">
      <div className="grid h-full grid-cols-[1fr_2fr_1fr] items-center gap-10">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-neutral-700" />
          <div>
            <p className="text-sm font-semibold text-text-heading">
              Song Title
            </p>
            <p className="text-xs text-text-muted">
              Artist Name
            </p>
          </div>
        </div>

        {/* Center */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <button>⏮️</button>
            <button className="rounded-full bg-white px-4 py-2 text-black hover:scale-105 transition">
              ▶️
            </button>
            <button>⏭️</button>
          </div>

          <ProgressBar
            current={current}
            duration={duration}
            onSeek={(v) => setCurrent(v)}
          />
        </div>

        {/* Right */}
        <div className="text-right text-xs text-text-muted">
          Volume
        </div>
      </div>
    </div>
  );
}
