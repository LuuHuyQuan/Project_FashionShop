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
  image?: string;
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

  searchProducts: async (params: SearchProductsParams) => {
    const queryParams = new URLSearchParams();
    if (params.q) queryParams.append('q', params.q);
    if (params.categoryId) queryParams.append('categoryId', params.categoryId.toString());
    if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());

    const response = await catalogApi.get<Product[]>(`/catalog/products/search?${queryParams.toString()}`);
    return response.data;
  },

  createProduct: async (data: CreateProductRequest) => {
    const response = await catalogApi.post<Product>('/catalog/products', data);
    return response.data;
  },

  updateProduct: async (id: number, data: UpdateProductRequest) => {
    const response = await catalogApi.put<Product>(`/catalog/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: number) => {
    const response = await catalogApi.delete(`/catalog/products/${id}`);
    return response.data;
  },

  // Product Images
  addProductImage: async (productId: number, data: AddImageRequest) => {
    const response = await catalogApi.post(`/catalog/products/${productId}/images`, data);
    return response.data;
  },

  deleteProductImage: async (productId: number, imageId: number) => {
    const response = await catalogApi.delete(`/catalog/products/${productId}/images/${imageId}`);
    return response.data;
  },

  // Product Variants
  addProductVariant: async (productId: number, data: AddVariantRequest) => {
    const response = await catalogApi.post(`/catalog/products/${productId}/variants`, data);
    return response.data;
  },

  updateProductVariant: async (productId: number, variantId: number, data: UpdateVariantRequest) => {
    const response = await catalogApi.put(`/catalog/products/${productId}/variants/${variantId}`, data);
    return response.data;
  },

  deleteProductVariant: async (productId: number, variantId: number) => {
    const response = await catalogApi.delete(`/catalog/products/${productId}/variants/${variantId}`);
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

  createCategory: async (data: CreateCategoryRequest) => {
    const response = await catalogApi.post<Category>('/categories', data);
    return response.data;
  },

  updateCategory: async (id: number, data: UpdateCategoryRequest) => {
    const response = await catalogApi.put(`/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: number) => {
    const response = await catalogApi.delete(`/categories/${id}`);
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

  // Reviews
  getProductReviews: async (productId: number) => {
    const response = await catalogApi.get<Review[]>(`/reviews/product/${productId}`);
    return response.data;
  },

  getReviewById: async (id: number) => {
    const response = await catalogApi.get<Review>(`/reviews/${id}`);
    return response.data;
  },

  createReview: async (data: CreateReviewRequest) => {
    const response = await catalogApi.post<Review>('/reviews', data);
    return response.data;
  },

  updateReview: async (id: number, data: UpdateReviewRequest) => {
    const response = await catalogApi.put<Review>(`/reviews/${id}`, data);
    return response.data;
  },

  deleteReview: async (id: number) => {
    await catalogApi.delete(`/reviews/${id}`);
  },

  // Wishlist
  getUserWishlist: async (userId: number) => {
    const response = await catalogApi.get<WishlistItem[]>(`/wishlist/user/${userId}`);
    return response.data;
  },

  addToWishlist: async (data: AddToWishlistRequest) => {
    const response = await catalogApi.post<WishlistItem>('/wishlist', data);
    return response.data;
  },

  removeFromWishlist: async (id: number) => {
    await catalogApi.delete(`/wishlist/${id}`);
  },

  checkWishlistItem: async (userId: number, productId: number) => {
    const response = await catalogApi.get<boolean>(`/wishlist/check?userId=${userId}&productId=${productId}`);
    return response.data;
  },

  // Stock Management
  checkStock: async (productId: number, colorId: number, sizeId: number) => {
    const response = await catalogApi.get<StockCheckResponse>(
      `/ProductVariants/check-stock?productId=${productId}&colorId=${colorId}&sizeId=${sizeId}`
    );
    return response.data;
  },

  checkStockByVariantId: async (variantId: number) => {
    const response = await catalogApi.get<StockCheckResponse>(`/ProductVariants/${variantId}/stock`);
    return response.data;
  },
};

// Request types for Create/Update
export interface SearchProductsParams {
  q?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface CreateProductRequest {
  categoryId: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  oldPrice?: number;
  status?: string;
  badge?: string;
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: number;
}

export interface AddImageRequest {
  url: string;
  isThumbnail: boolean;
  sortOrder: number;
}

export interface AddVariantRequest {
  sku: string;
  colorId: number;
  sizeId: number;
  stockQuantity: number;
  priceOverride?: number;
}

export interface UpdateVariantRequest extends AddVariantRequest { }

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  status?: string;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest { }

// Review types
export interface Review {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface CreateReviewRequest {
  userId: number;
  productId: number;
  rating: number;
  comment?: string;
}

export interface UpdateReviewRequest {
  rating: number;
  comment?: string;
}

// Wishlist types
export interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  product: Product;
  createdAt: string;
}

export interface AddToWishlistRequest {
  userId: number;
  productId: number;
}

// Stock check types
export interface StockCheckResponse {
  available: boolean;
  stockQuantity: number;
  variantId?: number;
  message?: string;
}
