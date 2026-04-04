// Public routes constants
export const PUBLIC_ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  ABOUT: '/about',
  CONTACT: '/contact',
  NOT_FOUND: '*',
} as const;

// Admin routes constants
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  PRODUCTS: '/admin/products',
  ORDERS: '/admin/orders',
  CATEGORIES: '/admin/categories',
  USERS: '/admin/users',
  ANALYTICS: '/admin/analytics',
  SETTINGS: '/admin/settings',
} as const;

export const getProductDetailPath = (id: string | number) => `/products/${id}`;
export const getAdminProductPath = (id: string | number) => `/admin/products/${id}`;
