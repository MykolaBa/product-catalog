import { hasDiscount } from './productFormatters.js'

export const initialCatalogControls = {
  searchTerm: '',
  category: 'all',
  inStockOnly: false,
  discountedOnly: false,
  sortBy: 'featured',
}

export function catalogControlsReducer(state, action) {
  switch (action.type) {
    case 'setSearchTerm':
      return { ...state, searchTerm: action.value }
    case 'setCategory':
      return { ...state, category: action.value }
    case 'setInStockOnly':
      return { ...state, inStockOnly: action.value }
    case 'setDiscountedOnly':
      return { ...state, discountedOnly: action.value }
    case 'setSortBy':
      return { ...state, sortBy: action.value }
    case 'reset':
      return initialCatalogControls
    default:
      return state
  }
}

export function getVisibleProducts(products, controls) {
  const normalizedSearch = controls.searchTerm.trim().toLowerCase()

  const filteredProducts = products.filter((product) => {
    const searchableText = [
      product.title,
      product.brand,
      product.category,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    const matchesSearch =
      normalizedSearch.length === 0 || searchableText.includes(normalizedSearch)
    const matchesCategory =
      controls.category === 'all' || product.category === controls.category
    const matchesStock = !controls.inStockOnly || product.stock > 0
    const matchesDiscount = !controls.discountedOnly || hasDiscount(product)

    return matchesSearch && matchesCategory && matchesStock && matchesDiscount
  })

  return [...filteredProducts].sort((firstProduct, secondProduct) => {
    switch (controls.sortBy) {
      case 'price-asc':
        return firstProduct.price - secondProduct.price
      case 'price-desc':
        return secondProduct.price - firstProduct.price
      case 'rating-desc':
        return secondProduct.rating - firstProduct.rating
      case 'title-asc':
        return firstProduct.title.localeCompare(secondProduct.title)
      default:
        return 0
    }
  })
}

export function hasActiveControls(controls) {
  return (
    controls.searchTerm !== initialCatalogControls.searchTerm ||
    controls.category !== initialCatalogControls.category ||
    controls.inStockOnly !== initialCatalogControls.inStockOnly ||
    controls.discountedOnly !== initialCatalogControls.discountedOnly ||
    controls.sortBy !== initialCatalogControls.sortBy
  )
}
