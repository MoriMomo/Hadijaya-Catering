import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#fcfbf9] border-t border-slate-200">
            {/* Main Footer Content */}
            <div className="bg-[#fcfbf9] py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* Profil & Kontak */}
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-6">Profil & Kontak</h4>
                            <address className="space-y-3 text-sm text-slate-600 not-italic">
                                <div>
                                    <p className="font-semibold text-slate-800 mb-1">Nama Perusahaan</p>
                                    <p className="leading-relaxed">PT. Hadi Jaya Citra / Hadijaya Catering</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 mb-1">Alamat</p>
                                    <p className="leading-relaxed">Jl. Pos Pengumben lama RT004/05 NO.10, Jl. Sukabumi Selatan Kebon Jeruk, Jakarta Barat 11560</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 mb-1">Kontak</p>
                                    <p className="leading-relaxed">
                                        <a href="tel:081211212185" className="hover:text-orange-600 transition">
                                            Telepon: 0812 1121 2185
                                        </a>
                                    </p>
                                    <p className="leading-relaxed">
                                        <a href="https://wa.me/6281211212185" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition">
                                            WhatsApp: 0812 1121 2185
                                        </a>
                                    </p>
                                    <p className="leading-relaxed">
                                        <a href="mailto:pt.hjcitra@gmail.com" className="hover:text-orange-600 transition">
                                            Email: pt.hjcitra@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </address>
                        </div>

                        {/* Hubungi Kami */}
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-6">Hubungi Kami</h4>
                            <div className="space-y-3 text-sm text-slate-600">
                                <p className="flex items-center gap-2">
                                    <span className="text-slate-400" aria-hidden="true">📞</span>
                                    <a href="tel:081211212185" className="hover:text-orange-600 transition">
                                        Telepon: 0812 1121 2185
                                    </a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-slate-400" aria-hidden="true">💬</span>
                                    <a href="https://wa.me/6281211212185" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition">
                                        WhatsApp: 0812 1121 2185
                                    </a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-slate-400" aria-hidden="true">✉️</span>
                                    <a href="mailto:pt.hjcitra@gmail.com" className="hover:text-orange-600 transition">
                                        Saran dan Keluhan
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Informasi */}

                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-[#fcfbf9] py-6 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Hadijaya Catering. Crafted with excellence.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;