import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { orderingService, type OrderResponse } from '../../services/orderingService';
import { Package, Clock, ChevronLeft, Eye, X } from 'lucide-react';

type OrderStatus = 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';

const statusConfig: Record<OrderStatus, { label: string; bg: string; color: string; border: string }> = {
  pending: { label: 'Chờ xử lý', bg: '#fef9c3', color: '#ca8a04', border: '#fde68a' },
  processing: { label: 'Đang xử lý', bg: '#dbeafe', color: '#2563eb', border: '#bfdbfe' },
  shipping: { label: 'Đang giao', bg: '#f3e8ff', color: '#7c3aed', border: '#ddd6fe' },
  completed: { label: 'Hoàn thành', bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' },
  cancelled: { label: 'Đã hủy', bg: '#fee2e2', color: '#dc2626', border: '#fecaca' },
};

const UserOrders: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.id) {
        try {
          const data = await orderingService.getUserOrders(user.id);
          setOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    } catch (e) {
      console.error('Date error:', e);
    }
    return 'N/A';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Đang tải đơn hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-slate-600 hover:text-purple-600 mb-4 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Quay lại</span>
          </button>
          <h1 className="text-3xl font-bold text-slate-800">Đơn hàng của tôi</h1>
          <p className="text-slate-500 mt-1">{orders.length} đơn hàng</p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <Package size={64} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Chưa có đơn hàng nào</h3>
            <p className="text-slate-500 mb-6">Bạn chưa đặt đơn hàng nào</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = order.status.toLowerCase() as OrderStatus;
              const sc = statusConfig[status] || statusConfig.pending;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">#{order.orderCode}</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <Clock size={14} />
                        {formatDate(order.createdAtUtc)}
                      </p>
                    </div>
                    <span
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                      style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}
                    >
                      {sc.label}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">{order.items.length} sản phẩm</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {order.paymentMethod} • {order.paymentStatus}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Tổng tiền</p>
                        <p className="text-xl font-bold text-purple-600">
                          {order.totalAmount.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    className="mt-4 w-full py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    Xem chi tiết
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Chi tiết đơn hàng</h2>
                  <p className="text-sm text-purple-600 font-mono">#{selectedOrder.orderCode}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <span className="text-sm font-medium text-slate-600">Trạng thái</span>
                  <span
                    className="px-3 py-1.5 rounded-full text-sm font-semibold border"
                    style={{
                      background: statusConfig[selectedOrder.status.toLowerCase() as OrderStatus]?.bg,
                      color: statusConfig[selectedOrder.status.toLowerCase() as OrderStatus]?.color,
                      borderColor: statusConfig[selectedOrder.status.toLowerCase() as OrderStatus]?.border
                    }}
                  >
                    {statusConfig[selectedOrder.status.toLowerCase() as OrderStatus]?.label}
                  </span>
                </div>

                {/* Shipping Info */}
                <div className="border border-slate-200 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-800 mb-3">Thông tin giao hàng</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Người nhận:</span>
                      <span className="font-medium text-slate-800">{selectedOrder.shippingName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Số điện thoại:</span>
                      <span className="font-medium text-slate-800">{selectedOrder.shippingPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email:</span>
                      <span className="font-medium text-slate-800">{selectedOrder.shippingEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Địa chỉ:</span>
                      <span className="font-medium text-slate-800 text-right max-w-xs">
                        {[selectedOrder.shippingAddress, selectedOrder.ward, selectedOrder.district, selectedOrder.city]
                          .filter(Boolean)
                          .join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="border border-slate-200 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-800 mb-3">Sản phẩm ({selectedOrder.items.length})</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{item.productNameSnapshot}</p>
                          <p className="text-sm text-slate-500">
                            {item.colorSnapshot && `${item.colorSnapshot} • `}
                            {item.sizeSnapshot && `${item.sizeSnapshot} • `}
                            x{item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-slate-800">
                          {item.lineTotal.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tạm tính:</span>
                      <span className="font-medium">{selectedOrder.subtotal.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Phí vận chuyển:</span>
                      <span className="font-medium">{selectedOrder.shippingFee.toLocaleString('vi-VN')}đ</span>
                    </div>
                    {selectedOrder.discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Giảm giá:</span>
                        <span className="font-medium">-{selectedOrder.discountAmount.toLocaleString('vi-VN')}đ</span>
                      </div>
                    )}
                    <div className="border-t border-slate-300 pt-2 flex justify-between text-lg font-bold">
                      <span className="text-slate-800">Tổng cộng:</span>
                      <span className="text-purple-600">{selectedOrder.totalAmount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-sm font-medium text-slate-700">Phương thức thanh toán</span>
                  <span className="text-sm font-semibold text-blue-600">{selectedOrder.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
