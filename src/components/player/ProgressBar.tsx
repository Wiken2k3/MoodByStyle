'use client';

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';

export function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
  } = usePlayerStore();

  // Không có track → không render
  if (!currentTrack) return null;

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-30
        border-t
        border-white/10
        bg-background-secondary
        px-6
        py-3
      "
    >
      <div className="flex items-center justify-between">
        {/* =====================
            LEFT: TRACK INFO
        ===================== */}
        <div className="flex w-[30%] items-center gap-4">
          <div className="h-14 w-14 rounded bg-neutral-800" />
          <div>
            <p className="text-sm font-medium text-white">
              {currentTrack.title}
            </p>
            <p className="text-xs text-text-muted">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* =====================
            CENTER: CONTROLS
        ===================== */}
        <div className="flex w-[40%] flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <ControlButton>
              <SkipBack size={18} />
            </ControlButton>

            <button
              onClick={togglePlay}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white
                text-black
                transition
                hover:scale-105
                active:scale-95
              "
            >
              {isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} fill="black" />
              )}
            </button>

            <ControlButton>
              <SkipForward size={18} />
            </ControlButton>
          </div>

          {/* Progress (UI only) */}
          <div className="flex w-full items-center gap-2">
            <span className="text-xs text-text-muted">
              0:00
            </span>
            <div className="relative h-1 flex-1 rounded bg-white/20 group cursor-pointer">
              <div className="h-full w-[30%] rounded bg-white transition group-hover:bg-brand-primary-500" />
            </div>
            <span className="text-xs text-text-muted">
              {currentTrack.duration}
            </span>
          </div>
        </div>

        {/* =====================
            RIGHT: VOLUME
        ===================== */}
        <div className="flex w-[30%] items-center justify-end gap-3">
          <Volume2 size={18} />
          <div className="h-1 w-24 rounded bg-white/20">
            <div className="h-full w-[60%] rounded bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      className="
        text-text-muted
        transition
        hover:text-white
      "
    >
      {children}
    </button>
  );
}
