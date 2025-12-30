import React, { useState, useEffect } from 'react';
import {
  Menu, X, MapPin, Phone, Instagram, Facebook, MessageCircle,
  Star, Users, Clock, Award, ArrowRight, CheckCircle,
  Calendar, ShoppingBag, TrendingUp, Calculator, ChevronRight,
  AlertTriangle, Info, Send, ClipboardList, Plus
} from 'lucide-react';
// import logo from './assets/images/logo.png';

// --- DATA CONSTANTS ---

const MENU_DATA = [
  {
    id: 1,
    name: "Nasi Uduk Hijau Komplit",
    category: "ricebox",
    price: 35000,
    desc: "Signature rice infused with pandan & suji leaves. Served with Spiced Fried Chicken, Orek Tempe, Shredded Omelet, and Peanut Sambal.",
    img: "image_732b01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800",
    featured: true
  },
  {
    id: 2,
    name: "Ayam Bakar Madu Special",
    category: "ricebox",
    price: 32000,
    desc: "Charcoal-grilled chicken glazed with honey and spices. Includes fresh lalapan, white rice, and our signature Sambal Terasi.",
    img: "image_732b03.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1574484284008-86d47dc7b905?q=80&w=800",
    featured: true
  },
  {
    id: 3,
    name: "Snack Box Silsalah",
    category: "snack",
    price: 15000,
    desc: "Premium traditional snacks: 1 Pastel, 1 Risol Mayo, 1 Lemper Ayam + Mineral Water. Perfect for meetings.",
    img: "image_732b04.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800",
    featured: true
  },
  {
    id: 4,
    name: "Prasmanan Nusantara",
    category: "buffet",
    price: 0,
    desc: "Full buffet service for weddings or corporate events. Custom menu selection available (Min. 50 Pax).",
    img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=800",
    featured: false
  },
  {
    id: 5,
    name: "Tumpeng Mini Hajatan",
    category: "ricebox",
    price: 40000,
    desc: "Festive yellow rice cone with 7 distinct side dishes. Beautifully packaged for celebrations.",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800",
    featured: false
  },
  {
    id: 6,
    name: "Coffee Break Set",
    category: "snack",
    price: 25000,
    desc: "Kopi/Teh + 2 Kue Manis + 1 Kue Asin.",
    img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=600",
    featured: false
  }
];

const ORDER_HISTORY = [
  { client: "Kementerian A", date: "25 Okt 2023", pax: 150, value: 7500000, status: "Selesai" },
  { client: "Ibu Siti Arisan", date: "28 Okt 2023", pax: 50, value: 2000000, status: "Pending" },
  { client: "Dinas Pendidikan", date: "02 Nov 2023", pax: 300, value: 15000000, status: "Confirmed" }
];

// --- SHARED COMPONENTS ---

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// --- VIEWS ---

const HomeView = ({ onViewChange }) => (
  <div className="animate-fade-in pb-12">
    {/* Hero Section */}
    <div className="relative bg-[#fcfbf9] min-h-[650px] flex items-center overflow-hidden">
      <div className="absolute right-[-10%] top-[-20%] w-[60%] h-[120%] bg-orange-50/50 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid md:grid-cols-2 gap-16 items-center pt-20 md:pt-0">
        <div className="space-y-8 animate-slide-up order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-orange-100">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-orange-800 font-bold tracking-widest text-xs uppercase">Est. 1999</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight md:leading-[1.1]">
            Cita Rasa <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-orange-500 italic">Legendaris</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-md font-light">
            Nikmati kelezatan Nasi Uduk Hijau otentik. Pilihan utama instansi pemerintah dan keluarga Jakarta Selatan untuk setiap momen spesial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button onClick={() => onViewChange('menu')} className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-orange-200 transition transform hover:-translate-y-1 text-sm tracking-wide text-center">
              LIHAT MENU
            </button>
            <button onClick={() => onViewChange('order')} className="bg-transparent hover:bg-white text-orange-900 border border-slate-300 hover:border-orange-200 px-8 py-4 rounded-full font-bold transition flex items-center justify-center gap-2 text-sm tracking-wide">
              RESERVASI
            </button>
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-700 aspect-square md:aspect-auto md:h-[500px]">
            <img
              src="image_732b01.jpg"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800'; }}
              className="object-cover w-full h-full"
              alt="Hadijaya Signature Dish"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-slate-100 animate-slide-up hidden md:block">
            <div className="flex items-center gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-sm font-bold text-slate-800 italic">"Rasa nasi uduknya benar-benar mengingatkan masakan rumah, tapi versi premium!"</p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">IB</div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Ibu Budi, Kemendikbud</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Features */}
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Kenapa Hadijaya?</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-3 mb-6">Kualitas Tanpa Kompromi</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: Users, title: "Kapasitas 500+ Pax", desc: "Didukung dapur komunitas solid, siap melayani event besar instansi maupun resepsi." },
            { icon: Clock, title: "Fresh Made", desc: "Bahan dibelanjakan H-1 acara. Tidak ada stok lama. Kesegaran adalah kunci rasa kami." },
            { icon: Award, title: "Mitra Pemerintah", desc: "Terdaftar resmi di E-Order. Administrasi rapi dan terpercaya untuk pengadaan." }
          ].map((item, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-orange-700 mb-8 group-hover:bg-orange-500 group-hover:text-white transition duration-500">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Menu Highlight */}
    <div className="py-24 bg-slate-100 hero-pattern">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Menu Favorit</h2>
            <p className="text-slate-500 mt-4 max-w-md font-light">Pilihan hidangan yang paling sering dipesan untuk rapat dan acara spesial.</p>
          </div>
          <button onClick={() => onViewChange('menu')} className="group flex items-center gap-3 text-orange-800 font-bold uppercase tracking-wider text-sm hover:text-orange-600 transition">
            Lihat Menu Lengkap <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {MENU_DATA.filter(item => item.featured).map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden hover-card group cursor-pointer" onClick={() => onViewChange('order')}>
              <div className="h-72 overflow-hidden relative">
                <img
                  src={item.img}
                  onError={(e) => { e.target.onerror = null; e.target.src = item.fallbackImg; }}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  alt={item.name}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full">
                  <span className="text-orange-800 font-bold text-xs uppercase tracking-wider">Best Seller</span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-3">{item.name}</h3>
                <p className="text-slate-500 mb-6 font-light line-clamp-2">{item.desc}</p>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-orange-700">Rp {item.price.toLocaleString('id-ID')}</span>
                  <span className="text-slate-400 text-sm">per pax/box</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="py-24 bg-orange-900 relative overflow-hidden text-center px-6">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">Siap untuk Momen Spesial?</h2>
        <p className="text-orange-100 text-lg mb-10 font-light max-w-2xl mx-auto">Diskusikan kebutuhan katering Anda, dari nasi box hingga prasmanan besar. Kami siap memberikan penawaran terbaik.</p>
        <button onClick={() => onViewChange('order')} className="bg-amber-500 hover:bg-amber-600 text-white px-12 py-5 rounded-full font-bold shadow-2xl transition transform hover:scale-105 tracking-wide text-lg w-full md:w-auto">
          Minta Penawaran
        </button>
      </div>
    </div>
  </div>
);

const MenuView = ({ onViewChange }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all'
    ? MENU_DATA
    : MENU_DATA.filter(item => item.category === activeCategory);

  const getBtnClass = (cat) => activeCategory === cat
    ? "bg-orange-600 text-white shadow-lg"
    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200";

  return (
    <div className="pt-12 pb-24 bg-slate-50 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">Menu & Harga</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'ricebox', 'buffet', 'snack'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition capitalize ${getBtnClass(cat)}`}
              >
                {cat === 'all' ? 'Semua' : cat === 'ricebox' ? 'Nasi Box' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex gap-5 hover:border-orange-200 transition group hover:shadow-lg">
              <div className="w-24 h-24 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0">
                <img
                  src={item.img}
                  onError={(e) => { e.target.onerror = null; e.target.src = item.fallbackImg; }}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  alt={item.name}
                />
              </div>
              <div className="flex flex-col justify-center w-full">
                <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500 mb-3 font-light line-clamp-2">{item.desc}</p>
                <div className="mt-auto flex justify-between items-center">
                  {item.price > 0
                    ? <span className="text-orange-700 font-bold">Rp {item.price.toLocaleString('id-ID')}</span>
                    : <span className="text-amber-500 font-bold text-sm">Hubungi Kami</span>
                  }
                  <button onClick={() => onViewChange('order')} className="p-2 bg-slate-50 rounded-full hover:bg-orange-100 text-orange-600 transition"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrderView = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', type: 'Nasi Uduk Hijau Komplit', pax: '' });
  const [dateWarning, setDateWarning] = useState(false);

  const checkDate = (dateVal) => {
    const selectedDate = new Date(dateVal);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = selectedDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 3;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (id === 'date') {
      setDateWarning(!checkDate(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkDate(formData.date)) {
      alert("Mohon pilih tanggal minimal H-3 dari hari ini.");
      return;
    }
    const message = `Halo Hadijaya Catering,%0A%0ASaya ingin memesan:%0A- Nama: ${formData.name}%0A- No HP: ${formData.phone}%0A- Tanggal: ${formData.date}%0A- Menu: ${formData.type}%0A- Jumlah: ${formData.pax} porsi%0A%0AMohon info ketersediaan dan total harga. Terima kasih.`;
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  return (
    <div className="pt-12 pb-24 bg-white min-h-screen animate-fade-in">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-slate-900">Reservasi Pesanan</h2>
          <p className="text-slate-500 mt-4 font-light">Silakan isi formulir di bawah. Tim kami akan segera menghubungi Anda via WhatsApp untuk konfirmasi.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-orange-800"></div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Nama Lengkap</label>
                <input type="text" id="name" required value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border-0 border-b-2 border-slate-200 px-4 py-3 text-slate-900 focus:ring-0 focus:border-orange-500 transition placeholder-slate-400 focus:outline-none" placeholder="Nama Anda" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Nomor WhatsApp</label>
                <input type="tel" id="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border-0 border-b-2 border-slate-200 px-4 py-3 text-slate-900 focus:ring-0 focus:border-orange-500 transition placeholder-slate-400 focus:outline-none" placeholder="0812..." />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Tanggal Acara</label>
              <input type="date" id="date" required value={formData.date} onChange={handleChange} className={`w-full bg-slate-50 border-0 border-b-2 px-4 py-3 text-slate-900 focus:ring-0 transition focus:outline-none ${dateWarning ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-orange-500'}`} />
              {dateWarning && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-2 font-bold bg-red-50 p-3 rounded-lg">
                  <AlertTriangle className="w-4 h-4" /> Pemesanan minimal H-3 dari tanggal acara.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Jenis Layanan</label>
                <select id="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-50 border-0 border-b-2 border-slate-200 px-4 py-3 text-slate-900 focus:ring-0 focus:border-orange-500 transition cursor-pointer appearance-none">
                  {MENU_DATA.map(menu => (
                    <option key={menu.id} value={menu.name}>{menu.name}</option>
                  ))}
                  <option value="Custom Order">Custom Order (Diskusi via WA)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Jumlah Porsi</label>
                <input type="number" id="pax" required min="10" value={formData.pax} onChange={handleChange} placeholder="Min. 10 Porsi" className="w-full bg-slate-50 border-0 border-b-2 border-slate-200 px-4 py-3 text-slate-900 focus:ring-0 focus:border-orange-500 transition focus:outline-none" />
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg tracking-wide">
                <Send className="w-5 h-5" /> Kirim Pesanan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AboutView = () => (
  <div className="py-24 bg-slate-50 min-h-screen animate-fade-in">
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-100 rounded-3xl transform rotate-3"></div>
          <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=800" className="relative rounded-3xl shadow-2xl z-10 w-full h-auto object-cover" alt="Cooking" />
        </div>
        <div>
          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Tentang Kami</span>
          <h2 className="text-4xl font-serif font-bold text-slate-900 mt-4 mb-6">Dedikasi Rasa Sejak 1999</h2>
          <p className="text-slate-600 leading-relaxed mb-6 font-light text-lg">
            Perjalanan Hadijaya Catering bermula dari dapur sederhana Ibu Hadija yang menjual camilan titipan. Berkat kepercayaan pelanggan, kami tumbuh menjadi penyedia layanan katering profesional di Kebayoran Lama.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8 font-light text-lg">
            Kami percaya bahwa makanan bukan sekadar rasa, tapi tentang menghormati tamu. Itulah mengapa kami tetap mempertahankan cara masak tradisional dengan standar kebersihan modern.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-1 bg-orange-500"></div>
            <span className="font-serif italic text-xl text-slate-800">Ibu Hadija & Keluarga</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- OWNER VIEWS ---

const DashboardView = ({ onViewChange }) => (
  <div className="bg-slate-50 min-h-screen p-8 animate-fade-in">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-serif">Dashboard Pemilik</h2>
          <p className="text-slate-500 mt-1">Ringkasan operasional & keuangan.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-bold text-orange-700 border border-orange-100 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-orange-200 transition">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-50 text-red-500 rounded-xl"><Clock className="w-6 h-6" /></div>
            <span className="text-xs font-bold text-red-400 bg-red-50 px-2 py-1 rounded-lg">Tertunda</span>
          </div>
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Tagihan E-Order</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">Rp 45.2 Jt</h3>
          <p className="text-xs text-slate-400 mt-2">Est. cair 1-3 bulan</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-orange-200 transition">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl"><ShoppingBag className="w-6 h-6" /></div>
            <span className="text-xs font-bold text-blue-400 bg-blue-50 px-2 py-1 rounded-lg">+12%</span>
          </div>
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Order Minggu Ini</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">12 Event</h3>
          <p className="text-xs text-slate-400 mt-2">Kapasitas dapur aman</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-orange-200 transition">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-green-500 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
            <span className="text-xs font-bold text-green-400 bg-green-50 px-2 py-1 rounded-lg">Profit</span>
          </div>
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Est. Bersih Bulan Ini</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">Rp 12.5 Jt</h3>
          <p className="text-xs text-slate-400 mt-2">Margin rata-rata 30%</p>
        </div>
        <div onClick={() => onViewChange('finance')} className="bg-orange-600 p-6 rounded-2xl shadow-xl text-white flex flex-col justify-between relative overflow-hidden group cursor-pointer">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white/20 transition"></div>
          <h3 className="font-bold text-lg mb-2 relative z-10">Kalkulator Profit</h3>
          <p className="text-orange-100 text-xs mb-4 relative z-10">Hitung dulu sebelum terima order besar.</p>
          <div className="flex items-center gap-2 font-bold text-sm relative z-10">
            Buka Tools <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-900">Pesanan Masuk</h3>
          <button onClick={() => onViewChange('orders')} className="text-sm text-orange-700 hover:text-orange-900 font-bold flex items-center gap-1">Lihat Semua <ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4 font-bold uppercase text-xs tracking-wider">Klien</th>
                <th className="px-8 py-4 font-bold uppercase text-xs tracking-wider">Tanggal</th>
                <th className="px-8 py-4 font-bold uppercase text-xs tracking-wider">Jumlah</th>
                <th className="px-8 py-4 font-bold uppercase text-xs tracking-wider">Nilai</th>
                <th className="px-8 py-4 font-bold uppercase text-xs tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ORDER_HISTORY.slice(0, 2).map((order, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="px-8 py-4 font-bold text-slate-900">{order.client}</td>
                  <td className="px-8 py-4 text-slate-600">{order.date}</td>
                  <td className="px-8 py-4 text-slate-600">{order.pax} Pax</td>
                  <td className="px-8 py-4 font-mono text-slate-600">Rp {order.value.toLocaleString('id-ID')}</td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${order.status === 'Selesai' ? 'bg-green-100 text-green-700 border-green-200' :
                      order.status === 'Confirmed' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        'bg-yellow-100 text-yellow-700 border-yellow-200'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const FinanceView = ({ onViewChange }) => {
  const [vals, setVals] = useState({ revenue: '', material: '', labor: '', overhead: '' });
  const [result, setResult] = useState(null);

  const calculate = () => {
    const rev = parseFloat(vals.revenue) || 0;
    const cost = (parseFloat(vals.material) || 0) + (parseFloat(vals.labor) || 0) + (parseFloat(vals.overhead) || 0);
    const profit = rev - cost;
    setResult({ profit, margin: rev ? ((profit / rev) * 100).toFixed(1) : 0 });
  };

  return (
    <div className="bg-slate-50 min-h-screen p-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => onViewChange('dashboard')} className="text-slate-500 hover:text-slate-900 flex items-center gap-2 mb-8 font-bold transition hover:-translate-x-1"><ArrowRight className="w-4 h-4 rotate-180" /> Kembali ke Dashboard</button>

        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 border border-orange-100">
              <Calculator className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Kalkulator Profit</h2>
              <p className="text-slate-500 text-sm">Estimasi keuntungan bersih per event.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wide font-bold mb-2 text-slate-500">Total Nilai Kontrak (Rp)</label>
              <input type="number" value={vals.revenue} onChange={(e) => setVals({ ...vals, revenue: e.target.value })} className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition font-bold text-lg" placeholder="0" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wide font-bold mb-2 text-slate-500">Modal Bahan</label>
                <input type="number" value={vals.material} onChange={(e) => setVals({ ...vals, material: e.target.value })} className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" placeholder="Belanja Pasar" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide font-bold mb-2 text-slate-500">Upah Tenaga</label>
                <input type="number" value={vals.labor} onChange={(e) => setVals({ ...vals, labor: e.target.value })} className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" placeholder="Gaji Masak" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide font-bold mb-2 text-slate-500">Operasional (Gas/Bensin)</label>
              <input type="number" value={vals.overhead} onChange={(e) => setVals({ ...vals, overhead: e.target.value })} className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" placeholder="Transport, Gas, Box" />
            </div>

            <button onClick={calculate} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition shadow-lg mt-4 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" /> Hitung Estimasi
            </button>
          </div>

          {result && (
            <div className="mt-8 animate-slide-up border-t border-dashed border-slate-200 pt-8">
              <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-2 font-bold">Estimasi Profit Bersih</p>
                <div className={`text-4xl font-serif font-bold mb-2 ${result.profit > 0 ? 'text-orange-700' : 'text-red-500'}`}>Rp {result.profit.toLocaleString('id-ID')}</div>
                <div className={`text-sm font-bold inline-block px-4 py-1.5 rounded-full ${result.profit > 0 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-700'}`}>
                  {result.profit > 0 ? `Margin Profit: ${result.margin}%` : 'Potensi Rugi'}
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center mt-4 flex items-center justify-center gap-2">
                <Info className="w-3 h-3" /> Catatan: Pembayaran E-Order cair 1-3 bulan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrdersTableView = ({ onViewChange }) => (
  <div className="bg-slate-50 min-h-screen p-8 animate-fade-in">
    <div className="max-w-5xl mx-auto">
      <button onClick={() => onViewChange('dashboard')} className="text-slate-500 hover:text-slate-900 flex items-center gap-2 mb-8 font-bold transition hover:-translate-x-1"><ArrowRight className="w-4 h-4 rotate-180" /> Kembali</button>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm border border-slate-100"><ClipboardList className="w-6 h-6" /></div>
        <h2 className="text-3xl font-bold text-slate-900 font-serif">Riwayat Pesanan</h2>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Klien</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Pax</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Nilai</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
            {ORDER_HISTORY.map((order, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition">
                <td className="p-6 font-bold text-slate-900">{order.client}</td>
                <td className="p-6">{order.date}</td>
                <td className="p-6">{order.pax}</td>
                <td className="p-6 font-mono font-bold text-slate-600">Rp {order.value.toLocaleString('id-ID')}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${order.status === 'Selesai' ? 'bg-green-100 text-green-700 border-green-200' :
                    order.status === 'Confirmed' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      'bg-yellow-100 text-yellow-700 border-yellow-200'
                    }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [role, setRole] = useState('customer');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="font-sans antialiased text-slate-800 selection:bg-orange-200 selection:text-orange-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .hero-pattern {
          background-color: #fdfbf7;
          background-image: radial-gradient(#065f46 0.5px, transparent 0.5px);
          background-size: 24px 24px;
        }
        .hover-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
      `}</style>

      <div className="min-h-screen bg-stone-50">
        <Navbar
          role={role}
          currentView={currentView}
          onViewChange={setCurrentView}
          onRoleChange={(newRole) => {
            setRole(newRole);
            setCurrentView(newRole === 'owner' ? 'dashboard' : 'home');
          }}
        />

        <main>
          {role === 'customer' ? (
            <>
              {currentView === 'home' && <HomeView onViewChange={setCurrentView} />}
              {currentView === 'menu' && <MenuView onViewChange={setCurrentView} />}
              {currentView === 'order' && <OrderView />}
              {currentView === 'about' && <AboutView />}
            </>
          ) : (
            <>
              {currentView === 'dashboard' && <DashboardView onViewChange={setCurrentView} />}
              {currentView === 'finance' && <FinanceView onViewChange={setCurrentView} />}
              {currentView === 'orders' && <OrdersTableView onViewChange={setCurrentView} />}
            </>
          )}
        </main>

        {role === 'customer' && <Footer onRoleChange={(newRole) => {
          setRole(newRole);
          setCurrentView('dashboard');
        }} />}

        <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all hover:scale-110 z-50 flex items-center gap-2 md:gap-3 group border-2 md:border-4 border-white/20">
          <MessageCircle className="w-5 h-5 md:w-7 md:h-7" />
          <span className="max-w-0 overflow-hidden md:group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-bold text-sm md:text-lg">Chat WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default App;