import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../constants/data';

const Footer = () => {
    return (
        <footer className="bg-[#132A1F] text-white border-t border-[#26523B]">
            {/* Main Footer Content */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
                        {/* Profil & Brand */}
                        <div className="space-y-4">
                            <h4 className="font-serif font-bold text-[#FAF5EF] text-2xl">{COMPANY_INFO.name}</h4>
                            <p className="text-sm text-emerald-100/80 leading-relaxed font-light">
                                Pilihan Utama Instansi Pemerintah dan Keluarga Jakarta Selatan Sejak {COMPANY_INFO.sinceYear}. Menyajikan hidangan khas nusantara dengan cita rasa legendaris, higienis, dan terpercaya.
                            </p>
                            <p className="text-xs text-amber-200/80 bg-white/5 p-3 rounded-xl border border-white/10">
                                🏛️ Terdaftar resmi di E-Order untuk kemudahan pengadaan administrasi instansi Anda.
                            </p>
                        </div>

                        {/* Navigasi Cepat */}
                        <div>
                            <h4 className="font-bold text-[#FAF5EF] text-sm uppercase tracking-wider mb-6">Navigasi Cepat</h4>
                            <ul className="space-y-3 text-sm list-none p-0">
                                <li>
                                    <Link to="/" className="text-emerald-100/80 hover:text-accent-300 transition no-underline">
                                        Beranda
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/menu" className="text-emerald-100/80 hover:text-accent-300 transition no-underline">
                                        Menu & Harga
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-emerald-100/80 hover:text-accent-300 transition no-underline">
                                        Tentang Kami
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/order" className="text-accent-300 hover:text-white transition no-underline font-semibold">
                                        Reservasi
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Hubungi Kami / Kontak */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-[#FAF5EF] text-sm uppercase tracking-wider mb-6">Hubungi Kami</h4>
                            <address className="space-y-3 text-sm text-emerald-100/80 not-italic">
                                <p className="font-semibold text-white leading-tight">{COMPANY_INFO.legalName}</p>
                                <p className="leading-relaxed text-xs text-emerald-100/70">
                                    {COMPANY_INFO.address}
                                </p>
                                <div className="space-y-2 pt-2 text-xs md:text-sm">
                                    <p className="flex items-center gap-2 m-0">
                                        <span aria-hidden="true">📞</span>
                                        <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-emerald-100/90 hover:text-accent-300 transition no-underline">
                                            Telepon: {COMPANY_INFO.phone}
                                        </a>
                                    </p>
                                    <p className="flex items-center gap-2 m-0">
                                        <span aria-hidden="true">💬</span>
                                        <a href={`https://wa.me/${COMPANY_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-100/90 hover:text-accent-300 transition no-underline">
                                            WhatsApp: {COMPANY_INFO.whatsappFormatted}
                                        </a>
                                    </p>
                                    <p className="flex items-center gap-2 m-0">
                                        <span aria-hidden="true">✉️</span>
                                        <a href={`mailto:${COMPANY_INFO.email}`} className="text-emerald-100/90 hover:text-accent-300 transition no-underline">
                                            Email: {COMPANY_INFO.email}
                                        </a>
                                    </p>
                                </div>
                            </address>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="py-6 border-t border-[#1C3B2B] bg-[#0D1F17]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-xs text-emerald-100/60 m-0">
                        &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Crafted with excellence.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;