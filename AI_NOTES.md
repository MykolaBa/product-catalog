# AI Notes

## AI Usage

AI was used as a development assistant for planning, implementation support, refactoring suggestions, and documentation drafting.

## AI Helped With

- Breaking the task into implementation steps.
- Creating the initial React/Vite structure.
- Drafting product loading, filtering, sorting, favorites, and compare logic.
- Suggesting reusable hooks, utilities, constants, and component boundaries.
- Reviewing accessibility, responsive behavior, and state structure.

## Manually Reviewed and Changed

- Improved the project architecture and separated catalog state into reusable hooks/utilities.
- Refined styles, responsiveness, and CSS organization.
- Added CSS variables for shared colors, spacing, sizing, typography, shadows, and transitions.
- Improved accessibility with labels, focus states, `aria-pressed`, alerts, and meaningful image alt text.
- Added validation/sanitization for invalid or stale persisted ids.
- Improved error and empty states.
- Added product images to the compare table.
- Added search input focus after reload.
- Reviewed localStorage usage, derived data flow, and compare limit behavior.
- Adjusted UI details manually, including the smooth compare-limit notification.

## Rejected or Corrected Suggestions

- Did not use UI kits, CSS frameworks, or external state management.
- Kept the implementation in plain React state/hooks and plain CSS to match the assignment requirements.
