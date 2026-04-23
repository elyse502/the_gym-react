## Redux & Global State Management

---

## 1. Definition

Redux is a state management library used to manage and share application state across components in a predictable way.

Global state management refers to storing and managing data in a central place so multiple components can access and update it without passing props manually.

---

## 2. Explanation

In React, components manage their own local state. As the application grows, sharing data between many components becomes difficult. This leads to problems like prop drilling and inconsistent state.

Redux solves this by introducing a single source of truth called the store.

Core concepts:

• `Store`

Holds the entire application state

• `Action`

An object that describes what happened

• `Reducer`

A function that updates state based on an action

• `Dispatch`

A method used to send actions to the store

Flow:

User action → dispatch action → reducer updates state → UI re-renders

This makes state changes predictable and easier to debug.

---

## 3. Use Case

Use Redux when:

- many components need the same data
- state must stay consistent across the app
- application grows in complexity
- you want predictable state updates

Common scenarios:

- user authentication data
- shopping cart in e-commerce
- theme settings (dark/light mode)
- dashboards with shared data

Avoid Redux when:

- the app is small
- state is simple and local

---

## 4. Example

### Step 1: Create a Redux slice

```javascript
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

---

### Step 2: Configure the store

```javascript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

---

### Step 3: Provide store to React app

```javascript
import { Provider } from "react-redux";
import { store } from "./store";

<Provider store={store}>
  <App />
</Provider>;
```

---

### Step 4: Use state and dispatch in a component

```javascript
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

---

## Key Takeaways

- Redux stores global state in one place
- Actions describe changes
- Reducers update state
- Components read state using selectors
- Dispatch triggers updates
- Useful for large and complex applications

<br/><hr/><br/>

<details>
    <summary>How do we handle asynchronous operation in redux?</summary>

## Async in Redux

---

### What is the problem

Redux reducers must stay simple.

They only update state.
They must not fetch data or wait for anything.

But apps need to:

- fetch data from APIs
- wait for responses

---

### Simple idea

You do async work outside the reducer.

Then you send the result to the reducer.

---

### How it works step by step

1. You start an async task
2. You tell Redux “loading started”
3. When data arrives, you tell Redux “success”
4. If it fails, you tell Redux “error”

---

### Real life analogy

Think of a waiter in a restaurant.

- You place an order → dispatch action
- Kitchen cooks → async work
- Waiter brings food → dispatch success
- If problem → dispatch error

---

### Using Redux Toolkit (simple way)

```javascript
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await fetch("https://api.com/user");
  return res.json();
});
```

<details>
    <summary>createAsyncThunk</summary>

## createAsyncThunk

### What it is

A helper from Redux Toolkit that handles async actions like API calls.

---

### Why it exists

Handling async in Redux manually requires:

- writing many actions
- handling loading, success, error

This creates repetitive code.

createAsyncThunk removes that repetition.

---

### What it does

It creates an async action that automatically dispatches three states:

- pending → when request starts
- fulfilled → when request succeeds
- rejected → when request fails

---

### How it works

You define one async function.

Redux Toolkit handles the rest.

Example

```javascript
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await fetch("https://api.com/user");
  return res.json();
});
```

---

### What happens internally

When you call:

```javascript
dispatch(fetchUser());
```

Redux does this:

1. dispatch pending
2. run async function
3. dispatch fulfilled with data OR rejected with error

---

### How you use it in reducer

```javascript
extraReducers: (builder) => {
  builder
    .addCase(fetchUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
```

---

### Simple mental model

You define the async work once.
Redux handles loading, success, and error for you.

---

### When to use it

- fetching data from APIs
- handling async logic in Redux
- reducing boilerplate code

---

### One line summary

createAsyncThunk runs async code and automatically manages loading, success, and error states.

</details>

---

### Redux handles 3 states for you

- pending → loading
- fulfilled → success
- rejected → error

---

### Reducer handles those states

```javascript
extraReducers: (builder) => {
  builder
    .addCase(fetchUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchUser.rejected, (state) => {
      state.loading = false;
      state.error = "Failed";
    });
};
```

---

### Key idea to remember

- reducers do not do async work
- async happens before updating state
- you update state after result

---

### One line summary

Async work happens outside Redux, results go into Redux.

</details>
