# **Theorical questions**

1. What is the difference between functional components and class components in React JS?
2. Discuss the lifecycle of a component in React.
   - Define reconciliation in the component lifecycle.
3. How do you manage side effects in React?
4. When should you use Context API instead of Redux?
   - How can Context API be combined with `useReducer`?
   - Can Context API replace Redux completely?

## Answers

Clear, simple, deep. One concept at a time.

---

# 1. Functional vs Class Components

## What is it?

- Functional → functions that return UI
- Class → ES6 classes that extend `React.Component`

---

## Why does it exist?

Old React used classes for:

- state
- lifecycle

Now functions handle everything with hooks.

---

## How does it work?

### Functional

```tsx
function App() {
  return <h1>Hello</h1>;
}
```

With state:

```tsx
const [count, setCount] = useState(0);
```

---

### Class

```tsx
class App extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
```

With state:

```tsx
this.state = { count: 0 };
```

---

## Key differences

| Functional      | Class                  |
| --------------- | ---------------------- |
| uses hooks      | uses lifecycle methods |
| less code       | more boilerplate       |
| easier to read  | harder to maintain     |
| modern standard | legacy                 |

---

## When to use

Use functional components.

Classes exist mainly in old codebases.

---

# 2. Component Lifecycle

## What is it?

The phases a component goes through:

```
Mount → Update → Unmount
```

---

## Why does it exist?

You need to:

- fetch data
- update UI
- clean resources

---

## How does it work?

### Functional (hooks)

```tsx
useEffect(() => {
  // runs on mount

  return () => {
    // runs on unmount
  };
}, []);
```

---

### Class lifecycle

- `componentDidMount` → after first render
- `componentDidUpdate` → after update
- `componentWillUnmount` → before removal

---

## Reconciliation

## What is it?

The process React uses to update the UI efficiently.

---

## Why does it exist?

Updating the real DOM is slow.

React minimizes changes.

---

## How does it work?

- React builds a Virtual DOM
- compares old vs new (diffing)
- updates only what changed

---

## Example

Change:

```tsx
<h1>Hello</h1>
```

to:

```tsx
<h1>Hello World</h1>
```

React updates only text, not full DOM.

---

# 3. Managing Side Effects

## What is it?

Side effects = actions outside rendering:

- API calls
- timers
- subscriptions

---

## Why does it exist?

React rendering must stay pure.

Side effects need separate handling.

---

## How does it work?

Use `useEffect`.

---

### Example

```tsx
useEffect(() => {
  fetch("/api/data");
}, []);
```

---

### Cleanup

```tsx
useEffect(() => {
  const interval = setInterval(() => {}, 1000);

  return () => clearInterval(interval);
}, []);
```

---

## When to use

- fetching data
- event listeners
- timers

---

# 4. Context API vs Redux

## What is it?

Both manage global state.

---

## Why does it exist?

Problem:

- passing props through many components

Solution:

- global shared state

---

## Context API

### When to use

- small to medium apps
- simple global data

Examples:

- auth user
- theme

---

## Redux

### When to use

- large apps
- complex state logic
- many updates

---

## Key difference

| Context     | Redux            |
| ----------- | ---------------- |
| simple      | structured       |
| less setup  | more setup       |
| fewer tools | strong dev tools |

---

# Context + useReducer

## What is it?

You combine:

- Context → share state
- useReducer → control updates

---

## How it works

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

Provide via context:

```tsx
<Context.Provider value={{ state, dispatch }}>
```

---

## Why use this

- cleaner logic
- predictable updates
- similar to Redux but simpler

---

# Can Context replace Redux?

## Short answer

Sometimes yes. Not always.

---

## When it works

- small apps
- simple logic

---

## When it fails

- large apps
- many state updates
- performance issues

---

## Why Redux still matters

- strict structure
- debugging tools
- middleware
- scalable

---

# Final Mental Model

- Functional components = modern React
- Lifecycle = mount, update, unmount
- Reconciliation = smart DOM updates
- useEffect = handle side effects
- Context = simple global state
- Redux = structured global state

---
