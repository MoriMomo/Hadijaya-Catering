import React from 'react';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';

const Footer = ({ onRoleChange }) => (
    <footer className="bg-orange-900 text-white pt-20 pb-10 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-serif font-bold text-xl border border-white/20">H</div>
                    <span className="font-serif text-2xl font-bold tracking-wide">Hadijaya Catering</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-light">
                    Menghadirkan cita rasa nusantara yang otentik sejak 1999. Spesialis Nasi Uduk Hijau dan layanan prasmanan premium untuk momen berharga Anda.
                </p>
                <div className="flex gap-4">
                    <a href="https://www.instagram.com/hadijayacatering/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-white transition duration-300"><Instagram className="w-5 h-5" /></a>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-white transition duration-300"><Facebook className="w-5 h-5" /></button>
                </div>
            </div>
            <div>
                <h4 className="font-bold text-amber-400 mb-6 font-serif text-lg">Kontak & Lokasi</h4>
                <ul className="space-y-4 text-sm text-slate-300 font-light">
                    <li className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-amber-500 mt-0.5" />
                        <span>Kebayoran Lama,<br />Jakarta Selatan</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-amber-500" />
                        <span>+62 812-3456-7890</span>
                    </li>
                    <li className="pt-6">
                        <button onClick={() => onRoleChange('owner')} className="text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-white px-4 py-2 rounded-full transition w-full text-center">Admin Login</button>
                    </li>
                </ul>
            </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-xs text-slate-500">&copy; 2025 Hadijaya Catering. Crafted with excellence.</p>
        </div>
    </footer>
);

export default Footer;