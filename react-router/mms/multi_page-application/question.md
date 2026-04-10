# Mental Model Practical 9.04.2026

You have been provided with the following landing page template. Your task is to convert it into a multi-page React application with navigation, filtering, and dynamic routes.

Use this page as a reference: [React Landing Page Template](https://react-landing-page-template-93ne.vercel.app/?utm_source=chatgpt.com)

---

## Instructions

### 1. Set up your project

- Create a new React app
- Recreate the website UI
- Run the project to ensure everything works before making changes

### 2. Install routing

- Install `react-router-dom`
- Configure routing in your app

### 3. Create routes

Add the following routes:

- `/` → Home page
- `/features` → Features page
- `/pricing` → Pricing page
- `/teams` → Teams page

### 4. Update navigation

Modify the navigation bar:

- Use router links (`Link` or `NavLink`)
- Navigation must happen without page reload

### 5. Split the landing page

- Move the Features section → `/features`
- Move the Pricing section → `/pricing`
- Keep the homepage simple:
  - Hero
  - Main section
  - Footer

### 6. Manage Team Data with Context API

Instead of managing team data inside the Teams page, use **Context API as the single source of truth**.

### Requirements:

- Create a `TeamContext`
- Store:
  - List of team members (at least 3)
    - id
    - name
    - role or department
- Wrap your entire app with the Context Provider

## 7. Create Teams page

Create `/teams` page.

### Requirements:

- Get team members from **Context (not local state)**
- Display all team members

## 8. Add search using URL

Enable searching using query parameters.

**Example:**

`/teams?search=react`

### Requirements:

- Read search value from URL
- Filter team members (from Context) by **name**
- Display only matching results

## 9. Add role filtering

Enable filtering using query parameters.

**Example:**

`/teams?role=manager`

### Requirements:

- Add filter buttons:
  - All
  - Manager
  - Developer
  - Designer
- Update URL when a filter is selected
- Filter team members (from Context) by role

## 10. Add dynamic routing

Create dynamic route:

`/teams/:id`

### Requirements:

- Clicking a team member opens a details page
- Use the `id` to fetch the member **from Context**
- Display full member information
