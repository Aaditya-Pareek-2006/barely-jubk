import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  iconBgColor = 'bg-slate-100 text-slate-700'
}) => {
  return (
    <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-xs flex justify-between items-start">
      <div>
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
          {title}
        </span>
        <span className="text-2xl font-bold text-slate-900 tracking-tight block">
          {value}
        </span>
        <div className="flex items-center gap-1 mt-2 text-xs font-medium">
          {isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5 text-rose-600" />
          )}
          <span className={isPositive ? 'text-emerald-600' : 'text-rose-600'}>
            {change}
          </span>
          <span className="text-slate-400 font-normal">vs last month</span>
        </div>
      </div>

      <div className={`p-3 rounded-lg ${iconBgColor}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
