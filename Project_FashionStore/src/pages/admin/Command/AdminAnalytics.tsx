import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from 'lucide-react';

const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

const monthlyRevenue = [42, 58, 75, 62, 88, 95, 72, 110, 98, 125, 108, 128];
const monthlyOrders = [180, 240, 310, 280, 390, 420, 340, 510, 460, 580, 510, 620];

const maxRevenue = Math.max(...monthlyRevenue);
const maxOrders = Math.max(...monthlyOrders);

const topCategories = [
  { name: 'Áo thun', revenue: 42500000, orders: 284, progress: 85, gradient: 'linear-gradient(90deg, #667eea, #764ba2)' },
  { name: 'Quần jeans', revenue: 38900000, orders: 213, progress: 70, gradient: 'linear-gradient(90deg, #f093fb, #f5576c)' },
  { name: 'Áo khoác', revenue: 31200000, orders: 145, progress: 58, gradient: 'linear-gradient(90deg, #4facfe, #00f2fe)' },
  { name: 'Áo sơ mi', revenue: 28600000, orders: 198, progress: 50, gradient: 'linear-gradient(90deg, #43e97b, #38f9d7)' },
  { name: 'Áo polo', revenue: 18400000, orders: 112, progress: 38, gradient: 'linear-gradient(90deg, #fa709a, #fee140)' },
];

const topCustomers = [
  { name: 'Hoàng Thị Lan', orders: 45, spent: 52000000, gradient: '#667eea,#764ba2' },
  { name: 'Bùi Văn Hùng', orders: 31, spent: 37800000, gradient: '#f093fb,#f5576c' },
  { name: 'Trần Thị Bình', orders: 28, spent: 28500000, gradient: '#4facfe,#00f2fe' },
  { name: 'Đặng Thu Hà', orders: 8, spent: 6700000, gradient: '#43e97b,#38f9d7' },
];

const kpiList = [
  { label: 'Doanh thu tháng', value: '128.450.000đ', change: '+12.5%', up: true, icon: TrendingUp, gradient: 'linear-gradient(135deg, #667eea, #764ba2)', bg: '#ede9fe', iconColor: '#7c3aed' },
  { label: 'Đơn hàng', value: '620', change: '+18.2%', up: true, icon: ShoppingBag, gradient: 'linear-gradient(135deg, #f093fb, #f5576c)', bg: '#fce7f3', iconColor: '#db2777' },
  { label: 'Khách hàng mới', value: '47', change: '+5.8%', up: true, icon: Users, gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)', bg: '#d1fae5', iconColor: '#059669' },
  { label: 'Sản phẩm bán', value: '1.284', change: '-2.1%', up: false, icon: Package, gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)', bg: '#dbeafe', iconColor: '#2563eb' },
];

type Period = '7d' | '30d' | '3m' | '1y';

const AdminAnalytics: React.FC = () => {
  const [period, setPeriod] = useState<Period>('30d');
  const [activeChart, setActiveChart] = useState<'revenue' | 'orders'>('revenue');

  const periodLabels: Record<Period, string> = {
    '7d': '7 ngày',
    '30d': '30 ngày',
    '3m': '3 tháng',
    '1y': '1 năm',
  };

  const chartData = activeChart === 'revenue' ? monthlyRevenue : monthlyOrders;
  const maxVal = activeChart === 'revenue' ? maxRevenue : maxOrders;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Thống kê &amp; Báo cáo</h1>
          <p className="text-slate-500 text-sm mt-1">Phân tích hiệu suất kinh doanh</p>
        </div>
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          {(['7d', '30d', '3m', '1y'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={
                period === p
                  ? { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff' }
                  : { color: '#94a3b8' }
              }
            >
              {periodLabels[p]}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiList.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-2xl p-5 border border-slate-100 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
            style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: kpi.bg }}>
                <kpi.icon size={18} style={{ color: kpi.iconColor }} />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${kpi.up ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}
              >
                {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.change}
              </span>
            </div>
            <p className="text-slate-400 text-xs mb-1">{kpi.label}</p>
            <p className="text-slate-800 font-bold text-xl">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div
        className="bg-white rounded-2xl border border-slate-100"
        style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <BarChart3 size={18} className="text-violet-500" />
            <h2 className="font-bold text-slate-800">Biểu đồ</h2>
          </div>
          <div className="flex gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
            {[
              { key: 'revenue', label: 'Doanh thu' },
              { key: 'orders', label: 'Đơn hàng' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveChart(tab.key as typeof activeChart)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={
                  activeChart === tab.key
                    ? { background: '#ede9fe', color: '#7c3aed', border: '1px solid #ddd6fe' }
                    : { color: '#94a3b8' }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">
          {/* Bar chart */}
          <div className="flex items-end justify-between gap-1.5 h-48">
            {chartData.map((val, i) => {
              const heightPct = (val / maxVal) * 100;
              const isLast = i === chartData.length - 1;
              return (
                <div key={i} className="flex flex-col items-center gap-1 flex-1 h-full justify-end group">
                  <div className="relative w-full flex justify-center">
                    <div
                      className="w-full max-w-[28px] rounded-t-lg transition-all duration-500 cursor-pointer"
                      style={{
                        height: `${(heightPct / 100) * 180}px`,
                        background: isLast
                          ? 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)'
                          : '#e0e7ff',
                      }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <div className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white whitespace-nowrap shadow-xl">
                          {activeChart === 'revenue' ? `${val}M đ` : `${val} đơn`}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{months[i]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top categories */}
        <div
          className="bg-white rounded-2xl border border-slate-100"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
        >
          <div className="p-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Danh mục bán chạy</h2>
          </div>
          <div className="p-5 space-y-4">
            {topCategories.map((cat, i) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: cat.gradient }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-700">{cat.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-800">{cat.revenue.toLocaleString('vi-VN')}đ</p>
                    <p className="text-xs text-slate-400">{cat.orders} đơn</p>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${cat.progress}%`, background: cat.gradient }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top customers */}
        <div
          className="bg-white rounded-2xl border border-slate-100"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
        >
          <div className="p-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Khách hàng thân thiết</h2>
          </div>
          <div className="p-5 space-y-4">
            {topCustomers.map((cus, i) => (
              <div key={cus.name} className="flex items-center gap-3">
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${cus.gradient})` }}
                >
                  {i + 1}
                </span>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${cus.gradient})` }}
                >
                  {cus.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{cus.name}</p>
                  <p className="text-xs text-slate-400">{cus.orders} đơn hàng</p>
                </div>
                <p className="text-sm font-semibold text-slate-800">{cus.spent.toLocaleString('vi-VN')}đ</p>
              </div>
            ))}
          </div>

          {/* Mini stats */}
          <div className="px-5 pb-5 grid grid-cols-2 gap-3">
            {[
              { label: 'Tỉ lệ chuyển đổi', value: '3.8%', color: '#059669', bg: '#d1fae5', up: true },
              { label: 'Giá trị trung bình', value: '1.2Mđ', color: '#2563eb', bg: '#dbeafe', up: true },
              { label: 'Tỉ lệ hoàn hàng', value: '1.2%', color: '#d97706', bg: '#fef3c7', up: false },
              { label: 'Đánh giá TB', value: '4.8 ⭐', color: '#7c3aed', bg: '#ede9fe', up: true },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-3 border border-slate-100" style={{ background: stat.bg }}>
                <div className="flex items-center gap-1 mb-1">
                  {stat.up ? <TrendingUp size={11} style={{ color: stat.color }} /> : <TrendingDown size={11} style={{ color: stat.color }} />}
                  <span className="text-xs text-slate-500">{stat.label}</span>
                </div>
                <p className="text-base font-bold" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
