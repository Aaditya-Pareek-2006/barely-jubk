import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductSort } from '../components/products/ProductSort';
import { PageTransition } from '../components/layout/PageTransition';
import { Search } from 'lucide-react';

export const Shop: React.FC = () => {
  const { products, filters, updateFilters, resetFilters, totalCount } = useProducts();

  return (
    <PageTransition>
      <div className="py-12 bg-paper min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10 text-left border-b-4 border-brand-black pb-6">
            <span className="font-mono font-bold text-xs uppercase bg-brand-lime text-brand-black px-2.5 py-1 border border-brand-black">
              FULL VAULT CATALOG
            </span>
            <h1 className="font-display font-black text-5xl sm:text-7xl uppercase tracking-tight text-brand-black mt-2">
              SHOP ALL SNACKS.
            </h1>
            <p className="font-mono text-sm text-gray-700 mt-2 max-w-xl">
              Filter by flavor, category, price, or spiciness level. All products backed by our zero boring bites guarantee.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="mb-8 relative max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="SEARCH SNACKS BY NAME OR FLAVOR..."
              value={filters.searchQuery || ''}
              onChange={(e) => updateFilters({ searchQuery: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-brand-black font-mono text-xs uppercase focus:outline-none focus:border-brand-lime shadow-brutal-sm"
            />
          </div>

          {/* Main Shop Layout: Filters + Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-3 sticky top-24">
              <ProductFilters
                filters={filters}
                onFilterChange={updateFilters}
                onReset={resetFilters}
              />
            </div>

            <div className="lg:col-span-9">
              <ProductSort
                currentSort={filters.sortBy}
                onSortChange={(sortBy) => updateFilters({ sortBy })}
                totalCount={totalCount}
              />

              <ProductGrid
                products={products}
                onResetFilters={resetFilters}
              />
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
