import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#fcfbf9] border-t border-slate-200">
            {/* Main Footer Content */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
                        {/* Profil & Brand */}
                        <div className="space-y-4">
                            <h4 className="font-serif font-bold text-slate-900 text-xl">Hadijaya Catering</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-light">
                                Pilihan Utama Instansi Pemerintah dan Keluarga Jakarta Selatan Sejak 1999. Menyajikan hidangan khas nusantara dengan cita rasa legendaris, higienis, dan terpercaya.
                            </p>
                            <p className="text-xs text-slate-400">
                                Terdaftar resmi di E-Order untuk kemudahan pengadaan administrasi instansi Anda.
                            </p>
                        </div>

                        {/* Navigasi Cepat */}
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-6">Navigasi Cepat</h4>
                            <ul className="space-y-3 text-sm list-none p-0">
                                <li>
                                    <Link to="/" className="text-slate-600 hover:text-orange-600 transition no-underline">
                                        Beranda
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/menu" className="text-slate-600 hover:text-orange-600 transition no-underline">
                                        Menu & Harga
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-slate-600 hover:text-orange-600 transition no-underline">
                                        Tentang Kami
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/order" className="text-slate-600 hover:text-orange-600 transition no-underline font-semibold">
                                        Reservasi
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Hubungi Kami / Kontak */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-6">Hubungi Kami</h4>
                            <address className="space-y-3 text-sm text-slate-600 not-italic">
                                <p className="font-semibold text-slate-800 leading-tight">PT. Hadi Jaya Citra</p>
                                <p className="leading-relaxed text-xs text-slate-500">
                                    Jl. Pos Pengumben lama RT004/05 NO.10, Jl. Sukabumi Selatan Kebon Jeruk, Jakarta Barat 11560
                                </p>
                                <div className="space-y-2 pt-2 text-xs md:text-sm">
                                    <p className="flex items-center gap-2 m-0">
                                        <span className="text-slate-400" aria-hidden="true">📞</span>
                                        <a href="tel:081211212185" className="text-slate-600 hover:text-orange-600 transition no-underline">
                                            Telepon: 0812 1121 2185
                                        </a>
                                    </p>
                                    <p className="flex items-center gap-2 m-0">
                                        <span className="text-slate-400" aria-hidden="true">💬</span>
                                        <a href="https://wa.me/6281211212185" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-orange-600 transition no-underline">
                                            WhatsApp: 0812 1121 2185
                                        </a>
                                    </p>
                                    <p className="flex items-center gap-2 m-0">
                                        <span className="text-slate-400" aria-hidden="true">✉️</span>
                                        <a href="mailto:pt.hjcitra@gmail.com" className="text-slate-600 hover:text-orange-600 transition no-underline">
                                            Email: pt.hjcitra@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </address>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="py-6 border-t border-slate-200 bg-[#fcfbf9]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-xs text-slate-400 m-0">
                        &copy; {new Date().getFullYear()} Hadijaya Catering. Crafted with excellence.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;