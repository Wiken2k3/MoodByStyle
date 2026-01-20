'use client';

import { useRouter } from 'next/navigation';
import { X, LogIn } from 'lucide-react';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function LoginRequiredModal({
  isOpen,
  onClose,
  title = 'Sign in to continue',
  message = 'Enjoy your favorite music and create playlists with your account',
}: LoginRequiredModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 max-w-sm mx-4 shadow-2xl animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-neutral-800 rounded-full transition-colors"
        >
          <X size={20} className="text-neutral-400" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-green-500/20 rounded-full">
            <LogIn size={24} className="text-green-500" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">{title}</h2>
        <p className="text-neutral-400 text-center mb-8">{message}</p>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              router.push('/login');
              onClose();
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              router.push('/signup');
              onClose();
            }}
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Create Account
          </button>
          <button
            onClick={onClose}
            className="w-full text-neutral-400 hover:text-white font-semibold py-3 transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
