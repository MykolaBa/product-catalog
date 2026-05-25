import {
  formatDiscount,
  formatPrice,
  getStockLabel,
  hasDiscount,
} from '../utils/productFormatters.js'

export const COMPARE_LIMIT = 3;

export const STORAGE_KEYS = {
  favorites: 'product-catalog:favorites',
  compare: 'product-catalog:compare',
}

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Rating: high to low' },
  { value: 'title-asc', label: 'Title: A-Z' },
]

export const COMPARE_LIMIT_MESSAGE =
  `You can compare up to ${COMPARE_LIMIT} products. Remove one before adding another.`

export const COMPARISON_ROWS = [
  {
    label: 'Title',
    getValue: (product) => product.title,
  },
  {
    label: 'Price',
    getValue: (product) => formatPrice(product.price),
  },
  {
    label: 'Rating',
    getValue: (product) => product.rating.toFixed(2),
  },
  {
    label: 'Stock',
    getValue: (product) => getStockLabel(product.stock),
  },
  {
    label: 'Category',
    getValue: (product) => product.category,
  },
  {
    label: 'Discount',
    getValue: (product) =>
      hasDiscount(product) ? formatDiscount(product.discountPercentage) : 'No discount',
  },
]
