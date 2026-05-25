export function getCategories(products) {
  return Array.from(new Set(products.map((product) => product.category))).sort()
}

export function getProductsByIds(products, ids) {
  const productsById = new Map(products.map((product) => [product.id, product]))

  return ids.map((id) => productsById.get(id)).filter(Boolean)
}

export function keepExistingProductIds(ids, products) {
  const productIds = new Set(products.map((product) => product.id))
  const nextIds = ids.filter((id) => productIds.has(id))

  return nextIds.length === ids.length ? ids : nextIds
}
