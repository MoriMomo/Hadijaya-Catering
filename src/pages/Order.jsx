import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, Plus } from 'lucide-react';
import { MENU_DATA } from '../constants/data';

const Order = () => {
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [selectedDate, setSelectedDate] = useState('');
    const [dateWarning, setDateWarning] = useState(false);
    const idCounterRef = useRef(1);
    const [orderLines, setOrderLines] = useState(() => [
        { id: idCounterRef.current, menuId: MENU_DATA[0].id, qty: 10 }
    ]);

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
        </>
    );
};

export default Order;
