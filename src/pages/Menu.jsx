import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import { MENU_DATA } from '../constants/data';
import MenuCard from '../components/MenuCard';

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('semua');
    const scrollContainerRef = useRef(null);
    const sectionRefs = useRef({});

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

    return (
        <>
            <Helmet>
                <title>Menu & Harga - Hadijaya Catering</title>
                <meta name="description" content="Lihat menu lengkap Hadijaya Catering dengan berbagai pilihan paket dan harga terjangkau" />
            </Helmet>

            <div className="pt-16 pb-24 bg-slate-50 min-h-screen">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 mb-8">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">
                            Menu & Harga
                        </h1>
                        <p className="text-white-600">
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
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all snap-start flex-shrink-0 ${activeCategory === cat.id
                                        ? 'bg-orange-600 text-white shadow-md'
                                        : 'bg-white text-white-700 border border-slate-200 hover:border-orange-300 hover:bg-orange-50'
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
                                    <div className="border-b-2 border-slate-300 pb-3 mb-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl">{catData.icon}</span>
                                                <h2 className="text-2xl font-serif font-bold text-slate-900">
                                                    {catData.label}
                                                </h2>
                                                <span className="text-sm text-white-500 font-medium">
                                                    {catData.items.length} item
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => setActiveCategory(catId)}
                                                className="flex items-center gap-1 text-orange-600 text-sm font-medium hover:text-orange-700"
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
        </>
    );
};

export default Menu;
