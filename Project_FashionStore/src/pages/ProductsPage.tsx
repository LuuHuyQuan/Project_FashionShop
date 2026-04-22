import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Grid, List, Star, Heart, ShoppingCart, Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { products as allProducts } from '../data/products.ts';

const categories = ['Tất cả', ...Array.from(new Set(allProducts.map(p => p.category)))];
const priceRanges = ['Dưới 500.000đ', '500K – 1.000K', '1.000K – 2.000K', 'Trên 2.000K'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colorOptions = [
  { name: 'Đen', value: '#1a1a1a' },
  { name: 'Trắng', value: '#f5f5f5' },
  { name: 'Xám', value: '#6b7280' },
  { name: 'Xanh', value: '#3b82f6' },
  { name: 'Đỏ', value: '#ef4444' },
];

const badgeStyles: Record<string, { bg: string; color: string }> = {
  Sale: { bg: 'rgba(245,87,108,0.9)', color: '#fff' },
  New: { bg: 'rgba(67,233,123,0.9)', color: '#065f46' },
  Hot: { bg: 'rgba(250,112,154,0.9)', color: '#fff' },
  Trend: { bg: 'rgba(161,140,209,0.9)', color: '#fff' },
  Mới: { bg: 'rgba(67,233,123,0.9)', color: '#065f46' },
};

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCat, setSelectedCat] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilter, setShowFilter] = useState(true);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const filtered = allProducts.filter((p) => {
    const matchCat = selectedCat === 'Tất cả' || p.category === selectedCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="text-slate-400 text-sm mb-2">Trang chủ / Sản phẩm</p>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">Tất cả sản phẩm</h1>
              <p className="text-slate-400 text-lg">
                Khám phá <span className="text-purple-600 font-semibold">{filtered.length}</span> sản phẩm thời trang độc đáo
              </p>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={
                selectedCat === cat
                  ? { background: '#2563eb', color: '#fff' }
                  : { background: '#ffffff', color: '#64748b', border: '1px solid #e2e8f0' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-7">

          {/* ── Sidebar Filter ── */}
          <aside className={`lg:w-64 flex-shrink-0 space-y-4 ${showFilter ? '' : 'hidden lg:block'}`}>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-purple-500" />
                <h2 className="font-bold text-slate-800">Bộ lọc</h2>
              </div>

              <div className="p-5 space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Tìm kiếm</label>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="text"
                      placeholder="Nhập tên sản phẩm..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-purple-400 transition-all"
                      style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Danh mục</label>
                  <div className="space-y-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCat(cat)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all"
                        style={
                          selectedCat === cat
                            ? { background: '#dbeafe', color: '#2563eb', border: '1px solid #93c5fd' }
                            : { color: '#64748b', border: '1px solid transparent' }
                        }
                      >
                        <span>{cat}</span>
                        {selectedCat === cat && <span className="text-xs text-slate-700">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Khoảng giá</label>
                  <div className="space-y-1.5">
                    {priceRanges.map((price) => (
                      <label key={price} className="flex items-center gap-2.5 cursor-pointer group px-1">
                        <input type="checkbox" className="accent-purple-500 rounded" />
                        <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Kích cỡ</label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                        className="w-10 h-10 rounded-lg text-sm font-semibold transition-all"
                        style={
                          selectedSize === size
                            ? { background: '#2563eb', color: '#fff' }
                            : { background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Màu sắc</label>
                  <div className="flex gap-2">
                    {colorOptions.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(selectedColor === c.name ? '' : c.name)}
                        title={c.name}
                        className="w-8 h-8 rounded-full transition-all"
                        style={{
                          background: c.value,
                          border: selectedColor === c.name ? '3px solid #2563eb' : '2px solid #e2e8f0',
                          transform: selectedColor === c.name ? 'scale(1.2)' : 'scale(1)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Clear filters */}
                {(selectedCat !== 'Tất cả' || search || selectedSize || selectedColor) && (
                  <button
                    onClick={() => { setSelectedCat('Tất cả'); setSearch(''); setSelectedSize(''); setSelectedColor(''); }}
                    className="w-full py-2.5 rounded-xl text-sm font-medium text-red-500 transition-all hover:bg-red-50"
                    style={{ border: '1px solid rgba(245,87,108,0.2)' }}
                  >
                    <X size={13} className="inline mr-1" />
                    Xóa bộ lọc
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1">
            {/* Toolbar */}
            <div
              className="flex items-center justify-between mb-6 px-4 py-3 rounded-2xl"
              style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-all"
                  style={{ background: '#f1f5f9' }}
                >
                  <Filter size={14} />
                  Lọc
                </button>
                <span className="text-sm text-slate-400 hidden md:block">{filtered.length} sản phẩm</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="relative hidden md:block">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-3 pr-7 py-2 rounded-xl text-sm text-slate-600 focus:outline-none appearance-none cursor-pointer"
                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="price_asc">Giá tăng dần</option>
                    <option value="price_desc">Giá giảm dần</option>
                    <option value="popular">Phổ biến nhất</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* View toggle */}
                <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#f1f5f9' }}>
                  {[
                    { mode: 'grid', Icon: Grid },
                    { mode: 'list', Icon: List },
                  ].map(({ mode, Icon }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode as 'grid' | 'list')}
                      className="p-1.5 rounded-lg transition-all"
                      style={
                        viewMode === mode
                          ? { background: '#2563eb', color: '#fff' }
                          : { color: '#94a3b8' }
                      }
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product) => {
                  const bs = badgeStyles[product.badge ?? ''];
                  const isWished = wishlist.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                      }}
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                        {product.badge && bs && (
                          <div
                            className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full text-xs font-bold z-10"
                            style={{ background: bs.bg, color: bs.color }}
                          >
                            {product.badge}
                          </div>
                        )}

                        {/* Wishlist & Cart */}
                        <div className="absolute top-3.5 right-3.5 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 duration-300">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                            className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                          >
                            <Heart size={14} className={isWished ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
                          </button>
                          <button className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <ShoppingCart size={14} className="text-gray-600" />
                          </button>
                        </div>

                        {/* Bottom hover bar */}
                        <div
                          className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
                        >
                          <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                            <ShoppingCart size={14} />
                            Thêm vào giỏ hàng
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <p className="text-xs text-slate-400 mb-1">{product.category}</p>
                        <h3 className="font-bold text-slate-800 text-sm leading-tight mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} />
                          ))}
                          <span className="text-xs text-slate-400 ml-1">({product.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold text-slate-900">{product.price.toLocaleString('vi-VN')}đ</p>
                          {product.oldPrice && (
                            <p className="text-xs text-slate-300 line-through">{product.oldPrice.toLocaleString('vi-VN')}đ</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List view */
              <div className="space-y-4">
                {filtered.map((product) => {
                  const bs = badgeStyles[product.badge ?? ''];
                  const isWished = wishlist.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="group flex gap-5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden bg-slate-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        {product.badge && bs && (
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: bs.bg, color: bs.color }}>
                            {product.badge}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 py-5 pr-5 flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-slate-400 mb-1">{product.category}</p>
                          <h3 className="font-bold text-slate-800 text-xl mb-2 group-hover:text-purple-600 transition-colors">{product.name}</h3>
                          <div className="flex items-center gap-1.5 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={13} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} />
                            ))}
                            <span className="text-xs text-slate-400 ml-1">({product.reviews} đánh giá)</span>
                          </div>
                          <p className="text-slate-500 text-sm">Sản phẩm chất lượng cao, thiết kế hiện đại, phù hợp với mọi phong cách sinh hoạt hàng ngày.</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <p className="font-extrabold text-slate-900 text-2xl">{product.price.toLocaleString('vi-VN')}đ</p>
                            {product.oldPrice && <p className="text-slate-300 line-through">{product.oldPrice.toLocaleString('vi-VN')}đ</p>}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                              style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                            >
                              <Heart size={17} className={isWished ? 'fill-red-500 text-red-500' : 'text-slate-400'} />
                            </button>
                            <button
                              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 bg-blue-600"
                            >
                              <ShoppingCart size={16} />
                              Thêm vào giỏ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <button
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 transition-all hover:text-slate-700"
                style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}
              >
                ← Trước
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className="w-10 h-10 rounded-xl text-sm font-bold transition-all"
                  style={
                    page === 1
                      ? { background: '#2563eb', color: '#fff' }
                      : { background: '#ffffff', color: '#64748b', border: '1px solid #e2e8f0' }
                  }
                >
                  {page}
                </button>
              ))}
              <button
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 transition-all hover:text-slate-700"
                style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}
              >
                Sau →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
