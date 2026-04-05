'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#047857', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4', '#10B981'];

interface SimpleBarChartProps {
  data: { name: string; value: number; fill?: string }[];
  height?: number;
  layout?: 'horizontal' | 'vertical';
}

export function SimpleBarChart({ data, height = 300, layout = 'horizontal' }: SimpleBarChartProps) {
  if (layout === 'vertical') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#6b7280' }} width={80} />
          <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 12 }} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]}>
            {data.map((entry, index) => (<Cell key={index} fill={entry.fill || COLORS[index % COLORS.length]} />))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
        <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 12 }} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (<Cell key={index} fill={entry.fill || COLORS[index % COLORS.length]} />))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
