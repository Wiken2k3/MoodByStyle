'use client';

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
} from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';
import type { Track } from '@/store/usePlayerStore';
import { useState } from 'react';

export function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    currentTime,
    duration,
    seek,
    setVolume,
  } = usePlayerStore();

  const [volume, setLocalVolume] = useState(0.8);
  const [repeat, setRepeat] = useState<'off' | 'one' | 'all'>('off');
  const [shuffle, setShuffle] = useState(false);

  if (!currentTrack) {
    return (
      <div className="h-20 xs:h-24 sm:h-28 flex items-center justify-center bg-gradient-to-t from-black/80 to-neutral-950/50 border-t border-green-500/10 backdrop-blur-md animate-fadeIn px-3 xs:px-4 sm:px-8">
        <p className="text-neutral-400 text-xs xs:text-sm font-medium">Select a track to play</p>
      </div>
    );
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setLocalVolume(vol);
    setVolume(vol);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 xs:h-24 sm:h-28 bg-black/95 border-t border-white/5 backdrop-blur-xl flex flex-col animate-fadeIn shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-[100]">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-800/40 hover:h-1.5 transition-all group cursor-pointer overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-100 shadow-[0_0_10px_rgba(34,197,94,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Player Content */}
      <div className="flex-1 flex items-center justify-between gap-2 xs:gap-3 sm:gap-4 px-2 xs:px-4 sm:px-8">
        {/* LEFT - Track Info */}
        <div className="flex items-center gap-4 w-[30%] min-w-0">
          <PlayerTrackInfo track={currentTrack} />
        </div>

        {/* CENTER - Playback Controls */}
        <PlayerControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          progress={progress}
          shuffle={shuffle}
          repeat={repeat}
          onPlay={togglePlay}
          onPrev={playPrev}
          onNext={playNext}
          onShuffle={() => setShuffle(!shuffle)}
          onRepeat={() => {
            if (repeat === 'off') setRepeat('all');
            else if (repeat === 'all') setRepeat('one');
            else setRepeat('off');
          }}
          onSeek={seek}
        />

        {/* RIGHT - Volume Control */}
        <div className="flex items-center justify-end w-[30%]">
          <PlayerVolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
        </div>
      </div>
    </div>
  );
}

function PlayerTrackInfo({ track }: { track: Track }) {
  return (
    <div className="flex items-center gap-2 xs:gap-3 min-w-0">
      <div className="h-10 xs:h-12 sm:h-14 w-10 xs:w-12 sm:w-14 rounded-md flex-shrink-0 bg-gradient-to-br from-neutral-800 to-neutral-700 shadow-lg overflow-hidden relative group">
        <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="min-w-0 hidden xs:block">
        <p className="text-xs xs:text-sm font-bold text-white truncate hover:underline cursor-pointer">
          {track.title}
        </p>
        <p className="text-[10px] xs:text-xs text-neutral-400 truncate hover:text-white transition-colors cursor-pointer">
          {track.artist}
        </p>
      </div>
    </div>
  );
}

interface PlayerControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  shuffle: boolean;
  repeat: 'off' | 'one' | 'all';
  onPlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
  onSeek: (time: number) => void;
}

function PlayerControls({
  isPlaying,
  currentTime,
  duration,
  progress,
  shuffle,
  repeat,
  onPlay,
  onPrev,
  onNext,
  onShuffle,
  onRepeat,
  onSeek,
}: PlayerControlsProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 xs:gap-2 flex-1 max-w-[40%] xs:max-w-[45%] sm:max-w-[50%]">
      {/* Control Buttons */}
      <div className="flex items-center gap-3 xs:gap-4 sm:gap-5 lg:gap-8">
        <button
          onClick={onShuffle}
          className={`transition-all hover:scale-110 ${
            shuffle ? 'text-green-500' : 'text-neutral-400 hover:text-white'
          }`}
          title="Shuffle"
        >
          <Shuffle size={16} className="xs:w-5 xs:h-5 sm:w-[18px] sm:h-[18px]" />
        </button>

        <button
          onClick={onPrev}
          className="text-neutral-400 hover:text-white transition-all hover:scale-110"
          title="Previous"
        >
          <SkipBack size={18} className="xs:w-5 xs:h-5 sm:w-[20px] sm:h-[20px]" />
        </button>

        <button
          onClick={onPlay}
          className="flex h-8 xs:h-9 sm:h-10 w-8 xs:w-9 sm:w-10 items-center justify-center rounded-full bg-white hover:scale-105 active:scale-95 text-black transition-all flex-shrink-0 shadow-xl"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause size={16} fill="black" className="xs:w-5 xs:h-5 sm:w-[20px] sm:h-[20px]" />
          ) : (
            <Play size={16} fill="black" className="xs:w-5 xs:h-5 sm:w-[20px] sm:h-[20px]" />
          )}
        </button>

        <button
          onClick={onNext}
          className="text-neutral-400 hover:text-white transition-all hover:scale-110"
          title="Next"
        >
          <SkipForward size={18} className="xs:w-5 xs:h-5 sm:w-[20px] sm:h-[20px]" />
        </button>

        <button
          onClick={onRepeat}
          className={`transition-all hover:scale-110 ${
            repeat !== 'off' ? 'text-green-500' : 'text-neutral-400 hover:text-white'
          }`}
          title="Repeat"
        >
          {repeat === 'one' ? (
            <Repeat1 size={16} className="xs:w-5 xs:h-5 sm:w-[18px] sm:h-[18px]" />
          ) : (
            <Repeat size={16} className="xs:w-5 xs:h-5 sm:w-[18px] sm:h-[18px]" />
          )}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-1.5 xs:gap-2 w-full max-w-xs xs:max-w-sm sm:max-w-md">
        <span className="text-[8px] xs:text-[10px] text-neutral-500 tabular-nums min-w-[28px] xs:min-w-[32px] text-right">{formatTime(currentTime)}
        </span>
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            onSeek(Math.max(0, Math.min(1, percent)) * duration);
          }}
          className="relative h-1 flex-1 rounded-full bg-white/10 cursor-pointer group"
        >
          <div
            className="h-full rounded-full bg-white group-hover:bg-green-500 transition-colors"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 h-3 w-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-all shadow-lg border border-black/10"
            style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>
        <span className="text-[8px] xs:text-[10px] text-neutral-500 tabular-nums min-w-[28px] xs:min-w-[32px]">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

interface PlayerVolumeControlProps {
  volume: number;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PlayerVolumeControl({ volume, onVolumeChange }: PlayerVolumeControlProps) {
  return (
    <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 group/vol min-w-[80px] xs:min-w-[120px] sm:min-w-[150px] justify-end">
      {volume === 0 ? (
        <VolumeX size={16} className="text-neutral-500 xs:w-5 xs:h-5 sm:w-[18px] sm:h-[18px]" />
      ) : (
        <Volume2 size={16} className="text-neutral-400 xs:w-5 xs:h-5 sm:w-[20px] sm:h-[20px] group-hover/vol:text-white transition-colors" />
      )}
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={onVolumeChange}
        className="w-16 xs:w-20 sm:w-24 lg:w-32 h-1 xs:h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-white hover:accent-green-500 transition-all"
        style={{
          background: `linear-gradient(to right, #1db954 0%, #1db954 ${volume * 100}%, #404040 ${volume * 100}%, #404040 100%)`
        } as React.CSSProperties}
        title="Volume"
      />
    </div>
  );
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
