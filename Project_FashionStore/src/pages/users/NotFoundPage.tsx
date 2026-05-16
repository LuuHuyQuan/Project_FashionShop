import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft, Sparkles } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-20 animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)', animationDelay: '0.5s' }} />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 Number with animation */}
          <div className="mb-8 relative">
            <h1
              className="text-[180px] md:text-[240px] font-extrabold leading-none select-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 10px 40px rgba(0,0,0,0.2)',
              }}
            >
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <Sparkles size={80} className="text-white/30 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </div>

          {/* Message */}
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Oops! Trang không tồn tại
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Có vẻ như bạn đã đi lạc đường. Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-purple-700 bg-white text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Quay lại
            </button>

            <button
              onClick={() => navigate('/')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              <Home size={20} />
              Về trang chủ
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => navigate('/products')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              <Search size={20} />
              Khám phá sản phẩm
            </button>
          </div>

          {/* Popular links */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h3 className="text-white font-bold text-lg mb-4">Có thể bạn đang tìm kiếm:</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { label: 'Trang chủ', path: '/' },
                { label: 'Sản phẩm', path: '/products' },
                { label: 'Giỏ hàng', path: '/cart' },
                { label: 'Đơn hàng của tôi', path: '/my-orders' },
                { label: 'Hồ sơ', path: '/profile' },
              ].map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="mt-12 flex justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
