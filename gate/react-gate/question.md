# Practical

Complete this component that renders a list of products. Add a search input that filters the list in real time as the user types (case insensitive).

The component should still filter the products whether the user filter by the product_name or it’s description.

```react
const ProductList = () => {
  const filteredProducts = products;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 border rounded mb-4"
      />

      {filteredProducts.length > 0 ? (
        <ul className="space-y-3">
          {filteredProducts.map((product) => (
            <li
              key={product.product_id}
              className="p-3 border rounded shadow-sm"
            >
              <h2 className="font-semibold">{product.product_name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="font-medium">${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
```

```react
const products = [
  {
    product_id: 1,
    product_name: "Laptop",
    price: 1200,
    description: "High-performance laptop with 16GB RAM and 512GB SSD.",
  },
  {
    product_id: 2,
    product_name: "Smartphone",
    price: 800,
    description: "Latest smartphone with OLED display and 5G connectivity.",
  },
  {
    product_id: 3,
    product_name: "Headphones",
    price: 150,
    description: "Noise-cancelling wireless headphones with long battery life.",
  },
  {
    product_id: 4,
    product_name: "Keyboard",
    price: 60,
    description: "Mechanical keyboard with customizable RGB lighting.",
  },
  {
    product_id: 5,
    product_name: "Mouse",
    price: 40,
    description: "Wireless ergonomic mouse with adjustable DPI.",
  },
  {
    product_id: 6,
    product_name: "Monitor",
    price: 300,
    description: "27-inch 4K UHD monitor with HDR support.",
  },
  {
    product_id: 7,
    product_name: "Printer",
    price: 200,
    description: "All-in-one inkjet printer with wireless printing.",
  },
  {
    product_id: 8,
    product_name: "Tablet",
    price: 500,
    description: "10-inch tablet with stylus support and 128GB storage.",
  },
  {
    product_id: 9,
    product_name: "Smartwatch",
    price: 250,
    description: "Water-resistant smartwatch with fitness tracking features.",
  },
  {
    product_id: 10,
    product_name: "External Hard Drive",
    price: 100,
    description: "1TB portable hard drive with USB 3.0 connectivity.",
  },
];
```

<br /><hr /><br />

<details>
    <summary>useMemo and useCallback Hooks</summary>

I'll explain **`useMemo` and `useCallback`** using the structure you asked for:

- **What it is**
- **Why we need it**
- **When to use it**
- **How to use it**
- **Simple example**
- **Mental rule to remember**

Both are hooks from React used for **performance optimization**.

---

# 1. `useMemo`

## 1️⃣ What it is

`useMemo` is a hook that **memoizes (caches) the result of a computation** so React doesn't recalculate it on every render.

It **returns a value**.

React will only recompute the value **when the dependencies change**.

---

## 2️⃣ Why we need it

React **re-renders components often**.

If you perform **expensive calculations** inside a component, they will run on **every render**, even if nothing related changed.

`useMemo` prevents unnecessary recalculations.

Example expensive tasks:

- Filtering large arrays
- Sorting data
- Complex math
- Data transformations

---

## 3️⃣ When to use it

Use `useMemo` when:

✅ You have **expensive calculations**
✅ You derive **computed data from props/state**
✅ You want to **avoid recalculating values on every render**

Do **NOT** use it for simple calculations.

Bad use:

```js
const total = useMemo(() => price + tax, [price, tax]);
```

This is unnecessary.

---

## 4️⃣ How to use it

Syntax:

```js
const memoizedValue = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
```

- First argument → function that returns value
- Second argument → dependency array

React recalculates only if dependencies change.

---

## 5️⃣ Example

Without `useMemo`:

```js
const filteredProducts = products.filter((p) =>
  p.product_name.toLowerCase().includes(search.toLowerCase()),
);
```

This runs **every render**.

Using `useMemo`:

```js
import { useMemo } from "react";

const filteredProducts = useMemo(() => {
  return products.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase()),
  );
}, [products, search]);
```

Now filtering runs **only when `products` or `search` changes**.

---

## 6️⃣ Mental rule

👉 **`useMemo` = memoize VALUE**

```
useMemo → returns value
```

---

# 2. `useCallback`

## 1️⃣ What it is

`useCallback` **memoizes a function** so React does not recreate it on every render.

It **returns a function**.

---

## 2️⃣ Why we need it

In JavaScript, **functions are recreated every render**.

Example:

```js
const handleClick = () => {
  console.log("clicked");
};
```

Every render creates a **new function reference**.

This can cause:

- unnecessary re-renders
- broken memoization in child components

Especially when using:

- `React.memo`
- dependency arrays
- optimized child components

---

## 3️⃣ When to use it

Use `useCallback` when:

✅ Passing functions to **memoized child components**
✅ Function is in **dependency array**
✅ Preventing unnecessary child re-renders

Example scenario:

```
Parent → passes function → Child
```

Without `useCallback`, child may re-render unnecessarily.

---

## 4️⃣ How to use it

Syntax:

```js
const memoizedFunction = useCallback(() => {
  doSomething();
}, [dependencies]);
```

Dependencies work **exactly like `useMemo`**.

---

## 5️⃣ Example

Without `useCallback`:

```js
const handleSearch = (value) => {
  setSearch(value);
};

<Search onSearch={handleSearch} />;
```

A **new function is created every render**.

Using `useCallback`:

```js
import { useCallback } from "react";

const handleSearch = useCallback((value) => {
  setSearch(value);
}, []);
```

Now the function reference **stays the same**.

---

## 6️⃣ Mental rule

👉 **`useCallback` = memoize FUNCTION**

```
useCallback → returns function
```

---

# 3. Key Difference

| Hook          | Returns  | Used for                   |
| ------------- | -------- | -------------------------- |
| `useMemo`     | value    | expensive calculations     |
| `useCallback` | function | stable function references |

Example comparison:

```js
// VALUE
const filtered = useMemo(() => filterProducts(products), [products]);

// FUNCTION
const handleClick = useCallback(() => doSomething(), []);
```

---

# 4. Important Concept

`useCallback` is basically **a special case of `useMemo`**.

Equivalent:

```js
useCallback(fn, deps);
```

is the same as:

```js
useMemo(() => fn, deps);
```

But `useCallback` is **clearer for functions**.

---

# 5. Common Real Example

```js
const filteredProducts = useMemo(() => {
  return products.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase()),
  );
}, [products, search]);

const handleSearch = useCallback((value) => {
  setSearch(value);
}, []);
```

- `useMemo` → cache filtered data
- `useCallback` → stable event handler

---

# 6. Important Warning ⚠️

**Don't overuse these hooks.**

They also have **memory cost**.

Use them only when:

- heavy computation
- unnecessary re-renders
- memoized components

---

✅ **Simple way to remember**

```
useMemo     → memoize RESULT
useCallback → memoize FUNCTION
```

---

If you want, I can also show you **3 real React patterns where `useMemo` and `useCallback` make a huge performance difference** (including one used in large production apps).

</details>

<br /><hr /><br />

<details>
    <summary>Approach for the question</summary>

Was it necessary to use useMemo and useCallback solving this question?

Practical
Complete this component that renders a list of products. Add a search input that filters the list in real time as the user types (case insensitive).

The component should still filter the products whether the user filter by the product_name or it’s description .

```react
const ProductList = () => {
  const filteredProducts = products;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 border rounded mb-4"
      />

      {filteredProducts.length > 0 ? (
        <ul className="space-y-3">
          {filteredProducts.map((product) => (
            <li
              key={product.product_id}
              className="p-3 border rounded shadow-sm"
            >
              <h2 className="font-semibold">{product.product_name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="font-medium">${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
```

```react
const products = [
  {
    product_id: 1,
    product_name: "Laptop",
    price: 1200,
    description: "High-performance laptop with 16GB RAM and 512GB SSD.",
  },
  {
    product_id: 2,
    product_name: "Smartphone",
    price: 800,
    description: "Latest smartphone with OLED display and 5G connectivity.",
  },
  {
    product_id: 3,
    product_name: "Headphones",
    price: 150,
    description: "Noise-cancelling wireless headphones with long battery life.",
  },
  {
    product_id: 4,
    product_name: "Keyboard",
    price: 60,
    description: "Mechanical keyboard with customizable RGB lighting.",
  },
  {
    product_id: 5,
    product_name: "Mouse",
    price: 40,
    description: "Wireless ergonomic mouse with adjustable DPI.",
  },
  {
    product_id: 6,
    product_name: "Monitor",
    price: 300,
    description: "27-inch 4K UHD monitor with HDR support.",
  },
  {
    product_id: 7,
    product_name: "Printer",
    price: 200,
    description: "All-in-one inkjet printer with wireless printing.",
  },
  {
    product_id: 8,
    product_name: "Tablet",
    price: 500,
    description: "10-inch tablet with stylus support and 128GB storage.",
  },
  {
    product_id: 9,
    product_name: "Smartwatch",
    price: 250,
    description: "Water-resistant smartwatch with fitness tracking features.",
  },
  {
    product_id: 10,
    product_name: "External Hard Drive",
    price: 100,
    description: "1TB portable hard drive with USB 3.0 connectivity.",
  },
];
```

</details>

<br /><hr /><br />

<details>
  <summary>The reason between two #nt approaches</summary>

For the practical question I was expected to implement this way during an interview:

```react
import React from "react";
import { useState } from "react";
import { products } from "../data/products";

const ProductList = () => {
  const [input, setInput] = useState("");

  const getText = (e) => {
    setInput(e.target.value);
  };

  // const filteredProducts = products;
  const filteredProducts = products.filter((product) => {
    return (
      product.product_name.toLowerCase().includes(input.toLowerCase()) ||
      product.description.toLowerCase().includes(input.toLowerCase())
    );
  });

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      <input
        type="text"
        placeholder="Search products..."
        onChange={getText}
        className="w-full p-2 border rounded mb-4"
      />

      {filteredProducts.length > 0 ? (
        <ul className="space-y-3">
          {filteredProducts.map((product) => (
            <li
              key={product.product_id}
              className="p-3 border rounded shadow-sm"
            >
              <h2 className="font-semibold">{product.product_name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="font-medium">${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
```

and ended up implementing it this way instead would I be able to pass the interview?

```react
import { useState, useMemo, useCallback } from "react";
import { products } from "../data/products.js";

const ProductList = () => {
  //   const filteredProducts = products;
  const [input, setInput] = useState("");

  const getText = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const filteredProducts = useMemo(() => {
    if (products.length === 0 || !input) {
      return products;
    }

    const newData = products.filter(
      (el) =>
        el.product_name.toLowerCase().includes(input.toLowerCase()) ||
        el.description.toLowerCase().includes(input.toLowerCase()),
    );

    return newData;
  }, [input, products]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      <input
        type="text"
        placeholder="Search products..."
        onChange={getText}
        className="w-full p-2 border rounded mb-4"
      />

      {filteredProducts.length > 0 ? (
        <ul className="space-y-3">
          {filteredProducts.map((product) => (
            <li
              key={product.product_id}
              className="p-3 border rounded shadow-sm"
            >
              <h2 className="font-semibold">{product.product_name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="font-medium">${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
```

</details>
