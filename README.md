# San TSG Frontend Case

A client-side-only SPA built with Vite, React 18, TypeScript, React Router v6, TanStack React Query v5, and Tailwind CSS.

## Features

- **Authentication:** Dummy login, user/permissions stored in React Query state
- **Authorization:** Route-based permission checks, forbidden page (`/403`)
- **Routing:** All routes defined in a single config file, supports lazy loading and permission checks
- **Navigation:** Auto-generated navigation object with `.get()` and `.go()` methods
- **Pages:**
  - Login
  - Home/Dashboard (recent posts & comments)
  - Posts (list, edit, create)
  - Post details (with Edit and Comments tabs)
  - Create Post
  - Forbidden (`/403`)
- **API:** Uses [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/) for data
- **UI:** Clean, modern look with Tailwind CSS

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the app:**
   ```bash
   npm run dev
   ```
3. **Login:**
   - Login to use dummy user.

## Project Structure

- `src/routes/routeConfig.ts` — All route definitions
- `src/routes/nav.ts` — Navigation object
- `src/auth/AuthProvider.tsx` — Auth context/provider
- `src/pages/` — All page components
- `src/api/client.ts` — API client
- `src/types/` — TypeScript types

## Notes
- No UI/form libraries used (only Tailwind CSS)
- No tests required
- User session is not persisted (in-memory only)
- i18n translation loader is a placeholder (see `translations` in route config)

## Assignment
This project was built as a solution for the San TSG Senior Frontend Developer assignment.

---

**Thank you for reviewing!**
