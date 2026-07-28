import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Utensils } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const NavButton = ({ to, label, active, isCta }) => {
    if (isCta) {
        return (
            <Link
                to={to}
                aria-current={active ? "page" : undefined}
                style={{ color: '#FFFFFF' }}
                className="bg-accent-600 hover:bg-accent-700 active:bg-accent-800 !text-white font-bold px-6 py-2.5 rounded-full transition-all duration-200 text-sm w-full md:w-auto shadow-md hover:shadow-lg hover:-translate-y-0.5 block text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C3B2B] no-underline"
            >
                {label}
            </Link>
        );
    }

    return (
        <Link
            to={to}
            aria-current={active ? "page" : undefined}
            style={{ color: active ? '#FFFFFF' : '#FAF5EF' }}
            className={`transition-all duration-200 text-sm font-medium py-2 px-5 rounded-full w-full md:w-auto text-left md:text-center block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C3B2B] no-underline ${
                active
                    ? '!bg-white/20 !text-white font-bold shadow-sm border border-white/20 backdrop-blur-md'
                    : '!text-[#FAF5EF] hover:!text-white hover:bg-white/15'
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
        <header className="sticky top-0 z-50 bg-[#1A3A2A] backdrop-blur-md border-b border-[#2C523C] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo wrapped in cozy warm cream badge */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 md:gap-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 rounded-2xl bg-[#FAF6F0] px-4 py-2 shadow-sm border border-amber-900/10 hover:shadow-md hover:scale-[1.02] transition-all duration-200 no-underline"
                    >
                        <OptimizedImage
                            src="/images/hadijaya/makanan/hadijaya-catering-logo.webp"
                            fallback="/images/placeholder.svg"
                            className="h-7 md:h-8 w-[58px] md:w-[67px] object-contain"
                            width={100}
                            height={48}
                            alt="Hadijaya Catering Logo"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 bg-[#12281D]/70 p-1.5 rounded-full border border-white/10 shadow-inner">
                        {navItems.map(item => (
                            <NavButton
                                key={item.id}
                                to={item.to}
                                label={item.label}
                                active={location.pathname === item.to}
                                isCta={item.isCta}
                            />
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2.5 text-[#E8F0EA] hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div id="mobile-menu" className="md:hidden fixed inset-0 top-16 bg-[#163024]/98 backdrop-blur-lg z-40 overflow-y-auto h-screen animate-fade-in border-t border-white/10 pb-20">
                    <div className="px-6 py-6 space-y-3">
                        {navItems.map(item => (
                            <div key={item.id} className="pb-1" onClick={() => setMobileMenuOpen(false)}>
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
        </header>
    );
};

export default Navbar;