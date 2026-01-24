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
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">Tentang Kami</p>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                            Medina Catering di Menara 165, hadirkan layanan katering premium sejak 2010.
                        </h1>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                Berdiri di bawah naungan ESQ Group, kami melayani korporasi multinasional, instansi pemerintah, gathering, meeting, seminar,
                                dan pernikahan. Fokus kami: kualitas rasa, kebersihan, dan pelayanan yang ramah serta profesional.
                            </p>
                            <p>
                                Kami memilih bahan baku dengan standar tinggi dan menjalankan operasional bersama chef profesional agar setiap sajian tetap
                                higienis, terjaga mutu, dan prima saat disajikan.
                            </p>
                            <p>
                                Selain bahan terbaik, kami berkomitmen memberi pengalaman layaknya layanan bintang lima di setiap kesempatan.
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

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Visi</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Menjadi role model perusahaan jasa boga dengan pelayanan terbaik bagi setiap pelanggan.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Misi</h3>
                        <ul className="list-disc list-inside space-y-2 text-slate-600">
                            <li>Menyajikan makanan dengan cita rasa terbaik dan berkualitas.</li>
                            <li>Menerapkan standar baku melalui riset dalam pengelolaan makanan.</li>
                            <li>Memberikan pelayanan ramah dengan standar bintang lima.</li>
                        </ul>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-start">
                    <div className="space-y-3">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">Dapur</p>
                        <h2 className="text-3xl font-serif font-bold text-slate-900">Higienis, aman, dan nyaman.</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Kebersihan adalah prioritas. Kami menyiapkan dapur dengan tingkat higienis tinggi, sirkulasi udara terjaga, dan prosedur yang
                            menghindarkan pertumbuhan bakteri. Kualitas dan kuantitas masakan terjamin mutunya, baik bagi pelanggan maupun kenyamanan tim.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-2">
                        <h3 className="text-lg font-bold text-slate-900">Tim Profesional</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Kepuasan pelanggan berawal dari tim yang solid. Dengan chef dan staf berpengalaman, kami siap membantu mewujudkan pengalaman
                            kuliner yang berkesan pada setiap acara.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Pelayanan ramah dan harmonis menjadi dasar kami dalam menyajikan kebahagiaan melalui hidangan yang berkualitas.
                        </p>
                    </div>
                </div>


            </div>
        </div>
    </>
);

export default About;
