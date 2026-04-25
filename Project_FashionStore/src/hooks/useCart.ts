import { useState, useEffect } from 'react';
import { orderingService, type Cart } from '../services';

export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await orderingService.getMyCart();
      setCart(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productVariantId: number, quantity: number) => {
    try {
      await orderingService.addToCart(productVariantId, quantity);
      await fetchCart();
    } catch (err) {
      throw err;
    }
  };

  const updateCartItem = async (itemId: number, quantity: number) => {
    try {
      await orderingService.updateCartItem(itemId, quantity);
      await fetchCart();
    } catch (err) {
      throw err;
    }
  };

  const removeCartItem = async (itemId: number) => {
    try {
      await orderingService.removeCartItem(itemId);
      await fetchCart();
    } catch (err) {
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      await orderingService.clearCart();
      await fetchCart();
    } catch (err) {
      throw err;
    }
  };

  return {
    cart,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    refetch: fetchCart,
  };
};
