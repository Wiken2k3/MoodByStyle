'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { useEffect, useState } from 'react';

export function LyricsPanel() {
  const { currentTrack } = usePlayerStore();
  const [lyrics, setLyrics] = useState<string[]>([]);

  // Mock lyrics data generator
  useEffect(() => {
    if (!currentTrack) return;
    
    // In a real app, fetch lyrics from an API based on currentTrack.id
    const mockLyrics = [
      "Verse 1",
      "Lost in the rhythm of the night",
      "Shadows dancing in the light",
      "Feeling the beat inside my soul",
      "Losing all of my control",
      "",
      "Chorus",
      "This is the sound of our generation",
      "Moving across the entire nation",
      "Don't stop the music, let it play",
      "We're gonna dance the night away",
      "",
      "Verse 2",
      "Neon lights and city streets",
      "Moving fast to the heartbeat",
      "Every moment feels so right",
      "Underneath the stars so bright"
    ];
    setLyrics(mockLyrics);
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="flex h-full flex-col p-6 overflow-y-auto scrollbar-hide bg-gradient-to-b from-neutral-900/50 to-black">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white mb-1">Lyrics</h2>
        <p className="text-sm text-neutral-400">{currentTrack.title} — {currentTrack.artist}</p>
      </div>
      
      <div className="space-y-6 text-xl sm:text-2xl font-bold text-neutral-400">
        {lyrics.map((line, i) => (
          <p key={i} className={`transition-colors duration-300 hover:text-white cursor-default ${line === "" ? "h-4" : ""}`}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}