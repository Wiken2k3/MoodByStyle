'use client';

import { Play } from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { PLAYLISTS } from '@/constants/albums';

export default function PlaylistPage() {
  const playTrack = usePlayerStore((s) => s.playTrack);

  const tracks = Array.from({ length: 10 }).map((_, i) => ({
    id: `track-${i + 1}`,
    title: `Track title ${i + 1}`,
    artist: 'Artist name',
    duration: '3:45',
    src: '/audio/cptdsddt.mp3',
  }));

  const playPlaylist = () => {
    playTrack(tracks[0]);
  };

  return (
    <div className="space-y-10">
      {/* =====================
          PLAYLIST HEADER
      ===================== */}
      <header
        className="
          -mx-10
          px-10
          pb-8
          pt-16
          bg-gradient-to-b
          from-emerald-900/80
          to-background-primary
        "
      >
        <div className="flex items-end gap-6">
          {/* Cover */}
          <div className="h-56 w-56 shrink-0 rounded-lg bg-neutral-800 shadow-2xl" />

          {/* Info */}
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase text-white">
              Playlist
            </p>

            <h1 className="text-6xl font-bold tracking-tight text-white">
              Coding Mode
            </h1>

            <p className="text-sm text-text-muted">
              Spotify Clone • {tracks.length} songs
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={playPlaylist}
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-brand-primary-500
                  text-black
                  shadow-xl
                  transition
                  hover:scale-105
                  active:scale-95
                "
                aria-label="Play playlist"
              >
                <Play size={24} fill="black" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================
          TRACK LIST
      ===================== */}
      <section className="space-y-4">
        {/* Table header */}
        <div className="grid grid-cols-[40px_1fr_120px] px-4 text-sm text-text-muted">
          <span>#</span>
          <span>Title</span>
          <span className="text-right">Duration</span>
        </div>

        <div className="space-y-1">
          {tracks.map((track, i) => (
            <TrackRow
              key={track.id}
              index={i + 1}
              track={track}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

/* =====================
   TRACK ROW
===================== */

import type { Track } from '@/store/usePlayerStore';

function TrackRow({
  index,
  track,
}: {
  index: number;
  track: Track;
}) {
  const playTrack = usePlayerStore((s) => s.playTrack);

  return (
    <div
      onClick={() => playTrack(track)}
      className="
        group
        grid
        grid-cols-[40px_1fr_120px]
        items-center
        rounded-md
        px-4
        py-2
        text-sm
        text-text-muted
        transition
        hover:bg-white/5
        hover:text-white
        cursor-pointer
      "
    >
      {/* Index / Play */}
      <span className="group-hover:hidden">
        {index}
      </span>
      <span className="hidden group-hover:block text-white">
        ▶
      </span>

      {/* Title */}
      <div>
        <p className="font-medium text-white">
          {track.title}
        </p>
        <p className="text-xs text-text-muted">
          {track.artist}
        </p>
      </div>

      {/* Duration */}
      <span className="text-right">
        {track.duration}
      </span>
    </div>
  );
}
