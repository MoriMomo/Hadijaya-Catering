import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const NavButton = ({ to, label, active, isCta }) => {
    if (isCta) {
        return (
            <Link
                to={to}
                aria-current={active ? 'page' : undefined}
                className="bg-orange-600 hover:bg-orange-700 text-white visited:text-white no-underline px-6 py-2 rounded-full font-semibold transition-colors duration-200 text-sm w-full md:w-auto shadow-md block text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
                {label}
            </Link>
        );
    }

    return (
        <Link
            to={to}
            aria-current={active ? 'page' : undefined}
            className={`transition-colors duration-200 text-sm font-medium py-2 px-4 rounded-lg w-full md:w-auto text-left md:text-center block no-underline visited:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${active ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
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
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 md:gap-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
                    >
                        <OptimizedImage
                            src="../images/hadijaya/makanan/hadijaya-catering-logo.jpeg"
                            fallback="/images/placeholder.svg"
                            alt="Hadijaya Catering Logo"
                            className="h-10 md:h-12"
                            width={100}
                            height={48}
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 lg:gap-12">
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
                            className="p-2 text-slate-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div id="mobile-menu" className="md:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto h-screen animate-fade-in border-t border-slate-100 pb-20">
                    <div className="px-6 py-6 space-y-4">
                        {navItems.map(item => (
                            <div key={item.id} className="border-b border-slate-50 pb-2 last:border-0" onClick={() => setMobileMenuOpen(false)}>
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