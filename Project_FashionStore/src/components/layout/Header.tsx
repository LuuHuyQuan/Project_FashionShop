import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/products' },
  { label: 'Về chúng tôi', href: '/about' },
  { label: 'Liên hệ', href: '/contact' },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();
  const wishlistCount = 0; // TODO: Implement wishlist context

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white border-b border-slate-200"
    >
      {/* Top announcement bar - Enhanced with gradient */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-white/30 blur-2xl animate-pulse" />
          <div className="absolute top-0 right-1/4 w-24 h-24 rounded-full bg-white/20 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6 py-2.5 flex items-center justify-center gap-6 text-xs font-semibold text-white relative z-10">
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="text-yellow-300 text-sm">✨</span>
            <span>Miễn phí ship 500K+</span>
          </div>
          <span className="hidden sm:inline text-white/30">|</span>
          <div className="hidden sm:flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-sm">🔄</span>
            <span>Đổi trả 30 ngày</span>
          </div>
          <span className="hidden md:inline text-white/30">|</span>
          <div className="hidden md:flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="text-sm">🎁</span>
            <span>Giảm 30% đơn đầu</span>
          </div>
          <span className="hidden lg:inline text-white/30">|</span>
          <div className="hidden lg:flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <span className="text-sm">⚡</span>
            <span>Giao hàng 2H</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex h-16 items-center justify-between px-6">

        <a href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 4px 16px rgba(102,126,234,0.3)' }}>
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
              Fashion
            </span>
            <span className="text-xl font-extrabold text-slate-800 tracking-tight">Store</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group rounded-lg hover:bg-slate-100"
            >
              {link.label}
              <span className="absolute bottom-1.5 left-4 right-4 h-px rounded-full opacity-0 group-hover:opacity-100 transition-all bg-blue-600" />
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search - Enhanced */}
          <div className={`relative hidden sm:block transition-all duration-300 ${searchFocused ? 'w-80' : 'w-64'}`}>
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="h-10 w-full rounded-2xl pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all"
              style={{
                background: searchFocused ? '#ffffff' : '#f8fafc',
                border: searchFocused ? '2px solid #667eea' : '1px solid #e2e8f0',
                boxShadow: searchFocused ? '0 4px 16px rgba(102,126,234,0.15)' : 'none'
              }}
            />
          </div>

          {/* Wishlist - Enhanced */}
          <a
            href="/wishlist"
            className="relative w-10 h-10 rounded-2xl flex items-center justify-center text-slate-500 hover:text-pink-600 transition-all hover:bg-pink-50 group"
            style={{ border: '1px solid #e2e8f0' }}
          >
            <Heart size={18} className="group-hover:scale-110 transition-transform" />
            {wishlistCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white animate-bounce"
                style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}
              >
                {wishlistCount}
              </span>
            )}
          </a>

          {/* User - Enhanced */}
          <a
            href="/profile"
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-500 hover:text-purple-600 transition-all hover:bg-purple-50 group"
            style={{ border: '1px solid #e2e8f0' }}
          >
            <User size={18} className="group-hover:scale-110 transition-transform" />
          </a>

          {/* Cart - Enhanced with gradient */}
          <a
            href="/cart"
            className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-white font-bold text-sm transition-all hover:scale-105 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 16px rgba(102,126,234,0.4)'
            }}
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:block">Giỏ hàng</span>
            {cartCount > 0 && (
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold bg-white text-purple-600">
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

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white border-slate-200">
          <div className="container mx-auto px-6 py-4 space-y-1">
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="h-10 w-full rounded-xl pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-slate-100 border border-slate-200"
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
