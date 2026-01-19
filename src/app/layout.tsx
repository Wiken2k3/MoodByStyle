import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';

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
    <html lang="en" className="dark">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-black
          text-text-body
        `}
      >
        <AppShell>
          <main
            className="
              h-full
              overflow-y-auto
              rounded-3xl
              bg-background-primary
            "
          >
            {children}
          </main>
        </AppShell>
      </body>
    </html>
  );
}
