import React from 'react';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        {/* Large 404 with gradient */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[16rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-bounce">
              <Search className="text-slate-400" size={64} />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Không tìm thấy trang</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            Hãy thử tìm kiếm hoặc quay về trang chủ.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all hover:shadow-xl hover:scale-105"
            >
              <Home size={20} />
              Về trang chủ
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary/5 transition-all"
            >
              <Search size={20} />
              Khám phá sản phẩm
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
