'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Wheat, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import { useSidebarStore } from '@/stores/sidebar-store';
import { getNavigationForRole } from '@/config/navigation';
import { useTranslations } from 'next-intl';

export default function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations();
  const { user } = useAuthStore();
  const { collapsed, mobileOpen, toggle, setMobileOpen } = useSidebarStore();
  const role = user?.role || 'consumer';
  const sections = getNavigationForRole(role);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={cn(
        'fixed left-0 top-0 z-50 h-screen flex flex-col border-r border-border bg-white transition-all duration-300',
        collapsed ? 'w-[68px]' : 'w-[260px]',
        'max-lg:w-[260px]',
        mobileOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
      )}>
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-dark to-primary">
              <Wheat className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div className="animate-fade-in overflow-hidden">
                <div className="text-sm font-bold text-foreground leading-tight">Nusantara</div>
                <div className="text-[10px] font-semibold text-primary tracking-wide">TwinChain</div>
              </div>
            )}
          </div>
          <button className="lg:hidden p-1 rounded-lg hover:bg-surface" onClick={() => setMobileOpen(false)}>
            <X className="h-5 w-5 text-muted" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {sections.map((section) => (
            <div key={section.labelKey} className="mb-4">
              {!collapsed && (
                <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-light">
                  {t(section.labelKey)}
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-sm'
                          : 'text-muted hover:bg-surface hover:text-foreground'
                      )}
                      title={collapsed ? t(item.labelKey) : undefined}
                    >
                      <Icon className={cn('h-5 w-5 shrink-0 transition-colors', isActive ? 'text-primary' : 'text-muted-light group-hover:text-foreground')} />
                      {!collapsed && (
                        <span className="animate-fade-in truncate">{t(item.labelKey)}</span>
                      )}
                      {!collapsed && item.badge && (
                        <span className={cn(
                          'ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-bold',
                          item.badge === 'soon' && 'bg-gray-100 text-gray-500',
                          item.badge === 'beta' && 'bg-violet-100 text-violet-600',
                          item.badge === 'new' && 'bg-primary-bg text-primary',
                        )}>
                          {item.badge.toUpperCase()}
                        </span>
                      )}
                      {isActive && !collapsed && (
                        <div className="ml-auto h-2 w-2 shrink-0 rounded-full bg-primary animate-fade-in" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse Toggle - desktop only */}
        <div className="hidden lg:block border-t border-border p-3">
          <button onClick={toggle} className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-medium text-muted hover:bg-surface hover:text-foreground transition-colors">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
