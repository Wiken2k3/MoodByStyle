'use client';

import { Home, Search, LibraryBig } from 'lucide-react';
import { useState } from 'react';

export function MobileNav() {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Library', icon: LibraryBig },
  ];

  return (
    <nav className="md:hidden fixed bottom-24 sm:bottom-24 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-neutral-800/50 px-4 py-2">
      <div className="flex items-center justify-around gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-green-500/20 text-green-400'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Icon size={22} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
