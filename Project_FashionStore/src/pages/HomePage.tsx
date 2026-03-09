import React from 'react';
import { ArrowRight, Star, TrendingUp, Package, Truck, Shield } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-20 py-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-8 py-32 text-white md:px-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
          <div className="relative z-10 max-w-3xl">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur">
              Bộ sưu tập mùa xuân 2026
            </Badge>
            <h1 className="mb-6 text-6xl font-extrabold tracking-tight md:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-4 duration-1000 leading-tight">
              Định Hình <span className="gradient-text-pink">Phong Cách</span> Của Bạn
            </h1>
            <p className="mb-8 text-lg text-slate-200 md:text-xl max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Khám phá bộ sưu tập mới nhất với những thiết kế độc quyền, mang lại sự tự tin và thoải mái cho mọi hoạt động hàng ngày.
            </p>
            <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <a href="/products" className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all hover:shadow-2xl hover:scale-105 shadow-lg">
                Mua ngay
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="rounded-full border-2 border-white/30 px-8 py-4 font-semibold backdrop-blur hover:bg-white/10 transition-all hover:border-white/50 hover:scale-105">
                Xem bộ sưu tập
              </button>
            </div>
          </div>
          {/* Decorative gradient orbs */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-20 right-40 h-80 w-80 rounded-full bg-pink-500 opacity-20 blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="group cursor-pointer border-none bg-gradient-to-br from-blue-50 to-cyan-50 hover-lift">
            <CardContent className="flex items-start gap-4 p-6">
              <div className="rounded-full bg-blue-500 p-3 group-hover:scale-110 transition-transform">
                <Truck className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Miễn phí vận chuyển</h3>
                <p className="text-sm text-muted-foreground">Đơn hàng trên 500.000đ</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group cursor-pointer border-none bg-gradient-to-br from-purple-50 to-pink-50 hover-lift">
            <CardContent className="flex items-start gap-4 p-6">
              <div className="rounded-full bg-purple-500 p-3 group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Bảo hành chính hãng</h3>
                <p className="text-sm text-muted-foreground">Đổi trả trong 30 ngày</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group cursor-pointer border-none bg-gradient-to-br from-orange-50 to-red-50 hover-lift">
            <CardContent className="flex items-start gap-4 p-6">
              <div className="rounded-full bg-orange-500 p-3 group-hover:scale-110 transition-transform">
                <Package className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Đóng gói cẩn thận</h3>
                <p className="text-sm text-muted-foreground">Sản phẩm được bảo vệ tốt nhất</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold mb-3">Danh mục sản phẩm</h2>
          <p className="text-muted-foreground text-lg">Khám phá phong cách phù hợp với bạn</p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            { name: 'Áo thun', color: 'from-blue-500 to-cyan-500', items: 120 },
            { name: 'Áo sơ mi', color: 'from-purple-500 to-pink-500', items: 85 },
            { name: 'Quần jeans', color: 'from-orange-500 to-red-500', items: 95 },
            { name: 'Phụ kiện', color: 'from-green-500 to-emerald-500', items: 150 }
          ].map((category, i) => (
            <Card key={i} className="group cursor-pointer border-none overflow-hidden hover-lift">
              <div className={`h-40 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="text-white opacity-30 group-hover:opacity-50 transition-all group-hover:scale-125 duration-500 animate-float" size={64} />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.items} sản phẩm</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">Sản phẩm nổi bật</h2>
            <p className="text-muted-foreground text-lg">Những mẫu thiết kế được yêu thích nhất tuần này</p>
          </div>
          <a href="/products" className="text-sm font-semibold hover:underline decoration-primary underline-offset-4 flex items-center gap-1 group">
            Xem tất cả
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Áo thun Premium V1', price: '599.000', badge: 'Hot', badgeColor: 'bg-red-500' },
            { name: 'Áo thun Premium V2', price: '649.000', badge: 'New', badgeColor: 'bg-green-500' },
            { name: 'Áo thun Premium V3', price: '579.000', badge: 'Sale', badgeColor: 'bg-orange-500' },
            { name: 'Áo thun Premium V4', price: '699.000', badge: 'Trend', badgeColor: 'bg-purple-500' }
          ].map((product, i) => (
            <Card key={i} className="group cursor-pointer border hover-lift overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden product-placeholder" style={{
                background: `linear-gradient(135deg, ${i === 0 ? '#667eea, #764ba2' : i === 1 ? '#f093fb, #f5576c' : i === 2 ? '#4facfe, #00f2fe' : '#43e97b, #38f9d7'})`
              }}>
                <Badge className={`absolute top-3 left-3 z-10 ${product.badgeColor} text-white border-none shadow-lg`}>
                  {product.badge}
                </Badge>
                <div className="absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110">
                  <Star className="fill-yellow-400 text-yellow-400" size={16} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="text-white text-9xl font-bold">{i + 1}</div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">Category Fashion</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg">{product.price}đ</p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="fill-yellow-400 text-yellow-400" size={14} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4">
        <Card className="border-none bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white overflow-hidden">
          <CardContent className="relative p-12 md:p-16">
            <div className="relative z-10 max-w-2xl">
              <Badge className="mb-4 bg-white/20 text-white border-none backdrop-blur">
                Ưu đãi đặc biệt
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Giảm giá 30% cho khách hàng mới
              </h2>
              <p className="text-lg text-purple-100 mb-6">
                Đăng ký ngay hôm nay để nhận mã giảm giá đặc biệt cho đơn hàng đầu tiên của bạn.
              </p>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all hover:shadow-xl hover:scale-105">
                Nhận mã ngay
              </button>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 backdrop-blur-sm"></div>
            <div className="absolute -right-10 -bottom-10 h-60 w-60 rounded-full bg-white opacity-10 blur-3xl"></div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
