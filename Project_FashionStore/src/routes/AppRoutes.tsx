import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Lazy load public pages
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

// Lazy load admin pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('../pages/admin/AdminProducts'));
const AdminOrders = lazy(() => import('../pages/admin/Order/AdminOrders'));
const AdminCategories = lazy(() => import('../pages/admin/Category/AdminCategories'));
const AdminUsers = lazy(() => import('../pages/admin/User/AdminUsers'));
const AdminAnalytics = lazy(() => import('../pages/admin/Command/AdminAnalytics'));
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
      <Route path="/products/:id" element={<MainLayout><Suspense fallback={<LoadingFallback />}><ProductDetailPage /></Suspense></MainLayout>} />
      <Route path="/cart" element={<MainLayout><Suspense fallback={<LoadingFallback />}><CartPage /></Suspense></MainLayout>} />
      <Route path="/checkout" element={<ProtectedRoute><MainLayout><Suspense fallback={<LoadingFallback />}><CheckoutPage /></Suspense></MainLayout></ProtectedRoute>} />
      <Route path="/order-success" element={<MainLayout><Suspense fallback={<LoadingFallback />}><OrderSuccessPage /></Suspense></MainLayout>} />
      <Route path="/wishlist" element={<ProtectedRoute><MainLayout><Suspense fallback={<LoadingFallback />}><WishlistPage /></Suspense></MainLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><MainLayout><Suspense fallback={<LoadingFallback />}><UserProfilePage /></Suspense></MainLayout></ProtectedRoute>} />
      <Route path="/about" element={<MainLayout><Suspense fallback={<LoadingFallback />}><AboutPage /></Suspense></MainLayout>} />
      <Route path="/contact" element={<MainLayout><Suspense fallback={<LoadingFallback />}><ContactPage /></Suspense></MainLayout>} />

      {/* Auth routes (no layout - full page) */}
      <Route path="/login" element={<Suspense fallback={<LoadingFallback />}><LoginPage /></Suspense>} />
      <Route path="/register" element={<Suspense fallback={<LoadingFallback />}><RegisterPage /></Suspense>} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminRoute><AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminDashboard /></Suspense></AdminLayout></AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute><AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminProducts /></Suspense></AdminLayout></AdminRoute>} />
      <Route path="/admin/orders" element={<AdminRoute><AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminOrders /></Suspense></AdminLayout></AdminRoute>} />
      <Route path="/admin/categories" element={<AdminRoute><AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminCategories /></Suspense></AdminLayout></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminUsers /></Suspense></AdminLayout></AdminRoute>} />
      <Route path="/admin/analytics" element={<AdminRoute><AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminAnalytics /></Suspense></AdminLayout></AdminRoute>} />
      <Route path="/admin/settings" element={<AdminRoute><AdminLayout><Suspense fallback={<AdminLoadingFallback />}><AdminSettings /></Suspense></AdminLayout></AdminRoute>} />

      {/* 404 */}
      <Route path="*" element={<MainLayout><Suspense fallback={<LoadingFallback />}><NotFoundPage /></Suspense></MainLayout>} />
    </Routes>
  );
};

export default AppRoutes;
