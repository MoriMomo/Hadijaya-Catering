import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.png';

// Navbar component
// - `NavButton`: helper for rendering each navigation button with 3 variants:
//     * isExit -> an exit/logout-style button (used by admin to leave admin view)
//     * isCta  -> primary call-to-action (Reservasi) shown as a pill with shadow
//     * default -> regular nav item; `active` toggles highlight/underline
// - `Navbar` props:
//     * role: 'customer' | 'admin'  (controls which nav items are shown)
//     * currentView: string         (id of currently active view, used for active styling)
//     * onViewChange(viewId): func  (called when a nav item is clicked)
//     * onRoleChange(role): func    (used by the exit action to switch role)
// Desktop shows inline nav items; on small screens a mobile menu toggle opens a full-screen overlay.

const NavButton = ({ label, active, onClick, isCta, isExit }) => {
    // isExit: special button used by admin to exit admin view
    if (isExit) {
        return (
            <button
                onClick={onClick}
                className="text-slate-500 hover:text-red-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm w-full md:w-auto text-left md:text-center"
            >
                {label}
            </button>
        );
    }

    // isCta: main call-to-action (Reservasi). Rendered as a prominent pill button.
    if (isCta) {
        return (
            <button
                onClick={onClick}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200 text-sm w-full md:w-auto shadow-md"
            >
                {label}
            </button>
        );
    }

    // Default nav item: shows active state with underline and stronger color.
    // `active` prop comes from comparing `currentView === item.id` in the parent.
    return (
        <button
            onClick={onClick}
            className={`transition-colors duration-200 text-sm font-medium py-2 px-1 w-full md:w-auto text-left md:text-center ${active ? 'text-orange-700 font-semibold border-b-2 border-orange-500 pb-2' : 'text-white hover:text-orange-600'
                }`}
        >
            {label}
        </button>
    );
};

const Navbar = ({ role, currentView, onViewChange, onRoleChange }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Define nav items depending on the current `role`.
    // For `customer` we show public pages + a CTA for Reservations.
    // For `admin` we show owner tools and an exit button that calls onRoleChange.
    const navItems = role === 'customer'
        ? [
            { id: 'home', label: 'Beranda' },
            { id: 'menu', label: 'Menu & Harga' },
            { id: 'about', label: 'Tentang Kami' },
            // `isCta: true` will render this using the CTA branch in NavButton
            { id: 'order', label: 'Reservasi', isCta: true }
        ]
        : [
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'finance', label: 'Keuangan' },
            { id: 'orders', label: 'Data Pesanan' },
            // `isExit: true` will render an exit-style button. `action` overrides default click behaviour.
            { id: 'exit', label: 'Keluar Admin', isExit: true, action: () => onRoleChange('customer') }
        ];

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-2 md:gap-3 cursor-pointer group"
                        onClick={() => {
                            onViewChange('home');
                            setMobileMenuOpen(false);
                        }}
                    >
                        <img src={logo} alt="Hadijaya Catering Logo" className="h-10 md:h-12" />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 lg:gap-12">
                        {navItems.map(item => (
                            <NavButton
                                key={item.id}
                                label={item.label}
                                active={currentView === item.id}
                                onClick={item.action || (() => onViewChange(item.id))}
                                isCta={item.isCta}
                                isExit={item.isExit}
                            />
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-all duration-200 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {/* When `mobileMenuOpen` is true we render a full-screen (on small screens) list of the same nav items.
                Each item uses NavButton so CTA/Exit/default styles remain consistent. Clicking an item closes the menu.
            */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto h-screen animate-fade-in border-t border-slate-100 pb-20">
                    <div className="px-6 py-6 space-y-4">
                        {navItems.map(item => (
                            <div key={item.id} className="border-b border-slate-50 pb-2 last:border-0">
                                <NavButton
                                    label={item.label}
                                    active={currentView === item.id}
                                    onClick={() => {
                                        if (item.action) item.action();
                                        else onViewChange(item.id);
                                        setMobileMenuOpen(false);
                                    }}
                                    isCta={item.isCta}
                                    isExit={item.isExit}
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