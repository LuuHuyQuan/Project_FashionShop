import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Star, Truck, Shield, Package,
  Sparkles, ChevronRight, Heart, ShoppingCart,
  Flame, Zap, ChevronLeft,
} from 'lucide-react';
import { catalogService } from '../../services/catalogService';
import type { Category } from '../../services/catalogService';
import { mapProducts, type DisplayProduct } from '../../utils/productMapper';
import {
  BrandStorySection,
  QualityGuaranteeSection
} from '../../components/home/AdditionalSections';
import { logger } from '../../utils/logger';
import { BADGE_COLORS } from '../../constants/theme';
import { PAGINATION } from '../../constants/config';

const badgeColors = BADGE_COLORS;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, productsData] = await Promise.all([
          catalogService.getCategories(),
          catalogService.getProducts()
        ]);

        logger.dev('Categories fetched:', categoriesData);
        logger.dev('Products fetched:', productsData);

        const activeCategories = categoriesData.filter(c => c.status === 'active');
        const activeProducts = productsData.filter(p => p.status === 'active').slice(0, PAGINATION.ITEMS_PER_PAGE);

        setCategories(activeCategories);
        const mappedProducts = mapProducts(activeProducts);
        logger.dev('Mapped products:', mappedProducts);
        setFeaturedProducts(mappedProducts);
      } catch (error) {
        logger.error('Error fetching data:', error);
        // Fallback to empty arrays on error
        setCategories([]);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const maxIndex = Math.max(0, categories.length - ITEMS_PER_PAGE);

  const toggleWishlist = (idx: number) => {
    setWishlist((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const visibleCategories = categories.slice(categoryIndex, categoryIndex + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen loading-bg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-hero">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full orb-purple" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full orb-pink" />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full orb-blue" />
          <div className="absolute inset-0 grid-pattern-light" />
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full badge-primary">
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

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Chưa có danh mục nào</p>
            </div>
          ) : (
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
                      key={cat.id}
                      onClick={() => navigate('/products')}
                      className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 text-left"
                      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                    >
                      {/* Real image */}
                      <div className="h-48 relative overflow-hidden bg-slate-100">
                        <img
                          src={cat.image || 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=' + encodeURIComponent(cat.name)}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=' + encodeURIComponent(cat.name);
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        {/* Name overlay on image */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="font-bold text-white text-base leading-tight drop-shadow">{cat.name}</h3>
                          <p className="text-white/70 text-xs mt-0.5">Xem tất cả</p>
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
          )}
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

          {featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Chưa có sản phẩm nào</p>
            </div>
          ) : (
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
          )}
        </div>
      </section>

      {/* ── NEW SECTIONS ──────────────────────────────── */}
      <BrandStorySection />
      <QualityGuaranteeSection />

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

      <section className="py-20" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fef3f2 100%)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(245,87,108,0.1)', border: '1px solid rgba(245,87,108,0.2)' }}>
              <Flame size={13} className="text-red-500" />
              <span className="text-sm text-red-600 font-medium">Xu hướng</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Đang thịnh hành</h2>
            <p className="text-slate-400 text-lg">Những sản phẩm hot nhất hiện nay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Áo thun Oversize', desc: 'Phong cách thoải mái, năng động', color: 'from-orange-400 to-pink-500', emoji: '👕', items: '2.5k+' },
              { title: 'Quần jeans rách', desc: 'Cá tính, phá cách', color: 'from-blue-400 to-cyan-500', emoji: '👖', items: '1.8k+' },
              { title: 'Áo khoác denim', desc: 'Bền bỉ, thời thượng', color: 'from-purple-400 to-pink-500', emoji: '🧥', items: '1.2k+' },
            ].map((trend, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl p-8 cursor-pointer transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))`, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
                onClick={() => navigate('/products')}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${trend.color} opacity-90`} />
                <div className="absolute -right-8 -bottom-8 text-[120px] opacity-20">{trend.emoji}</div>

                <div className="relative z-10">
                  <div className="text-5xl mb-4">{trend.emoji}</div>
                  <h3 className="text-2xl font-extrabold text-white mb-2">{trend.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{trend.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/90 text-xs font-semibold">{trend.items} sản phẩm</span>
                    <ArrowRight size={20} className="text-white group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────── */}
      <section className="py-20" style={{ background: '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.2)' }}>
              <Star size={13} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-purple-600 font-medium">Đánh giá</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Khách hàng nói gì</h2>
            <p className="text-slate-400 text-lg">Hơn 50,000 khách hàng hài lòng</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Nguyễn Văn A', role: 'Khách hàng thân thiết', rating: 5, comment: 'Sản phẩm chất lượng tuyệt vời, giao hàng nhanh chóng. Tôi rất hài lòng với dịch vụ!', avatar: '👨' },
              { name: 'Trần Thị B', role: 'Fashionista', rating: 5, comment: 'Thiết kế đẹp, chất liệu cao cấp. Đội ngũ tư vấn nhiệt tình. Sẽ tiếp tục ủng hộ!', avatar: '👩' },
              { name: 'Lê Văn C', role: 'Blogger', rating: 5, comment: 'Giá cả hợp lý, nhiều ưu đãi. Đóng gói cẩn thận. Đây là shop yêu thích của tôi!', avatar: '🧑' },
            ].map((review, idx) => (
              <div
                key={idx}
                className="rounded-3xl p-6 transition-all hover:scale-105 hover:shadow-xl"
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{review.name}</h4>
                    <p className="text-xs text-slate-400">{review.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM FEED ──────────────────────────────── */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fef3f2 100%)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(228,64,95,0.1)', border: '1px solid rgba(228,64,95,0.2)' }}>
              <span className="text-sm">📸</span>
              <span className="text-sm text-pink-600 font-medium">Instagram</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Theo dõi chúng tôi <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">@fashionstore</span>
            </h2>
            <p className="text-slate-400 text-lg">Cảm hứng thời trang mỗi ngày</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                style={{ background: `linear-gradient(135deg, ${['#667eea', '#f093fb', '#4facfe', '#fa709a', '#43e97b', '#ffd89b'][idx]}, ${['#764ba2', '#f5576c', '#00f2fe', '#fee140', '#38f9d7', '#19547b'][idx]})` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <Heart size={32} className="text-white" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #e4405f, #c13584)', boxShadow: '0 8px 24px rgba(228,64,95,0.4)' }}
            >
              <span>📱</span>
              Theo dõi ngay
            </button>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────── */}
      <section className="py-20" style={{ background: '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div
            className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center"
            style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}
          >
            <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/20 blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="text-6xl mb-6">📧</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Đăng ký nhận tin
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Nhận thông tin về sản phẩm mới, ưu đãi đặc biệt và xu hướng thời trang mới nhất
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  className="flex-1 px-6 py-4 rounded-2xl text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  style={{ border: '2px solid rgba(255,255,255,0.3)' }}
                />
                <button
                  className="px-8 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105 whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', boxShadow: '0 8px 24px rgba(102,126,234,0.4)' }}
                >
                  Đăng ký →
                </button>
              </div>

              <p className="text-white/70 text-xs mt-4">
                Chúng tôi tôn trọng quyền riêng tư của bạn. Hủy đăng ký bất cứ lúc nào.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
