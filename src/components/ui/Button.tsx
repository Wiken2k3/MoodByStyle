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
        'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none',
        variant === 'primary' &&
          'bg-brand-primary-500 text-black hover:scale-105',
        variant === 'ghost' &&
          'text-text-body hover:text-white',
        className
      )}
      {...props}
    />
  );
}
