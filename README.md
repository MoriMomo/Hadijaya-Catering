# Hadijaya Catering Website

A modern, responsive catering website built with React + Vite, featuring menu browsing, reservations, and comprehensive error handling.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- 🍽️ Dynamic menu system with categories
- 📝 Online reservation system
- 🖼️ Optimized image loading with fallbacks
- 🛡️ Error boundaries for graceful error handling
- 🐛 Development error tracking for 404s
- ⚡ Fast performance with Vite

## 📊 Recent Performance Improvements

We've implemented comprehensive 404 error prevention and performance optimizations:

- ✅ **Optimized Image Loading:** Graceful fallbacks with lazy loading
- ✅ **Error Tracking:** Development-only 404 monitoring
- ✅ **Placeholder System:** SVG placeholders for all menu items
- ✅ **Error Boundaries:** Catch and handle runtime errors gracefully

See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for full details.

## 📂 Project Structure

```
hadijaya-catering/
├── public/
│   └── images/          # Product images and placeholders
├── src/
│   ├── components/      # Reusable React components
│   │   ├── ErrorBoundary.jsx
│   │   ├── OptimizedImage.jsx
│   │   ├── MenuCard.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Order.jsx
│   │   └── About.jsx
│   ├── constants/       # Static data
│   │   ├── data.js
│   │   └── testimonials.js
│   ├── utils/           # Utility functions
│   │   └── errorTracker.js
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── scripts/
│   └── generatePlaceholders.js  # Generate SVG placeholders
└── PERFORMANCE_GUIDE.md          # Performance optimization guide
```

## 🖼️ Adding Food Images

The site currently uses SVG placeholders. To add real food photos:

1. Take/acquire high-quality food photos (recommended: 800x600px)
2. Name them using kebab-case matching menu items:
   - `nasi-uduk-ijo.jpg`
   - `ayam-goreng.jpg`
   - `paket-a-nasi-uduk-ijo-daging-semur.jpg`
3. Place in `public/images/` directory
4. The app will automatically use JPGs over SVG placeholders

### Regenerate Placeholders
```bash
node scripts/generatePlaceholders.js
```

## 🐛 Development Error Tracking

In development mode, the app tracks all 404 errors:

1. Run `npm run dev`
2. Open browser console
3. After 5 seconds, view the **404 Error Summary**
4. Identify and fix missing resources

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **Icons:** Lucide React

## 📚 Documentation

- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Recent changes and implementations
- [PERFORMANCE_GUIDE.md](./PERFORMANCE_GUIDE.md) - Performance optimization guide

---

## React + Vite Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
