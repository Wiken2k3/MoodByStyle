import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-6 sm:space-y-8 group">
      {/* Header with Enhanced Styling */}
      <div className="flex items-end justify-between group/header">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white transition-all duration-300">
            <span className="inline-block bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent group-hover/header:from-green-400 group-hover/header:via-white group-hover/header:to-blue-300 transition-all duration-300">
              {title}
            </span>
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transform origin-left group-hover/header:w-24 transition-all duration-300" />
        </div>

        <button className="flex items-center gap-1 text-sm font-semibold text-neutral-400 hover:text-green-400 transition-all duration-300 group/btn opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">
          <span>Show all</span>
          <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Content with Animation */}
      <div className="animate-fadeIn">
        {children}
      </div>
    </section>
  );
}
