'use client';
import { useState } from 'react';
import { ArrowLeft, Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/Card';
import Link from 'next/link';

export default function UploadFarmDataPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'preview' | 'uploading' | 'done' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setStatus('preview');
    }
  };

  const handleUpload = async () => {
    setStatus('uploading');
    await new Promise(r => setTimeout(r, 2000));
    setStatus('done');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/farm-data">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>Kembali</Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Upload Data Pertanian</h1>
          <p className="text-sm text-muted mt-1">Upload file CSV atau Excel untuk input data massal</p>
        </div>
      </div>

      <InfoCard title="Upload File" icon={<FileSpreadsheet className="h-4 w-4" />}>
        {status === 'idle' && (
          <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-10 cursor-pointer hover:border-primary/50 hover:bg-primary-bg/50 transition-all">
            <Upload className="h-10 w-10 text-muted mb-3" />
            <span className="text-sm font-semibold text-foreground">Klik untuk pilih file</span>
            <span className="text-xs text-muted mt-1">CSV atau Excel (.xlsx) — max 5MB</span>
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} className="hidden" />
          </label>
        )}

        {status === 'preview' && file && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-border p-4">
              <FileSpreadsheet className="h-8 w-8 text-primary" />
              <div>
                <div className="text-sm font-semibold text-foreground">{file.name}</div>
                <div className="text-xs text-muted">{(file.size / 1024).toFixed(1)} KB</div>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
                <AlertCircle className="h-4 w-4" />
                Preview: File siap diupload
              </div>
              <p className="text-xs text-amber-600 mt-1">
                Pastikan format kolom sesuai template: Komoditas, Region, Luas, Estimasi Panen, Tanggal Tanam
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleUpload} icon={<Upload className="h-4 w-4" />}>Upload & Proses</Button>
              <Button variant="outline" onClick={() => { setFile(null); setStatus('idle'); }}>Batal</Button>
            </div>
          </div>
        )}

        {status === 'uploading' && (
          <div className="flex flex-col items-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent mb-3" />
            <p className="text-sm font-semibold text-foreground">Memproses file...</p>
            <p className="text-xs text-muted mt-1">Validasi dan import data</p>
          </div>
        )}

        {status === 'done' && (
          <div className="flex flex-col items-center py-10">
            <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-3" />
            <p className="text-sm font-semibold text-foreground">Upload Berhasil!</p>
            <p className="text-xs text-muted mt-1">Data telah berhasil diimport</p>
            <Link href="/farm-data" className="mt-4">
              <Button size="sm">Lihat Data</Button>
            </Link>
          </div>
        )}
      </InfoCard>

      <InfoCard title="Template Download">
        <p className="text-xs text-muted mb-3">Download template berikut untuk memastikan format data yang benar:</p>
        <Button variant="outline" size="sm" icon={<FileSpreadsheet className="h-4 w-4" />}>
          Download Template CSV
        </Button>
      </InfoCard>
    </div>
  );
}
