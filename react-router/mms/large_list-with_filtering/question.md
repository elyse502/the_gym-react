## Large List with Filtering

Build a React component that:

- Renders a list of 200 items
- Includes a text input field to filter displayed items
- Optimizes performance using React hooks

**API to Use**

Use this public API to fetch product data:

> https://api.escuelajs.co/api/v1/products

Fetch the products and use the first 200 items as your dataset.

**Requirements**

Your component should:

- Fetch products from the API
- Display up to 200 items
- Provide a text input where users can filter products by title

Optimize performance using:

`useMemo` — for filtering logic

`useCallback` — for handling input change events

Expected Behavior

On load, the component fetches products from the API and displays them.

When the user types in the search input, the list updates to show only matching products.

Filtering is optimized using `useMemo` to avoid unnecessary recalculations.
