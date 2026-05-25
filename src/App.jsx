import './styles/layout.css'
import './styles/controls.css'
import './styles/products.css'
import './styles/compare.css'
import './styles/status.css'
import './styles/responsive.css'
import { CatalogControls } from './components/CatalogControls.jsx'
import { CompareSection } from './components/CompareSection.jsx'
import { FavoritesSection } from './components/FavoritesSection.jsx'
import { ProductGrid } from './components/ProductGrid.jsx'
import { StatusMessage } from './components/StatusMessage.jsx'
import { useCatalogState } from './hooks/useCatalogState.js'
import { useProducts } from './hooks/useProducts.js'

function App() {
  const { products, isLoading, error } = useProducts()
  const catalog = useCatalogState(products)

  return (
    <main className="app-shell">
      <section className="catalog-header" aria-labelledby="catalog-title">
        <div>
          <h1 id="catalog-title">Product Catalog</h1>
        </div>

        <dl className="catalog-summary" aria-label="Catalog summary">
          <div>
            <dt>Products</dt>
            <dd>{products.length}</dd>
          </div>
          <div>
            <dt>Showing</dt>
            <dd>{catalog.visibleProducts.length}</dd>
          </div>
          <div>
            <dt>Categories</dt>
            <dd>{catalog.categories.length}</dd>
          </div>
          <div>
            <dt>Favorites</dt>
            <dd>{catalog.favoriteProducts.length}</dd>
          </div>
          <div>
            <dt>Compare</dt>
            <dd>{catalog.compareProducts.length}</dd>
          </div>
        </dl>
      </section>

      {isLoading && (
        <StatusMessage
          title="Loading products"
          text="Fetching the latest catalog data. This should only take a moment."
        />
      )}

      {error && !isLoading && (
        <StatusMessage
          tone="error"
          title="Could not load products"
          text={error}
        />
      )}

      {!isLoading && !error && products.length === 0 && (
        <StatusMessage
          title="No products found"
          text="The product API returned an empty catalog."
        />
      )}

      {!isLoading && !error && products.length > 0 && (
        <>
          <CatalogControls
            categories={catalog.categories}
            controls={catalog.controls}
            dispatch={catalog.dispatchControls}
          />

          {catalog.visibleProducts.length === 0 ? (
            <StatusMessage
              title="No matching products"
              text="Try changing the search text, category, filters, or sorting."
            />
          ) : (
            <ProductGrid
              products={catalog.visibleProducts}
              title="Matching products"
              favoriteIds={catalog.favoriteIds}
              compareIds={catalog.compareIds}
              onToggleFavorite={catalog.toggleFavorite}
              onToggleCompare={catalog.toggleCompare}
            />
          )}

          <FavoritesSection
            favoriteProducts={catalog.favoriteProducts}
            favoriteIds={catalog.favoriteIds}
            compareIds={catalog.compareIds}
            onToggleFavorite={catalog.toggleFavorite}
            onToggleCompare={catalog.toggleCompare}
          />

          <CompareSection
            compareProducts={catalog.compareProducts}
            compareMessage={catalog.compareMessage}
            isCompareMessageVisible={catalog.isCompareMessageVisible}
            onClearCompare={catalog.clearCompare}
            onToggleCompare={catalog.toggleCompare}
          />
        </>
      )}
    </main>
  )
}

export default App
