'use client';

import { useParams } from 'next/navigation';
import { ALBUMS, TRACKS } from '@/constants/albums';
import { Play, Clock, Heart, MoreHorizontal, Pause } from 'lucide-react';
import Image from 'next/image';
import { usePlayerStore } from '@/store/usePlayerStore';
import { useAuthStore } from '@/store/useAuthStore';
import { LoginRequiredModal } from '@/components/modals/LoginRequiredModal';
import { useState } from 'react';

export default function AlbumPage() {
  const params = useParams();
  const id = params.id as string;
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore();
  const { user } = useAuthStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Mock finding album (in real app, fetch from API)
  const album = ALBUMS.find((a) => a.id === id) || ALBUMS[0];
  
  // Mock tracks for this album
  const albumTracks = TRACKS.slice(0, 8); // Just taking some tracks for demo

  const handlePlayAlbum = () => {
    if (albumTracks.length > 0) {
      // If currently playing a song from this album, toggle play/pause
      const isPlayingAlbumTrack = albumTracks.some(t => t.id === currentTrack?.id);
      if (isPlayingAlbumTrack) {
        togglePlay();
      } else {
        playTrack(albumTracks[0]);
      }
    }
  };

  const handleLike = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 bg-gradient-to-b from-neutral-700/50 to-black/50 p-6 -mx-3 sm:-mx-6 md:-mx-8 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10">
        <div className="relative h-40 w-40 sm:h-52 sm:w-52 shadow-2xl rounded-lg shrink-0 overflow-hidden">
          {album.imageUrl ? (
            <Image src={album.imageUrl} alt={album.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
              <span className="text-4xl">🎵</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Album</span>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter">{album.title}</h1>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
            <div className="h-6 w-6 rounded-full bg-neutral-700 overflow-hidden relative">
               {/* Artist Image Placeholder */}
            </div>
            <span className="font-bold text-white hover:underline cursor-pointer">{album.artist}</span>
            <span>•</span>
            <span>2024</span>
            <span>•</span>
            <span>{albumTracks.length} songs</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button 
          onClick={handlePlayAlbum}
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-green-500/20"
        >
          {isPlaying && albumTracks.some(t => t.id === currentTrack?.id) ? <Pause size={28} fill="black" className="text-black" /> : <Play size={28} fill="black" className="ml-1 text-black" />}
        </button>
        <button onClick={handleLike} className="text-neutral-400 hover:text-white transition-colors">
          <Heart size={32} />
        </button>
        <button className="text-neutral-400 hover:text-white transition-colors">
          <MoreHorizontal size={32} />
        </button>
      </div>

      {/* Tracks List */}
      <div className="space-y-2">
        <div className="grid grid-cols-[16px_1fr_auto] sm:grid-cols-[16px_1fr_1fr_auto] gap-4 px-4 py-2 text-sm text-neutral-400 border-b border-white/10">
          <span>#</span>
          <span>Title</span>
          <span className="hidden sm:block">Artist</span>
          <Clock size={16} />
        </div>
        
        {albumTracks.map((track, index) => (
          <div
            key={track.id}
            onClick={() => playTrack(track)}
            className="group grid grid-cols-[16px_1fr_auto] sm:grid-cols-[16px_1fr_1fr_auto] gap-4 px-4 py-2 rounded-md hover:bg-white/10 cursor-pointer transition-colors items-center"
          >
            <span className={`text-neutral-400 group-hover:text-white ${currentTrack?.id === track.id ? 'text-green-500 font-bold' : ''}`}>
              {currentTrack?.id === track.id && isPlaying ? (
                <Image src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" alt="playing" width={14} height={14} />
              ) : (
                index + 1
              )}
            </span>
            <div className="min-w-0">
              <p className={`font-medium truncate transition-colors ${currentTrack?.id === track.id ? 'text-green-500' : 'text-white group-hover:text-green-400'}`}>
                {track.title}
              </p>
              <p className="text-sm text-neutral-400 sm:hidden truncate">{track.artist}</p>
            </div>
            <span className="text-sm text-neutral-400 hidden sm:block truncate hover:text-white hover:underline">{track.artist}</span>
            <span className="text-sm text-neutral-400">3:45</span>
          </div>
        ))}
      </div>

      <LoginRequiredModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        message="Log in to save this album to your library."
      />
    </div>
  );
}