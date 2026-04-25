import React from 'react';
import { Users, Target, Award, Heart, TrendingUp, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div style={{ background: '#f8fafc' }}>
      <section className="relative overflow-hidden py-24" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Về chúng tôi</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Chúng tôi là thương hiệu thời trang hàng đầu, mang đến những sản phẩm chất lượng cao với thiết kế hiện đại và phong cách độc đáo.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Câu chuyện của chúng tôi</h2>
              <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }} />
            </div>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                Fashion Store được thành lập vào năm 2020 với sứ mệnh mang đến những sản phẩm thời trang chất lượng cao, phù hợp với phong cách sống hiện đại của giới trẻ Việt Nam.
              </p>
              <p>
                Chúng tôi tin rằng thời trang không chỉ là trang phục, mà còn là cách thể hiện cá tính và phong cách sống của mỗi người. Vì vậy, mỗi sản phẩm của chúng tôi đều được thiết kế tỉ mỉ, chọn lọc chất liệu cao cấp và sản xuất theo quy trình nghiêm ngặt.
              </p>
              <p>
                Với hơn 50.000 khách hàng tin tưởng và 10.000+ sản phẩm đa dạng, chúng tôi tự hào là điểm đến yêu thích của những người yêu thời trang trên toàn quốc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: '#fff' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Giá trị cốt lõi</h2>
            <p className="text-slate-500 text-lg">Những giá trị định hướng mọi hoạt động của chúng tôi</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Chất lượng',
                desc: 'Cam kết mang đến sản phẩm chất lượng cao nhất với giá cả hợp lý',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              },
              {
                icon: Users,
                title: 'Khách hàng',
                desc: 'Đặt sự hài lòng của khách hàng lên hàng đầu trong mọi quyết định',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              },
              {
                icon: TrendingUp,
                title: 'Đổi mới',
                desc: 'Không ngừng cập nhật xu hướng và cải tiến sản phẩm',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="group rounded-3xl p-8 transition-all hover:scale-105 cursor-pointer"
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: value.gradient }}
                >
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '50.000+', label: 'Khách hàng' },
              { icon: Award, value: '10.000+', label: 'Sản phẩm' },
              { icon: Globe, value: '63', label: 'Tỉnh thành' },
              { icon: Target, value: '98%', label: 'Hài lòng' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-8 rounded-3xl"
                style={{ background: '#fff', border: '1px solid #e2e8f0' }}
              >
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <p className="text-4xl font-extrabold text-slate-900 mb-2">{stat.value}</p>
                <p className="text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
