import { lazy, Suspense } from 'react';
import type { RouteConfig } from './types';
import AdminLoadingFallback from '../components/common/AdminLoadingFallback';

// Lazy load admin components
const AdminDashboard = lazy(() => import('../pages/admin/Command/AdminDashboard'));
const AdminProducts = lazy(() => import('../pages/admin/Product/AdminProducts'));
const ProductImagesVariants = lazy(() => import('../pages/admin/Product/ProductImagesVariants'));
const AdminOrders = lazy(() => import('../pages/admin/Order/AdminOrders'));
const AdminCategories = lazy(() => import('../pages/admin/Category/AdminCategories'));
const AdminUsers = lazy(() => import('../pages/admin/User/AdminUsers'));
const AdminAnalytics = lazy(() => import('../pages/admin/Command/AdminAnalytics'));
const AdminSettings = lazy(() => import('../pages/admin/Command/AdminSettings'));

// Wrapper component with Suspense
const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => {
  return () => (
    <Suspense fallback={<AdminLoadingFallback />}>
      <Component />
    </Suspense>
  );
};

export const adminRoutes: RouteConfig[] = [
  {
    path: '/admin',
    component: withSuspense(AdminDashboard),
    exact: true,
    meta: {
      title: 'Dashboard - Admin',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
  {
    path: '/admin/products',
    component: withSuspense(AdminProducts),
    meta: {
      title: 'Quản lý sản phẩm - Admin',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
  {
    path: '/admin/products/:id/manage',
    component: withSuspense(ProductImagesVariants),
    meta: {
      title: 'Quản lý ảnh & biến thể - Admin',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
  {
    path: '/admin/orders',
    component: withSuspense(AdminOrders),
    meta: {
      title: 'Quản lý đơn hàng - Admin',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
  {
    path: '/admin/categories',
    component: withSuspense(AdminCategories),
    meta: {
      title: 'Quản lý danh mục - Admin',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
  {
    path: '/admin/users',
    component: withSuspense(AdminUsers),
    meta: {
      title: 'Quản lý người dùng - Admin',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
  {
    path: '/admin/analytics',
    component: withSuspense(AdminAnalytics),
    meta: {
      title: 'Phân tích - Admin',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
  {
    path: '/admin/settings',
    component: withSuspense(AdminSettings),
    meta: {
      title: 'Cài đặt - Admin',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
];
