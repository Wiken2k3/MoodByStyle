export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  src: string;
  imageUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  description: string;
  imageUrl: string;
  tracks: Track[];
  releaseYear?: number;
  totalTracks: number;
  genre?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  audioSrc?: string;
}
