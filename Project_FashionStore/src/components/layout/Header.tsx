import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Heart, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/products' },
  { label: 'Bộ sưu tập', href: '#' },
  { label: 'Về chúng tôi', href: '#' },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const cartCount = 3;
  const wishlistCount = 2;

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* Top announcement bar */}
      <div
        className="text-center py-2 text-xs font-medium"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}
      >
        <span className="text-white">🎉 Miễn phí vận chuyển đơn từ 500.000đ · Đổi trả 30 ngày</span>
      </div>

      <div className="container mx-auto flex h-16 items-center justify-between px-6">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 16px rgba(102,126,234,0.4)',
            }}
          >
            <Sparkles size={17} className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight hidden sm:block">
            Fashion<span style={{
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Store</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group rounded-lg hover:bg-slate-100/70"
            >
              {link.label}
              <span
                className="absolute bottom-1.5 left-4 right-4 h-px rounded-full opacity-0 group-hover:opacity-100 transition-all"
                style={{ background: 'linear-gradient(135deg, #667eea, #f093fb)' }}
              />
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className={`relative hidden sm:block transition-all duration-300 ${searchFocused ? 'w-72' : 'w-56'}`}>
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="h-9 w-full rounded-xl pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all"
              style={{
                background: '#f1f5f9',
                border: `1px solid ${searchFocused ? 'rgba(102,126,234,0.5)' : '#e2e8f0'}`,
              }}
            />
          </div>

          {/* Wishlist */}
          <button
            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all hover:bg-slate-100"
            style={{ border: '1px solid #e2e8f0' }}
          >
            <Heart size={17} />
            {wishlistCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: '#f5576c' }}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* User */}
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all hover:bg-slate-100"
            style={{ border: '1px solid #e2e8f0' }}
          >
            <User size={17} />
          </button>

          {/* Cart */}
          <a
            href="/cart"
            className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 4px 16px rgba(102,126,234,0.35)' }}
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:block">Giỏ hàng</span>
            {cartCount > 0 && (
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ background: 'rgba(255,255,255,0.25)' }}
              >
                {cartCount}
              </span>
            )}
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{ background: 'rgba(255,255,255,0.98)', borderTopColor: '#e2e8f0' }}
        >
          <div className="container mx-auto px-6 py-4 space-y-1">
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="h-10 w-full rounded-xl pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}
              />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
