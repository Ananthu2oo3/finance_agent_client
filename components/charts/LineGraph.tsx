'use client';

interface LineGraphProps {
  data: Array<{ label: string; value: number }>;
  title?: string;
  lineColor?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export default function LineGraph({ data, title, lineColor = '#3b82f6', xAxisLabel, yAxisLabel }: LineGraphProps) {
  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 200;
    const y = 110 - ((item.value - minValue) / range) * 90;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="p-6 bg-white rounded-xl shadow border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
      {title && <h3 className="text-lg font-semibold mb-4 text-black">{title}</h3>}
      <div className="flex flex-col gap-2 flex-1">
        {yAxisLabel && <span className="text-xs text-black mb-2">{yAxisLabel}</span>}
        <div className="flex-1 min-h-0 relative">
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }} viewBox="-10 -10 220 130" preserveAspectRatio="none">
            <polyline
              points={points}
              fill="none"
              stroke={lineColor}
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              style={{ animation: 'lineDraw 2s ease-out forwards' }}
            />
            {data.map((item, index) => {
              const x = (index / (data.length - 1)) * 200;
              const y = 110 - ((item.value - minValue) / range) * 90;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={lineColor}
                  style={{ animation: `dotAppear 0.4s ease-out ${0.3 + index * 0.15}s both` }}
                />
              );
            })}
          </svg>
        </div>
        <div className="flex justify-between text-xs mt-2">
          {data.map((item, index) => (
            <span key={index} className="text-black">{item.label}</span>
          ))}
        </div>
        {xAxisLabel && <span className="text-xs text-black text-center mt-2">{xAxisLabel}</span>}
      </div>
      <style jsx>{`
        @keyframes lineDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes dotAppear {
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
