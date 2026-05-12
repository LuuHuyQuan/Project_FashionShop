import { useState, useEffect } from 'react';
import { catalogService, type WishlistItem, type AddToWishlistRequest } from '../services';

export const useWishlist = (userId?: number) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = async (uid: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await catalogService.getUserWishlist(uid);
      setWishlist(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wishlist');
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (data: AddToWishlistRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newItem = await catalogService.addToWishlist(data);
      setWishlist([newItem, ...wishlist]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to wishlist');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await catalogService.removeFromWishlist(id);
      setWishlist(wishlist.filter(item => item.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove from wishlist');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.productId === productId);
  };

  const getWishlistItem = (productId: number) => {
    return wishlist.find(item => item.productId === productId);
  };

  useEffect(() => {
    if (userId) {
      fetchWishlist(userId);
    }
  }, [userId]);

  return {
    wishlist,
    loading,
    error,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistItem,
  };
};
