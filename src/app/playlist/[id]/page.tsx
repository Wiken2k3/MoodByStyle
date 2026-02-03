'use client';

import { useParams } from 'next/navigation';
import { Play, Music } from 'lucide-react';

export default function PlaylistPage() {
  const params = useParams();
  const id = params.id as string;
  
  // Format ID for display (e.g., "chill-hits" -> "Chill Hits")
  const title = id ? id.replace(/-/g, ' ') : 'Playlist';

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 bg-gradient-to-b from-neutral-800/50 to-black/50 p-6 -mx-3 sm:-mx-6 md:-mx-8 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10">
        <div className="h-32 w-32 sm:h-52 sm:w-52 shadow-2xl bg-neutral-800 flex items-center justify-center rounded-lg shrink-0 group">
          <Music size={64} className="text-neutral-500 group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Playlist</span>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter capitalize">{title}</h1>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
            <span className="font-bold text-white">Spotify</span>
            <span>•</span>
            <span>0 likes</span>
            <span>•</span>
            <span>0 songs</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-green-500/20">
          <Play size={24} fill="black" className="ml-1" />
        </button>
      </div>
      
      <div className="h-px bg-neutral-800/50" />

      {/* Content Placeholder */}
      <div className="py-8">
        <p className="text-neutral-400 text-sm">This playlist is currently empty.</p>
      </div>
    </div>
  );
}