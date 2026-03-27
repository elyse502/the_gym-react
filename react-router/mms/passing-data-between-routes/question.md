# 🧪 Exercise: Passing Data Between Routes

### Tasks:

- From Home:
  - Click button → go to `/profile`
  - Pass a name (e.g., “John”)
- Display name in Profile page

## 🎯 Objective

Learn how to **send and receive data between pages** using React Router.

---

## 🧱 Starter Code

Give them this:

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

```jsx
// Home.jsx
export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <button>Go to Profile</button>
    </div>
  );
}
```

```jsx
// Profile.jsx
export default function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
}
```

---

# 📌 Tasks

## ✅ Task 1: Send Data

When the user clicks **"Go to Profile"**:

- Navigate to `/profile`
- Pass this data:
  - name: `"Prisca"`

---

## ✅ Task 2: Receive Data

In the Profile page:

- Display:
  ```
  Welcome, Prisca
  ```

---

## ✅ Task 3: Make It Dynamic

- Replace `"Prisca"` with an **input field** in Home
- Let the user type their name
- Pass that name to Profile

---

## 🎯 Expected Output

1. User types: `Jessica`
2. Clicks button
3. Gets redirected
4. Sees:

   ```
   Welcome, Jessica
   ```

   <br /><hr /><br />

<details>
<summary>useNavigate and useLocation hooks</summary>

Certainly! Let's break down both `useNavigate` and `useLocation` hooks in the context of `react-router-dom`:

---

### 1. `useNavigate` Hook

#### **What it is:**

`useNavigate` is a hook provided by `react-router-dom` that allows you to programmatically navigate between different routes in your application.

#### **Why we need it:**

In React, we typically navigate between routes using `Link` components. However, in certain situations, we need to perform navigation in response to events or actions (e.g., a button click, form submission, or an API response). `useNavigate` allows us to do this programmatically.

#### **How to use it:**

1. Import `useNavigate` from `react-router-dom`.
2. Call `useNavigate()` to get the `navigate` function.
3. Use the `navigate` function to move between routes by passing in the desired path (and optional configurations like `state` or `replace`).

##### **Example:**

```jsx
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToProfile = () => {
    // Navigate to /profile route with a "name" state
    navigate("/profile", { state: { name: "Prisca" } });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToProfile}>Go to Profile</button>
    </div>
  );
}
```

##### **Options for `navigate`:**

- **Path:** The route to navigate to (e.g., `"/profile"`).
- **State:** You can pass data using `state` to share between components.
- **`replace`:** If set to `true`, it replaces the current entry in the browser history, so the user cannot go back to the previous route using the back button.

```javascript
navigate("/profile", { state: { name: "Prisca" }, replace: true });
```

#### **When to use `useNavigate`:**

- **Navigation on events:** For example, navigating after a button click, form submission, or an API call.
- **Redirects:** When you want to programmatically redirect a user based on some conditions (e.g., after successful authentication).

---

### 2. `useLocation` Hook

#### **What it is:**

`useLocation` is a hook from `react-router-dom` that provides information about the current location (i.e., the current URL and any state or query parameters associated with that URL). It returns a location object that contains details such as the `pathname`, `search` (query parameters), and `state`.

#### **Why we need it:**

When we navigate between routes using `useNavigate`, we might pass state data. In order to access that state or other details about the current route (like query parameters or the current path), we use `useLocation`. This hook helps us access all the information related to the current route dynamically.

#### **How to use it:**

1. Import `useLocation` from `react-router-dom`.
2. Call `useLocation()` to get the location object.
3. Extract data like `pathname`, `search`, or `state` from the location object.

##### **Example:**

```jsx
import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const { name } = location.state || { name: "Guest" }; // Default to "Guest" if no name is passed

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {name}</p>
    </div>
  );
}
```

Here, we access the `name` passed via `state` when navigating to the `/profile` route. If no `state` is passed, we default the name to `"Guest"`.

#### **Location Object:**

The object returned by `useLocation` has the following properties:

- **`pathname`**: The path of the current URL (e.g., `/profile`).
- **`search`**: The query string (e.g., `?id=123`).
- **`state`**: Any data passed when navigating (e.g., `{ name: "Prisca" }`).
- **`hash`**: The anchor part of the URL (e.g., `#section`).

```javascript
const location = useLocation();
console.log(location.pathname); // "/profile"
console.log(location.search); // "?id=123"
console.log(location.state); // { name: "Prisca" }
```

#### **When to use `useLocation`:**

- **Accessing navigation state:** If you need to access data passed via `navigate` (e.g., user information, query parameters).
- **Displaying current path or query parameters:** When you need to display or perform some action based on the current route or query string.
- **Conditional rendering based on the current route state:** For example, adjusting the UI depending on the query parameters or the passed state.

---

### Summary of Key Differences and Use Cases:

| Hook          | Purpose                                       | How to Use                                                                           | When to Use                                                                                                                                     |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `useNavigate` | To programmatically navigate to a new route.  | Call `useNavigate()` to get a `navigate` function and use it to change routes.       | When you need to navigate programmatically (e.g., after a button click or some event). Use it to navigate to a route and optionally pass state. |
| `useLocation` | To access the current location and its state. | Call `useLocation()` to get the current location object (e.g., `pathname`, `state`). | When you need to access the current route details, including the state passed between routes or query parameters.                               |

---

### Example: Full Usage Together

```jsx
// Home.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState("");

  const goToProfile = () => {
    navigate("/profile", { state: { name: inputName || "Prisca" } });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <button onClick={goToProfile}>Go to Profile</button>
    </div>
  );
}

// Profile.jsx
import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const { name } = location.state || { name: "Guest" };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {name}</p>
    </div>
  );
}
```

In this example:

- `useNavigate` is used in `Home.jsx` to navigate to `/profile` and pass the `name` as part of the state.
- `useLocation` is used in `Profile.jsx` to access the passed `name` and display it.

</details>
