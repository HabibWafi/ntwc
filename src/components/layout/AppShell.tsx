'use client';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useSidebarStore } from '@/stores/sidebar-store';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebarStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-[260px] transition-all duration-300" style={collapsed ? { marginLeft: 68 } : undefined}>
        <Topbar />
        <main className="p-6">
          <div className="mx-auto max-w-[1400px] animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
