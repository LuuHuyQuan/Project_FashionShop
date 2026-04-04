import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Star, ArrowRight, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const wishlistItems = [
  {
    id: 1,
    name: 'Áo thun Premium Cotton',
    price: 599000,
    oldPrice: 799000,
    rating: 5,
    reviews: 284,
    category: 'Áo thun',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    inStock: true,
  },
  {
    id: 2,
    name: 'Áo sơ mi Slim Fit',
    price: 749000,
    rating: 4,
    reviews: 165,
    category: 'Áo sơ mi',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    inStock: true,
  },
  {
    id: 3,
    name: 'Quần jeans Skinny',
    price: 899000,
    rating: 5,
    reviews: 213,
    category: 'Quần jeans',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    inStock: false,
  },
  {
    id: 4,
    name: 'Áo khoác Bomber',
    price: 1299000,
    oldPrice: 1599000,
    rating: 4,
    reviews: 98,
    category: 'Áo khoác',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    inStock: true,
  },
  {
    id: 5,
    name: 'Váy đầm Maxi',
    price: 950000,
    oldPrice: 1200000,
    rating: 5,
    reviews: 156,
    category: 'Váy đầm',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    inStock: true,
  },
  {
    id: 6,
    name: 'Áo polo Classic',
    price: 450000,
    rating: 4,
    reviews: 89,
    category: 'Áo polo',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    inStock: true,
  },
];

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(wishlistItems);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const removeItem = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setRemovingId(null);
    }, 300);
  };

  if (items.length === 0) {
    return (
      <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)', minHeight: '100vh' }}>
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(240,147,251,0.1), rgba(245,87,108,0.1))',
              }}
            >
              <Heart size={48} className="text-pink-300" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Chưa có sản phẩm yêu thích</h1>
            <p className="text-slate-400 mb-8">
              Hãy khám phá và thêm những sản phẩm bạn yêu thích vào danh sách nhé!
            </p>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 8px 32px rgba(102,126,234,0.4)',
              }}
            >
              Khám phá sản phẩm
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)', minHeight: '100vh' }}>
      <div className="container mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
              >
                <Heart size={18} className="text-white" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900">Yêu thích</h1>
            </div>
            <p className="text-slate-400 ml-[52px]">Bạn có {items.length} sản phẩm trong danh sách yêu thích</p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
          >
            <Sparkles size={14} />
            Khám phá thêm
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`group rounded-3xl overflow-hidden transition-all duration-300 ${
                removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100'
              }`}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden cursor-pointer" onClick={() => navigate(`/products/${item.id}`)}>
                <div className="absolute inset-0" style={{ background: item.gradient }} />
                <div className="absolute inset-0 bg-black/5" />
                <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-white/15" />

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-red-50 z-10"
                >
                  <X size={16} className="text-slate-600 hover:text-red-500" />
                </button>

                {/* Wishlist heart */}
                <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-lg z-10">
                  <Heart size={16} className="fill-red-500 text-red-500" />
                </div>

                {/* Badge */}
                {!item.inStock && (
                  <div
                    className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white z-10"
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
                  >
                    Hết hàng
                  </div>
                )}

                {item.oldPrice && (
                  <div
                    className="absolute top-4 left-16 px-2.5 py-1 rounded-full text-xs font-bold z-10"
                    style={{ background: 'linear-gradient(135deg, #f5576c, #ef4444)', color: '#fff' }}
                  >
                    -{Math.round((1 - item.price / item.oldPrice) * 100)}%
                  </div>
                )}

                {/* Add to cart overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-3 translate-y-full group-hover:translate-y-0 transition-all duration-300"
                  style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
                >
                  <span className="text-white text-sm font-semibold flex items-center gap-2">
                    <ShoppingCart size={16} />
                    {item.inStock ? 'Thêm vào giỏ hàng' : 'Thông báo khi có hàng'}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-purple-600">{item.category}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}
                      />
                    ))}
                    <span className="text-xs text-slate-400 ml-1">({item.reviews})</span>
                  </div>
                </div>

                <h3
                  className="font-bold text-slate-800 mb-3 cursor-pointer hover:text-purple-600 transition-colors"
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  {item.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-extrabold text-slate-900">
                      {item.price.toLocaleString('vi-VN')}đ
                    </span>
                    {item.oldPrice && (
                      <span className="text-sm text-slate-300 line-through ml-2">
                        {item.oldPrice.toLocaleString('vi-VN')}đ
                      </span>
                    )}
                  </div>
                  <button
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      background: item.inStock
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : '#e2e8f0',
                      boxShadow: item.inStock ? '0 4px 16px rgba(102,126,234,0.3)' : 'none',
                    }}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart size={16} className={item.inStock ? 'text-white' : 'text-slate-400'} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
