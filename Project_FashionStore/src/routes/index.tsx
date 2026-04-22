import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './public.routes';
import { adminRoutes } from './admin.routes';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import type { RouteConfig } from './types';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

const renderRoutes = (
  routes: RouteConfig[],
  Layout: React.FC<{ children: React.ReactNode }>,
  guard?: 'protected' | 'admin'
) => {
  return routes.map((route) => {
    let element = (
      <Layout>
        <route.component />
      </Layout>
    );

    const needsAuth = route.meta?.requiresAuth;
    const adminOnly = route.meta?.roles?.includes('admin') || guard === 'admin';

    if (adminOnly) {
      element = <AdminRoute>{element}</AdminRoute>;
    } else if (needsAuth) {
      element = <ProtectedRoute>{element}</ProtectedRoute>;
    }

    return <Route key={route.path} path={route.path} element={element} />;
  });
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {renderRoutes(publicRoutes, MainLayout, 'protected')}
      {renderRoutes(adminRoutes, AdminLayout, 'admin')}
    </Routes>
  );
};

export default AppRoutes;
