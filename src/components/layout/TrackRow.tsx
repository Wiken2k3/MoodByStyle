'use client';

import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { usePlayerStore } from '@/store/usePlayerStore';
import type { Track } from '@/store/usePlayerStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useState } from 'react';

interface TrackRowProps {
  track: Track;
  index: number;
  albumArt?: string;
  playlist?: Track[];
}

export function TrackRow({ track, index, albumArt, playlist }: TrackRowProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerStore();
  const { user } = useAuthStore();
  const [isHovered, setIsHovered] = useState(false);

  const isCurrentTrack = currentTrack?.id === track.id;
  const isCurrentPlaying = isCurrentTrack && isPlaying;

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex items-center gap-4 rounded-md px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer"
      onClick={handlePlay} // Click anywhere to play
    >
      {/* Index / Play Button */}
      <div className="w-8 flex items-center justify-center text-neutral-400 text-sm font-medium">
        {isHovered || isCurrentTrack ? (
          <button onClick={(e) => { e.stopPropagation(); handlePlay(); }}>
            {isCurrentPlaying ? (
              <Pause size={16} className="text-green-500 fill-green-500" />
            ) : (
              <Play size={16} className={isCurrentTrack ? "text-green-500 fill-green-500" : "text-white fill-white"} />
            )}
          </button>
        ) : (
          <span>{index + 1}</span>
        )}
      </div>

      {/* Title & Artist */}
      <div className="flex flex-1 items-center gap-4 min-w-0">
        {(albumArt || track.imageUrl) && (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
            <Image 
              src={track.imageUrl || albumArt || '/images/music-placeholder.png'} 
              alt={track.title} 
              fill 
              sizes="40px"
              className="object-cover" 
            />
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className={`truncate text-sm font-medium ${isCurrentTrack ? 'text-green-500' : 'text-white'}`}>
            {track.title}
          </span>
          <span className="truncate text-sm text-neutral-400 group-hover:text-white transition-colors">
            {track.artist}
          </span>
        </div>
      </div>

      {/* Album Name (Hidden on mobile) */}
      <div className="hidden md:block flex-1 text-sm text-neutral-400 truncate">
        {track.artist} Album
      </div>

      {/* Duration & Actions */}
      <div className="flex items-center gap-4 justify-end min-w-[120px]">
        <button 
          className={`hidden group-hover:block text-neutral-400 hover:text-white ${user ? '' : 'cursor-not-allowed opacity-50'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Heart size={16} />
        </button>
        <span className="text-sm text-neutral-400 tabular-nums">{track.duration}</span>
        <button className="hidden group-hover:block text-neutral-400 hover:text-white" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}