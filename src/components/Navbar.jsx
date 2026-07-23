import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const NavButton = ({ to, label, active, isCta }) => {
    if (isCta) {
        return (
            <Link
                to={to}
                aria-current={active ? "page" : undefined}
                className="bg-accent-600 hover:bg-accent-700 text-white font-bold px-6 py-2.5 rounded-full transition-all duration-200 text-sm w-full md:w-auto shadow-md block text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 no-underline"
            >
                {label}
            </Link>
        );
    }

    return (
        <Link
            to={to}
            aria-current={active ? "page" : undefined}
            className={`transition-colors duration-200 text-sm font-semibold py-2 px-4 rounded-lg w-full md:w-auto text-left md:text-center block focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 no-underline ${active ? 'bg-white/20 text-white font-bold' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
        >
            {label}
        </Link>
    );
};

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { id: 'home', label: 'Beranda', to: '/' },
        { id: 'menu', label: 'Menu & Harga', to: '/menu' },
        { id: 'about', label: 'Tentang Kami', to: '/about' },
        { id: 'order', label: 'Reservasi', to: '/order', isCta: true }
    ];

    return (
        <nav className="sticky top-0 z-50 bg-primary-900/95 backdrop-blur-md border-b border-primary-950/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo wrapped in white badge */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 md:gap-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xl bg-white px-4 py-2 shadow-sm hover:scale-102 transition duration-200 no-underline"
                    >
                        <OptimizedImage
                            src="/images/hadijaya/makanan/hadijaya-catering-logo.webp"
                            fallback="/images/placeholder.svg"
                            className="h-7 md:h-8 w-[58px] md:w-[67px] object-contain"
                            width={100}
                            height={48}
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navItems.map(item => (
                            <NavButton
                                key={item.id}
                                to={item.to}
                                label={item.label}
                                active={location.pathname === item.to}
                                isCta={item.isCta}
                            />
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div id="mobile-menu" className="md:hidden fixed inset-0 top-16 bg-primary-900/98 backdrop-blur-md z-40 overflow-y-auto h-screen animate-fade-in border-t border-primary-950/20 pb-20">
                    <div className="px-6 py-6 space-y-4">
                        {navItems.map(item => (
                            <div key={item.id} className="border-b border-primary-800/30 pb-2 last:border-0" onClick={() => setMobileMenuOpen(false)}>
                                <NavButton
                                    to={item.to}
                                    label={item.label}
                                    active={location.pathname === item.to}
                                    isCta={item.isCta}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;