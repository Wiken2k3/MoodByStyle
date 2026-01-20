'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { useAuthStore } from '@/store/useAuthStore';
import { LoginRequiredModal } from '@/components/modals/LoginRequiredModal';
import type { Track } from '@/store/usePlayerStore';

export function TrackRow({
  index,
  track,
  playlist,
}: {
  index: number;
  track: Track;
  playlist: Track[];
}) {
  const playTrack = usePlayerStore((s) => s.playTrack);
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isLiked = useAuthStore((s) => s.isLiked(track.id));
  const toggleLikeTrack = useAuthStore((s) => s.toggleLikeTrack);
  const [showModal, setShowModal] = useState(false);
  const isGuest = useAuthStore((s) => s.isGuest);

  const isActive = currentTrack?.id === track.id;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isGuest) {
      setShowModal(true);
    } else {
      toggleLikeTrack(track.id);
    }
  };

  return (
    <>
      <div
        onClick={() => playTrack(track, playlist)}
        className={`grid grid-cols-[30px_1fr_40px_60px] sm:grid-cols-[40px_1fr_40px_120px] px-3 sm:px-4 py-2 sm:py-3 cursor-pointer rounded-lg transition-all duration-200 gap-2 ${
          isActive
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'text-neutral-400 hover:bg-white/5 hover:text-white border border-transparent'
        }`}
      >
        <span className="text-xs sm:text-base font-medium">{index}</span>

        <div className="min-w-0 px-2 sm:px-3">
          <p className="text-xs sm:text-base font-medium truncate">{track.title}</p>
          <p className="text-xs text-neutral-500 truncate sm:text-neutral-400">{track.artist}</p>
        </div>

        {/* Like button */}
        <button
          onClick={handleLike}
          className="flex items-center justify-center p-1 hover:bg-white/10 rounded transition-colors"
          title={isLiked ? 'Unlike' : 'Like'}
        >
          <Heart
            size={18}
            className={`transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-400 hover:text-red-500'
            }`}
          />
        </button>

        <span className="text-right text-xs sm:text-base font-medium shrink-0">
          {track.duration}
        </span>
      </div>

      <LoginRequiredModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Sign in to like songs"
        message="Save your favorite songs to your library and create personalized playlists"
      />
    </>
  );
}
