# Theorical Session

1. What is the difference between a router (`BrowserRouter`, `HashRouter`, `MemoryRouter`) and a route (`Routes`/`Route`)? When would you choose each router?
2. What are route loaders (or data APIs) used for, and how do they change the way you handle params compared to fetching in components?
3. How does Redux ensure predictability?
   - What is the difference between dispatching an action and updating state directly?
4. Difference between controlled and uncontrolled components.

## Answers

Clear. Focus on the exact concepts.

---

# 1. Router vs Routes vs Route

## What is it?

- **Router** (`BrowserRouter`, `HashRouter`, `MemoryRouter`) → manages navigation system
- **Routes** → groups all routes
- **Route** → maps a path to a component

---

## Why does it exist?

You need:

- Router → track URL changes
- Routes → organize route definitions
- Route → decide what to render

---

## How does it work?

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/teams" element={<TeamsPage />} />
  </Routes>
</BrowserRouter>
```

Flow:

- Router watches URL
- Routes checks all Route entries
- Matching Route renders component

---

## Routers

### BrowserRouter

- clean URLs (`/teams`)
- uses browser history
- default choice

---

### HashRouter

- uses `/#/teams`
- no server setup needed
- used for static hosting

---

### MemoryRouter

- no real URL
- stores routes in memory
- used in tests

---

## When to choose

- BrowserRouter → most apps
- HashRouter → no backend control
- MemoryRouter → testing

---

# 2. Route Loaders (Data APIs)

## What is it?

Fetch data **before the component renders**

---

## Why does it exist?

Problem:

- component renders
- then fetch starts
- causes loading flicker

---

## How does it work?

- loader runs first
- gets data
- component receives ready data

---

## Example idea

```tsx
loader: async ({ params }) => {
  return fetch(`/api/products/${params.id}`);
};
```

---

## Params difference

### Component fetching

```tsx
const { id } = useParams();
```

- access params inside component
- fetch after render

---

### Loader fetching

- params passed directly to loader
- fetch happens before render
  Cleaner and faster UI.

---

## When to use

- page-level data
- required data before UI shows

---

# 3. Redux Predictability

## What is it?

A strict pattern for state updates.

---

## Why does it exist?

Problem:

- state changes from anywhere
- hard to debug
  Redux:
- all changes follow one path

---

## Flow

```
dispatch → reducer → new state
```

---

## Dispatch vs Direct Update

### ❌ Direct update

```tsx
state.count = 5;
```

- hidden change
- no tracking
- unpredictable

---

### ✅ Dispatch

```tsx
dispatch({ type: "SET_COUNT", payload: 5 });
```

Reducer:

```tsx
return { ...state, count: action.payload };
```

---

## Why predictable

- state is immutable
- reducers are pure
- all updates logged

---

# 4. Controlled vs Uncontrolled Components

## What is it?

How form inputs are handled.

---

## Controlled

### What is it?

React controls input value.

---

### Example

```tsx
const [value, setValue] = useState("");

<input value={value} onChange={(e) => setValue(e.target.value)} />;
```

---

### Why use it

- validation
- real-time updates
- full control

---

## Uncontrolled

### What is it?

DOM controls input.

---

### Example

```tsx
const ref = useRef();

<input ref={ref} />;
```

Read later:

```tsx
ref.current.value;
```

---

### Why use it

- simple forms
- less code

---

## Key Difference

| Controlled         | Uncontrolled  |
| ------------------ | ------------- |
| React controls     | DOM controls  |
| uses state         | uses ref      |
| instant validation | manual access |

---

# Final Mental Model

- Router = navigation system
- Routes = container for routes
- Route = mapping path → component
- Loader = fetch before render
- Redux = controlled state flow
- Controlled input = React owns value
- Uncontrolled input = DOM owns value

---
