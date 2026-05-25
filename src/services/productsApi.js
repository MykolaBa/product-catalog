const PRODUCTS_URL = 'https://dummyjson.com/products?limit=200'

export async function fetchProducts({ signal } = {}) {
  const response = await fetch(PRODUCTS_URL, { signal })

  if (!response.ok) {
    throw new Error(`Products request failed with status ${response.status}.`)
  }

  const data = await response.json()

  if (!Array.isArray(data.products)) {
    throw new Error('Products response did not include a product list.')
  }

  return data.products
}
