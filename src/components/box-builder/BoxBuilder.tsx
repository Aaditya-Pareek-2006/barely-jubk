import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types/product';
import { BoxProgress } from './BoxProgress';
import { BoxProductSelector } from './BoxProductSelector';
import { BoxSummary } from './BoxSummary';
import { useCart } from '../../hooks/useCart';

export const BOX_SIZES = [
  { size: 6, price: 499, title: '6 SNACK STASH', popular: false },
  { size: 8, price: 699, title: '8 SNACK HEIST', popular: true },
  { size: 12, price: 999, title: '12 SNACK APOCALYPSE', popular: false },
];

export const BoxBuilder: React.FC = () => {
  const [selectedBox, setSelectedBox] = useState(BOX_SIZES[1]); // Default 8 snacks
  const [selectedProductsMap, setSelectedProductsMap] = useState<{ [id: string]: number }>({});
  const { addToCart } = useCart();

  const totalItemsCount = Object.values(selectedProductsMap).reduce((a, b) => a + b, 0);

  const handleAdd = (product: Product) => {
    if (totalItemsCount >= selectedBox.size) return;
    setSelectedProductsMap(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
  };

  const handleRemove = (productId: string) => {
    setSelectedProductsMap(prev => {
      const copy = { ...prev };
      if (copy[productId] > 1) {
        copy[productId] -= 1;
      } else {
        delete copy[productId];
      }
      return copy;
    });
  };

  const handleClear = () => {
    setSelectedProductsMap({});
  };

  const handleAddToCart = () => {
    // Add custom box as a bundle product to cart
    const boxProduct: Product = {
      id: `custom-box-${Date.now()}`,
      slug: `custom-snack-box-${selectedBox.size}`,
      name: `CUSTOM ${selectedBox.title} (${selectedBox.size} SNACKS)`,
      category: 'makhana',
      categoryName: 'Custom Bundle Box',
      shortDescription: `Curated ${selectedBox.size}-pack snack box bundle.`,
      description: 'Your custom curated Barely Junk snack box filled with your favorite snacks.',
      price: selectedBox.price,
      rating: 5.0,
      reviewCount: 1,
      images: ['https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=800&auto=format&fit=crop'],
      weight: `${selectedBox.size} Pack`,
      ingredients: ['Assorted snacks'],
      nutrition: { calories: 'Varies', protein: 'Varies', carbs: 'Varies', fat: 'Varies', fiber: 'Varies' },
      allergens: ['See individual snack packaging'],
      stock: 100,
      tags: ['Custom Box', 'Bundle'],
      flavor: 'Assorted Mix'
    };

    addToCart(boxProduct, 1);
    handleClear();
  };

  const selectedItemsList = Object.entries(selectedProductsMap).map(([id, quantity]) => {
    const product = PRODUCTS.find(p => p.id === id)!;
    return { product, quantity };
  });

  return (
    <div className="space-y-8">
      
      {/* Box Size Selection */}
      <div>
        <h3 className="font-display font-black text-xl uppercase tracking-tight text-brand-black mb-4">
          1. CHOOSE YOUR BOX CAPACITY
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BOX_SIZES.map(box => (
            <button
              key={box.size}
              onClick={() => {
                setSelectedBox(box);
                handleClear();
              }}
              className={`relative p-5 border-3 border-brand-black text-left transition-all ${
                selectedBox.size === box.size
                  ? 'bg-brand-lime text-brand-black shadow-brutal scale-102'
                  : 'bg-white text-brand-black hover:bg-paper-dark'
              }`}
            >
              {box.popular && (
                <span className="absolute -top-3 right-4 bg-brand-orange text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-brand-black uppercase shadow-brutal-sm">
                  MOST POPULAR
                </span>
              )}
              <h4 className="font-display font-black text-lg uppercase">{box.title}</h4>
              <p className="font-mono text-xs font-bold mt-1 text-gray-700">
                {box.size} SNACKS FOR <span className="text-brand-orange text-sm font-black">₹{box.price}</span>
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <BoxProgress
        targetSize={selectedBox.size}
        currentCount={totalItemsCount}
        boxPrice={selectedBox.price}
        boxTitle={selectedBox.title}
      />

      {/* Main Grid: Products Selector + Summary Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <h3 className="font-display font-black text-xl uppercase tracking-tight text-brand-black mb-4">
            2. SELECT YOUR FAVORITE SNACKS
          </h3>
          <BoxProductSelector
            products={PRODUCTS}
            selectedProductsMap={selectedProductsMap}
            onAdd={handleAdd}
            onRemove={handleRemove}
            isDisabled={totalItemsCount >= selectedBox.size}
          />
        </div>

        <div className="lg:col-span-4 sticky top-24">
          <BoxSummary
            selectedItems={selectedItemsList}
            targetSize={selectedBox.size}
            boxPrice={selectedBox.price}
            onClear={handleClear}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

    </div>
  );
};
