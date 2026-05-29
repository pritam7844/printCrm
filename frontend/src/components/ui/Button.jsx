import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-dark',
    accent: 'bg-accent text-white hover:bg-accent-hover',
    secondary: 'border border-paper-border bg-white text-brand-dark hover:border-brand-line hover:bg-brand-soft',
    ghost: 'text-ink-light hover:bg-paper-soft hover:text-ink'
  };

  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
