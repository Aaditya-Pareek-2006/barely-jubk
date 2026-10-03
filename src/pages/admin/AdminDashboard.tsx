import React from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { StatCard } from '../../components/admin/StatCard';
import { SalesChart } from '../../components/admin/SalesChart';
import { RecentOrders } from '../../components/admin/RecentOrders';
import { DollarSign, ShoppingBag, Users, Package, TrendingUp, AlertTriangle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <AdminHeader title="Executive Overview" />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Monthly Revenue"
          value="₹5,17,400"
          change="+18.2%"
          isPositive={true}
          icon={DollarSign}
          iconBgColor="bg-emerald-100 text-emerald-800"
        />
        <StatCard
          title="Total Orders"
          value="1,420"
          change="+12.4%"
          isPositive={true}
          icon={ShoppingBag}
          iconBgColor="bg-blue-100 text-blue-800"
        />
        <StatCard
          title="Active Customers"
          value="3,890"
          change="+8.1%"
          isPositive={true}
          icon={Users}
          iconBgColor="bg-purple-100 text-purple-800"
        />
        <StatCard
          title="Low Stock Items"
          value="3 SKUs"
          change="-2"
          isPositive={false}
          icon={AlertTriangle}
          iconBgColor="bg-amber-100 text-amber-800"
        />
      </div>

      {/* Main Charts & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <SalesChart />
        </div>
        <div className="lg:col-span-5">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
};
