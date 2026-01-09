import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'sale' | 'new' | 'soldout' | 'success' | 'warning';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-[#1B5E3B] text-white',
    sale: 'bg-[#FF6B35] text-white',
    new: 'bg-[#20C997] text-white',
    soldout: 'bg-[#6C757D] text-white',
    success: 'bg-[#28A745] text-white',
    warning: 'bg-[#FFC107] text-[#212529]',
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-1 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-semibold uppercase tracking-wide rounded',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
