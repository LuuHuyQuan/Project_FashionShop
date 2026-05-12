import type { Product as BackendProduct } from '../services/catalogService';

// Map backend product to display format
export interface DisplayProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string; // First image URL
  images: string[]; // All image URLs
  category: string; // Category name
  categoryId: number;
  badge?: string;
  rating: number;
  reviews: number;
  sold: number;
  status: string;
}

export function mapProduct(product: BackendProduct): DisplayProduct {
  // Handle empty images array
  const thumbnailImage = product.images?.find(img => img.isThumbnail);
  const firstImage = thumbnailImage || product.images?.[0];

  // Default placeholder image
  const placeholderImage = 'https://via.placeholder.com/400x500/e2e8f0/64748b?text=No+Image';

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    oldPrice: product.oldPrice,
    image: firstImage?.url || placeholderImage,
    images: product.images?.length > 0 ? product.images.map(img => img.url) : [placeholderImage],
    category: product.categoryName,
    categoryId: product.categoryId,
    badge: product.badge,
    rating: product.ratingAverage,
    reviews: product.reviewCount,
    sold: product.soldCount,
    status: product.status,
  };
}

export function mapProducts(products: BackendProduct[]): DisplayProduct[] {
  return products.map(mapProduct);
}
