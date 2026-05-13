import React, { useEffect, useState } from 'react';
import { voucherService, type Voucher, type CreateVoucherRequest, type UpdateVoucherRequest } from '../../../services/voucherService';
import { Plus, Edit, Trash2, X, Tag, Calendar, Percent, DollarSign, Package } from 'lucide-react';

const AdminVouchers: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);
  const [formData, setFormData] = useState<CreateVoucherRequest>({
    code: '',
    name: '',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    minOrderAmount: undefined,
    maxDiscountAmount: undefined,
    totalQuantity: undefined,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
  });

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const data = await voucherService.getAllVouchers();
      setVouchers(data);
    } catch (error: any) {
      console.error('Error fetching vouchers:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Lỗi khi tải danh sách voucher';
      alert(`Lỗi: ${errorMessage}\n\nVui lòng kiểm tra:\n1. Đã đăng nhập với tài khoản admin?\n2. Backend đang chạy?\n3. Token còn hiệu lực?`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingVoucher) {
        await voucherService.updateVoucher(editingVoucher.id, {
          ...formData,
          status: formData.status || 'active',
        } as UpdateVoucherRequest);
        alert('Cập nhật voucher thành công!');
      } else {
        await voucherService.createVoucher(formData);
        alert('Tạo voucher thành công!');
      }
      setShowModal(false);
      setEditingVoucher(null);
      resetForm();
      fetchVouchers();
    } catch (error: any) {
      console.error('Error saving voucher:', error);
      alert(error.response?.data?.message || 'Lỗi khi lưu voucher');
    }
  };

  const handleEdit = (voucher: Voucher) => {
    setEditingVoucher(voucher);
    setFormData({
      code: voucher.code,
      name: voucher.name,
      description: voucher.description || '',
      discountType: voucher.discountType,
      discountValue: voucher.discountValue,
      minOrderAmount: voucher.minOrderAmount || undefined,
      maxDiscountAmount: voucher.maxDiscountAmount || undefined,
      totalQuantity: voucher.totalQuantity || undefined,
      startDate: new Date(voucher.startDate).toISOString().split('T')[0],
      endDate: new Date(voucher.endDate).toISOString().split('T')[0],
      status: voucher.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa voucher này?')) return;
    try {
      await voucherService.deleteVoucher(id);
      alert('Xóa voucher thành công!');
      fetchVouchers();
    } catch (error: any) {
      console.error('Error deleting voucher:', error);
      alert(error.response?.data?.message || 'Lỗi khi xóa voucher');
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      description: '',
      discountType: 'percentage',
      discountValue: 0,
      minOrderAmount: undefined,
      maxDiscountAmount: undefined,
      totalQuantity: undefined,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
    });
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      active: { bg: '#dcfce7', text: '#16a34a' },
      inactive: { bg: '#fee2e2', text: '#dc2626' },
      expired: { bg: '#f3f4f6', text: '#6b7280' },
    };
    const color = colors[status] || colors.inactive;
    return (
      <span
        className="px-2 py-1 rounded-full text-xs font-semibold"
        style={{ background: color.bg, color: color.text }}
      >
        {status === 'active' ? 'Hoạt động' : status === 'inactive' ? 'Tạm dừng' : 'Hết hạn'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Voucher</h1>
          <p className="text-slate-500 mt-1">{vouchers.length} voucher</p>
        </div>
        <button
          onClick={() => {
            setEditingVoucher(null);
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Tạo Voucher
        </button>
      </div>

      {/* Vouchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vouchers.map((voucher) => (
          <div
            key={voucher.id}
            className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-lg transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Tag size={16} className="text-purple-600" />
                  <h3 className="font-bold text-slate-800">{voucher.code}</h3>
                </div>
                <p className="text-sm text-slate-600">{voucher.name}</p>
              </div>
              {getStatusBadge(voucher.status)}
            </div>

            {/* Description */}
            {voucher.description && (
              <p className="text-xs text-slate-500 mb-3 line-clamp-2">{voucher.description}</p>
            )}

            {/* Discount Info */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 mb-1">
                {voucher.discountType === 'percentage' ? (
                  <Percent size={16} className="text-purple-600" />
                ) : (
                  <DollarSign size={16} className="text-purple-600" />
                )}
                <span className="text-lg font-bold text-purple-600">
                  {voucher.discountType === 'percentage'
                    ? `${voucher.discountValue}%`
                    : `${voucher.discountValue.toLocaleString('vi-VN')}đ`}
                </span>
              </div>
              {voucher.maxDiscountAmount && (
                <p className="text-xs text-slate-600">
                  Tối đa: {voucher.maxDiscountAmount.toLocaleString('vi-VN')}đ
                </p>
              )}
            </div>

            {/* Details */}
            <div className="space-y-2 text-xs text-slate-600 mb-3">
              {voucher.minOrderAmount && (
                <div className="flex items-center gap-2">
                  <Package size={12} />
                  <span>Đơn tối thiểu: {voucher.minOrderAmount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              {voucher.totalQuantity && (
                <div className="flex items-center gap-2">
                  <Tag size={12} />
                  <span>
                    Còn lại: {voucher.remainingQuantity}/{voucher.totalQuantity}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={12} />
                <span>
                  {new Date(voucher.startDate).toLocaleDateString('vi-VN')} -{' '}
                  {new Date(voucher.endDate).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(voucher)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Edit size={14} />
                Sửa
              </button>
              <button
                onClick={() => handleDelete(voucher.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 size={14} />
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                {editingVoucher ? 'Chỉnh sửa Voucher' : 'Tạo Voucher mới'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mã Voucher *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="VD: SUMMER2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tên Voucher *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="VD: Giảm giá mùa hè"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="Mô tả chi tiết về voucher..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loại giảm giá *
                  </label>
                  <select
                    value={formData.discountType}
                    onChange={(e) =>
                      setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="percentage">Phần trăm (%)</option>
                    <option value="fixed">Số tiền cố định (đ)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Giá trị giảm *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={formData.discountType === 'percentage' ? '10' : '50000'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Đơn hàng tối thiểu (đ)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minOrderAmount || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, minOrderAmount: e.target.value ? parseFloat(e.target.value) : undefined })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Giảm tối đa (đ)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.maxDiscountAmount || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxDiscountAmount: e.target.value ? parseFloat(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Số lượng</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.totalQuantity || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, totalQuantity: e.target.value ? parseInt(e.target.value) : undefined })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Không giới hạn"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ngày bắt đầu *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ngày kết thúc *</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {editingVoucher && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Trạng thái *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Tạm dừng</option>
                  </select>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  {editingVoucher ? 'Cập nhật' : 'Tạo mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVouchers;
