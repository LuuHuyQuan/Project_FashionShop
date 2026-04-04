import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './public.routes';
import { adminRoutes } from './admin.routes';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import { RouteConfig } from './types';

const renderRoutes = (routes: RouteConfig[], Layout: React.FC<{ children: React.ReactNode }>) => {
  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        <Layout>
          <route.component />
        </Layout>
      }
    />
  ));
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {renderRoutes(publicRoutes, MainLayout)}
      {renderRoutes(adminRoutes, AdminLayout)}
    </Routes>
  );
};

export default AppRoutes;
