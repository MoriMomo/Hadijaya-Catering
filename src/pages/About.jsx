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

        <div className="py-20 bg-slate-50 min-h-screen animate-fade-in">
            <div className="max-w-6xl mx-auto px-6 space-y-16">
                {/* Hero Section */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">Tentang Kami</p>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                            Hadijaya Catering — Layanan Katering Berkualitas Sejak 2000.
                        </h1>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
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
                            className="w-full h-[22rem] object-cover"
                            alt="Dapur Hadijaya Catering"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" aria-hidden="true" />
                    </div>
                </div>

                {/* Visi & Misi */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Visi</h3>
                        <p className="text-slate-600 leading-relaxed font-medium">
                            Menjadi perusahaan yang profesional, dapat diandalkan serta bertanggung jawab.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Misi</h3>
                        <ul className="space-y-3 text-slate-600">
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
                    <p className="text-slate-600 mb-6">
                        Saat ini sudah cukup banyak perusahaan atau instansi besar yang mempercayakan kebutuhannya kepada PT. Hadi Jaya Citra karena pelayanannya yang memuaskan.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Okezone.com', 'Novell Pharma', 'DIPA Healthcare', 'LKPP', 'Matahari Mall', 'Reinovasi'].map((client) => (
                            <div key={client} className="bg-white p-4 rounded-lg border border-slate-200 text-center text-slate-700 font-medium text-sm">
                                {client}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Kontak */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Profil & Kontak</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                        <div>
                            <p className="font-bold text-slate-700">PT. Hadi Jaya Citra</p>
                            <p className="mt-1">Perseroan Terbatas (PT)</p>
                            <p className="text-xs text-slate-500 mt-1">Akte Pendirian No. 02 - 11 Agustus 2017</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-700">NPWP: 82.695.476.0-035.000</p>
                            <p className="mt-2">No. SIUP Kecil: 142/24.1PK/31.73.05/-1.824.27/e/2017</p>
                            <p className="mt-1">TDP: 09.02.1.46.58715</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="font-bold text-slate-700 mb-2">Alamat:</p>
                            <p>Jl. Pos Pengumben Lama No. 10, Sukabumi Selatan, Kebon Jeruk, DKI Jakarta 11560</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-700 mb-2">Telepon:</p>
                            <p>0888-08656-200</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-700 mb-2">Email:</p>
                            <p>pt.hjcitra@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default About;
