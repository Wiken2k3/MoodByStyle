import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;

  playTrack: (track: Track) => void;
  togglePlay: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,

  playTrack: (track) =>
    set({
      currentTrack: track,
      isPlaying: true,
    }),

  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),
}));
