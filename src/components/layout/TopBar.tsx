'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Bell, Play } from 'lucide-react';
import { TRACKS, ALBUMS } from '@/constants/albums';
import { usePlayerStore } from '@/store/usePlayerStore';
import { useAuthStore } from '@/store/useAuthStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof TRACKS>([]);
  const playTrack = usePlayerStore((s) => s.playTrack);
  const user = useAuthStore((s) => s.user);
  const isGuest = useAuthStore((s) => s.isGuest);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filteredTracks = TRACKS.filter(t => 
      t.title.toLowerCase().includes(query.toLowerCase()) || 
      t.artist.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    setSearchResults(filteredTracks);
  };

  return (
    <div
      suppressHydrationWarning
      className={`flex items-center justify-between px-3 sm:px-6 md:px-8 py-3 sm:py-4 transition-all duration-500 border-b border-neutral-800/0 gap-2 sm:gap-4 backdrop-blur-md ${
        scrolled
          ? 'bg-black/60 border-green-500/20 shadow-xl shadow-green-500/5 sticky top-0 z-40'
          : 'bg-gradient-to-b from-black/40 to-transparent'
      }`}
    >
      {/* Left Navigation */}
      <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-2">
        <NavButton tooltip="Previous" onClick={() => router.back()}>
          <ChevronLeft size={16} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
        </NavButton>
        <NavButton tooltip="Next" onClick={() => router.forward()}>
          <ChevronRight size={16} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
        </NavButton>
      </div>

      {/* Center Search */}
      <div className="flex-1 max-w-xs xs:max-w-sm sm:max-w-md mx-auto relative">
        <div className="relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                setSearchResults([]);
              }
            }}
            placeholder="Search..."
            className="w-full bg-neutral-800/40 hover:bg-neutral-800/60 text-white placeholder-neutral-500 rounded-full pl-9 xs:pl-10 pr-3 xs:pr-4 py-2 xs:py-2.5 text-xs xs:text-sm transition-all duration-300 focus:outline-none focus:bg-neutral-800 focus:ring-2 focus:ring-green-500/50 backdrop-blur-md border border-white/5 group-focus-within:border-green-500/50"
          />
          <Search size={16} className="absolute left-2.5 xs:left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-green-400 transition-colors xs:w-5 xs:h-5" />
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-lg xs:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50 animate-fadeIn">
            <div className="p-1.5 xs:p-2">
              <p className="px-2 xs:px-3 py-1.5 xs:py-2 text-[9px] xs:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Best Results</p>
              {searchResults.map((track) => (
                <div
                  key={track.id}
                  onClick={() => {
                    playTrack(track);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="group flex items-center gap-2 xs:gap-3 p-1.5 xs:p-2 rounded-lg xs:rounded-xl hover:bg-white/10 cursor-pointer transition-all"
                >
                  <div className="relative h-8 xs:h-10 w-8 xs:w-10 rounded overflow-hidden flex-shrink-0 bg-neutral-800">
                    {track.imageUrl ? (
                      <>
                        <Image src={track.imageUrl} alt={track.title} fill className="object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play size={12} fill="white" className="xs:w-4 xs:h-4" />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500/30 to-blue-500/30">
                        <span className="text-sm">🎵</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs xs:text-sm font-bold text-white truncate group-hover:text-green-400 transition-colors">{track.title}</p>
                    <p className="text-[10px] xs:text-xs text-neutral-400 truncate">{track.artist} • Song</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-4 ml-2 xs:ml-4 sm:ml-8">
        {/* Notification Bell */}
        <button
          className="text-neutral-400 hover:text-green-400 transition-all duration-300 p-1.5 xs:p-2 hover:bg-green-500/10 rounded-full border border-transparent hover:border-green-500/30 group"
          title="Notifications"
        >
          <Bell size={16} className="xs:w-5 xs:h-5 group-hover:animate-bounce" />
        </button>

        {/* User Profile / Guest Badge */}
        {user ? (
          <Link
            href="/profile"
            className="flex items-center gap-1.5 xs:gap-2 rounded-full bg-black/60 hover:bg-neutral-900 border border-neutral-700/40 hover:border-green-500/50 px-1.5 xs:px-2 sm:px-3 py-1 xs:py-1.5 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 group"
            title="User profile"
          >
            <div className="h-5 xs:h-6 w-5 xs:w-6 rounded-full bg-neutral-700 overflow-hidden relative flex-shrink-0">
              {user.avatar && <Image src={user.avatar} alt={user.name} fill className="object-cover" />}
            </div>
            <span className="text-[10px] xs:text-xs sm:text-sm font-semibold text-white group-hover:text-green-400 transition-colors duration-300 hidden sm:inline max-w-20 xs:max-w-24 truncate">{user.name}</span>
          </Link>
        ) : isGuest ? (
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-4">
            <span className="px-2 xs:px-3 py-0.5 xs:py-1 bg-amber-500/20 text-amber-400 rounded-full text-[10px] xs:text-xs font-semibold border border-amber-500/30 hidden xs:inline">
              Guest
            </span>
            <Link href="/signup" className="text-neutral-400 hover:text-white font-bold text-[10px] xs:text-xs sm:text-sm transition-colors">Sign up</Link>
            <Link href="/login" className="bg-white text-black px-3 xs:px-4 sm:px-6 py-1 xs:py-1.5 sm:py-2 rounded-full font-bold text-[10px] xs:text-xs sm:text-sm hover:scale-105 transition-transform whitespace-nowrap">Log in</Link>
          </div>
        ) : (
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-4">
            <Link href="/signup" className="text-neutral-400 hover:text-white font-bold text-[10px] xs:text-xs sm:text-sm transition-colors">Sign up</Link>
            <Link href="/login" className="bg-white text-black px-3 xs:px-4 sm:px-6 py-1 xs:py-1.5 sm:py-2 rounded-full font-bold text-[10px] xs:text-xs sm:text-sm hover:scale-105 transition-transform whitespace-nowrap">Log in</Link>
          </div>
        )}
      </div>
    </div>
  );
}

interface NavButtonProps {
  children: React.ReactNode;
  tooltip?: string;
  onClick?: () => void;
}

function NavButton({ children, tooltip, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex h-7 xs:h-8 sm:h-9 w-7 xs:w-8 sm:w-9 items-center justify-center rounded-full bg-black/40 hover:bg-green-500/20 text-neutral-400 hover:text-green-400 transition-all duration-300 border border-neutral-700/30 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 group"
      title={tooltip}
    >
      {children}
    </button>
  );
}
