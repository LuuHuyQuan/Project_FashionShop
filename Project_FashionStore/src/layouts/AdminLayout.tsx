import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tags,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'Tổng quan', icon: LayoutDashboard, path: '/admin', color: '#7c3aed' },
  { label: 'Sản phẩm', icon: Package, path: '/admin/products', color: '#2563eb' },
  { label: 'Đơn hàng', icon: ShoppingBag, path: '/admin/orders', color: '#db2777' },
  { label: 'Danh mục', icon: Tags, path: '/admin/categories', color: '#059669' },
  { label: 'Người dùng', icon: Users, path: '/admin/users', color: '#ea580c' },
  { label: 'Thống kê', icon: BarChart3, path: '/admin/analytics', color: '#0284c7' },
  { label: 'Cài đặt', icon: Settings, path: '/admin/settings', color: '#78716c' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifCount] = useState(3);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f1f5f9' }}>

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-[72px]'} flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out relative z-30`}
        style={{
          background: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          boxShadow: '2px 0 12px rgba(0,0,0,0.06)',
        }}
      >
        {/* Sidebar top accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #7c3aed 0%, #db2777 100%)' }} />

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-100">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
            }}
          >
            <Sparkles size={18} className="text-white" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="font-bold text-sm text-slate-800 leading-tight tracking-tight">FashionStore</p>
              <p className="text-xs font-medium" style={{ color: '#7c3aed' }}>Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className={`text-xs font-semibold mb-3 px-3 uppercase tracking-widest transition-all text-slate-400 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            Menu
          </p>
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                title={!sidebarOpen ? item.label : ''}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive ? '' : 'hover:bg-slate-50'
                }`}
                style={
                  isActive
                    ? {
                        background: `${item.color}12`,
                        border: `1px solid ${item.color}25`,
                      }
                    : { border: '1px solid transparent' }
                }
              >
                {/* Active indicator */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                    style={{ background: `linear-gradient(180deg, ${item.color}, ${item.color}80)` }}
                  />
                )}

                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isActive ? '' : 'group-hover:bg-slate-100'}`}
                  style={isActive ? { background: `${item.color}15` } : {}}
                >
                  <item.icon size={17} style={{ color: isActive ? item.color : '#94a3b8' }} />
                </div>

                {sidebarOpen && (
                  <span
                    className="text-sm font-medium flex-1"
                    style={{ color: isActive ? item.color : '#64748b' }}
                  >
                    {item.label}
                  </span>
                )}
                {sidebarOpen && isActive && (
                  <ChevronRight size={13} style={{ color: item.color, opacity: 0.6 }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom user */}
        <div className="px-3 pb-4 border-t border-slate-100 pt-3">
          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-slate-50 cursor-pointer ${!sidebarOpen ? 'justify-center' : ''}`}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                boxShadow: '0 2px 10px rgba(240,147,251,0.3)',
              }}
            >
              A
            </div>
            {sidebarOpen && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate leading-tight">Admin</p>
                  <p className="text-xs truncate text-slate-400">admin@fashionstore.vn</p>
                </div>
                <button className="text-slate-300 hover:text-red-400 transition-colors">
                  <LogOut size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center gap-4 px-6 py-3.5 flex-shrink-0 relative"
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-slate-400">Admin</span>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="font-semibold" style={{ color: '#7c3aed' }}>
              {navItems.find(
                (n) =>
                  location.pathname === n.path ||
                  (n.path !== '/admin' && location.pathname.startsWith(n.path))
              )?.label ?? 'Tổng quan'}
            </span>
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative hidden md:block">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-9 pr-4 py-2 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-violet-400 focus:bg-white w-52 transition-all"
            />
          </div>

          {/* Notification */}
          <button
            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
            style={{ border: '1px solid #e2e8f0' }}
          >
            <Bell size={17} />
            {notifCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}
              >
                {notifCount}
              </span>
            )}
          </button>

          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              boxShadow: '0 2px 10px rgba(240,147,251,0.3)',
            }}
          >
            A
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
