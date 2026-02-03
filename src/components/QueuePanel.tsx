'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';

export function QueuePanel() {
  const { currentTrack, queue, playTrack, isPlaying, togglePlay } = usePlayerStore();

  if (!currentTrack) return (
    <div className="flex h-full items-center justify-center p-6 text-neutral-400">
      <p>Queue is empty</p>
    </div>
  );

  return (
    <div className="flex h-full flex-col p-4 overflow-y-auto scrollbar-hide bg-black/50">
      <h2 className="text-lg font-bold text-white mb-4">Queue</h2>

      {/* Now Playing */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-neutral-400 mb-2">Now Playing</h3>
        <div className="group flex items-center gap-3 rounded-md p-2 hover:bg-white/10 transition-colors">
          <div className="relative h-10 w-10 shrink-0 rounded overflow-hidden">
             <Image 
              src={currentTrack.imageUrl || '/images/music-placeholder.png'} 
              alt={currentTrack.title} 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
               <button onClick={togglePlay}>
                 {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" />}
               </button>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-500 truncate">{currentTrack.title}</p>
            <p className="text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>
      </div>

      {/* Next Up */}
      <div>
        <h3 className="text-sm font-bold text-neutral-400 mb-2">Next Up</h3>
        <div className="flex flex-col gap-1">
          {queue.length > 0 ? (
            queue.map((track, i) => (
              <div 
                key={`${track.id}-${i}`}
                className="group flex items-center gap-3 rounded-md p-2 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => playTrack(track)}
              >
                <div className="relative h-10 w-10 shrink-0 rounded overflow-hidden">
                  <Image 
                    src={track.imageUrl || '/images/music-placeholder.png'} 
                    alt={track.title} 
                    fill 
                    className="object-cover" 
                  />
                   <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
                     <Play size={16} className="text-white" />
                   </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-green-400 transition-colors">{track.title}</p>
                  <p className="text-xs text-neutral-400 truncate">{track.artist}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-neutral-500">No tracks in queue</p>
          )}
        </div>
      </div>
    </div>
  );
}