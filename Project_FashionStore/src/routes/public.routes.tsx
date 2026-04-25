import { lazy, Suspense } from 'react';
import type { RouteConfig } from './types';
import LoadingFallback from '../components/common/LoadingFallback';

// Lazy load components
const HomePage = lazy(() => import('../pages/users/HomePage'));
const ProductsPage = lazy(() => import('../pages/users/ProductsPage'));
const ProductDetailPage = lazy(() => import('../pages/users/ProductDetailPage'));
const CartPage = lazy(() => import('../pages/users/CartPage'));
const CheckoutPage = lazy(() => import('../pages/users/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('../pages/users/OrderSuccessPage'));
const WishlistPage = lazy(() => import('../pages/users/WishlistPage'));
const LoginPage = lazy(() => import('../pages/users/LoginPage'));
const RegisterPage = lazy(() => import('../pages/users/RegisterPage'));
const UserProfilePage = lazy(() => import('../pages/users/UserProfilePage'));
const AboutPage = lazy(() => import('../pages/users/AboutPage'));
const ContactPage = lazy(() => import('../pages/users/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/users/NotFoundPage'));
const TestLoginPage = lazy(() => import('../pages/users/TestLoginPage'));
const TestAuthPage = lazy(() => import('../pages/users/TestAuthPage'));

const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => {
  return () => (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
};

export const publicRoutes: RouteConfig[] = [
  {
    path: '/',
    component: withSuspense(HomePage),
    exact: true,
    meta: {
      title: 'Trang chủ - Fashion Store',
      description: 'Khám phá bộ sưu tập thời trang mới nhất',
    },
  },
  {
    path: '/products',
    component: withSuspense(ProductsPage),
    meta: {
      title: 'Sản phẩm - Fashion Store',
      description: 'Danh sách sản phẩm thời trang',
    },
  },
  {
    path: '/products/:id',
    component: withSuspense(ProductDetailPage),
    meta: {
      title: 'Chi tiết sản phẩm - Fashion Store',
      description: 'Thông tin chi tiết sản phẩm',
    },
  },
  {
    path: '/cart',
    component: withSuspense(CartPage),
    meta: {
      title: 'Giỏ hàng - Fashion Store',
      description: 'Giỏ hàng của bạn',
    },
  },
  {
    path: '/checkout',
    component: withSuspense(CheckoutPage),
    meta: {
      title: 'Thanh toán - Fashion Store',
      description: 'Thanh toán đơn hàng',
      requiresAuth: true,
    },
  },
  {
    path: '/order-success',
    component: withSuspense(OrderSuccessPage),
    meta: {
      title: 'Đặt hàng thành công - Fashion Store',
    },
  },
  {
    path: '/wishlist',
    component: withSuspense(WishlistPage),
    meta: {
      title: 'Yêu thích - Fashion Store',
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    component: withSuspense(UserProfilePage),
    meta: {
      title: 'Tài khoản của tôi - Fashion Store',
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: withSuspense(LoginPage),
    meta: {
      title: 'Đăng nhập - Fashion Store',
    },
  },
  {
    path: '/register',
    component: withSuspense(RegisterPage),
    meta: {
      title: 'Đăng ký - Fashion Store',
    },
  },
  {
    path: '/test-login',
    component: withSuspense(TestLoginPage),
    meta: {
      title: 'Test Login API - Fashion Store',
    },
  },
  {
    path: '/test-auth',
    component: withSuspense(TestAuthPage),
    meta: {
      title: 'Test Auth API - Fashion Store',
    },
  },
  {
    path: '/about',
    component: withSuspense(AboutPage),
    meta: {
      title: 'Về chúng tôi - Fashion Store',
      description: 'Thông tin về Fashion Store',
    },
  },
  {
    path: '/contact',
    component: withSuspense(ContactPage),
    meta: {
      title: 'Liên hệ - Fashion Store',
      description: 'Liên hệ với chúng tôi',
    },
  },
  {
    path: '*',
    component: withSuspense(NotFoundPage),
    meta: {
      title: '404 - Không tìm thấy trang',
    },
  },
];
