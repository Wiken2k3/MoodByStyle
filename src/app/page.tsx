'use client';

import { HomeHeader } from '@/components/home/HomeHeader';
import { Card } from '@/components/ui/Card';
import { AlbumCard } from '@/components/ui/AlbumCard';
import { Section } from '@/components/ui/Section';
import { ALBUMS, PLAYLISTS } from '@/constants/albums';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div suppressHydrationWarning className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 xl:space-y-16">
      {/* Hero Section */}
      <HomeHeader />

      {/* Featured Albums - Main Content */}
      <Section title="Featured Albums">
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          {ALBUMS.map((album) => (
            <div key={album.id} suppressHydrationWarning className="animate-fadeIn min-w-0">
              <AlbumCard album={album} />
            </div>
          ))}
        </div>
      </Section>

      {/* Curated Playlists */}
      <Section title="Made for you">
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          {PLAYLISTS.map((playlist) => (
            <div key={playlist.id} suppressHydrationWarning className="animate-fadeIn min-w-0">
              <Link href={`/playlist/${playlist.id}`}>
                <Card
                  title={playlist.title}
                  description={playlist.description}
                  imageUrl={playlist.imageUrl}
                />
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
