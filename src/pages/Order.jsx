import { validateName, validatePhone } from '../utils/validation';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { AlertCircle, Calendar, Minus, Phone, Plus, Send, User } from 'lucide-react';
import { MENU_DATA, MENU_MAP } from '../constants/data';

const Order = () => {
    const [formData, setFormData] = useState(() => {
        try {
            const saved = localStorage.getItem('hadijaya-order-draft');
            if (saved) {
                const parsed = JSON.parse(saved);
                return {
                    name: parsed.name || '',
                    phone: parsed.phone || ''
                };
            }
        } catch (e) {
            console.error('Error restoring draft:', e);
        }
        return { name: '', phone: '' };
    });
    const [errors, setErrors] = useState({ name: '', phone: '' });
    const [touched, setTouched] = useState({ name: false, phone: false });

    const [dateWarning, setDateWarning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const idCounterRef = useRef(1);

    // Initialize orderLines with lazy initializer to avoid setState in effect
    // eslint-disable-next-line react-hooks/refs
    const [orderLines, setOrderLines] = useState(() => {
        try {
            const saved = localStorage.getItem('hadijaya-order-draft');
            if (saved) {
                const parsed = JSON.parse(saved);
                idCounterRef.current = parsed.nextId || 1;
                if (parsed.lines && parsed.lines.length > 0) {
                    return parsed.lines;
                }
            }
        } catch (error) {
            console.error("Error loading saved order:", error);
            idCounterRef.current = 1;
        }
        // Return default initial value
        return [];
    });

    const isFormValid = () => {
        return !validateName(formData.name) && !validatePhone(formData.phone) && selectedDate && totalPortions >= 10;
    };

    const handleField = (id, value) => {
        setFormData(prev => ({ ...prev, [id]: value }));
        if (touched[id]) {
            const error = id === 'name' ? validateName(value) : validatePhone(value);
            setErrors(prev => ({ ...prev, [id]: error }));
        }
    };

    const handleBlur = (id) => {
        setTouched(prev => ({ ...prev, [id]: true }));
        const value = formData[id];
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
    const [selectedYear, setSelectedYear] = useState(() => dateOptions.length ? String(dateOptions[0].year) : '');
    const [selectedMonth, setSelectedMonth] = useState(() => dateOptions.length ? String(dateOptions[0].month) : '');
    const [selectedDay, setSelectedDay] = useState(() => dateOptions.length ? String(dateOptions[0].day) : '');
    const [selectedDate, setSelectedDate] = useState(() => dateOptions.length ? dateOptions[0].value : '');

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

    const addToOrder = (menuItem) => {
        setOrderLines(prev => {
            const existing = prev.find(l => l.menuId === menuItem.id);
            if (existing) {
                return prev.map(l => l.menuId === menuItem.id ? { ...l, qty: (Number(l.qty) || 0) + 1 } : l);
            }
            const nextId = ++idCounterRef.current;
            return [...prev, { id: nextId, menuId: menuItem.id, qty: 10 }];
        });
    };

    // Save draft to localStorage
    useEffect(() => {
        const draft = {
            lines: orderLines,
            nextId: idCounterRef.current,
            name: formData.name,
            phone: formData.phone,
            date: selectedDate
        };
        localStorage.setItem('hadijaya-order-draft', JSON.stringify(draft));
    }, [orderLines, formData, selectedDate]);

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
        const found = allowedDates.find(x => x.year === Number(selectedYear) && x.month === Number(selectedMonth) && x.day === Number(d));
        if (found) setSelectedDate(found.value);
        setDateWarning(false);
    };



    const updateLine = (id, patch) => {
        setOrderLines(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));
    };

    const removeLine = (id) => {
        setOrderLines(prev => prev.filter(l => l.id !== id));
    };

    const incrementQty = (id) => {
        updateLine(id, { qty: (orderLines.find(l => l.id === id)?.qty || 0) + 1 });
    };

    const decrementQty = (id) => {
        const current = orderLines.find(l => l.id === id)?.qty || 0;
        if (current > 1) updateLine(id, { qty: current - 1 });
    };

    const { totalPortions, totalPrice } = useMemo(() => {
        return orderLines.reduce(
            (acc, line) => {
                const qty = Number(line.qty) || 0;
                const menu = MENU_MAP.get(Number(line.menuId));
                return {
                    totalPortions: acc.totalPortions + qty,
                    totalPrice: acc.totalPrice + (menu?.price || 0) * qty
                };
            },
            { totalPortions: 0, totalPrice: 0 }
        );
    }, [orderLines]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const clearDraft = () => {
        localStorage.removeItem('hadijaya-order-draft');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation
        const nameError = validateName(formData.name);
        const phoneError = validatePhone(formData.phone);

        if (nameError || phoneError) {
            setErrors({ name: nameError, phone: phoneError });
            setTouched({ name: true, phone: true });
            return;
        }

        if (!selectedDate) {
            alert('Pilih tanggal acara.');
            return;
        }

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

        setShowConfirm(true);
    };

    const confirmSubmit = () => {
        setShowConfirm(false);
        setIsSubmitting(true);

        const linesText = orderLines.map(l => {
            const menu = MENU_MAP.get(Number(l.menuId)) || {};
            const linePrice = (menu.price || 0) * l.qty;
            return `- ${menu.name || 'Item'}: ${l.qty} porsi @ ${formatCurrency(menu.price || 0)} = ${formatCurrency(linePrice)}`;
        }).join('%0A');

        const message = `Halo Hadijaya Catering,%0A%0ASaya ingin memesan untuk:%0A- Nama: ${encodeURIComponent(formData.name)}%0A- No HP: ${encodeURIComponent(formData.phone)}%0A- Tanggal: ${selectedDate}%0A%0ADaftar Pesanan:%0A${linesText}%0A%0ATotal porsi: ${totalPortions}%0AEstimasi Total: ${formatCurrency(totalPrice)}%0A%0AMohon konfirmasi ketersediaan dan harga final. Terima kasih.`;

        setTimeout(() => {
            window.open(`https://wa.me/+6289687472787?text=${message}`, '_blank');
            setIsSubmitting(false);
            setShowSuccess(true);
            clearDraft();
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
                        <p className="text-slate-600 mb-2"><strong>Nama:</strong> {formData.name}</p>
                        <p className="text-slate-600 mb-2"><strong>No. WhatsApp:</strong> {formData.phone}</p>
                        <p className="text-slate-600 mb-2"><strong>Tanggal:</strong> {selectedDate}</p>
                        <p className="text-slate-600 mb-4"><strong>Total Porsi:</strong> {totalPortions}</p>
                        <p className="text-lg font-bold text-orange-700 mb-6">Estimasi: {formatCurrency(totalPrice)}</p>
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
                                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition"
                            >
                                Kirim via WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-12 pb-24 bg-white min-h-screen animate-fade-in">
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
                                    value={formData.name}
                                    onChange={(e) => handleField('name', e.target.value)}
                                    onBlur={() => handleBlur('name')}
                                    aria-describedby={errors.name ? 'name-error' : undefined}
                                    aria-invalid={!!errors.name}
                                    autoComplete="name"
                                    className={`w-full bg-slate-50 border-0 border-b-2 ${errors.name && touched.name ? 'border-red-500' : 'border-slate-200'} px-4 py-3 text-slate-900 focus:ring-0 focus:border-orange-500 transition placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500`}
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
                                    value={formData.phone}
                                    onChange={(e) => handleField('phone', e.target.value)}
                                    onBlur={() => handleBlur('phone')}
                                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                                    aria-invalid={!!errors.phone}
                                    autoComplete="tel"
                                    className={`w-full bg-slate-50 border-0 border-b-2 ${errors.phone && touched.phone ? 'border-red-500' : 'border-slate-200'} px-4 py-3 text-slate-900 focus:ring-0 focus:border-orange-500 transition placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500`}
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
                                    className="w-full bg-slate-50 border-0 border-b-2 px-3 py-2 text-slate-900 focus:ring-0 focus:border-orange-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                                >
                                    {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>

                                <select
                                    value={selectedMonth}
                                    onChange={(e) => handleMonthChange(e.target.value)}
                                    aria-label="Pilih bulan"
                                    className="w-full bg-slate-50 border-0 border-b-2 px-3 py-2 text-slate-900 focus:ring-0 focus:border-orange-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
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
                                    className="w-full bg-slate-50 border-0 border-b-2 px-3 py-2 text-slate-900 focus:ring-0 focus:border-orange-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
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
                        <div id="menu-selection" className="space-y-8 animate-fade-in scroll-mt-24">
                            <div>
                                <h3 className="text-xl font-bold font-serif text-slate-900 mb-6 flex items-center gap-2">
                                    <span className="bg-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm">1</span>
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
                                                ? 'bg-orange-600 text-white border-orange-600 shadow-lg scale-105'
                                                : 'bg-slate-700 text-white border-slate-700 hover:bg-slate-800'
                                                }`}
                                            aria-pressed={activeCategory === cat.id}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Menu Grid - Full Height (Page Scroll) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-8 border-slate-100">
                                    {MENU_DATA.filter(m => m.category === activeCategory).map(item => (
                                        <div key={item.id} className="bg-white border border-slate-200 p-4 rounded-xl hover:shadow-lg transition group relative overflow-hidden">
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-bold text-slate-900 pr-2">{item.name}</h4>
                                                <p className="text-orange-600 font-bold text-sm whitespace-nowrap bg-orange-50 px-2 py-1 rounded-lg">{formatCurrency(item.price)}</p>
                                            </div>
                                            <p className="text-slate-500 text-xs line-clamp-2 mb-4 h-8">{item.desc}</p>
                                            <button
                                                type="button"
                                                onClick={() => addToOrder(item)}
                                                className="w-full py-2.5 bg-slate-900 text-white hover:bg-orange-600 hover:text-white rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 group-hover:shadow-md"
                                                aria-label={"Tambah " + item.name + " ke pesanan"}
                                            >
                                                <Plus className="w-4 h-4" /> Tambah ke Pesanan
                                            </button>
                                        </div>
                                    ))}
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
                                <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">
                                    {orderLines.length} Item
                                </span>
                            </div>

                            {orderLines.length === 0 ? (
                                <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group hover:border-orange-200 transition-colors">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-4xl group-hover:scale-110 transition-transform duration-300">🍽️</div>
                                    <p className="text-slate-900 font-bold text-lg mb-1">Daftar Pesanan Kosong</p>
                                    <p className="text-slate-500 text-sm max-w-xs mx-auto">Silakan pilih menu favorit Anda dari kategori di atas untuk mulai memesan.</p>
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('menu-selection').scrollIntoView({ behavior: 'smooth' })}
                                        className="mt-6 text-orange-600 font-bold text-sm hover:underline"
                                    >
                                        Mulai Belanja &uarr;
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4 mb-24">
                                    {orderLines.map((line) => {
                                        const menu = MENU_MAP.get(Number(line.menuId));
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
                                                            className="text-xs text-red-500 font-medium px-2 py-1 rounded hover:bg-red-50 transition flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none"
                                                            aria-label={`Hapus ${menu?.name || 'item'} dari pesanan`}
                                                        >
                                                            Hapus
                                                        </button>

                                                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-200">
                                                            <button
                                                                type="button"
                                                                onClick={() => decrementQty(line.id)}
                                                                className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-slate-600 disabled:active:scale-100 active:scale-95 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
                                                                disabled={line.qty <= 1}
                                                                aria-label="Kurangi jumlah"
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <span className="w-6 text-center text-sm font-bold text-slate-900" aria-live="polite" aria-atomic="true">{line.qty}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => incrementQty(line.id)}
                                                                className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-orange-600 transition active:scale-95 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
                                                                aria-label="Tambah jumlah"
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
                                        title={!isFormValid() ? "Lengkapi formulir dan pastikan pesanan minimal 10 porsi" : "Kirim Pesanan"}
                                        className={`px-6 py-3 rounded-xl font-bold shadow-lg transition flex items-center gap-2 ${!isFormValid() || isSubmitting
                                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                            : 'bg-orange-600 text-white hover:bg-orange-700 active:scale-95'
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
