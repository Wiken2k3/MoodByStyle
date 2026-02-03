'use client';

import { Home, Search, LibraryBig } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'search', label: 'Search', icon: Search, href: '/search' },
    { id: 'library', label: 'Library', icon: LibraryBig, href: '/library' },
  ];

  return (
    <nav suppressHydrationWarning className="md:hidden fixed bottom-24 sm:bottom-24 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-neutral-800/50 px-4 py-2">
      <div className="flex items-center justify-around gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-green-500/20 text-green-400'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Icon size={22} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
