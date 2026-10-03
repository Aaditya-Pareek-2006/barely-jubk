import React from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { InventoryTable } from '../../components/admin/InventoryTable';

export const AdminInventory: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <AdminHeader title="Inventory & Stock Alerts" />
      <InventoryTable />
    </div>
  );
};
