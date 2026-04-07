'use client';
import { useState } from 'react';

interface PieChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  title?: string;
}

export default function PieChart({ data, title }: PieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="p-6 bg-white rounded-xl shadow border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
      {title && <h3 className="text-lg font-semibold mb-4 text-black">{title}</h3>}
      <div className="flex justify-center relative flex-1 min-h-0 items-center">
        <svg className="w-full h-full max-h-full" viewBox="0 0 200 200">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = data.slice(0, index).reduce((acc, curr) => acc + (curr.value / total) * 360, 0);
            
            const x1 = 100 + 90 * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 100 + 90 * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 100 + 90 * Math.cos((startAngle + angle - 90) * Math.PI / 180);
            const y2 = 100 + 90 * Math.sin((startAngle + angle - 90) * Math.PI / 180);
            const largeArc = angle > 180 ? 1 : 0;

            return (
              <g key={index}>
                <path
                  d={`M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={item.color}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer transition-opacity"
                  style={{ 
                    opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.5,
                    animation: `pieSlice 0.6s ease-out ${index * 0.2}s both`,
                    transformOrigin: '100px 100px'
                  }}
                />
              </g>
            );
          })}
        </svg>
        {hoveredIndex !== null && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-3 py-2 rounded text-sm pointer-events-none">
            {data[hoveredIndex].label}: {data[hoveredIndex].value}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes pieSlice {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
