## 2024-05-18 - Featured Menu Cards Lacked Keyboard A11y
**Learning:** Featured cards on the homepage used generic `div` tags with `onClick` handlers but lacked keyboard interactions, meaning screen readers and keyboard users could not interact with them.
**Action:** Added `role="button"`, `tabIndex={0}`, an `aria-label`, an `onKeyDown` handler to capture Enter/Space keys, and visual focus states using `focus-visible:ring` to make interactive card patterns fully accessible.

## 2024-05-18 - Order Draft Forms Lacked Lazy State Initializers
**Learning:** Initializing form states like Name, Date, and Phone via `useEffect` was triggering ESLint errors (`react-hooks/set-state-in-effect`) and causing multiple component re-renders during the initial mount.
**Action:** Replaced `useEffect` updates with lazy initializer callbacks in the `useState` hook for `formData` and date options to cleanly load the data from `localStorage` without cascading re-renders.

## 2024-05-18 - Page Scroll To Missing IDs
**Learning:** The "Mulai Belanja" button on the empty state cart view attempted to call `.scrollIntoView` on an element with ID `menu-selection`, which did not exist, leading to a broken click interaction.
**Action:** Always verify that scroll targets and anchor links refer to valid IDs in the document. Adding the correct ID and a scroll margin (`scroll-mt-24`) fixed the broken interaction and handled the sticky header layout perfectly.

## 2024-05-18 - Missing Semantic State on Custom Tabs
**Learning:** Custom tab-like buttons used for filtering categories (in Menu and Order pages) used dynamic classes to indicate visual selection, but lacked `aria-pressed` states. Screen reader users would not know which filter was currently active.
**Action:** Always add `aria-pressed={state === id}` to buttons that act as toggles or tabs to communicate the active selection state semantically.

## 2024-05-18 - Invalid Tailwind Class Caused Invisible Text
**Learning:** Using `text-white-600` in `Menu.jsx` (which is not a valid Tailwind color shade since white has no shades) caused the text color to fall back to default white on a white background, making the description text completely invisible.
**Action:** Always verify color utility class names against the Tailwind documentation or use auto-completion tools to prevent invisible text contrast bugs.

## 2026-05-02 - Mobile Menu Accessibility
**Learning:** React state-driven toggles like mobile menus need ARIA attributes to communicate their state to screen readers, especially `aria-expanded` dynamically bound to the state and `aria-controls` pointing to the ID of the toggled element.
**Action:** Always ensure that interactive UI elements have appropriate ARIA attributes connecting the trigger to the content and communicating current state.

## $(date +%Y-%m-%d) - [Added AutoComplete to Forms]
**Learning:** Found that basic form fields (Name, Phone) were missing `autoComplete` attributes, increasing friction for users, especially on mobile, when completing an order/reservation.
**Action:** Always include `autoComplete` tags (like `name` and `tel`) to satisfy WCAG 1.3.5 ("Identify Input Purpose") and speed up user input.

## 2026-06-14 - [Added aria-current to Active Links]
**Learning:** Navigation links mapped over an array lacked an `aria-current="page"` attribute when active, which meant screen reader users were not semantically informed of their current active state, only sighted users could see the visual indicator.
**Action:** Always include `aria-current={isActive ? 'page' : undefined}` to navigation links to semantically communicate active status to assistive technologies.
