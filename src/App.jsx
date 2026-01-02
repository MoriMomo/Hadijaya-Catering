import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, MapPin, Phone, Instagram, Facebook, MessageCircle,
  Star, Users, Clock, Award, ArrowRight, CheckCircle,
  Calendar, ShoppingBag, TrendingUp, Calculator, ChevronRight,
  AlertTriangle, Info, Send, ClipboardList, Plus
} from 'lucide-react';
// import logo from './assets/images/logo.png';

// --- DATA CONSTANTS ---

const MENU_DATA = [
  // Paket spesial
  { id: 1, name: 'Paket A - Nasi Uduk Ijo + Daging Semur', category: 'paket', price: 35000, desc: 'Nasi Uduk Ijo, Daging Semur, Kentang Sambel Goreng, Sambel Trasi Mangga, Krupuk & Lalapan', featured: true },
  { id: 2, name: 'Paket B - Nasi Uduk Ijo + Daging Dengdeng', category: 'paket', price: 35000, desc: 'Nasi Uduk Ijo, Daging Dengdeng, Tempe Orek, Sambel Trasi Mangga, Krupuk & Lalapan', featured: true },
  { id: 3, name: 'Paket C - Nasi Uduk Ijo + Ayam Goreng', category: 'paket', price: 30000, desc: 'Nasi Uduk Ijo, Ayam Goreng, Tempe Orek, Sambel Trasi Mangga, Krupuk & Lalapan', featured: false },
  { id: 4, name: 'Paket D - Nasi Uduk Ijo + Ayam Rendang', category: 'paket', price: 30000, desc: 'Nasi Uduk Ijo, Ayam Rendang, Tempe Orek, Sambel Trasi Mangga, Krupuk & Lalapan', featured: false },

  // Nasi
  { id: 10, name: 'Nasi Uduk Ijo', category: 'nasi', price: 12000, desc: 'Nasi uduk harum daun suji/pandan', featured: false },
  { id: 11, name: 'Nasi Uduk Kuning', category: 'nasi', price: 10000, desc: 'Nasi kuning untuk acara spesial', featured: false },
  { id: 12, name: 'Nasi Uduk Putih', category: 'nasi', price: 9000, desc: 'Nasi uduk tanpa pewarna', featured: false },
  { id: 13, name: 'Nasi Biasa', category: 'nasi', price: 7000, desc: 'Nasi putih biasa', featured: false },

  // Daging (Sapi)
  { id: 20, name: 'Empal', category: 'daging', price: 20000, desc: 'Empal sapi empuk', featured: false },
  { id: 21, name: 'Semur', category: 'daging', price: 20000, desc: 'Semur daging manis gurih', featured: false },
  { id: 22, name: 'Rendang', category: 'daging', price: 20000, desc: 'Rendang sapi pedas sedap', featured: false },
  { id: 23, name: 'Sate Assem', category: 'daging', price: 20000, desc: 'Sate daging khas', featured: false },

  // Ayam
  { id: 30, name: 'Ayam Goreng', category: 'ayam', price: 15000, desc: 'Ayam goreng renyah', featured: false },
  { id: 31, name: 'Ayam Geprek', category: 'ayam', price: 15000, desc: 'Ayam geprek pedas', featured: false },
  { id: 32, name: 'Ayam Bakar', category: 'ayam', price: 15000, desc: 'Ayam bakar manis', featured: false },
  { id: 33, name: 'Ayam Gulai', category: 'ayam', price: 15000, desc: 'Ayam gulai santan', featured: false },
  { id: 34, name: 'Ayam Rendang', category: 'ayam', price: 15000, desc: 'Ayam rendang empuk', featured: false },
  { id: 35, name: 'Ayam Semur', category: 'ayam', price: 15000, desc: 'Ayam semur manis gurih', featured: false },

  // Telur
  { id: 40, name: 'Telur Balado', category: 'telur', price: 8000, desc: 'Telur balado pedas', featured: false },
  { id: 41, name: 'Telur Semur', category: 'telur', price: 8000, desc: 'Telur semur manis', featured: false },
  { id: 42, name: 'Telur Rendang', category: 'telur', price: 8000, desc: 'Telur rendang lezat', featured: false },

  // Tahu / Tempe
  { id: 50, name: 'Tahu/Tempe Goreng Spesial', category: 'tahu-tempe', price: 7000, desc: 'Tahu/tempe goreng spesial', featured: false },
  { id: 51, name: 'Tahu/Tempe Semur', category: 'tahu-tempe', price: 7000, desc: 'Tahu/tempe semur', featured: false },
  { id: 52, name: 'Tahu/Tempe Masak Kari', category: 'tahu-tempe', price: 7000, desc: 'Tahu/tempe kari', featured: false },
  { id: 53, name: 'Tempe Orek', category: 'tahu-tempe', price: 7000, desc: 'Tempe orek manis', featured: false },
  { id: 54, name: 'Tahu Orek Balado', category: 'tahu-tempe', price: 7000, desc: 'Tahu orek balado pedas', featured: false },

  // Sambel
  { id: 60, name: 'Sambel Mangga', category: 'sambel', price: 5000, desc: 'Sambel mangga segar', featured: false },
  { id: 61, name: 'Sambel Kacang', category: 'sambel', price: 3000, desc: 'Sambel kacang', featured: false },
  { id: 62, name: 'Sambel Goreng', category: 'sambel', price: 3000, desc: 'Sambel goreng pedas', featured: false },

  // Snack / Lainnya
  { id: 70, name: 'Pastel', category: 'snack', price: 4000, desc: 'Pastel goreng', featured: false },
  { id: 71, name: 'Risol', category: 'snack', price: 4000, desc: 'Risol mayo', featured: false },
  { id: 72, name: 'Kue Lupis', category: 'snack', price: 4000, desc: 'Kue lupis tradisional', featured: false },
  { id: 73, name: 'Kue Pisang', category: 'snack', price: 4000, desc: 'Kue pisang', featured: false },
  { id: 74, name: 'Lontong', category: 'snack', price: 4000, desc: 'Lontong', featured: false },
  { id: 75, name: 'Lemper', category: 'snack', price: 4000, desc: 'Lemper ayam', featured: false },
  { id: 76, name: 'Dadar Gulung', category: 'snack', price: 4000, desc: 'Dadar gulung', featured: false },
  { id: 77, name: 'Extra Buah', category: 'snack', price: 7000, desc: 'Porsi buah tambahan', featured: false }
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
    <div className="relative bg-[#fcfbf9] min-h-162.5 flex items-center overflow-hidden">
      <div className="absolute right-[-10%] top-[-20%] w-[60%] h-[120%] bg-orange-50/50 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid md:grid-cols-2 gap-16 items-center pt-20 md:pt-0">
        <div className="space-y-8 animate-slide-up order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-orange-100">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-orange-800 font-bold tracking-widest text-xs uppercase">Est. 1999</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight md:leading-[1.1]">
            Cita Rasa <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-700 to-orange-500 italic">Legendaris</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-md font-light">
            Nikmati kelezatan Nasi Uduk Hijau otentik. Pilihan utama instansi pemerintah dan keluarga Jakarta Selatan untuk setiap momen spesial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button onClick={() => onViewChange('menu')} className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-orange-200 transition transform hover:-translate-y-1 text-sm tracking-wide text-center">
              LIHAT MENU
            </button>
            <button onClick={() => onViewChange('order')} className="bg-transparent hover:bg-white text-white border border-slate-300 hover:border-orange-200 px-8 py-4 rounded-full font-bold transition flex items-center justify-center gap-2 text-sm tracking-wide">
              RESERVASI
            </button>
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <div className="relative z-10 rounded-4xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-700 aspect-square md:aspect-auto md:h-125">
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
              <div className="w-24 h-24 rounded-xl bg-slate-200 overflow-hidden shrink-0">
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
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [selectedDate, setSelectedDate] = useState('');
  const [dateWarning, setDateWarning] = useState(false);
  const idCounterRef = useRef(1);
  // eslint-disable-next-line react-hooks/refs
  const [orderLines, setOrderLines] = useState(() => [
    { id: idCounterRef.current, menuId: MENU_DATA[0].id, qty: 10 }
  ]);

  // generate selectable dates starting from H+2 for the next 30 days
  // we return an array of objects with parsed year/month/day to populate three dropdowns
  const generateDateOptions = (days = 30, minOffsetDays = 2) => {
    const opts = [];
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + minOffsetDays); // minimum H+2
    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      const display = d.toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
      opts.push({ value: iso, label: display, year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() });
    }
    return opts;
  };

  const dateOptions = generateDateOptions(30, 2);

  // separate state for year/month/day selects. We'll set defaults from dateOptions.
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    if (dateOptions.length && !selectedYear) {
      const first = dateOptions[0];
      setSelectedYear(String(first.year));
      setSelectedMonth(String(first.month));
      setSelectedDay(String(first.day));
      setSelectedDate(first.value);
    }
  }, [dateOptions, selectedYear]);

  // helper lists derived from allowed dates
  const allowedDates = dateOptions;
  const yearOptions = Array.from(new Set(allowedDates.map(d => d.year)));
  const monthOptionsForYear = (y) => Array.from(new Set(allowedDates.filter(d => d.year === Number(y)).map(d => d.month)));
  const dayOptionsForYearMonth = (y, m) => allowedDates.filter(d => d.year === Number(y) && d.month === Number(m)).map(d => ({ day: d.day, iso: d.value, label: d.label }));

  const handleYearChange = (y) => {
    setSelectedYear(y);
    const months = monthOptionsForYear(y);
    const m = months[0];
    setSelectedMonth(String(m));
    const days = dayOptionsForYearMonth(y, m);
    setSelectedDay(String(days[0].day));
    setSelectedDate(days[0].iso);
    setDateWarning(false);
  };

  const handleMonthChange = (m) => {
    setSelectedMonth(m);
    const days = dayOptionsForYearMonth(selectedYear, m);
    setSelectedDay(String(days[0].day));
    setSelectedDate(days[0].iso);
    setDateWarning(false);
  };

  const handleDayChange = (d) => {
    setSelectedDay(d);
    // find iso for this year/month/day
    const found = allowedDates.find(x => x.year === Number(selectedYear) && x.month === Number(selectedMonth) && x.day === Number(d));
    if (found) setSelectedDate(found.value);
    setDateWarning(false);
  };

  const handleField = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const addLine = () => {
    const nextId = ++idCounterRef.current;
    setOrderLines(prev => [...prev, { id: nextId, menuId: MENU_DATA[0].id, qty: 10 }]);
  };

  const updateLine = (id, patch) => {
    setOrderLines(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));
  };

  const removeLine = (id) => {
    setOrderLines(prev => prev.filter(l => l.id !== id));
  };

  const totalPortions = orderLines.reduce((s, l) => s + (Number(l.qty) || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Mohon isi nama dan nomor WhatsApp.');
      return;
    }
    if (!selectedDate) {
      alert('Pilih tanggal acara.');
      return;
    }
    // ensure selectedDate is within allowedDates (enforces H+2..)
    const validDate = allowedDates.find(d => d.value === selectedDate);
    if (!validDate) {
      setDateWarning(true);
      alert('Tanggal tidak tersedia. Pilih tanggal lain (pemesanan minimal H-2).');
      return;
    }
    if (totalPortions < 10) {
      alert('Total porsi minimal 10 (gabungan semua item).');
      return;
    }

    const linesText = orderLines.map(l => {
      const menu = MENU_DATA.find(m => m.id === Number(l.menuId)) || {};
      return `- ${menu.name || 'Item'}: ${l.qty} porsi`;
    }).join('%0A');

    const message = `Halo Hadijaya Catering,%0A%0ASaya ingin memesan untuk:%0A- Nama: ${encodeURIComponent(formData.name)}%0A- No HP: ${encodeURIComponent(formData.phone)}%0A- Tanggal: ${selectedDate}%0A%0ADaftar Pesanan:%0A${linesText}%0A%0ATotal porsi: ${totalPortions}%0A%0AMohon info ketersediaan dan total harga. Terima kasih.`;
    window.open(`https://wa.me/628111040342?text=${message}`, '_blank');
  };

  return (
    <div className="pt-12 pb-24 bg-white min-h-screen animate-fade-in">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-slate-900">Reservasi Pesanan</h2>
          <p className="text-slate-500 mt-4 font-light">Isi formulir dan daftar pesanan. Tim kami akan menghubungi via WhatsApp untuk konfirmasi.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Nama Lengkap</label>
              <input type="text" id="name" required value={formData.name} onChange={(e) => handleField('name', e.target.value)} className="w-full bg-slate-50 border-0 border-b-2 border-slate-200 px-4 py-3 text-slate-900 focus:ring-0 focus:border-orange-500 transition placeholder-slate-400 focus:outline-none" placeholder="Nama Anda" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Nomor WhatsApp</label>
              <input type="tel" id="phone" required value={formData.phone} onChange={(e) => handleField('phone', e.target.value)} className="w-full bg-slate-50 border-0 border-b-2 border-slate-200 px-4 py-3 text-slate-900 focus:ring-0 focus:border-orange-500 transition placeholder-slate-400 focus:outline-none" placeholder="0812..." />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Tanggal Acara</label>
              <p className="text-xs text-slate-500">Catatan: Pemesanan minimal H-2</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <select value={selectedYear} onChange={(e) => handleYearChange(e.target.value)} className="w-full bg-slate-50 border-0 border-b-2 px-3 py-2 text-slate-900 focus:ring-0 transition focus:outline-none">
                {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
              </select>

              <select value={selectedMonth} onChange={(e) => handleMonthChange(e.target.value)} className="w-full bg-slate-50 border-0 border-b-2 px-3 py-2 text-slate-900 focus:ring-0 transition focus:outline-none">
                {(monthOptionsForYear(selectedYear) || []).map(m => {
                  const monthName = new Date(Number(selectedYear), m - 1, 1).toLocaleString('id-ID', { month: 'long' });
                  return <option key={m} value={m}>{monthName}</option>;
                })}
              </select>

              <select value={selectedDay} onChange={(e) => handleDayChange(e.target.value)} className="w-full bg-slate-50 border-0 border-b-2 px-3 py-2 text-slate-900 focus:ring-0 transition focus:outline-none">
                {(dayOptionsForYearMonth(selectedYear, selectedMonth) || []).map(d => (
                  <option key={d.iso} value={d.day}>{new Date(d.iso).toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit' })}</option>
                ))}
              </select>
            </div>

            {dateWarning && <p className="text-red-500 text-xs mt-2">Tanggal harus minimal H-2 dari hari ini.</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Daftar Pesanan</h3>
              <button type="button" onClick={addLine} className="inline-flex items-center gap-2 bg-orange-600 text-white px-3 py-2 rounded-full text-sm">
                <Plus className="w-4 h-4" /> Tambah Item
              </button>
            </div>

            <div className="space-y-4">
              {orderLines.map((line) => (
                <div key={line.id} className="grid grid-cols-12 gap-3 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="col-span-7">
                    <label className="text-xs text-slate-500 uppercase font-bold">Menu</label>
                    <select value={line.menuId} onChange={(e) => updateLine(line.id, { menuId: e.target.value })} className="w-full bg-transparent px-2 py-2 text-slate-900">
                      {MENU_DATA.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                  <div className="col-span-3">
                    <label className="text-xs text-slate-500 uppercase font-bold">Porsi</label>
                    <input type="number" min="1" value={line.qty} onChange={(e) => updateLine(line.id, { qty: Number(e.target.value) })} className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-slate-900" />
                  </div>
                  <div className="col-span-2 flex items-end justify-end gap-2">
                    <button type="button" onClick={() => removeLine(line.id)} className="text-sm text-red-600 hover:underline">Hapus</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right text-sm text-slate-600">Total porsi: <span className="font-bold text-slate-900">{totalPortions}</span></div>
          </div>

          <div className="pt-6">
            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg tracking-wide">
              <Send className="w-5 h-5" /> Kirim Pesanan via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AboutView = () => (
  <div className="py-24 bg-slate-50 min-h-screen animate-fade-in">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-10 items-start">
        <div className="md:col-span-1">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=800" className="w-full h-64 object-cover" alt="Dapur" />
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