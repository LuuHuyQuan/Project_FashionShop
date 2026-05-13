import React, { useEffect, useState } from 'react';
import { TrendingUp, Package, ShoppingBag, Users, Clock } from 'lucide-react';
import { orderingService, type DashboardStats, type RecentOrder } from '../../../services/orderingService';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, ordersData] = await Promise.all([
          orderingService.getDashboardStats(),
          orderingService.getRecentOrders(5),
        ]);
        setStats(statsData);
        setRecentOrders(ordersData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Doanh thu',
      value: stats?.totalRevenue ? `${(stats.totalRevenue / 1000000).toFixed(1)}M` : '0',
      subValue: `Hôm nay: ${stats?.revenueToday?.toLocaleString('vi-VN') || 0}đ`,
      icon: TrendingUp,
      color: '#7c3aed',
    },
    {
      label: 'Đơn hàng',
      value: stats?.totalOrders?.toLocaleString('vi-VN') || '0',
      subValue: `Hôm nay: ${stats?.ordersToday || 0}`,
      icon: ShoppingBag,
      color: '#db2777',
    },
    {
      label: 'Sản phẩm đã bán',
      value: stats?.totalProductsSold?.toLocaleString('vi-VN') || '0',
      subValue: `Trung bình: ${stats?.averageOrderValue?.toLocaleString('vi-VN') || 0}đ/đơn`,
      icon: Package,
      color: '#2563eb',
    },
    {
      label: 'Khách hàng',
      value: stats?.totalCustomers?.toLocaleString('vi-VN') || '0',
      subValue: `Tháng này: ${stats?.ordersThisMonth || 0} đơn`,
      icon: Users,
      color: '#059669',
    },
  ];

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'completed' || statusLower === 'hoàn thành') return 'bg-green-100 text-green-700';
    if (statusLower === 'shipping' || statusLower === 'đang giao') return 'bg-blue-100 text-blue-700';
    if (statusLower === 'processing' || statusLower === 'đang xử lý') return 'bg-purple-100 text-purple-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'Chờ xử lý',
      processing: 'Đang xử lý',
      shipping: 'Đang giao',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy',
    };
    return statusMap[status.toLowerCase()] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Tổng quan</h1>
        <p className="text-slate-500 text-sm">Chào mừng trở lại! Đây là tóm tắt hôm nay.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 border border-slate-100"
            style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
            <p className="text-xs text-slate-400">{stat.subValue}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-slate-100" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Đơn hàng gần đây</h2>
        </div>
        {recentOrders.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400">
            <Package size={48} className="mx-auto mb-4 opacity-50" />
            <p>Chưa có đơn hàng nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Mã đơn</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Số sản phẩm</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Số tiền</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">#{order.orderCode}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.customerName}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.itemCount} sản phẩm</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                      {order.totalAmount.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
