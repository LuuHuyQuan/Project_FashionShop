import { orderingApi } from '../lib/axios';

export interface CartItem {
  id: number;
  productVariantId: number;
  productName: string;
  colorName: string;
  sizeName: string;
  quantity: number;
  unitPriceSnapshot: number;
  imageUrl: string;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
}

export interface CheckoutRequest {
  shippingName: string;
  shippingPhone: string;
  shippingEmail: string;
  shippingAddress: string;
  city?: string;
  district?: string;
  ward?: string;
  note?: string;
  paymentMethod: string;
}

export interface Order {
  id: number;
  orderCode: string;
  userId: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingName: string;
  shippingPhone: string;
  shippingEmail: string;
  shippingAddress: string;
  city?: string;
  district?: string;
  ward?: string;
  note?: string;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  productId: number;
  productNameSnapshot: string;
  colorSnapshot?: string;
  sizeSnapshot?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export const orderingService = {
  // Cart
  getMyCart: async () => {
    const response = await orderingApi.get<Cart>('/carts/my-cart');
    return response.data;
  },

  addToCart: async (productVariantId: number, quantity: number) => {
    const response = await orderingApi.post('/carts/items', {
      productVariantId,
      quantity,
    });
    return response.data;
  },

  updateCartItem: async (itemId: number, quantity: number) => {
    const response = await orderingApi.put(`/carts/items/${itemId}`, {
      quantity,
    });
    return response.data;
  },

  removeCartItem: async (itemId: number) => {
    await orderingApi.delete(`/carts/items/${itemId}`);
  },

  clearCart: async () => {
    await orderingApi.delete('/carts/clear');
  },

  // Orders
  getMyOrders: async () => {
    const response = await orderingApi.get<Order[]>('/orders/my-orders');
    return response.data;
  },

  getOrderById: async (id: number) => {
    const response = await orderingApi.get<Order>(`/orders/${id}`);
    return response.data;
  },

  getOrderByCode: async (orderCode: string) => {
    const response = await orderingApi.get<Order>(`/orders/code/${orderCode}`);
    return response.data;
  },

  checkout: async (data: CheckoutRequest) => {
    const response = await orderingApi.post<Order>('/orders/checkout', data);
    return response.data;
  },
};
