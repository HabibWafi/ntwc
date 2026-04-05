'use client';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="mb-1.5 block text-xs font-semibold text-foreground">{label}</label>}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full appearance-none rounded-xl border border-border bg-white py-2.5 pl-4 pr-10 text-sm text-foreground outline-none transition-all',
              'focus:border-primary focus:ring-2 focus:ring-primary/20',
              error && 'border-red focus:border-red focus:ring-red/20',
              className
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-light pointer-events-none" />
        </div>
        {error && <p className="mt-1 text-xs text-red">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
