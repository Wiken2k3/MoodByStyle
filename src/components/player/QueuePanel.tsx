'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { Play, Clock, History } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function QueuePanel() {
  const {
    currentTrack,
    queue,
    queueIndex,
    recentTracks,
    playTrack,
  } = usePlayerStore();

  const [activeTab, setActiveTab] = useState<'now' | 'next' | 'recent'>('now');

  const nextTracks = queue.slice(queueIndex + 1, queueIndex + 8);

  const handlePlayTrack = (track: typeof queue[0]) => {
    playTrack(track, queue);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-neutral-950 to-black">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800">
        <h2 className="text-lg font-bold text-white">Queue</h2>
        <p className="text-xs text-neutral-400 mt-1">
          {queue.length} track{queue.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 px-2 pt-3 border-b border-neutral-800 bg-neutral-900/50">
        {(['now', 'next', 'recent'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
              activeTab === tab
                ? 'border-green-500 text-green-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-300'
            }`}
          >
            {tab === 'now' && 'Now Playing'}
            {tab === 'next' && `Next Up (${nextTracks.length})`}
            {tab === 'recent' && `Recent (${recentTracks.length})`}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Now Playing Tab */}
        {activeTab === 'now' && currentTrack && (
          <div className="p-4">
            <div className="bg-gradient-to-b from-green-500/20 to-green-500/5 rounded-lg p-4 border border-green-500/30 mb-4">
              <div className="flex gap-3">
                {currentTrack.imageUrl ? (
                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={currentTrack.imageUrl}
                      alt={currentTrack.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-md bg-gradient-to-br from-green-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎵</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Play size={14} className="text-green-400 flex-shrink-0" />
                    <span className="text-xs font-semibold text-green-400">PLAYING</span>
                  </div>
                  <p className="text-sm font-bold text-white truncate">
                    {currentTrack.title}
                  </p>
                  <p className="text-xs text-neutral-400 truncate">
                    {currentTrack.artist}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Up Tab */}
        {activeTab === 'next' && (
          <div className="p-4">
            {nextTracks.length > 0 ? (
              <div className="space-y-2">
                {nextTracks.map((track, idx) => (
                  <button
                    key={`${track.id}-${idx}`}
                    onClick={() => handlePlayTrack(track)}
                    className="w-full group text-left p-2 rounded-lg hover:bg-neutral-800/50 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-2">
                      {track.imageUrl ? (
                        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mt-0.5">
                          <Image
                            src={track.imageUrl}
                            alt={track.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                            <Play size={16} fill="white" className="text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-md bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm">🎵</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-neutral-400 flex-shrink-0">
                            #{idx + 1}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-white truncate group-hover:text-green-400 transition-colors">
                          {track.title}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">
                          {track.artist}
                        </p>
                      </div>
                      <span className="text-xs text-neutral-500 flex-shrink-0 mt-0.5">
                        {track.duration}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock size={32} className="mx-auto text-neutral-600 mb-2 opacity-50" />
                <p className="text-neutral-400 text-sm">No tracks coming up</p>
              </div>
            )}
          </div>
        )}

        {/* Recent Tab */}
        {activeTab === 'recent' && (
          <div className="p-4">
            {recentTracks.length > 0 ? (
              <div className="space-y-2">
                {recentTracks.map((track, idx) => (
                  <button
                    key={`${track.id}-recent-${idx}`}
                    onClick={() => handlePlayTrack(track)}
                    className="w-full group text-left p-2 rounded-lg hover:bg-neutral-800/50 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-2">
                      {track.imageUrl ? (
                        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mt-0.5">
                          <Image
                            src={track.imageUrl}
                            alt={track.title}
                            fill
                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                            <Play size={16} fill="white" className="text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-md bg-gradient-to-br from-neutral-700/50 to-neutral-600/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm opacity-50">🎵</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <History size={12} className="text-neutral-500 flex-shrink-0" />
                        </div>
                        <p className="text-xs font-semibold text-neutral-300 truncate group-hover:text-green-400 transition-colors">
                          {track.title}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">
                          {track.artist}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <History size={32} className="mx-auto text-neutral-600 mb-2 opacity-50" />
                <p className="text-neutral-400 text-sm">No recent tracks</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
