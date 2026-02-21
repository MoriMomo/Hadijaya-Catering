import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, Users, Clock, Award, ArrowRight } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { MENU_DATA } from '../constants/data';
import MenuCard from '../components/MenuCard';
import HomeShowcase from '../components/HomeShowcase';
import OptimizedImage from '../components/OptimizedImage';

const Home = () => {
    const navigate = useNavigate();

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
        <div className="pb-12 bg-white dark:bg-slate-900 transition-colors duration-300">
            <Helmet>
                <title>Hadijaya Catering - Cita Rasa Legendaris Sejak 1999</title>
                <meta name="description" content="Nasi Uduk Hijau otentik dan layanan katering profesional di Jakarta Selatan. Melayani nasi box, prasmanan, dan acara instansi sejak tahun 1999." />
                <meta property="og:title" content="Hadijaya Catering - Cita Rasa Legendaris Jakarta" />
                <meta property="og:description" content="Layanan katering terbaik untuk wilayah Jakarta dan sekitarnya. Spesialis Nasi Uduk Hijau otentik." />
            </Helmet>
            {/* Hero Section - IMPROVED */}
            <div className="relative bg-[#fcfbf9] dark:bg-slate-900 overflow-hidden transition-colors duration-300">
                {/* Remove odd background glow, use subtle gradient instead */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 dark:from-orange-500/10 to-transparent -z-10"></div>

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid md:grid-cols-2 gap-8 items-center py-12 md:py-16">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="space-y-6 order-2 md:order-1"
                    >
                        {/* Keep badge but make it more subtle */}
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-sm border border-orange-100 dark:border-slate-700">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            <span className="text-orange-800 dark:text-orange-400 font-medium tracking-wider text-xs uppercase">Sejak 1999</span>
                        </motion.div>

                        {/* Clearer hierarchy - title + subtitle closer together */}
                        <motion.div variants={fadeInUp} className="space-y-3">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                                Cita Rasa <br />
                                <span className="text-orange-600 dark:text-orange-500">Legendaris</span>
                            </h1>
                            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
                                Nasi Uduk Hijau otentik. Pilihan instansi pemerintah dan keluarga Jakarta Selatan.
                            </p>
                        </motion.div>

                        {/* CTAs - More prominent, better spacing */}
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                onClick={() => navigate('/menu')}
                                className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-200/50 dark:shadow-orange-900/20 transition transform hover:-translate-y-0.5 text-base tracking-wide text-center flex items-center justify-center gap-2"
                            >
                                <span>Lihat Menu</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => navigate('/order')}
                                className="bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-orange-600 dark:text-orange-400 border-2 border-orange-600 dark:border-orange-500 px-8 py-4 rounded-xl font-bold transition text-base tracking-wide text-center"
                            >
                                Pesan Sekarang
                            </button>
                        </motion.div>

                        {/* Social proof - more visible */}
                        <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-slate-600 dark:text-slate-400 font-medium">500+ Pelanggan Puas</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Image - Keep but optimize space */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative order-1 md:order-2"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-square md:aspect-auto md:h-[500px]">
                            <OptimizedImage
                                src="/images/hadijaya/makanan/jumbotron-dish.jpeg"
                                fallback="/images/placeholder.svg"
                                className="object-cover w-full h-full"
                                alt="Hadijaya Signature Dish"
                                priority={true}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Menu Favorites - MOVED UP, before features */}
            <div className="py-16 bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white">Menu Favorit</h2>
                            <p className="text-slate-600 dark:text-slate-400 mt-2">Hidangan paling sering dipesan</p>
                        </div>
                        <button
                            onClick={() => navigate('/menu')}
                            className="group flex items-center gap-2 text-orange-600 font-semibold text-sm hover:text-orange-700 transition"
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
            <div className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center max-w-2xl mx-auto mb-20"
                    >
                        <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Kenapa Hadijaya?</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mt-3 mb-6">Kualitas Tanpa Kompromi</h2>
                        <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
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
                                <div className="w-20 h-20 mx-auto bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-orange-700 dark:text-orange-500 mb-8 group-hover:bg-orange-500 group-hover:text-white transition duration-500 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* CTA - Keep at bottom */}
            <div className="py-20 bg-orange-600 dark:bg-orange-700 relative overflow-hidden text-center px-6 transition-colors duration-300">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto relative z-10"
                >
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">Siap untuk Momen Spesial?</h2>
                    <p className="text-orange-100 text-lg mb-10 font-light max-w-2xl mx-auto">Diskusikan kebutuhan katering Anda, dari nasi box hingga prasmanan besar. Kami siap memberikan penawaran terbaik.</p>
                    <button onClick={() => navigate('/order')} className="bg-white dark:bg-slate-900 hover:bg-orange-50 dark:hover:bg-slate-800 text-orange-600 dark:text-orange-500 px-12 py-5 rounded-xl font-bold shadow-2xl transition transform hover:scale-105 tracking-wide text-lg w-full md:w-auto">
                        Minta Penawaran
                    </button>
                </motion.div>
            </div>
        </div >
    );
};

export default Home;
