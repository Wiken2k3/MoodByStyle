import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
          {title}
        </h2>

        <button className="text-sm font-semibold text-text-muted hover:text-white">
          Show all
        </button>
      </div>

      {/* Content */}
      {children}
    </section>
  );
}
