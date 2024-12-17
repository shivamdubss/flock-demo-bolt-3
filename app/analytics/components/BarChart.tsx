'use client'

import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface BarChartProps {
  data: Array<{ name: string, value: number }>
  index: string
  categories: string[]
  colors: string[]
  yAxisWidth?: number
  height?: number
  valueFormatter?: (value: number) => string
  showGridLines?: boolean
  showLegend?: boolean
  className?: string
}

export function BarChart({
  data,
  index,
  categories,
  colors,
  yAxisWidth = 48,
  height = 300,
  valueFormatter = (value) => `${value}`,
  showGridLines = true,
  showLegend = false,
  className
}: BarChartProps) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          {showGridLines && (
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          )}
          <XAxis 
            dataKey={index}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            fontSize={12}
            stroke="#6B7280"
          />
          <YAxis
            width={yAxisWidth}
            axisLine={false}
            tickLine={false}
            tickFormatter={valueFormatter}
            fontSize={12}
            stroke="#6B7280"
          />
          <Tooltip
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              return (
                <div className="rounded-lg border bg-background p-2 shadow-md">
                  <div className="font-medium">{label}</div>
                  {payload.map((item, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      {valueFormatter ? valueFormatter(item.value) : item.value}
                    </div>
                  ))}
                </div>
              )
            }}
          />
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[index]}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
} 