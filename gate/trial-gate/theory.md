## Theorical Session

1. What is the difference between a router (`BrowserRouter`, `HashRouter`, `MemoryRouter`) and a route (`Routes`/`Route`)? When would you choose each router?
2. What are route loaders (or data APIs) used for, and how do they change the way you handle params compared to fetching in components?
3. How does Redux ensure predictability?
   - What is the difference between dispatching an action and updating state directly?
4. Difference between controlled and uncontrolled components.

---

<h1 align="center">Answers</h1>

Clear, simple breakdown. No noise.

---

# 1. Router vs Route

## What is it?

- **Router** → controls navigation system
- **Route** → maps a URL to a component

---

## Why does it exist?

You need:

- a system to track URL changes → Router
- a way to decide what to render → Route

---

## How does it work?

- Router watches URL
- Route checks path
- If match → render component

---

## Example

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/teams" element={<TeamsPage />} />
  </Routes>
</BrowserRouter>
```

---

## Router types

### 1. BrowserRouter

- uses normal URLs (`/teams`)
- clean URLs
- used in most apps

### 2. HashRouter

- uses `#` (`/#/teams`)
- works without server config
- used for static hosting

### 3. MemoryRouter

- stores routes in memory
- no URL change
- used for testing

---

## When to use

- BrowserRouter → default choice
- HashRouter → no backend control
- MemoryRouter → tests

---

# 2. Route Loaders (Data APIs)

## What is it?

A way to fetch data **before rendering the page**

---

## Why does it exist?

Problem:

- component renders first
- then fetch starts
- causes loading flicker

---

## How does it work?

- Router runs loader
- waits for data
- passes data to component

---

## Example idea

```tsx
loader: async ({ params }) => {
  return fetch(`/api/users/${params.id}`);
};
```

---

## Key difference

### Old way (inside component)

```tsx
useEffect(() => {
  fetch(...)
}, [])
```

- runs after render
- needs loading state

---

### Loader way

- data ready before render
- cleaner code
- params available directly

---

## When to use

- page-level data
- important data needed before UI

---

# 3. Redux Predictability

## What is it?

A strict way to manage state changes

---

## Why does it exist?

Problem:

- state changes randomly
- hard to debug

Redux solves:

- every change is tracked
- everything is predictable

---

## How does it work?

Flow:

```text
Action → Reducer → New State
```

---

## Dispatch vs Direct Update

### ❌ Direct update (wrong)

```tsx
state.count = 5;
```

- hidden change
- no tracking
- unpredictable

---

### ✅ Dispatch action (correct)

```tsx
dispatch({ type: "SET_COUNT", payload: 5 });
```

Reducer:

```tsx
if (action.type === "SET_COUNT") {
  return { ...state, count: action.payload };
}
```

---

## Why Redux is predictable

- state is read-only
- changes go through one path
- reducers are pure functions

---

## Result

You can:

- trace every change
- debug easily
- replay actions

---

# 4. Controlled vs Uncontrolled Components

## What is it?

How form data is handled

---

## Controlled Component

### What is it?

React controls the input value

---

### Example

```tsx
const [value, setValue] = useState("");

<input value={value} onChange={(e) => setValue(e.target.value)} />;
```

---

### Why use it?

- full control
- validation
- real-time updates

---

## Uncontrolled Component

### What is it?

DOM controls the input

---

### Example

```tsx
const inputRef = useRef();

<input ref={inputRef} />;
```

Read value later:

```tsx
inputRef.current.value;
```

---

### Why use it?

- simple forms
- less code

---

## Key Difference

| Controlled           | Uncontrolled  |
| -------------------- | ------------- |
| React controls       | DOM controls  |
| uses state           | uses ref      |
| real-time validation | manual access |

---

## When to use

- Controlled → most apps
- Uncontrolled → quick/simple forms

---

# Final Mental Model

- Router = navigation system
- Route = page mapping
- Loader = fetch before render
- Redux = controlled state flow
- Controlled input = React owns data
- Uncontrolled input = DOM owns data

---
