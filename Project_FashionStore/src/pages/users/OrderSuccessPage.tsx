import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Copy,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Sparkles,
  Heart,
} from 'lucide-react';

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);

  // Tạo mã đơn hàng đơn giản
  const now = new Date();
  const orderId = `FS-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const orderDetails = {
    items: [
      { name: 'Áo thun Premium Cotton', qty: 2, price: 599000, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      { name: 'Quần jeans Skinny Fit', qty: 1, price: 899000, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
      { name: 'Áo khoác Bomber', qty: 1, price: 1299000, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    ],
    shipping: {
      name: 'Nguyễn Văn A',
      phone: '0912 345 678',
      email: 'nguyenvana@email.com',
      address: '123 Đường ABC, Phường 1, Quận 1, TP. Hồ Chí Minh',
    },
    payment: 'Thanh toán khi nhận hàng (COD)',
    total: 3396000,
  };

  const timeline = [
    { icon: CheckCircle2, label: 'Đặt hàng thành công', time: 'Vừa xong', active: true, done: true },
    { icon: Package, label: 'Đang xử lý đơn hàng', time: 'Dự kiến 1-2 giờ', active: true, done: false },
    { icon: Truck, label: 'Đang vận chuyển', time: 'Dự kiến 2-5 ngày', active: false, done: false },
    { icon: Heart, label: 'Giao hàng thành công', time: '', active: false, done: false },
  ];

  return (
    <div style={{ background: 'linear-gradient(180deg, #f0fdf4 0%, #f8fafc 30%, #eef2ff 100%)', minHeight: '100vh' }}>

      {/* Confetti effect - Đơn giản hóa */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const colors = ['#667eea', '#764ba2', '#43e97b', '#38f9d7', '#f093fb'];
            const left = (i * 3.3) % 100;
            const delay = (i % 5) * 0.4;

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: '-10px',
                  width: '8px',
                  height: '8px',
                  background: colors[i % 5],
                  borderRadius: '50%',
                  animation: `confetti-fall 3s linear forwards`,
                  animationDelay: `${delay}s`,
                  opacity: 0.8,
                }}
              />
            );
          })}
          <style>{`
            @keyframes confetti-fall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      <div className="container mx-auto px-6 py-12">

        {/* Success Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="relative inline-block mb-6">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
              style={{
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                boxShadow: '0 12px 40px rgba(67,233,123,0.4)',
              }}
            >
              <CheckCircle2 size={48} className="text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles size={24} className="text-yellow-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
            Đặt hàng thành công! 🎉
          </h1>
          <p className="text-lg text-slate-500 max-w-lg mx-auto">
            Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến.
          </p>
        </div>

        {/* Order ID */}
        <div
          className="max-w-md mx-auto rounded-2xl p-5 mb-10 text-center animate-slide-up"
          style={{
            background: 'linear-gradient(135deg, rgba(102,126,234,0.05), rgba(118,75,162,0.05))',
            border: '2px dashed rgba(102,126,234,0.3)',
          }}
        >
          <p className="text-sm text-slate-400 mb-1">Mã đơn hàng của bạn</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-extrabold text-purple-700 tracking-wider">{orderId}</span>
            <button
              onClick={handleCopyOrder}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ background: copied ? '#43e97b' : '#eef2ff' }}
            >
              {copied ? (
                <CheckCircle2 size={16} className="text-white" />
              ) : (
                <Copy size={16} className="text-purple-600" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Email xác nhận đã được gửi đến <span className="font-semibold text-slate-600">{orderDetails.shipping.email}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Left: Order details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Order Timeline */}
            <div
              className="rounded-3xl p-6"
              style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <h3 className="font-bold text-lg text-slate-900 mb-6">Trạng thái đơn hàng</h3>
              <div className="flex items-start justify-between">
                {timeline.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1 relative">
                    {idx < timeline.length - 1 && (
                      <div
                        className="absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5"
                        style={{
                          background: step.done
                            ? 'linear-gradient(90deg, #43e97b, #38f9d7)'
                            : '#e2e8f0',
                        }}
                      />
                    )}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10 transition-all"
                      style={{
                        background: step.done
                          ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                          : step.active
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            : '#e2e8f0',
                        boxShadow: step.active ? '0 4px 16px rgba(102,126,234,0.3)' : 'none',
                      }}
                    >
                      <step.icon size={18} className={step.active || step.done ? 'text-white' : 'text-slate-400'} />
                    </div>
                    <p className={`text-xs font-semibold text-center ${step.active ? 'text-slate-800' : 'text-slate-400'}`}>
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-400 text-center mt-0.5">{step.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Items ordered */}
            <div
              className="rounded-3xl p-6"
              style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <h3 className="font-bold text-lg text-slate-900 mb-5">Sản phẩm đã đặt</h3>
              <div className="space-y-4">
                {orderDetails.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div
                      className="w-16 h-16 rounded-xl flex-shrink-0"
                      style={{ background: item.gradient }}
                    />
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <p className="text-sm text-slate-400">Số lượng: {item.qty}</p>
                    </div>
                    <p className="font-bold text-slate-900">{(item.price * item.qty).toLocaleString('vi-VN')}đ</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping info */}
            <div
              className="rounded-3xl p-6"
              style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <h3 className="font-bold text-lg text-slate-900 mb-5">Thông tin giao hàng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(102,126,234,0.1)' }}>
                    <Mail size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-sm font-semibold text-slate-700">{orderDetails.shipping.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(102,126,234,0.1)' }}>
                    <Phone size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Điện thoại</p>
                    <p className="text-sm font-semibold text-slate-700">{orderDetails.shipping.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(102,126,234,0.1)' }}>
                    <MapPin size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Địa chỉ giao hàng</p>
                    <p className="text-sm font-semibold text-slate-700">{orderDetails.shipping.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Summary & Actions */}
          <div className="space-y-6">
            {/* Total summary */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 8px 32px rgba(102,126,234,0.35)',
              }}
            >
              <h3 className="font-bold text-white/80 text-sm mb-4">Tổng thanh toán</h3>
              <p className="text-4xl font-extrabold text-white mb-2">
                {orderDetails.total.toLocaleString('vi-VN')}đ
              </p>
              <p className="text-sm text-white/60">{orderDetails.payment}</p>
              <div className="h-px bg-white/20 my-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/70">
                  <span>Sản phẩm ({orderDetails.items.reduce((s, i) => s + i.qty, 0)})</span>
                  <span>{orderDetails.total.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-sm text-white/70">
                  <span>Vận chuyển</span>
                  <span className="text-green-300">Miễn phí</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              className="rounded-3xl p-6 space-y-3"
              style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <button
                onClick={() => navigate('/products')}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.3)',
                }}
              >
                <ShoppingBag size={18} />
                Tiếp tục mua sắm
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-600 transition-all hover:bg-slate-50"
                style={{ border: '1px solid #e2e8f0' }}
              >
                Về trang chủ
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Help */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(102,126,234,0.05)', border: '1px solid rgba(102,126,234,0.15)' }}
            >
              <p className="text-sm font-semibold text-slate-700 mb-2">Cần hỗ trợ?</p>
              <p className="text-xs text-slate-500 mb-3">
                Liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào về đơn hàng.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="text-xs font-bold text-purple-600 hover:underline"
              >
                Liên hệ hỗ trợ →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
