import React, { useState } from 'react';
import { Filter, Grid, List, Star, Heart, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';

const ProductsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const products = [
    { id: 1, name: 'Áo thun Premium Cotton', price: 599000, oldPrice: 799000, category: 'Áo thun', badge: 'Sale', badgeColor: 'bg-red-500', rating: 5 },
    { id: 2, name: 'Áo sơ mi Slim Fit', price: 749000, category: 'Áo sơ mi', badge: 'New', badgeColor: 'bg-green-500', rating: 4 },
    { id: 3, name: 'Quần jeans Skinny', price: 899000, category: 'Quần', badge: 'Hot', badgeColor: 'bg-orange-500', rating: 5 },
    { id: 4, name: 'Áo khoác Bomber', price: 1299000, category: 'Áo khoác', badge: 'Trend', badgeColor: 'bg-purple-500', rating: 4 },
    { id: 5, name: 'Áo thun Oversized', price: 549000, category: 'Áo thun', rating: 5 },
    { id: 6, name: 'Quần shorts thể thao', price: 399000, category: 'Quần', badge: 'Sale', badgeColor: 'bg-red-500', rating: 4 },
    { id: 7, name: 'Áo polo Classic', price: 699000, category: 'Áo polo', rating: 5 },
    { id: 8, name: 'Quần kaki Chinos', price: 799000, category: 'Quần', badge: 'New', badgeColor: 'bg-green-500', rating: 4 },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-3">Tất cả sản phẩm</h1>
        <p className="text-muted-foreground text-lg">Khám phá {products.length} sản phẩm thời trang độc đáo</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} />
                <h2 className="font-bold text-lg">Bộ lọc</h2>
              </div>

              <Separator className="my-4" />

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Tìm kiếm</label>
                <Input placeholder="Nhập tên sản phẩm..." />
              </div>

              <Separator className="my-4" />

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Danh mục</h3>
                <div className="space-y-2">
                  {['Tất cả', 'Áo thun', 'Áo sơ mi', 'Quần', 'Áo khoác', 'Phụ kiện'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="rounded border-gray-300" defaultChecked={cat === 'Tất cả'} />
                      <span className="text-sm group-hover:text-primary transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Khoảng giá</h3>
                <div className="space-y-2">
                  {['Dưới 500.000đ', '500.000đ - 1.000.000đ', '1.000.000đ - 2.000.000đ', 'Trên 2.000.000đ'].map((price) => (
                    <label key={price} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm group-hover:text-primary transition-colors">{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Sizes */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Kích cỡ</h3>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      className="px-4 py-2 border rounded-lg hover:border-primary hover:text-primary transition-colors text-sm font-medium"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Colors */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Màu sắc</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Đen', color: 'bg-black' },
                    { name: 'Trắng', color: 'bg-white border' },
                    { name: 'Xám', color: 'bg-gray-500' },
                    { name: 'Xanh', color: 'bg-blue-500' },
                    { name: 'Đỏ', color: 'bg-red-500' },
                  ].map((color) => (
                    <button
                      key={color.name}
                      className={`h-8 w-8 rounded-full ${color.color} hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Sắp xếp:</span>
              <select className="border rounded-lg px-4 py-2 text-sm bg-background">
                <option>Mới nhất</option>
                <option>Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
                <option>Phổ biến nhất</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product, idx) => (
                <Card key={product.id} className="group cursor-pointer border hover-lift overflow-hidden">
                  <div className="relative aspect-[3/4] overflow-hidden product-placeholder" style={{
                    background: `linear-gradient(135deg, ${idx % 4 === 0 ? '#667eea, #764ba2' : idx % 4 === 1 ? '#f093fb, #f5576c' : idx % 4 === 2 ? '#4facfe, #00f2fe' : '#43e97b, #38f9d7'})`
                  }}>
                    {product.badge && (
                      <Badge className={`absolute top-3 left-3 z-10 ${product.badgeColor} text-white border-none shadow-lg`}>
                        {product.badge}
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                      <button className="rounded-full bg-white p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:scale-110">
                        <Heart size={16} className="hover:fill-red-500 hover:text-red-500 transition-colors" />
                      </button>
                      <button className="rounded-full bg-white p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-50 hover:scale-110">
                        <ShoppingCart size={16} className="hover:text-blue-500 transition-colors" />
                      </button>
                    </div>
                    <div className="h-full w-full bg-slate-200 group-hover:scale-110 transition-transform duration-500"></div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({product.rating}.0)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-lg">{product.price.toLocaleString('vi-VN')}đ</p>
                      {product.oldPrice && (
                        <p className="text-sm text-muted-foreground line-through">{product.oldPrice.toLocaleString('vi-VN')}đ</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product, idx) => (
                <Card key={product.id} className="group cursor-pointer hover-lift">
                  <CardContent className="p-0 flex gap-6">
                    <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden product-placeholder" style={{
                      background: `linear-gradient(135deg, ${idx % 4 === 0 ? '#667eea, #764ba2' : idx % 4 === 1 ? '#f093fb, #f5576c' : idx % 4 === 2 ? '#4facfe, #00f2fe' : '#43e97b, #38f9d7'})`
                    }}>
                      {product.badge && (
                        <Badge className={`absolute top-3 left-3 z-10 ${product.badgeColor} text-white border-none shadow-lg`}>
                          {product.badge}
                        </Badge>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="text-white text-6xl font-bold">{product.id}</div>
                      </div>
                    </div>
                    <div className="flex-1 py-6 pr-6">
                      <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                      <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">({product.rating}.0)</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        Sản phẩm chất lượng cao, thiết kế hiện đại, phù hợp với mọi phong cách.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <p className="font-bold text-2xl">{product.price.toLocaleString('vi-VN')}đ</p>
                          {product.oldPrice && (
                            <p className="text-muted-foreground line-through">{product.oldPrice.toLocaleString('vi-VN')}đ</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button className="rounded-full bg-muted p-2 hover:bg-red-50 transition-colors">
                            <Heart size={20} className="hover:fill-red-500 hover:text-red-500 transition-colors" />
                          </button>
                          <button className="rounded-full bg-primary text-white px-6 py-2 hover:bg-primary/90 transition-colors flex items-center gap-2">
                            <ShoppingCart size={20} />
                            Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors">Trước</button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 border rounded-lg transition-colors ${page === 1 ? 'bg-primary text-white' : 'hover:bg-muted'
                  }`}
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors">Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
