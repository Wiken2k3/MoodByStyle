'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { MoreHorizontal, Edit2 } from 'lucide-react';
import Image from 'next/image';
import { PLAYLISTS } from '@/constants/albums';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-neutral-400">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8 pt-10 pb-6">
        <div className="relative h-40 w-40 sm:h-56 sm:w-56 rounded-full shadow-2xl overflow-hidden group">
          {user.avatar ? (
            <Image src={user.avatar} alt={user.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
              <span className="text-6xl font-bold text-neutral-400">{user.name.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <Edit2 size={32} className="text-white" />
              <span className="text-sm font-bold text-white">Choose photo</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center sm:items-start gap-4 flex-1">
          <span className="text-sm font-bold uppercase tracking-wider hidden sm:block">Profile</span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter">{user.name}</h1>
          <div className="flex items-center gap-2 text-sm text-white">
            <span className="hover:underline cursor-pointer">10 Public Playlists</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">20 Followers</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">5 Following</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-neutral-800/50" />

      {/* Public Playlists */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Public Playlists</h2>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {PLAYLISTS.map((playlist) => (
            <div key={playlist.id} className="min-w-0">
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
      </div>
    </div>
  );
}