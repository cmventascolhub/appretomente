import React from 'react';

interface ProgressBarProps {
  progressPercent: number;
  color?: string;
  heightClass?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercent,
  color = '#4C5CD0',
  heightClass = 'h-4',
  className = '',
}) => {
  const clamped = Math.max(0, Math.min(100, progressPercent));

  return (
    <div
      className={`w-full ${heightClass} rounded-full bg-[#4C5CD0]/10 overflow-hidden ${className}`}
    >
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${clamped}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};
