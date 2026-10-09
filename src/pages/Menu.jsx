import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { MenuList, useMenu, DEFAULT_MENU_CATEGORIES } from '@/features/menu';

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('semua');
    const scrollContainerRef = useRef(null);
    const sectionRefs = useRef({});
    const menuState = useMenu();
    const { data } = menuState;

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
                            {DEFAULT_MENU_CATEGORIES.map((cat) => {
                                const count = data ? data.filter(item => item.category === cat.id).length : null;
                                return (
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
                                        {cat.id !== 'semua' && count !== null && (
                                            <span className="text-xs opacity-75">
                                                ({count})
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Menu Display */}
                <div className="max-w-7xl mx-auto px-6 mt-8">
                    <MenuList
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                        sectionRefs={sectionRefs}
                        menuState={menuState}
                    />
                </div>
            </div>
        </>
    );
};

export default Menu;

