export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDiscount(discountPercentage) {
  return `${discountPercentage.toFixed(1)}%`
}

export function hasDiscount(product) {
  return Number(product.discountPercentage) > 0
}

export function getStockLabel(stock) {
  return stock > 0 ? 'In stock' : 'Out of stock'
}
