import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { ProductGrid } from '../components/products/ProductGrid';
import { PageTransition } from '../components/layout/PageTransition';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const categoryInfo = productService.getCategoryBySlug(slug || '');
  const products = productService.getProducts({ category: slug as any });
  const allCategories = productService.getCategories();

  if (!categoryInfo) {
    return (
      <div className="py-20 text-center font-mono">
        <h2 className="text-3xl font-black uppercase text-brand-orange mb-4">
          CATEGORY NOT FOUND
        </h2>
        <Link to="/shop" className="underline font-bold">Return to Shop Vault</Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="py-12 bg-paper min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            to="/shop"
            className="inline-flex items-center font-mono text-xs font-bold text-gray-600 hover:text-brand-black mb-6 uppercase"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            BACK TO ALL SNACKS
          </Link>

          {/* Category Banner Hero */}
          <div className={`p-8 sm:p-12 border-4 border-brand-black shadow-brutal-lg mb-12 relative overflow-hidden ${categoryInfo.bgAccent}`}>
            <div className="max-w-xl relative z-10">
              <span className="font-mono font-bold text-xs bg-brand-black text-white px-2.5 py-1 uppercase inline-block mb-3 border border-brand-black">
                CATEGORY VAULT
              </span>
              <h1 className="font-display font-black text-5xl sm:text-7xl uppercase tracking-tight text-brand-black leading-none">
                {categoryInfo.name}
              </h1>
              <p className="font-mono text-sm font-bold text-brand-black uppercase mt-3">
                {categoryInfo.tagline}
              </p>
              <p className="font-sans text-xs text-gray-800 mt-2 leading-relaxed">
                {categoryInfo.description}
              </p>
            </div>

            <img
              src={categoryInfo.image}
              alt={categoryInfo.name}
              className="absolute right-[-20px] bottom-[-20px] w-72 h-72 object-cover border-3 border-brand-black rotate-6 hidden md:block shadow-brutal-sm"
            />
          </div>

          {/* Category Products Grid */}
          <div className="mb-12">
            <h2 className="font-display font-black text-2xl uppercase tracking-tight text-brand-black mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-orange" />
              AVAILABLE {categoryInfo.name} ({products.length})
            </h2>

            <ProductGrid products={products} />
          </div>

          {/* Related Categories Pills */}
          <div className="pt-8 border-t-2 border-brand-black">
            <h3 className="font-mono font-bold text-xs uppercase text-gray-500 mb-3">
              EXPLORE OTHER CATEGORIES:
            </h3>
            <div className="flex flex-wrap gap-3">
              {allCategories.filter(c => c.slug !== slug).map(c => (
                <Link
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  className="px-4 py-2 bg-white border-2 border-brand-black font-display font-bold text-xs uppercase hover:bg-brand-lime transition-colors shadow-brutal-sm"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
