'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`
        sticky
        top-0
        z-20
        flex
        items-center
        justify-between
        px-10
        py-4
        transition
        ${
          scrolled
            ? 'bg-background-primary/90 backdrop-blur'
            : 'bg-transparent'
        }
      `}
    >
      {/* Navigation */}
      <div className="flex items-center gap-3">
        <NavButton>
          <ChevronLeft size={20} />
        </NavButton>
        <NavButton>
          <ChevronRight size={20} />
        </NavButton>
      </div>

      {/* User */}
      <button
        className="
          flex
          items-center
          gap-2
          rounded-full
          bg-black/40
          px-2
          py-1
          hover:bg-black/60
          transition
        "
      >
        <div className="h-7 w-7 rounded-full bg-neutral-800" />
        <span className="pr-2 text-sm font-semibold text-white">
          User
        </span>
      </button>
    </div>
  );
}

function NavButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        bg-black/40
        text-white
        hover:bg-black/60
        transition
      "
    >
      {children}
    </button>
  );
}
