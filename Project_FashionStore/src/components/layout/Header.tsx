import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Heart } from 'lucide-react';
import { Badge } from '../ui/badge';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
            FASHION<span className=" from-purple-600 to-pink-600 bg-clip-text text-transparent">STORE</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Trang chủ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="/products" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Sản phẩm
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Bộ sưu tập
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Về chúng tôi
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="h-10 w-64 rounded-full border bg-muted/50 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all focus:w-72"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-full transition-all hover:scale-110 relative group">
              <Heart size={20} />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] p-0 border-2 border-white group-hover:scale-110 transition-transform">
                0
              </Badge>
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-all hover:scale-110">
              <User size={20} />
            </button>
            <a href="/cart" className="p-2 hover:bg-muted rounded-full transition-all hover:scale-110 relative group">
              <ShoppingCart size={20} />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-white text-[10px] p-0 border-2 border-white group-hover:scale-110 transition-transform animate-pulse">
                3
              </Badge>
            </a>
            <button
              className="md:hidden p-2 hover:bg-muted rounded-full transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white animate-in slide-in-from-top-5 duration-300">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="h-10 w-full rounded-full border bg-muted/50 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors py-2">Trang chủ</a>
            <a href="/products" className="text-sm font-medium hover:text-primary transition-colors py-2">Sản phẩm</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors py-2">Bộ sưu tập</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors py-2">Về chúng tôi</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
