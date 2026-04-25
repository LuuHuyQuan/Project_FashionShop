import { catalogApi } from '../lib/axios';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  status: string;
  badge?: string;
  ratingAverage: number;
  reviewCount: number;
  soldCount: number;
  categoryId: number;
  categoryName: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

export interface ProductImage {
  id: number;
  url: string;
  isThumbnail: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id: number;
  sku: string;
  colorId: number;
  colorName: string;
  colorHexCode: string;
  sizeId: number;
  sizeName: string;
  stockQuantity: number;
  priceOverride?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  status: string;
}

export interface Color {
  id: number;
  name: string;
  hexCode: string;
}

export interface Size {
  id: number;
  name: string;
}

export const catalogService = {
  // Products
  getProducts: async () => {
    const response = await catalogApi.get<Product[]>('/catalog/products');
    return response.data;
  },

  getProductById: async (id: number) => {
    const response = await catalogApi.get<Product>(`/catalog/products/${id}`);
    return response.data;
  },

  getProductBySlug: async (slug: string) => {
    const response = await catalogApi.get<Product>(`/catalog/products/slug/${slug}`);
    return response.data;
  },

  // Categories
  getCategories: async () => {
    const response = await catalogApi.get<Category[]>('/categories');
    return response.data;
  },

  getCategoryById: async (id: number) => {
    const response = await catalogApi.get<Category>(`/categories/${id}`);
    return response.data;
  },

  // Colors
  getColors: async () => {
    const response = await catalogApi.get<Color[]>('/catalog/colors');
    return response.data;
  },

  // Sizes
  getSizes: async () => {
    const response = await catalogApi.get<Size[]>('/catalog/sizes');
    return response.data;
  },
};
