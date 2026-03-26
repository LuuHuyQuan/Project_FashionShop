import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// Lazy load public pages
const HomePage = lazy(() => import('../pages/HomePage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Lazy load admin pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('../pages/admin/AdminProducts'));
const AdminOrders = lazy(() => import('../pages/admin/AdminOrders'));
const AdminCategories = lazy(() => import('../pages/admin/AdminCategories'));
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers'));
const AdminAnalytics = lazy(() => import('../pages/admin/AdminAnalytics'));
const AdminSettings = lazy(() => import('../pages/admin/AdminSettings'));

const LoadingFallback = () => (
  <div className="flex h-[60vh] w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const AdminLoadingFallback = () => (
  <div className="flex h-full w-full items-center justify-center" style={{ minHeight: '60vh' }}>
    <div
      className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
      style={{ borderColor: 'rgba(102,126,234,0.3)', borderTopColor: '#667eea' }}
    />
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainLayout><Suspense fallback={<LoadingFallback />}><HomePage /></Suspense></MainLayout>} />
      <Route path="/products" element={<MainLayout><Suspense fallback={<LoadingFallback />}><ProductsPage /></Suspense></MainLayout>} />
      <Route path="/cart" element={<MainLayout><Suspense fallback={<LoadingFallback />}><CartPage /></Suspense></MainLayout>} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminDashboard /></Suspense></AdminLayout>} />
      <Route path="/admin/products" element={<AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminProducts /></Suspense></AdminLayout>} />
      <Route path="/admin/orders" element={<AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminOrders /></Suspense></AdminLayout>} />
      <Route path="/admin/categories" element={<AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminCategories /></Suspense></AdminLayout>} />
      <Route path="/admin/users" element={<AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminUsers /></Suspense></AdminLayout>} />
      <Route path="/admin/analytics" element={<AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminAnalytics /></Suspense></AdminLayout>} />
      <Route path="/admin/settings" element={<AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminSettings /></Suspense></AdminLayout>} />

      {/* 404 */}
      <Route path="*" element={<MainLayout><Suspense fallback={<LoadingFallback />}><NotFoundPage /></Suspense></MainLayout>} />
    </Routes>
  );
};

export default AppRoutes;
