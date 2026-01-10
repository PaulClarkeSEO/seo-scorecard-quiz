'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryScore } from '@/types';
import { getCategoryName, getScoreColor } from '@/lib/scoring';

interface ScoreChartProps {
  categories: CategoryScore[];
}

export default function ScoreChart({ categories }: ScoreChartProps) {
  const data = categories.map(cat => ({
    name: getCategoryName(cat.category),
    value: cat.percentage,
    color: getScoreColor(cat.level),
    score: cat.score,
    maxScore: cat.maxScore
  }));

  const COLORS = ['#22c55e', '#f59e0b', '#3b82f6'];

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            label={({ name, value }) => `${value}%`}
            labelLine={true}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, '']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '10px'
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-gray-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
