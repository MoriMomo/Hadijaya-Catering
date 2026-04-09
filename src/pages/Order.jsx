import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AlertCircle, Calendar, Minus, Phone, Plus, Send, User } from 'lucide-react';
import { MENU_DATA } from '../constants/data';
import { useCart } from '../context/CartContext';

const Order = () => {
    const { 
        orderLines, checkoutDetails, setCheckoutDetails, 
        addToCart, removeLine, incrementQty, decrementQty, 
        totalPortions, clearCart 
    } = useCart();

    const [errors, setErrors] = useState({ name: '', phone: '' });
    const [touched, setTouched] = useState({ name: false, phone: false });
    const [dateWarning, setDateWarning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Validation helpers
    const validateName = (name) => {
        if (!name?.trim()) return 'Nama wajib diisi';
        if (name.trim().length < 3) return 'Nama minimal 3 karakter';
        return '';
    };

    const validatePhone = (phone) => {
        if (!phone?.trim()) return 'Nomor WhatsApp wajib diisi';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.startsWith('62') && cleaned.length >= 11) return '';
        if (cleaned.startsWith('08') && cleaned.length >= 10) return '';
        return 'Format: 08xx atau +62xxx (min 10 digit)';
    };

    const isFormValid = () => {
        return !validateName(checkoutDetails.name) && !validatePhone(checkoutDetails.phone) && checkoutDetails.date && totalPortions >= 10;
    };

    const handleField = (id, value) => {
        setCheckoutDetails(prev => ({ ...prev, [id]: value }));
        if (touched[id]) {
            const error = id === 'name' ? validateName(value) : validatePhone(value);
            setErrors(prev => ({ ...prev, [id]: error }));
        }
    };

    const handleBlur = (id) => {
        setTouched(prev => ({ ...prev, [id]: true }));
        const value = checkoutDetails[id];
        const error = id === 'name' ? validateName(value) : validatePhone(value);
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    const generateDateOptions = (days = 30, minOffsetDays = 2) => {
        const opts = [];
        const today = new Date();
        const start = new Date(today);
        start.setDate(today.getDate() + minOffsetDays);
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
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');

    const [activeCategory, setActiveCategory] = useState('paket');

    const categories = [
        { id: 'paket', label: 'Paket Hemat' },
        { id: 'nasi', label: 'Nasi' },
        { id: 'ayam', label: 'Olahan Ayam' },
        { id: 'daging', label: 'Olahan Daging' },
        { id: 'tahu-tempe', label: 'Tahu & Tempe' },
        { id: 'telur', label: 'Olahan Telur' },
        { id: 'sambel', label: 'Aneka Sambal' },
        { id: 'snack', label: 'Snack & Tambahan' }
    ];

    useEffect(() => {
        if (dateOptions.length && !selectedYear) {
            // Priority to existing date in checkoutDetails
            if (checkoutDetails.date) {
                const parts = checkoutDetails.date.split('-');
                if (parts.length === 3) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    setSelectedYear(String(parseInt(parts[0])));
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    setSelectedMonth(String(parseInt(parts[1])));
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    setSelectedDay(String(parseInt(parts[2])));
                    return;
                }
            }

            const first = dateOptions[0];
            setSelectedYear(String(first.year));
            setSelectedMonth(String(first.month));
            setSelectedDay(String(first.day));
            handleField('date', first.value);
        }
    }, [dateOptions, selectedYear, checkoutDetails.date]); // eslint-disable-line react-hooks/exhaustive-deps

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
        handleField('date', days[0].iso);
        setDateWarning(false);
    };

    const handleMonthChange = (m) => {
        setSelectedMonth(m);
        const days = dayOptionsForYearMonth(selectedYear, m);
        setSelectedDay(String(days[0].day));
        handleField('date', days[0].iso);
        setDateWarning(false);
    };

    const handleDayChange = (d) => {
        setSelectedDay(d);
        const found = allowedDates.find(x => x.year === Number(selectedYear) && x.month === Number(selectedMonth) && x.day === Number(d));
        if (found) handleField('date', found.value);
        setDateWarning(false);
    };

    const calculateTotal = () => {
        return orderLines.reduce((sum, line) => {
            const menu = MENU_DATA.find(m => m.id === Number(line.menuId));
            return sum + (menu?.price || 0) * (Number(line.qty) || 0);
        }, 0);
    };

    const totalPrice = calculateTotal();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation
        const nameError = validateName(checkoutDetails.name);
        const phoneError = validatePhone(checkoutDetails.phone);

        if (nameError || phoneError) {
            setErrors({ name: nameError, phone: phoneError });
            setTouched({ name: true, phone: true });
            return;
        }

        if (!checkoutDetails.date) {
            alert('Pilih tanggal acara.');
            return;
        }

        const validDate = allowedDates.find(d => d.value === checkoutDetails.date);
        if (!validDate) {
            setDateWarning(true);
            alert('Tanggal tidak tersedia. Pilih tanggal lain (pemesanan minimal H-2).');
            return;
        }

        if (totalPortions < 10) {
            alert('Total porsi minimal 10 (gabungan semua item).');
            return;
        }

        setShowConfirm(true);
    };

    const confirmSubmit = () => {
        setShowConfirm(false);
        setIsSubmitting(true);

        const linesText = orderLines.map(l => {
            const menu = MENU_DATA.find(m => m.id === Number(l.menuId)) || {};
            const linePrice = (menu.price || 0) * l.qty;
            return `- ${menu.name || 'Item'}: ${l.qty} porsi @ ${formatCurrency(menu.price || 0)} = ${formatCurrency(linePrice)}`;
        }).join('\n');

        const message = `Halo Hadijaya Catering,\n\nSaya ingin memesan untuk:\n- Nama: ${checkoutDetails.name}\n- No HP: ${checkoutDetails.phone}\n- Tanggal: ${checkoutDetails.date}\n\nDaftar Pesanan:\n${linesText}\n\nTotal porsi: ${totalPortions}\nEstimasi Total: ${formatCurrency(totalPrice)}\n\nMohon konfirmasi ketersediaan dan harga final. Terima kasih.`;

        setTimeout(() => {
            window.open(`https://wa.me/6289687472787?text=${encodeURIComponent(message)}`, '_blank');
            setIsSubmitting(false);
            setShowSuccess(true);
            clearCart();
            setTimeout(() => setShowSuccess(false), 4000);
        }, 800);
    };

    return (
        <>
            <Helmet>
                <title>Pesan Katering - Hadijaya Catering</title>
                <meta name="description" content="Pesan katering untuk acara Anda dengan mudah. Pilih menu favorit dan tentukan tanggal pengiriman. Minimal pemesanan 2 hari sebelum acara." />
                <meta property="og:title" content="Pesan Katering - Hadijaya Catering" />
                <meta property="og:description" content="Pesan katering untuk acara Anda dengan mudah. Pilih menu favorit dan tentukan tanggal pengiriman. Minimal pemesanan 2 hari sebelum acara." />
                <meta property="og:type" content="website" />
            </Helmet>

            {/* Success Message */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
                    <div className="bg-white rounded-2xl p-8 text-center max-w-sm shadow-2xl">
                        <div className="text-5xl mb-4">✅</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Pesanan Terkirim!</h3>
                        <p className="text-slate-600">Tim kami akan segera menghubungi Anda via WhatsApp untuk konfirmasi.</p>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
                    <div className="bg-white rounded-2xl p-8 max-w-sm shadow-2xl">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Konfirmasi Pesanan</h3>
                        <p className="text-slate-600 mb-2"><strong>Nama:</strong> {checkoutDetails.name}</p>
                        <p className="text-slate-600 mb-2"><strong>No. WhatsApp:</strong> {checkoutDetails.phone}</p>
                        <p className="text-slate-600 mb-2"><strong>Tanggal:</strong> {checkoutDetails.date}</p>
                        <p className="text-slate-600 mb-4"><strong>Total Porsi:</strong> {totalPortions}</p>
                        <p className="text-lg font-bold text-accent-600 mb-6">Estimasi: {formatCurrency(totalPrice)}</p>
                        <p className="text-sm text-slate-500 mb-6">Apakah pesanan Anda sudah benar?</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmSubmit}
                                className="flex-1 px-4 py-2 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600 transition"
                            >
                                Kirim via WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-12 pb-24 bg-slate-50 min-h-screen animate-fade-in">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold text-slate-900">Reservasi Pesanan</h2>
                        <p className="text-slate-500 mt-4 font-light">Isi formulir dan daftar pesanan. Tim kami akan menghubungi via WhatsApp untuk konfirmasi.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200/60 space-y-8" noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <User className="w-4 h-4" /> Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={checkoutDetails.name}
                                    onChange={(e) => handleField('name', e.target.value)}
                                    onBlur={() => handleBlur('name')}
                                    aria-describedby={errors.name ? 'name-error' : undefined}
                                    aria-invalid={!!errors.name}
                                    className={`w-full bg-slate-50 border-0 border-b-2 ${errors.name && touched.name ? 'border-red-500' : 'border-slate-200'} px-4 py-3 text-slate-900 focus:ring-0 focus:border-accent-400 transition placeholder-slate-400 focus:outline-none`}
                                    placeholder="Nama Anda"
                                />
                                {errors.name && touched.name && (
                                    <p id="name-error" className="text-red-500 text-xs flex items-center gap-1" role="alert">
                                        <AlertCircle className="w-3 h-3" /> {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> Nomor WhatsApp
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    required
                                    value={checkoutDetails.phone}
                                    onChange={(e) => handleField('phone', e.target.value)}
                                    onBlur={() => handleBlur('phone')}
                                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                                    aria-invalid={!!errors.phone}
                                    className={`w-full bg-slate-50 border-0 border-b-2 ${errors.phone && touched.phone ? 'border-red-500' : 'border-slate-200'} px-4 py-3 text-slate-900 focus:ring-0 focus:border-accent-400 transition placeholder-slate-400 focus:outline-none`}
                                    placeholder="0812..."
                                />
                                {errors.phone && touched.phone && (
                                    <p id="phone-error" className="text-red-500 text-xs flex items-center gap-1" role="alert">
                                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Date Picker */}
                        <div className="space-y-2">
                            <div className="flex items-baseline justify-between">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Tanggal Acara
                                </label>
                                <p className="text-xs text-slate-500">Catatan: Pemesanan minimal H-2</p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <select
                                    value={selectedYear}
                                    onChange={(e) => handleYearChange(e.target.value)}
                                    aria-label="Pilih tahun"
                                    className="w-full bg-slate-50 border-0 border-b-2 px-3 py-2 text-slate-900 focus:ring-0 focus:border-accent-400 transition focus:outline-none"
                                >
                                    {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>

                                <select
                                    value={selectedMonth}
                                    onChange={(e) => handleMonthChange(e.target.value)}
                                    aria-label="Pilih bulan"
                                    className="w-full bg-slate-50 border-0 border-b-2 px-3 py-2 text-slate-900 focus:ring-0 focus:border-accent-400 transition focus:outline-none"
                                >
                                    {(monthOptionsForYear(selectedYear) || []).map(m => {
                                        const monthName = new Date(Number(selectedYear), m - 1, 1).toLocaleString('id-ID', { month: 'long' });
                                        return <option key={m} value={m}>{monthName}</option>;
                                    })}
                                </select>

                                <select
                                    value={selectedDay}
                                    onChange={(e) => handleDayChange(e.target.value)}
                                    aria-label="Pilih hari"
                                    className="w-full bg-slate-50 border-0 border-b-2 px-3 py-2 text-slate-900 focus:ring-0 focus:border-accent-400 transition focus:outline-none"
                                >
                                    {(dayOptionsForYearMonth(selectedYear, selectedMonth) || []).map(d => (
                                        <option key={d.iso} value={d.day}>{new Date(d.iso).toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit' })}</option>
                                    ))}
                                </select>
                            </div>

                            {dateWarning && (
                                <p className="text-red-500 text-xs mt-2 flex items-center gap-1" role="alert">
                                    <AlertCircle className="w-3 h-3" /> Tanggal harus minimal H-2 dari hari ini.
                                </p>
                            )}
                        </div>

                        {/* Menu Selection Section */}
                        <div className="space-y-8 animate-fade-in" id="menu-selection">
                            <div>
                                <h3 className="text-xl font-bold font-serif text-slate-900 mb-6 flex items-center gap-2">
                                    <span className="bg-accent-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm">1</span>
                                    Pilih Menu Favorit
                                </h3>

                                {/* Categories Tabs */}
                                <div className="flex overflow-x-auto pb-4 gap-2 mb-6 snap-x">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition snap-start border-2 ${activeCategory === cat.id
                                                ? 'bg-accent-500 text-white border-accent-500 shadow-lg scale-105'
                                                : 'bg-slate-700 text-white border-slate-700 hover:bg-slate-800'
                                                }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Menu Grid - Full Height (Page Scroll) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-8 border-slate-100">
                                    {MENU_DATA.filter(m => m.category === activeCategory).map(item => {
                                        const isInCart = orderLines.some(l => Number(l.menuId) === Number(item.id));
                                        return (
                                            <div key={item.id} className="bg-white border border-slate-200 p-4 rounded-xl hover:shadow-lg transition group relative overflow-hidden">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h4 className="font-bold text-slate-900 pr-2">{item.name}</h4>
                                                    <p className="text-accent-600 font-bold text-sm whitespace-nowrap bg-accent-50 px-2 py-1 rounded-lg">{formatCurrency(item.price)}</p>
                                                </div>
                                                <p className="text-slate-500 text-xs line-clamp-2 mb-4 h-8">{item.desc}</p>
                                                <button
                                                    type="button"
                                                    onClick={() => addToCart(item)}
                                                    className={`w-full py-2.5 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 group-hover:shadow-md ${isInCart ? 'bg-green-100 text-green-700' : 'bg-slate-900 text-white hover:bg-accent-500'}`}
                                                >
                                                    <Plus className="w-4 h-4" /> {isInCart ? 'Tambah Lagi' : 'Tambah ke Pesanan'}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="border-t-4 border-slate-100 my-10 rounded-full"></div>

                        {/* Order Cart / Summary */}
                        <div id="order-summary" className="animate-fade-in scroll-mt-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
                                    <span className="bg-slate-900 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm">2</span>
                                    Daftar Pesanan
                                </h3>
                                <span className="bg-accent-100 text-accent-800 text-xs font-bold px-3 py-1 rounded-full">
                                    {orderLines.length} Item
                                </span>
                            </div>

                            {orderLines.length === 0 ? (
                                <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group hover:border-accent-200 transition-colors">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-4xl group-hover:scale-110 transition-transform duration-300">🍽️</div>
                                    <p className="text-slate-900 font-bold text-lg mb-1">Daftar Pesanan Kosong</p>
                                    <p className="text-slate-500 text-sm max-w-xs mx-auto">Silakan pilih menu favorit Anda dari kategori di atas untuk mulai memesan.</p>
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('menu-selection').scrollIntoView({ behavior: 'smooth' })}
                                        className="mt-6 text-accent-500 font-bold text-sm hover:underline"
                                    >
                                        Mulai Belanja &uarr;
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4 mb-24">
                                    {orderLines.map((line) => {
                                        const menu = MENU_DATA.find(m => m.id === Number(line.menuId));
                                        const lineTotal = (menu?.price || 0) * (Number(line.qty) || 0);
                                        return (
                                            <div key={line.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex gap-4">
                                                {/* Optional: Add small thumbnail if available */}
                                                {/* <div className="w-16 h-16 bg-slate-100 rounded-lg hidden sm:block"></div> */}

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-bold text-slate-900 text-base line-clamp-2 leading-tight">{menu?.name}</h4>
                                                        <div className="text-right pl-2">
                                                            <div className="font-bold text-slate-900 text-sm">{formatCurrency(lineTotal)}</div>
                                                            <div className="text-[10px] text-slate-400">@ {formatCurrency(menu?.price || 0)}</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeLine(line.id)}
                                                            className="text-xs text-red-500 font-medium px-2 py-1 rounded hover:bg-red-50 transition flex items-center gap-1"
                                                        >
                                                            Hapus
                                                        </button>

                                                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-200">
                                                            <button
                                                                type="button"
                                                                onClick={() => decrementQty(line.id)}
                                                                className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-accent-500 transition disabled:opacity-50"
                                                                disabled={line.qty <= 1}
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <span className="w-6 text-center text-sm font-bold text-slate-900">{line.qty}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => incrementQty(line.id)}
                                                                className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-accent-500 transition"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Sticky Bottom Action Bar */}
                            <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-40 transition-transform duration-300 ${orderLines.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
                                <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 font-medium">Est. Total ({totalPortions} Porsi)</span>
                                        <span className="text-xl font-bold text-slate-900">{formatCurrency(totalPrice)}</span>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!isFormValid() || isSubmitting}
                                        className={`px-6 py-3 rounded-xl font-bold shadow-lg transition flex items-center gap-2 ${!isFormValid() || isSubmitting
                                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                            : 'bg-accent-500 text-white hover:bg-accent-600 active:scale-95'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Kirim Pesanan <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Hidden Desktop Submit Button (Optional, if we want to keep one inline for desktop) */}
                        {/* We rely on the sticky footer for simplicity now, but you could keep a static one for large screens if preferred */}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Order;
