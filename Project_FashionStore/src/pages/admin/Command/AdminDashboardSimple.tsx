import React from 'react';
import { TrendingUp, Package, ShoppingBag, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data đơn giản
  const stats = [
    { label: 'Doanh thu', value: '128.4M', change: '+12.5%', icon: TrendingUp, color: '#7c3aed' },
    { label: 'Đơn hàng', value: '1,284', change: '+8.2%', icon: ShoppingBag, color: '#db2777' },
    { label: 'Sản phẩm', value: '342', change: '+3.1%', icon: Package, color: '#2563eb' },
    { label: 'Người dùng', value: '5,621', change: '-1.4%', icon: Users, color: '#059669' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Nguyễn Văn A', product: 'Áo thun Premium', amount: '599,000đ', status: 'Hoàn thành' },
    { id: '#ORD-002', customer: 'Trần Thị B', product: 'Quần jeans Skinny', amount: '899,000đ', status: 'Đang giao' },
    { id: '#ORD-003', customer: 'Lê Văn C', product: 'Áo khoác Bomber', amount: '1,299,000đ', status: 'Chờ xử lý' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Tổng quan</h1>
        <p className="text-slate-500 text-sm">Chào mừng trở lại! Đây là tóm tắt hôm nay.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 border border-slate-100"
            style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-slate-100" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Đơn hàng gần đây</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Mã đơn</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Khách hàng</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Sản phẩm</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Số tiền</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' :
                        order.status === 'Đang giao' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
