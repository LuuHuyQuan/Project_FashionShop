import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Tags, Search, X, ChevronDown, ImageIcon } from 'lucide-react';
import { catalogService, type CreateCategoryRequest, type UpdateCategoryRequest } from '../../../services/catalogService';
import type { Category } from '../../../services/catalogService';

interface CategoryUI extends Category {
  gradient: string;
}

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  image: string;
  status: 'active' | 'inactive';
}

const emptyForm: CategoryFormData = { name: '', slug: '', description: '', image: '', status: 'active' };

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
];

const toSlug = (str: string) =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryUI | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>(emptyForm);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [selectedGradient, setSelectedGradient] = useState(gradients[0]);

  // Load categories from backend
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await catalogService.getCategories();
      // Convert backend Category to CategoryUI with gradient
      const categoriesUI: CategoryUI[] = data.map((cat, index) => ({
        ...cat,
        gradient: gradients[index % gradients.length],
      }));
      setCategories(categoriesUI);
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error);
      alert('Không thể tải danh mục. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = categories.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingCategory(null);
    setFormData(emptyForm);
    setSelectedGradient(gradients[0]);
    setShowForm(true);
  };

  const openEdit = (cat: CategoryUI) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '',
      status: cat.status as 'active' | 'inactive'
    });
    setSelectedGradient(cat.gradient);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCategory) {
        // Update existing category
        const updateData: UpdateCategoryRequest = {
          name: formData.name,
          slug: formData.slug || toSlug(formData.name),
          description: formData.description,
          image: formData.image,
          status: formData.status,
        };
        await catalogService.updateCategory(editingCategory.id, updateData);
      } else {
        // Create new category
        const createData: CreateCategoryRequest = {
          name: formData.name,
          slug: formData.slug || toSlug(formData.name),
          description: formData.description,
          image: formData.image,
          status: formData.status,
        };
        await catalogService.createCategory(createData);
      }

      // Reload categories
      await loadCategories();
      setShowForm(false);
    } catch (error) {
      console.error('Lỗi khi lưu danh mục:', error);
      alert('Không thể lưu danh mục. Vui lòng thử lại.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await catalogService.deleteCategory(id);
      await loadCategories();
      setShowDeleteConfirm(null);
    } catch (error: any) {
      console.error('Lỗi khi xóa danh mục:', error);
      // Extract error message from backend response
      const errorMessage = error?.response?.data?.message || 'Không thể xóa danh mục. Vui lòng thử lại.';
      alert(errorMessage);
      setShowDeleteConfirm(null);
    }
  };

  const toggleStatus = async (cat: CategoryUI) => {
    try {
      const newStatus = cat.status === 'active' ? 'inactive' : 'active';
      const updateData: UpdateCategoryRequest = {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        status: newStatus,
      };
      await catalogService.updateCategory(cat.id, updateData);
      await loadCategories();
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      alert('Không thể cập nhật trạng thái. Vui lòng thử lại.');
    }
  };

  const totalProducts = 0; // Backend không trả về productCount
  const activeCount = categories.filter((c) => c.status === 'active').length;

  const inputClass = 'w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all';
  const labelClass = 'block text-sm font-medium text-slate-600 mb-2';

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 text-sm">Đang tải danh mục...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Quản lý danh mục</h1>
              <p className="text-slate-500 text-sm mt-1">{categories.length} danh mục · {totalProducts} sản phẩm</p>
            </div>
            <button onClick={openCreate} id="btn-add-category"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <Plus size={16} /> Thêm danh mục
            </button>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Tổng danh mục', value: categories.length, bg: '#ede9fe', color: '#7c3aed' },
              { label: 'Đang hoạt động', value: activeCount, bg: '#dcfce7', color: '#16a34a' },
              { label: 'Tổng sản phẩm', value: totalProducts, bg: '#dbeafe', color: '#2563eb' },
            ].map((card) => (
              <div key={card.label} className="bg-white rounded-2xl p-5 border border-slate-100" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: card.bg }}>
                  <Tags size={18} style={{ color: card.color }} />
                </div>
                <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                <p className="text-slate-400 text-xs mt-0.5">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Tìm kiếm danh mục..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all" />
            </div>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((cat) => (
              <div key={cat.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.01]" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                {/* Card header */}
                <div className="h-24 flex items-center justify-center relative overflow-hidden">
                  {cat.image ? (
                    <>
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0" style={{ background: cat.gradient }} />
                      <div className="absolute inset-0 bg-black/10" />
                      <ImageIcon size={36} className="text-white/80 relative z-10" />
                    </>
                  )}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{
                        background: cat.status === 'active' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.3)',
                      }}>
                      {cat.status === 'active' ? 'Hoạt động' : 'Ẩn'}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-slate-800">{cat.name}</h3>
                  </div>
                  <p className="text-xs text-violet-400 font-mono mb-1">/{cat.slug}</p>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">{cat.description || 'Chưa có mô tả'}</p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button onClick={() => toggleStatus(cat)}
                      className="flex-1 py-2 rounded-lg text-xs font-medium transition-all border"
                      style={{
                        background: cat.status === 'active' ? '#fef9c3' : '#dcfce7',
                        color: cat.status === 'active' ? '#ca8a04' : '#16a34a',
                        borderColor: cat.status === 'active' ? '#fde68a' : '#bbf7d0',
                      }}>
                      {cat.status === 'active' ? 'Ẩn' : 'Hiện'}
                    </button>
                    <button onClick={() => openEdit(cat)} className="p-2 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 transition-all" title="Sửa">
                      <Edit2 size={15} />
                    </button>
                    <button onClick={() => setShowDeleteConfirm(cat.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Xóa">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-100">
                <Tags size={40} className="mx-auto mb-3 text-slate-300" />
                <p className="text-slate-400 text-sm">Không tìm thấy danh mục nào</p>
              </div>
            )}
          </div>

          {/* Delete confirm modal */}
          {showDeleteConfirm !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)' }}>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 w-full max-w-sm shadow-2xl">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-red-50">
                    <Trash2 size={24} className="text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Xác nhận xóa</h3>
                  <p className="text-slate-500 text-sm mb-6">Bạn có chắc muốn xóa danh mục này? Thao tác không thể hoàn tác.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all text-sm font-medium">Hủy</button>
                    <button onClick={() => handleDelete(showDeleteConfirm)} className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #f5576c, #ef4444)' }}>Xóa</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)' }}>
              <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white">
                  <div>
                    <h2 className="font-bold text-slate-800 text-lg">{editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</h2>
                    <p className="text-slate-400 text-xs mt-0.5">{editingCategory ? 'Cập nhật thông tin danh mục' : 'Điền thông tin danh mục'}</p>
                  </div>
                  <button onClick={() => setShowForm(false)} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className={labelClass}>Màu gradient danh mục</label>
                    <div className="flex gap-2 flex-wrap">
                      {gradients.map((g) => (
                        <button key={g} type="button" onClick={() => setSelectedGradient(g)} className="w-10 h-10 rounded-xl transition-all"
                          style={{ background: g, border: selectedGradient === g ? '3px solid #7c3aed' : '2px solid #e2e8f0', transform: selectedGradient === g ? 'scale(1.15)' : 'scale(1)' }} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Tên danh mục <span className="text-red-500">*</span></label>
                    <input id="category-name" type="text" required value={formData.name}
                      onChange={(e) => { const name = e.target.value; setFormData({ ...formData, name, slug: toSlug(name) }); }}
                      placeholder="Nhập tên danh mục..." className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>Slug (URL)</label>
                    <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="vd: ao-thun" className={inputClass + ' font-mono'} />
                  </div>

                  <div>
                    <label className={labelClass}>Mô tả</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Mô tả ngắn về danh mục..." rows={3} className={inputClass + ' resize-none'} />
                  </div>

                  <div>
                    <label className={labelClass}>URL ảnh danh mục</label>
                    <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg" className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>Trạng thái</label>
                    <div className="relative">
                      <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                        className={inputClass + ' appearance-none pr-8'}>
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Ẩn</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all text-sm font-medium">Hủy</button>
                    <button type="submit" id="btn-submit-category" className="flex-1 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                      {editingCategory ? 'Lưu thay đổi' : 'Thêm danh mục'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminCategories;
