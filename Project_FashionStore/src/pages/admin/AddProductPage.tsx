import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { ImageUpload, MultipleImageUpload } from '../../components/common/ImageUpload';
import { catalogService } from '../../services';
import { swal } from '../../utils/swal';
import { logger } from '../../utils/logger';
import type { Category } from '../../services/catalogService';

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice: number;
  categoryId: number;
  status: string;
  badge: string;
  mainImage: string; // Base64
  additionalImages: string[]; // Array of Base64
}

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    description: '',
    price: 0,
    oldPrice: 0,
    categoryId: 0,
    status: 'active',
    badge: '',
    mainImage: '',
    additionalImages: [],
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await catalogService.getCategories();
      setCategories(data.filter(c => c.status === 'active'));
    } catch (error) {
      logger.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'oldPrice' || name === 'categoryId'
        ? Number(value)
        : value
    }));

    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.mainImage) {
      swal.warning('Thiếu ảnh chính', 'Vui lòng chọn ảnh chính cho sản phẩm');
      return;
    }

    if (!formData.categoryId || formData.categoryId === 0) {
      swal.warning('Thiếu danh mục', 'Vui lòng chọn danh mục cho sản phẩm');
      return;
    }

    setLoading(true);
    swal.loading('Đang lưu sản phẩm...');

    try {
      // Create product
      const productData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        price: formData.price,
        oldPrice: formData.oldPrice || undefined,
        categoryId: formData.categoryId,
        status: formData.status,
        badge: formData.badge || undefined,
      };

      const product = await catalogService.createProduct(productData);

      // Add main image
      await catalogService.addProductImage(product.id, {
        url: formData.mainImage, // Base64 string
        isThumbnail: true,
        sortOrder: 0,
      });

      // Add additional images
      for (let i = 0; i < formData.additionalImages.length; i++) {
        await catalogService.addProductImage(product.id, {
          url: formData.additionalImages[i], // Base64 string
          isThumbnail: false,
          sortOrder: i + 1,
        });
      }

      swal.close();
      await swal.success('Thành công!', 'Sản phẩm đã được thêm thành công');
      navigate('/admin/products');
    } catch (error) {
      logger.error('Error creating product:', error);
      swal.close();
      swal.error('Lỗi', 'Không thể thêm sản phẩm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/admin/products')}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Thêm sản phẩm mới</h1>
            <p className="text-slate-500 mt-1">Điền thông tin và tải ảnh sản phẩm</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Thông tin cơ bản</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tên sản phẩm *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-slate-50"
                  placeholder="tu-dong-tao-tu-ten"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                  placeholder="Mô tả chi tiết về sản phẩm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Giá bán *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Giá gốc
                  </label>
                  <input
                    type="number"
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Danh mục *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  >
                    <option value={0}>Chọn danh mục</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Tạm ẩn</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Badge (tùy chọn)
                </label>
                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                >
                  <option value="">Không có</option>
                  <option value="Sale">Sale</option>
                  <option value="New">New</option>
                  <option value="Hot">Hot</option>
                  <option value="Trend">Trend</option>
                </select>
              </div>
            </div>
          </div>

          {/* Images Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Hình ảnh sản phẩm</h2>

            <div className="space-y-6">
              <ImageUpload
                label="Ảnh chính *"
                value={formData.mainImage}
                onChange={(base64) => setFormData(prev => ({ ...prev, mainImage: base64 }))}
                onRemove={() => setFormData(prev => ({ ...prev, mainImage: '' }))}
                compress={true}
                maxWidth={1200}
                quality={0.85}
              />

              <MultipleImageUpload
                label="Ảnh bổ sung"
                value={formData.additionalImages}
                onChange={(images) => setFormData(prev => ({ ...prev, additionalImages: images }))}
                maxImages={5}
                compress={true}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Lưu sản phẩm
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
