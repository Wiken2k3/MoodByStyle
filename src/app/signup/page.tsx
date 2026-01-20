'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { Eye, EyeOff, Music } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading, error, clearError, user } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Redirect if already logged in
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted && user) {
      router.push('/dashboard');
    }
  }, [user, router, mounted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPasswordMatch(password === confirmPassword || confirmPassword === '');
    }, 0);
    return () => clearTimeout(timer);
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (password !== confirmPassword) {
      return;
    }

    const success = await signup(name, email, password);
    if (success) {
      router.push('/dashboard');
    }
  };

  if (!mounted) return null;

  const passwordStrength = {
    length: password.length >= 6,
    hasNumber: /\d/.test(password),
    hasSymbol: /[!@#$%^&*]/.test(password),
  };

  const isPasswordStrong =
    password.length >= 6 && passwordMatch && name.trim() !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="p-2 bg-green-500 rounded-lg">
            <Music className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-bold text-white">Spotify Clone</span>
        </div>

        {/* Signup Card */}
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-neutral-400 mb-8">Join us and start listening</p>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        passwordStrength.length
                          ? 'bg-green-500'
                          : 'bg-neutral-600'
                      }`}
                    />
                    <span
                      className={
                        passwordStrength.length
                          ? 'text-green-400'
                          : 'text-neutral-400'
                      }
                    >
                      At least 6 characters
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className={`w-full bg-neutral-800/50 border rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all duration-300 pr-12 ${
                    confirmPassword && !passwordMatch
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-neutral-700 focus:border-green-500 focus:ring-green-500/20'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordMatch && (
                <p className="text-red-400 text-xs mt-2">Passwords do not match</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded accent-green-500"
                required
              />
              <label htmlFor="terms" className="text-xs text-neutral-400">
                I agree to the Terms and Conditions and Privacy Policy
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading || !isPasswordStrong}
              className="w-full bg-green-500 hover:bg-green-600 disabled:hover:bg-green-500 text-black font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="border-t border-neutral-700 mt-6 pt-6">
            <p className="text-center text-neutral-400">
              Already have an account?{' '}
              <Link href="/login" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-neutral-500 text-xs mt-6">
          By signing up, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
}
