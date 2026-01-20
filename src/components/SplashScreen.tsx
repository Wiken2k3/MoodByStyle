'use client';

import { useEffect, useState } from 'react';
import { Music } from 'lucide-react';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black">
      {/* Logo with animation */}
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 rounded-full blur-2xl animate-pulse opacity-75" />
        <div className="relative w-full h-full bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50">
          <Music className="w-12 h-12 text-black" />
        </div>
      </div>

      {/* Text */}
      <h1 className="text-4xl font-black text-white mb-2">Spotify Clone</h1>
      <p className="text-neutral-400 text-sm">Loading your music...</p>

      {/* Loading bar */}
      <div className="mt-8 w-32 h-1 bg-neutral-800 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 rounded-full animate-[slideIn_2s_ease-in-out_forwards]" />
      </div>
    </div>
  );
}
