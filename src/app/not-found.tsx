import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <div className="text-6xl font-extrabold text-primary mb-2">404</div>
      <h1 className="text-xl font-bold text-foreground mb-2">Halaman Tidak Ditemukan</h1>
      <p className="text-sm text-muted mb-6 max-w-md">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
