import { useState, useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import { MENU_DATA } from '../constants/data';
import MenuCard from '../components/MenuCard';

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

// Precompute the grouped data outside of the component lifecycle
// This turns an O(N*M) runtime operation per render into an O(N) operation once at module load
const GROUPED_MENU_DATA = (() => {
    const itemsByCategory = new Map();
    for (let i = 0; i < MENU_DATA.length; i++) {
        const item = MENU_DATA[i];
        let items = itemsByCategory.get(item.category);
        if (!items) {
            items = [];
            itemsByCategory.set(item.category, items);
        }
        items.push(item);
    }

    const result = {};
    for (let i = 1; i < categories.length; i++) {
        const cat = categories[i];
        const items = itemsByCategory.get(cat.id);
        if (items && items.length > 0) {
            result[cat.id] = { ...cat, items };
        }
    }
    return result;
})();

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('semua');
    const scrollContainerRef = useRef(null);
    const sectionRefs = useRef({});

    const filteredData = useMemo(() => {
        return activeCategory === 'semua'
            ? MENU_DATA
            : MENU_DATA.filter(item => item.category === activeCategory);
    }, [activeCategory]);

    const groupedData = activeCategory === 'semua' ? GROUPED_MENU_DATA : null;

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

            <div className="pt-16 pb-24 bg-[#FAF9F6] min-h-screen">
                {/* Header */}
                <div className="bg-[#FAF9F6] border-b border-stone-200/80 mb-8">
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
                <div className="sticky top-16 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
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
                                        ? 'bg-accent-600 text-white shadow-md'
                                        : 'bg-white text-slate-700 border border-stone-200 hover:bg-accent-50 hover:text-accent-700 hover:border-accent-200'
                                        }`}
                                    aria-pressed={activeCategory === cat.id}
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
                                    <div className="border-b-2 border-stone-300/80 pb-4 mb-6">
                                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs border border-stone-200/80">{catData.icon}</span>
                                                <div>
                                                    <h2 className="text-2xl font-serif font-bold text-slate-900 leading-none mb-1">
                                                        {catData.label}
                                                    </h2>
                                                    <span className="text-sm text-slate-600 font-medium bg-stone-200/60 px-2.5 py-0.5 rounded-full">
                                                        {catData.items.length} pilihan menu
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setActiveCategory(catId)}
                                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-950 transition shadow-md active:scale-95"
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
