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
  userId: number;
  voucherId?: number;
  shippingName: string;
  shippingPhone: string;
  shippingEmail: string;
  shippingAddress: string;
  city?: string;
  district?: string;
  ward?: string;
  note?: string;
  paymentMethod: string;
  shippingFee: number;
  items: CheckoutOrderItem[];  // Changed from orderItems to items
}

export interface CheckoutOrderItem {
  productId: number;
  productVariantId: number;
  productNameSnapshot: string;
  colorSnapshot: string;
  sizeSnapshot: string;
  unitPrice: number;
  quantity: number;
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

// Voucher types
export interface Voucher {
  id: number;
  code: string;
  name: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  totalQuantity?: number;
  usedQuantity: number;
  remainingQuantity?: number;
  usageLimit?: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired';
  createdAt: string;
  updatedAt?: string;
}

export interface CreateVoucherRequest {
  code: string;
  name: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  totalQuantity?: number;
  usageLimit?: number;
  startDate: string;
  endDate: string;
  status?: 'active' | 'inactive';
}

export interface UpdateVoucherRequest extends CreateVoucherRequest { }

export interface ValidateVoucherResponse {
  isValid: boolean;
  message?: string;
  discountAmount?: number;
  voucher?: Voucher;
}

// Address types
export interface Address {
  id: number;
  userId: number;
  recipientName: string;
  phone: string;
  addressLine: string;
  city?: string;
  district?: string;
  ward?: string;
  isDefault: boolean;
  fullAddress?: string;
}

export interface CreateAddressRequest {
  userId: number;
  recipientName: string;
  phone: string;
  addressLine: string;
  city?: string;
  district?: string;
  ward?: string;
  isDefault?: boolean;
}

export interface UpdateAddressRequest extends CreateAddressRequest { }

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

  // Vouchers
  getAllVouchers: async () => {
    const response = await orderingApi.get<Voucher[]>('/vouchers');
    return response.data;
  },

  getVoucherById: async (id: number) => {
    const response = await orderingApi.get<Voucher>(`/vouchers/${id}`);
    return response.data;
  },

  getVoucherByCode: async (code: string) => {
    const response = await orderingApi.get<Voucher>(`/vouchers/code/${code}`);
    return response.data;
  },

  getActiveVouchers: async () => {
    const response = await orderingApi.get<Voucher[]>('/vouchers/active');
    return response.data;
  },

  createVoucher: async (data: CreateVoucherRequest) => {
    const response = await orderingApi.post<Voucher>('/vouchers', data);
    return response.data;
  },

  updateVoucher: async (id: number, data: UpdateVoucherRequest) => {
    const response = await orderingApi.put<Voucher>(`/vouchers/${id}`, data);
    return response.data;
  },

  deleteVoucher: async (id: number) => {
    await orderingApi.delete(`/vouchers/${id}`);
  },

  validateVoucher: async (code: string, orderAmount: number, userId: number) => {
    const response = await orderingApi.post<ValidateVoucherResponse>('/vouchers/validate', {
      code,
      orderAmount,
      userId,
    });
    return response.data;
  },

  // Addresses
  getUserAddresses: async (userId: number) => {
    const response = await orderingApi.get<Address[]>(`/addresses/user/${userId}`);
    return response.data;
  },

  getAddressById: async (id: number) => {
    const response = await orderingApi.get<Address>(`/addresses/${id}`);
    return response.data;
  },

  getDefaultAddress: async (userId: number) => {
    const response = await orderingApi.get<Address>(`/addresses/user/${userId}/default`);
    return response.data;
  },

  createAddress: async (data: CreateAddressRequest) => {
    const response = await orderingApi.post<Address>('/addresses', data);
    return response.data;
  },

  updateAddress: async (id: number, data: UpdateAddressRequest) => {
    const response = await orderingApi.put<Address>(`/addresses/${id}`, data);
    return response.data;
  },

  deleteAddress: async (id: number) => {
    await orderingApi.delete(`/addresses/${id}`);
  },

  setDefaultAddress: async (id: number, userId: number) => {
    await orderingApi.put(`/addresses/${id}/set-default`, { userId });
  },
};
