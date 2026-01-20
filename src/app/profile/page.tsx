'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Image from 'next/image';
import { Music, LogOut, Edit2, Check, X } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateProfile, isLoading, error, clearError } =
    useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push('/login');
    } else if (mounted && user) {
      setEditName(user.name);
    }
  }, [user, router, mounted]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleUpdateProfile = async () => {
    clearError();
    const success = await updateProfile(editName);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditName(user?.name || '');
    setIsEditing(false);
    clearError();
  };

  if (!mounted || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-neutral-800">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Music className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-xl font-bold text-white">Spotify Clone</h1>
          </div>
          <Link href="/dashboard">
            <button className="text-neutral-400 hover:text-white text-sm font-semibold transition-colors">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Profile Card */}
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-green-500 mb-6 shadow-lg shadow-green-500/30">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>

            {isEditing ? (
              <div className="w-full max-w-sm space-y-4">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-4 py-3 text-white text-center font-bold text-2xl placeholder-neutral-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
              />
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={handleUpdateProfile}
                    disabled={isLoading || !editName.trim()}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
                  >
                    <Check size={18} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2 rounded-lg transition-all duration-300"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {user.name}
                </h2>
                <p className="text-neutral-400 mb-6">{user.email}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              </>
            )}
          </div>

          {/* Profile Details */}
          {!isEditing && (
            <div className="border-t border-neutral-700 pt-8">
              <h3 className="text-lg font-bold text-white mb-6">
                Account Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-neutral-700">
                  <span className="text-neutral-400">Name</span>
                  <span className="text-white font-semibold">{user.name}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-neutral-700">
                  <span className="text-neutral-400">Email</span>
                  <span className="text-white font-semibold">{user.email}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-neutral-700">
                  <span className="text-neutral-400">Member Since</span>
                  <span className="text-white font-semibold">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Account ID</span>
                  <span className="text-white font-mono text-sm">{user.id}</span>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          {!isEditing && (
            <div className="border-t border-neutral-700 mt-8 pt-8">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 font-bold py-3 rounded-lg transition-all duration-300 border border-red-500/50 hover:border-red-500"
              >
                <LogOut size={20} />
                Log Out
              </button>
            </div>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/50 rounded-xl p-4 text-sm text-blue-300">
          <p className="font-semibold mb-2">Demo Account Note:</p>
          <p>
            This is a demo application. Your account data is stored locally in your browser. Use demo@example.com / demo123 to test the app.
          </p>
        </div>
      </div>
    </div>
  );
}
