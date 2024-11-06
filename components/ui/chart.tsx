'use client';

import React from 'react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';

interface BarChartProps {
  data: number[]
  color?: string
  height?: number
}

function formatNumber(num: number) {
  if (num >= 1000) {
    return `${(num/1000).toFixed(1)}k`;
  }
  return num;
}

export function BarChart({ data, color = "#10B981", height = 300 }: BarChartProps) {
  const months = Array.from({ length: 10 }).map((_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (9 - i));
    return d.toLocaleString('default', { month: 'short' });
  });

  const chartData = data.map((value, index) => ({
    month: months[index],
    value: value
  }));

  const maxValue = Math.max(...data);
  const yAxisMax = Math.ceil(maxValue / 30) * 30; // Round up to nearest 30

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart 
        data={chartData} 
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false}
          horizontal={true}
        />
        <XAxis 
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#666' }}
          tickMargin={8}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#666' }}
          tickFormatter={formatNumber}
          domain={[0, yAxisMax]}
          tickCount={5}
        />
        <Tooltip 
          formatter={(value: number) => [value, 'Value']}
          cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
        />
        <Bar 
          dataKey="value" 
          fill={color}
          radius={[4, 4, 0, 0]}
          barSize={30}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}