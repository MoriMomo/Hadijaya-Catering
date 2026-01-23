import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus } from 'lucide-react';
import { MENU_DATA } from '../constants/data';

const Order = () => {
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [errors, setErrors] = useState({ name: '', phone: '' });
    const [touched, setTouched] = useState({ name: false, phone: false });
    const [selectedDate, setSelectedDate] = useState('');
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
        return [{ id: 1, menuId: MENU_DATA[0].id, qty: 10 }];
    });

    // Validation helpers
    const validateName = (name) => {
        if (!name.trim()) return 'Nama wajib diisi';
        if (name.trim().length < 3) return 'Nama minimal 3 karakter';
        return '';
    };

    const validatePhone = (phone) => {
        if (!phone.trim()) return 'Nomor WhatsApp wajib diisi';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.startsWith('62') && cleaned.length >= 11) return '';
        if (cleaned.startsWith('08') && cleaned.length >= 10) return '';
        return 'Format: 08xx atau +62xxx (min 10 digit)';
    };

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

    // Restore name/phone from draft on mount
    useEffect(() => {
        const saved = localStorage.getItem('hadijaya-order-draft');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.name) setFormData(prev => ({ ...prev, name: parsed.name }));
                if (parsed.phone) setFormData(prev => ({ ...prev, phone: parsed.phone }));
            } catch { }
        }
    }, []);

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

    const incrementQty = (id) => {
        updateLine(id, { qty: (orderLines.find(l => l.id === id)?.qty || 0) + 1 });
    };

    const decrementQty = (id) => {
        const current = orderLines.find(l => l.id === id)?.qty || 0;
        if (current > 1) updateLine(id, { qty: current - 1 });
    };

    const totalPortions = orderLines.reduce((s, l) => s + (Number(l.qty) || 0), 0);

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
            const menu = MENU_DATA.find(m => m.id === Number(l.menuId)) || {};
            const linePrice = (menu.price || 0) * l.qty;
            return `- ${menu.name || 'Item'}: ${l.qty} porsi @ ${formatCurrency(menu.price || 0)} = ${formatCurrency(linePrice)}`;
        }).join('%0A');

        const message = `Halo Hadijaya Catering,%0A%0ASaya ingin memesan untuk:%0A- Nama: ${encodeURIComponent(formData.name)}%0A- No HP: ${encodeURIComponent(formData.phone)}%0A- Tanggal: ${selectedDate}%0A%0ADaftar Pesanan:%0A${linesText}%0A%0ATotal porsi: ${totalPortions}%0AEstimasi Total: ${formatCurrency(totalPrice)}%0A%0AMohon konfirmasi ketersediaan dan harga final. Terima kasih.`;

        setTimeout(() => {
            window.open(`https://wa.me/628111040342?text=${message}`, '_blank');
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
            <div className="pt-12 pb-24 bg-white min-h-screen animate-fade-in">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-slate-900">Reservasi Pesanan</h2>
                    <p className="text-slate-500 mt-4 font-light">Isi formulir dan daftar pesanan. Tim kami akan menghubungi via WhatsApp untuk konfirmasi.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 space-y-8" noValidate>
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
                                className={`w-full bg-slate-50 border-0 border-b-2 ${errors.name && touched.name ? 'border-red-500' : 'border-slate-200'} px-4 py-3 text-slate-900 focus:ring-0 focus:border-orange-500 transition placeholder-slate-400 focus:outline-none`}
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
                                className={`w-full bg-slate-50 border-0 border-b-2 ${errors.phone && touched.phone ? 'border-red-500' : 'border-slate-200'} px-4 py-3 text-slate-900 focus:ring-0 focus:border-orange-500 transition placeholder-slate-400 focus:outline-none`}
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
                                className="w-full bg-slate-50 border-0 border-b-2 px-3 py-2 text-slate-900 focus:ring-0 focus:border-orange-500 transition focus:outline-none"
                            >
                                {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>

                            <select
                                value={selectedMonth}
                                onChange={(e) => handleMonthChange(e.target.value)}
                                aria-label="Pilih bulan"
                                className="w-full bg-slate-50 border-0 border-b-2 px-3 py-2 text-slate-900 focus:ring-0 focus:border-orange-500 transition focus:outline-none"
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
                                className="w-full bg-slate-50 border-0 border-b-2 px-3 py-2 text-slate-900 focus:ring-0 focus:border-orange-500 transition focus:outline-none"
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

                    {/* Order Lines */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">Daftar Pesanan</h3>
                            <button
                                type="button"
                                onClick={addLine}
                                aria-label="Tambah item pesanan"
                                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-full text-sm transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                <Plus className="w-4 h-4" /> Tambah Item
                            </button>
                        </div>

                        <div className="space-y-4">
                            {orderLines.map((line) => {
                                const menu = MENU_DATA.find(m => m.id === Number(line.menuId));
                                const lineTotal = (menu?.price || 0) * (Number(line.qty) || 0);
                                return (
                                    <div key={line.id} className="grid grid-cols-12 gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="col-span-12 md:col-span-6">
                                            <label htmlFor={`menu-${line.id}`} className="text-xs text-slate-500 uppercase font-bold">Menu</label>
                                            <select
                                                id={`menu-${line.id}`}
                                                value={line.menuId}
                                                onChange={(e) => updateLine(line.id, { menuId: e.target.value })}
                                                className="w-full bg-transparent px-2 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                                            >
                                                {MENU_DATA.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                            </select>
                                            {menu && menu.price > 0 && (
                                                <p className="text-xs text-slate-500 mt-1">@ {formatCurrency(menu.price)}</p>
                                            )}
                                        </div>

                                        <div className="col-span-8 md:col-span-4">
                                            <label htmlFor={`qty-${line.id}`} className="text-xs text-slate-500 uppercase font-bold">Porsi</label>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => decrementQty(line.id)}
                                                    aria-label="Kurangi porsi"
                                                    className="w-8 h-8 bg-white border border-slate-300 rounded-md flex items-center justify-center hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                >
                                                    <Minus className="w-4 h-4 text-slate-600" />
                                                </button>
                                                <input
                                                    id={`qty-${line.id}`}
                                                    type="number"
                                                    min="1"
                                                    value={line.qty}
                                                    onChange={(e) => updateLine(line.id, { qty: Number(e.target.value) || 1 })}
                                                    className="flex-1 text-center bg-white border border-slate-200 rounded-md px-2 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => incrementQty(line.id)}
                                                    aria-label="Tambah porsi"
                                                    className="w-8 h-8 bg-white border border-slate-300 rounded-md flex items-center justify-center hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                >
                                                    <Plus className="w-4 h-4 text-slate-600" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-span-4 md:col-span-2 flex flex-col items-end justify-between h-full">
                                            {lineTotal > 0 && (
                                                <p className="text-xs font-bold text-slate-700 mb-2">{formatCurrency(lineTotal)}</p>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => removeLine(line.id)}
                                                aria-label="Hapus item"
                                                className="text-sm text-red-600 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                            <div className="flex justify-between items-center text-sm mb-2">
                                <span className="text-slate-600">Total Porsi:</span>
                                <span className="font-bold text-slate-900">{totalPortions}</span>
                            </div>
                            {totalPrice > 0 && (
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-bold text-slate-700">Estimasi Total:</span>
                                    <span className="font-bold text-orange-700">{formatCurrency(totalPrice)}</span>
                                </div>
                            )}
                            <p className="text-xs text-slate-500 mt-2">*Harga final akan dikonfirmasi via WhatsApp</p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={!isFormValid() || isSubmitting}
                            className={`w-full font-bold py-5 rounded-xl shadow-xl transition transform flex items-center justify-center gap-3 text-lg tracking-wide focus:outline-none focus:ring-4 focus:ring-orange-300 ${!isFormValid() || isSubmitting
                                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                : 'bg-orange-600 hover:bg-orange-700 text-white hover:shadow-2xl hover:-translate-y-1'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Mengirim...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" /> Kirim Pesanan via WhatsApp
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
};

export default Order;
