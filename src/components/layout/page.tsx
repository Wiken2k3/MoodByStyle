'use client';

import { TRACKS } from '@/constants/albums';
import { TrackRow } from '@/components/TrackRow';
import { Clock, Play, Heart } from 'lucide-react';
import Image from 'next/image';
import { usePlayerStore } from '@/store/usePlayerStore';

export default function LikedSongsPage() {
  const { playTrack } = usePlayerStore();
  // Mock liked songs
  const likedTracks = TRACKS.slice(0, 5);

  return (
    <div className="-mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10">
      {/* Header */}
      <div className="relative flex flex-col md:flex-row items-end gap-6 bg-gradient-to-b from-purple-700 to-black/50 p-6 sm:p-8 pt-20 sm:pt-24">
        <div className="relative h-48 w-48 sm:h-56 sm:w-56 shrink-0 shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden bg-gradient-to-br from-purple-800 to-purple-400 flex items-center justify-center">
          <Heart size={80} fill="white" className="text-white" />
        </div>

        <div className="flex flex-col gap-2 sm:gap-4 w-full">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">Playlist</span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tight">
            Liked Songs
          </h1>
          <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-white mt-2">
            <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-black">M</div>
            <span className="hover:underline cursor-pointer">MoodByStyle User</span>
            <span className="font-medium text-neutral-300">• {likedTracks.length} songs</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-black/20 backdrop-blur-3xl p-4 sm:p-8 min-h-screen">
        <div className="flex items-center gap-6 mb-8">
          <button 
            onClick={() => likedTracks.length > 0 && playTrack(likedTracks[0])}
            className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-green-500 text-black hover:scale-105 hover:bg-green-400 transition-all shadow-lg"
          >
            <Play size={24} fill="black" className="ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 border-b border-white/10 text-sm font-medium text-neutral-400 mb-4 sticky top-16 bg-black z-10">
          <div className="w-8 text-center">#</div>
          <div>Title</div>
          <div className="hidden md:block">Album</div>
          <div className="flex justify-end min-w-[120px]">
            <Clock size={16} />
          </div>
        </div>

        <div className="flex flex-col">
          {likedTracks.length > 0 ? (
            likedTracks.map((track, index) => (
              <TrackRow 
                key={`${track.id}-${index}`} 
                track={track} 
                index={index} 
                albumArt={track.imageUrl}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
              <p className="text-lg font-bold text-white mb-2">Songs you like will appear here</p>
              <p>Save songs by tapping the heart icon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}