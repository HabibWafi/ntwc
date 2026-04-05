'use client';
import { Bell, Search, Menu, LogOut, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import { useSidebarStore } from '@/stores/sidebar-store';
import { useAuth } from '@/hooks/useAuth';
import { ROLE_LABELS } from '@/lib/constants';
import { mockAlerts } from '@/mock/data/alerts';

export default function Topbar() {
  const { collapsed } = useSidebarStore();
  const { setMobileOpen } = useSidebarStore();
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const alertCount = mockAlerts.filter(a => a.status === 'open').length;

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white/80 backdrop-blur-md px-6 transition-all duration-300"
    >
      {/* Mobile menu button */}
      <button className="lg:hidden p-2 rounded-xl text-muted hover:bg-surface" onClick={() => setMobileOpen(true)}>
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative max-w-md flex-1 hidden sm:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-light" />
        <input
          type="text"
          placeholder="Cari komoditas, wilayah, petani..."
          className="w-full rounded-xl border border-border bg-surface py-2 pl-10 pr-4 text-sm text-foreground placeholder-muted-light outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button className="relative rounded-xl p-2 text-muted hover:bg-surface hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          {alertCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red text-[10px] font-bold text-white">
              {alertCount}
            </span>
          )}
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-xl border border-border px-3 py-1.5 hover:bg-surface transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-foreground">{user?.name || 'User'}</div>
              <div className="text-[10px] text-muted">{user?.role ? ROLE_LABELS[user.role] : ''}</div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-muted hidden sm:block" />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl border border-border bg-white py-1 shadow-lg">
                <button
                  onClick={() => { setDropdownOpen(false); logout(); }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Keluar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
