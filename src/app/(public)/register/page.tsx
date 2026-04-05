'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wheat, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Link from 'next/link';

const ROLE_OPTIONS = [
  { value: 'farmer', label: 'Petani' },
  { value: 'distributor', label: 'Distributor' },
  { value: 'consumer', label: 'Konsumen' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nik: '', name: '', email: '', phone: '', password: '', confirmPassword: '', role: 'farmer',
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card shadow-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-dark to-primary">
            <Wheat className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">Daftar Akun</div>
            <div className="text-xs text-muted">Langkah {step} dari 3</div>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all ${s <= step ? 'bg-primary' : 'bg-gray-200'}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <h2 className="text-lg font-bold text-foreground mb-1">Identitas</h2>
              <p className="text-xs text-muted mb-4">Masukkan NIK dan data pribadi</p>
              <Input label="NIK (16 digit)" value={form.nik} onChange={(e) => update('nik', e.target.value)} placeholder="3xxx xxxx xxxx xxxx" required />
              <Input label="Nama Lengkap" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Nama sesuai KTP" required />
              <Input label="No. Telepon" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="08xx xxxx xxxx" required />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-bold text-foreground mb-1">Akun & Role</h2>
              <p className="text-xs text-muted mb-4">Setup akun dan pilih peran</p>
              <Input label="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="email@contoh.com" required />
              <Input label="Password" type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="Min. 8 karakter" required />
              <Input label="Konfirmasi Password" type="password" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} placeholder="Ulangi password" required />
              <Select label="Peran" value={form.role} onChange={(e) => update('role', e.target.value)} options={ROLE_OPTIONS} />
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-bold text-foreground mb-1">Konfirmasi</h2>
              <p className="text-xs text-muted mb-4">Periksa data Anda</p>
              <div className="space-y-3 rounded-xl border border-border p-4">
                {[
                  ['NIK', form.nik],
                  ['Nama', form.name],
                  ['Telepon', form.phone],
                  ['Email', form.email],
                  ['Peran', ROLE_OPTIONS.find(r => r.value === form.role)?.label],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-muted">{label}</span>
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex items-center gap-3 pt-2">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)} icon={<ArrowLeft className="h-4 w-4" />}>
                Kembali
              </Button>
            )}
            <Button type="submit" loading={loading} className="flex-1" icon={step < 3 ? <ArrowRight className="h-4 w-4" /> : undefined}>
              {step < 3 ? 'Lanjut' : 'Daftar'}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">Masuk</Link>
        </p>
      </div>
    </div>
  );
}
