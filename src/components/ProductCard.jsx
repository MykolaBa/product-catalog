import {
  formatDiscount,
  formatPrice,
  getStockLabel,
  hasDiscount,
} from '../utils/productFormatters.js'

export function ProductCard({
  product,
  isFavorite = false,
  isCompared = false,
  onToggleFavorite,
  onToggleCompare,
}) {
  const stockLabel = getStockLabel(product.stock)
  const cardClasses = [
    'product-card',
    isFavorite ? 'product-card--favorite' : '',
    isCompared ? 'product-card--compared' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={cardClasses}>
      <div className="product-image-wrap">
        <img
          src={product.thumbnail}
          alt={`${product.title} product preview`}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-card-body">
        <div>
          <p className="product-category">{product.category}</p>
          <h3>{product.title}</h3>
          {product.brand && <p className="product-brand">{product.brand}</p>}
        </div>

        <dl className="product-facts">
          <div>
            <dt>Price</dt>
            <dd>{formatPrice(product.price)}</dd>
          </div>
          <div>
            <dt>Rating</dt>
            <dd>{product.rating.toFixed(2)}</dd>
          </div>
          <div>
            <dt>Stock</dt>
            <dd>{stockLabel}</dd>
          </div>
        </dl>

        {hasDiscount(product) && (
          <span className="discount-badge">{formatDiscount(product.discountPercentage)} off</span>
        )}

        {(onToggleFavorite || onToggleCompare) && (
          <div className="product-actions">
            {onToggleFavorite && (
              <button
                className={`action-button${isFavorite ? ' action-button--selected' : ''}`}
                type="button"
                aria-label={
                  isFavorite
                    ? `Remove ${product.title} from favorites`
                    : `Add ${product.title} to favorites`
                }
                aria-pressed={isFavorite}
                onClick={() => onToggleFavorite(product.id)}
              >
                {isFavorite ? 'Saved favorite' : 'Add favorite'}
              </button>
            )}

            {onToggleCompare && (
              <button
                className={`action-button action-button--compare${
                  isCompared ? ' action-button--selected' : ''
                }`}
                type="button"
                aria-label={
                  isCompared
                    ? `Remove ${product.title} from comparison`
                    : `Compare ${product.title}`
                }
                aria-pressed={isCompared}
                onClick={() => onToggleCompare(product.id)}
              >
                {isCompared ? 'In compare' : 'Compare'}
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
