import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { useCart } from '../context/CartContext';

const NavButton = ({ to, label, active, isCta }) => {
    if (isCta) {
        return (
            <Link
                to={to}
                className="bg-accent-400 hover:bg-accent-500 text-white visited:text-white no-underline px-8 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm w-full md:w-auto shadow-md hover:shadow-lg block text-center focus:outline-none hover:-translate-y-0.5"
            >
                {label}
            </Link>
        );
    }

    return (
        <Link
            to={to}
            aria-current={active ? "page" : undefined}
            className={`transition-all duration-300 text-sm font-medium py-2 px-4 rounded-lg w-full md:w-auto text-left md:text-center block no-underline focus:outline-none relative group ${active ? 'text-accent-400 font-semibold' : 'text-slate-600 hover:text-accent-400'
                }`}
        >
            {label}
            {/* Subtle bottom border hover effect */}
            <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent-400 transform origin-left transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} rounded-full opacity-80`} />
        </Link>
    );
};

const CartBadge = ({ count, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="relative p-2 text-slate-600 hover:text-accent-500 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 rounded-full hover:bg-accent-50"
            aria-label="View Cart"
        >
            <ShoppingBag className="w-6 h-6" />
            {count > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full animate-fade-in shadow-sm min-w-[20px] h-[20px]">
                    {count}
                </span>
            )}
        </button>
    );
};

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 8);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = [
        { id: 'home', label: 'Beranda', to: '/' },
        { id: 'menu', label: 'Menu & Harga', to: '/menu' },
        { id: 'about', label: 'Tentang Kami', to: '/about' },
        { id: 'order', label: 'Reservasi', to: '/order', isCta: true }
    ];

    return (
        <nav className={`sticky top-0 z-50 glass-nav transition-all duration-300 ${isScrolled ? 'shadow-md border-b border-slate-200/80' : 'border-b border-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 md:gap-3 cursor-pointer group"
                    >
                        <OptimizedImage
                            src="/images/hadijaya/makanan/hadijaya-catering-logo.webp"
                            fallback="/images/placeholder.svg"
                            alt="Hadijaya Catering Logo"
                            className="h-10 md:h-12"
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
                        <div className="pl-4 border-l border-slate-200">
                            <CartBadge count={cartCount} onClick={() => navigate('/order#order-summary')} />
                        </div>
                    </div>

                    {/* Mobile Menu & Cart */}
                    <div className="md:hidden flex items-center gap-3">
                        <CartBadge count={cartCount} onClick={() => {
                            setMobileMenuOpen(false);
                            navigate('/order#order-summary');
                        }} />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-600 hover:text-accent-400 bg-slate-50 hover:bg-accent-50 rounded-lg transition-all duration-200 focus:outline-none border border-slate-200"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-16 bg-slate-50 z-40 overflow-y-auto h-screen animate-fade-in border-t border-slate-200 pb-20 shadow-inner">
                    <div className="px-6 py-6 space-y-4">
                        {navItems.map(item => (
                            <div key={item.id} className="border-b border-slate-200/50 pb-2 last:border-0" onClick={() => setMobileMenuOpen(false)}>
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