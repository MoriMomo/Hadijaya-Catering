import React from 'react';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

const MenuCard = ({ item, featured = false }) => {
    const navigate = useNavigate();

    if (featured) {
        return (
            <div
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-stone-200/80 hover-card group cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-500 focus-visible:ring-offset-2 flex flex-col h-full hover:shadow-xl hover:border-accent-200 transition-all duration-300"
                onClick={() => navigate('/order')}
                role="button"
                tabIndex={0}
                aria-label={`Pesan ${item.name}`}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate('/order');
                    }
                }}
            >
                <div className="h-64 sm:h-72 overflow-hidden relative">
                    <OptimizedImage
                        src={item.img}
                        fallback={item.fallbackImg}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                        alt={item.name}
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full border border-accent-200/60 shadow-xs">
                        <span className="text-accent-700 font-bold text-xs uppercase tracking-wider">Best Seller</span>
                    </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-2 leading-tight">{item.name}</h3>
                        <p className="text-slate-600 text-sm mb-6 font-light line-clamp-2 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="border-t border-stone-200/60 pt-4 flex justify-between items-center">
                        <span className="text-xl font-bold text-accent-700">Rp {item.price.toLocaleString('id-ID')}</span>
                        <span className="text-slate-400 text-xs tracking-wider uppercase">per pax/box</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200/70 flex gap-4 hover:border-accent-300 transition group hover:shadow-md duration-300 items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200/50">
                <OptimizedImage
                    src={item.img}
                    fallback={item.fallbackImg}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    alt={item.name}
                />
            </div>
            <div className="flex flex-col justify-between h-20 md:h-24 w-full">
                <div>
                    <h3 className="font-bold text-slate-900 text-base md:text-lg leading-tight mb-1 group-hover:text-accent-600 transition-colors duration-200">{item.name}</h3>
                    <p className="text-xs text-slate-500 font-light line-clamp-2 leading-normal">{item.desc}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                    {item.price > 0
                        ? <span className="text-accent-700 font-bold text-sm md:text-base">Rp {item.price.toLocaleString('id-ID')}</span>
                        : <span className="text-accent-600 font-bold text-xs uppercase tracking-wider">Hubungi Kami</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
