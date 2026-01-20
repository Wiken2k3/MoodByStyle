'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Play, Heart, Share2 } from 'lucide-react';
import { ALBUMS } from '@/constants/albums';
import { TrackRow } from '@/components/TrackRow';
import { usePlayerStore } from '@/store/usePlayerStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function AlbumPage() {
  const params = useParams();
  const albumId = params.id as string;
  const album = ALBUMS.find((a) => a.id === `album-${albumId}`);
  const playTrack = usePlayerStore((s) => s.playTrack);
  const isGuest = useAuthStore((s) => s.isGuest);

  if (!album) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Album not found</h1>
          <p className="text-neutral-400">The album you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handlePlayAlbum = () => {
    if (album.tracks.length > 0) {
      playTrack(album.tracks[0], album.tracks);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Album Header */}
      <div className="relative -mx-10 px-10 py-20 bg-gradient-to-b from-green-500/20 via-neutral-900/50 to-black">
        <div className="flex flex-col md:flex-row gap-8 items-end">
          {/* Album Cover */}
          <div className="relative w-56 h-56 rounded-xl overflow-hidden shadow-2xl flex-shrink-0">
            {album.imageUrl.startsWith('/images') ? (
              <Image
                src={album.imageUrl}
                alt={album.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-500/30 to-blue-500/30 flex items-center justify-center">
                <span className="text-6xl">🎵</span>
              </div>
            )}
          </div>

          {/* Album Info */}
          <div className="flex-1 mb-4">
            <p className="text-sm font-semibold text-neutral-400 mb-2">{album.artist}</p>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">{album.title}</h1>
            <p className="text-lg text-neutral-300 mb-8">{album.description}</p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={handlePlayAlbum}
                className="flex items-center gap-3 px-8 py-3 rounded-full bg-green-500 hover:bg-green-400 text-black font-bold transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Play size={20} fill="black" />
                Play
              </button>
              
              {!isGuest && (
                <>
                  <button className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-400 hover:border-white text-neutral-400 hover:text-white transition-all duration-300">
                    <Heart size={20} />
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-400 hover:border-white text-neutral-400 hover:text-white transition-all duration-300">
                    <Share2 size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Album Stats */}
            <div className="mt-8 text-sm text-neutral-400 space-y-1">
              <p>{album.tracks.length} songs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks List */}
      <div className="px-4 sm:px-6 space-y-2">
        <h2 className="text-2xl font-bold text-white mb-6">Tracks</h2>
        <div className="space-y-1">
          {album.tracks.map((track, index) => (
            <TrackRow
              key={track.id}
              index={index + 1}
              track={track}
              playlist={album.tracks}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
