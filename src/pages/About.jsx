import React from 'react';
import { Helmet } from 'react-helmet-async';
import OptimizedImage from '../components/OptimizedImage';

const About = () => (
    <>
        <Helmet>
            <title>Tentang Kami - Hadijaya Catering</title>
            <meta name="description" content="Hadijaya Catering telah melayani sejak 1999 dengan fokus pada kualitas dan kepuasan pelanggan. Spesialis Nasi Uduk Hijau untuk instansi pemerintah dan keluarga." />
            <meta property="og:title" content="Tentang Kami - Hadijaya Catering" />
            <meta property="og:description" content="Hadijaya Catering telah melayani sejak 1999 dengan fokus pada kualitas dan kepuasan pelanggan. Spesialis Nasi Uduk Hijau untuk instansi pemerintah dan keluarga." />
            <meta property="og:type" content="website" />
        </Helmet>
        <div className="py-24 bg-slate-50 min-h-screen animate-fade-in">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-10 items-start">
                    <div className="md:col-span-1">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <OptimizedImage
                                src="/images/dapur.jpg"
                                fallback="/images/placeholder.svg"
                                className="w-full h-64 object-cover"
                                alt="Dapur Hadijaya Catering"
                            />
                        </div>
                        <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold">Profil & Kontak</h3>
                            <p className="text-sm text-slate-600 mt-3">
                                <strong>Nama Perusahaan:</strong> PT. Hadi Jaya Citra / Hadijaya Catering
                            </p>
                            <p className="text-sm text-slate-600 mt-2">
                                <strong>Alamat:</strong> Jl. Pos Pengumben lama RT004/05 NO.10, Jl. Sukabumi Selatan Kebon Jeruk, Jakarta Barat 11560
                            </p>
                            <p className="text-sm text-slate-600 mt-2"><strong>Telepon:</strong> 0812 1121 2185</p>
                            <p className="text-sm text-slate-600 mt-1"><strong>WhatsApp:</strong> 0812 1121 2185</p>
                            <p className="text-sm text-slate-600 mt-1"><strong>E-mail:</strong> pt.hjcitra@gmail.com</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Tentang Hadijaya Catering</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">Hadijaya Catering berdiri dari warisan resep keluarga yang telah dipercaya sejak lama. Kami melayani katering nasi box, prasmanan, dan paket acara untuk instansi dan keluarga di Jakarta Barat dan sekitarnya.</p>

                        <h3 className="text-2xl font-bold mt-6 mb-3">Spesial Menu (Paket)</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                                <h4 className="font-bold">Paket A — Rp 35.000</h4>
                                <p className="text-sm text-slate-600 mt-2">Nasi Uduk Ijo + Daging Semur, Kentang Sambel Goreng, Sambel Trasi Mangga, Krupuk & Lalapan</p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                                <h4 className="font-bold">Paket B — Rp 35.000</h4>
                                <p className="text-sm text-slate-600 mt-2">Nasi Uduk Ijo + Daging Dengdeng, Tempe Orek, Sambel Trasi Mangga, Krupuk & Lalapan</p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                                <h4 className="font-bold">Paket C — Rp 30.000</h4>
                                <p className="text-sm text-slate-600 mt-2">Nasi Uduk Ijo + Ayam Goreng, Tempe Orek, Sambel Trasi Mangga, Krupuk & Lalapan</p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                                <h4 className="font-bold">Paket D — Rp 30.000</h4>
                                <p className="text-sm text-slate-600 mt-2">Nasi Uduk Ijo + Ayam Rendang, Tempe Orek, Sambel Trasi Mangga, Krupuk & Lalapan</p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-3">Menu Ala Carte (Contoh harga)</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-semibold">Nasi</h4>
                                <ul className="text-sm text-slate-600 mt-2 space-y-1">
                                    <li>Nasi Uduk Ijo — Rp 12.000 / porsi</li>
                                    <li>Nasi Uduk Kuning — Rp 10.000 / porsi</li>
                                    <li>Nasi Uduk Putih — Rp 9.000 / porsi</li>
                                    <li>Nasi Biasa — Rp 7.000 / porsi</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold">Daging & Ayam</h4>
                                <ul className="text-sm text-slate-600 mt-2 space-y-1">
                                    <li>Empal / Semur / Rendang / Sate Assem — Rp 20.000 / porsi</li>
                                    <li>Ayam Goreng / Geprek / Bakar / Gulai / Rendang / Semur — Rp 15.000 / porsi</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold">Lainnya</h4>
                                <ul className="text-sm text-slate-600 mt-2 space-y-1">
                                    <li>Telur Balado / Semur / Rendang — Rp 8.000 / porsi</li>
                                    <li>Tahu/Tempe (variasi) — Rp 7.000 / porsi</li>
                                    <li>Sambel Mangga — Rp 5.000 / porsi</li>
                                    <li>Snack (Pastel, Risol, Lupis, dll) — Rp 4.000 / porsi</li>
                                </ul>
                            </div>
                        </div>

                        <p className="text-slate-500 mt-6 text-sm">Catatan: Harga contoh untuk pesanan ala-carte. Untuk menu prasmanan atau permintaan khusus, silakan hubungi kami via WhatsApp/telepon untuk penawaran dan konfirmasi ketersediaan.</p>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default About;
