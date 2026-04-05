import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './styles/designSystem.css' // Design system and tokens
import './index.css' // <--- THIS LINE IS REQUIRED FOR TAILWIND TO WORK
import { errorTracker } from './utils/errorTracker'

// Initialize error tracking in development
errorTracker.init();

// Log 404 summary after 5 seconds (gives time for images to load)
if (import.meta.env.DEV) {
  setTimeout(() => errorTracker.logSummary(), 5000);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)