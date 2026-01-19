import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description?: string;
  cover?: ReactNode;
}

export function Card({ title, description, cover }: CardProps) {
  return (
    <div className="card-hover cursor-pointer rounded-2xl bg-background-tertiary p-5 transition hover:bg-neutral-800">
      <div className="mb-4 aspect-square rounded-xl bg-neutral-700 overflow-hidden">
        {cover}
      </div>

      <p className="truncate font-semibold text-text-heading">
        {title}
      </p>

      {description && (
        <p className="mt-1 line-clamp-2 text-sm text-text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
