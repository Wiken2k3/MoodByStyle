'use client';

import Image from 'next/image';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { useAuthStore } from '@/store/useAuthStore';
import { LoginRequiredModal } from '@/components/modals/LoginRequiredModal';
import type { Track } from '@/store/usePlayerStore';
import { useState } from 'react';

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  audioSrc?: string;
}

export function Card({
  title,
  description,
  imageUrl = '/images/cptdsddt.png',
  audioSrc = '/audio/cptdsddt.mp3',
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const playTrack = usePlayerStore((s) => s.playTrack);
  const isLiked = useAuthStore((s) => s.isLiked(title));
  const toggleLikeTrack = useAuthStore((s) => s.toggleLikeTrack);
  const isGuest = useAuthStore((s) => s.isGuest);

  const track: Track = {
    id: title,
    title,
    artist: description || 'Unknown Artist',
    duration: '3:45',
    src: audioSrc,
  };

  const handlePlay = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    playTrack(track);
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isGuest) {
      setShowModal(true);
    } else {
      toggleLikeTrack(title);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
    >
      {/* Card Container */}
      <div className={`rounded-xl overflow-hidden transition-all duration-500 ${
        isHovered ? 'shadow-[0_20px_50px_rgba(0,0,0,0.5)] -translate-y-2 scale-[1.02]' : 'shadow-lg'
      }`}>
        {/* Image Container with Overlay */}
        <div className="relative aspect-square overflow-hidden bg-neutral-800">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110 brightness-75' : 'scale-100 brightness-100'
            }`}
            sizes="(max-width: 375px) 40vw, (max-width: 640px) 35vw, (max-width: 768px) 30vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          />

          {/* Dark Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-60'
          }`} />

          {/* Shine Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-10' : ''
          }`} />

          {/* Action Buttons Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-300">
            {/* Play Button */}
            <button
              onClick={handlePlay}
              title="Play"
              className={`flex h-12 xs:h-13 sm:h-14 w-12 xs:w-13 sm:w-14 items-center justify-center rounded-full bg-green-500 hover:bg-green-400 text-black shadow-2xl transition-all duration-300 hover:scale-125 active:scale-95 transform ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            >
              <Play size={20} fill="black" className="ml-0.5 xs:w-6 xs:h-6 sm:w-6 sm:h-6" />
            </button>

            {/* Secondary Actions */}
            <div className={`flex gap-2 xs:gap-2.5 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              <button
                onClick={handleLike}
                className={`flex h-9 xs:h-10 w-9 xs:w-10 items-center justify-center rounded-full transition-all duration-300 backdrop-blur-md transform hover:scale-110 active:scale-90 ${
                  isLiked
                    ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40'
                }`}
                title={isLiked ? 'Unlike' : 'Like'}
              >
                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} className={isLiked ? 'animate-pulse' : 'xs:w-5 xs:h-5'} />
              </button>
              <button 
                className="flex h-9 xs:h-10 w-9 xs:w-10 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-md"
                title="More options"
              >
                <MoreHorizontal size={16} className="xs:w-5 xs:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className={`p-3 sm:p-4 bg-gradient-to-br from-neutral-900/80 to-black/60 backdrop-blur-sm border-t border-neutral-800/50 transition-all duration-300 ${
          isHovered ? 'bg-neutral-900' : ''
        }`}>
          <h3 className={`line-clamp-2 text-sm sm:text-base font-bold transition-colors duration-200 ${
            isHovered ? 'text-green-400' : 'text-white'
          }`}>
            {title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs sm:text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
            {description}
          </p>
        </div>
      </div>

      {/* Login Required Modal */}
      {showModal && (
        <LoginRequiredModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Like This Track"
          message="Sign in to your account to add this track to your favorites."
        />
      )}
    </div>
  );
}
