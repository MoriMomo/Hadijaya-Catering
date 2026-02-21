import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const MenuCard = ({ item, featured = false }) => {
    const navigate = useNavigate();

    if (featured) {
        return (
            <div
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden hover-card group cursor-pointer border border-transparent dark:border-slate-700 transition-colors duration-300"
                onClick={() => navigate('/order')}
            >
                <div className="h-72 overflow-hidden relative">
                    <OptimizedImage
                        src={item.img}
                        fallback={item.fallbackImg}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                        alt={item.name}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-2 rounded-full">
                        <span className="text-orange-800 dark:text-orange-400 font-bold text-xs uppercase tracking-wider">Best Seller</span>
                    </div>
                </div>
                <div className="p-6 md:p-8">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mb-3">{item.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 font-light line-clamp-2">{item.desc}</p>
                    <div className="border-t border-slate-100 dark:border-slate-700 pt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-orange-700 dark:text-orange-500">Rp {item.price.toLocaleString('id-ID')}</span>
                        <span className="text-slate-400 dark:text-slate-500 text-sm">per pax/box</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex gap-5 hover:border-orange-200 dark:hover:border-orange-500/50 transition-colors group hover:shadow-lg duration-300">
            <div className="w-24 h-24 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                <OptimizedImage
                    src={item.img}
                    fallback={item.fallbackImg}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    alt={item.name}
                />
            </div>
            <div className="flex flex-col justify-center w-full">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-light line-clamp-2">{item.desc}</p>
                <div className="mt-auto flex justify-between items-center">
                    {item.price > 0
                        ? <span className="text-orange-700 dark:text-orange-500 font-bold">Rp {item.price.toLocaleString('id-ID')}</span>
                        : <span className="text-amber-500 dark:text-amber-400 font-bold text-sm">Hubungi Kami</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
