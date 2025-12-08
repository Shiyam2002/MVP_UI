# Next.js Project Guideline

This document collects recommended best practices, tools, patterns, and commands for building a maintainable, secure, and high-performance Next.js application (App Router). Use it as a living checklist and starting point for new features and repos.

## Purpose / contract
- Inputs: developer code, third-party services, environment variables.
- Outputs: production-ready Next.js app (SSR/SSG/ISR), tested, linted, accessible, and deployable.
- Error modes: build failures, lint/type errors, failing tests, runtime exceptions.
- Success criteria: green CI, passing tests, no critical lint/type errors, automated deploy on merge.

## Quick assumptions
- This repo uses Next.js 13+ App Router (there is an `app/` folder).
- Package manager: pnpm (adjust commands if using npm or yarn).

## Starter commands
Install base deps (example):

```powershell
# Install core deps
pnpm add react react-dom next
# Install TypeScript and types (dev)
pnpm add -D typescript @types/react @types/node
```

Common dev tools:

```powershell
pnpm add -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
pnpm add -D vitest @testing-library/react
pnpm add -D husky lint-staged
```

## Recommended stack (pick what you need)
- Framework: Next.js (App Router) with TypeScript
- Styling: Tailwind CSS OR CSS Modules / Styled Components / Stitches
- Data fetching and caching: native fetch in server components, React Query or SWR for client-cache; use Zod for validations
- State: React Context + local state, Zustand or Jotai for lightweight global state, Redux Toolkit only if complex
- Forms: React Hook Form + Zod resolver
- Auth: NextAuth.js (good for OAuth/JWT) or third-party (Clerk) for auth flows
- Testing: Vitest or Jest + React Testing Library; Playwright for E2E
- CI/CD: GitHub Actions; deploy to Vercel or other (Netlify, Render)

## Project structure (Best Practice)

Here's a clean and scalable structure for production applications:

```
frontend/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── (auth)/              # Auth-related routes (grouped)
│   │   ├── layout.tsx       # Auth layout
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (dashboard)/         # Protected routes (grouped)
│   │   ├── layout.tsx       # Dashboard layout
│   │   ├── page.tsx         # Dashboard home
│   │   ├── settings/page.tsx
│   │   └── profile/page.tsx
│   ├── api/                 # API routes (if needed)
│   │   ├── auth/route.ts
│   │   ├── users/route.ts
│   │   └── [id]/route.ts
│   └── globals.css
│
├── components/              # Reusable UI components
│   ├── ui/                  # UI primitives (buttons, inputs, modals, cards, etc.)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   └── card.tsx
│   ├── layout/              # Layout components (navbar, sidebar, header, footer)
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── forms/               # Form-specific components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── SettingsForm.tsx
│   └── charts/              # Reusable chart components (if needed)
│       ├── BarChart.tsx
│       └── LineChart.tsx
│
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts
│   ├── useFetch.ts
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
│
├── lib/                     # Utility and helper functions
│   ├── api.ts               # Axios or Fetch wrapper
│   ├── constants.ts         # App-wide constants
│   ├── utils.ts             # General utilities
│   └── auth.ts              # Auth helpers
│
├── services/                # API integration layer (business logic)
│   ├── user.service.ts      # User API calls
│   ├── auth.service.ts      # Auth API calls
│   └── dashboard.service.ts # Dashboard API calls
│
├── store/                   # Global state management (Zustand or Redux)
│   ├── useUserStore.ts
│   ├── useAuthStore.ts
│   └── useUIStore.ts
│
├── styles/                  # Global styles and theme
│   ├── globals.css          # Tailwind directives
│   ├── variables.css        # CSS variables (colors, spacing)
│   └── theme.css            # Theme customizations
│
├── public/                  # Static assets (not versioned)
│   ├── icons/
│   ├── images/
│   └── favicon.ico
│
├── tests/                   # Test files (optional)
│   ├── unit/
│   └── e2e/
│
├── .env.local               # Environment variables (local, not committed)
├── .env.example             # Environment template (committed)
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── eslintrc.json
├── .prettierrc
├── package.json
└── pnpm-lock.yaml
```

**Key principles:**
- Keep `app/` for route-level layouts and server components.
- Use `components/` for reusable UI primitives and layout.
- Group related routes using route groups (parentheses): `(auth)`, `(dashboard)`.
- `services/` handles all backend API communication.
- `store/` manages global UI state (user, auth, theme).
- `lib/` contains pure utility functions and helpers.

## TypeScript
- Enable strict mode (`tsconfig.json`: "strict": true).
- Use `types/` or `@types` for shared domain types.
- Use Zod for runtime validation + TypeScript inference.

## Linting & Formatting

Enforce consistent code style and catch errors early.

**Install ESLint and Prettier:**

```powershell
pnpm add -D eslint prettier eslint-config-next eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks
```

**`.eslintrc.json`:**

```json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "@next/next/no-img-element": "warn"
  }
}
```

**`.prettierrc`:**

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100
}
```

**Update `package.json` scripts:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "type-check": "tsc --noEmit"
  }
}
```

**Setup Husky + Lint-Staged (optional but recommended):**

```powershell
pnpm add -D husky lint-staged
npx husky install
```

Create `.husky/pre-commit`:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

Create `.lintstagedrc.json`:

```json
{
  "**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "**/*.{json,md}": ["prettier --write"]
}
```

## Absolute Imports

Already enabled by default in Next.js via `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Now you can import from anywhere:

```ts
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useUserStore } from "@/store/useUserStore";
```

## Styling with Tailwind CSS

Tailwind is already included by default in modern Next.js setups. Customize your theme in `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        success: "#10b981",
        danger: "#ef4444",
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
export default config
```

**Best practices:**
- Use utility classes for styling: `className="flex items-center justify-between p-4 bg-primary text-white"`
- For repeated patterns, extract to components (e.g., `<Card>`, `<Button>`).
- Use CSS variables in `styles/variables.css` for dynamic theming.
- Leverage `next/font` for font optimization and self-hosting.

### ShadCN UI (Highly Recommended)

A production-ready UI component library built on Tailwind and Radix UI.

**Install:**

```powershell
pnpm dlx shadcn@latest init
```

**Add individual components:**

```powershell
pnpm shadcn add button input card dialog form
```

**Usage example:**

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  return (
    <div className="space-y-4">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button className="w-full">Sign In</Button>
    </div>
  );
}
```

Benefits:
- Accessible, tested components.
- Fully customizable with Tailwind.
- Dark mode support out of the box.
- No JavaScript overhead for basic components.

## Core Tools Setup (Step-by-step)

### State Management: Zustand

For small to medium apps, Zustand is lightweight and powerful.

**Install:**

```powershell
pnpm add zustand
```

**Example: `store/useUserStore.ts`**

```ts
import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

**Usage in a component:**

```tsx
'use client';
import { useUserStore } from '@/store/useUserStore';

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### API Layer: Axios

Use a single, centralized API wrapper for all backend calls.

**Install:**

```powershell
pnpm add axios
```

**Example: `lib/api.ts`**

```ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  withCredentials: true, // For cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (redirect to login)
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

**Example service: `services/auth.service.ts`**

```ts
import api from '@/lib/api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: { id: string; email: string; name: string };
  token: string;
}

export const authService = {
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const res = await api.post('/auth/login', data);
    return res.data;
  },

  register: async (data: LoginPayload & { name: string }): Promise<AuthResponse> => {
    const res = await api.post('/auth/register', data);
    return res.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};
```

**Use in components:**

```tsx
'use client';
import { authService } from '@/services/auth.service';
import { useUserStore } from '@/store/useUserStore';

export default function LoginForm() {
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { user, token } = await authService.login({ email, password });
      localStorage.setItem('authToken', token);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // Call handleLogin
    }}>
      {/* Form inputs */}
    </form>
  );
}
```

### Forms: React Hook Form + Zod

For robust form validation and submission.

**Install:**

```powershell
pnpm add react-hook-form zod @hookform/resolvers
```

**Example form with validation:**

```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be 6+ characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register('email')}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  );
}
```

## Images & assets
- Use `next/image` for automatic optimization where supported. For public/static assets, use the `public/` directory.
- Prefer external CDN for heavy assets and set appropriate caching headers.

## App Router specifics
- Server components (default): do data fetching on the server when possible.
- Client components: mark with `'use client'` when you need hooks, state, or browser-only APIs.
- Use `fetch` with Next's caching options and `revalidate` to implement ISR-like behavior.
- Use `error.js` and `not-found.js` under a route folder for error UI.

Example data fetching (server component):

```ts
// server component
const data = await fetch('https://api.example.com/posts', { next: { revalidate: 60 } });
```

Client component (use hooks):

```tsx
'use client'
import { useState } from 'react'
```

## API routes & route handlers
- Put API endpoints under `app/api/.../route.ts` when using the App Router.
- Keep logic thin in route handlers; delegate heavy lifting to `lib/` functions.
- Validate input (Zod) and sanitize outputs.

## Security
- Use environment variables for secrets and never commit them.
- Implement CSP headers via middleware or hosting platform and set `X-Frame-Options` and `Strict-Transport-Security` as needed.
- Sanitize HTML or user input to prevent XSS.
- For cookies, use secure flags (HttpOnly, Secure, SameSite).

## Environment variables

Use environment variables to manage configuration across environments.

**Setup:**
- Create `.env.local` for local secrets (Git-ignored).
- Create `.env.example` as a template (committed to repo).
- In Next.js, use `process.env.MY_VAR` for server code.
- Prefix `NEXT_PUBLIC_` for variables exposed to the browser.

**.env.example** (commit this):

```
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=MyApp
DATABASE_URL=postgresql://user:pass@localhost:5432/db
SECRET_KEY=your-secret-key-here
```

**.env.local** (do NOT commit):

```
NEXT_PUBLIC_API_URL=http://localhost:3001
DATABASE_URL=postgresql://dev:dev@localhost:5432/dev_db
SECRET_KEY=dev-secret
```

**Usage in code:**

```ts
// Server-side: safe for secrets
const dbUrl = process.env.DATABASE_URL;

// Client-side: only public vars
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

**Best practices:**
- Never commit `.env.local` or sensitive keys.
- Always provide `.env.example` as documentation.
- In production, use your hosting platform's secrets management (Vercel, Docker, AWS Secrets Manager).

## Performance
- Use server components and SSR judiciously to reduce client JS.
- Use dynamic imports for heavy client-only libs: `const Editor = dynamic(() => import('./Editor'), { ssr: false })`.
- Bundle analyze with `next build && next analyze` (add `@next/bundle-analyzer`).
- Optimize images, fonts, and avoid large polyfills.

## Internationalization (i18n)
- Use Next.js built-in i18n config or a library like `next-intl`.
- Localize routes, metadata, and content. Handle fallback locales.

## Analytics & Monitoring
- Add analytics with a script tag using correct loading `strategy` (e.g., afterInteractive) or use server-side tracking where appropriate.
- Use Sentry or similar for error monitoring. Initialize Sentry only in server/runtime where needed.

## Testing
- Unit + component tests: Vitest or Jest + React Testing Library.
- Small test example (Vitest + RTL): test rendering a component and simple interactions.
- E2E: Playwright recommended for cross-browser E2E.

Quick vitest setup script example in `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

## CI / CD (GitHub Actions example)
- Steps: checkout, install (pnpm i), type-check, lint, test, build, and deploy.
- Run builds on PRs and the `main` branch. Require status checks before merge.

CI quality gates:
- Build: PASS/FAIL
- Lint/Typecheck: PASS/FAIL
- Tests: PASS/FAIL

## Deployment
- Vercel: easiest for Next.js; set environment variables in the dashboard.
- For other hosts, ensure Node version and build settings are correct.
- Use preview deployments for PRs.

## Observability & logging
- Centralize logs (server-side) with structured logs (JSON) to facilitate parsing.
- Use correlation IDs for requests if microservices or external APIs are involved.

## Error handling & UX
- Use `error.js` and boundary components to provide friendly messages.
- Log technical details to server logs and surface safe messages to users.

## Accessibility (a11y)
- Use semantic HTML.
- Test with axe (jest-axe or Playwright accessibility checks).
- Ensure keyboard navigation and screen-reader compatibility.

## Developer DX & git workflow
- Use branch-per-feature, PRs, and descriptive commit messages (Conventional Commits optional).
- Add `CODEOWNERS` for critical paths.
- Pre-commit hooks: `husky` + `lint-staged` to run `eslint --fix` and `prettier --write`.

## Recommended packages (non-exhaustive)

| Feature | Recommended Tool | Installation |
|---------|------------------|--------------|
| **Core** | next, react, react-dom | `pnpm add next react react-dom` |
| **Types & tooling** | typescript, eslint, prettier | `pnpm add -D typescript eslint prettier` |
| **Styling** | tailwindcss, shadcn/ui | `pnpm add tailwindcss` + `pnpm dlx shadcn init` |
| **State management** | zustand or jotai | `pnpm add zustand` |
| **Validation** | zod | `pnpm add zod` |
| **Forms** | react-hook-form | `pnpm add react-hook-form @hookform/resolvers` |
| **API & data fetching** | axios, swr, or react-query | `pnpm add axios` |
| **Auth** | next-auth or Clerk | `pnpm add next-auth` |
| **Testing (unit/component)** | vitest or jest, @testing-library/react | `pnpm add -D vitest @testing-library/react` |
| **Testing (E2E)** | playwright | `pnpm add -D @playwright/test` |
| **Analytics** | vercel/analytics or PostHog | `pnpm add @vercel/analytics` |
| **Error tracking** | sentry | `pnpm add @sentry/nextjs` |
| **Utilities** | classnames, clsx | `pnpm add classnames` |

## PR checklist

Use this template for every pull request:

- [ ] Branch from `main` is up-to-date
- [ ] Typecheck (`pnpm type-check`) passes
- [ ] Lint (`pnpm lint:fix`) passes
- [ ] Tests written and passing locally (`pnpm test`)
- [ ] New API services documented in `services/`
- [ ] New UI components added to `components/` and reusable
- [ ] State updates handled with Zustand if global
- [ ] Forms validated with Zod + React Hook Form
- [ ] Images optimized and using `next/image`
- [ ] A11y checks done (keyboard nav, ARIA labels, semantic HTML)
- [ ] Performance: no large bundle size additions, images compressed
- [ ] Security: no secrets in code, input validated, sanitized outputs
- [ ] `.env.example` updated if new env vars added
- [ ] Changelog or commit message describes the feature/fix

## Troubleshooting & tips
- If build fails, run `pnpm build` locally to reproduce.
- For weird runtime errors in production, check Vercel logs (or host logs) and trace using source maps if enabled.
- Use `next dev` for local development and `next build && next start` for production-like testing.

## Optional Add-ons for "Solid" Frontend

Depending on your project needs, consider these enhancements:

| Feature | Tool | When to use |
|---------|------|-------------|
| **Authentication** | NextAuth.js, Clerk, Auth0 | User login/signup, OAuth (Google, GitHub) |
| **Data fetching** | SWR or React Query | Client-side caching, real-time updates |
| **Component library** | ShadCN/UI, Radix UI | Pre-built, accessible components |
| **Monitoring** | Sentry | Error tracking and performance monitoring |
| **Analytics** | Vercel Analytics, PostHog | User behavior and traffic insights |
| **Component stories** | Storybook | Document and test components in isolation |
| **Database ORM** | Prisma, Drizzle | Type-safe database queries |
| **API validation** | Zod, Yup | Schema validation for API inputs |
| **Internationalization** | next-intl, i18next | Multi-language support |
| **Email** | SendGrid, Nodemailer | Transactional and marketing emails |
| **Real-time** | Socket.io, Pusher | WebSocket-based features |
| **Search** | Algolia, MeiliSearch | Fast, indexed search |
| **File uploads** | Uploadthing, AWS S3 | User file storage |
| **Payments** | Stripe, PayPal | Billing and subscriptions |

## Production Build & Optimization

**Local testing before deployment:**

```powershell
# Build for production
pnpm build

# Start production server locally
pnpm start
```

**Performance tips:**
- Use `next/image` for automatic image optimization.
- Leverage `next/font` for self-hosted fonts (faster than Google Fonts CDN).
- Use dynamic imports for heavy components: `const Editor = dynamic(() => import('./Editor'), { ssr: false })`
- Enable compression in your hosting platform.
- Consider using `@next/bundle-analyzer` to identify large dependencies.

**Example `next.config.mjs`:**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.example.com', 'cdn.example.com'],
  },
  compress: true,
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundle
  swcMinify: true, // Use SWC for minification (default in modern Next.js)
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
```

## Deployment

### Vercel (Recommended for Next.js)

Vercel is optimized for Next.js and requires zero configuration:

1. **Push to GitHub** (main branch).
2. **Connect on Vercel dashboard**: https://vercel.com
3. **Set environment variables** in Vercel dashboard (Project Settings → Environment Variables).
4. **Deploy**: Automatic on push to main, preview on PR.

### Docker deployment

For self-hosted deployments:

**`Dockerfile`:**

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]
```

**Build and run:**

```powershell
docker build -t my-nextjs-app .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://api.example.com my-nextjs-app
```

### Other hosting platforms

- **Netlify**: Configure `functions/` for serverless or use `_next/` static export.
- **AWS Amplify**: Push to main branch for automatic deployments.
- **Railway, Render, or Fly.io**: Deploy from Git with automatic CI/CD.

## Edge cases & common pitfalls

- **Large server responses** causing slow SSR; paginate or stream where possible.
- **Secrets accidentally committed**; rotate immediately if leaked.
- **Browser-only libraries in server components**; must be wrapped in `'use client'` or dynamically loaded.
- **Race conditions** with hydration when mixing server data and client caches.
- **stale-while-revalidate** behavior: test ISR/revalidation thoroughly in staging.

## Next steps & living doc

Keep this `guideline.md` in the repo and update it as the project evolves:

- Add component templates (Button, Card, Modal with ShadCN).
- Add API service examples (fetch user, create post, etc.).
- Add authentication flow (login/register/logout).
- Add testing examples (unit, component, E2E).
- Document CI/CD workflow (GitHub Actions).
- Create a `.env.example` file.

---

**Quick checklist for new features:**

- [ ] Feature branch created from `main`
- [ ] Types defined (TypeScript interfaces)
- [ ] Components created or reused
- [ ] API service/handler added
- [ ] Forms validated with Zod
- [ ] Tests written (unit or integration)
- [ ] Linting and type-check pass
- [ ] Performance checked (images, bundle size)
- [ ] Accessibility verified (keyboard nav, ARIA)
- [ ] PR reviewed and approved
- [ ] Merged to main and deployed
