'use client';

import { forwardRef, cloneElement, isValidElement, Children } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-[#1B5E3B] text-white hover:bg-[#2E7D4A] focus-visible:ring-[#1B5E3B]',
      secondary:
        'bg-[#E8F5E9] text-[#1B5E3B] hover:bg-[#1B5E3B] hover:text-white focus-visible:ring-[#1B5E3B]',
      outline:
        'border-2 border-[#1B5E3B] text-[#1B5E3B] bg-transparent hover:bg-[#1B5E3B] hover:text-white focus-visible:ring-[#1B5E3B]',
      ghost:
        'text-[#1B5E3B] bg-transparent hover:bg-[#E8F5E9] focus-visible:ring-[#1B5E3B]',
      link: 'text-[#1B5E3B] bg-transparent hover:underline underline-offset-4 focus-visible:ring-[#1B5E3B] p-0 h-auto',
      danger:
        'bg-[#DC3545] text-white hover:bg-[#c82333] focus-visible:ring-[#DC3545]',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm rounded-md gap-1.5',
      md: 'h-10 px-4 text-sm rounded-lg gap-2',
      lg: 'h-12 px-6 text-base rounded-lg gap-2',
      xl: 'h-14 px-8 text-lg rounded-xl gap-3',
      icon: 'h-10 w-10 rounded-lg',
    };

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(combinedClassName, (children as React.ReactElement<{ className?: string }>).props.className),
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
