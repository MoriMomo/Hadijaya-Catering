import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
        <>
            <Helmet>
                <title>Menu & Harga - Hadijaya Catering</title>
                <meta name="description" content="Lihat menu lengkap Hadijaya Catering dengan harga terbaik. Paket catering, nasi uduk hijau, daging, ayam, dan snack untuk acara Anda." />
                <meta property="og:title" content="Menu & Harga - Hadijaya Catering" />
                <meta property="og:description" content="Lihat menu lengkap Hadijaya Catering dengan harga terbaik. Paket catering, nasi uduk hijau, daging, ayam, dan snack untuk acara Anda." />
                <meta property="og:type" content="website" />
            </Helmet>
            <div className="pt-12 pb-24 bg-slate-50 min-h-screen animate-fade-in">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">Menu & Harga</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['all', 'paket', 'nasi', 'daging', 'ayam', 'telur', 'tahu-tempe', 'sambel', 'snack'].map(cat => {
                            const labels = {
                                all: 'Semua',
                                paket: 'Paket',
                                nasi: 'Nasi',
                                daging: 'Daging',
                                ayam: 'Ayam',
                                telur: 'Telur',
                                'tahu-tempe': 'Tahu/Tempe',
                                sambel: 'Sambel',
                                snack: 'Snack'
                            };
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-3 rounded-full text-sm font-bold transition ${getBtnClass(cat)}`}
                                >
                                    {labels[cat]}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
                    {filteredItems.map(item => (
                        <MenuCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default Menu;
