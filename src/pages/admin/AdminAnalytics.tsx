import React from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { SalesChart } from '../../components/admin/SalesChart';
import { StatCard } from '../../components/admin/StatCard';
import { TrendingUp, BarChart3, PieChart, ShoppingBag } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const categoryData = [
    { name: 'Makhana', percentage: '32%', revenue: '₹1,65,560' },
    { name: 'Potato Wafers', percentage: '28%', revenue: '₹1,44,872' },
    { name: 'Butterfly Popcorn', percentage: '18%', revenue: '₹93,132' },
    { name: 'Thick Cookies', percentage: '12%', revenue: '₹62,088' },
    { name: 'Nuts & Trail Mix', percentage: '10%', revenue: '₹51,740' },
  ];

  return (
    <div className="space-y-6 p-6">
      <AdminHeader title="Sales & Category Analytics" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Avg Order Value (AOV)"
          value="₹840"
          change="+6.4%"
          isPositive={true}
          icon={TrendingUp}
        />
        <StatCard
          title="Conversion Rate"
          value="4.12%"
          change="+0.8%"
          isPositive={true}
          icon={BarChart3}
        />
        <StatCard
          title="Repeat Purchase Rate"
          value="48.5%"
          change="+3.2%"
          isPositive={true}
          icon={ShoppingBag}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <SalesChart />
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          <h3 className="font-semibold text-sm text-slate-800 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-slate-700" />
            Revenue Share By Snack Category
          </h3>

          <div className="space-y-3 font-sans text-xs">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-800">{cat.name}</span>
                  <span className="font-bold text-slate-900">{cat.revenue} ({cat.percentage})</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-800 rounded-full"
                    style={{ width: cat.percentage }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
