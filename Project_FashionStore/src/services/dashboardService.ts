import { orderingApi, catalogApi, authApi } from '../lib/axios';

// Dashboard Statistics Types
export interface DashboardStats {
  revenue: {
    value: number;
    change: number;
    isUp: boolean;
  };
  orders: {
    value: number;
    change: number;
    isUp: boolean;
  };
  products: {
    value: number;
    change: number;
    isUp: boolean;
  };
  users: {
    value: number;
    change: number;
    isUp: boolean;
  };
}

export interface RecentOrder {
  id: number;
  orderCode: string;
  customerName: string;
  productName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface TopProduct {
  id: number;
  name: string;
  soldCount: number;
  revenue: number;
  categoryName: string;
}

export interface ActivityLog {
  id: number;
  type: string;
  message: string;
  createdAt: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
  activities: ActivityLog[];
  lowStockCount: number;
}

export const dashboardService = {
  // Get all dashboard data
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await orderingApi.get<DashboardData>('/dashboard');
    return response.data;
  },

  // Get statistics only
  getStats: async (): Promise<DashboardStats> => {
    const response = await orderingApi.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },

  // Get recent orders
  getRecentOrders: async (limit: number = 5): Promise<RecentOrder[]> => {
    const response = await orderingApi.get<RecentOrder[]>(`/dashboard/recent-orders?limit=${limit}`);
    return response.data;
  },

  // Get top products
  getTopProducts: async (limit: number = 4): Promise<TopProduct[]> => {
    const response = await catalogApi.get<TopProduct[]>(`/dashboard/top-products?limit=${limit}`);
    return response.data;
  },

  // Get activity logs
  getActivities: async (limit: number = 5): Promise<ActivityLog[]> => {
    const response = await orderingApi.get<ActivityLog[]>(`/dashboard/activities?limit=${limit}`);
    return response.data;
  },

  // Get low stock count
  getLowStockCount: async (): Promise<number> => {
    const response = await catalogApi.get<{ count: number }>('/dashboard/low-stock-count');
    return response.data.count;
  },
};
