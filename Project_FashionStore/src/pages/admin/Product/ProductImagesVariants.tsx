import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Image as ImageIcon, Package } from 'lucide-react';
import { catalogService, type Product, type Color, type Size, type AddImageRequest, type AddVariantRequest } from '../../../services/catalogService';

const ProductImagesVariants: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'images' | 'variants'>('images');

  // Image form
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageForm, setImageForm] = useState<AddImageRequest>({
    url: '',
    isThumbnail: false,
    sortOrder: 0,
  });

  // Variant form
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [variantForm, setVariantForm] = useState<AddVariantRequest>({
    sku: '',
    colorId: 0,
    sizeId: 0,
    stockQuantity: 0,
    priceOverride: undefined,
  });
  const [editingVariantId, setEditingVariantId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [productData, colorsData, sizesData] = await Promise.all([
        catalogService.getProductById(Number(id)),
        catalogService.getColors(),
        catalogService.getSizes(),
      ]);
      setProduct(productData);
      setColors(colorsData);
      setSizes(sizesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  // Images
  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await catalogService.addProductImage(Number(id), imageForm);
      alert('Thêm ảnh thành công!');
      setShowImageModal(false);
      setImageForm({ url: '', isThumbnail: false, sortOrder: 0 });
      fetchData();
    } catch (error) {
      console.error('Error adding image:', error);
      alert('Lỗi khi thêm ảnh');
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!id || !confirm('Bạn có chắc muốn xóa ảnh này?')) return;

    try {
      await catalogService.deleteProductImage(Number(id), imageId);
      alert('Xóa ảnh thành công!');
      fetchData();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Lỗi khi xóa ảnh');
    }
  };

  // Variants
  const handleAddVariant = () => {
    setEditingVariantId(null);
    setVariantForm({
      sku: `${product?.slug}-${colors[0]?.name}-${sizes[0]?.name}`.toUpperCase(),
      colorId: colors[0]?.id || 0,
      sizeId: sizes[0]?.id || 0,
      stockQuantity: 0,
      priceOverride: undefined,
    });
    setShowVariantModal(true);
  };

  const handleEditVariant = (variant: any) => {
    setEditingVariantId(variant.id);
    setVariantForm({
      sku: variant.sku,
      colorId: variant.colorId,
      sizeId: variant.sizeId,
      stockQuantity: variant.stockQuantity,
      priceOverride: variant.priceOverride,
    });
    setShowVariantModal(true);
  };

  const handleSubmitVariant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      if (editingVariantId) {
        await catalogService.updateProductVariant(Number(id), editingVariantId, variantForm);
        alert('Cập nhật biến thể thành công!');
      } else {
        await catalogService.addProductVariant(Number(id), variantForm);
        alert('Thêm biến thể thành công!');
      }
      setShowVariantModal(false);
      fetchData();
    } catch (error) {
      console.error('Error saving variant:', error);
      alert('Lỗi khi lưu biến thể');
    }
  };

  const handleDeleteVariant = async (variantId: number) => {
    if (!id || !confirm('Bạn có chắc muốn xóa biến thể này?')) return;

    try {
      await catalogService.deleteProductVariant(Number(id), variantId);
      alert('Xóa biến thể thành công!');
      fetchData();
    } catch (error) {
      console.error('Error deleting variant:', error);
      alert('Lỗi khi xóa biến thể');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="p-6">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft size={20} />
          Quay lại
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-500 mt-1">Quản lý ảnh và biến thể sản phẩm</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('images')}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition ${activeTab === 'images'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          <ImageIcon size={20} />
          Ảnh sản phẩm ({product.images?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('variants')}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition ${activeTab === 'variants'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          <Package size={20} />
          Biến thể ({product.variants?.length || 0})
        </button>
      </div>

      {/* Images Tab */}
      {activeTab === 'images' && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Ảnh sản phẩm</h2>
            <button
              onClick={() => setShowImageModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              Thêm ảnh
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.images?.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {image.isThumbnail && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                    Thumbnail
                  </span>
                )}
                <span className="absolute top-2 right-2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
                  #{image.sortOrder}
                </span>
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="absolute bottom-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {(!product.images || product.images.length === 0) && (
            <div className="text-center py-12 text-gray-500">
              Chưa có ảnh nào. Nhấn "Thêm ảnh" để thêm ảnh mới.
            </div>
          )}
        </div>
      )}

      {/* Variants Tab */}
      {activeTab === 'variants' && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Biến thể sản phẩm</h2>
            <button
              onClick={handleAddVariant}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              Thêm biến thể
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Màu sắc</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kích thước</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tồn kho</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {product.variants?.map((variant) => (
                  <tr key={variant.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono">{variant.sku}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: variant.colorHexCode }}
                        />
                        <span className="text-sm">{variant.colorName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{variant.sizeName}</td>
                    <td className="px-4 py-3 text-sm">{variant.stockQuantity}</td>
                    <td className="px-4 py-3 text-sm">
                      {variant.priceOverride
                        ? `${variant.priceOverride.toLocaleString('vi-VN')}đ`
                        : 'Giá gốc'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditVariant(variant)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteVariant(variant.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(!product.variants || product.variants.length === 0) && (
            <div className="text-center py-12 text-gray-500">
              Chưa có biến thể nào. Nhấn "Thêm biến thể" để thêm mới.
            </div>
          )}
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Thêm ảnh mới</h3>
            <form onSubmit={handleAddImage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">URL ảnh *</label>
                <input
                  type="url"
                  value={imageForm.url}
                  onChange={(e) => setImageForm({ ...imageForm, url: e.target.value })}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Thứ tự hiển thị</label>
                <input
                  type="number"
                  value={imageForm.sortOrder}
                  onChange={(e) => setImageForm({ ...imageForm, sortOrder: Number(e.target.value) })}
                  min="0"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isThumbnail"
                  checked={imageForm.isThumbnail}
                  onChange={(e) => setImageForm({ ...imageForm, isThumbnail: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="isThumbnail" className="text-sm">Đặt làm ảnh đại diện</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Thêm
                </button>
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Variant Modal */}
      {showVariantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">
              {editingVariantId ? 'Sửa biến thể' : 'Thêm biến thể mới'}
            </h3>
            <form onSubmit={handleSubmitVariant} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">SKU *</label>
                <input
                  type="text"
                  value={variantForm.sku}
                  onChange={(e) => setVariantForm({ ...variantForm, sku: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Màu sắc *</label>
                <select
                  value={variantForm.colorId}
                  onChange={(e) => setVariantForm({ ...variantForm, colorId: Number(e.target.value) })}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {colors.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kích thước *</label>
                <select
                  value={variantForm.sizeId}
                  onChange={(e) => setVariantForm({ ...variantForm, sizeId: Number(e.target.value) })}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {sizes.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số lượng tồn kho *</label>
                <input
                  type="number"
                  value={variantForm.stockQuantity}
                  onChange={(e) => setVariantForm({ ...variantForm, stockQuantity: Number(e.target.value) })}
                  required
                  min="0"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Giá riêng (tùy chọn)</label>
                <input
                  type="number"
                  value={variantForm.priceOverride || ''}
                  onChange={(e) =>
                    setVariantForm({
                      ...variantForm,
                      priceOverride: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  min="0"
                  placeholder="Để trống nếu dùng giá gốc"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingVariantId ? 'Cập nhật' : 'Thêm'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowVariantModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImagesVariants;
