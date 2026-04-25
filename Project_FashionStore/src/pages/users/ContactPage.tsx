import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div style={{ background: '#f8fafc' }}>

      {/* Hero */}
      <section className="relative overflow-hidden py-24" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Liên hệ với chúng tôi</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại thông tin, chúng tôi sẽ phản hồi sớm nhất!
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Thông tin liên hệ</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: 'Địa chỉ',
                    content: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
                    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  },
                  {
                    icon: Phone,
                    title: 'Điện thoại',
                    content: '0123 456 789',
                    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  },
                  {
                    icon: Mail,
                    title: 'Email',
                    content: 'contact@fashionstore.vn',
                    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  },
                  {
                    icon: Clock,
                    title: 'Giờ làm việc',
                    content: 'T2 - T7: 8:00 - 22:00, CN: 9:00 - 21:00',
                    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-5 p-6 rounded-2xl transition-all hover:scale-105 cursor-pointer"
                    style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: item.gradient }}
                    >
                      <item.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h3>
                      <p className="text-slate-500">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 rounded-2xl overflow-hidden" style={{ height: '300px', background: 'linear-gradient(135deg, #e0e7ff 0%, #fce7f3 100%)' }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="text-purple-400 mx-auto mb-3" />
                    <p className="text-slate-500">Bản đồ vị trí cửa hàng</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div
                className="rounded-3xl p-8"
                style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Gửi tin nhắn</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nhập họ và tên của bạn"
                      className="w-full px-4 py-3 rounded-xl text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-purple-400 transition-all"
                      style={{ background: '#f8fafc', border: '2px solid #e2e8f0' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 rounded-xl text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-purple-400 transition-all"
                      style={{ background: '#f8fafc', border: '2px solid #e2e8f0' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0123 456 789"
                      className="w-full px-4 py-3 rounded-xl text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-purple-400 transition-all"
                      style={{ background: '#f8fafc', border: '2px solid #e2e8f0' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nội dung</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Nhập nội dung tin nhắn..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-purple-400 transition-all resize-none"
                      style={{ background: '#f8fafc', border: '2px solid #e2e8f0' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 32px rgba(102,126,234,0.4)',
                    }}
                  >
                    <Send size={20} />
                    Gửi tin nhắn
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
