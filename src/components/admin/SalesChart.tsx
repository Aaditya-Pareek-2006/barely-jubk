import React from 'react';

export const SalesChart: React.FC = () => {
  const data = [
    { day: 'Mon', sales: 42000 },
    { day: 'Tue', sales: 58000 },
    { day: 'Wed', sales: 69000 },
    { day: 'Thu', sales: 52000 },
    { day: 'Fri', sales: 88000 },
    { day: 'Sat', sales: 112000 },
    { day: 'Sun', sales: 94000 },
  ];

  const maxVal = 120000;

  return (
    <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Weekly Revenue Breakdown</h3>
          <p className="text-xs text-slate-500">Gross sales performance over the past 7 days</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
          +24.5% Growth
        </span>
      </div>

      {/* SVG Bar Chart Visualization */}
      <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
        {data.map((item, idx) => {
          const heightPercent = Math.round((item.sales / maxVal) * 100);
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                ₹{(item.sales / 1000).toFixed(0)}k
              </span>
              <div
                className="w-full bg-slate-800 group-hover:bg-lime-500 rounded-t transition-colors duration-200"
                style={{ height: `${heightPercent}%` }}
              />
              <span className="text-xs font-medium text-slate-600">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
