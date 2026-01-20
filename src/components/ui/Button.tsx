import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition focus:outline-none active:scale-95',
        variant === 'primary' &&
          'bg-green-500 hover:bg-green-400 text-black hover:scale-105',
        variant === 'ghost' &&
          'text-neutral-400 hover:text-white hover:bg-white/5',
        className
      )}
      {...props}
    />
  );
}
