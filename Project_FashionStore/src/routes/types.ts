import { LazyExoticComponent, ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  component: LazyExoticComponent<ComponentType<any>> | ComponentType<any>;
  exact?: boolean;
  meta?: {
    title?: string;
    description?: string;
    requiresAuth?: boolean;
    roles?: string[];
  };
}

export interface RouteGroup {
  name: string;
  routes: RouteConfig[];
}
