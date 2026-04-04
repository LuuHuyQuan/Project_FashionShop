import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Package, Sparkles, ChevronRight, Heart, ShoppingCart, Flame, Zap, ChevronLeft } from 'lucide-react';
import { categories, getFeaturedProducts, getBestSellers, getNewArrivals } from '../data/products.ts';

const badgeColors: Record<string, { bg: string; text: string }> = {
  Sale: { bg: '#ef4444', text: '#fff' },
  New: { bg: '#10b981', text: '#fff' },
  Hot: { bg: '#f59e0b', text: '#fff' },
  Trend: { bg: '#8b5cf6', text: '#fff' },
  Mới: { bg: '#10b981', text: '#fff' },
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const itemsPerPage = 5;
  const scrollAmount = 1;
  const maxIndex = categories.length - itemsPerPage;

  // Get data from products.js
  const featuredProducts = getFeaturedProducts(5);
  const bestSellers = getBestSellers(6);
  const newArrivals = getNewArrivals(4);

  const toggleWishlist = (idx: number) => {
    setWishlist((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
  };

  const nextCategories = () => {
    setCategoryIndex((prev) => Math.min(prev + scrollAmount, maxIndex));
  };

  const prevCategories = () => {
    setCategoryIndex((prev) => Math.max(prev - scrollAmount, 0));
  };

  const visibleCategories = categories.slice(
    categoryIndex,
    categoryIndex + itemsPerPage
  );

  return (
    <div className="flex flex-col">

      {/* ─── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-white">
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-slate-100 border border-slate-200">
              <Sparkles size={14} className="text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Bộ sưu tập mùa xuân 2026</span>
            </div>

            <h1 className="text-6xl md:text-7xl xl:text-[90px] font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-8">
              Định Hình{' '}
              <span className="text-slate-700">
                Phong Cách
              </span>
              <br />Của Bạn
            </h1>

            <p className="text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
              Khám phá bộ sưu tập mới nhất với những thiết kế độc quyền, mang lại sự tự tin và thoải mái cho mọi hoạt động hàng ngày.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/products')}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-white text-base transition-all bg-blue-600 hover:bg-blue-700"
              >
                Mua ngay
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-slate-700 text-base transition-all hover:bg-slate-100 border border-slate-300"
              >
                Xem bộ sưu tập
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-12 border-t border-slate-200">
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
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Truck,
                title: 'Miễn phí vận chuyển',
                desc: 'Đơn hàng trên 500.000đ',
              },
              {
                icon: Shield,
                title: 'Bảo hành chính hãng',
                desc: 'Đổi trả trong 30 ngày',
              },
              {
                icon: Package,
                title: 'Đóng gói cẩn thận',
                desc: 'Sản phẩm được bảo vệ tốt nhất',
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="group rounded-lg p-6 flex items-center gap-5 transition-all bg-white border border-slate-200 hover:border-slate-300"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-600 text-white">
                  <feat.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{feat.title}</h3>
                  <p className="text-slate-500 text-sm mt-0.5">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES CAROUSEL ───────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200">
              <Flame size={13} className="text-slate-600" />
              <span className="text-sm text-slate-700 font-medium">Danh mục</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Danh mục sản phẩm</h2>
            <p className="text-slate-500 text-lg">Khám phá phong cách phù hợp với bạn</p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Previous Button */}
            <button
              onClick={prevCategories}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 group bg-blue-600 hover:bg-blue-700"
            >
              <ChevronLeft size={24} className="text-white group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Categories Grid */}
            <div className="overflow-hidden">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 transition-all duration-500"
                style={{
                  transform: `translateX(0)`,
                }}
              >
                {visibleCategories.map((cat: any, idx: number) => (
                  <div
                    onClick={() => navigate('/products')}
                    key={cat.name}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-white border border-slate-200 hover:border-slate-300"
                  >
                    {/* Image bg */}
                    <div className="h-48 relative flex items-center justify-center overflow-hidden bg-slate-100">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      {/* Emoji overlay */}
                      <span className="absolute text-5xl z-10 group-hover:scale-110 transition-transform duration-500">
                        {cat.emoji}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="p-4 bg-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-slate-800 text-base">{cat.name}</h3>
                          <p className="text-slate-400 text-xs mt-0.5">{cat.items} sản phẩm</p>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextCategories}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 group bg-blue-600 hover:bg-blue-700"
            >
              <ChevronRight size={24} className="text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                <Zap size={12} className="text-slate-600" />
                <span className="text-xs text-slate-700 font-medium">Nổi bật</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1">Sản phẩm nổi bật</h2>
              <p className="text-slate-500">Những mẫu thiết kế được yêu thích nhất tuần này</p>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold transition-all group text-slate-700 hover:text-slate-900"
            >
              Xem tất cả
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {featuredProducts.map((product: any, idx: number) => {
              const bc = badgeColors[product.badge] ?? badgeColors.Sale;
              const isWished = wishlist.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Product image area */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Decorative overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                    {/* Badge */}
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold z-10"
                      style={{ background: bc.bg, color: bc.text, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                    >
                      {product.badge}
                    </div>

                    {/* Actions overlay */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={(e) => { e.preventDefault(); toggleWishlist(idx); }}
                        className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      >
                        <Heart
                          size={14}
                          className={isWished ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                        />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
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

                    {/* Rating & Sold */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={11}
                              className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400">({product.reviews})</span>
                      </div>
                      <span className="text-xs text-slate-400">Đã bán {product.sold > 1000 ? `${(product.sold / 1000).toFixed(1)}k` : product.sold}</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-slate-900 text-base">{product.price.toLocaleString('vi-VN')}đ</p>
                        {product.oldPrice && (
                          <span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                          </span>
                        )}
                      </div>
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

      {/* ─── NEW ARRIVALS ─────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200">
              <Sparkles size={13} className="text-slate-600" />
              <span className="text-sm text-slate-700 font-medium">Hàng mới về</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Bộ sưu tập mới nhất</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Cập nhật xu hướng thời trang mới nhất từ các thương hiệu hàng đầu</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map((item: any) => (
              <div
                key={item.id}
                onClick={() => navigate(`/products/${item.id}`)}
                className="group cursor-pointer rounded-2xl overflow-hidden transition-all hover:scale-105"
                style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-700 shadow-md">
                    {item.badge}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-slate-800 mb-1 line-clamp-1">{item.name}</h3>
                  <p className="font-extrabold text-slate-900">{item.price.toLocaleString('vi-VN')}đ</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRENDING STYLES ─────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200">
              <Flame size={13} className="text-slate-600" />
              <span className="text-sm text-slate-700 font-medium">Xu hướng</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Phong cách đang hot</h2>
            <p className="text-slate-500 text-lg">Khám phá những phong cách được yêu thích nhất hiện nay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Minimalist', desc: 'Tối giản, thanh lịch', items: '156 sản phẩm', icon: '✨' },
              { title: 'Streetwear', desc: 'Năng động, cá tính', items: '203 sản phẩm', icon: '🔥' },
              { title: 'Vintage', desc: 'Cổ điển, sang trọng', items: '128 sản phẩm', icon: '💎' },
            ].map((style, idx) => (
              <div
                key={idx}
                onClick={() => navigate('/products')}
                className="group cursor-pointer rounded-2xl p-8 transition-all hover:scale-105 bg-white border border-slate-200 hover:border-slate-300"
              >
                <div className="text-5xl mb-4">{style.icon}</div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{style.title}</h3>
                <p className="text-slate-600 mb-3">{style.desc}</p>
                <p className="text-sm text-slate-400">{style.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS ─────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                <Star size={12} className="text-slate-600" />
                <span className="text-xs text-slate-700 font-medium">Bán chạy</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1">Top sản phẩm bán chạy</h2>
              <p className="text-slate-500">Những sản phẩm được khách hàng tin dùng nhất</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bestSellers.map((item: any) => (
              <div
                key={item.id}
                onClick={() => navigate(`/products/${item.id}`)}
                className="group cursor-pointer rounded-xl overflow-hidden transition-all hover:scale-105"
                style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="aspect-square relative overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-700 shadow-md">
                    🔥 {item.sold > 1000 ? `${(item.sold / 1000).toFixed(1)}k` : item.sold}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-xs text-slate-800 mb-1 line-clamp-1">{item.name}</h3>
                  <p className="font-extrabold text-sm text-slate-900">{item.price.toLocaleString('vi-VN')}đ</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200">
              <Heart size={13} className="text-slate-600" />
              <span className="text-sm text-slate-700 font-medium">Đánh giá</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Khách hàng nói gì về chúng tôi</h2>
            <p className="text-slate-500 text-lg">Hơn 50,000 khách hàng hài lòng trên toàn quốc</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Minh Anh', role: 'Khách hàng thân thiết', comment: 'Chất lượng sản phẩm tuyệt vời, giao hàng nhanh chóng. Tôi rất hài lòng với dịch vụ!', rating: 5 },
              { name: 'Tuấn Kiệt', role: 'Đã mua 15 sản phẩm', comment: 'Thiết kế đẹp, giá cả hợp lý. Đội ngũ chăm sóc khách hàng rất nhiệt tình và chu đáo.', rating: 5 },
              { name: 'Thu Hà', role: 'Khách hàng mới', comment: 'Lần đầu mua hàng online nhưng trải nghiệm rất tốt. Sẽ tiếp tục ủng hộ shop!', rating: 5 },
            ].map((review, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 transition-all hover:scale-105 bg-white border border-slate-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4 leading-relaxed">"{review.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-blue-500">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{review.name}</p>
                    <p className="text-xs text-slate-400">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM FEED ─────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              #FashionStore
            </h2>
            <p className="text-slate-500 text-lg">Chia sẻ phong cách của bạn cùng chúng tôi</p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
              'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
              'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
              'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
              'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400',
            ].map((imgUrl, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-105 border-2 border-slate-200 hover:border-slate-300"
              >
                <img
                  src={imgUrl}
                  alt={`Instagram post ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="px-8 py-3 rounded-xl font-bold text-slate-700 transition-all hover:bg-slate-100 border-2 border-slate-300">
              Theo dõi @fashionstore
            </button>
          </div>
        </div>
      </section>

      {/* ─── PROMO BANNER ─────────────────────── */}
      <section className="py-8 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-xl p-8 bg-blue-600">
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                <Sparkles size={12} className="text-white" />
                <span className="text-xs font-semibold text-white">Ưu đãi đặc biệt</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                Giảm giá <span className="text-slate-100">30%</span> cho khách hàng mới
              </h2>
              <p className="text-sm text-slate-100 mb-4">
                Đăng ký ngay để nhận mã giảm giá cho đơn hàng đầu tiên.
              </p>
              <button className="px-6 py-2.5 rounded-lg font-bold text-blue-600 bg-white text-sm transition-all hover:bg-blue-50">
                Nhận mã ngay →
              </button>
            </div>
          </div>
        </div>
      </section>

    </div >
  );
};

export default HomePage;
