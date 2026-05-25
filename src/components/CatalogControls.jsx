import { useEffect, useRef } from 'react'
import { SORT_OPTIONS } from '../constants/catalog.js'
import { hasActiveControls } from '../utils/catalogFilters.js'
import { SectionHeader } from './SectionHeader.jsx'

export function CatalogControls({ categories, controls, dispatch }) {
  const searchInputRef = useRef(null)
  const canReset = hasActiveControls(controls)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  return (
    <section className="catalog-controls" aria-labelledby="catalog-controls-heading">
      <SectionHeader
        headingId="catalog-controls-heading"
        title="Search and filters"
        action={
          <button
            className="text-button"
            type="button"
            onClick={() => dispatch({ type: 'reset' })}
            disabled={!canReset}
          >
            Reset filters
          </button>
        }
      />

      <div className="controls-grid">
        <div className="field field--wide">
          <label htmlFor="product-search">Search products</label>
          <input
            id="product-search"
            ref={searchInputRef}
            type="search"
            value={controls.searchTerm}
            onChange={(event) =>
              dispatch({ type: 'setSearchTerm', value: event.target.value })
            }
            placeholder="Search by title, brand, or category"
          />
        </div>

        <div className="field">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            value={controls.category}
            onChange={(event) =>
              dispatch({ type: 'setCategory', value: event.target.value })
            }
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="sort-products">Sort by</label>
          <select
            id="sort-products"
            value={controls.sortBy}
            onChange={(event) =>
              dispatch({ type: 'setSortBy', value: event.target.value })
            }
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="toggle-group" aria-label="Product filters">
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={controls.inStockOnly}
              onChange={(event) =>
                dispatch({ type: 'setInStockOnly', value: event.target.checked })
              }
            />
            <span>Only in stock</span>
          </label>

          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={controls.discountedOnly}
              onChange={(event) =>
                dispatch({ type: 'setDiscountedOnly', value: event.target.checked })
              }
            />
            <span>Only discounted</span>
          </label>
        </div>
      </div>
    </section>
  )
}
