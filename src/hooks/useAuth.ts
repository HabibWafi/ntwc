'use client';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useAuth() {
  const { user, token, isAuthenticated, login, logout: storeLogout } = useAuthStore();
  const router = useRouter();

  const handleLogin = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      login(data.data.user, data.data.token);
      router.push('/dashboard');
      return { success: true };
    }
    return { success: false, error: data.error?.message || 'Login gagal' };
  }, [login, router]);

  const handleLogout = useCallback(() => {
    storeLogout();
    router.push('/login');
  }, [storeLogout, router]);

  return { user, token, isAuthenticated, role: user?.role || null, login: handleLogin, logout: handleLogout };
}
