import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  User,
  Phone,
  CheckCircle2,
} from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const getPasswordStrength = () => {
    const pw = formData.password;
    if (!pw) return { level: 0, label: '', color: '' };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { level: 1, label: 'Yếu', color: '#ef4444' };
    if (score === 2) return { level: 2, label: 'Trung bình', color: '#f59e0b' };
    if (score === 3) return { level: 3, label: 'Mạnh', color: '#43e97b' };
    return { level: 4, label: 'Rất mạnh', color: '#667eea' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = 'Email không hợp lệ';
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    if (!formData.password.trim()) newErrors.password = 'Vui lòng nhập mật khẩu';
    else if (formData.password.length < 8) newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp';
    if (!agreed) newErrors.agreed = 'Vui lòng đồng ý với điều khoản';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setIsLoading(true);
        await register({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
        });
        navigate('/');
      } catch (error) {
        setErrors({ general: error instanceof Error ? error.message : 'Đăng ký thất bại' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const passwordStrength = getPasswordStrength();

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 outline-none ${errors[field]
      ? 'border-2 border-red-400 bg-red-50/50'
      : 'border-2 border-slate-200 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 hover:border-slate-300'
    }`;

  return (
    <div
      className="min-h-screen flex"
      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #faf5ff 100%)' }}
    >
      {/* Left: Decorative Panel */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #667eea 100%)',
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 p-16 max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ShoppingBag size={24} className="text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">Fashion Store</span>
          </div>

          <h2 className="text-4xl font-extrabold text-white mb-5 leading-tight">
            Tham gia cùng<br />chúng tôi! ✨
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10">
            Đăng ký để nhận ưu đãi độc quyền, cập nhật xu hướng mới nhất và trải nghiệm mua sắm tuyệt vời.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {[
              { text: 'Giảm 30% cho đơn hàng đầu tiên', emoji: '🎉' },
              { text: 'Theo dõi đơn hàng dễ dàng', emoji: '📦' },
              { text: 'Tích điểm thưởng mỗi lần mua', emoji: '⭐' },
              { text: 'Nhận thông báo ưu đãi sớm nhất', emoji: '🔔' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-white/90 font-medium text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Register Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
            >
              <ShoppingBag size={20} className="text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900">Fashion Store</span>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ background: 'rgba(240,147,251,0.1)' }}>
              <Sparkles size={12} className="text-pink-500" />
              <span className="text-xs text-pink-600 font-semibold">Tạo tài khoản mới</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Đăng ký</h1>
            <p className="text-sm text-slate-400">Tạo tài khoản để bắt đầu mua sắm</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {errors.general}
              </div>
            )}
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <User size={14} className="text-pink-500" />
                Họ và tên
              </label>
              <input
                id="register-fullname"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                className={inputClass('fullName')}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Mail size={14} className="text-pink-500" />
                Địa chỉ email
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className={inputClass('email')}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Phone size={14} className="text-pink-500" />
                Số điện thoại
              </label>
              <input
                id="register-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0912 345 678"
                className={inputClass('phone')}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Lock size={14} className="text-pink-500" />
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Tối thiểu 8 ký tự"
                  className={`${inputClass('password')} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password}</p>}

              {/* Password strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1.5 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          background: passwordStrength.level >= level ? passwordStrength.color : '#e2e8f0',
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Lock size={14} className="text-pink-500" />
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  className={`${inputClass('confirmPassword')} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.confirmPassword}</p>}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-green-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                  <CheckCircle2 size={12} /> Mật khẩu khớp
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    if (errors.agreed) setErrors({ ...errors, agreed: '' });
                  }}
                  className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 mt-0.5"
                />
                <span className="text-sm text-slate-600">
                  Tôi đồng ý với{' '}
                  <button type="button" className="text-purple-600 font-semibold hover:underline">Điều khoản dịch vụ</button>
                  {' '}và{' '}
                  <button type="button" className="text-purple-600 font-semibold hover:underline">Chính sách bảo mật</button>
                </span>
              </label>
              {errors.agreed && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.agreed}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                boxShadow: '0 8px 32px rgba(240,147,251,0.4)',
              }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Tạo tài khoản
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">hoặc đăng ký với</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-slate-700 transition-all hover:bg-slate-50"
              style={{ border: '2px solid #e2e8f0' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#1877F2' }}
            >
              <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-slate-500">
            Đã có tài khoản?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-bold text-purple-600 hover:text-purple-700 hover:underline"
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
