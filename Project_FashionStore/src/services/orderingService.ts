import { orderingApi } from '../lib/axios';

export interface CartItem {
  id: number;
  productVariantId: number;
  productName: string;
  colorName: string;
  sizeName: string;
  quantity: number;
  unitPriceSnapshot: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  updatedAt: string;
}

export interface OrderItemRequest {
  productId: number;
  productVariantId: number;
  productNameSnapshot: string;
  colorSnapshot: string;
  sizeSnapshot: string;
  unitPrice: number;
  quantity: number;
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
  items: OrderItemRequest[];
}

export interface OrderItemResponse {
  id: number;
  productId: number;
  productVariantId: number | null;
  productNameSnapshot: string;
  colorSnapshot: string | null;
  sizeSnapshot: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderResponse {
  id: number;
  orderCode: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingName: string;
  shippingPhone: string;
  shippingEmail: string;
  shippingAddress: string;
  city: string | null;
  district: string | null;
  ward: string | null;
  note: string | null;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  createdAtUtc: string;
  items: OrderItemResponse[];
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  ordersByStatus: Record<string, number>;
  revenueToday: number;
  ordersToday: number;
  revenueThisMonth: number;
  ordersThisMonth: number;
  totalCustomers: number;
  totalProductsSold: number;
}

export interface RecentOrder {
  id: number;
  orderCode: string;
  userId: number;
  customerName: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  createdAt: string;
  itemCount: number;
}

export const orderingService = {
  // Checkout
  checkout: async (request: CheckoutRequest): Promise<OrderResponse> => {
    const response = await orderingApi.post('/Orders/checkout', request);
    return response.data;
  },

  // Get all orders
  getAllOrders: async (): Promise<OrderResponse[]> => {
    const response = await orderingApi.get('/Orders');
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id: number): Promise<OrderResponse> => {
    const response = await orderingApi.get(`/Orders/${id}`);
    return response.data;
  },

  // Get order by code
  getOrderByCode: async (orderCode: string): Promise<OrderResponse> => {
    const response = await orderingApi.get(`/Orders/code/${orderCode}`);
    return response.data;
  },

  // Get user orders
  getUserOrders: async (userId: number): Promise<OrderResponse[]> => {
    const response = await orderingApi.get(`/Orders/user/${userId}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (id: number, status: string, paymentStatus?: string): Promise<OrderResponse> => {
    const response = await orderingApi.put(`/Orders/${id}/status`, { status, paymentStatus });
    return response.data;
  },

  // Delete order
  deleteOrder: async (id: number): Promise<void> => {
    await orderingApi.delete(`/Orders/${id}`);
  },

  // Dashboard APIs
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await orderingApi.get('/Dashboard/stats');
    return response.data;
  },

  getRecentOrders: async (limit: number = 10): Promise<RecentOrder[]> => {
    const response = await orderingApi.get(`/Dashboard/recent-orders?limit=${limit}`);
    return response.data;
  },

  getTopProducts: async (limit: number = 10) => {
    const response = await orderingApi.get(`/Dashboard/top-products?limit=${limit}`);
    return response.data;
  },

  getRevenueChart: async (days: number = 30) => {
    const response = await orderingApi.get(`/Dashboard/revenue-chart?days=${days}`);
    return response.data;
  },
};
