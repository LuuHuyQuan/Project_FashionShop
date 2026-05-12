import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';
import { catalogService } from '../services/catalogService';
import Swal from 'sweetalert2';

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  variantId?: number; // Track which variant is in cart
  stockQuantity?: number; // Cache stock quantity
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load from localStorage
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (product: Product, size: string, color: string, quantity: number) => {
    // Basic validation
    if (quantity <= 0) {
      await Swal.fire({
        icon: 'warning',
        title: 'Số lượng không hợp lệ',
        text: 'Số lượng phải lớn hơn 0',
        confirmButtonColor: '#3b82f6',
      });
      return;
    }

    const MAX_QUANTITY_PER_ITEM = 99;
    if (quantity > MAX_QUANTITY_PER_ITEM) {
      await Swal.fire({
        icon: 'warning',
        title: 'Vượt quá giới hạn',
        text: `Không thể thêm quá ${MAX_QUANTITY_PER_ITEM} sản phẩm`,
        confirmButtonColor: '#3b82f6',
      });
      return;
    }

    try {
      // Find the variant based on product, color, and size
      const variant = product.variants?.find(
        (v) => v.colorName === color && v.sizeName === size
      );

      if (!variant) {
        await Swal.fire({
          icon: 'error',
          title: 'Không tìm thấy sản phẩm',
          text: 'Không tìm thấy biến thể sản phẩm với màu sắc và kích thước đã chọn',
          confirmButtonColor: '#3b82f6',
        });
        return;
      }

      // Check stock from API
      const stockCheck = await catalogService.checkStockByVariantId(variant.id);

      if (!stockCheck.available) {
        await Swal.fire({
          icon: 'error',
          title: 'Hết hàng',
          text: stockCheck.message || 'Sản phẩm này hiện đã hết hàng',
          confirmButtonColor: '#3b82f6',
        });
        return;
      }

      // Check if adding this quantity would exceed stock
      const existingItem = cartItems.find(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
      const totalQuantity = currentQuantityInCart + quantity;

      if (totalQuantity > stockCheck.stockQuantity) {
        await Swal.fire({
          icon: 'warning',
          title: 'Vượt quá số lượng tồn kho',
          html: `
            <p>Chỉ còn <strong>${stockCheck.stockQuantity}</strong> sản phẩm trong kho</p>
            <p>Bạn đã có <strong>${currentQuantityInCart}</strong> sản phẩm trong giỏ hàng</p>
            <p>Bạn chỉ có thể thêm tối đa <strong>${stockCheck.stockQuantity - currentQuantityInCart}</strong> sản phẩm nữa</p>
          `,
          confirmButtonColor: '#3b82f6',
        });
        return;
      }

      // Check max quantity per item
      if (totalQuantity > MAX_QUANTITY_PER_ITEM) {
        await Swal.fire({
          icon: 'warning',
          title: 'Vượt quá giới hạn',
          text: `Không thể có quá ${MAX_QUANTITY_PER_ITEM} sản phẩm cùng loại trong giỏ hàng`,
          confirmButtonColor: '#3b82f6',
        });
        return;
      }

      // Add to cart
      setCartItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
        );

        if (existingIndex > -1) {
          // Update quantity
          const updated = [...prev];
          updated[existingIndex].quantity = totalQuantity;
          updated[existingIndex].stockQuantity = stockCheck.stockQuantity;
          return updated;
        } else {
          // Add new item
          return [
            ...prev,
            {
              ...product,
              quantity,
              selectedSize: size,
              selectedColor: color,
              variantId: variant.id,
              stockQuantity: stockCheck.stockQuantity,
            },
          ];
        }
      });

      // Show success message
      await Swal.fire({
        icon: 'success',
        title: 'Đã thêm vào giỏ hàng',
        text: `${product.name} - ${color} / ${size}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.',
        confirmButtonColor: '#3b82f6',
      });
    }
  };

  const removeFromCart = (productId: number, size: string, color: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && item.selectedSize === size && item.selectedColor === color))
    );
  };

  const updateQuantity = async (productId: number, size: string, color: string, quantity: number) => {
    // Validation
    if (quantity < 0) {
      await Swal.fire({
        icon: 'warning',
        title: 'Số lượng không hợp lệ',
        text: 'Số lượng không thể âm',
        confirmButtonColor: '#3b82f6',
      });
      return;
    }

    if (quantity === 0) {
      removeFromCart(productId, size, color);
      return;
    }

    const MAX_QUANTITY_PER_ITEM = 99;
    if (quantity > MAX_QUANTITY_PER_ITEM) {
      await Swal.fire({
        icon: 'warning',
        title: 'Vượt quá giới hạn',
        text: `Không thể có quá ${MAX_QUANTITY_PER_ITEM} sản phẩm`,
        confirmButtonColor: '#3b82f6',
      });
      return;
    }

    try {
      // Find the cart item
      const cartItem = cartItems.find(
        (item) => item.id === productId && item.selectedSize === size && item.selectedColor === color
      );

      if (!cartItem || !cartItem.variantId) {
        await Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không tìm thấy sản phẩm trong giỏ hàng',
          confirmButtonColor: '#3b82f6',
        });
        return;
      }

      // Check stock
      const stockCheck = await catalogService.checkStockByVariantId(cartItem.variantId);

      if (!stockCheck.available) {
        await Swal.fire({
          icon: 'error',
          title: 'Hết hàng',
          text: 'Sản phẩm này hiện đã hết hàng',
          confirmButtonColor: '#3b82f6',
        });
        return;
      }

      if (quantity > stockCheck.stockQuantity) {
        await Swal.fire({
          icon: 'warning',
          title: 'Vượt quá số lượng tồn kho',
          text: `Chỉ còn ${stockCheck.stockQuantity} sản phẩm trong kho`,
          confirmButtonColor: '#3b82f6',
        });
        return;
      }

      // Update quantity
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity, stockQuantity: stockCheck.stockQuantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Không thể cập nhật số lượng. Vui lòng thử lại sau.',
        confirmButtonColor: '#3b82f6',
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
