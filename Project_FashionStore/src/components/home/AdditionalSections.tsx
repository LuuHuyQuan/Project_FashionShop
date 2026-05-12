import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Flame, Sparkles, Shield } from 'lucide-react';

export const NewArrivalsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20" style={{ background: '#ffffff' }}>
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
              style={{ background: 'rgba(67,233,123,0.1)', border: '1px solid rgba(67,233,123,0.2)' }}>
              <Sparkles size={12} className="text-green-500" />
              <span className="text-xs text-green-600 font-medium">Mới về</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1">Hàng mới về</h2>
            <p className="text-slate-400">Cập nhật xu hướng thời trang mới nhất</p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold transition-all group text-green-600 hover:text-green-700"
          >
            Xem tất cả
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { name: 'Áo sơ mi linen', price: 450000, image: 'https://via.placeholder.com/300x400/e0f2fe/0284c7?text=Shirt', tag: 'NEW' },
            { name: 'Quần short kaki', price: 380000, image: 'https://via.placeholder.com/300x400/fef3c7/f59e0b?text=Short', tag: 'NEW' },
            { name: 'Váy midi hoa', price: 520000, image: 'https://via.placeholder.com/300x400/fce7f3/ec4899?text=Dress', tag: 'NEW' },
            { name: 'Áo polo basic', price: 290000, image: 'https://via.placeholder.com/300x400/ddd6fe/8b5cf6?text=Polo', tag: 'NEW' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate('/products')}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-slate-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
                  {item.tag}
                </div>
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-green-600 transition-colors">{item.name}</h3>
              <p className="font-extrabold text-slate-900">{item.price.toLocaleString('vi-VN')}đ</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ShopByStyleSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(161,140,209,0.1)', border: '1px solid rgba(161,140,209,0.2)' }}>
            <span className="text-sm">✨</span>
            <span className="text-sm text-purple-600 font-medium">Phong cách</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Mua sắm theo phong cách</h2>
          <p className="text-slate-400 text-lg">Tìm phong cách phù hợp với cá tính của bạn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Casual & Streetwear',
              desc: 'Thoải mái, năng động cho mọi hoạt động',
              image: 'https://via.placeholder.com/600x400/f1f5f9/475569?text=Casual+Style',
              items: '1,200+ sản phẩm',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Formal & Business',
              desc: 'Lịch sự, chuyên nghiệp cho công sở',
              image: 'https://via.placeholder.com/600x400/f1f5f9/475569?text=Formal+Style',
              items: '800+ sản phẩm',
              color: 'from-slate-600 to-slate-800'
            },
            {
              title: 'Sport & Active',
              desc: 'Năng động, thoáng mát cho thể thao',
              image: 'https://via.placeholder.com/600x400/f1f5f9/475569?text=Sport+Style',
              items: '950+ sản phẩm',
              color: 'from-orange-500 to-red-500'
            },
            {
              title: 'Vintage & Retro',
              desc: 'Cổ điển, hoài niệm phong cách xưa',
              image: 'https://via.placeholder.com/600x400/f1f5f9/475569?text=Vintage+Style',
              items: '650+ sản phẩm',
              color: 'from-amber-500 to-orange-600'
            },
          ].map((style, idx) => (
            <div
              key={idx}
              onClick={() => navigate('/products')}
              className="group relative overflow-hidden rounded-3xl cursor-pointer h-64"
            >
              <img src={style.image} alt={style.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-60 group-hover:opacity-70 transition-opacity`} />

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-3xl font-extrabold text-white mb-2">{style.title}</h3>
                <p className="text-white/90 text-sm mb-3">{style.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-xs font-semibold">{style.items}</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all">
                    <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const BrandStorySection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20" style={{ background: '#ffffff' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.2)' }}>
              <span className="text-sm">💎</span>
              <span className="text-sm text-purple-600 font-medium">Về chúng tôi</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Câu chuyện của <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">FashionStore</span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Được thành lập từ năm 2020, FashionStore đã trở thành điểm đến tin cậy cho hàng triệu khách hàng yêu thích thời trang.
              Chúng tôi cam kết mang đến những sản phẩm chất lượng cao với giá cả hợp lý.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { value: '50K+', label: 'Khách hàng' },
                { value: '10K+', label: 'Sản phẩm' },
                { value: '4.9/5', label: 'Đánh giá' },
                { value: '98%', label: 'Hài lòng' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-4 rounded-2xl" style={{ background: '#f8fafc' }}>
                  <p className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-slate-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/about')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', boxShadow: '0 8px 24px rgba(102,126,234,0.4)' }}
            >
              Tìm hiểu thêm
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                <img
                  src="https://via.placeholder.com/600x600/f1f5f9/475569?text=Fashion+Store"
                  alt="About us"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-3xl"
                style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)', opacity: 0.2, filter: 'blur(40px)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const QualityGuaranteeSection: React.FC = () => {
  return (
    <section className="py-20" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(67,233,123,0.1)', border: '1px solid rgba(67,233,123,0.2)' }}>
            <Shield size={13} className="text-green-500" />
            <span className="text-sm text-green-600 font-medium">Cam kết</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Cam kết chất lượng</h2>
          <p className="text-slate-400 text-lg">Sự hài lòng của bạn là ưu tiên hàng đầu</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '✓', title: 'Chính hãng 100%', desc: 'Cam kết sản phẩm chính hãng, nguồn gốc rõ ràng', color: 'from-green-400 to-emerald-500' },
            { icon: '↻', title: 'Đổi trả dễ dàng', desc: 'Đổi trả miễn phí trong 30 ngày nếu không hài lòng', color: 'from-blue-400 to-cyan-500' },
            { icon: '⚡', title: 'Giao hàng nhanh', desc: 'Giao hàng trong 2-4 giờ tại nội thành', color: 'from-orange-400 to-red-500' },
            { icon: '💬', title: 'Hỗ trợ 24/7', desc: 'Đội ngũ tư vấn nhiệt tình, sẵn sàng hỗ trợ', color: 'from-purple-400 to-pink-500' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl p-6 text-center cursor-pointer transition-all hover:scale-105"
              style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
            >
              <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl bg-gradient-to-br ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
