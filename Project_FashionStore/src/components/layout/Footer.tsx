import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold tracking-tighter">
              FASHION<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">STORE</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nâng tầm phong cách của bạn với những lựa chọn thời trang tinh tế và hiện đại nhất.
            </p>
            <div className="flex gap-3 mt-2">
              {[
                { Icon: Facebook, color: 'hover:bg-blue-500' },
                { Icon: Instagram, color: 'hover:bg-pink-500' },
                { Icon: Twitter, color: 'hover:bg-sky-500' },
                { Icon: Youtube, color: 'hover:bg-red-500' }
              ].map(({ Icon, color }, i) => (
                <a
                  key={i}
                  href="#"
                  className={`p-2.5 rounded-full border bg-white ${color} hover:text-white transition-all hover:scale-110 hover:shadow-lg group`}
                >
                  <Icon size={18} />
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
