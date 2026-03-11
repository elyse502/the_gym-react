## Fetch Users and Posts with a Custom Hook

Build a React application that fetches data from two API endpoints at the same time and displays posts based on a selected user.

- APIs to Use

Fetch data from the following endpoints:

Users API:

> https://jsonplaceholder.typicode.com/users

Posts API

> https://jsonplaceholder.typicode.com/posts

- Requirements

1. Create a custom React hook called `useUsersPosts`.
2. The hook should:

- fetch 'users' and 'posts' from the two endpoints
- handle:
  - loading state
  - error state

1. Return the following from the hook:

- `users`
- `posts`
- `loading`
- `error`

1. In your component:

- display a dropdown or input field to select a 'userId'
- display only the posts belonging to the selected user

Filtering

Use the condition:

post.userId === selectedUserId

to filter posts belonging to that user.

- Display Behavior

Your UI should:

- show "Loading..." while fetching data
- show "an error message" if fetching fails
- show the "list of users"
- show "posts belonging to the selected user"
- Goal of the Exercise

This exercise helps students practice:

- creating custom React hooks
- fetching data from multiple APIs
- handling loading and error states
- filtering data
- working with React state and effects
