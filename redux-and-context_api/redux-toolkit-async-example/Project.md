Below is a simple but complete mini app that shows:

- counter (sync state)
- async API call with createAsyncThunk
- loading, success, error states
- clean separation of concerns
- TypeScript + React + Redux Toolkit + Tailwind

---

# Project Structure

```groovy
src/
  app/
    store.ts
    hooks.ts
  features/
    counter/
      counterSlice.ts
      Counter.tsx
    users/
      userSlice.ts
      Users.tsx
  App.tsx
  main.tsx
```

---

# 1. Store Setup

## app/store.ts

```typescript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## app/hooks.ts

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

# 2. Counter (Sync Example)

## features/counter/counterSlice.ts

```typescript
import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

---

## features/counter/Counter.tsx

```tsx
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { increment, decrement, reset } from "./counterSlice";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Counter</h2>
      <p className="text-2xl mb-4">{count}</p>

      <div className="flex gap-2">
        <button
          onClick={() => dispatch(increment())}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          +
        </button>

        <button
          onClick={() => dispatch(decrement())}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          -
        </button>

        <button
          onClick={() => dispatch(reset())}
          className="px-3 py-1 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
```

---

# 3. Async Feature (Users)

## features/users/userSlice.ts

```typescript
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
}

interface UserState {
  data: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return (await res.json()) as User[];
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default userSlice.reducer;
```

---

## features/users/Users.tsx

```tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUsers } from "./userSlice";

export default function Users() {
  const { data, loading, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="p-4 border rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-2">Users</h2>

      {loading && <p className="text-blue-500">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="list-disc pl-5">
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

# 4. App Component

## App.tsx

```tsx
import Counter from "./features/counter/Counter";
import Users from "./features/users/Users";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Redux Toolkit Demo</h1>

      <Counter />
      <Users />
    </div>
  );
}
```

---

# 5. Entry Point

## main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
```

---

# What You Learn From This

- Counter shows basic reducer usage
- Users feature shows async flow
- createAsyncThunk handles API calls
- loading, success, error states are clear
- separation keeps code maintainable

---

# Mental Model

User clicks → dispatch action
If async → thunk runs
Redux updates loading → UI reacts
Data returns → state updates → UI updates

---
