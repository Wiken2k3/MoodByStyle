'use client';

import {
  Home,
  Search,
  LibraryBig,
  Plus,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const mainNav = [
  { label: 'Home', icon: Home, active: true },
  { label: 'Search', icon: Search },
  { label: 'Library', icon: LibraryBig },
];

const libraryItems = [
  { label: 'Liked Songs', icon: Heart, href: '/liked' },
  { label: 'My Playlist #1' },
  { label: 'Chill Hits' },
  { label: 'Coding Mode' },
];

export function Sidebar() {
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(true);

  return (
    <aside className="flex h-full flex-col gap-4 bg-black/80 backdrop-blur-md px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto border-r border-neutral-800/50 w-[240px] sm:w-[280px]">
      {/* Logo */}
      <div className="flex items-center gap-2 text-lg sm:text-xl font-bold">
        <div className="h-7 sm:h-8 w-7 sm:w-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 shadow-lg" />
        <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent hidden sm:inline">
          Spotify
        </span>
      </div>

      {/* Main nav */}
      <nav className="space-y-1">
        {mainNav.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 sm:gap-4 rounded-lg px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                item.active
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-neutral-800/50 via-neutral-700/50 to-neutral-800/50" />

      {/* Library */}
      <div className="flex flex-1 flex-col gap-3 min-h-0">
        {/* Library Header */}
        <button
          onClick={() => setIsLibraryExpanded(!isLibraryExpanded)}
          className="flex items-center justify-between px-2 text-neutral-400 hover:text-white transition-colors duration-200 group"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <LibraryBig size={16} className="sm:w-[18px] sm:h-[18px] group-hover:text-green-400 transition-colors" />
            <span className="text-xs sm:text-sm font-semibold hidden sm:inline">Your Library</span>
          </div>
          <Plus size={16} className="sm:w-[18px] sm:h-[18px] group-hover:text-green-400 transition-colors" />
        </button>

        {/* Library Items */}
        {isLibraryExpanded && (
          <div className="flex flex-col gap-1 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent hover:scrollbar-thumb-neutral-600">
            {libraryItems.map((item) => (
              <LibraryItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                href={item.href}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

interface LibraryItemProps {
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  href?: string;
}

function LibraryItem({ label, icon: Icon, href }: LibraryItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <>
      {Icon && (
        <Icon
          size={16}
          className={`transition-all duration-200 ${
            isHovered ? 'text-green-400 scale-110' : ''
          }`}
        />
      )}
      {label}
    </>
  );

  const baseClasses = "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-400 hover:bg-white/10 hover:text-white cursor-pointer transition-all duration-200 group border border-transparent hover:border-neutral-700/50";

  if (href) {
    return (
      <Link
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={baseClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={baseClasses}
    >
      {content}
    </div>
  );
}
