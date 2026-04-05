'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
  innerLabel?: string;
}

export function DonutChart({ data, height = 250, innerLabel }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={3} dataKey="value">
            {data.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
          </Pie>
          <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
      {innerLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-2xl font-extrabold text-foreground">{total.toLocaleString('id-ID')}</div>
          <div className="text-[10px] font-semibold text-muted uppercase tracking-wide">{innerLabel}</div>
        </div>
      )}
    </div>
  );
}
