'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
}

export function Card({
  title,
  description,
  imageUrl = '/images/playlist-default.png',
}: CardProps) {
  const playTrack = usePlayerStore((s) => s.playTrack);

  const track = {
    id: title,
    title,
    artist: 'Spotify Clone',
    duration: '3:45',
  };

  return (
    <div
      className="
        group
        relative
        rounded-xl
        bg-background-secondary
        p-4
        transition-all
        duration-300
        hover:bg-white/10
        hover:-translate-y-1
        cursor-pointer
      "
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />

        {/* Play button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playTrack(track);
          }}
          className="
            absolute
            bottom-3
            right-3
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-brand-primary-500
            text-black
            opacity-0
            translate-y-2
            shadow-lg
            transition
            group-hover:opacity-100
            group-hover:translate-y-0
          "
        >
          <Play size={20} fill="black" />
        </button>
      </div>

      {/* Text */}
      <div className="mt-4 space-y-1">
        <h3 className="truncate font-semibold text-white">
          {title}
        </h3>

        {description && (
          <p className="line-clamp-2 text-sm text-text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
