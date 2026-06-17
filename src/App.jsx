import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Order = lazy(() => import('./pages/Order'));
const About = lazy(() => import('./pages/About'));

const Loader = () => (
  <div className="py-16 text-center text-slate-500">
    Memuat konten...
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="font-sans antialiased text-slate-800 selection:bg-orange-200 selection:text-orange-900 overflow-x-hidden">
          <style>{`
          .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
          .font-serif { font-family: 'Playfair Display', serif; }
          .hero-pattern {
            background-color: #fdfbf7;
            background-image: radial-gradient(#065f46 0.5px, transparent 0.5px);
            background-size: 24px 24px;
          }
          .hover-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
          .hover-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
        `}</style>

          <div className="min-h-screen bg-stone-50 flex flex-col">
            <Navbar />

            <main className="flex-1">
              <Suspense fallback={<Loader />}>
                <Routes>
                  {/* Customer Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/about" element={<About />} />

                  {/* Catch all - redirect to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />

            <a
              href="https://wa.me/628111040342"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat WhatsApp"
              className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all hover:scale-110 z-50 flex items-center gap-2 md:gap-3 group border-2 md:border-4 border-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:scale-110"
            >
              <MessageCircle className="w-5 h-5 md:w-7 md:h-7" />
              <span className="max-w-0 overflow-hidden md:group-hover:max-w-xs md:group-focus-visible:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-bold text-sm md:text-lg">
                Chat WhatsApp
              </span>
            </a>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
};


export default App;
