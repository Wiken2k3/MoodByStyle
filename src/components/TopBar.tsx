'use client';

import { ChevronLeft, ChevronRight, Search, Bell, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';

export function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();
  const isSearchPage = pathname === '/search';

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
      {/* Navigation History */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-neutral-400 hover:text-white hover:bg-black/70 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => router.forward()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-neutral-400 hover:text-white hover:bg-black/70 transition-colors hidden sm:flex"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Search Bar (Visible on Search Page) */}
      {isSearchPage && (
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="What do you want to play?" 
              className="h-10 w-full rounded-full bg-neutral-800/50 border border-transparent px-10 text-sm text-white placeholder:text-neutral-500 focus:bg-neutral-800 focus:border-white/20 focus:outline-none transition-all"
            />
          </div>
        </div>
      )}

      {/* Auth / Profile */}
      <div className="flex items-center gap-4 ml-auto">
        {!user && (
          <>
            <Link 
              href="/signup" 
              className="text-sm font-bold text-neutral-400 hover:text-white hover:scale-105 transition-all"
            >
              Sign up
            </Link>
            <Link 
              href="/login" 
              className="flex h-10 items-center rounded-full bg-white px-6 text-sm font-bold text-black hover:scale-105 transition-all"
            >
              Log in
            </Link>
          </>
        )}

        {user && (
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-bold bg-white text-black px-4 py-1.5 rounded-full hover:scale-105 transition-all">
              Explore Premium
            </button>
            <button className="text-neutral-400 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            <Link href="/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors border border-black p-1">
              <User size={16} className="text-white" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}