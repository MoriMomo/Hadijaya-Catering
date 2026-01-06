import React, { useState } from 'react';
import { MENU_DATA } from '../constants/data';
import MenuCard from '../components/MenuCard';

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredItems = activeCategory === 'all'
        ? MENU_DATA
        : MENU_DATA.filter(item => item.category === activeCategory);

    const getBtnClass = (cat) => activeCategory === cat
        ? "bg-orange-600 text-white shadow-lg"
        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200";

    return (
        <div className="pt-12 pb-24 bg-slate-50 min-h-screen animate-fade-in">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">Menu & Harga</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['all', 'paket', 'nasi', 'daging', 'ayam', 'snack'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 rounded-full text-sm font-bold transition capitalize ${getBtnClass(cat)}`}
                            >
                                {cat === 'all' ? 'Semua' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
                    {filteredItems.map(item => (
                        <MenuCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;
