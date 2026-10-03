import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { ProductGallery } from '../components/products/ProductGallery';
import { ProductInfo } from '../components/products/ProductInfo';
import { ProductReviews } from '../components/products/ProductReviews';
import { RelatedProducts } from '../components/products/RelatedProducts';
import { PageTransition } from '../components/layout/PageTransition';
import { ArrowLeft } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = productService.getProductBySlug(slug || '');

  if (!product) {
    return (
      <div className="py-24 text-center font-mono">
        <h2 className="text-3xl font-black uppercase text-brand-orange mb-3">
          "LOOKS LIKE THIS ONE GOT EATEN."
        </h2>
        <p className="text-xs text-gray-600 mb-6">
          The snack you're looking for was not found or sold out completely.
        </p>
        <Link to="/shop" className="px-4 py-2 bg-brand-black text-white font-bold uppercase border-2 border-brand-black">
          Back to Shop Vault
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="py-12 bg-paper min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            to="/shop"
            className="inline-flex items-center font-mono text-xs font-bold text-gray-600 hover:text-brand-black mb-8 uppercase"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            BACK TO ALL PRODUCTS
          </Link>

          {/* Product Gallery & Product Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 sticky top-24">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            <div className="lg:col-span-6">
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Reviews */}
          <ProductReviews productId={product.id} />

          {/* Related Products */}
          <RelatedProducts currentProduct={product} />

        </div>
      </div>
    </PageTransition>
  );
};
