// Fake API data cho sản phẩm

// Types
export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  badge?: string;
  rating: number;
  reviews: number;
  sold: number;
  image: string;
  description: string;
  features: string[];
  sizes: string[];
  colors: { name: string; value: string }[];
  images: string[];
}

export interface Category {
  name: string;
  items: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Áo thun Premium Cotton',
    price: 599000,
    oldPrice: 799000,
    category: 'Áo thun',
    badge: 'Sale',
    rating: 5,
    reviews: 284,
    sold: 1240,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    description: 'Áo thun Premium Cotton được làm từ 100% cotton cao cấp, mang lại cảm giác mềm mại và thoáng mát. Thiết kế hiện đại, phù hợp với mọi phong cách từ casual đến streetwear.',
    features: [
      'Chất liệu 100% cotton cao cấp',
      'Form dáng regular fit thoải mái',
      'Đường may tỉ mỉ, chắc chắn',
      'Không xù lông sau nhiều lần giặt',
      'Thấm hút mồ hôi tốt',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Đen', value: '#1a1a1a' },
      { name: 'Trắng', value: '#f5f5f5' },
      { name: 'Xám', value: '#6b7280' },
      { name: 'Xanh navy', value: '#1e3a8a' },
    ],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
    ],
  },
  {
    id: 2,
    name: 'Áo sơ mi Slim Fit',
    price: 749000,
    category: 'Áo sơ mi',
    badge: 'New',
    rating: 4,
    reviews: 165,
    sold: 860,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    description: 'Áo sơ mi Slim Fit với thiết kế ôm vừa vặn, tôn dáng. Chất liệu vải cao cấp, thoáng mát và dễ dàng phối đồ.',
    features: [
      'Thiết kế Slim Fit hiện đại',
      'Chất liệu vải cao cấp',
      'Dễ dàng phối đồ',
      'Phù hợp đi làm và dạo phố',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Trắng', value: '#f5f5f5' },
      { name: 'Xanh', value: '#3b82f6' },
      { name: 'Hồng', value: '#f093fb' },
    ],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500',
    ],
  },
  {
    id: 3,
    name: 'Quần jeans Skinny',
    price: 899000,
    category: 'Quần',
    badge: 'Hot',
    rating: 5,
    reviews: 213,
    sold: 2100,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    description: 'Quần jeans Skinny với form dáng ôm sát, tôn dáng. Chất liệu denim cao cấp, bền đẹp theo thời gian.',
    features: [
      'Form dáng Skinny ôm sát',
      'Chất liệu denim cao cấp',
      'Bền màu, không phai',
      'Co giãn thoải mái',
    ],
    sizes: ['28', '29', '30', '31', '32'],
    colors: [
      { name: 'Xanh đậm', value: '#1e3a8a' },
      { name: 'Đen', value: '#1a1a1a' },
      { name: 'Xanh nhạt', value: '#60a5fa' },
    ],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500',
    ],
  },
  {
    id: 4,
    name: 'Áo khoác Bomber',
    price: 1299000,
    category: 'Áo khoác',
    badge: 'Trend',
    rating: 4,
    reviews: 98,
    sold: 645,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    description: 'Áo khoác Bomber phong cách streetwear, thiết kế trẻ trung, năng động. Chất liệu dù cao cấp, chống gió tốt.',
    features: [
      'Thiết kế Bomber thời trang',
      'Chất liệu dù cao cấp',
      'Chống gió, chống nước nhẹ',
      'Phong cách streetwear',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Đen', value: '#1a1a1a' },
      { name: 'Xanh rêu', value: '#065f46' },
      { name: 'Cam', value: '#f97316' },
    ],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
      'https://images.unsplash.com/photo-1548126032-079b-6c6a-f6f6?w=500',
    ],
  },
  {
    id: 5,
    name: 'Váy đầm Maxi',
    price: 950000,
    oldPrice: 1200000,
    category: 'Váy đầm',
    badge: 'Sale',
    rating: 5,
    reviews: 156,
    sold: 980,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    description: 'Váy đầm Maxi dài thanh lịch, phong cách nữ tính. Chất liệu vải mềm mại, thoải mái cả ngày dài.',
    features: [
      'Thiết kế Maxi dài thanh lịch',
      'Chất liệu vải mềm mại',
      'Phong cách nữ tính, sang trọng',
      'Phù hợp dự tiệc, đi chơi',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Đỏ', value: '#ef4444' },
      { name: 'Đen', value: '#1a1a1a' },
      { name: 'Xanh', value: '#3b82f6' },
    ],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500',
    ],
  },
  {
    id: 6,
    name: 'Áo thun Oversized',
    price: 549000,
    category: 'Áo thun',
    rating: 5,
    reviews: 189,
    sold: 1560,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    description: 'Áo thun Oversized form rộng thoải mái, phong cách unisex. Chất liệu cotton mềm mại, thoáng mát.',
    features: [
      'Form Oversized rộng rãi',
      'Phong cách unisex',
      'Chất liệu cotton mềm mại',
      'Dễ phối đồ',
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Trắng', value: '#f5f5f5' },
      { name: 'Đen', value: '#1a1a1a' },
      { name: 'Be', value: '#d4a574' },
    ],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
    ],
  },
  {
    id: 7,
    name: 'Quần shorts thể thao',
    price: 399000,
    oldPrice: 499000,
    category: 'Quần',
    badge: 'Sale',
    rating: 4,
    reviews: 142,
    sold: 890,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500',
    description: 'Quần shorts thể thao năng động, thoải mái. Chất liệu thấm hút mồ hôi tốt, phù hợp tập luyện.',
    features: [
      'Thiết kế thể thao năng động',
      'Thấm hút mồ hôi tốt',
      'Co giãn 4 chiều',
      'Phù hợp tập gym, chạy bộ',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Đen', value: '#1a1a1a' },
      { name: 'Xám', value: '#6b7280' },
      { name: 'Xanh', value: '#3b82f6' },
    ],
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500',
      'https://images.unsplash.com/photo-1591195853940-c1d6d3b0c7d5?w=500',
    ],
  },
  {
    id: 8,
    name: 'Áo polo Classic',
    price: 699000,
    category: 'Áo polo',
    rating: 5,
    reviews: 76,
    sold: 350,
    image: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=500',
    description: 'Áo polo Classic thanh lịch, phong cách lịch sự. Chất liệu pique cotton cao cấp.',
    features: [
      'Thiết kế Classic thanh lịch',
      'Chất liệu pique cotton',
      'Thoáng mát, thấm hút tốt',
      'Phù hợp đi làm, dạo phố',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Trắng', value: '#f5f5f5' },
      { name: 'Đen', value: '#1a1a1a' },
      { name: 'Xanh navy', value: '#1e3a8a' },
      { name: 'Đỏ', value: '#ef4444' },
    ],
    images: [
      'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=500',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500',
    ],
  },
  {
    id: 9,
    name: 'Quần kaki Chinos',
    price: 799000,
    category: 'Quần',
    badge: 'New',
    rating: 4,
    reviews: 55,
    sold: 280,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
    description: 'Quần kaki Chinos lịch sự, dễ phối đồ. Chất liệu kaki cao cấp, form dáng Slim Fit.',
    features: [
      'Thiết kế Chinos lịch sự',
      'Chất liệu kaki cao cấp',
      'Form Slim Fit tôn dáng',
      'Dễ phối với nhiều trang phục',
    ],
    sizes: ['29', '30', '31', '32', '33'],
    colors: [
      { name: 'Be', value: '#d4a574' },
      { name: 'Xanh navy', value: '#1e3a8a' },
      { name: 'Xám', value: '#6b7280' },
    ],
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
    ],
  },
  {
    id: 10,
    name: 'Áo len Cardigan',
    price: 850000,
    category: 'Áo len',
    badge: 'Mới',
    rating: 5,
    reviews: 92,
    sold: 420,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500',
    description: 'Áo len Cardigan ấm áp, phong cách vintage. Chất liệu len mềm mại, giữ ấm tốt.',
    features: [
      'Thiết kế Cardigan vintage',
      'Chất liệu len mềm mại',
      'Giữ ấm tốt',
      'Phù hợp mùa đông',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Be', value: '#d4a574' },
      { name: 'Nâu', value: '#92400e' },
      { name: 'Xám', value: '#6b7280' },
    ],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
    ],
  },
  {
    id: 11,
    name: 'Áo hoodie Basic',
    price: 899000,
    category: 'Áo hoodie',
    rating: 5,
    reviews: 234,
    sold: 1400,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    description: 'Áo hoodie Basic thoải mái, phong cách streetwear. Chất liệu nỉ bông dày dặn, ấm áp.',
    features: [
      'Thiết kế hoodie basic',
      'Chất liệu nỉ bông dày dặn',
      'Có túi kangaroo tiện lợi',
      'Phong cách streetwear',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Đen', value: '#1a1a1a' },
      { name: 'Xám', value: '#6b7280' },
      { name: 'Trắng', value: '#f5f5f5' },
      { name: 'Xanh navy', value: '#1e3a8a' },
    ],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500',
      'https://images.unsplash.com/photo-1620799139834-6b8f844fbe29?w=500',
    ],
  },
  {
    id: 12,
    name: 'Blazer công sở',
    price: 1450000,
    category: 'Áo khoác',
    badge: 'Trend',
    rating: 4,
    reviews: 67,
    sold: 310,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500',
    description: 'Blazer công sở thanh lịch, chuyên nghiệp. Chất liệu vải cao cấp, form dáng chuẩn.',
    features: [
      'Thiết kế công sở thanh lịch',
      'Chất liệu vải cao cấp',
      'Form dáng chuẩn, tôn dáng',
      'Phù hợp môi trường công sở',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Đen', value: '#1a1a1a' },
      { name: 'Xám', value: '#6b7280' },
      { name: 'Xanh navy', value: '#1e3a8a' },
    ],
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500',
    ],
  },
];

// Categories
export const categories: Category[] = [
  { name: 'Áo thun', items: 120, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500' },
  { name: 'Áo sơ mi', items: 85, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500' },
  { name: 'Quần jeans', items: 95, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500' },
  { name: 'Áo khoác', items: 68, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500' },
  { name: 'Váy đầm', items: 92, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500' },
  { name: 'Quần short', items: 76, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500' },
  { name: 'Áo polo', items: 54, image: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=500' },
  { name: 'Phụ kiện', items: 150, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500' },
  { name: 'Giày dép', items: 110, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500' },
  { name: 'Túi xách', items: 88, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500' },
  { name: 'Đồ thể thao', items: 102, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500' },
  { name: 'Đồ ngủ', items: 45, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500' },
];

// Helper functions
export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === parseInt(id.toString()));
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'Tất cả') return products;
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (limit: number = 5): Product[] => {
  return products.slice(0, limit);
};

export const getBestSellers = (limit: number = 6): Product[] => {
  return [...products].sort((a, b) => b.sold - a.sold).slice(0, limit);
};

export const getNewArrivals = (limit: number = 4): Product[] => {
  return products.filter(p => p.badge === 'New' || p.badge === 'Mới').slice(0, limit);
};
