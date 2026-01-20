import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  src: string;
  imageUrl?: string;
}

interface PlayerState {
  /* ===== CORE ===== */
  currentTrack: Track | null;
  isPlaying: boolean;
  audio: HTMLAudioElement | null;

  /* ===== PROGRESS ===== */
  currentTime: number;
  duration: number;

  /* ===== QUEUE ===== */
  queue: Track[];
  queueIndex: number;
  recentTracks: Track[];

  /* ===== ACTIONS ===== */
  playTrack: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  stop: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  clearQueue: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  audio: null,

  currentTime: 0,
  duration: 0,

  queue: [],
  queueIndex: 0,
  recentTracks: [],

  playTrack: (track, queue = []) => {
    const { audio, currentTrack, recentTracks } = get();

    // Add previous track to recent if exists
    if (currentTrack) {
      set({
        recentTracks: [
          currentTrack,
          ...recentTracks.filter((t) => t.id !== currentTrack.id),
        ].slice(0, 20), // Keep last 20
      });
    }

    // cleanup audio cũ
    if (audio) {
      audio.pause();
      audio.src = '';
    }

    const newAudio = new Audio(track.src);
    newAudio.volume = 0.8;

    newAudio.onloadedmetadata = () => {
      set({ duration: newAudio.duration });
    };

    newAudio.ontimeupdate = () => {
      set({ currentTime: newAudio.currentTime });
    };

    newAudio.onended = () => {
      get().playNext();
    };

    newAudio.play();

    const queueIndex = queue.findIndex((t) => t.id === track.id);

    set({
      currentTrack: track,
      audio: newAudio,
      isPlaying: true,
      queue,
      queueIndex: queueIndex >= 0 ? queueIndex : 0,
      currentTime: 0,
    });
  },

  togglePlay: () => {
    const { audio, isPlaying } = get();
    if (!audio) return;

    isPlaying ? audio.pause() : audio.play();
    set({ isPlaying: !isPlaying });
  },

  stop: () => {
    const { audio } = get();
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    set({
      currentTrack: null,
      isPlaying: false,
      currentTime: 0,
    });
  },

  playNext: () => {
    const { queue, queueIndex } = get();
    if (queue.length === 0) return;

    const nextIndex = queueIndex + 1;
    if (nextIndex < queue.length) {
      get().playTrack(queue[nextIndex], queue);
    }
  },

  playPrev: () => {
    const { queue, queueIndex, currentTime } = get();
    if (queue.length === 0) return;

    // If more than 3 seconds into track, restart current track
    if (currentTime > 3) {
      get().seek(0);
      return;
    }

    // Otherwise play previous
    if (queueIndex > 0) {
      get().playTrack(queue[queueIndex - 1], queue);
    }
  },

  seek: (time) => {
    const { audio } = get();
    if (!audio) return;

    audio.currentTime = time;
    set({ currentTime: time });
  },

  setVolume: (volume) => {
    const { audio } = get();
    if (!audio) return;

    audio.volume = volume;
  },

  clearQueue: () => {
    set({
      queue: [],
      queueIndex: 0,
      currentTrack: null,
      isPlaying: false,
    });
  },
}));
