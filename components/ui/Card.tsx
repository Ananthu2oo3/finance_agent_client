interface CardProps {
  heading: string;
  subheading?: string;
  value: string | number;
  color?: string;
  textColor?: string;
}

export default function Card({ heading, subheading, value, color = '#3b82f6', textColor = '#000000' }: CardProps) {
  return (
    <div className="px-4 py-1 h-full rounded-xl shadow border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 bg-white border-l-4 flex items-center justify-between" style={{ borderLeftColor: color }}>
      <div className="flex flex-col justify-center">
        <h3 className="text-sm font-semibold" style={{ color: textColor }}>{heading}</h3>
        {subheading && <p className="text-xs opacity-70 mt-0.5" style={{ color: textColor }}>{subheading}</p>}
      </div>
      <p className="text-2xl font-bold" style={{ color: textColor }}>{value}</p>
    </div>
  );
}
