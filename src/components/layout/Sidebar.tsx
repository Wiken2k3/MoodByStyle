'use client';

import {
  Home,
  Search,
  LibraryBig,
  Plus,
  Heart,
} from 'lucide-react';

const mainNav = [
  { label: 'Home', icon: Home, active: true },
  { label: 'Search', icon: Search },
];

export function Sidebar() {
  return (
    <aside
      className="
        flex
        h-screen
        w-[280px]
        flex-col
        gap-6
        bg-background-secondary
        px-6
        py-6
      "
    >
      {/* Logo */}
      <div className="text-xl font-bold text-white">
        Spotify
      </div>

      {/* Main nav */}
      <nav className="space-y-2">
        {mainNav.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-md
                  px-3
                  py-2
                  text-sm
                  font-medium
                  transition-colors
                  duration-200
                  ${
                    item.active
                      ? 'bg-white/10 text-white'
                      : 'text-text-muted hover:text-white hover:bg-white/5'
                  }
                `}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Library */}
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between text-text-muted">
          <div className="flex items-center gap-3">
            <LibraryBig size={20} />
            <span className="text-sm font-semibold">
              Your Library
            </span>
          </div>

          <Plus size={18} className="cursor-pointer hover:text-white" />
        </div>

        {/* Library content */}
        <div className="flex flex-col gap-2 overflow-y-auto">
          <LibraryItem label="Liked Songs" icon={Heart} />
          <LibraryItem label="My Playlist #1" />
          <LibraryItem label="Chill Hits" />
          <LibraryItem label="Coding Mode" />
        </div>
      </div>
    </aside>
  );
}

function LibraryItem({
  label,
  icon: Icon,
}: {
  label: string;
  icon?: any;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-md
        px-3
        py-2
        text-sm
        text-text-muted
        hover:bg-white/5
        hover:text-white
        cursor-pointer
        transition
      "
    >
      {Icon && <Icon size={18} />}
      {label}
    </div>
  );
}
