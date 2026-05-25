import { COMPARISON_ROWS, COMPARE_LIMIT } from '../constants/catalog.js'
import { SectionHeader } from './SectionHeader.jsx'
import { StatusMessage } from './StatusMessage.jsx'

export function CompareSection({
  compareProducts,
  compareMessage,
  isCompareMessageVisible,
  onClearCompare,
  onToggleCompare,
}) {
  return (
    <section className="saved-section" aria-labelledby="compare-heading">
      <SectionHeader
        headingId="compare-heading"
        title="Compare"
        note={`Select up to ${COMPARE_LIMIT} products to compare.`}
        meta={`${compareProducts.length} selected`}
      />

      {compareMessage && (
        <p
          className={`limit-message${isCompareMessageVisible ? ' limit-message--visible' : ''}`}
          role="alert"
          aria-live="assertive"
        >
          {compareMessage}
        </p>
      )}

      {compareProducts.length === 0 ? (
        <StatusMessage
          title="No products selected"
          text="Use the compare button on product cards to build a comparison table."
        />
      ) : (
        <div className="compare-table-wrap">
          <table className="compare-table">
            <caption>
              Selected product comparison with title, price, rating, stock, category, and discount.
            </caption>
            <thead>
              <tr>
                <th scope="col">Field</th>
                {compareProducts.map((product) => (
                  <th key={product.id} scope="col">
                    {product.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Image</th>
                {compareProducts.map((product) => (
                  <td key={product.id} className="compare-image-cell">
                    <img
                      src={product.thumbnail}
                      alt={`${product.title} product preview`}
                      className="compare-image"
                      loading="lazy"
                    />
                  </td>
                ))}
              </tr>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {compareProducts.map((product) => (
                    <td key={product.id}>{row.getValue(product)}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">Action</th>
                {compareProducts.map((product) => (
                  <td key={product.id}>
                    <button
                      className="table-button"
                      type="button"
                      aria-label={`Remove ${product.title} from comparison`}
                      onClick={() => onToggleCompare(product.id)}
                    >
                      Remove
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          <button className="text-button compare-clear" type="button" onClick={onClearCompare}>
            Clear compare
          </button>
        </div>
      )}
    </section>
  )
}
