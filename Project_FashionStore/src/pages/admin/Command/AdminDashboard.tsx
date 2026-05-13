import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MoreHorizontal,
  Zap,
  Clock,
  Loader2,
} from 'lucide-react';
import { orderingService } from '../../../services/orderingService';
import type { DashboardStats, RecentOrder } from '../../../services/orderingService';
import { logger } from '../../../utils/logger';

const statusConfig: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  'Hoàn thành': { bg: '#dcfce7', text: '#16a34a', dot: '#16a34a', border: '#bbf7d0' },
  'Đang giao': { bg: '#dbeafe', text: '#2563eb', dot: '#2563eb', border: '#bfdbfe' },
  'Chờ xử lý': { bg: '#fef9c3', text: '#ca8a04', dot: '#ca8a04', border: '#fde68a' },
  'Đã hủy': { bg: '#fee2e2', text: '#dc2626', dot: '#dc2626', border: '#fecaca' },
  'Completed': { bg: '#dcfce7', text: '#16a34a', dot: '#16a34a', border: '#bbf7d0' },
  'Shipping': { bg: '#dbeafe', text: '#2563eb', dot: '#2563eb', border: '#bfdbfe' },
  'Pending': { bg: '#fef9c3', text: '#ca8a04', dot: '#ca8a04', border: '#fde68a' },
  'Cancelled': { bg: '#fee2e2', text: '#dc2626', dot: '#dc2626', border: '#fecaca' },
};

const avatarGradients = ['#667eea,#764ba2', '#f093fb,#f5576c', '#4facfe,#00f2fe', '#43e97b,#38f9d7', '#fa709a,#fee140'];

// Mini sparkline SVG
const Sparkline: React.FC<{ data: number[]; gradient: string; up: boolean }> = ({ data, up }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 60;
  const h = 24;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  });
  const color = up ? '#16a34a' : '#dc2626';
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-70">
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

const AdminDashboard: React.FC = () => {
  const [orderTab, setOrderTab] = useState<'recent' | 'all'>('recent');
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      console.log('Fetching dashboard data...');

      // Fetch all data in parallel
      const [stats, orders, products] = await Promise.all([
        orderingService.getDashboardStats(),
        orderingService.getRecentOrders(10),
        orderingService.getTopProducts(5)
      ]);

      console.log('Dashboard stats:', stats);
      console.log('Recent orders:', orders);
      console.log('Top products:', products);

      setDashboardStats(stats);
      setRecentOrders(orders);
      setTopProducts(products);
    } catch (error) {
      logger.error('Error fetching dashboard data:', error);
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return `${diffDays} ngày trước`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-slate-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!dashboardStats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Không có dữ liệu</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Doanh thu',
      value: formatCurrency(dashboardStats.totalRevenue),
      change: `+12.5%`,
      up: true,
      icon: TrendingUp,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      bg: '#ede9fe',
      iconColor: '#7c3aed',
      sparkline: [40, 55, 48, 70, 65, 85, 78, 95, 88, 100],
    },
    {
      label: 'Đơn hàng',
      value: dashboardStats.totalOrders.toString(),
      change: `+8.2%`,
      up: true,
      icon: ShoppingBag,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      bg: '#fce7f3',
      iconColor: '#db2777',
      sparkline: [30, 45, 38, 60, 55, 72, 68, 80, 75, 88],
    },
    {
      label: 'Sản phẩm bán',
      value: dashboardStats.totalProductsSold.toString(),
      change: `+3.1%`,
      up: true,
      icon: Package,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      bg: '#dbeafe',
      iconColor: '#2563eb',
      sparkline: [60, 65, 62, 70, 68, 72, 70, 75, 72, 78],
    },
    {
      label: 'Khách hàng',
      value: dashboardStats.totalCustomers.toString(),
      change: `+5.4%`,
      up: true,
      icon: Users,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      bg: '#d1fae5',
      iconColor: '#059669',
      sparkline: [80, 78, 75, 82, 79, 76, 80, 84, 82, 85],
    },
  ];

  const formattedTopProducts = topProducts.map((product: any, idx: number) => ({
    name: product.name,
    sold: product.totalSold,
    revenue: formatCurrency(product.totalRevenue),
    progress: Math.min(100, (product.totalSold / Math.max(...topProducts.map((p: any) => p.totalSold))) * 100),
    gradient: ['linear-gradient(90deg, #667eea, #764ba2)', 'linear-gradient(90deg, #f093fb, #f5576c)', 'linear-gradient(90deg, #4facfe, #00f2fe)', 'linear-gradient(90deg, #43e97b, #38f9d7)', 'linear-gradient(90deg, #fa709a, #fee140)'][idx % 5],
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={18} className="text-amber-500" />
            <h1 className="text-2xl font-bold text-slate-800">Tổng quan</h1>
          </div>
          <p className="text-slate-500 text-sm">Chào mừng trở lại! Đây là tóm tắt hôm nay.</p>
        </div>
        <div
          className="flex items-center gap-2 text-sm text-slate-500 rounded-xl px-4 py-2.5 bg-white border border-slate-200"
        >
          <Clock size={13} className="text-violet-500" />
          <span>Tháng 3, 2026</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer group border border-slate-100"
            style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 opacity-80"
              style={{ background: stat.gradient }}
            />

            <div className="flex items-start justify-between mb-4 relative">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: stat.bg }}
              >
                <stat.icon size={20} style={{ color: stat.iconColor }} />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${stat.up ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'
                  }`}
              >
                {stat.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {stat.change}
              </span>
            </div>

            <div className="relative">
              <p className="text-slate-400 text-xs font-medium mb-0.5">{stat.label}</p>
              <p className="text-slate-800 font-bold text-xl tracking-tight">{stat.value}</p>
              <div className="mt-3">
                <Sparkline data={stat.sparkline} gradient={stat.gradient} up={stat.up} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div
          className="xl:col-span-2 bg-white rounded-2xl overflow-hidden border border-slate-100"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-slate-800">Đơn hàng gần đây</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-600 font-medium">
                {recentOrders.length} đơn
              </span>
            </div>
            <button
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:bg-violet-50 text-violet-500 font-medium"
            >
              Xem tất cả <Eye size={12} />
            </button>
          </div>

          {/* Tab filter */}
          <div className="flex gap-1 px-6 pt-3">
            {(['recent', 'all'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setOrderTab(t)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={
                  orderTab === t
                    ? { background: '#ede9fe', color: '#7c3aed', border: '1px solid #ddd6fe' }
                    : { color: '#94a3b8', border: '1px solid transparent' }
                }
              >
                {t === 'recent' ? 'Hôm nay' : 'Tất cả'}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {['Mã đơn', 'Khách hàng', 'Số tiền', 'Trạng thái', 'Ngày'].map((h) => (
                    <th key={h} className="text-left text-xs text-slate-400 font-semibold px-6 py-3 uppercase tracking-wider bg-slate-50">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: any, idx: number) => {
                  const sc = statusConfig[order.status] || statusConfig['Pending'];
                  return (
                    <tr
                      key={order.id}
                      className="group transition-colors"
                      style={{ borderBottom: '1px solid #f8fafc' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td className="px-6 py-3.5 text-xs font-mono font-semibold" style={{ color: '#7c3aed' }}>{order.orderCode}</td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 text-white"
                            style={{ background: `linear-gradient(135deg, ${avatarGradients[idx % 5]})` }}
                          >
                            {order.customerName.charAt(0)}
                          </div>
                          <span className="text-sm text-slate-700 font-medium">{order.customerName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-sm font-bold text-slate-800">{formatCurrency(order.totalAmount)}</td>
                      <td className="px-6 py-3.5">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sc.dot }} />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-xs text-slate-400">{formatDate(order.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div
          className="bg-white rounded-2xl overflow-hidden border border-slate-100"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Bán chạy nhất</h2>
            <button className="text-slate-300 hover:text-slate-500 transition-colors p-1">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="p-5 space-y-5">
            {formattedTopProducts.map((product: any, idx: number) => (
              <div key={product.name} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: product.gradient }}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-sm text-slate-600 truncate max-w-[130px] group-hover:text-slate-800 transition-colors">
                      {product.name}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{product.sold} bán</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${product.progress}%`, background: product.gradient }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1.5 text-right">{product.revenue}</p>
              </div>
            ))}
          </div>

          {/* Quick stats at bottom */}
          <div className="px-5 pb-5 grid grid-cols-2 gap-2">
            {[
              { label: 'Tổng đơn hàng', value: dashboardStats.totalOrders.toString(), color: '#7c3aed', bg: '#ede9fe' },
              { label: 'Khách hàng', value: dashboardStats.totalCustomers.toString(), color: '#059669', bg: '#d1fae5' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-3 text-center border border-slate-100" style={{ background: s.bg }}>
                <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="bg-white rounded-2xl p-5 border border-slate-100"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
        >
          <h3 className="text-sm font-semibold text-slate-500 mb-2">Doanh thu hôm nay</h3>
          <p className="text-2xl font-bold text-slate-800">{formatCurrency(dashboardStats.revenueToday)}</p>
          <p className="text-xs text-slate-400 mt-1">{dashboardStats.ordersToday} đơn hàng</p>
        </div>
        <div
          className="bg-white rounded-2xl p-5 border border-slate-100"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
        >
          <h3 className="text-sm font-semibold text-slate-500 mb-2">Doanh thu tháng này</h3>
          <p className="text-2xl font-bold text-slate-800">{formatCurrency(dashboardStats.revenueThisMonth)}</p>
          <p className="text-xs text-slate-400 mt-1">{dashboardStats.ordersThisMonth} đơn hàng</p>
        </div>
        <div
          className="bg-white rounded-2xl p-5 border border-slate-100"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
        >
          <h3 className="text-sm font-semibold text-slate-500 mb-2">Giá trị trung bình</h3>
          <p className="text-2xl font-bold text-slate-800">{formatCurrency(dashboardStats.averageOrderValue)}</p>
          <p className="text-xs text-slate-400 mt-1">Mỗi đơn hàng</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
