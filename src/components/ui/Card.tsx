import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  subtitle?: string;
  gradient?: string;
  className?: string;
}

export function StatCard({ title, value, change, trend, icon, subtitle, gradient = 'from-primary to-primary-light', className }: StatCardProps) {
  return (
    <div className={cn('group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all duration-300', className)}>
      <div className={cn('absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br opacity-10', gradient)} />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm', gradient)}>
            {icon}
          </div>
          {change !== undefined && trend && (
            <div className={cn(
              'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
              trend === 'up' && 'bg-green-50 text-green-600',
              trend === 'down' && 'bg-red-50 text-red-600',
              trend === 'stable' && 'bg-gray-50 text-gray-500'
            )}>
              {trend === 'up' && <TrendingUp className="h-3 w-3" />}
              {trend === 'down' && <TrendingDown className="h-3 w-3" />}
              {trend === 'stable' && <Minus className="h-3 w-3" />}
              {change > 0 ? '+' : ''}{change}%
            </div>
          )}
        </div>
        <div className="text-2xl font-extrabold text-foreground tracking-tight">{value}</div>
        <div className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-muted">{title}</div>
        {subtitle && <div className="mt-1 text-xs text-muted-light">{subtitle}</div>}
      </div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

export function InfoCard({ title, description, icon, children, className, headerAction }: InfoCardProps) {
  return (
    <div className={cn('rounded-2xl border border-border bg-card shadow-sm', className)}>
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <div>
            <h3 className="text-sm font-bold text-foreground">{title}</h3>
            {description && <p className="text-xs text-muted mt-0.5">{description}</p>}
          </div>
        </div>
        {headerAction}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
