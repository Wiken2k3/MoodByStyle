'use client';

import { Home, Search, LibraryBig } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileNav() {
  const pathname = usePathname();

  const items = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Search', icon: Search, href: '/search' },
    { label: 'Library', icon: LibraryBig, href: '/library' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-black/95 border-t border-neutral-800/50 px-6 flex items-center justify-between z-50 pb-safe">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Icon size={24} className={isActive ? "fill-white/20" : ""} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}