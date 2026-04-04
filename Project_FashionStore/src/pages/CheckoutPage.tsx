import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Truck,
  Shield,
  ChevronRight,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  ArrowLeft,
  Lock,
  Banknote,
  Wallet,
  Building2,
  Gift,
  Clock,
  Package,
} from 'lucide-react';

const cartItems = [
  {
    id: 1,
    name: 'Áo thun Premium Cotton',
    price: 599000,
    quantity: 2,
    size: 'L',
    color: 'Đen',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    name: 'Quần jeans Skinny Fit',
    price: 899000,
    quantity: 1,
    size: 'M',
    color: 'Xanh đậm',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 3,
    name: 'Áo khoác Bomber',
    price: 1299000,
    quantity: 1,
    size: 'XL',
    color: 'Xám',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
];

const paymentMethods = [
  {
    id: 'cod',
    name: 'Thanh toán khi nhận hàng',
    desc: 'Thanh toán bằng tiền mặt khi nhận hàng',
    icon: Banknote,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 'bank',
    name: 'Chuyển khoản ngân hàng',
    desc: 'Chuyển khoản qua tài khoản ngân hàng',
    icon: Building2,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 'card',
    name: 'Thẻ tín dụng / ghi nợ',
    desc: 'Visa, Mastercard, JCB',
    icon: CreditCard,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'ewallet',
    name: 'Ví điện tử',
    desc: 'MoMo, ZaloPay, VNPay',
    icon: Wallet,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
];

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 30000;
  const discount = 50000;
  const total = subtotal + shipping - discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^(0[3-9])\d{8}$/.test(formData.phone.trim())) newErrors.phone = 'Số điện thoại không hợp lệ';
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = 'Email không hợp lệ';
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';
    if (!formData.city.trim()) newErrors.city = 'Vui lòng chọn tỉnh/thành phố';
    if (!formData.district.trim()) newErrors.district = 'Vui lòng chọn quận/huyện';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Vui lòng nhập số thẻ';
      if (!formData.cardName.trim()) newErrors.cardName = 'Vui lòng nhập tên trên thẻ';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Vui lòng nhập ngày hết hạn';
      if (!formData.cardCvv.trim()) newErrors.cardCvv = 'Vui lòng nhập CVV';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlaceOrder = () => {
    navigate('/order-success');
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 outline-none ${
      errors[field]
        ? 'border-2 border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
        : 'border-2 border-slate-200 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 hover:border-slate-300'
    }`;

  return (
    <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)', minHeight: '100vh' }}>
      <div className="container mx-auto px-6 py-8">

        {/* Back button & title */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
            style={{ background: '#fff', border: '1px solid #e2e8f0' }}
          >
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Thanh toán</h1>
            <p className="text-sm text-slate-400 mt-0.5">Hoàn tất đơn hàng của bạn</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-0">
            {[
              { num: 1, label: 'Thông tin giao hàng', icon: MapPin },
              { num: 2, label: 'Phương thức thanh toán', icon: CreditCard },
              { num: 3, label: 'Xác nhận đơn hàng', icon: CheckCircle2 },
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2 transition-all duration-500"
                    style={{
                      background:
                        step >= s.num
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : '#e2e8f0',
                      boxShadow:
                        step >= s.num
                          ? '0 8px 24px rgba(102,126,234,0.35)'
                          : 'none',
                    }}
                  >
                    {step > s.num ? (
                      <CheckCircle2 size={20} className="text-white" />
                    ) : (
                      <s.icon size={20} className={step >= s.num ? 'text-white' : 'text-slate-400'} />
                    )}
                  </div>
                  <span
                    className="text-xs font-semibold transition-colors"
                    style={{ color: step >= s.num ? '#667eea' : '#94a3b8' }}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div
                    className="flex-1 h-0.5 mx-4 mt-[-18px] rounded-full transition-all duration-500"
                    style={{
                      background:
                        step > idx + 1
                          ? 'linear-gradient(90deg, #667eea, #764ba2)'
                          : '#e2e8f0',
                      maxWidth: '120px',
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">

            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div
                className="rounded-3xl p-8 animate-slide-up"
                style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  >
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Thông tin giao hàng</h2>
                    <p className="text-xs text-slate-400">Nhập thông tin để chúng tôi giao hàng đến bạn</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <User size={14} className="text-purple-500" />
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-fullname"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      className={inputClass('fullName')}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <Phone size={14} className="text-purple-500" />
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0912 345 678"
                      className={inputClass('phone')}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <Mail size={14} className="text-purple-500" />
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className={inputClass('email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <Building2 size={14} className="text-purple-500" />
                      Tỉnh / Thành phố <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="checkout-city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={inputClass('city')}
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      <option value="HCM">TP. Hồ Chí Minh</option>
                      <option value="HN">Hà Nội</option>
                      <option value="DN">Đà Nẵng</option>
                      <option value="HP">Hải Phòng</option>
                      <option value="CT">Cần Thơ</option>
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.city}</p>
                    )}
                  </div>

                  {/* District */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <MapPin size={14} className="text-purple-500" />
                      Quận / Huyện <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="checkout-district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className={inputClass('district')}
                    >
                      <option value="">Chọn quận/huyện</option>
                      <option value="q1">Quận 1</option>
                      <option value="q2">Quận 2</option>
                      <option value="q3">Quận 3</option>
                      <option value="q7">Quận 7</option>
                      <option value="bt">Bình Thạnh</option>
                      <option value="td">Thủ Đức</option>
                    </select>
                    {errors.district && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.district}</p>
                    )}
                  </div>

                  {/* Ward */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <MapPin size={14} className="text-purple-500" />
                      Phường / Xã
                    </label>
                    <input
                      id="checkout-ward"
                      name="ward"
                      value={formData.ward}
                      onChange={handleChange}
                      placeholder="Nhập phường/xã"
                      className={inputClass('ward')}
                    />
                  </div>

                  {/* Address Detail */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <MapPin size={14} className="text-purple-500" />
                      Địa chỉ cụ thể <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Số nhà, tên đường..."
                      className={inputClass('address')}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.address}</p>
                    )}
                  </div>

                  {/* Note */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <FileText size={14} className="text-purple-500" />
                      Ghi chú đơn hàng
                    </label>
                    <textarea
                      id="checkout-note"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      placeholder="Ghi chú thêm về đơn hàng, ví dụ: giao hàng giờ hành chính..."
                      rows={3}
                      className="w-full px-4 py-3.5 rounded-xl text-sm font-medium border-2 border-slate-200 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 hover:border-slate-300 transition-all duration-200 outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleNextStep}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 32px rgba(102,126,234,0.4)',
                    }}
                  >
                    Tiếp tục
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div
                className="rounded-3xl p-8 animate-slide-up"
                style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  >
                    <CreditCard size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Phương thức thanh toán</h2>
                    <p className="text-xs text-slate-400">Chọn cách thức thanh toán phù hợp</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className="relative p-5 rounded-2xl text-left transition-all duration-300 group"
                      style={{
                        background: paymentMethod === method.id ? 'rgba(102,126,234,0.05)' : '#fff',
                        border:
                          paymentMethod === method.id
                            ? '2px solid #667eea'
                            : '2px solid #e2e8f0',
                        boxShadow:
                          paymentMethod === method.id
                            ? '0 4px 20px rgba(102,126,234,0.15)'
                            : 'none',
                      }}
                    >
                      {paymentMethod === method.id && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle2 size={20} className="text-purple-600" />
                        </div>
                      )}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                        style={{ background: method.gradient }}
                      >
                        <method.icon size={20} className="text-white" />
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm">{method.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{method.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Card Details (if card selected) */}
                {paymentMethod === 'card' && (
                  <div
                    className="rounded-2xl p-6 mb-6 animate-slide-up"
                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                  >
                    <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                      <Lock size={14} className="text-purple-500" />
                      Thông tin thẻ
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Số thẻ</label>
                        <input
                          id="checkout-card-number"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className={inputClass('cardNumber')}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-xs mt-1 font-medium">{errors.cardNumber}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Tên trên thẻ</label>
                        <input
                          id="checkout-card-name"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          placeholder="NGUYEN VAN A"
                          className={inputClass('cardName')}
                          style={{ textTransform: 'uppercase' }}
                        />
                        {errors.cardName && (
                          <p className="text-red-500 text-xs mt-1 font-medium">{errors.cardName}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Ngày hết hạn</label>
                        <input
                          id="checkout-card-expiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={inputClass('cardExpiry')}
                        />
                        {errors.cardExpiry && (
                          <p className="text-red-500 text-xs mt-1 font-medium">{errors.cardExpiry}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">CVV</label>
                        <input
                          id="checkout-card-cvv"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength={4}
                          type="password"
                          className={inputClass('cardCvv')}
                        />
                        {errors.cardCvv && (
                          <p className="text-red-500 text-xs mt-1 font-medium">{errors.cardCvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Info */}
                {paymentMethod === 'bank' && (
                  <div
                    className="rounded-2xl p-6 mb-6 animate-slide-up"
                    style={{ background: 'linear-gradient(135deg, rgba(79,172,254,0.05), rgba(0,242,254,0.05))', border: '1px solid rgba(79,172,254,0.2)' }}
                  >
                    <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <Building2 size={14} className="text-blue-500" />
                      Thông tin chuyển khoản
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-slate-600"><span className="font-semibold">Ngân hàng:</span> Vietcombank</p>
                      <p className="text-slate-600"><span className="font-semibold">Số tài khoản:</span> 1234 5678 9012</p>
                      <p className="text-slate-600"><span className="font-semibold">Chủ tài khoản:</span> FASHION STORE JSC</p>
                      <p className="text-slate-600"><span className="font-semibold">Nội dung:</span> DH-{Date.now()}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-600 transition-all hover:bg-slate-100"
                    style={{ border: '1px solid #e2e8f0' }}
                  >
                    <ArrowLeft size={16} />
                    Quay lại
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 32px rgba(102,126,234,0.4)',
                    }}
                  >
                    Tiếp tục
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Order Confirmation */}
            {step === 3 && (
              <div
                className="rounded-3xl p-8 animate-slide-up"
                style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}
                  >
                    <CheckCircle2 size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Xác nhận đơn hàng</h2>
                    <p className="text-xs text-slate-400">Kiểm tra lại thông tin trước khi đặt hàng</p>
                  </div>
                </div>

                {/* Shipping info summary */}
                <div
                  className="rounded-2xl p-5 mb-5"
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <MapPin size={14} className="text-purple-500" />
                      Thông tin giao hàng
                    </h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-purple-600 font-semibold hover:underline"
                    >
                      Chỉnh sửa
                    </button>
                  </div>
                  <div className="space-y-1.5 text-sm text-slate-600">
                    <p><span className="font-semibold">{formData.fullName}</span></p>
                    <p>{formData.phone} · {formData.email}</p>
                    <p>{formData.address}, {formData.ward}, {formData.district}, {formData.city}</p>
                    {formData.note && <p className="text-slate-400 italic">Ghi chú: {formData.note}</p>}
                  </div>
                </div>

                {/* Payment info summary */}
                <div
                  className="rounded-2xl p-5 mb-5"
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <CreditCard size={14} className="text-purple-500" />
                      Phương thức thanh toán
                    </h3>
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs text-purple-600 font-semibold hover:underline"
                    >
                      Chỉnh sửa
                    </button>
                  </div>
                  <p className="text-sm text-slate-600 font-semibold">
                    {paymentMethods.find((m) => m.id === paymentMethod)?.name}
                  </p>
                </div>

                {/* Items summary */}
                <div
                  className="rounded-2xl p-5 mb-6"
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                >
                  <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                    <Package size={14} className="text-purple-500" />
                    Sản phẩm ({cartItems.length})
                  </h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex-shrink-0"
                          style={{ background: item.gradient }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate">{item.name}</p>
                          <p className="text-xs text-slate-400">{item.size} · {item.color} · x{item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-slate-900">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-600 transition-all hover:bg-slate-100"
                    style={{ border: '1px solid #e2e8f0' }}
                  >
                    <ArrowLeft size={16} />
                    Quay lại
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      boxShadow: '0 8px 32px rgba(67,233,123,0.4)',
                    }}
                  >
                    <Lock size={18} />
                    Đặt hàng · {total.toLocaleString('vi-VN')}đ
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary (sticky) */}
          <div className="lg:col-span-1">
            <div
              className="rounded-3xl p-6 sticky top-20"
              style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <h3 className="font-bold text-lg text-slate-900 mb-5">Đơn hàng của bạn</h3>

              <div className="space-y-3 mb-5">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0"
                      style={{ background: item.gradient }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                      <p className="text-xs text-slate-400">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-700">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="h-px my-4"
                style={{ background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)' }}
              />

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tạm tính</span>
                  <span className="font-semibold text-slate-700">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Phí vận chuyển</span>
                  <span className="font-semibold text-green-600">
                    {shipping === 0 ? 'Miễn phí' : `${shipping.toLocaleString('vi-VN')}đ`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Giảm giá</span>
                  <span className="font-semibold text-green-600">-{discount.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <div
                className="h-px my-4"
                style={{ background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)' }}
              />

              <div className="flex justify-between items-center mb-5">
                <span className="font-bold text-lg text-slate-900">Tổng cộng</span>
                <span
                  className="font-extrabold text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {total.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {/* Trust badges */}
              <div className="space-y-3">
                {[
                  { icon: Shield, text: 'Thanh toán bảo mật 100%', color: '#667eea' },
                  { icon: Truck, text: 'Giao hàng toàn quốc', color: '#43e97b' },
                  { icon: Gift, text: 'Đổi trả miễn phí 30 ngày', color: '#f093fb' },
                  { icon: Clock, text: 'Giao hàng nhanh 2-5 ngày', color: '#4facfe' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-slate-500">
                    <item.icon size={14} style={{ color: item.color }} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
