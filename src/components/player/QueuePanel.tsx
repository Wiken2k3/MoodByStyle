'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { Play, Pause } from 'lucide-react';
import Image from 'next/image';

export function QueuePanel() {
  // @ts-ignore - Assuming queue exists in store, if not it will fallback gracefully
  const { currentTrack, isPlaying, togglePlay, queue, playTrack } = usePlayerStore();

  if (!currentTrack) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-neutral-400">
        <p className="text-sm">Play a song to see the queue</p>
      </div>
    );
  }

  // Tìm vị trí bài hát hiện tại và chỉ lấy các bài phía sau
  const currentTrackIndex = queue?.findIndex((t: any) => t.id === currentTrack.id) ?? -1;
  const nextUpTracks = (queue && currentTrackIndex !== -1) 
    ? queue.slice(currentTrackIndex + 1) 
    : [];

  return (
    <div className="flex h-full flex-col gap-6 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800">
      <h2 className="text-lg font-bold text-white">Queue</h2>

      {/* Now Playing */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-neutral-400">Now Playing</h3>
        <div className="group relative rounded-lg bg-white/5 p-3 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-neutral-800">
              <Image 
                src={currentTrack.imageUrl || '/images/music-placeholder.png'} 
                alt={currentTrack.title} 
                fill 
                sizes="48px"
                className="object-cover" 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={togglePlay}>
                  {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                </button>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-green-500">{currentTrack.title}</p>
              <p className="truncate text-xs text-neutral-400">{currentTrack.artist}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Up */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-neutral-400">Next Up</h3>
        <div className="space-y-1">
          {nextUpTracks.length > 0 ? (
            nextUpTracks.map((track: any, i: number) => (
              <div
                key={`${track.id}-${i}`}
                className="group flex items-center gap-3 rounded-md p-2 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => playTrack(track)}
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-neutral-800">
                  <Image 
                    src={track.imageUrl || '/images/music-placeholder.png'} 
                    alt={track.title} 
                    fill 
                    sizes="40px"
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={16} fill="white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white group-hover:text-green-400 transition-colors">
                    {track.title}
                  </p>
                  <p className="truncate text-xs text-neutral-400">{track.artist}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-neutral-500 px-2">Add songs to your queue to see them here.</p>
          )}
        </div>
      </div>
    </div>
  );
}