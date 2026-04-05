'use client';
import { useState } from 'react';
import { User, Bell, Globe, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { InfoCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAuthStore } from '@/stores/auth-store';
import { ROLE_LABELS } from '@/lib/constants';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [saving, setSaving] = useState(false);
  const [language, setLanguage] = useState('id');
  const [notifications, setNotifications] = useState({
    priceAlert: true,
    stockAlert: true,
    harvestReminder: true,
    systemUpdate: false,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Pengaturan</h1>
        <p className="text-sm text-muted mt-1">Kelola profil dan preferensi</p>
      </div>

      {/* Profile */}
      <InfoCard title="Profil" icon={<User className="h-4 w-4" />}>
        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-border">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 text-xl font-bold text-primary">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{user?.name || 'User'}</div>
              <div className="text-sm text-muted">{user?.email}</div>
              <Badge variant="info" className="mt-1">{ROLE_LABELS[user?.role || 'consumer']}</Badge>
            </div>
          </div>
          <Input label="Nama Lengkap" defaultValue={user?.name} />
          <Input label="Email" type="email" defaultValue={user?.email} disabled />
          <Input label="No. Telepon" defaultValue={user?.phone} />
          {user?.regionName && <Input label="Region" defaultValue={user.regionName} disabled />}
        </div>
      </InfoCard>

      {/* Language */}
      <InfoCard title="Bahasa" icon={<Globe className="h-4 w-4" />}>
        <Select
          label="Pilih Bahasa"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          options={[{ value: 'id', label: 'Bahasa Indonesia' }, { value: 'en', label: 'English' }]}
        />
      </InfoCard>

      {/* Notifications */}
      <InfoCard title="Notifikasi" icon={<Bell className="h-4 w-4" />}>
        <div className="space-y-3">
          {[
            { key: 'priceAlert', label: 'Alert Harga', desc: 'Notifikasi ketika harga melebihi HET atau berubah signifikan' },
            { key: 'stockAlert', label: 'Alert Stok', desc: 'Notifikasi ketika stok gudang di bawah threshold' },
            { key: 'harvestReminder', label: 'Pengingat Panen', desc: 'Pengingat jadwal panen berdasarkan data tanam' },
            { key: 'systemUpdate', label: 'Update Sistem', desc: 'Notifikasi update fitur dan maintenance' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <div className="text-xs font-semibold text-foreground">{item.label}</div>
                <div className="text-[10px] text-muted">{item.desc}</div>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  notifications[item.key as keyof typeof notifications] ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  notifications[item.key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </InfoCard>

      <Button onClick={handleSave} loading={saving} icon={<Save className="h-4 w-4" />}>
        Simpan Perubahan
      </Button>
    </div>
  );
}
