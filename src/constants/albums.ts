import type { Track } from '@/store/usePlayerStore';

export interface Album {
  id: string;
  title: string;
  artist: string;
  description: string;
  imageUrl: string;
  tracks: Track[];
  releaseYear?: number;
  totalTracks: number;
}

export const ALBUMS: Album[] = [
  {
    id: 'album-l2k',
    title: 'L2K',
    artist: 'LowG',
    description: 'Low G\'s latest hip-hop collection',
    imageUrl: `/images/l2k.png`,
    releaseYear: 2024,
    totalTracks: 4,
    tracks: [
      {
        id: '2',
        title: 'In Love',
        artist: 'LowG',
        duration: '3:20',
        src: '/audio/l2k/In Love.mp3',
        imageUrl: `/images/l2k.png`,
      },
      {
        id: '3',
        title: 'Love Game',
        artist: 'LowG Ft Tlinh',
        duration: '3:19',
        src: '/audio/l2k/Love Game.mp3',
        imageUrl: `/images/l2k.png`,
      },
      {
        id: '4',
        title: 'Peace N Love',
        artist: 'LowG FT Mỹ Anh',
        duration: '3:36',
        src: '/audio/l2k/Peace N Love.mp3',
        imageUrl: `/images/l2k.png`,
      },
      {
        id: '5',
        title: 'Giải Cứu Mỹ Nhân',
        artist: 'LowG Ft Hoàng Tôn',
        duration: '3:48',
        src: '/audio/gcmn.mp3',
        imageUrl: `/images/l2k.png`,
      },
    ],
  },
  {
    id: 'album-wxrdie',
    title: 'THE WXRDIES',
    artist: 'Wxrdie',
    description: 'Wxrdie\'s underground rap tracks',
    imageUrl: `/images/thewxrdie.png`,
    releaseYear: 2024,
    totalTracks: 3,
    tracks: [
      {
        id: '6',
        title: 'Trở Về',
        artist: 'Wxrdie Ft Justatee',
        duration: '3:45',
        src: '/audio/thewxrdie/Trở Về.mp3',
        imageUrl: `/images/thewxrdie.png`,
      },
      {
        id: '7',
        title: 'Thèn Choá',
        artist: 'Wxrdie Ft KayC',
        duration: '3:45',
        src: '/audio/thewxrdie/Thèn Choá.mp3',
        imageUrl: `/images/thewxrdie.png`,
      },
      {
        id: '8',
        title: 'Tim Anh Ghen',
        artist: 'Wxrdie Ft LVK TeuYungBoy Dangrangto',
        duration: '3:45',
        src: '/audio/thewxrdie/Tim Anh Ghen.mp3',
        imageUrl: `/images/thewxrdie.png`,
      },
    ],
  },
];

// Curated playlists
export const PLAYLISTS = [
  {
    id: 'p1',
    title: 'Tuyển Tập LowG',
    description: 'Hotest tracks from LowG',
    imageUrl: `/images/lowg.png`,
  },
  {
    id: 'p2',
    title: 'Tuyển Tập Wxrdie',
    description: 'Hotest tracks from Wxrdie',
    imageUrl: `/images/wxrdie.png`,
  },
  {
    id: 'p3',
    title: 'Tuyển tập Rap Việt',
    description: 'Hotest tracks from Rap Việt artists',
    imageUrl: `/images/rapviet.png`,
  },
];

// Single tracks (not part of an album)
export const SINGLE_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Chẳng phải tình đầu sao đâu đến thế',
    artist: 'Min Ft Dangrangto',
    duration: '3:30',
    src: '/audio/cptdsddt.mp3',
    imageUrl: `/images/cptdsddt.png`,
  },
];

// All tracks (flat array for searching and playlists)
export const TRACKS = [
  ...SINGLE_TRACKS,
  ...ALBUMS.flatMap((album) => album.tracks),
];
