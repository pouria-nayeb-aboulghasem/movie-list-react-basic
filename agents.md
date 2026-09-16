# AGENTS.md

## 1. Project Overview

This is a production-grade React + TypeScript application.

The primary goals are:

* Clean and maintainable architecture
* Strong TypeScript typing
* Reusable components
* Minimal unnecessary code
* Predictable state management
* Clear separation of UI, business logic, and API communication
* Avoid unnecessary dependencies
* Avoid unnecessary project-wide analysis

---

# 2. AI Working Rules

## IMPORTANT

Do NOT analyze or scan the entire project for every task.

Before making changes:

1. Read this `AGENTS.md`.
2. Identify the smallest set of files relevant to the request.
3. Inspect only those files and their direct dependencies.
4. Make the smallest safe change.
5. Do not refactor unrelated code.
6. Do not rename files, folders, variables, or components unless explicitly required.
7. Do not introduce new libraries when the existing project can solve the problem.
8. Do not modify configuration files unless the task requires it.
9. Do not inspect unrelated folders just to "understand the project".
10. Preserve existing architectural decisions.

### Scope-first rule

Start with:

```text
User request
    ↓
Identify affected feature
    ↓
Identify directly related files
    ↓
Read only those files
    ↓
Implement
    ↓
Validate affected area
```

Do NOT start with:

```text
Scan entire repository
→ Read every component
→ Read every API
→ Read every configuration
→ Analyze entire architecture
```

---

# 3. Repository Exploration Strategy

Use targeted exploration.

### First inspect

```text
package.json
tsconfig.json
src/
```

Only inspect additional files when necessary.

### When modifying a component

Normally inspect:

```text
Component
Related CSS / CSS Module
Directly used types
Directly used hooks
Directly used API/service
Direct parent component if needed
```

Do not inspect unrelated features.

### When modifying an API

Inspect:

```text
API function
API endpoint definition
Request/response types
Direct consumer(s)
Relevant error handling
```

Do not inspect every API in the application.

### When modifying global state

Inspect:

```text
Relevant store/context
Relevant types
Direct consumers
Direct actions/selectors
```

Do not inspect unrelated state.

---

# 4. Existing Architecture Has Priority

The existing project architecture is the source of truth.

Before introducing a new pattern:

* Look for an existing pattern in the same feature.
* Follow the existing convention.
* Do not create a second architecture for the same problem.

For example, if the project already has:

```text
components/
hooks/
services/
types/
configs/
constants/
stores/
```

use those conventions instead of introducing:

```text
repositories/
usecases/
domains/
facades/
```

unless explicitly requested.

---

# 5. Technology Rules

Use the technologies already installed in the project.

Primary stack:

* React
* TypeScript
* Vite
* CSS / CSS Modules / existing styling solution
* Existing state-management solution
* Existing API solution

Do not replace existing technologies unless explicitly requested.

Do not introduce:

* Redux
* Zustand
* TanStack Query
* Axios
* React Query
* UI libraries
* Utility libraries

unless the project already uses them or the user explicitly requests them.

---

# 6. TypeScript Rules

TypeScript must be treated as a first-class part of the architecture.

## Prefer

```ts
type User = {
  id: number;
  name: string;
};
```

or:

```ts
interface User {
  id: number;
  name: string;
}
```

Follow the existing project convention.

## Avoid

```ts
any
```

unless there is a strong technical reason.

Prefer:

```ts
unknown
```

when the type is genuinely unknown.

Do not use unsafe type assertions merely to silence TypeScript.

Avoid:

```ts
const data = response as User;
```

unless the runtime contract is known and the assertion is justified.

---

# 7. Component Rules

Components should have a single clear responsibility.

Prefer:

```text
components/
    Button/
        Button.tsx
        Button.module.css
        Button.types.ts
```

when the component is sufficiently complex.

For very small components, do not create unnecessary files.

### Component naming

Use PascalCase:

```text
ProductCard
UserProfile
ShoppingCart
```

Files should normally match the component:

```text
ProductCard.tsx
UserProfile.tsx
```

---

# 8. React Rules

Prefer functional components.

Use hooks appropriately.

Avoid unnecessary:

```ts
useMemo
useCallback
useEffect
```

Do not use `useEffect` for calculations that can be performed during rendering.

Bad:

```tsx
useEffect(() => {
  setTotal(price * quantity);
}, [price, quantity]);
```

Prefer:

```tsx
const total = price * quantity;
```

Use `useEffect` primarily for synchronization with external systems.

---

# 9. State Management

Do not put all application data into global state.

Classify state before deciding where it belongs.

### Local UI state

Examples:

```text
modal open/close
input value
dropdown state
selected tab
temporary form state
```

Keep these inside the component when possible.

### Global client state

Examples:

```text
authentication UI state
shopping cart
user preferences
theme
```

Use the project's existing global state solution.

### Server state

Examples:

```text
products
orders
users from API
inventory
```

Do not automatically put server data into global client state.

Use the project's existing server-state/API strategy.

---

# 10. API Rules

API communication must be separated from UI components.

Avoid:

```tsx
function ProductList() {
  // large fetch implementation
}
```

Prefer:

```text
services/
    productService.ts
```

Example:

```ts
export async function getProducts(): Promise<Product[]> {
  // API request
}
```

Components should consume the API layer rather than implementing API details.

---

# 11. API Error Handling

API functions must account for failures.

Do not assume every request succeeds.

Handle:

* Network errors
* HTTP errors
* Invalid responses
* Authentication errors
* Unexpected server responses

Do not silently swallow errors.

Avoid:

```ts
try {
  await getProducts();
} catch {}
```

unless intentionally handled and documented.

---

# 12. Types Organization

Use the project's existing type organization.

If centralized types exist:

```text
src/types/
```

prefer them over redefining the same type in multiple files.

Avoid duplicate definitions such as:

```ts
type Product = ...
```

in several unrelated files.

Reuse shared types.

---

# 13. Constants and Configuration

Application constants should not be scattered throughout components.

Use the existing:

```text
constants/
configs/
```

structure when appropriate.

Examples:

```ts
export const storageKeys = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
} as const;
```

and:

```ts
export const apiEndpoints = {
  products: "/products",
  users: "/users",
} as const;
```

Do not create constants for trivial one-time values.

---

# 14. Environment Variables

Never hard-code:

* API URLs
* Secrets
* Tokens
* Credentials
* Private keys

Use the project's environment-variable mechanism.

Never commit secrets.

---

# 15. Styling Rules

Follow the existing styling architecture.

If the project uses CSS Modules:

```text
Button.tsx
Button.module.css
```

Use:

```tsx
import styles from "./Button.module.css";
```

Do not introduce Tailwind, styled-components, Bootstrap, or another styling system unless explicitly requested.

Avoid inline styles for reusable styling.

---

# 16. Path Aliases

If the project defines an alias such as:

```text
@
```

use it consistently.

Prefer:

```ts
import Button from "@/components/Button";
```

instead of:

```ts
import Button from "../../../components/Button";
```

Do not modify alias configuration unless necessary.

---

# 17. Folder Structure

Respect the existing folder structure.

A typical structure may look like:

```text
src/
├── assets/
├── components/
├── configs/
├── constants/
├── hooks/
├── layouts/
├── pages/
├── services/
├── stores/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

This is a guideline, not a requirement.

Do not reorganize the project simply to make it "cleaner".

---

# 18. Reusability

Create reusable code when there is a real reuse case.

Do not abstract code prematurely.

Bad:

```text
Create 5 layers for a function used once.
```

Prefer:

```text
Simple code first
→ Identify real duplication
→ Extract reusable abstraction
```

---

# 19. Avoid Overengineering

Prefer the simplest solution that satisfies the requirement.

Do not introduce:

* unnecessary design patterns
* unnecessary abstractions
* unnecessary interfaces
* unnecessary wrapper components
* unnecessary custom hooks
* unnecessary generic utilities
* unnecessary state layers

Production-quality code does not mean maximum complexity.

---

# 20. Backward Compatibility

When modifying existing code:

* Preserve existing behavior unless the task requires changing it.
* Avoid breaking public component APIs.
* Avoid changing API contracts.
* Avoid changing shared types unnecessarily.
* Avoid changing unrelated behavior.

If a breaking change is unavoidable, clearly state it before implementing it.

---

# 21. Dependency Rules

Before adding a dependency:

1. Check whether the project already has a dependency that solves the problem.
2. Check whether the problem can be solved cleanly with native browser APIs or existing utilities.
3. Only then consider adding a new package.

Do not install packages automatically unless explicitly authorized or clearly required.

---

# 22. File Modification Rules

Only modify files required for the task.

Before editing a file, determine:

```text
Is this file directly related?
```

If the answer is no, do not modify it.

Avoid large unrelated formatting changes.

Avoid changing line endings or formatting across the repository.

---

# 23. Validation

After implementation, validate only the affected area first.

Preferred order:

```text
1. TypeScript errors
2. Lint
3. Relevant tests
4. Build
```

Do not run expensive full-project operations unless:

* the change affects shared infrastructure,
* the user requests full validation,
* or the affected area cannot be validated locally.

If a command is unavailable, do not invent its result.

---

# 24. Existing Errors

Do not "fix" unrelated existing errors.

If validation reveals errors that existed before the change:

* Do not modify unrelated files.
* Mention them separately.
* Clearly distinguish existing errors from errors introduced by the change.

---

# 25. Comments

Write comments only when they explain something that is not obvious from the code.

Avoid comments like:

```ts
// increment count
count++;
```

Prefer comments explaining:

```text
Why a workaround exists
Why a non-obvious decision was made
Why an unusual API behavior must be handled
```

---

# 26. Git Awareness

Do not reset, revert, or overwrite user changes.

Assume existing uncommitted changes are intentional.

Do not modify:

```text
.git/
```

Do not create commits unless explicitly requested.

---

# 27. Security

Never expose or commit:

* API keys
* passwords
* access tokens
* private credentials
* production secrets

Be careful with:

```text
.env
.env.local
.env.production
```

Never print secret values in logs or responses.

---

# 28. Performance

Do not optimize prematurely.

First ensure correctness.

Avoid unnecessary:

```text
re-renders
API calls
state updates
effects
large dependencies
```

When performance is actually an issue, measure or identify the bottleneck before optimizing.

---

# 29. Accessibility

New UI should follow basic accessibility principles.

Prefer semantic HTML:

```html
button
nav
main
header
form
label
```

instead of using generic:

```html
div
```

for everything.

Interactive elements must be keyboard accessible.

Images should have meaningful `alt` text when appropriate.

---

# 30. Responsive Design

New UI should work across:

```text
Mobile
Tablet
Desktop
```

unless the user explicitly specifies otherwise.

Do not introduce a new breakpoint system if the project already has one.

---

# 31. AI Response Rules

When completing a task:

### First

Briefly identify:

```text
What needs to change
Which files are likely affected
```

### Then

Inspect only the relevant files.

### Then

Implement the change.

### Finally

Report:

```text
Changed files
What changed
Validation performed
Any remaining issues
```

Do not provide unnecessary explanations about unrelated parts of the project.

---

# 32. Decision Priority

When making implementation decisions, use this priority:

```text
1. User's explicit request
2. Existing project architecture
3. Existing project conventions
4. TypeScript / React best practices
5. Simplicity and maintainability
6. Performance optimization
7. New abstractions
```

---

# 33. Important Anti-Patterns

Never do the following without explicit justification:

* Rewrite the project architecture
* Migrate state-management libraries
* Replace the styling system
* Replace the API layer
* Rename large numbers of files
* Move large folder structures
* Upgrade dependencies unrelated to the task
* Add a framework/library just for convenience
* Analyze every file for a small change
* Refactor unrelated code
* Fix unrelated bugs while implementing a feature
* Generate duplicate types
* Use `any` to bypass TypeScript errors
* Suppress errors without understanding them

---

# 34. Task Completion Checklist

Before finishing a task, verify:

* [ ] I understood the user's requested change.
* [ ] I inspected only relevant files.
* [ ] I followed the existing architecture.
* [ ] I avoided unnecessary dependencies.
* [ ] I avoided unrelated changes.
* [ ] I preserved existing behavior.
* [ ] I used proper TypeScript types.
* [ ] I handled relevant errors.
* [ ] I checked affected imports.
* [ ] I validated the affected area.
* [ ] I clearly reported what changed.

---

# 35. Final Principle

## Minimal Context. Minimal Changes. Maximum Correctness.

Do not analyze the entire repository unless the task genuinely requires repository-wide understanding.

The goal is not to understand every file.

The goal is to understand **exactly enough of the codebase to make the requested change safely and correctly.**
