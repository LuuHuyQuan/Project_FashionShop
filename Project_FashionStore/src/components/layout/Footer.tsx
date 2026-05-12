import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(240,147,251,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section - Enhanced */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 8px 24px rgba(102,126,234,0.3)' }}>
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-2xl font-extrabold">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Fashion</span>
                <span className="text-slate-800">Store</span>
              </h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Nâng tầm phong cách của bạn với những lựa chọn thời trang tinh tế và hiện đại nhất. Chất lượng cao, giá cả hợp lý.
            </p>
            <div className="flex gap-2.5 mt-2">
              {[
                { Icon: Facebook, color: '#1877f2', name: 'Facebook' },
                { Icon: Instagram, color: '#e4405f', name: 'Instagram' },
                { Icon: Twitter, color: '#1da1f2', name: 'Twitter' },
                { Icon: Youtube, color: '#ff0000', name: 'Youtube' }
              ].map(({ Icon, color, name }, i) => (
                <a
                  key={i}
                  href="#"
                  title={name}
                  className="w-11 h-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg group"
                  style={{ '--hover-color': color } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = color;
                    e.currentTarget.style.borderColor = color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <Icon size={19} className="text-slate-600 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider">Khám phá</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { label: 'Trang chủ', href: '/' },
                { label: 'Sản phẩm', href: '/products' },
                { label: 'Về chúng tôi', href: '/about' },
                { label: 'Liên hệ', href: '/contact' }
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider">Hỗ trợ</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {['Giao hàng', 'Hoàn trả', 'FAQ', 'Chính sách bảo mật', 'Điều khoản sử dụng'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider">Liên hệ</h4>
            <div className="space-y-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span>1900 xxxx</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span>contact@fashionstore.vn</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <h5 className="text-sm font-semibold mb-3">Đăng ký nhận tin</h5>
              <p className="text-xs text-muted-foreground mb-3">
                Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email của bạn"
                  className="h-10 text-sm"
                />
                <button className="h-10 px-5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:opacity-90 transition-all hover:shadow-lg whitespace-nowrap">
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 FashionStore. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-xs">Thanh toán:</span>
            <div className="flex gap-3">
              {['VISA', 'Mastercard', 'Momo', 'ZaloPay'].map((payment) => (
                <div
                  key={payment}
                  className="px-3 py-1.5 border rounded bg-white text-xs font-semibold text-slate-600 hover:shadow-md transition-shadow"
                >
                  {payment}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
