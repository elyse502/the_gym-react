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
