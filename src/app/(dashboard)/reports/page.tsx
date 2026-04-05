'use client';
import { useState } from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { InfoCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const REPORT_TYPES = [
  { value: 'food_security', label: 'Ketahanan Pangan Nasional' },
  { value: 'price_monitoring', label: 'Monitoring Harga Komoditas' },
  { value: 'production', label: 'Produksi & Panen' },
  { value: 'bulog_stock', label: 'Stok & Distribusi Bulog' },
  { value: 'anomaly', label: 'Deteksi Anomali' },
];

const PAST_REPORTS = [
  { id: 'rpt-001', title: 'Laporan Ketahanan Pangan Q1 2026', type: 'food_security', date: '2026-03-20', format: 'PDF', size: '2.4 MB' },
  { id: 'rpt-002', title: 'Monitoring Harga Maret 2026', type: 'price_monitoring', date: '2026-03-28', format: 'Excel', size: '1.1 MB' },
  { id: 'rpt-003', title: 'Laporan Produksi Beras Semester I', type: 'production', date: '2026-02-15', format: 'PDF', size: '3.7 MB' },
];

export default function ReportsPage() {
  const [reportType, setReportType] = useState('food_security');
  const [format, setFormat] = useState('pdf');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Laporan</h1>
        <p className="text-sm text-muted mt-1">Generate dan download laporan</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="Generate Laporan Baru" icon={<FileText className="h-4 w-4" />}>
          <div className="space-y-4">
            <Select label="Jenis Laporan" value={reportType} onChange={(e) => setReportType(e.target.value)} options={REPORT_TYPES} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Dari Tanggal" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              <Input label="Sampai Tanggal" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
            <Select label="Format" value={format} onChange={(e) => setFormat(e.target.value)}
              options={[{ value: 'pdf', label: 'PDF' }, { value: 'excel', label: 'Excel (.xlsx)' }, { value: 'csv', label: 'CSV' }]} />
            <Button onClick={handleGenerate} loading={generating} icon={<Download className="h-4 w-4" />} className="w-full">
              {generating ? 'Generating...' : 'Generate Laporan'}
            </Button>
          </div>
        </InfoCard>

        <InfoCard title="Riwayat Laporan" icon={<Calendar className="h-4 w-4" />}>
          <div className="space-y-3">
            {PAST_REPORTS.map(rpt => (
              <div key={rpt.id} className="flex items-center justify-between rounded-xl border border-border p-4 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary-light/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{rpt.title}</div>
                    <div className="text-[10px] text-muted">{rpt.date} • {rpt.size}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="neutral">{rpt.format}</Badge>
                  <Button variant="ghost" size="sm" icon={<Download className="h-3.5 w-3.5" />}>
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
