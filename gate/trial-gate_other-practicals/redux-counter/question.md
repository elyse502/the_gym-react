# 2- Practical session

Redux: Counter

Build a counter using Redux Toolkit.

---

### **Requirements**

1. Create a slice:

- state: `value`

1. Add actions:

- increment
- decrement

---

### **In your component:**

- Display value
- Add buttons

---

### **Goal of the Exercise**

- Redux basics
- Actions & reducers

<br/><hr/><br/>

<details>
  <summary>Immer in Redux (Overview)</summary>

### What is Immer?

[Immer](<https://immerjs.github.io/immer/#:~:text=Immer%20(German%20for:%20always),object%20itself%20did%20not%20change.>) is a JavaScript library that simplifies writing immutable state updates.  
It allows you to write code that appears to “mutate” data while actually producing a new immutable state.

Ref 👉 [link](https://medium.com/@khaledb.yahya/supercharge-redux-with-immer-using-immer-to-update-redux-state-in-a-more-readable-and-safer-2d6655086d89)

---

### Why use Immer with Redux?

In Redux, Immer is mainly used inside reducers to remove complex and error-prone boilerplate (like deeply nested spread operators).

---

### Key Concepts

- **Draft State**  
  Immer provides a temporary _draft_ of your current state.  
  You can safely modify it using normal JavaScript:
  ```js
  state.value = 1;
  state.items.push(action.payload);
  ```
