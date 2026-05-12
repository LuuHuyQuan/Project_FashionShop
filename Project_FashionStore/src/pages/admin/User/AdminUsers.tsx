import React, { useState, useEffect } from 'react';
import {
  Search,
  Users,
  Trash2,
  Eye,
  X,
  ShieldCheck,
  ShieldOff,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  ChevronDown,
} from 'lucide-react';
import { authService, User as BackendUser, UpdateUserRequest } from '../../../services/authService';
import { swal } from '../../../utils/swal';

type UserRole = 'admin' | 'customer' | 'vip';
type UserStatus = 'active' | 'banned' | 'inactive';

interface User extends BackendUser {
  totalOrders?: number;
  totalSpent?: number;
  address?: string;
}

const initialUsers: User[] = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@gmail.com', phone: '0901234567', address: '123 Lê Lợi, Q.1, TP.HCM', role: 'admin', status: 'active', joinDate: '01/01/2025', totalOrders: 0, totalSpent: 0 },
  { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@gmail.com', phone: '0912345678', address: '456 Nguyễn Huệ, Q.1, TP.HCM', role: 'vip', status: 'active', joinDate: '15/02/2025', totalOrders: 28, totalSpent: 28500000 },
  { id: 3, name: 'Lê Minh Châu', email: 'chau.le@gmail.com', phone: '0923456789', address: '789 Pasteur, Q.3, TP.HCM', role: 'customer', status: 'active', joinDate: '20/02/2025', totalOrders: 12, totalSpent: 8900000 },
  { id: 4, name: 'Phạm Quốc Dũng', email: 'dung.pham@gmail.com', phone: '0934567890', address: '321 Trần Hưng Đạo, Q.5, TP.HCM', role: 'customer', status: 'banned', joinDate: '05/03/2025', totalOrders: 3, totalSpent: 1500000 },
  { id: 5, name: 'Hoàng Thị Lan', email: 'lan.hoang@gmail.com', phone: '0945678901', address: '654 Điện Biên Phủ, Q.BT, TP.HCM', role: 'vip', status: 'active', joinDate: '12/03/2025', totalOrders: 45, totalSpent: 52000000 },
  { id: 6, name: 'Vũ Đức Nam', email: 'nam.vu@gmail.com', phone: '0956789012', address: '987 CMT8, Q.TB, TP.HCM', role: 'customer', status: 'inactive', joinDate: '18/03/2025', totalOrders: 5, totalSpent: 3200000 },
  { id: 7, name: 'Đặng Thu Hà', email: 'ha.dang@gmail.com', phone: '0967890123', address: '147 Nguyễn Đình Chiểu, Q.3, TP.HCM', role: 'customer', status: 'active', joinDate: '20/03/2025', totalOrders: 8, totalSpent: 6700000 },
  { id: 8, name: 'Bùi Văn Hùng', email: 'hung.bui@gmail.com', phone: '0978901234', address: '258 Võ Văn Tần, Q.3, TP.HCM', role: 'vip', status: 'active', joinDate: '21/03/2025', totalOrders: 31, totalSpent: 37800000 },
];

const roleConfig: Record<UserRole, { label: string; bg: string; color: string }> = {
  admin: { label: 'Admin', bg: '#ede9fe', color: '#7c3aed' },
  vip: { label: 'VIP', bg: '#fce7f3', color: '#db2777' },
  customer: { label: 'Khách hàng', bg: '#f1f5f9', color: '#64748b' },
};

const statusConfig: Record<UserStatus, { label: string; bg: string; color: string }> = {
  active: { label: 'Hoạt động', bg: '#dcfce7', color: '#16a34a' },
  banned: { label: 'Đã khóa', bg: '#fee2e2', color: '#dc2626' },
  inactive: { label: 'Không hoạt động', bg: '#fef9c3', color: '#ca8a04' },
};

const gradients = ['#667eea,#764ba2', '#f093fb,#f5576c', '#4facfe,#00f2fe', '#43e97b,#38f9d7', '#fa709a,#fee140', '#a18cd1,#fbc2eb', '#ffecd2,#fcb69f', '#a1c4fd,#c2e9fb'];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  // Load users from backend
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await authService.getUsers();
      // Convert backend data to UI format
      const usersUI: User[] = data.map(u => ({
        ...u,
        totalOrders: 0, // TODO: Get from orders service
        totalSpent: 0,  // TODO: Get from orders service
        address: '',    // TODO: Get from addresses
      }));
      setUsers(usersUI);
    } catch (error) {
      console.error('Lỗi khi tải người dùng:', error);
      swal.error('Lỗi tải dữ liệu', 'Không thể tải danh sách người dùng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchRole = filterRole === 'all' || u.role === filterRole;
    const matchStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const toggleBan = async (user: User) => {
    try {
      const newStatus = user.status === 'banned' ? 'active' : 'banned';
      const updateData: UpdateUserRequest = {
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
        status: newStatus,
      };
      await authService.updateUser(user.id, updateData);
      await loadUsers();
      if (viewUser?.id === user.id) {
        setViewUser({ ...user, status: newStatus });
      }
      swal.toast.success(`Đã ${newStatus === 'banned' ? 'khóa' : 'mở khóa'} tài khoản`);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      swal.error('Lỗi', 'Không thể cập nhật trạng thái. Vui lòng thử lại.');
    }
  };

  const handleDelete = async (id: number) => {
    const result = await swal.confirmDelete('Xóa tài khoản?', 'Hành động này không thể hoàn tác.');
    if (!result.isConfirmed) {
      setShowDeleteConfirm(null);
      return;
    }

    try {
      await authService.deleteUser(id);
      await loadUsers();
      setShowDeleteConfirm(null);
      if (viewUser?.id === id) setViewUser(null);
      swal.toast.success('Đã xóa tài khoản');
    } catch (error: any) {
      console.error('Lỗi khi xóa người dùng:', error);
      const errorMessage = error?.response?.data?.message || 'Không thể xóa người dùng. Vui lòng thử lại.';
      swal.error('Lỗi', errorMessage);
      setShowDeleteConfirm(null);
    }
  };

  const totalActive = users.filter((u) => u.status === 'active').length;
  const totalVip = users.filter((u) => u.role === 'vip').length;
  const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0);

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 text-sm">Đang tải người dùng...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Quản lý người dùng</h1>
              <p className="text-slate-500 text-sm mt-1">{users.length} tài khoản đã đăng ký</p>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { label: 'Tổng người dùng', value: users.length, color: '#7c3aed', bg: '#ede9fe', iconColor: '#7c3aed' },
              { label: 'Đang hoạt động', value: totalActive, color: '#16a34a', bg: '#dcfce7', iconColor: '#059669' },
              { label: 'Thành viên VIP', value: totalVip, color: '#db2777', bg: '#fce7f3', iconColor: '#db2777' },
              { label: 'Tổng chi tiêu', value: `${(totalRevenue / 1000000).toFixed(1)}M`, color: '#2563eb', bg: '#dbeafe', iconColor: '#2563eb' },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-2xl p-5 border border-slate-100 transition-all hover:shadow-md"
                style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: card.bg }}>
                  <Users size={18} style={{ color: card.iconColor }} />
                </div>
                <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                <p className="text-slate-400 text-xs mt-0.5">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div
            className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row gap-3"
            style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
          >
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm theo tên, email, SĐT..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-4 pr-8 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-600 focus:outline-none focus:border-violet-400 appearance-none"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="admin">Admin</option>
                <option value="vip">VIP</option>
                <option value="customer">Khách hàng</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-4 pr-8 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-600 focus:outline-none focus:border-violet-400 appearance-none"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="banned">Đã khóa</option>
                <option value="inactive">Không hoạt động</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Table */}
          <div
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
            style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                  {['Người dùng', 'Liên hệ', 'Vai trò', 'Đơn hàng', 'Chi tiêu', 'Trạng thái', 'Thao tác'].map((h) => (
                    <th key={h} className="px-5 py-4 text-left text-xs text-slate-400 font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <Users size={40} className="mx-auto mb-3 text-slate-300" />
                      <p className="text-slate-400 text-sm">Không tìm thấy người dùng nào</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((user, idx) => {
                    const rc = roleConfig[user.role];
                    const sc = statusConfig[user.status];
                    return (
                      <tr
                        key={user.id}
                        className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                              style={{ background: `linear-gradient(135deg, ${gradients[idx % 8]})` }}
                            >
                              {user.fullName.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-800">{user.fullName}</p>
                              <p className="text-xs text-slate-400">ID: #{user.id.toString().padStart(4, '0')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-slate-600">{user.email}</p>
                          <p className="text-xs text-slate-400">{user.phone}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium"
                            style={{ background: rc.bg, color: rc.color }}
                          >
                            {user.role === 'admin' && <ShieldCheck size={11} />}
                            {rc.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">{user.totalOrders}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                          {user.totalSpent > 0 ? `${user.totalSpent.toLocaleString('vi-VN')}đ` : '—'}
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
                          <div className="flex gap-2">
                            <button
                              onClick={() => setViewUser(user)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 transition-all"
                              title="Xem chi tiết"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              onClick={() => toggleBan(user)}
                              className={`p-1.5 rounded-lg transition-all ${user.status === 'banned' ? 'text-emerald-500 hover:bg-emerald-50' : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50'}`}
                              title={user.status === 'banned' ? 'Mở khóa' : 'Khóa tài khoản'}
                            >
                              {user.status === 'banned' ? <ShieldCheck size={15} /> : <ShieldOff size={15} />}
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(user.id)}
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

            <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50">
              <p className="text-xs text-slate-400">Hiển thị {filtered.length} / {users.length} người dùng</p>
              <div className="flex gap-1">
                {[1, 2].map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 rounded-lg text-xs transition-all font-medium ${page === 1 ? 'text-white' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'}`}
                    style={page === 1 ? { background: 'linear-gradient(135deg, #667eea, #764ba2)' } : {}}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User detail modal */}
          {viewUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)' }}>
              <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white">
                  <h2 className="font-bold text-slate-800 text-lg">Thông tin người dùng</h2>
                  <button onClick={() => setViewUser(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  {/* Avatar & name */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${gradients[viewUser.id % 8]})` }}
                    >
                      {viewUser.fullName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{viewUser.fullName}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium" style={{ background: roleConfig[viewUser.role].bg, color: roleConfig[viewUser.role].color }}>
                          {viewUser.role === 'admin' && <ShieldCheck size={10} />}
                          {roleConfig[viewUser.role].label}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: statusConfig[viewUser.status].bg, color: statusConfig[viewUser.status].color }}>
                          {statusConfig[viewUser.status].label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-4 border border-slate-100 bg-violet-50">
                      <div className="flex items-center gap-2 mb-1">
                        <ShoppingBag size={14} className="text-violet-500" />
                        <span className="text-xs text-slate-500">Đơn hàng</span>
                      </div>
                      <p className="text-xl font-bold text-slate-800">{viewUser.totalOrders}</p>
                    </div>
                    <div className="rounded-xl p-4 border border-slate-100 bg-blue-50">
                      <div className="flex items-center gap-2 mb-1">
                        <ShoppingBag size={14} className="text-blue-500" />
                        <span className="text-xs text-slate-500">Chi tiêu</span>
                      </div>
                      <p className="text-xl font-bold text-slate-800">
                        {viewUser.totalSpent > 0 ? `${(viewUser.totalSpent / 1000000).toFixed(1)}M` : '0đ'}
                      </p>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="rounded-xl border border-slate-100 p-4 space-y-3 bg-slate-50">
                    <h4 className="text-xs text-slate-400 uppercase font-semibold">Thông tin liên hệ</h4>
                    {[
                      { icon: Mail, label: viewUser.email },
                      { icon: Phone, label: viewUser.phone },
                      { icon: MapPin, label: viewUser.address || 'Chưa cập nhật' },
                      { icon: Calendar, label: `Tham gia: ${new Date(viewUser.createdAt).toLocaleDateString('vi-VN')}` },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3">
                        <Icon size={14} className="text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleBan(viewUser)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border"
                      style={
                        viewUser.status === 'banned'
                          ? { background: '#dcfce7', color: '#16a34a', borderColor: '#bbf7d0' }
                          : { background: '#fee2e2', color: '#dc2626', borderColor: '#fecaca' }
                      }
                    >
                      {viewUser.status === 'banned' ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                    </button>
                    <button
                      onClick={() => setViewUser(null)}
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delete confirm */}
          {showDeleteConfirm !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)' }}>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 w-full max-w-sm shadow-2xl">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-red-50">
                    <Trash2 size={24} className="text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Xóa tài khoản</h3>
                  <p className="text-slate-500 text-sm mb-6">Bạn có chắc muốn xóa tài khoản này? Hành động không thể hoàn tác.</p>
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
        </>
      )}
    </div>
  );
};

export default AdminUsers;
