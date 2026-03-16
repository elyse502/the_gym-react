# React Core Concepts

This document summarizes several important React concepts frequently used in modern applications:

- Tree Shaking
- Context API
- Navigation with React Router (`useNavigate` vs `Navigate`)

---

# 1. Tree Shaking

## Overview

**Tree shaking** is a build optimization technique that removes **unused JavaScript code** from the final production bundle.

Modern bundlers analyze module imports and exports and only include code that is actually used by the application.

### Supported Build Tools

- Webpack
- Rollup
- Vite
- Parcel

This results in **smaller bundles and faster applications**.

---

## Why Tree Shaking Matters

Large JavaScript bundles can negatively impact application performance.

Tree shaking helps to:

- Reduce bundle size
- Improve page load time
- Lower bandwidth usage
- Improve performance on slower networks

---

## Example

❌ Importing the entire library:

```javascript
import _ from "lodash";
```

This loads the **whole lodash package**, even if only one function is used.

✅ Importing only what you need:

```javascript
import { debounce } from "lodash";
```

The bundler removes unused lodash functions during the build process.

---

## Requirements for Tree Shaking

Tree shaking works best when:

1. **ES Modules (ESM)** are used.

```javascript
import { useState } from "react";
```

2. The project is built in **production mode**.

```bash
npm run build
```

3. The bundler supports dead-code elimination.

---

## When to Use It

Tree shaking should be used in **all production React builds**, especially when:

- The application includes many dependencies
- Performance optimization is important
- Bundle size needs to be minimized

---

# 2. React Context API

## Overview

The **Context API** allows React components to share data **without passing props through multiple levels of the component tree**.

This pattern is commonly used for **global application state**.

---

## Common Use Cases

Typical data stored in context includes:

- Authentication state
- Application theme
- Language settings
- User preferences
- Global configuration

---

## The Problem: Prop Drilling

Prop drilling occurs when props must be passed through multiple components that do not directly use the data.

Example:

```
App
 └── Layout
      └── Dashboard
           └── Profile
```

If `Profile` requires user data, every parent component must pass the prop.

---

## How Context Solves This

Context allows components to **access shared data directly**, without intermediate components passing props.

Benefits:

- Cleaner component architecture
- Reduced prop drilling
- Easier global state management

---

## Implementation

### 1. Create a Context

```javascript
import { createContext } from "react";

export const AuthContext = createContext();
```

---

### 2. Provide the Context

```javascript
<AuthContext.Provider value={user}>
  <App />
</AuthContext.Provider>
```

The `Provider` makes the data available to all components inside it.

---

### 3. Consume the Context

```javascript
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Profile() {
  const user = useContext(AuthContext);

  return <h1>{user.name}</h1>;
}
```

Any component within the provider can access the shared value.

---

## When Not to Use Context

Context should be avoided when:

- State changes frequently
- Applications grow very large
- Complex state logic is required

In such cases, dedicated state management tools may be more suitable.

Examples:

- Redux
- Zustand
- Recoil

---

# 3. Navigation in React Router

React Router provides multiple ways to navigate between pages.

Two common methods are:

- `useNavigate` (Hook)
- `Navigate` (Component)

---

# useNavigate Hook

## Overview

`useNavigate` is a **React Router hook** used for **programmatic navigation**.

It allows navigation from JavaScript logic such as event handlers.

---

## Common Use Cases

- Redirect after login
- Redirect after form submission
- Redirect after API responses
- Navigation triggered by user events

---

## Example

```javascript
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/dashboard");
  }

  return <button onClick={handleLogin}>Login</button>;
}
```

Here navigation occurs **after a button click event**.

---

# Navigate Component

## Overview

`Navigate` is a **React Router component** used for **declarative navigation**.

It performs redirects directly during component rendering.

---

## Common Use Cases

- Protected routes
- Authentication redirects
- Conditional page access

---

## Example

```javascript
import { Navigate } from "react-router-dom";

function Dashboard({ user }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <h1>Dashboard</h1>;
}
```

If the user is not authenticated, the component redirects to the login page.

---

# Key Differences

| Feature          | useNavigate                  | Navigate                                 |
| ---------------- | ---------------------------- | ---------------------------------------- |
| Type             | Hook                         | Component                                |
| Usage            | Inside functions             | Inside JSX                               |
| Navigation style | Imperative                   | Declarative                              |
| Typical use case | After events (login, submit) | Conditional rendering / route protection |

---

# Quick Summary

| Concept      | Purpose                               |
| ------------ | ------------------------------------- |
| Tree Shaking | Removes unused code from bundles      |
| Context API  | Shares global state across components |
| useNavigate  | Programmatic navigation               |
| Navigate     | Conditional redirect during render    |

<br /><hr /><br />

<details>
    <summary>React Engineering notes</summary>

Below is a **senior-level React engineering notes version**. This format is closer to what experienced developers write in **internal docs, architecture notes, or interview prep**.
It adds **mental models, diagrams, best practices, and pitfalls** so the concept sticks better.

---

# React Engineering Notes

These notes summarize key React concepts with:

- Core idea
- Mental model
- Architecture patterns
- Best practices
- Common pitfalls

Concepts covered:

1. Tree Shaking
2. Context API
3. React Router Navigation (`useNavigate` vs `Navigate`)

---

# 1. Tree Shaking

## Core Idea

Tree shaking is a **build optimization technique** that removes unused JavaScript code from the final bundle.

The bundler analyzes **ES module imports and exports** and includes only the code that is actually referenced.

Supported by modern bundlers:

- Webpack
- Rollup
- Vite
- Parcel

---

## Mental Model

Think of your application as a **tree of imports**.

```
App
 ├── React
 ├── Utils
 │    ├── map
 │    ├── filter
 │    └── formatDate
 └── Components
```

If your application only uses:

```
map
```

Tree shaking removes:

```
filter
formatDate
```

from the final production bundle.

---

## Why It Matters

Large bundles affect:

- Page load time
- First Contentful Paint (FCP)
- Time to Interactive (TTI)

Tree shaking improves:

- Application startup speed
- Network efficiency
- Mobile performance

---

## Example

❌ Bad (imports entire library)

```javascript
import _ from "lodash";
```

This includes **every lodash function**.

---

✅ Good (imports only needed function)

```javascript
import { debounce } from "lodash";
```

Only `debounce` is included in the bundle.

---

## Requirements

Tree shaking works when:

1. ES Modules are used

```javascript
import { useState } from "react";
```

2. The project is built in **production mode**

```
npm run build
```

3. The library supports **side-effect-free modules**

Example in `package.json`:

```json
{
  "sideEffects": false
}
```

---

## Best Practices

Prefer **named imports**

```javascript
import { map } from "lodash";
```

Avoid importing entire libraries

Use **modern bundlers**

Prefer **modular libraries**

Example:

```
lodash-es
date-fns
```

---

## Common Pitfalls

### 1. CommonJS imports break tree shaking

Bad:

```javascript
const lodash = require("lodash");
```

Tree shaking works best with **ES Modules**.

---

### 2. Libraries with side effects

Some packages execute code during import.

Example:

```
import "some-polyfill"
```

These cannot be tree-shaken.

---

# 2. Context API

## Core Idea

The **Context API** allows React components to share global data **without prop drilling**.

It creates a **data channel across the component tree**.

---

## Mental Model

Without Context:

```
App
 └── Layout
      └── Dashboard
           └── Profile
```

User data must be passed through:

```
App -> Layout -> Dashboard -> Profile
```

Even though only `Profile` needs it.

---

With Context:

```
        AuthContext
             │
App ─────────┴─────────
        │
     Layout
        │
     Dashboard
        │
     Profile
```

Any component inside the provider can **access the shared data directly**.

---

## When Context Works Best

Context is ideal for **low-frequency global state**.

Examples:

- Authentication
- Theme
- Language
- Feature flags
- Global configuration

---

## Basic Implementation

### 1. Create Context

```javascript
import { createContext } from "react";

export const AuthContext = createContext();
```

---

### 2. Provide Context

```javascript
<AuthContext.Provider value={user}>
  <App />
</AuthContext.Provider>
```

---

### 3. Consume Context

```javascript
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Profile() {
  const user = useContext(AuthContext);

  return <h1>{user.name}</h1>;
}
```

---

## Architecture Pattern (Recommended)

Use a **Provider Component**.

```
context/
   AuthContext.js
   AuthProvider.js
```

Example:

```javascript
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

Then wrap the app:

```javascript
<AuthProvider>
  <App />
</AuthProvider>
```

---

## Performance Warning

Context triggers **re-renders in all consuming components** when the value changes.

Example:

```
Context update → every consumer re-renders
```

For frequently changing state, consider:

- Redux
- Zustand
- Jotai
- Recoil

---

# 3. React Router Navigation

React Router provides two main navigation patterns:

| Pattern       | Type                   |
| ------------- | ---------------------- |
| `useNavigate` | Imperative navigation  |
| `Navigate`    | Declarative navigation |

---

# useNavigate

## Concept

`useNavigate` allows navigation **inside JavaScript logic**.

Example:

- Event handlers
- API responses
- Form submissions

---

## Example

```javascript
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/dashboard");
  }

  return <button onClick={handleLogin}>Login</button>;
}
```

---

## Mental Model

```
User action
   ↓
Function runs
   ↓
navigate()
   ↓
Route changes
```

---

# Navigate Component

## Concept

`Navigate` is used when navigation depends on **render conditions**.

Example:

- Authentication guards
- Protected routes

---

## Example

```javascript
import { Navigate } from "react-router-dom";

function Dashboard({ user }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <h1>Dashboard</h1>;
}
```

---

## Mental Model

```
Component renders
      ↓
Condition checked
      ↓
Redirect triggered
```

---

# Navigation Comparison

| Feature          | useNavigate        | Navigate              |
| ---------------- | ------------------ | --------------------- |
| Type             | Hook               | Component             |
| Trigger          | Function execution | Render condition      |
| Navigation style | Imperative         | Declarative           |
| Common use       | After actions      | Authentication guards |

---

# Architecture Tip (Protected Routes)

Common production pattern:

```
components/
   ProtectedRoute.jsx
```

Example:

```javascript
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

Usage:

```javascript
<ProtectedRoute user={user}>
  <Dashboard />
</ProtectedRoute>
```

---

# Senior Engineer Takeaways

### Tree Shaking

Focus on **bundle optimization and import discipline**.

---

### Context API

Use for **global, stable state**.

---

### React Router Navigation

Choose navigation style based on **control flow**:

- Logic-driven → `useNavigate`
- Render-driven → `Navigate`

</details>

<br /><hr /><br />

<details>
<summary>PART 2</summary>

# Advanced React Engineering Concepts

## 1. React Rendering Lifecycle

### Core Idea

React applications update the UI through a **render → reconcile → commit** process.

Whenever **state or props change**, React decides what parts of the UI must update.

---

### React Rendering Phases

```text
State/Props Change
        ↓
      Render
        ↓
   Reconciliation
        ↓
      Commit
        ↓
      DOM Update
```

---

### 1. Render Phase

React calls the component functions to **generate the new virtual DOM**.

Example:

```javascript
function Counter({ count }) {
  return <h1>{count}</h1>;
}
```

React calculates **what the UI should look like**.

Important characteristics:

- Pure
- No DOM changes
- Can be paused or interrupted (in concurrent rendering)

---

### 2. Reconciliation

React compares the **previous virtual DOM** with the **new virtual DOM**.

This process is called **diffing**.

Example:

```text
Before
<h1>1</h1>

After
<h1>2</h1>
```

React detects that **only the text changed**.

---

### 3. Commit Phase

React applies the changes to the **real DOM**.

Example:

```text
Virtual DOM change detected
        ↓
Real DOM updated
```

At this phase:

- DOM mutations happen
- `useEffect` runs

---

### Why This Matters

Understanding this helps with:

- Performance optimization
- Avoiding unnecessary re-renders
- Debugging UI updates

---

# 2. Memoization in React

Memoization prevents **unnecessary recomputation or re-renders**.

React provides three important tools.

---

## useMemo

`useMemo` memoizes **computed values**.

Example:

```javascript
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.price - b.price);
}, [items]);
```

Without `useMemo`, sorting runs **on every render**.

---

## useCallback

`useCallback` memoizes **functions**.

Example:

```javascript
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

Useful when passing functions to child components.

---

## React.memo

Prevents **unnecessary component re-renders**.

Example:

```javascript
const ProductCard = React.memo(function ProductCard({ product }) {
  return <div>{product.name}</div>;
});
```

The component only re-renders if props change.

---

### Memoization Mental Model

```text
Normal render
Component → recompute everything

Memoized render
Component → reuse cached result
```

---

### Common Mistake

Overusing memoization can **hurt performance**.

Use memoization only when:

- Computation is expensive
- Components re-render frequently

---

# 3. Virtual DOM vs Real DOM

### Real DOM

The **actual browser DOM tree**.

Example:

```html
<div>
  <h1>Hello</h1>
</div>
```

Direct manipulation is expensive.

Example:

```javascript
document.createElement();
document.appendChild();
```

---

### Virtual DOM

React maintains an **in-memory representation of the DOM**.

Example:

```text
Virtual DOM Tree
       ↓
Compared with previous tree
       ↓
Minimal DOM updates
```

---

### Why Virtual DOM Exists

Updating the real DOM directly is **slow**.

React optimizes updates by:

1. Creating a Virtual DOM
2. Diffing changes
3. Updating only necessary nodes

---

### Example

Before:

```html
<h1>Hello</h1>
```

After:

```html
<h1>Hello World</h1>
```

React updates **only the text node**, not the entire element.

---

# 4. React Performance Optimization

Large React apps must manage **render performance** carefully.

---

## Avoid Unnecessary Re-renders

Example problem:

```javascript
<ChildComponent />
```

If the parent re-renders, the child re-renders too.

Solutions:

- `React.memo`
- `useMemo`
- `useCallback`

---

## Component Splitting

Break large components into smaller ones.

Bad:

```text
DashboardComponent
  - Sidebar
  - Charts
  - Notifications
  - Settings
```

Better:

```text
Dashboard
 ├── Sidebar
 ├── Charts
 ├── Notifications
 └── Settings
```

---

## Code Splitting

Load components **only when needed**.

Example:

```javascript
const Dashboard = React.lazy(() => import("./Dashboard"));
```

With:

```javascript
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

This reduces **initial bundle size**.

---

## List Optimization

When rendering lists, always use **stable keys**.

Bad:

```javascript
items.map((item, index) => <Item key={index} />);
```

Better:

```javascript
items.map((item) => <Item key={item.id} />);
```

Stable keys help React track elements correctly.

---

# 5. State Management Patterns

As applications grow, state becomes complex.

Different strategies exist.

---

## Local Component State

Used for **UI-specific state**.

Example:

```javascript
const [isOpen, setIsOpen] = useState(false);
```

Good for:

- Modals
- Inputs
- Toggle states

---

## Context State

Used for **shared global data**.

Example:

- User authentication
- Theme
- Language

---

## Global State Libraries

Large applications often use dedicated state tools.

Popular options:

### Redux

Predictable global state container.

Architecture:

```text
Component
   ↓
Dispatch Action
   ↓
Reducer
   ↓
Store Update
   ↓
UI Re-render
```

---

### Zustand

A lightweight global state manager.

Example:

```javascript
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

---

### When to Choose What

| State Type           | Best Tool       |
| -------------------- | --------------- |
| Local UI state       | useState        |
| Shared app data      | Context         |
| Complex global state | Redux / Zustand |

---

# Senior-Level React Mental Model

Think about React applications in **three layers**:

```text
UI Layer
Components
        ↓
State Layer
State + Context + Stores
        ↓
Data Layer
APIs + Backend
```

Senior engineers design applications by **separating these responsibilities clearly**.

---

# Bonus: React Interview Questions You Should Expect

Senior React interviews often ask things like:

1. Why does React need keys in lists?
2. What causes unnecessary re-renders?
3. Difference between `useMemo` and `useCallback`?
4. How does React reconciliation work?
5. When should Context NOT be used?

</details>

<br /><hr /><br />

<details>
<summary>10 Common React Mistakes (and How to Avoid Them)</summary>

Here are **10 common React mistakes** that even experienced developers sometimes make. Understanding these helps you **write cleaner code, avoid bugs, and perform better in code reviews or interviews**.

---

# 10 Common React Mistakes (and How to Avoid Them)

---

# 1. Using Array Index as a Key

### The Problem

Developers often use the array index as the `key` when rendering lists.

```javascript
items.map((item, index) => <Item key={index} item={item} />);
```

### Why This Is Bad

React uses keys to **track elements between renders**.

If items are reordered, added, or removed, using the index can cause:

- Wrong UI updates
- State bugs
- Performance issues

### Correct Approach

Use a **stable unique identifier**.

```javascript
items.map((item) => <Item key={item.id} item={item} />);
```

---

# 2. Mutating State Directly

### The Problem

React state must be **immutable**.

Bad example:

```javascript
state.user.name = "John";
setUser(state.user);
```

This mutates the existing object.

### Correct Approach

Create a new object.

```javascript
setUser({
  ...user,
  name: "John",
});
```

This ensures React detects the change and re-renders.

---

# 3. Overusing `useEffect`

Many developers put **too much logic inside `useEffect`**.

Bad example:

```javascript
useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);
```

This creates **derived state**, which is unnecessary.

Better approach:

```javascript
const fullName = `${firstName} ${lastName}`;
```

Rule:

> If you can compute something during render, **do not use `useEffect`**.

---

# 4. Missing Dependency Arrays in `useEffect`

Example mistake:

```javascript
useEffect(() => {
  fetchData();
});
```

Without dependencies, the effect runs **on every render**, causing unnecessary API calls.

Correct:

```javascript
useEffect(() => {
  fetchData();
}, []);
```

Runs only once when the component mounts.

---

# 5. Not Splitting Large Components

Large components become difficult to maintain.

Bad example:

```text
DashboardComponent
- Sidebar
- Charts
- Notifications
- Settings
- UserProfile
```

Better structure:

```text
Dashboard
 ├── Sidebar
 ├── Charts
 ├── Notifications
 ├── Settings
 └── UserProfile
```

Benefits:

- Reusability
- Maintainability
- Easier debugging

---

# 6. Forgetting to Handle Loading and Error States

Bad example:

```javascript
const data = await fetchData();
return <div>{data.name}</div>;
```

If the request fails or is loading, the UI breaks.

Better approach:

```javascript
if (loading) return <Spinner />;
if (error) return <ErrorMessage />;

return <div>{data.name}</div>;
```

Every async request should handle:

- Loading
- Error
- Success

---

# 7. Overusing Global State

Developers sometimes move **everything into global state**.

This creates:

- Unnecessary complexity
- Difficult debugging
- Performance issues

Rule of thumb:

| State Type        | Where It Belongs |
| ----------------- | ---------------- |
| UI state          | Component        |
| Shared state      | Context          |
| Complex app state | Global store     |

---

# 8. Creating Functions Inside Render Without Memoization

Example:

```javascript
<ChildComponent onClick={() => handleClick()} />
```

This creates a **new function every render**, which can cause child components to re-render unnecessarily.

Better:

```javascript
const handleClick = useCallback(() => {
  console.log("clicked");
}, []);
```

---

# 9. Fetching Data Inside Components Without Abstraction

Bad example:

```javascript
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);
}
```

Better approach:

Move logic to **custom hooks**.

```javascript
function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return users;
}
```

Now components remain **clean and reusable**.

---

# 10. Ignoring Performance Optimization

Some React apps become slow because developers ignore optimization.

Key techniques include:

### Memoization

```javascript
React.memo(Component);
```

### Code Splitting

```javascript
const Dashboard = React.lazy(() => import("./Dashboard"));
```

### Avoid Unnecessary Re-renders

Use:

- `React.memo`
- `useMemo`
- `useCallback`

When appropriate.

---

# Senior Engineer React Checklist

Before finishing a component, ask:

- Does it re-render unnecessarily?
- Is the state immutable?
- Are effects minimal and correct?
- Are components small and reusable?
- Are lists using stable keys?
- Are async states handled?

---

# The Most Important React Principle

A useful rule followed by experienced engineers:

> **Keep components simple, predictable, and declarative.**

React works best when components:

- Describe UI
- Derive values instead of storing them
- Avoid unnecessary side effects

</details>
