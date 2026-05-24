import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Card({
  children,
  selected = false,
  onClick,
  className = '',
}: CardProps) {
  const baseClasses = 'rounded-lg p-6 transition-all duration-200 cursor-pointer';
  const selectedClasses = selected
    ? 'border-2 border-primary bg-primary/5 shadow-lg'
    : 'border-2 border-gray-200 hover:border-primary/50 hover:shadow-md';

  return (
    <div
      className={`${baseClasses} ${selectedClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
