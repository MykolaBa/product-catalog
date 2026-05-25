import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/productsApi.js'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setIsLoading(true)
      setError('')

      try {
        const nextProducts = await fetchProducts({ signal: controller.signal })
        setProducts(nextProducts)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unexpected API error.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      controller.abort()
    }
  }, [])

  return { products, isLoading, error }
}
