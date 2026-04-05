import clsx from "clsx";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return clsx(inputs);
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(1)}M`;
  if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(1)}jt`;
  if (value >= 1_000) return `Rp ${value.toLocaleString("id-ID")}`;
  return `Rp ${value}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("id-ID");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  return `${Math.floor(diffHours / 24)} hari lalu`;
}

export function formatWeight(tons: number): string {
  if (tons >= 1000) return `${(tons / 1000).toFixed(1)}K ton`;
  return `${formatNumber(tons)} ton`;
}

export function formatPercent(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'success', planted: 'info', growing: 'warning', harvested: 'success', reported: 'neutral',
    surplus: 'success', deficit: 'danger', balanced: 'info',
    open: 'danger', investigating: 'warning', resolved: 'success', false_positive: 'neutral',
    pending: 'warning', paid: 'info', shipped: 'purple', delivered: 'success', completed: 'success', disputed: 'danger', cancelled: 'neutral',
    'in-transit': 'info', delayed: 'danger',
    low: 'info', medium: 'warning', high: 'danger', critical: 'danger',
  };
  return colors[status] || 'neutral';
}
