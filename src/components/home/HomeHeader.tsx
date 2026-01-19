'use client';

import { Play } from 'lucide-react';

export function HomeHeader() {
  return (
    <header
      className="
        sticky
        top-0
        z-10
        -mx-10
        px-10
        pb-8
        pt-6
        bg-gradient-to-b
        from-emerald-900/80
        to-background-primary
        backdrop-blur
      "
    >
      <div className="flex flex-col gap-6">
        {/* Greeting */}
        <h1 className="text-3xl font-bold text-white">
          Good evening
        </h1>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <button
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-brand-primary-500
              px-6
              py-3
              text-sm
              font-semibold
              text-black
              hover:scale-105
              transition
            "
          >
            <Play size={18} fill="black" />
            Play
          </button>

          <button
            className="
              rounded-full
              border
              border-white/20
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              hover:border-white
              transition
            "
          >
            Follow
          </button>
        </div>
      </div>
    </header>
  );
}
