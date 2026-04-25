
import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Upload,
  X,
  ChevronDown,
  Package,
  Star,
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  rating: number;
  sold: number;
  badge?: string;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Áo thun Premium Cotton', category: 'Áo thun', price: 599000, oldPrice: 799000, stock: 142, status: 'active', rating: 5, sold: 284, badge: 'Sale' },
  { id: 2, name: 'Áo sơ mi Slim Fit', category: 'Áo sơ mi', price: 749000, stock: 98, status: 'active', rating: 4, sold: 165, badge: 'New' },
  { id: 3, name: 'Quần jeans Skinny', category: 'Quần', price: 899000, stock: 67, status: 'active', rating: 5, sold: 213, badge: 'Hot' },
  { id: 4, name: 'Áo khoác Bomber', category: 'Áo khoác', price: 1299000, stock: 0, status: 'out_of_stock', rating: 4, sold: 98 },
  { id: 5, name: 'Áo thun Oversized', category: 'Áo thun', price: 549000, stock: 234, status: 'active', rating: 5, sold: 312 },
  { id: 6, name: 'Quần shorts thể thao', category: 'Quần', price: 399000, oldPrice: 499000, stock: 88, status: 'active', rating: 4, sold: 175, badge: 'Sale' },
  { id: 7, name: 'Áo polo Classic', category: 'Áo polo', price: 699000, stock: 5, status: 'active', rating: 5, sold: 89 },
  { id: 8, name: 'Quần kaki Chinos', category: 'Quần', price: 799000, stock: 0, status: 'inactive', rating: 4, sold: 62, badge: 'New' },
];

const categories = ['Tất cả', 'Áo thun', 'Áo sơ mi', 'Quần', 'Áo khoác', 'Áo polo', 'Phụ kiện'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = [
  { name: 'Đen', value: '#1a1a1a' },
  { name: 'Trắng', value: '#e5e7eb' },
  { name: 'Xám', value: '#6b7280' },
  { name: 'Xanh dương', value: '#3b82f6' },
  { name: 'Đỏ', value: '#ef4444' },
  { name: 'Xanh lá', value: '#22c55e' },
];

const statusMap = {
  active:       { label: 'Đang bán', bg: '#dcfce7', color: '#16a34a' },
  inactive:     { label: 'Ẩn',       bg: '#fef9c3', color: '#ca8a04' },
  out_of_stock: { label: 'Hết hàng', bg: '#fee2e2', color: '#dc2626' },
};

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  oldPrice: string;
  stock: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  badge: string;
  description: string;
  sizes: string[];
  colors: string[];
}

const emptyForm: ProductFormData = {
  name: '',
  category: 'Áo thun',
  price: '',
  oldPrice: '',
  stock: '',
  status: 'active',
  badge: '',
  description: '',
  sizes: [],
  colors: [],
};

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'Tất cả' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const openCreate = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      oldPrice: product.oldPrice?.toString() ?? '',
      stock: product.stock.toString(),
      status: product.status,
      badge: product.badge ?? '',
      description: '',
      sizes: [],
      colors: [],
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
                stock: Number(formData.stock),
                status: formData.status,
                badge: formData.badge || undefined,
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
        stock: Number(formData.stock),
        status: formData.status,
        rating: 5,
        sold: 0,
        badge: formData.badge || undefined,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setShowDeleteConfirm(null);
    setSelectedItems((prev) => prev.filter((i) => i !== id));
  };

  const toggleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filtered.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filtered.map((p) => p.id));
    }
  };

  const toggleSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }));
  };

  const toggleColor = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color) ? prev.colors.filter((c) => c !== color) : [...prev.colors, color],
    }));
  };

  // shared input/label styles for the modal form
  const inputClass = 'w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all';
  const labelClass = 'block text-sm font-medium text-slate-600 mb-2';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý sản phẩm</h1>
          <p className="text-slate-500 text-sm mt-1">{products.length} sản phẩm trong kho</p>
        </div>
        <button
          onClick={openCreate}
          id="btn-add-product"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          <Plus size={16} /> Thêm sản phẩm
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="search-product"
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all"
            />
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-8 pr-8 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-600 focus:outline-none focus:border-violet-400 appearance-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={
                selectedCategory === cat
                  ? { background: '#ede9fe', color: '#7c3aed', border: '1px solid #ddd6fe' }
                  : { background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk actions */}
      {selectedItems.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-violet-200 bg-violet-50">
          <span className="text-sm text-violet-700 font-medium">Đã chọn {selectedItems.length} sản phẩm</span>
          <button
            className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors font-medium"
            onClick={() => {
              setProducts((prev) => prev.filter((p) => !selectedItems.includes(p.id)));
              setSelectedItems([]);
            }}
          >
            Xóa đã chọn
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
              <th className="px-5 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems.length === filtered.length && filtered.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 accent-violet-500"
                />
              </th>
              {['Sản phẩm', 'Danh mục', 'Giá', 'Kho', 'Đánh giá', 'Trạng thái', 'Thao tác'].map((h) => (
                <th key={h} className="px-5 py-4 text-left text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-16">
                  <Package size={40} className="mx-auto mb-3 text-slate-300" />
                  <p className="text-slate-400 text-sm">Không tìm thấy sản phẩm nào</p>
                </td>
              </tr>
            ) : (
              filtered.map((product, idx) => {
                const sc = statusMap[product.status];
                const rowGradients = ['#667eea,#764ba2', '#f093fb,#f5576c', '#4facfe,#00f2fe', '#43e97b,#38f9d7'];
                return (
                  <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="rounded border-slate-300 accent-violet-500"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: `linear-gradient(135deg, ${rowGradients[idx % 4]})` }}
                        >
                          {product.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{product.name}</p>
                          {product.badge && (
                            <span
                              className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                              style={{ background: '#ede9fe', color: '#7c3aed' }}
                            >
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{product.category}</td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-800">{product.price.toLocaleString('vi-VN')}đ</p>
                      {product.oldPrice && (
                        <p className="text-xs text-slate-400 line-through">{product.oldPrice.toLocaleString('vi-VN')}đ</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-sm font-semibold ${
                          product.stock === 0 ? 'text-red-500' : product.stock < 10 ? 'text-amber-500' : 'text-slate-700'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="text-sm text-slate-600">{product.rating}.0</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.color }} />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all" title="Xem">
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => openEdit(product)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 transition-all"
                          title="Sửa"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(product.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          title="Xóa"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-400">Hiển thị {filtered.length} / {products.length} sản phẩm</p>
          <div className="flex gap-1">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                  page === 1 ? 'text-white' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'
                }`}
                style={page === 1 ? { background: 'linear-gradient(135deg, #667eea, #764ba2)' } : {}}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)' }}>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 w-full max-w-sm shadow-2xl">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-red-50">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Xác nhận xóa</h3>
              <p className="text-slate-500 text-sm mb-6">Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all text-sm font-medium"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold"
                  style={{ background: 'linear-gradient(135deg, #f5576c, #ef4444)' }}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)' }}>
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
            {/* Form header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white">
              <div>
                <h2 className="font-bold text-slate-800 text-lg">
                  {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  {editingProduct ? 'Cập nhật thông tin sản phẩm' : 'Điền thông tin chi tiết sản phẩm'}
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Image upload */}
              <div>
                <label className={labelClass}>Hình ảnh sản phẩm</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Upload size={20} className="text-slate-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-500">Kéo thả ảnh hoặc <span className="text-violet-500 cursor-pointer font-medium">chọn file</span></p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG tối đa 10MB</p>
                  </div>
                </div>
              </div>

              {/* Basic info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Tên sản phẩm <span className="text-red-500">*</span></label>
                  <input
                    id="product-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập tên sản phẩm..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Danh mục <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={inputClass + ' appearance-none pr-8'}
                    >
                      {categories.filter((c) => c !== 'Tất cả').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Nhãn (badge)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Sale, New, Hot..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Giá bán (đ) <span className="text-red-500">*</span></label>
                  <input
                    id="product-price"
                    type="number"
                    required
                    min={0}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Giá gốc (đ)</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                    placeholder="0 (không bắt buộc)"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Số lượng kho <span className="text-red-500">*</span></label>
                  <input
                    id="product-stock"
                    type="number"
                    required
                    min={0}
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Trạng thái</label>
                  <div className="relative">
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as ProductFormData['status'] })}
                      className={inputClass + ' appearance-none pr-8'}
                    >
                      <option value="active">Đang bán</option>
                      <option value="inactive">Ẩn</option>
                      <option value="out_of_stock">Hết hàng</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Mô tả sản phẩm</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Nhập mô tả chi tiết về sản phẩm..."
                  rows={3}
                  className={inputClass + ' resize-none'}
                />
              </div>

              {/* Sizes */}
              <div>
                <label className={labelClass}>Kích cỡ</label>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all border"
                      style={
                        formData.sizes.includes(size)
                          ? { background: '#ede9fe', color: '#7c3aed', borderColor: '#ddd6fe' }
                          : { background: '#f8fafc', color: '#64748b', borderColor: '#e2e8f0' }
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className={labelClass}>Màu sắc</label>
                <div className="flex gap-3 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => toggleColor(color.name)}
                      title={color.name}
                      className="w-8 h-8 rounded-full transition-all"
                      style={{
                        background: color.value,
                        border: formData.colors.includes(color.name) ? '3px solid #7c3aed' : '2px solid #e2e8f0',
                        transform: formData.colors.includes(color.name) ? 'scale(1.2)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all text-sm font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  id="btn-submit-product"
                  className="flex-1 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  {editingProduct ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
