'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  className,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const sizes = {
    sm: {
      container: 'h-8',
      button: 'w-8',
      icon: 'w-3 h-3',
      text: 'text-sm w-8',
    },
    md: {
      container: 'h-10',
      button: 'w-10',
      icon: 'w-4 h-4',
      text: 'text-base w-10',
    },
    lg: {
      container: 'h-12',
      button: 'w-12',
      icon: 'w-5 h-5',
      text: 'text-lg w-12',
    },
  };

  return (
    <div
      className={cn(
        'inline-flex items-center border border-[#E9ECEF] rounded-lg overflow-hidden',
        sizes[size].container,
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className={cn(
          'flex items-center justify-center bg-[#F8F9FA] hover:bg-[#E9ECEF] transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizes[size].button,
          sizes[size].container
        )}
      >
        <Minus className={sizes[size].icon} />
      </button>
      <span
        className={cn(
          'flex items-center justify-center font-medium text-[#212529] bg-white',
          sizes[size].text,
          sizes[size].container
        )}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className={cn(
          'flex items-center justify-center bg-[#F8F9FA] hover:bg-[#E9ECEF] transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizes[size].button,
          sizes[size].container
        )}
      >
        <Plus className={sizes[size].icon} />
      </button>
    </div>
  );
}
