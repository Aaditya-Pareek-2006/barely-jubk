import React, { useState } from 'react';
import { MOCK_REVIEWS } from '../../data/reviews';
import { Star, ThumbsUp, MessageSquarePlus } from 'lucide-react';
import { Button } from '../common/Button';

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const reviews = MOCK_REVIEWS.filter(r => r.productId === productId || true).slice(0, 3);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your review has been submitted for verification.');
    setShowAddForm(false);
    setNewTitle('');
    setNewComment('');
  };

  return (
    <div className="bg-paper-dark border-3 border-brand-black p-6 sm:p-8 shadow-brutal space-y-8 mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-brand-black pb-4">
        <div>
          <h3 className="font-display font-black text-2xl uppercase tracking-tight text-brand-black">
            CERTIFIED JUNKIE REVIEWS
          </h3>
          <p className="font-mono text-xs text-gray-600 mt-1">
            Real feedback from verified snack destroyers.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <MessageSquarePlus className="w-4 h-4 mr-1" />
          {showAddForm ? 'CANCEL' : 'WRITE A REVIEW'}
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 border-2 border-brand-black shadow-brutal-sm space-y-4">
          <h4 className="font-display font-bold text-lg uppercase">ADD YOUR RATING</h4>
          
          <div>
            <label className="font-mono text-xs font-bold block mb-1">RATING (1-5 STARS):</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className={`p-2 border transition-colors ${
                    newRating >= star ? 'bg-amber-400 text-black border-black' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-mono text-xs font-bold block mb-1">HEADLINE:</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="e.g., Unbelievable spice!"
              className="w-full p-2 border-2 border-brand-black font-sans text-sm"
            />
          </div>

          <div>
            <label className="font-mono text-xs font-bold block mb-1">REVIEW:</label>
            <textarea
              required
              rows={3}
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Tell us how loud the crunch was..."
              className="w-full p-2 border-2 border-brand-black font-sans text-sm"
            />
          </div>

          <Button type="submit" variant="accent" size="sm">
            SUBMIT REVIEW
          </Button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map(rev => (
          <div key={rev.id} className="bg-white border-2 border-brand-black p-5 shadow-brutal-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs uppercase text-brand-black">
                  {rev.userName}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono px-1.5 py-0.5 border border-emerald-300 font-bold">
                  VERIFIED BUYER
                </span>
              </div>
              <span className="font-mono text-xs text-gray-400">{rev.date}</span>
            </div>

            <div className="flex text-amber-400 mb-2">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <h4 className="font-display font-bold text-sm uppercase text-brand-black mb-1">
              {rev.title}
            </h4>
            <p className="font-sans text-xs text-gray-700 leading-relaxed">
              {rev.comment}
            </p>

            <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-end font-mono text-xs text-gray-500 gap-1">
              <button className="hover:text-brand-black flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
