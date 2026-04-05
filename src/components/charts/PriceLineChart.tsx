'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PriceLineChartProps {
  data: Record<string, unknown>[];
  lines: { key: string; name: string; color: string }[];
  height?: number;
}

export function PriceLineChart({ data, lines, height = 300 }: PriceLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
        <Tooltip
          contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 12 }}
          formatter={(value: number) => [`Rp ${Number(value).toLocaleString('id-ID')}`, '']}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
        {lines.map((line) => (
          <Line key={line.key} type="monotone" dataKey={line.key} stroke={line.color} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} name={line.name} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
