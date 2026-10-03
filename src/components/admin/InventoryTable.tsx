import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { Edit2, Trash2, Plus, Search } from 'lucide-react';
import { Product } from '../../types/product';

export const InventoryTable: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = productList.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this snack from inventory?')) {
      setProductList(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xs space-y-4 p-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search catalog by name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-400"
          />
        </div>

        <button
          onClick={() => alert('Add Product modal form ready for backend connection!')}
          className="w-full sm:w-auto px-4 py-2 bg-slate-900 text-white font-sans text-xs font-semibold rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Snack</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock level</th>
              <th className="p-3">Badge</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map(prod => (
              <tr key={prod.id} className="hover:bg-slate-50">
                <td className="p-3 flex items-center gap-3">
                  <img src={prod.images[0]} alt={prod.name} className="w-8 h-8 rounded object-cover border border-slate-200" />
                  <span className="font-bold text-slate-900">{prod.name}</span>
                </td>
                <td className="p-3">{prod.categoryName}</td>
                <td className="p-3 font-semibold">{formatCurrency(prod.price)}</td>
                <td className="p-3 font-mono">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    prod.stock < 25 ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {prod.stock} units
                  </span>
                </td>
                <td className="p-3">
                  {prod.badge && (
                    <span className="px-2 py-0.5 bg-lime-100 text-slate-900 rounded font-semibold text-[10px]">
                      {prod.badge}
                    </span>
                  )}
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => alert(`Edit ${prod.name}`)}
                    className="p-1 text-slate-500 hover:text-slate-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="p-1 text-slate-500 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
