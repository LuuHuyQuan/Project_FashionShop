import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Star, Truck, Shield, Package,
  Sparkles, ChevronRight, Heart, ShoppingCart,
  Flame, Zap, ChevronLeft,
} from 'lucide-react';
import { categories as allCategories, getFeaturedProducts } from '../../data/products';

const featuredProducts = getFeaturedProducts(5);

const badgeColors: Record<string, { bg: string; text: string }> = {
  Sale: { bg: 'linear-gradient(135deg, #f5576c, #ef4444)', text: '#fff' },
  New: { bg: 'linear-gradient(135deg, #43e97b, #38f9d7)', text: '#075538' },
  Hot: { bg: 'linear-gradient(135deg, #fa709a, #fee140)', text: '#fff' },
  Trend: { bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', text: '#fff' },
};

const ITEMS_PER_PAGE = 5;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const maxIndex = allCategories.length - ITEMS_PER_PAGE;

  const toggleWishlist = (idx: number) => {
    setWishlist((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const visibleCategories = allCategories.slice(categoryIndex, categoryIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col">

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[90vh] flex items-center"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 40%, #faf5ff 100%)' }}
      >
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #667eea 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #f093fb 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #4facfe 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(100,100,140,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,140,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
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
              <button
                onClick={() => navigate('/products')}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 8px 32px rgba(102,126,234,0.4)' }}
              >
                Mua ngay
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/products')}
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

      {/* ── FEATURES ───────────────────────────────────── */}
      <section className="py-16" style={{ background: '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: 'Miễn phí vận chuyển', desc: 'Đơn hàng trên 500.000đ', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', glow: 'rgba(79,172,254,0.2)' },
              { icon: Shield, title: 'Bảo hành chính hãng', desc: 'Đổi trả trong 30 ngày', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', glow: 'rgba(102,126,234,0.2)' },
              { icon: Package, title: 'Đóng gói cẩn thận', desc: 'Sản phẩm được bảo vệ tốt nhất', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', glow: 'rgba(67,233,123,0.2)' },
            ].map((feat) => (
              <div
                key={feat.title}
                className="group rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
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

      {/* ── CATEGORIES CAROUSEL ─────────────────────────── */}
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

          <div className="relative">
            {/* Prev */}
            <button
              onClick={() => setCategoryIndex((p) => Math.max(p - 1, 0))}
              disabled={categoryIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 group disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 8px 24px rgba(102,126,234,0.4)' }}
            >
              <ChevronLeft size={24} className="text-white group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Grid */}
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {visibleCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => navigate('/products')}
                    className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 text-left"
                    style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                  >
                    {/* Real image */}
                    <div className="h-48 relative overflow-hidden bg-slate-100">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      {/* Name overlay on image */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-bold text-white text-base leading-tight drop-shadow">{cat.name}</h3>
                        <p className="text-white/70 text-xs mt-0.5">{cat.items} sản phẩm</p>
                      </div>
                    </div>
                    {/* Bottom bar */}
                    <div className="flex items-center justify-between px-4 py-3"
                      style={{ background: '#fff', borderTop: '1px solid #f1f5f9' }}>
                      <span className="text-xs text-slate-400 font-medium">Xem tất cả</span>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Next */}
            <button
              onClick={() => setCategoryIndex((p) => Math.min(p + 1, maxIndex))}
              disabled={categoryIndex >= maxIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 group disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 8px 24px rgba(102,126,234,0.4)' }}
            >
              <ChevronRight size={24} className="text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────── */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
                style={{ background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.2)' }}>
                <Zap size={12} className="text-purple-500" />
                <span className="text-xs text-purple-600 font-medium">Nổi bật</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1">Sản phẩm nổi bật</h2>
              <p className="text-slate-400">Những mẫu thiết kế được yêu thích nhất tuần này</p>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold transition-all group text-purple-600 hover:text-purple-700"
            >
              Xem tất cả
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {featuredProducts.map((product, idx) => {
              const bc = badgeColors[product.badge ?? ''] ?? badgeColors.Sale;
              const isWished = wishlist.includes(idx);
              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                >
                  {/* Product image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                    {/* Badge */}
                    {product.badge && (
                      <div
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold z-10"
                        style={{ background: bc.bg, color: bc.text, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                      >
                        {product.badge}
                      </div>
                    )}

                    {/* Actions overlay */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(idx); }}
                        className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      >
                        <Heart size={14} className={isWished ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      >
                        <ShoppingCart size={14} className="text-gray-600" />
                      </button>
                    </div>

                    {/* Add to cart hover bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-2.5 translate-y-full group-hover:translate-y-0 transition-all duration-300"
                      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
                    >
                      <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <ShoppingCart size={14} />
                        Thêm vào giỏ
                      </span>
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-slate-400">Fashion · Premium</p>
                      <span className="text-xs font-semibold text-purple-600">{product.category}</span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-sm leading-tight mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400">({product.reviews})</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        Đã bán {product.sold > 1000 ? `${(product.sold / 1000).toFixed(1)}k` : product.sold}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="font-extrabold text-slate-900 text-base">{product.price.toLocaleString('vi-VN')}đ</p>
                      {product.oldPrice && (
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                          -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    {product.oldPrice && (
                      <p className="text-xs text-slate-300 line-through mt-1">{product.oldPrice.toLocaleString('vi-VN')}đ</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ──────────────────────────────── */}
      <section className="py-10" style={{ background: '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div
            className="relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}
          >
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
                onClick={() => navigate('/register')}
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
