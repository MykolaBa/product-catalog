import { ProductCard } from './ProductCard.jsx'
import { SectionHeader } from './SectionHeader.jsx'

export function ProductGrid({
  products,
  title = 'All products',
  headingId = 'products-heading',
  favoriteIds = [],
  compareIds = [],
  onToggleFavorite,
  onToggleCompare,
}) {
  return (
    <section className="product-section" aria-labelledby={headingId}>
      <SectionHeader headingId={headingId} title={title} meta={`${products.length} items`} />

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favoriteIds.includes(product.id)}
            isCompared={compareIds.includes(product.id)}
            onToggleFavorite={onToggleFavorite}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>
    </section>
  )
}
