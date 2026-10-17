import { Product, ProductsResponse } from '../types/product';

const BASE_URL = 'https://dummyjson.com';
const TIMEOUT_MS = 12000;

export interface FetchProductsOptions {
  limit?: number;
  skip?: number;
  category?: string;
  searchQuery?: string;
  simulateError?: boolean;
}

export interface CategoryItem {
  slug: string;
  name: string;
}

/**
 * Fetch products with support for pagination, category filter, search, and error simulation.
 */
export async function fetchProducts({
  limit = 20,
  skip = 0,
  category,
  searchQuery,
  simulateError = false,
}: FetchProductsOptions = {}): Promise<ProductsResponse> {
  if (simulateError) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    throw new Error('Simulated network error. Please tap "Try Again" to retry.');
  }

  let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;

  if (searchQuery && searchQuery.trim().length > 0) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(searchQuery.trim())}&limit=${limit}&skip=${skip}`;
  } else if (category && category.toLowerCase() !== 'all') {
    url = `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch products (${response.statusText || 'Unknown Error'})`);
    }

    const data: ProductsResponse = await response.json();
    return data;
  } catch (err: any) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please check your internet connection.');
    }
    throw new Error(err.message || 'Unable to connect to server. Please try again.');
  }
}

/**
 * Fetch list of categories
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/category-list`);
    if (!response.ok) {
      return ['beauty', 'fragrances', 'furniture', 'groceries', 'laptops', 'smartphones'];
    }
    const categories: string[] = await response.json();
    return categories;
  } catch {
    // Fallback categories if offline
    return ['beauty', 'fragrances', 'furniture', 'groceries', 'laptops', 'smartphones'];
  }
}

/**
 * Fetch product details by ID
 */
export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product #${id}`);
  }
  return response.json();
}
