// Application configuration constants

// API Base URLs from environment variables
export const API_BASE_URLS = {
  GATEWAY: import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:5000',
  AUTH: import.meta.env.VITE_API_AUTH_URL || 'http://localhost:5001',
  CATALOG: import.meta.env.VITE_API_CATALOG_URL || 'http://localhost:5002',
  ORDERING: import.meta.env.VITE_API_ORDERING_URL || 'https://localhost:7298',
} as const;

export const PAGINATION = {
  ITEMS_PER_PAGE: 5,
  MAX_ITEMS_PER_PAGE: 100,
  DEFAULT_PAGE: 1,
} as const;

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 100,
  MIN_PRODUCT_NAME_LENGTH: 3,
  MAX_PRODUCT_NAME_LENGTH: 200,
  MIN_PRICE: 0,
  MAX_PRICE: 999999999,
  MAX_IMAGE_SIZE_MB: 5,
  MAX_IMAGES_PER_PRODUCT: 5,
} as const;

export const IMAGE = {
  MAX_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
  MAX_WIDTH: 1200,
  MAX_HEIGHT: 1200,
  QUALITY: 0.85,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
} as const;

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  CONTACT: '/contact',
  ABOUT: '/about',

  // Admin routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_USERS: '/admin/users',
} as const;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',

  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: '/products/:id',
  PRODUCT_IMAGES: '/products/:id/images',
  PRODUCT_VARIANTS: '/products/:id/variants',

  // Categories
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: '/categories/:id',

  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: '/orders/:id',

  // Cart
  CART: '/cart',
  CART_ITEMS: '/cart/items',

  // Dashboard
  DASHBOARD: '/dashboard',
  DASHBOARD_STATS: '/dashboard/stats',
  DASHBOARD_RECENT_ORDERS: '/dashboard/recent-orders',
  DASHBOARD_TOP_PRODUCTS: '/dashboard/top-products',
  DASHBOARD_ACTIVITIES: '/dashboard/activities',
} as const;

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  CART: 'cart',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPING: 'shipping',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export const PAYMENT_METHOD = {
  COD: 'COD',
  BANK_TRANSFER: 'bank_transfer',
  CREDIT_CARD: 'credit_card',
  MOMO: 'momo',
  ZALOPAY: 'zalopay',
} as const;

export const USER_ROLE = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  VIP: 'vip',
} as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BANNED: 'banned',
} as const;

export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  OUT_OF_STOCK: 'out_of_stock',
} as const;

export const VOUCHER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
} as const;

// Type exports
export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
export type PaymentMethod = typeof PAYMENT_METHOD[keyof typeof PAYMENT_METHOD];
export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];
export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];
export type ProductStatus = typeof PRODUCT_STATUS[keyof typeof PRODUCT_STATUS];
export type VoucherStatus = typeof VOUCHER_STATUS[keyof typeof VOUCHER_STATUS];
