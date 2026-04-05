'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <div className="text-4xl font-extrabold text-red-500 mb-2">Error</div>
      <h1 className="text-xl font-bold text-foreground mb-2">Terjadi Kesalahan</h1>
      <p className="text-sm text-muted mb-6 max-w-md">
        {error.message || 'Sesuatu tidak berjalan sesuai rencana. Silakan coba lagi.'}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  );
}
