'use client';

import { Play, Heart, Music } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function HomeHeader() {
  const [greeting, setGreeting] = useState('Good evening');
  const [date, setDate] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const now = new Date();
    const hour = now.getHours();
    const newGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    
    setGreeting(newGreeting);
    setDate(
      now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      })
    );
  }, []);

  return (
    <div suppressHydrationWarning className="-mx-8 -mt-8 px-4 sm:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20 bg-gradient-to-br from-green-900/50 via-black to-black relative overflow-hidden border-b border-white/5">
      {/* Animated Background Elements */}
      <div suppressHydrationWarning className="absolute inset-0 overflow-hidden">
        <div suppressHydrationWarning className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] animate-pulse" />
        <div suppressHydrationWarning className="absolute -bottom-20 -left-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div suppressHydrationWarning className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className={`relative z-10 flex flex-col gap-8 sm:gap-12 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Music Icon with Animation */}
          <div className="inline-flex items-center gap-3 bg-green-500/20 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-green-500/30 w-fit animate-fadeIn">
            <div suppressHydrationWarning className="relative w-6 h-6 sm:w-8 sm:h-8">
              <Music size={20} className="text-green-400 animate-bounce" style={{animationDelay: '0s'}} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-green-300">Your Music Journey</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-2 sm:space-y-4">
            <h1 className={`text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{animationDelay: '100ms'}}>
              <span className="bg-gradient-to-r from-white via-green-200 to-neutral-400 bg-clip-text text-transparent">
                {greeting}
              </span>
            </h1>
            <p className="text-lg sm:text-2xl text-neutral-400 font-light max-w-3xl leading-relaxed">
              Enjoy your favorite music anytime, anywhere. Discover new sounds and enjoy smooth playback with beautiful animations.
            </p>
            <p className="text-sm sm:text-base text-neutral-400 font-medium">
              {date}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{animationDelay: '200ms'}}>
          <button
            className="relative group flex items-center gap-3 rounded-full bg-green-500 hover:bg-green-400 active:bg-green-600 px-8 sm:px-10 py-4 text-base sm:text-lg font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-105 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 animate-pulse" />
            <Play size={20} fill="black" className="relative group-hover:scale-125 transition-transform" />
            <span className="relative font-semibold">Play Now</span>
          </button>

          <Link
            href="/liked"
            className="flex items-center gap-3 rounded-full border-2 border-white/10 hover:border-white/40 bg-white/5 hover:bg-white/10 px-8 sm:px-10 py-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 group hover:scale-105 active:scale-95"
          >
            <Heart
              size={20}
              className="group-hover:fill-current group-hover:scale-110 transition-all"
            />
            <span className="relative">Favorites</span>
          </Link>
        </div>

        {/* Stats */}
        <div className={`flex flex-wrap gap-6 sm:gap-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{animationDelay: '300ms'}}>
          <div className="space-y-2">
            <p className="text-3xl sm:text-4xl font-bold text-white">1000+</p>
            <p className="text-xs sm:text-sm text-neutral-400">Premium Tracks</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl sm:text-4xl font-bold text-white">50+</p>
            <p className="text-xs sm:text-sm text-neutral-400">Curated Playlists</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl sm:text-4xl font-bold text-white">100%</p>
            <p className="text-xs sm:text-sm text-neutral-400">Ad-Free Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
}
