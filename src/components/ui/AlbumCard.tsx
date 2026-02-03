'use client';

import Image from 'next/image';
import { Play, ChevronRight } from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';
import type { Album } from '@/types';
import Link from 'next/link';

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const playTrack = usePlayerStore((s) => s.playTrack);

  const handlePlayAlbum = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (album.tracks.length > 0) {
      playTrack(album.tracks[0], album.tracks);
    }
  };

  return (
    <Link
      href={`/album/${album.id}`}
      className="group relative cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
    >
      <div className="rounded-xl overflow-hidden transition-all duration-500 shadow-lg group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:-translate-y-2 group-hover:scale-[1.02]">
        {/* Album Cover */}
        <div className="relative aspect-square overflow-hidden bg-neutral-800">
          {album.imageUrl.startsWith('/images') ? (
            <Image
              src={album.imageUrl}
              alt={album.title}
              fill
              className="object-cover transition-transform duration-500 scale-100 brightness-100 group-hover:scale-110 group-hover:brightness-75"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-500/30 to-blue-500/30 flex items-center justify-center transition-all duration-500 scale-100 brightness-100 group-hover:scale-110 group-hover:brightness-75">
              <span className="text-4xl">🎵</span>
            </div>
          )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 opacity-60 group-hover:opacity-100" />

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayAlbum}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 hover:bg-green-400 text-black shadow-2xl transition-all duration-300 hover:scale-125 active:scale-95 transform opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
              title={`Play ${album.title}`}
            >
              <Play size={24} fill="black" className="ml-0.5" />
            </button>
          </div>
        </div>

        {/* Album Info */}
        <div className="p-3 sm:p-4 bg-gradient-to-br from-neutral-900/80 to-black/60 backdrop-blur-sm border-t border-neutral-800/50 transition-all duration-300 group-hover:bg-neutral-900">
          <h3 className="line-clamp-2 text-sm sm:text-base font-bold transition-colors duration-200 text-white group-hover:text-green-400">
            {album.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs sm:text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
            {album.genre} • {album.tracks.length} songs
          </p>
          
          {/* View album link indicator */}
          <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500 transition-all duration-300 group-hover:text-green-400 group-hover:translate-x-1">
            <span>View album</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
