'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Wheat, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import { mockUsers } from '@/mock/data/users';
import { ROLE_LABELS } from '@/lib/constants';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || 'Login gagal');
    }
    setLoading(false);
  };

  const quickLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('demo123');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[900px] grid lg:grid-cols-2 gap-0 rounded-3xl border border-border bg-card shadow-xl overflow-hidden">
        {/* Left - Form */}
        <div className="p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-dark to-primary">
              <Wheat className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">Nusantara TwinChain</div>
              <div className="text-xs text-muted">Platform Komoditas Pertanian</div>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-foreground mb-1">Masuk ke Platform</h1>
          <p className="text-sm text-muted mb-6">Gunakan akun demo untuk mencoba platform</p>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              icon={<Mail className="h-4 w-4" />}
              required
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                icon={<Lock className="h-4 w-4" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-muted-light hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Button type="submit" loading={loading} className="w-full">
              Masuk
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted">
            Belum punya akun?{' '}
            <Link href="/register" className="font-semibold text-primary hover:underline">Daftar</Link>
          </p>
        </div>

        {/* Right - Demo Accounts */}
        <div className="bg-surface border-l border-border p-8 lg:p-10 hidden lg:block">
          <h3 className="text-sm font-bold text-foreground mb-1">Akun Demo</h3>
          <p className="text-xs text-muted mb-4">Klik untuk mengisi otomatis (password: demo123)</p>

          <div className="space-y-2">
            {mockUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => quickLogin(user.email)}
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-white p-3 text-left hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 text-xs font-bold text-primary">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-foreground truncate">{user.name}</div>
                  <div className="text-[10px] text-muted truncate">{user.email}</div>
                </div>
                <Badge variant={
                  user.role === 'superadmin' ? 'danger' :
                  user.role === 'gov_central' ? 'purple' :
                  user.role === 'gov_regional' ? 'info' :
                  user.role === 'bulog' ? 'warning' :
                  user.role === 'farmer' ? 'success' :
                  'neutral'
                }>
                  {ROLE_LABELS[user.role]}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
