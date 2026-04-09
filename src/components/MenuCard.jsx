import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { useCart } from '../context/CartContext';

const MenuCard = ({ item, featured = false }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e) => {
        e.stopPropagation();
        addToCart(item);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (featured) {
        return (
            <div
                className="bg-white rounded-2xl overflow-hidden hover-card group cursor-pointer border border-transparent transition-colors duration-300 flex flex-col"
                onClick={() => navigate('/order')}
            >
                <div className="h-72 overflow-hidden relative">
                    <OptimizedImage
                        src={item.img}
                        fallback={item.fallbackImg}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                        alt={item.name}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full">
                        <span className="text-accent-700 font-bold text-xs uppercase tracking-wider">Best Seller</span>
                    </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-3">{item.name}</h3>
                    <p className="text-slate-500 mb-6 font-light line-clamp-2 flex-1">{item.desc}</p>
                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                        <div>
                            <div className="text-lg font-bold text-accent-500">Rp {item.price.toLocaleString('id-ID')}</div>
                            <div className="text-slate-400 text-xs">per pax/box</div>
                        </div>
                        <button
                            onClick={handleAdd}
                            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${added ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-accent-500 hover:text-white'}`}
                            aria-label="Add to cart"
                        >
                            {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex gap-5 hover:border-accent-200 transition-colors group hover:shadow-lg duration-300 cursor-pointer" onClick={() => navigate('/order')}>
            <div className="w-24 h-24 rounded-xl bg-slate-200 overflow-hidden shrink-0 relative">
                <OptimizedImage
                    src={item.img}
                    fallback={item.fallbackImg}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    alt={item.name}
                />
            </div>
            <div className="flex flex-col justify-center w-full">
                <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500 mb-3 font-light line-clamp-2">{item.desc}</p>
                <div className="mt-auto flex justify-between items-end">
                    <div>
                        {item.price > 0
                            ? <span className="text-accent-500 font-bold">Rp {item.price.toLocaleString('id-ID')}</span>
                            : <span className="text-accent-400 font-bold text-sm">Hubungi Kami</span>
                        }
                    </div>
                    {item.price > 0 && (
                        <button
                            onClick={handleAdd}
                            className={`flex items-center justify-center px-3 py-1.5 rounded-lg transition-all text-xs font-bold ${added ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-accent-500 hover:text-white'}`}
                        >
                            {added ? 'Ditambahkan' : '+ Keranjang'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
