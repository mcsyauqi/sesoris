import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  reviewCount,
  className,
}: RatingProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, index) => {
          const filled = index < Math.floor(value);
          const halfFilled = !filled && index < value;

          return (
            <Star
              key={index}
              className={cn(
                sizes[size],
                filled
                  ? 'text-[#FFD93D] fill-[#FFD93D]'
                  : halfFilled
                  ? 'text-[#FFD93D] fill-[#FFD93D]/50'
                  : 'text-[#E9ECEF] fill-[#E9ECEF]'
              )}
            />
          );
        })}
      </div>
      {(showValue || reviewCount !== undefined) && (
        <span className={cn('text-[#6C757D]', textSizes[size])}>
          {showValue && value.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="ml-1">({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
