import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, Users, Clock, Award, ArrowRight } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { MENU_DATA } from '../constants/data';
import { TESTIMONIALS } from '../constants/testimonials';
import MenuCard from '../components/MenuCard';
import HomeShowcase from '../components/HomeShowcase';
import OptimizedImage from '../components/OptimizedImage';
import FAQSection from '../components/FAQSection';

const Home = () => {
    const navigate = useNavigate();
    const heroInitials = TESTIMONIALS.slice(0, 4).map((testimonial) => testimonial.name.charAt(0).toUpperCase());
    const [heroImageOffset, setHeroImageOffset] = useState({ x: 0, y: 0 });

    const handleHeroImageMove = (event) => {
        if (window.innerWidth < 1024) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = ((event.clientX - centerX) / rect.width) * 14;
        const y = ((event.clientY - centerY) / rect.height) * 14;

        setHeroImageOffset({ x, y });
    };

    const resetHeroImageMove = () => {
        setHeroImageOffset({ x: 0, y: 0 });
    };

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="pb-12 bg-white transition-colors duration-300">
            <Helmet>
                <title>Hadijaya Catering - Cita Rasa Legendaris Sejak 1999</title>
                <meta name="description" content="Nasi Uduk Hijau otentik dan layanan katering profesional di Jakarta Selatan. Melayani nasi box, prasmanan, dan acara instansi sejak tahun 1999." />
                <meta property="og:title" content="Hadijaya Catering - Cita Rasa Legendaris Jakarta" />
                <meta property="og:description" content="Layanan katering terbaik untuk wilayah Jakarta dan sekitarnya. Spesialis Nasi Uduk Hijau otentik." />
            </Helmet>
            {/* Hero Section - REDESIGNED */}
            <div className="relative bg-[#faf9f6] overflow-hidden transition-colors duration-300 min-h-[90vh] flex items-center">
                {/* Elegant subtle pattern background */}
                <div className="absolute inset-0 hero-pattern opacity-60 mix-blend-multiply"></div>
                {/* Soft gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f6] via-[#faf9f6]/95 to-transparent z-0"></div>

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid md:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-24">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="space-y-6 order-2 md:order-1"
                    >
                        {/* Keep badge but make it more subtle */}
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/70 backdrop-blur-md rounded-full shadow-sm border border-[#e2e8f0]">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-400"></span>
                            </span>
                            <span className="text-slate-700 font-semibold tracking-widest text-[11px] uppercase">Sejak 1999</span>
                        </motion.div>

                        {/* Clearer hierarchy - title + subtitle closer together */}
                        <motion.div variants={fadeInUp} className="space-y-5">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-slate-900 leading-[1.1] tracking-tight md:leading-tight">
                                <span className="block md:inline">Cita Rasa </span>
                                <span className="text-accent-400 relative italic pr-4 block md:inline">
                                    Legendaris
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent-50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-lg font-light">
                                Nasi Uduk Hijau otentik. Pilihan instansi pemerintah dan keluarga Jakarta Selatan.
                            </p>
                        </motion.div>

                        {/* CTAs - More prominent, better spacing */}
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                onClick={() => navigate('/menu')}
                                className="group bg-accent-400 hover:bg-accent-500 text-white px-8 py-4.5 rounded-full font-bold premium-shadow transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform hover:-translate-y-1.5 text-base tracking-wide text-center flex items-center justify-center gap-3 w-full sm:w-auto"
                            >
                                <span>Eksplorasi Menu</span>
                                <ArrowRight className="w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5" />
                            </button>
                            <button
                                onClick={() => navigate('/order')}
                                className="bg-accent-50 text-accent-500 border-2 border-accent-400 px-8 py-4.5 rounded-full font-bold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] text-base tracking-wide text-center w-full sm:w-auto hover:bg-accent-100 hover:text-accent-700 hover:shadow-lg hover:-translate-y-1 focus:ring-4 focus:ring-accent-200/50"
                            >
                                Pesan Sekarang
                            </button>
                        </motion.div>

                        {/* Social proof - more visible */}
                        <motion.div variants={fadeInUp} className="flex items-center gap-5 pt-8 mt-4 border-t border-[#e2e8f0]/80">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {heroInitials.map((initial, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-400 to-accent-300 border-[3px] border-slate-50 flex items-center justify-center text-white text-xs font-bold shadow-sm relative z-10 hover:z-20 hover:scale-110 transition-transform duration-300">
                                            {initial}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex text-amber-500 mb-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-[#5c5046] font-medium text-sm">Dipercaya 500+ Pelanggan</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Image - Premium Presentation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 50 }}
                        onMouseMove={handleHeroImageMove}
                        onMouseLeave={resetHeroImageMove}
                        className="relative order-1 md:order-2 lg:ml-auto w-full max-w-[550px] mx-auto"
                    >
                        <div
                            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                            style={{ transform: `translate3d(${heroImageOffset.x}px, ${heroImageOffset.y}px, 0)` }}
                        >
                            {/* Decorative background elements */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-accent-100/35 to-slate-50 rounded-[2.5rem] transform rotate-3 scale-105 opacity-55 blur-xl"></div>
                            <div className="absolute -inset-4 bg-gradient-to-bl from-accent-400/4 to-transparent rounded-[2.5rem] transform -rotate-2 scale-100 opacity-80"></div>

                            <div className="relative z-10 rounded-[2rem] overflow-hidden premium-shadow border-8 border-white aspect-[4/5] sm:aspect-square md:aspect-[4/5] lg:h-[600px]">
                                <OptimizedImage
                                    src="/images/hadijaya/makanan/jumbotron-dish.jpeg"
                                    fallback="/images/placeholder.svg"
                                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700 ease-out"
                                    alt="Hadijaya Signature Dish"
                                    priority={true}
                                />
                                {/* Inner subtle gradient for image richness */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 pointer-events-none mix-blend-overlay"></div>
                            </div>
                        </div>

                        {/* Floating decorative badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="absolute -right-6 md:-right-10 bottom-12 z-20 bg-white p-4 rounded-2xl premium-shadow border border-slate-200 flex items-center gap-4 hidden sm:flex"
                        >
                            <div className="w-12 h-12 rounded-full bg-accent-50 flex items-center justify-center text-accent-500">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 font-medium">Spesialis</p>
                                <p className="text-base text-slate-900 font-bold font-serif">Nasi Uduk Hijau</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Menu Favorites - MOVED UP, before features */}
            <div className="py-16 bg-slate-50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Menu Favorit</h2>
                            <p className="text-slate-600 mt-2">Hidangan paling sering dipesan</p>
                        </div>
                        <button
                            onClick={() => navigate('/menu')}
                            className="group flex items-center gap-2 text-accent-500 font-semibold text-sm hover:text-accent-600 transition"
                        >
                            Lihat Semua Menu
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                        </button>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {MENU_DATA.filter(item => item.featured).map(item => (
                            <motion.div key={item.id} variants={fadeInUp}>
                                <MenuCard item={item} featured={true} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Testimonials - MOVED UP */}
            <HomeShowcase />

            {/* Features - MOVED DOWN (less critical) */}
            <div className="py-20 bg-white transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center max-w-2xl mx-auto mb-20"
                    >
                        <span className="text-accent-400 font-bold uppercase tracking-widest text-xs">Kenapa Hadijaya?</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-3 mb-6">Kualitas Tanpa Kompromi</h2>
                        <div className="w-16 h-1 bg-accent-400 mx-auto"></div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-3 gap-12"
                    >
                        {[
                            { icon: Users, title: "Kapasitas 500+ Pax", desc: "Didukung dapur komunitas solid, siap melayani event besar instansi maupun resepsi." },
                            { icon: Clock, title: "Fresh Made", desc: "Bahan dibelanjakan H-1 acara. Tidak ada stok lama. Kesegaran adalah kunci rasa kami." },
                            { icon: Award, title: "Mitra Pemerintah", desc: "Terdaftar resmi di E-Order. Administrasi rapi dan terpercaya untuk pengadaan." }
                        ].map((item, idx) => (
                            <motion.div key={idx} variants={fadeInUp} className="text-center group">
                                <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-accent-600 mb-8 group-hover:bg-accent-500 group-hover:text-white transition duration-500 shadow-sm border border-slate-100">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-light">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* FAQs Section */}
            <FAQSection />

            {/* CTA - Keep at bottom */}
            <div className="py-20 bg-accent-500 relative overflow-hidden text-center px-6 transition-colors duration-300">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto relative z-10"
                >
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">Siap untuk Momen Spesial?</h2>
                    <p className="text-accent-50 text-lg mb-10 font-light max-w-2xl mx-auto">Diskusikan kebutuhan katering Anda, dari nasi box hingga prasmanan besar. Kami siap memberikan penawaran terbaik.</p>
                    <button onClick={() => navigate('/order')} className="bg-white hover:bg-accent-50 text-accent-500 px-12 py-5 rounded-xl font-bold shadow-2xl transition transform hover:scale-105 tracking-wide text-lg w-full md:w-auto">
                        Minta Penawaran
                    </button>
                </motion.div>
            </div>
        </div >
    );
};

export default Home;
