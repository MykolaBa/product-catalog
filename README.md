# Product Catalog

React + Vite product catalog that loads products from:

```text
https://dummyjson.com/products?limit=200
```

## Run

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
npm audit --audit-level=low
```

## Features

- Product grid with image, title, brand, category, price, discount, rating, and stock status.
- Search by title, brand, and category.
- Filters for category, in-stock products, and discounted products.
- Sorting by price, rating, and title.
- Favorites with `localStorage` persistence.
- Compare list with up to 3 products, product images, and a comparison table.
- Smooth compare-limit notification.
- Loading, error, no-results, empty favorites, and empty compare states.
- Reset filters button.
- Responsive layout for desktop and mobile.

## Implementation Notes

- Source products are kept immutable; filtered and sorted products are derived.
- Favorites and compare store product ids, not duplicated product objects.
- Invalid or stale persisted ids are sanitized.
- Catalog state is separated into hooks, constants, utilities, and reusable components.
- Styling is split by feature under `src/styles`.
- Shared colors, spacing, sizing, typography, shadows, and transitions use CSS variables in `src/index.css`.
- Accessibility includes labels, real buttons, visible focus states, meaningful image alt text, `aria-pressed`, and alert semantics.

## Known Issues

- Very long product titles in the compare table could be further optimized for narrow screens.
- The compare table uses horizontal scrolling on small screens instead of a stacked mobile comparison layout.
- The reset filters button is disabled when no filters are active; this is intentional, but it may look inactive if the user expects it to always be clickable.
- The app does not include retry/backoff logic beyond showing an API error state.
- Browser storage failures are handled gracefully, but the UI does not show a dedicated warning if `localStorage` is unavailable.
- Minor errors in styles.