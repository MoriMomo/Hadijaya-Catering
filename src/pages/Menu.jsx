import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MENU_DATA } from '../constants/data';
import MenuCard from '../components/MenuCard';
import { useCart } from '../context/CartContext';

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('semua');
    const scrollContainerRef = useRef(null);
    const sectionRefs = useRef({});
    const navigate = useNavigate();
    const { orderLines } = useCart();

    const categories = [
        { id: 'semua', label: 'Semua Menu', icon: '🍱' },
        { id: 'paket', label: 'Paket Spesial', icon: '⭐' },
        { id: 'nasi', label: 'Nasi', icon: '🍚' },
        { id: 'daging', label: 'Daging', icon: '🥩' },
        { id: 'ayam', label: 'Ayam', icon: '🍗' },
        { id: 'telur', label: 'Telur', icon: '🥚' },
        { id: 'tahu-tempe', label: 'Tahu & Tempe', icon: '🥘' },
        { id: 'sambel', label: 'Sambel', icon: '🌶️' },
        { id: 'snack', label: 'Snack', icon: '🍰' }
    ];

    const filteredData = activeCategory === 'semua'
        ? MENU_DATA
        : MENU_DATA.filter(item => item.category === activeCategory);

    // Group by category for "Semua" view
    const groupedData = activeCategory === 'semua'
        ? categories.slice(1).reduce((acc, cat) => {
            const items = MENU_DATA.filter(item => item.category === cat.id);
            if (items.length > 0) {
                acc[cat.id] = { ...cat, items };
            }
            return acc;
        }, {})
        : null;

    // Scroll to category section
    const scrollToCategory = (categoryId) => {
        if (categoryId === 'semua') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const section = sectionRefs.current[categoryId];
        if (section) {
            const offset = 120; // Account for sticky nav
            const top = section.offsetTop - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        if (activeCategory === 'semua' && categoryId !== 'semua') {
            setTimeout(() => scrollToCategory(categoryId), 100);
        }
    };

    const cartCount = orderLines.length;
    const calculateTotal = () => {
        return orderLines.reduce((sum, line) => {
            const menu = MENU_DATA.find(m => m.id === Number(line.menuId));
            return sum + (menu?.price || 0) * (Number(line.qty) || 0);
        }, 0);
    };

    return (
        <>
            <Helmet>
                <title>Menu & Harga - Hadijaya Catering</title>
                <meta name="description" content="Lihat menu lengkap Hadijaya Catering dengan berbagai pilihan paket dan harga terjangkau" />
            </Helmet>

            <div className={`pt-16 bg-slate-50 min-h-screen ${cartCount > 0 ? 'pb-32' : 'pb-24'}`}>
                {/* Header */}
                <div className="bg-white border-b border-slate-200 mb-8">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">
                            Menu & Harga
                        </h1>
                        <p className="text-slate-600">
                            Pilih kategori atau scroll untuk melihat semua menu
                        </p>
                    </div>
                </div>

                {/* Scrollable Category Chips - GOJEK STYLE */}
                <div className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 snap-start flex-shrink-0 border ${activeCategory === cat.id
                                        ? 'bg-accent-500 text-white border-accent-500 shadow-md transform scale-105'
                                        : 'bg-white text-slate-600 border-slate-200 shadow-sm hover:border-accent-400 hover:text-accent-500'
                                        }`}
                                >
                                    <span className="text-lg">{cat.icon}</span>
                                    <span>{cat.label}</span>
                                    {cat.id !== 'semua' && (
                                        <span className="text-xs opacity-75">
                                            ({MENU_DATA.filter(item => item.category === cat.id).length})
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Menu Display */}
                <div className="max-w-7xl mx-auto px-6 mt-8">
                    {activeCategory === 'semua' ? (
                        // Grouped view with section headers
                        <div className="space-y-12">
                            {Object.entries(groupedData).map(([catId, catData]) => (
                                <section
                                    key={catId}
                                    ref={el => sectionRefs.current[catId] = el}
                                    className="scroll-mt-32"
                                >
                                    {/* Section Header - NEWSPAPER STYLE */}
                                    <div className="border-b-2 border-slate-300 pb-4 mb-6">
                                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl bg-accent-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-accent-200">{catData.icon}</span>
                                                <div>
                                                    <h2 className="text-2xl font-serif font-bold text-slate-900 leading-none mb-1">
                                                        {catData.label}
                                                    </h2>
                                                    <span className="text-sm text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                                                        {catData.items.length} pilihan menu
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setActiveCategory(catId)}
                                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-900 transition shadow-md active:scale-95"
                                            >
                                                Lihat Semua
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Menu Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {catData.items.map(item => (
                                            <MenuCard key={item.id} item={item} />
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    ) : (
                        // Single category view
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredData.map(item => (
                                <MenuCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Sticky Buy Bar */}
            {cartCount > 0 && (
                <div className="fixed bottom-0 left-0 right-0 p-4 z-50 animate-fade-in lg:hidden pointer-events-none">
                    <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between pointer-events-auto">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-800 p-2 rounded-full relative">
                                <ShoppingBag className="w-5 h-5 text-accent-400" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Total item</span>
                                <span className="text-sm font-bold">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/order#order-summary')}
                            className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                        >
                            Lanjut <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Menu;
