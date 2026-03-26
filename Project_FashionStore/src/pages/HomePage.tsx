import React, { useState } from 'react';
import { ArrowRight, Star, Truck, Shield, Package, Sparkles, ChevronRight, Heart, ShoppingCart, Flame, Zap } from 'lucide-react';

const categories = [
  { name: 'Áo thun', items: 120, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '👕' },
  { name: 'Áo sơ mi', items: 85, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', emoji: '👔' },
  { name: 'Quần jeans', items: 95, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', emoji: '👖' },
  { name: 'Phụ kiện', items: 150, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', emoji: '🎒' },
];

const featuredProducts = [
  { name: 'Áo thun Premium Cotton', price: 599000, oldPrice: 799000, badge: 'Sale', rating: 5, reviews: 284, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Áo sơ mi Slim Fit', price: 749000, badge: 'New', rating: 4, reviews: 165, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Quần jeans Skinny', price: 899000, badge: 'Hot', rating: 5, reviews: 213, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Áo khoác Bomber', price: 1299000, badge: 'Trend', rating: 4, reviews: 98, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
];

const badgeColors: Record<string, { bg: string; text: string }> = {
  Sale: { bg: 'linear-gradient(135deg, #f5576c, #ef4444)', text: '#fff' },
  New: { bg: 'linear-gradient(135deg, #43e97b, #38f9d7)', text: '#075538' },
  Hot: { bg: 'linear-gradient(135deg, #fa709a, #fee140)', text: '#fff' },
  Trend: { bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', text: '#fff' },
};

const HomePage: React.FC = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (idx: number) => {
    setWishlist((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
  };

  return (
    <div className="flex flex-col">

      {/* ─── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 40%, #faf5ff 100%)' }}>

        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #667eea 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #f093fb 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #4facfe 0%, transparent 70%)', filter: 'blur(60px)' }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(100,100,140,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,140,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
              style={{ background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.2)' }}>
              <Sparkles size={14} className="text-purple-500" />
              <span className="text-sm font-medium text-purple-600">Bộ sưu tập mùa xuân 2026</span>
            </div>

            <h1 className="text-6xl md:text-7xl xl:text-[90px] font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-8">
              Định Hình{' '}
              <span className="relative inline-block">
                <span style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #fa709a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Phong Cách
                </span>
              </span>
              <br />Của Bạn
            </h1>

            <p className="text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
              Khám phá bộ sưu tập mới nhất với những thiết kế độc quyền, mang lại sự tự tin và thoải mái cho mọi hoạt động hàng ngày.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/products"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.4)',
                }}
              >
                Mua ngay
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-slate-700 text-base transition-all hover:bg-slate-100"
                style={{ border: '1px solid #cbd5e1' }}
              >
                Xem bộ sưu tập
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-12" style={{ borderTop: '1px solid #e2e8f0' }}>
              {[
                { value: '10.000+', label: 'Sản phẩm' },
                { value: '50.000+', label: 'Khách hàng' },
                { value: '4.9★', label: 'Đánh giá TB' },
                { value: '98%', label: 'Hài lòng' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────── */}
      <section className="py-16" style={{ background: '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Truck,
                title: 'Miễn phí vận chuyển',
                desc: 'Đơn hàng trên 500.000đ',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                glow: 'rgba(79,172,254,0.2)',
              },
              {
                icon: Shield,
                title: 'Bảo hành chính hãng',
                desc: 'Đổi trả trong 30 ngày',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                glow: 'rgba(102,126,234,0.2)',
              },
              {
                icon: Package,
                title: 'Đóng gói cẩn thận',
                desc: 'Sản phẩm được bảo vệ tốt nhất',
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                glow: 'rgba(67,233,123,0.2)',
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="group rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: feat.gradient, boxShadow: `0 8px 24px ${feat.glow}` }}
                >
                  <feat.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{feat.title}</h3>
                  <p className="text-slate-400 text-sm mt-0.5">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────── */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(244,114,182,0.1)', border: '1px solid rgba(244,114,182,0.2)' }}>
              <Flame size={13} className="text-pink-500" />
              <span className="text-sm text-pink-600 font-medium">Danh mục</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Danh mục sản phẩm</h2>
            <p className="text-slate-400 text-lg">Khám phá phong cách phù hợp với bạn</p>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {categories.map((cat) => (
              <a
                href="/products"
                key={cat.name}
                className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
              >
                {/* Gradient bg */}
                <div className="h-52 relative flex items-center justify-center" style={{ background: cat.gradient }}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
                  {/* Decorative circles */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/20" />
                  <div className="absolute -top-5 -left-5 w-24 h-24 rounded-full bg-white/20" />
                  <span className="text-6xl relative z-10 group-hover:scale-125 transition-transform duration-500">
                    {cat.emoji}
                  </span>
                </div>
                {/* Info */}
                <div className="p-4 bg-white" style={{ borderTop: '0' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">{cat.name}</h3>
                      <p className="text-slate-400 text-xs mt-0.5">{cat.items} sản phẩm</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────── */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.2)' }}>
                <Zap size={13} className="text-purple-500" />
                <span className="text-sm text-purple-600 font-medium">Nổi bật</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">Sản phẩm nổi bật</h2>
              <p className="text-slate-400 text-lg">Những mẫu thiết kế được yêu thích nhất tuần này</p>
            </div>
            <a
              href="/products"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold transition-all group text-purple-600 hover:text-purple-700"
            >
              Xem tất cả
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, idx) => {
              const bc = badgeColors[product.badge] ?? badgeColors.Sale;
              const isWished = wishlist.includes(idx);
              return (
                <div
                  key={idx}
                  className="group rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Product image area */}
                  <div className="relative aspect-[4/5] overflow-hidden" style={{ background: product.gradient }}>
                    {/* Decorative */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
                    <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-white/15" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] font-black text-white/15 select-none">
                      {idx + 1}
                    </div>

                    {/* Badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold z-10"
                      style={{ background: bc.bg, color: bc.text, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                    >
                      {product.badge}
                    </div>

                    {/* Actions overlay */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <button
                        onClick={(e) => { e.preventDefault(); toggleWishlist(idx); }}
                        className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      >
                        <Heart
                          size={16}
                          className={isWished ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                        />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <ShoppingCart size={16} className="text-gray-600" />
                      </button>
                    </div>

                    {/* Add to cart hover bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-3 translate-y-full group-hover:translate-y-0 transition-all duration-300"
                      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
                    >
                      <span className="text-white text-sm font-semibold flex items-center gap-2">
                        <ShoppingCart size={16} />
                        Thêm vào giỏ hàng
                      </span>
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="p-5">
                    <p className="text-xs text-slate-400 mb-1.5">Fashion · Premium</p>
                    <h3 className="font-bold text-slate-800 text-base leading-tight mb-3 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <p className="font-extrabold text-slate-900 text-lg">{product.price.toLocaleString('vi-VN')}đ</p>
                      {product.oldPrice && (
                        <p className="text-sm text-slate-300 line-through">{product.oldPrice.toLocaleString('vi-VN')}đ</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PROMO BANNER ─────────────────────── */}
      <section className="py-10" style={{ background: '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div
            className="relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}
          >
            {/* Decorative */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 right-40 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Sparkles size={14} className="text-yellow-200" />
                <span className="text-sm font-semibold text-white">Ưu đãi đặc biệt</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
                Giảm giá <span className="text-yellow-200">30%</span><br />cho khách hàng mới
              </h2>
              <p className="text-lg text-white/75 mb-8">
                Đăng ký ngay hôm nay để nhận mã giảm giá đặc biệt cho đơn hàng đầu tiên của bạn.
              </p>
              <button
                className="px-10 py-4 rounded-2xl font-bold text-purple-700 bg-white text-base transition-all hover:bg-yellow-50 hover:scale-105"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
              >
                Nhận mã ngay →
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
