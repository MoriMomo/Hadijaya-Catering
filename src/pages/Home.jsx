import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Clock, Award, ArrowRight } from 'lucide-react';
import { MENU_DATA } from '../constants/data';
import MenuCard from '../components/MenuCard';
import HomeShowcase from '../components/HomeShowcase';
import OptimizedImage from '../components/OptimizedImage';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in pb-12 bg-[#FAF9F6]">
            {/* Hero Section - IMPROVED */}
            <div className="relative overflow-hidden bg-[#FAF9F6]">
                {/* Remove odd background glow, use subtle gradient instead */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-50/60 to-transparent -z-10"></div>

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid md:grid-cols-2 gap-12 items-center py-16 md:py-24">
                    <div className="space-y-6 animate-slide-up order-2 md:order-1">
                        {/* Keep badge but make it more subtle */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-accent-200/60">
                            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
                            <span className="text-accent-800 font-semibold tracking-wider text-xs uppercase">Sejak 1999</span>
                        </div>

                        {/* Clearer hierarchy - title + subtitle closer together */}
                        <div className="space-y-3">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 leading-tight">
                                Cita Rasa <br />
                                <span className="text-accent-600">Legendaris</span>
                            </h1>
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-md">
                                Nasi Uduk Hijau otentik. Pilihan instansi pemerintah dan keluarga Jakarta Selatan.
                            </p>
                        </div>

                        {/* CTAs - More prominent, better spacing */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                onClick={() => navigate('/menu')}
                                className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-xl font-bold shadow-md shadow-accent-600/20 transition transform hover:-translate-y-0.5 text-base tracking-wide text-center flex items-center justify-center gap-2"
                            >
                                <span>Lihat Menu</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => navigate('/order')}
                                className="bg-white hover:bg-accent-50 text-accent-700 border-2 border-accent-600/80 px-8 py-4 rounded-xl font-bold transition text-base tracking-wide text-center"
                            >
                                Pesan Sekarang
                            </button>
                        </div>

                        {/* Social proof - more visible */}
                        <div className="flex items-center gap-6 pt-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-slate-600 font-medium">500+ Pelanggan Puas</span>
                            </div>
                        </div>
                    </div>

                    {/* Image - Keep but optimize space */}
                    <div className="relative order-1 md:order-2">
                        <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-900/5 border-4 border-white aspect-square md:aspect-auto md:h-[480px]">
                            <OptimizedImage
                                src="/images/hadijaya/makanan/jumbotron-dish.webp"
                                fallback="/images/placeholder.svg"
                                className="object-cover w-full h-full hover:scale-102 transition-transform duration-700"
                                alt="Hadijaya Signature Dish"
                                priority={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Favorites - MOVED UP, before features */}
            <div className="py-20 md:py-24 bg-[#FAF9F6] border-b border-stone-200/60">
                <div className="max-w-7xl mx-auto px-6 text-left">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Menu Favorit</h2>
                            <p className="text-slate-600 mt-2">Hidangan paling sering dipesan</p>
                        </div>
                        <button
                            onClick={() => navigate('/menu')}
                            className="group flex items-center gap-2 text-accent-600 font-semibold text-sm hover:text-accent-700 transition"
                        >
                            Lihat Semua Menu
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MENU_DATA.filter(item => item.featured).map(item => (
                            <MenuCard key={item.id} item={item} featured={true} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials - MOVED UP */}
            <HomeShowcase />

            {/* Features - MOVED DOWN (less critical) */}
            <div className="py-20 md:py-24 bg-[#FAF9F6] border-b border-stone-200/60">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-accent-600 font-bold uppercase tracking-widest text-xs">Kenapa Hadijaya?</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-3 mb-6">Kualitas Tanpa Kompromi</h2>
                        <div className="w-16 h-1 bg-accent-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: Users, title: "Kapasitas 500+ Pax", desc: "Didukung dapur komunitas solid, siap melayani event besar instansi maupun resepsi." },
                            { icon: Clock, title: "Fresh Made", desc: "Bahan dibelanjakan H-1 acara. Tidak ada stok lama. Kesegaran adalah kunci rasa kami." },
                            { icon: Award, title: "Mitra Pemerintah", desc: "Terdaftar resmi di E-Order. Administrasi rapi dan terpercaya untuk pengadaan." }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-accent-700 mb-8 group-hover:bg-accent-600 group-hover:text-white transition duration-500 shadow-sm border border-stone-200/60">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA - Contained Card Style */}
            <div className="py-16 md:py-24 bg-[#FAF9F6]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 rounded-[2.5rem] py-16 px-8 md:px-16 text-center relative overflow-hidden shadow-xl border border-primary-800/40">
                        {/* Subtle decorative background shapes */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

                        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
                            <span className="text-accent-300 font-semibold uppercase tracking-wider text-xs md:text-sm">Reservasi & Konsultasi</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">Siap untuk Momen Spesial Anda?</h2>
                            <p className="text-primary-100/90 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
                                Diskusikan kebutuhan katering Anda, dari nasi box hingga prasmanan besar. Kami siap memberikan cita rasa terbaik untuk acara Anda.
                            </p>
                            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button
                                    onClick={() => navigate('/order')}
                                    className="bg-accent-600 hover:bg-accent-700 text-white px-10 py-4.5 rounded-xl font-bold shadow-lg transition transform hover:-translate-y-0.5 text-base tracking-wide w-full sm:w-auto"
                                >
                                    Pesan Sekarang
                                </button>
                                <a
                                    href="https://wa.me/6281211212185"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 px-10 py-4.5 rounded-xl font-bold transition transform hover:-translate-y-0.5 text-base tracking-wide w-full sm:w-auto text-center flex items-center justify-center"
                                >
                                    Tanya via WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
