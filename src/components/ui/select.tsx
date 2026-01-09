'use client';

import { Fragment } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
  fullWidth?: boolean;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  label,
  error,
  className,
  fullWidth = false,
}: SelectProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', className)}>
      {label && (
        <label className="text-sm font-medium text-[#343A40]">{label}</label>
      )}
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <ListboxButton
            className={cn(
              'relative w-full h-10 pl-4 pr-10 text-left text-sm rounded-lg border bg-white cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-[#1B5E3B] focus:border-transparent',
              'transition-all duration-200',
              error ? 'border-[#DC3545]' : 'border-[#E9ECEF]'
            )}
          >
            <span
              className={cn(
                'block truncate',
                !selectedOption && 'text-[#6C757D]'
              )}
            >
              {selectedOption?.label || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-4 w-4 text-[#6C757D]" aria-hidden="true" />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  className={({ focus }) =>
                    cn(
                      'relative cursor-pointer select-none py-2 pl-10 pr-4',
                      focus ? 'bg-[#E8F5E9] text-[#1B5E3B]' : 'text-[#212529]'
                    )
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={cn(
                          'block truncate',
                          selected ? 'font-medium' : 'font-normal'
                        )}
                      >
                        {option.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#1B5E3B]">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
      {error && <p className="text-xs text-[#DC3545]">{error}</p>}
    </div>
  );
}
