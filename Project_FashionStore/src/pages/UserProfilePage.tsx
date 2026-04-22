import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Camera,
  Edit3,
  Package,
  CreditCard,
  Star,
  ChevronRight,
  Bell,
  Shield,
  Gift,
  Clock,
} from 'lucide-react';

const recentOrders = [
  {
    id: 'FS-20260401',
    date: '01/04/2026',
    total: 3396000,
    status: 'Đang giao',
    statusColor: '#4facfe',
    items: 3,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'FS-20260325',
    date: '25/03/2026',
    total: 1498000,
    status: 'Hoàn thành',
    statusColor: '#43e97b',
    items: 2,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 'FS-20260318',
    date: '18/03/2026',
    total: 2599000,
    status: 'Hoàn thành',
    statusColor: '#43e97b',
    items: 4,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
];

const menuItems = [
  { icon: Package, label: 'Đơn hàng của tôi', count: 5, href: '#orders' },
  { icon: Heart, label: 'Sản phẩm yêu thích', count: 12, href: '/wishlist' },
  { icon: MapPin, label: 'Sổ địa chỉ', count: 2, href: '#address' },
  { icon: CreditCard, label: 'Phương thức thanh toán', count: 1, href: '#payment' },
  { icon: Bell, label: 'Thông báo', count: 3, href: '#notifications' },
  { icon: Gift, label: 'Voucher của tôi', count: 4, href: '#vouchers' },
  { icon: Star, label: 'Đánh giá sản phẩm', href: '#reviews' },
  { icon: Shield, label: 'Bảo mật tài khoản', href: '#security' },
  { icon: Settings, label: 'Cài đặt', href: '#settings' },
];

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const profile = {
    name: user?.fullName ?? 'Khách hàng',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: 'Chưa cập nhật địa chỉ',
    avatar: null,
    memberSince: 'Tài khoản đã kích hoạt',
    level: user?.role === 'admin' ? 'Admin' : user?.role === 'vip' ? 'VIP' : 'Thành viên',
    points: 0,
  };

  return (
    <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)', minHeight: '100vh' }}>
      {/* Profile Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div
                className="w-28 h-28 rounded-3xl flex items-center justify-center overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(12px)',
                  border: '3px solid rgba(255,255,255,0.3)',
                }}
              >
                <User size={48} className="text-white/80" />
              </div>
              <button
                className="absolute bottom-1 right-1 w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
              >
                <Camera size={14} className="text-purple-600" />
              </button>
            </div>

            {/* User Info */}
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                <h1 className="text-3xl font-extrabold text-white">{profile.name}</h1>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(255,215,0,0.2)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.3)' }}
                >
                  👑 {profile.level}
                </span>
              </div>
              <p className="text-white/60 text-sm mb-2">{profile.memberSince}</p>
              <div className="flex items-center justify-center md:justify-start gap-6 text-white/70 text-sm">
                 <span className="flex items-center gap-1.5"><Mail size={14} /> {profile.email}</span>
                 <span className="flex items-center gap-1.5"><Phone size={14} /> {profile.phone}</span>

              </div>
            </div>

            {/* Points & Actions */}
            <div className="flex items-center gap-3">
              <div className="text-center px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                <p className="text-2xl font-extrabold text-white">{profile.points.toLocaleString()}</p>
                <p className="text-xs text-white/60">Điểm thưởng</p>
              </div>
              <button
                className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                <LogOut size={20} className="text-white/80" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Left: Menu */}
          <div className="lg:col-span-1">
            <div
              className="rounded-3xl p-4 sticky top-20"
              style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.href.startsWith('/')) {
                        navigate(item.href);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:bg-purple-50 group"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-100 group-hover:bg-purple-100 transition-colors">
                      <item.icon size={16} className="text-slate-500 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <span className="flex-1 text-sm font-semibold text-slate-700 group-hover:text-purple-600 transition-colors">
                      {item.label}
                    </span>
                    {item.count !== undefined && (
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-purple-400 transition-colors" />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-3 space-y-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Đơn hàng', value: '12', icon: ShoppingBag, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', glow: 'rgba(102,126,234,0.2)' },
                { label: 'Yêu thích', value: '24', icon: Heart, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', glow: 'rgba(240,147,251,0.2)' },
                { label: 'Đánh giá', value: '8', icon: Star, gradient: 'linear-gradient(135deg, #ffd700 0%, #ffb800 100%)', glow: 'rgba(255,215,0,0.2)' },
                { label: 'Voucher', value: '4', icon: Gift, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', glow: 'rgba(67,233,123,0.2)' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-5 transition-all hover:scale-105 cursor-pointer"
                  style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: stat.gradient, boxShadow: `0 4px 16px ${stat.glow}` }}
                  >
                    <stat.icon size={18} className="text-white" />
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Personal Info */}
            <div
              className="rounded-3xl p-6"
              style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-900">Thông tin cá nhân</h3>
                <button className="flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                  <Edit3 size={14} />
                  Chỉnh sửa
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { icon: User, label: 'Họ tên', value: profile.name },
                  { icon: Mail, label: 'Email', value: profile.email },
                  { icon: Phone, label: 'Số điện thoại', value: profile.phone },
                  { icon: MapPin, label: 'Địa chỉ', value: profile.address },
                ].map((field) => (
                  <div key={field.label} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: '#f8fafc' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(102,126,234,0.1)' }}>
                      <field.icon size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{field.label}</p>
                      <p className="text-sm font-semibold text-slate-700">{field.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div
              className="rounded-3xl p-6"
              style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-900">Đơn hàng gần đây</h3>
                <button className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                  Xem tất cả →
                </button>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: order.gradient }}
                    >
                      <Package size={22} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-bold text-slate-800">#{order.id}</p>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                          style={{ background: `${order.statusColor}15`, color: order.statusColor }}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Clock size={11} /> {order.date}</span>
                        <span>{order.items} sản phẩm</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{order.total.toLocaleString('vi-VN')}đ</p>
                      <ChevronRight size={16} className="text-slate-300 ml-auto mt-1 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
