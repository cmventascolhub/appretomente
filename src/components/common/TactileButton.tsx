import React from 'react';

export type TactileVariant =
  | 'primary'
  | 'secondary'
  | 'math'
  | 'language'
  | 'memory'
  | 'logic'
  | 'white';

interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TactileVariant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const variantClassMap: Record<TactileVariant, string> = {
    primary: 'btn-tactile-primary',
    secondary: 'btn-tactile-secondary',
    math: 'btn-tactile-math',
    language: 'btn-tactile-language',
    memory: 'btn-tactile-memory',
    logic: 'btn-tactile-logic',
    white: 'btn-tactile-white',
  };

  const sizeClassMap = {
    sm: 'py-2 px-3 text-xs min-h-[38px] rounded-xl',
    md: 'py-2.5 px-5 text-sm min-h-[48px] rounded-2xl',
    lg: 'py-3.5 px-8 text-base min-h-[56px] rounded-2xl',
  };

  const disabledClass = disabled
    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none border-transparent active:transform-none pointer-events-none'
    : '';

  return (
    <button
      disabled={disabled}
      className={`font-heading font-bold select-none transition-all flex items-center justify-center gap-2 ${
        fullWidth ? 'w-full' : ''
      } ${sizeClassMap[size]} ${disabled ? disabledClass : variantClassMap[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
