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
      {/* Top announcement bar - Enhanced */}
      <div className="relative overflow-hidden bg-blue-600">
        <div className="container mx-auto px-6 py-2 flex items-center justify-center gap-6 text-xs font-semibold text-white relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-yellow-300">✨</span>
            <span>Miễn phí ship 500K+</span>
          </div>
          <span className="hidden sm:inline text-white/40">|</span>
          <div className="hidden sm:flex items-center gap-2">
            <span>🔄</span>
            <span>Đổi trả 30 ngày</span>
          </div>
          <span className="hidden md:inline text-white/40">|</span>
          <div className="hidden md:flex items-center gap-2">
            <span>🎁</span>
            <span>Giảm 30% đơn đầu</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex h-16 items-center justify-between px-6">

        <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-600">
            <Sparkles size={17} className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight hidden sm:block">
            Fashion<span className="text-slate-600">Store</span>
          </span>
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
          {/* Search */}
          <div className={`relative hidden sm:block transition-all duration-300 ${searchFocused ? 'w-72' : 'w-56'}`}>
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="h-9 w-full rounded-xl pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all bg-slate-100 border border-slate-200 focus:border-slate-300"
            />
          </div>

          {/* Wishlist */}
          <a
            href="/wishlist"
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
          </a>

          {/* User */}
          <a
            href="/profile"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all hover:bg-slate-100"
            style={{ border: '1px solid #e2e8f0' }}
          >
            <User size={17} />
          </a>

          {/* Cart */}
          <a
            href="/cart"
            className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 bg-blue-600"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:block">Giỏ hàng</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-white/20">
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
