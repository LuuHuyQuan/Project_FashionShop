import React, { useState, useEffect } from 'react';
import {
  Search,
  Eye,
  Edit2,
  ChevronDown,
  ShoppingBag,
  X,
  Check,
  Clock,
  Truck,
  Package,
} from 'lucide-react';
import { orderingService, type OrderResponse } from '../../../services/orderingService';

type OrderStatus = 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  address: string;
  date: string;
  paymentMethod: string;
}

const statusConfig: Record<OrderStatus, { label: string; bg: string; color: string; border: string; icon: React.ReactNode }> = {
  pending: { label: 'Chờ xử lý', bg: '#fef9c3', color: '#ca8a04', border: '#fde68a', icon: <Clock size={12} /> },
  processing: { label: 'Đang xử lý', bg: '#dbeafe', color: '#2563eb', border: '#bfdbfe', icon: <Package size={12} /> },
  shipping: { label: 'Đang giao', bg: '#f3e8ff', color: '#7c3aed', border: '#ddd6fe', icon: <Truck size={12} /> },
  completed: { label: 'Hoàn thành', bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0', icon: <Check size={12} /> },
  cancelled: { label: 'Đã hủy', bg: '#fee2e2', color: '#dc2626', border: '#fecaca', icon: <X size={12} /> },
};

const statusFlow: OrderStatus[] = ['pending', 'processing', 'shipping', 'completed'];

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [editingStatus, setEditingStatus] = useState<string | null>(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('Fetching all orders...');
        const apiOrders = await orderingService.getAllOrders();
        console.log('Orders received:', apiOrders);

        // Transform API response to match UI format
        const transformedOrders: Order[] = apiOrders.map(order => {
          console.log('Order date:', order.orderCode, order.createdAtUtc);

          // Parse date safely
          let dateStr = 'N/A';
          try {
            const date = new Date(order.createdAtUtc);
            if (!isNaN(date.getTime())) {
              dateStr = date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              });
            }
          } catch (e) {
            console.error('Date error:', e);
          }

          return {
            id: order.orderCode,
            customer: order.shippingName,
            email: order.shippingEmail,
            phone: order.shippingPhone,
            items: order.items.map(item => ({
              name: item.productNameSnapshot,
              qty: item.quantity,
              price: item.unitPrice
            })),
            total: order.totalAmount,
            status: order.status.toLowerCase() as OrderStatus,
            address: [order.shippingAddress, order.ward, order.district, order.city]
              .filter(Boolean)
              .join(', '),
            date: dateStr,
            paymentMethod: order.paymentMethod
          };
        });

        setOrders(transformedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      // Find the order to get its numeric ID
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      // Extract numeric ID from orderCode (e.g., "ORD-001" -> need to find actual ID)
      // Since we only have orderCode, we need to call API with orderCode first
      const apiOrder = await orderingService.getOrderByCode(orderId);

      // Update status via API
      await orderingService.updateOrderStatus(apiOrder.id, status);

      // Update local state
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );

      if (viewOrder?.id === orderId) {
        setViewOrder((prev) => prev ? { ...prev, status } : null);
      }

      setEditingStatus(null);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Không thể cập nhật trạng thái đơn hàng');
    }
  };

  const gradients = ['#667eea,#764ba2', '#f093fb,#f5576c', '#4facfe,#00f2fe', '#43e97b,#38f9d7', '#fa709a,#fee140', '#a18cd1,#fbc2eb'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý đơn hàng</h1>
          <p className="text-slate-500 text-sm mt-1">
            {loading ? 'Đang tải...' : `${orders.length} đơn hàng tổng cộng`}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {(['all', ...Object.keys(statusConfig)] as const).map((key) => {
          const count = key === 'all' ? orders.length : orders.filter((o) => o.status === key).length;
          const sc = key === 'all' ? null : statusConfig[key as OrderStatus];
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className="rounded-xl p-3 border text-left transition-all hover:shadow-sm"
              style={{
                background: filterStatus === key
                  ? (sc ? sc.bg : '#ede9fe')
                  : '#ffffff',
                borderColor: filterStatus === key
                  ? (sc ? sc.border : '#ddd6fe')
                  : '#e2e8f0',
                boxShadow: filterStatus === key ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              <p className="text-xl font-bold" style={{ color: sc ? sc.color : '#7c3aed' }}>{count}</p>
              <p className="text-xs text-slate-500 mt-0.5">{key === 'all' ? 'Tất cả' : sc?.label}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm mã đơn hoặc tên khách hàng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-4 pr-8 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-600 focus:outline-none focus:border-violet-400 appearance-none"
          >
            <option value="all">Tất cả trạng thái</option>
            {Object.entries(statusConfig).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
              {['Mã đơn', 'Khách hàng', 'Sản phẩm', 'Tổng tiền', 'Thanh toán', 'Trạng thái', 'Ngày', 'Thao tác'].map((h) => (
                <th key={h} className="px-5 py-4 text-left text-xs text-slate-400 font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-16">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
                    <p className="text-slate-400 text-sm">Đang tải đơn hàng...</p>
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-16">
                  <ShoppingBag size={40} className="mx-auto mb-3 text-slate-300" />
                  <p className="text-slate-400 text-sm">Không tìm thấy đơn hàng nào</p>
                </td>
              </tr>
            ) : (
              filtered.map((order, idx) => {
                const sc = statusConfig[order.status];
                return (
                  <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-xs font-mono font-semibold" style={{ color: '#7c3aed' }}>#{order.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${gradients[idx % 6]})` }}
                        >
                          {order.customer.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm text-slate-800 font-medium">{order.customer}</p>
                          <p className="text-xs text-slate-400">{order.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{order.items.length} sản phẩm</td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">{order.total.toLocaleString('vi-VN')}đ</td>
                    <td className="px-5 py-4 text-xs text-slate-500">{order.paymentMethod}</td>
                    <td className="px-5 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setEditingStatus(editingStatus === order.id ? null : order.id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium hover:opacity-80 transition-all border"
                          style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}
                        >
                          {sc.icon}
                          {sc.label}
                          <ChevronDown size={10} />
                        </button>
                        {editingStatus === order.id && (
                          <div
                            className="absolute top-full left-0 mt-1 z-20 rounded-xl border border-slate-200 overflow-hidden shadow-lg bg-white"
                            style={{ minWidth: '160px' }}
                          >
                            {Object.entries(statusConfig).map(([key, val]) => (
                              <button
                                key={key}
                                onClick={() => updateStatus(order.id, key as OrderStatus)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-slate-50 transition-colors text-left font-medium"
                                style={{ color: val.color }}
                              >
                                {val.icon} {val.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400">{order.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewOrder(order)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 transition-all"
                          title="Xem chi tiết"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
                          title="Chỉnh sửa"
                        >
                          <Edit2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)' }}>
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white">
              <div>
                <h2 className="font-bold text-slate-800 text-lg">Chi tiết đơn hàng</h2>
                <p className="text-violet-500 text-sm font-mono">#{viewOrder.id}</p>
              </div>
              <button onClick={() => setViewOrder(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Status progress */}
              <div className="flex items-center justify-between">
                {statusFlow.map((st, i) => {
                  const sc = statusConfig[st];
                  const currentIdx = statusFlow.indexOf(viewOrder.status as OrderStatus);
                  const isCancelled = viewOrder.status === 'cancelled';
                  const isDone = !isCancelled && i <= currentIdx;
                  return (
                    <React.Fragment key={st}>
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs border"
                          style={{
                            background: isDone ? sc.bg : '#f8fafc',
                            color: isDone ? sc.color : '#cbd5e1',
                            borderColor: isDone ? sc.border : '#e2e8f0',
                          }}
                        >
                          {sc.icon}
                        </div>
                        <span className="text-xs" style={{ color: isDone ? sc.color : '#94a3b8' }}>
                          {sc.label}
                        </span>
                      </div>
                      {i < statusFlow.length - 1 && (
                        <div className="flex-1 h-px mx-1" style={{ background: isDone && i < currentIdx ? '#7c3aed' : '#e2e8f0' }} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Customer info */}
              <div className="rounded-xl border border-slate-100 p-4 bg-slate-50">
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">Thông tin khách hàng</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Họ tên', value: viewOrder.customer },
                    { label: 'Email', value: viewOrder.email },
                    { label: 'SĐT', value: viewOrder.phone },
                    { label: 'Địa chỉ', value: viewOrder.address },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-sm text-slate-500 flex-shrink-0">{label}</span>
                      <span className="text-sm text-slate-800 font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items */}
              <div className="rounded-xl border border-slate-100 p-4 bg-slate-50">
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">Sản phẩm đặt hàng</h3>
                <div className="space-y-3">
                  {viewOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: `linear-gradient(135deg, ${gradients[i % 6]})` }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-sm text-slate-800 font-medium">{item.name}</p>
                          <p className="text-xs text-slate-400">x{item.qty}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{(item.price * item.qty).toLocaleString('vi-VN')}đ</p>
                    </div>
                  ))}
                  <div className="border-t border-slate-200 pt-3 flex justify-between">
                    <span className="text-sm text-slate-500">Phương thức TT</span>
                    <span className="text-sm text-slate-700 font-medium">{viewOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-slate-800">Tổng cộng</span>
                    <span className="font-bold text-violet-600">{viewOrder.total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {viewOrder.status !== 'completed' && viewOrder.status !== 'cancelled' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => { updateStatus(viewOrder.id, 'cancelled'); setViewOrder(null); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border"
                    style={{ background: '#fee2e2', color: '#dc2626', borderColor: '#fecaca' }}
                  >
                    Hủy đơn
                  </button>
                  {statusFlow.indexOf(viewOrder.status as OrderStatus) < statusFlow.length - 1 && (
                    <button
                      onClick={() => {
                        const nextIdx = statusFlow.indexOf(viewOrder.status as OrderStatus) + 1;
                        updateStatus(viewOrder.id, statusFlow[nextIdx]);
                      }}
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
                    >
                      Chuyển sang: {statusConfig[statusFlow[statusFlow.indexOf(viewOrder.status as OrderStatus) + 1]]?.label}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

