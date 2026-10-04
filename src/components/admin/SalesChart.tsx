import React from 'react';

export const SalesChart: React.FC<{data?:{day:string;revenue:number}[]}> = ({data=[]}) => {
  const maxVal = Math.max(1,...data.map(x=>x.revenue));

  return (
    <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Revenue — Last 7 Days</h3>
          <p className="text-xs text-slate-500">Paid and cash-on-delivery orders from PostgreSQL</p>
        </div>
      </div>

      {/* SVG Bar Chart Visualization */}
      <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
        {data.map((item, idx) => {
          const heightPercent = Math.round((item.revenue / maxVal) * 100);
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                ₹{item.revenue.toLocaleString('en-IN')}
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
