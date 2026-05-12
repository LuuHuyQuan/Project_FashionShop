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
import { dashboardService } from '../../../services/dashboardService';
import type { DashboardData, RecentOrder, TopProduct, ActivityLog } from '../../../services/dashboardService';
import { swal } from '../../../utils/swal';
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
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Try to fetch from API
      try {
        const data = await dashboardService.getDashboardData();
        setDashboardData(data);
      } catch (apiError) {
        // Fallback to mock data if API not available
        logger.warn('Dashboard API not available, using mock data:', apiError);

        const mockData: DashboardData = {
          stats: {
            revenue: { value: 128450000, change: 12.5, isUp: true },
            orders: { value: 1284, change: 8.2, isUp: true },
            products: { value: 342, change: 3.1, isUp: true },
            users: { value: 5621, change: -1.4, isUp: false },
          },
          recentOrders: [
            { id: 1, orderCode: '#ORD-001', customerName: 'Nguyễn Văn A', productName: 'Áo thun Premium Cotton', totalAmount: 599000, status: 'Completed', createdAt: new Date().toISOString() },
            { id: 2, orderCode: '#ORD-002', customerName: 'Trần Thị B', productName: 'Quần jeans Skinny', totalAmount: 899000, status: 'Shipping', createdAt: new Date().toISOString() },
            { id: 3, orderCode: '#ORD-003', customerName: 'Lê Văn C', productName: 'Áo khoác Bomber', totalAmount: 1299000, status: 'Pending', createdAt: new Date().toISOString() },
            { id: 4, orderCode: '#ORD-004', customerName: 'Phạm Thị D', productName: 'Áo sơ mi Slim Fit', totalAmount: 749000, status: 'Completed', createdAt: new Date().toISOString() },
            { id: 5, orderCode: '#ORD-005', customerName: 'Hoàng Văn E', productName: 'Quần kaki Chinos', totalAmount: 799000, status: 'Cancelled', createdAt: new Date().toISOString() },
          ],
          topProducts: [
            { id: 1, name: 'Áo thun Premium Cotton', soldCount: 142, revenue: 85058000, categoryName: 'Áo' },
            { id: 2, name: 'Quần jeans Skinny', soldCount: 98, revenue: 88102000, categoryName: 'Quần' },
            { id: 3, name: 'Áo khoác Bomber', soldCount: 67, revenue: 87033000, categoryName: 'Áo khoác' },
            { id: 4, name: 'Áo sơ mi Slim Fit', soldCount: 115, revenue: 86135000, categoryName: 'Áo' },
          ],
          activities: [
            { id: 1, type: 'order', message: 'Đơn hàng #ORD-001 hoàn thành', createdAt: new Date(Date.now() - 2 * 60000).toISOString() },
            { id: 2, type: 'user', message: 'Người dùng mới đăng ký: hoang.lan@gmail.com', createdAt: new Date(Date.now() - 15 * 60000).toISOString() },
            { id: 3, type: 'product', message: 'Sản phẩm "Áo khoác Bomber" hết hàng', createdAt: new Date(Date.now() - 32 * 60000).toISOString() },
            { id: 4, type: 'review', message: 'Đánh giá 5⭐ từ Trần Thị B', createdAt: new Date(Date.now() - 60 * 60000).toISOString() },
            { id: 5, type: 'order', message: 'Đơn hàng #ORD-006 vừa được tạo', createdAt: new Date(Date.now() - 120 * 60000).toISOString() },
          ],
          lowStockCount: 5,
        };

        setDashboardData(mockData);
      }
    } catch (error) {
      logger.error('Error fetching dashboard data:', error);
      swal.error('Lỗi tải dữ liệu', 'Không thể tải dữ liệu dashboard. Vui lòng thử lại.');
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

  if (!dashboardData) {
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
      value: formatCurrency(dashboardData.stats.revenue.value),
      change: `${dashboardData.stats.revenue.change > 0 ? '+' : ''}${dashboardData.stats.revenue.change}%`,
      up: dashboardData.stats.revenue.isUp,
      icon: TrendingUp,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      bg: '#ede9fe',
      iconColor: '#7c3aed',
      sparkline: [40, 55, 48, 70, 65, 85, 78, 95, 88, 100],
    },
    {
      label: 'Đơn hàng',
      value: dashboardData.stats.orders.value.toString(),
      change: `${dashboardData.stats.orders.change > 0 ? '+' : ''}${dashboardData.stats.orders.change}%`,
      up: dashboardData.stats.orders.isUp,
      icon: ShoppingBag,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      bg: '#fce7f3',
      iconColor: '#db2777',
      sparkline: [30, 45, 38, 60, 55, 72, 68, 80, 75, 88],
    },
    {
      label: 'Sản phẩm',
      value: dashboardData.stats.products.value.toString(),
      change: `${dashboardData.stats.products.change > 0 ? '+' : ''}${dashboardData.stats.products.change}%`,
      up: dashboardData.stats.products.isUp,
      icon: Package,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      bg: '#dbeafe',
      iconColor: '#2563eb',
      sparkline: [60, 65, 62, 70, 68, 72, 70, 75, 72, 78],
    },
    {
      label: 'Người dùng',
      value: dashboardData.stats.users.value.toString(),
      change: `${dashboardData.stats.users.change > 0 ? '+' : ''}${dashboardData.stats.users.change}%`,
      up: dashboardData.stats.users.isUp,
      icon: Users,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      bg: '#d1fae5',
      iconColor: '#059669',
      sparkline: [80, 78, 75, 82, 79, 76, 80, 74, 72, 70],
    },
  ];

  const topProducts = dashboardData.topProducts.map((product, idx) => ({
    name: product.name,
    sold: product.soldCount,
    revenue: formatCurrency(product.revenue),
    progress: Math.min(100, (product.soldCount / Math.max(...dashboardData.topProducts.map(p => p.soldCount))) * 100),
    gradient: ['linear-gradient(90deg, #667eea, #764ba2)', 'linear-gradient(90deg, #f093fb, #f5576c)', 'linear-gradient(90deg, #4facfe, #00f2fe)', 'linear-gradient(90deg, #43e97b, #38f9d7)'][idx % 4],
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
                  {['Mã đơn', 'Khách hàng', 'Sản phẩm', 'Số tiền', 'Trạng thái', 'Ngày'].map((h) => (
                    <th key={h} className="text-left text-xs text-slate-400 font-semibold px-6 py-3 uppercase tracking-wider bg-slate-50">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentOrders.map((order, idx) => {
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
                      <td className="px-6 py-3.5 text-sm text-slate-400 max-w-[140px] truncate">{order.productName}</td>
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
            {topProducts.map((product, idx) => (
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
                  <span className="text-xs text-slate-400">{product.sold} sold</span>
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
              { label: 'Tổng sản phẩm', value: dashboardData.stats.products.value.toString(), color: '#7c3aed', bg: '#ede9fe' },
              { label: 'Tồn kho thấp', value: dashboardData.lowStockCount.toString(), color: '#dc2626', bg: '#fee2e2' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-3 text-center border border-slate-100" style={{ background: s.bg }}>
                <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Activity feed */}
      <div
        className="bg-white rounded-2xl p-5 border border-slate-100"
        style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800">Hoạt động gần đây</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-1">
          {dashboardData.activities.map((activity, i) => {
            const colors = [
              { color: '#16a34a', bg: '#dcfce7' },
              { color: '#7c3aed', bg: '#ede9fe' },
              { color: '#dc2626', bg: '#fee2e2' },
              { color: '#d97706', bg: '#fef3c7' },
              { color: '#2563eb', bg: '#dbeafe' },
            ];
            const colorSet = colors[i % colors.length];

            return (
              <div
                key={activity.id}
                className="flex-shrink-0 rounded-xl p-4 min-w-[220px] border"
                style={{ background: colorSet.bg, borderColor: colorSet.bg }}
              >
                <div className="w-1.5 h-1.5 rounded-full mb-2" style={{ background: colorSet.color }} />
                <p className="text-sm text-slate-700 leading-tight">{activity.message}</p>
                <p className="text-xs text-slate-400 mt-2">{formatRelativeTime(activity.createdAt)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
