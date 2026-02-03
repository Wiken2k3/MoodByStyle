'use client';

import { useSearchParams } from 'next/navigation';
import { TRACKS } from '@/constants/albums';
import { AlbumCard } from '@/components/ui/AlbumCard';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { usePlayerStore } from '@/store/usePlayerStore';

const CATEGORIES = [
  { id: 'pop', name: 'Pop', color: 'bg-purple-500' },
  { id: 'hiphop', name: 'Hip-Hop', color: 'bg-orange-500' },
  { id: 'rock', name: 'Rock', color: 'bg-red-500' },
  { id: 'latin', name: 'Latin', color: 'bg-yellow-500' },
  { id: 'kpop', name: 'K-Pop', color: 'bg-pink-500' },
  { id: 'chill', name: 'Chill', color: 'bg-blue-500' },
  { id: 'jazz', name: 'Jazz', color: 'bg-indigo-500' },
  { id: 'classical', name: 'Classical', color: 'bg-amber-700' },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const playTrack = usePlayerStore((s) => s.playTrack);

  // Logic hiển thị kết quả tìm kiếm
  if (query) {
    const results = TRACKS.filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Search results for "{query}"</h1>
        
        {results.length > 0 ? (
          <div className="space-y-2">
            {results.map((track) => (
              <div
                key={track.id}
                onClick={() => playTrack(track)}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/10 cursor-pointer group transition-colors"
              >
                <div className="relative h-12 w-12 shrink-0 rounded overflow-hidden bg-neutral-800">
                  {track.imageUrl && <Image src={track.imageUrl} alt={track.title} fill className="object-cover" />}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={20} fill="white" />
                  </div>
                </div>
                <div>
                  <p className="font-medium text-white group-hover:text-green-400 transition-colors">{track.title}</p>
                  <p className="text-sm text-neutral-400">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-neutral-400">No results found.</div>
        )}
      </div>
    );
  }

  // Logic hiển thị danh mục (Browse All)
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Browse All</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((category) => (
          <div
            key={category.id}
            className={`${category.color} relative h-32 sm:h-40 rounded-lg overflow-hidden p-4 cursor-pointer hover:scale-[1.02] transition-transform`}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white break-words max-w-[80%]">
              {category.name}
            </h3>
            {/* Decorative rotated box */}
            <div className="absolute -bottom-2 -right-4 h-24 w-24 bg-black/20 rotate-[25deg] rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}