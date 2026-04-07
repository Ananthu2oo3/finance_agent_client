'use client';

interface BarChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export default function BarChart({ data, title, xAxisLabel, yAxisLabel }: BarChartProps) {
  const maxValue = Math.max(...data.map(item => item.value));
  const truncateLabel = (label: string) => label.length > 3 ? label.slice(0, 3) + '...' : label;

  return (
    <div className="p-6 bg-white rounded-xl shadow border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
      {title && <h3 className="text-lg font-semibold mb-4 text-black">{title}</h3>}
      <div className="flex flex-col gap-2 flex-1 min-h-0">
        {yAxisLabel && <span className="text-xs text-black mb-2">{yAxisLabel}</span>}
        <div className="overflow-x-auto flex-1">
          <div className="h-full flex items-end gap-2 px-2 pb-2" style={{ minWidth: `${data.length * 60}px` }}>
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-1 h-full" style={{ width: '50px' }}>
                <div className="w-full flex-1 flex flex-col justify-end items-center">
                  <span className="text-xs font-semibold text-black mb-1">{item.value}</span>
                  <div
                    className="w-full rounded-t"
                    style={{
                      backgroundColor: item.color,
                      height: `${(item.value / maxValue) * 100}%`,
                      animation: `barGrow 0.8s ease-out ${index * 0.15}s both`
                    }}
                  />
                </div>
                <span className="text-xs text-center text-black" title={item.label}>{truncateLabel(item.label)}</span>
              </div>
            ))}
          </div>
        </div>
        {xAxisLabel && <span className="text-xs text-black text-center mt-2">{xAxisLabel}</span>}
      </div>
      <style jsx>{`
        @keyframes barGrow {
          from {
            height: 0;
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
