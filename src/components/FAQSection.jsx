import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ_DATA = [
    {
        question: 'Apakah ada minimal pemesanan untuk Nasi Box/Prasmanan?',
        answer: 'Ya, minimal pemesanan untuk Nasi Box adalah 20 porsi. Untuk prasmanan (buffet), minimal pesanan adalah 50 porsi. Untuk acara di bawah kapasitas tersebut, bisa dikonsultasikan via WhatsApp.'
    },
    {
        question: 'Berapa hari sebelumnya saya harus memesan?',
        answer: 'Idealnya pemesanan dilakukan minimal H-3 sebelum acara agar kami dapat mempersiapkan bahan-bahan paling segar. Namun, untuk kondisi darurat, kami bisa menerima pesanan H-1 (tergantung ketersediaan slot).'
    },
    {
        question: 'Apakah melayani pengiriman ke luar Jakarta Selatan?',
        answer: 'Tentu! Kami melayani seluruh wilayah Jadetabek (Jakarta, Depok, Tangerang, Bekasi). Akan ada penyesuaian biaya pengiriman berdasarkan jarak dari lokasi dapur kami di Jakarta Selatan.'
    },
    {
        question: 'Bagaimana sistem pembayaran dan dp (down payment)?',
        answer: 'Kami mewajibkan DP sebesar 50% untuk mengunci tanggal pemesanan Anda. Sisa pembayaran (pelunasan) dapat dilakukan maksimal H-1 acara atau tunai di lokasi pada hari H.'
    },
    {
        question: 'Apakah menunya bisa dicustom atau disesuaikan budget?',
        answer: 'Sangat bisa! Anda bisa menyesuaikan lauk pauk, sayuran, dan jenis nasi (Uduk Hijau, Uduk Biasa, Nasi Putih) sesuai dengan budget acara Anda. Silakan hubungi admin kami untuk penyesuaian.'
    }
];

const FAQItem = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border border-slate-200/60 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <button
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-accent-400"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="font-bold text-slate-800 pr-4 text-base md:text-lg">{faq.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500"
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="px-6 pb-5 pt-0 text-slate-600 font-light leading-relaxed text-sm md:text-base border-t border-slate-50 mt-2">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="py-20 bg-[#faf9f6] transition-colors duration-300 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-100 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-12"
                >
                    <span className="text-accent-400 font-bold uppercase tracking-widest text-xs">Informasi Pemesanan</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-3 mb-6">Pertanyaan Populer (FAQ)</h2>
                    <div className="w-16 h-1 bg-accent-400 mx-auto"></div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                    className="space-y-4"
                >
                    {FAQ_DATA.map((faq, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                            }}
                        >
                            <FAQItem
                                faq={faq}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center text-slate-500 font-light text-sm"
                >
                    Masih punya pertanyaan? <a href="/order" className="text-accent-500 font-bold hover:underline">Hubungi kami via WhatsApp</a>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQSection;
