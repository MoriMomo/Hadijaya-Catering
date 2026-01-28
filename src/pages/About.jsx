import React from 'react';
import { Helmet } from 'react-helmet-async';
import OptimizedImage from '../components/OptimizedImage';

const About = () => (
    <>
        <Helmet>
            <title>Tentang Kami - Hadijaya Catering</title>
            <meta
                name="description"
                content="Hadijaya Catering berdiri sejak 2010 dengan layanan katering korporat, pemerintahan, dan acara khusus. Fokus pada kualitas bahan, dapur higienis, dan pelayanan profesional."
            />
            <meta property="og:title" content="Tentang Kami - Hadijaya Catering" />
            <meta
                property="og:description"
                content="Sejak 2010, Hadijaya Catering menghadirkan layanan katering berkualitas dengan dapur higienis, chef profesional, dan standar layanan bintang lima."
            />
            <meta property="og:type" content="website" />
        </Helmet>

        <div className="pt-24 pb-20 bg-slate-50 min-h-screen animate-fade-in">
            <div className="max-w-6xl mx-auto px-6 space-y-20">
                {/* Hero Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">Tentang Kami</p>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                            Hadijaya Catering — Layanan Katering Berkualitas Sejak 2000.
                        </h1>
                        <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                            <p>
                                Sejak tahun 2000, Hadi Jaya Citra telah melayani berbagai kebutuhan bisnis dengan dedikasi dan komitmen untuk terus berkembang.
                                Pada tahun 2017, kami resmi menjadi Perseroan Terbatas untuk memperkuat visi profesionalisme kami.
                            </p>
                            <p>
                                Kami menyediakan solusi komprehensif: layanan catering berkualitas, penyediaan alat tulis kantor, dan jasa pembersihan profesional.
                                Kepercayaan klien adalah aset terbesar kami.
                            </p>
                        </div>
                    </div>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <OptimizedImage
                            src="/images/hadijaya/makanan/dapur.webp"
                            fallback="/images/placeholder.svg"
                            className="w-full h-[28rem] object-cover"
                            alt="Dapur Hadijaya Catering"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" aria-hidden="true" />
                    </div>
                </div>

                {/* Visi & Misi */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">Visi</h3>
                        <p className="text-slate-600 leading-relaxed text-base">
                            Menjadi perusahaan yang profesional, dapat diandalkan serta bertanggung jawab.
                        </p>
                    </div>
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">Misi</h3>
                        <ul className="space-y-3 text-slate-600 text-base">
                            <li className="flex gap-3">
                                <span className="text-orange-600 font-bold">•</span>
                                <span>Senantiasa mengembangkan kesempurnaan proses bisnis untuk terus maju.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-orange-600 font-bold">•</span>
                                <span>Memberikan pelayanan terbaik untuk setiap klien.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-orange-600 font-bold">•</span>
                                <span>Menjadi rekanan yang saling memberikan manfaat dan dipercaya.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Komitmen & Layanan */}


                {/* Klien Terpercaya */}
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600 mb-6">Klien Kami</p>
                    <p className="text-slate-600 mb-8 text-base leading-relaxed">
                        Saat ini sudah cukup banyak perusahaan atau instansi besar yang mempercayakan kebutuhannya kepada PT. Hadi Jaya Citra karena pelayanannya yang memuaskan.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Okezone.com', 'Novell Pharma', 'DIPA Healthcare', 'LKPP', 'Matahari Mall', 'Reinovasi'].map((client) => (
                            <div key={client} className="bg-white p-6 rounded-lg border border-slate-200 text-center text-slate-700 font-medium text-sm hover:shadow-md transition-shadow">
                                {client}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Kontak */}
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Profil & Kontak</h3>
                    <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-600">
                        <div>
                            <p className="font-bold text-slate-900 text-base">PT. Hadi Jaya Citra</p>
                            <p className="mt-2">Perseroan Terbatas (PT)</p>
                            <p className="text-xs text-slate-500 mt-2">Akte Pendirian No. 02 - 11 Agustus 2017</p>
                        </div>

                        <div className="md:col-span-2">
                            <p className="font-bold text-slate-900 mb-3 text-base">Alamat:</p>
                            <p className="text-base">Jl. Pos Pengumben Lama No. 10, Sukabumi Selatan, Kebon Jeruk, DKI Jakarta 11560</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 mb-3 text-base">Telepon:</p>
                            <p className="text-base">0888-08656-200</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 mb-3 text-base">Email:</p>
                            <p className="text-base">pt.hjcitra@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default About;
