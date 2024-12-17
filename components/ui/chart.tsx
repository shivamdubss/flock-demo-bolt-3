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
  data: Array<{ name: string, value: number }>
  index: string
  categories: string[]
  colors: string[]
  height?: number
  valueFormatter?: (value: number) => string
  showGridLines?: boolean
  className?: string
}

export function BarChart({
  data,
  index,
  categories,
  colors,
  height = 300,
  valueFormatter = (value) => `${value}`,
  showGridLines = true,
  className
}: BarChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          {showGridLines && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              horizontal={true}
            />
          )}
          <XAxis 
            dataKey={index}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#666' }}
            tickMargin={8}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#666' }}
            tickFormatter={valueFormatter}
            tickCount={5}
          />
          <Tooltip 
            formatter={(value: number) => [valueFormatter(value), 'Value']}
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
          />
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey="value"
              fill={colors[index]}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}