import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// Lazy load components for better performance
const HomePage = lazy(() => import('../pages/HomePage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const LoadingFallback = () => (
  <div className="flex h-[60vh] w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Suspense fallback={<LoadingFallback />}><HomePage /></Suspense></MainLayout>} />
      <Route path="/products" element={<MainLayout><Suspense fallback={<LoadingFallback />}><ProductsPage /></Suspense></MainLayout>} />
      <Route path="/cart" element={<MainLayout><Suspense fallback={<LoadingFallback />}><CartPage /></Suspense></MainLayout>} />
      <Route path="*" element={<MainLayout><Suspense fallback={<LoadingFallback />}><NotFoundPage /></Suspense></MainLayout>} />
    </Routes>
  );
};

export default AppRoutes;
