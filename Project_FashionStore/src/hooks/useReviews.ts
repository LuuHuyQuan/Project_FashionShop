import { useState, useEffect } from 'react';
import { catalogService, Review, CreateReviewRequest, UpdateReviewRequest } from '../services';

export const useReviews = (productId?: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductReviews = async (pid: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await catalogService.getProductReviews(pid);
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (data: CreateReviewRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newReview = await catalogService.createReview(data);
      setReviews([newReview, ...reviews]);
      return newReview;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create review');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (id: number, data: UpdateReviewRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await catalogService.updateReview(id, data);
      setReviews(reviews.map(r => r.id === id ? updated : r));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update review');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await catalogService.deleteReview(id);
      setReviews(reviews.filter(r => r.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete review');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductReviews(productId);
    }
  }, [productId]);

  return {
    reviews,
    loading,
    error,
    fetchProductReviews,
    createReview,
    updateReview,
    deleteReview,
  };
};
