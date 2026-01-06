import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Clock, Award, ArrowRight } from 'lucide-react';
import { MENU_DATA } from '../constants/data';
import MenuCard from '../components/MenuCard';
import HomeShowcase from '../components/HomeShowcase';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in pb-12">
            {/* Hero Section */}
            <div className="relative bg-[#fcfbf9] min-h-162.5 flex items-center overflow-hidden">
                <div className="absolute right-[-10%] top-[-20%] w-[60%] h-[120%] bg-orange-50/50 rounded-full blur-3xl -z-10"></div>
                <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid md:grid-cols-2 gap-16 items-center pt-20 md:pt-0">
                    <div className="space-y-8 animate-slide-up order-2 md:order-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-orange-100">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            <span className="text-orange-800 font-bold tracking-widest text-xs uppercase">Est. 1999</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight md:leading-[1.1]">
                            Cita Rasa <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-700 to-orange-500 italic">Legendaris</span>
                        </h1>
                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-md font-light">
                            Nikmati kelezatan Nasi Uduk Hijau otentik. Pilihan utama instansi pemerintah dan keluarga Jakarta Selatan untuk setiap momen spesial.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button onClick={() => navigate('/menu')} className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-orange-200 transition transform hover:-translate-y-1 text-sm tracking-wide text-center">
                                LIHAT MENU
                            </button>
                            <button onClick={() => navigate('/order')} className="bg-transparent hover:bg-white text-white border border-slate-300 hover:border-orange-200 px-8 py-4 rounded-full font-bold transition flex items-center justify-center gap-2 text-sm tracking-wide">
                                RESERVASI
                            </button>
                        </div>
                    </div>
                    <div className="relative order-1 md:order-2">
                        <div className="relative z-10 rounded-4xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-700 aspect-square md:aspect-auto md:h-125">
                            <img
                                src="image_732b01.jpg"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800'; }}
                                className="object-cover w-full h-full"
                                alt="Hadijaya Signature Dish"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-slate-100 animate-slide-up hidden md:block">
                            <div className="flex items-center gap-1 text-amber-500 mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-sm font-bold text-slate-800 italic">"Rasa nasi uduknya benar-benar mengingatkan masakan rumah, tapi versi premium!"</p>
                            <div className="flex items-center gap-3 mt-4">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">IB</div>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Ibu Budi, Kemendikbud</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Kenapa Hadijaya?</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-3 mb-6">Kualitas Tanpa Kompromi</h2>
                        <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: Users, title: "Kapasitas 500+ Pax", desc: "Didukung dapur komunitas solid, siap melayani event besar instansi maupun resepsi." },
                            { icon: Clock, title: "Fresh Made", desc: "Bahan dibelanjakan H-1 acara. Tidak ada stok lama. Kesegaran adalah kunci rasa kami." },
                            { icon: Award, title: "Mitra Pemerintah", desc: "Terdaftar resmi di E-Order. Administrasi rapi dan terpercaya untuk pengadaan." }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-orange-700 mb-8 group-hover:bg-orange-500 group-hover:text-white transition duration-500">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Highlight */}
            <div className="py-24 bg-slate-100 hero-pattern">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Menu Favorit</h2>
                            <p className="text-slate-500 mt-4 max-w-md font-light">Pilihan hidangan yang paling sering dipesan untuk rapat dan acara spesial.</p>
                        </div>
                        <button onClick={() => navigate('/menu')} className="group flex items-center gap-3 text-orange-800 font-bold uppercase tracking-wider text-sm hover:text-orange-600 transition">
                            Lihat Menu Lengkap <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {MENU_DATA.filter(item => item.featured).map(item => (
                            <MenuCard key={item.id} item={item} featured={true} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Partners & Testimonials */}
            <HomeShowcase />

            {/* CTA */}
            <div className="py-24 bg-orange-900 relative overflow-hidden text-center px-6">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">Siap untuk Momen Spesial?</h2>
                    <p className="text-orange-100 text-lg mb-10 font-light max-w-2xl mx-auto">Diskusikan kebutuhan katering Anda, dari nasi box hingga prasmanan besar. Kami siap memberikan penawaran terbaik.</p>
                    <button onClick={() => navigate('/order')} className="bg-amber-500 hover:bg-amber-600 text-white px-12 py-5 rounded-full font-bold shadow-2xl transition transform hover:scale-105 tracking-wide text-lg w-full md:w-auto">
                        Minta Penawaran
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
