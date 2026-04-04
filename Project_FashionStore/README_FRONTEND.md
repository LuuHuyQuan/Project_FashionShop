# Fashion Store - Frontend Documentation

## 📋 Tổng quan

Fashion Store là một ứng dụng thương mại điện tử thời trang hiện đại được xây dựng với React, TypeScript, và Tailwind CSS. Dự án bao gồm giao diện người dùng và trang quản trị admin hoàn chỉnh.

## 🎨 Công nghệ sử dụng

- **React 19.2.0** - Thư viện UI
- **TypeScript** - Type safety
- **React Router DOM 7.12.0** - Routing
- **Tailwind CSS 4.1.18** - Styling
- **Vite 7.2.4** - Build tool
- **Lucide React** - Icons
- **Radix UI** - UI Components

## 📁 Cấu trúc dự án

```
Project_FashionStore/
├── src/
│   ├── assets/          # Fonts, images, CSS
│   ├── components/      # React components
│   │   ├── common/      # Loading fallbacks
│   │   ├── layout/      # Header, Footer
│   │   └── ui/          # Button, Card, Input, etc.
│   ├── layouts/         # MainLayout, AdminLayout
│   ├── pages/           # Page components
│   │   ├── admin/       # Admin pages
│   │   └── ...          # Public pages
│   ├── routes/          # Routing configuration
│   ├── lib/             # Utilities
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
└── package.json         # Dependencies
```

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm hoặc yarn

### Cài đặt dependencies

```bash
cd Project_FashionStore
npm install
```

### Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Build production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 📄 Các trang chính

### Public Pages

1. **HomePage** (`/`) - Trang chủ với hero section, categories, featured products
2. **ProductsPage** (`/products`) - Danh sách sản phẩm với filter và search
3. **ProductDetailPage** (`/products/:id`) - Chi tiết sản phẩm
4. **CartPage** (`/cart`) - Giỏ hàng
5. **CheckoutPage** (`/checkout`) - Thanh toán (3 bước)
6. **OrderSuccessPage** (`/order-success`) - Xác nhận đơn hàng thành công
7. **WishlistPage** (`/wishlist`) - Danh sách yêu thích
8. **LoginPage** (`/login`) - Đăng nhập
9. **RegisterPage** (`/register`) - Đăng ký
10. **UserProfilePage** (`/profile`) - Trang cá nhân
11. **AboutPage** (`/about`) - Giới thiệu
12. **ContactPage** (`/contact`) - Liên hệ
13. **NotFoundPage** (`*`) - 404 page

### Admin Pages

1. **AdminDashboard** (`/admin`) - Tổng quan thống kê
2. **AdminProducts** (`/admin/products`) - Quản lý sản phẩm
3. **AdminOrders** (`/admin/orders`) - Quản lý đơn hàng
4. **AdminCategories** (`/admin/categories`) - Quản lý danh mục
5. **AdminUsers** (`/admin/users`) - Quản lý người dùng
6. **AdminAnalytics** (`/admin/analytics`) - Phân tích & báo cáo
7. **AdminSettings** (`/admin/settings`) - Cài đặt hệ thống

## 🎨 Design System

### Colors

Dự án sử dụng gradient colors chủ đạo:
- Primary: `#667eea` → `#764ba2`
- Secondary: `#f093fb` → `#f5576c`
- Success: `#43e97b` → `#38f9d7`
- Info: `#4facfe` → `#00f2fe`

### Typography

- Font family: Gilroy (custom font)
- Weights: Light (300), Medium (500), Bold (700)

### Components

Tất cả UI components được xây dựng với:
- Rounded corners (border-radius: 0.625rem)
- Smooth transitions
- Hover effects
- Responsive design

## 🔧 Tính năng chính

### User Features
- ✅ Xem và tìm kiếm sản phẩm
- ✅ Filter theo danh mục, giá, size, màu
- ✅ Thêm vào giỏ hàng
- ✅ Wishlist (yêu thích)
- ✅ Checkout 3 bước
- ✅ Đăng ký / Đăng nhập
- ✅ Quản lý profile

### Admin Features
- ✅ Dashboard với thống kê realtime
- ✅ CRUD sản phẩm
- ✅ Quản lý đơn hàng (cập nhật trạng thái)
- ✅ Quản lý danh mục
- ✅ Quản lý người dùng (ban/unban)
- ✅ Analytics & Reports
- ✅ Cài đặt hệ thống

## 🎯 Responsive Design

Tất cả pages đều responsive với breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔐 Authentication

Hiện tại authentication được mock. Để tích hợp backend:
1. Tạo API service trong `src/services/`
2. Implement authentication logic
3. Sử dụng Context API hoặc Redux để quản lý auth state
4. Protect routes với authentication guards

## 📦 Tích hợp Backend

Để kết nối với backend:

1. Tạo file `src/config/api.ts`:
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

2. Tạo API services trong `src/services/`:
```typescript
// src/services/products.ts
export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return response.json();
};
```

3. Sử dụng React Query hoặc SWR cho data fetching

## 🚧 Các bước tiếp theo

1. **Tích hợp Backend API**
   - Kết nối với .NET backend
   - Implement authentication
   - Real-time data fetching

2. **State Management**
   - Thêm Redux hoặc Zustand
   - Quản lý cart state globally
   - Persist data với localStorage

3. **Testing**
   - Unit tests với Vitest
   - E2E tests với Playwright
   - Component tests với Testing Library

4. **Performance**
   - Code splitting
   - Image optimization
   - Lazy loading

5. **SEO**
   - Meta tags
   - Sitemap
   - Structured data

## 📝 Scripts

```json
{
  "dev": "vite",                    // Development server
  "build": "tsc -b && vite build",  // Production build
  "lint": "eslint .",               // Lint code
  "preview": "vite preview"         // Preview production build
}
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Contact

- Email: contact@fashionstore.vn
- Website: https://fashionstore.vn

---

**Note**: Đây là phiên bản frontend hoàn chỉnh với mock data. Để sử dụng trong production, cần tích hợp với backend API.
