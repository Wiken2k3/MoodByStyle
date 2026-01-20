'use client';

import { HomeHeader } from '@/components/home/HomeHeader';
import { Card } from '@/components/ui/Card';
import { AlbumCard } from '@/components/ui/AlbumCard';
import { Section } from '@/components/ui/Section';
import { ALBUMS, PLAYLISTS } from '@/constants/albums';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div suppressHydrationWarning className="space-y-12 sm:space-y-16 lg:space-y-20 pb-20">
      {/* Welcome Section */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-white">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-neutral-400 text-lg">
          Continue your music journey and discover new albums
        </p>
      </div>

      {/* Featured Albums - Main Content */}
      <Section title="Featured Albums">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {ALBUMS.map((album, idx) => (
            <div key={album.id} className="animate-fadeIn" style={{animationDelay: `${idx * 50}ms`}}>
              <AlbumCard album={album} />
            </div>
          ))}
        </div>
      </Section>

      {/* Curated Playlists */}
      <Section title="Made for you">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {PLAYLISTS.map((playlist, idx) => (
            <div key={playlist.id} className="animate-fadeIn" style={{animationDelay: `${idx * 50}ms`}}>
              <Card
                title={playlist.title}
                description={playlist.description}
                imageUrl={playlist.imageUrl}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
