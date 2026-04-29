## 2025-04-29 - [Quantity Selector Accessibility & UI]
**Learning:** Found that the order quantity adjustment buttons lacked accessible labels in Indonesian and clear feedback when clicked or when disabled (min quantity 1).
**Action:** Added `aria-label` with descriptive Indonesian text, implemented `aria-live="polite"` for the quantity span to announce updates to screen readers, and added interactive visual feedback like `active:scale-95` and robust `disabled:` classes to make it clear that the button shouldn't be clicked. Used `focus-visible:` to support keyboard navigation.
