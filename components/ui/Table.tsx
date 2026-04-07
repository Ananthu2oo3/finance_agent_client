interface TableProps {
  headers: string[];
  rows: Array<Array<string | number>>;
  title?: string;
  headerColor?: string;
}

export default function Table({ headers, rows, title, headerColor = '#000000' }: TableProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
      {title && <h3 className="text-lg font-semibold mb-4 text-black">{title}</h3>}
      <div className="overflow-auto flex-1 min-h-0 relative">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 shadow-sm">
            <tr style={{ backgroundColor: headerColor }}>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-2 text-left font-semibold border text-white">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2 border text-black">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
