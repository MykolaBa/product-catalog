import { ProductGrid } from './ProductGrid.jsx'
import { SectionHeader } from './SectionHeader.jsx'
import { StatusMessage } from './StatusMessage.jsx'

export function FavoritesSection({
  favoriteProducts,
  favoriteIds,
  compareIds,
  onToggleFavorite,
  onToggleCompare,
}) {
  return (
    <section className="saved-section" aria-labelledby="favorites-heading">
      <SectionHeader
        headingId="favorites-heading"
        title="Favorites"
        meta={`${favoriteProducts.length} saved`}
      />

      {favoriteProducts.length === 0 ? (
        <StatusMessage
          title="No favorites yet"
          text="Use the favorite button on any product card to save it here."
        />
      ) : (
        <ProductGrid
          headingId="favorite-products-heading"
          products={favoriteProducts}
          title="Favorite products"
          favoriteIds={favoriteIds}
          compareIds={compareIds}
          onToggleFavorite={onToggleFavorite}
          onToggleCompare={onToggleCompare}
        />
      )}
    </section>
  )
}
