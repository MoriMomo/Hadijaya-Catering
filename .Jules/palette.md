## 2024-05-18 - Featured Menu Cards Lacked Keyboard A11y
**Learning:** Featured cards on the homepage used generic `div` tags with `onClick` handlers but lacked keyboard interactions, meaning screen readers and keyboard users could not interact with them.
**Action:** Added `role="button"`, `tabIndex={0}`, an `aria-label`, an `onKeyDown` handler to capture Enter/Space keys, and visual focus states using `focus-visible:ring` to make interactive card patterns fully accessible.

## 2024-05-18 - Order Draft Forms Lacked Lazy State Initializers
**Learning:** Initializing form states like Name, Date, and Phone via `useEffect` was triggering ESLint errors (`react-hooks/set-state-in-effect`) and causing multiple component re-renders during the initial mount.
**Action:** Replaced `useEffect` updates with lazy initializer callbacks in the `useState` hook for `formData` and date options to cleanly load the data from `localStorage` without cascading re-renders.

## 2024-05-18 - Page Scroll To Missing IDs
**Learning:** The "Mulai Belanja" button on the empty state cart view attempted to call `.scrollIntoView` on an element with ID `menu-selection`, which did not exist, leading to a broken click interaction.
**Action:** Always verify that scroll targets and anchor links refer to valid IDs in the document. Adding the correct ID and a scroll margin (`scroll-mt-24`) fixed the broken interaction and handled the sticky header layout perfectly.
## 2026-05-02 - Mobile Menu Accessibility
**Learning:** React state-driven toggles like mobile menus need ARIA attributes to communicate their state to screen readers, especially `aria-expanded` dynamically bound to the state and `aria-controls` pointing to the ID of the toggled element.
**Action:** Always ensure that interactive UI elements have appropriate ARIA attributes connecting the trigger to the content and communicating current state.
