import { ReactNode } from 'react';

export function SectionTitle({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h2 className="mb-4 text-2xl font-bold text-text-heading">
      {children}
    </h2>
  );
}
