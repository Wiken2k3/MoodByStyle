import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/app/layout/AppShell';
import { SplashScreen } from '@/components/SplashScreen';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Spotify UI clone with Next.js + Tailwind',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        suppressHydrationWarning
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-black
          text-text-body
          overflow-hidden
        `}
      >
        <SplashScreen />
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
