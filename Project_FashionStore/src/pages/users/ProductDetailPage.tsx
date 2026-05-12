import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Star, Heart, ShoppingCart, Truck, Shield, Package,
  ChevronRight, Minus, Plus, Share2, Check,
} from 'lucide-react';
import { catalogService } from '../../services/catalogService';
import { mapProduct, mapProducts, type DisplayProduct } from '../../utils/productMapper';
import { useCart } from '../../context/CartContext';
import { swal } from '../../utils/swal';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [productData, setProductData] = useState<DisplayProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Available colors and sizes (hardcoded for now, will be from variants later)
  const availableColors = [
    { name: 'Đen', value: '#000000' },
    { name: 'Trắng', value: '#FFFFFF' },
    { name: 'Xanh', value: '#3B82F6' },
    { name: 'Đỏ', value: '#EF4444' },
  ];
  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const productFeatures = [
    'Chất liệu cao cấp, bền đẹp',
    'Thiết kế hiện đại, thời trang',
    'Dễ dàng phối đồ',
    'Phù hợp với mọi dáng người',
    'Giặt máy an toàn'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productId = parseInt(id || '1');
        const [product, allProducts] = await Promise.all([
          catalogService.getProductById(productId),
          catalogService.getProducts()
        ]);

        const mappedProduct = mapProduct(product);
        setProductData(mappedProduct);

        // Get related products from same category
        const related = allProducts
          .filter(p => p.categoryId === product.categoryId && p.id !== product.id && p.status === 'active')
          .slice(0, 4);
        setRelatedProducts(mapProducts(related));
      } catch (error) {
        console.error('Error fetching product:', error);
        setProductData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
        <div className="container mx-auto px-6 py-8 flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!productData) return;
    if (!selectedSize || !selectedColor) {
      swal.warning('Thiếu thông tin', 'Vui lòng chọn size và màu sắc');
      return;
    }
    addToCart(productData as any, selectedSize, selectedColor, quantity);
    swal.toast.success(`Đã thêm ${quantity} "${productData.name}" vào giỏ hàng!`);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {!productData ? (
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-slate-500 text-lg">Sản phẩm không tồn tại</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg mx-auto block hover:bg-purple-700 transition-colors"
          >
            Quay lại trang sản phẩm
          </button>
        </div>
      ) : (
        <div className="container mx-auto px-6 py-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <span className="cursor-pointer hover:text-slate-700" onClick={() => navigate('/')}>Trang chủ</span>
            <ChevronRight size={14} />
            <span className="cursor-pointer hover:text-slate-700" onClick={() => navigate('/products')}>Sản phẩm</span>
            <ChevronRight size={14} />
            <span className="text-slate-700">{productData.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

            {/* Left: Images */}
            <div className="max-w-md mx-auto lg:mx-0 w-full">
              {/* Main image */}
              <div
                className="rounded-3xl overflow-hidden mb-4 aspect-square relative bg-slate-100"
                style={{ maxHeight: '450px' }}
              >
                <img
                  src={productData.images[selectedImage] || productData.image}
                  alt={productData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                {productData.badge && (
                  <div
                    className="absolute top-5 left-5 px-4 py-2 rounded-full text-sm font-bold text-white z-10"
                    style={{ background: 'rgba(245,87,108,0.9)' }}
                  >
                    {productData.badge}
                  </div>
                )}
                <button
                  onClick={() => setIsWished(!isWished)}
                  className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
                >
                  <Heart size={20} className={isWished ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {productData.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className="rounded-2xl overflow-hidden aspect-square transition-all bg-slate-100"
                    style={{
                      border: selectedImage === idx ? '3px solid #7c3aed' : '2px solid #e2e8f0',
                      opacity: selectedImage === idx ? 1 : 0.6,
                    }}
                  >
                    <img
                      src={img}
                      alt={`${productData.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div>
              <div className="mb-4">
                <span className="text-sm text-slate-700 font-semibold">{productData.category}</span>
              </div>

              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{productData.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < productData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} />
                  ))}
                </div>
                <span className="text-sm text-slate-500">
                  {productData.rating}.0 ({productData.reviews} đánh giá)
                </span>
                <span className="text-sm text-slate-400">|</span>
                <span className="text-sm text-slate-500">Đã bán {productData.sold}</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
                <p className="text-4xl font-extrabold text-slate-900">
                  {productData.price.toLocaleString('vi-VN')}đ
                </p>
                {productData.oldPrice && (
                  <>
                    <p className="text-xl text-slate-300 line-through">
                      {productData.oldPrice.toLocaleString('vi-VN')}đ
                    </p>
                    <span className="px-3 py-1 rounded-full text-sm font-bold text-white bg-red-500">
                      -{Math.round((1 - productData.price / productData.oldPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Color */}
              <div className="mb-5">
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Màu sắc: {selectedColor && <span className="text-slate-900">{selectedColor}</span>}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {availableColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className="relative"
                      title={color.name}
                    >
                      <div
                        className="w-11 h-11 rounded-lg transition-all"
                        style={{
                          background: color.value,
                          border: selectedColor === color.name ? '3px solid #2563eb' : '2px solid #e2e8f0',
                          transform: selectedColor === color.name ? 'scale(1.05)' : 'scale(1)',
                        }}
                      />
                      {selectedColor === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check size={16} className="text-white drop-shadow-lg" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Kích cỡ: {selectedSize && <span className="text-slate-900">{selectedSize}</span>}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="w-12 h-12 rounded-lg text-sm font-bold transition-all"
                      style={
                        selectedSize === size
                          ? { background: '#2563eb', color: '#fff' }
                          : { background: '#fff', color: '#64748b', border: '2px solid #e2e8f0' }
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-3">Số lượng</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '2px solid #e2e8f0' }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <Minus size={16} className="text-slate-600" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 h-12 text-center font-bold text-slate-900 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <Plus size={16} className="text-slate-600" />
                    </button>
                  </div>
                  <span className="text-sm text-slate-400">Còn 99 sản phẩm</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all hover:opacity-90 bg-blue-600"
                >
                  <ShoppingCart size={20} />
                  Thêm vào giỏ hàng
                </button>
                <button
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all hover:bg-slate-100"
                  style={{ background: '#fff', border: '2px solid #e2e8f0' }}
                >
                  <Share2 size={20} className="text-slate-600" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Truck, text: 'Miễn phí vận chuyển' },
                  { icon: Shield, text: 'Bảo hành 30 ngày' },
                  { icon: Package, text: 'Đóng gói cẩn thận' },
                ].map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl"
                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                  >
                    <feat.icon size={20} className="text-slate-700" />
                    <span className="text-xs text-slate-600 text-center">{feat.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-16">
            <div className="flex gap-2 mb-6 border-b border-slate-200">
              {[
                { id: 'description', label: 'Mô tả' },
                { id: 'features', label: 'Đặc điểm' },
                { id: 'reviews', label: 'Đánh giá' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-6 py-3 font-semibold transition-all relative"
                  style={{ color: activeTab === tab.id ? '#2563eb' : '#64748b' }}
                >
                  {tab.label}
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                </button>
              ))}
            </div>

            <div className="rounded-2xl p-8" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
              {activeTab === 'description' && (
                <p className="text-slate-600 leading-relaxed">{productData.description}</p>
              )}
              {activeTab === 'features' && (
                <ul className="space-y-3">
                  {productFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'reviews' && (
                <div className="text-center py-8">
                  <p className="text-slate-400">Chưa có đánh giá nào</p>
                </div>
              )}
            </div>
          </div>

          {/* Related products */}
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="group rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105"
                  style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}
                >
                  <div className="aspect-square bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-800 text-sm mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} />
                      ))}
                      <span className="text-xs text-slate-400 ml-1">({product.reviews})</span>
                    </div>
                    <p className="font-extrabold text-slate-900">{product.price.toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
