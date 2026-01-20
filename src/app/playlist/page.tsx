'use client';

import { Play } from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';
import type { Track } from '@/store/usePlayerStore';
import { TrackRow } from '@/components/TrackRow';

export default function PlaylistPage() {
  const playTrack = usePlayerStore((s) => s.playTrack);

  const tracks: Track[] = Array.from({ length: 10 }).map(
    (_, i) => ({
      id: `track-${i + 1}`,
      title: `Track title ${i + 1}`,
      artist: 'Artist name',
      duration: '3:45',
      src: '/audio/sample.mp3',
    })
  );

  return (
    <div className="space-y-10 pb-32">
      {/* HEADER */}
      <header className="pt-16">
        <button
          onClick={() => playTrack(tracks[0], tracks)}
          className="h-14 w-14 rounded-full bg-brand-primary-500 flex items-center justify-center"
        >
          <Play fill="black" />
        </button>
      </header>

      {/* TRACK LIST */}
      <div className="space-y-1">
        {tracks.map((track, i) => (
          <TrackRow
            key={track.id}
            index={i + 1}
            track={track}
            playlist={tracks}
          />
        ))}
      </div>
    </div>
  );
}
