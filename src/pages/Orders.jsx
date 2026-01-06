import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, ArrowRight } from 'lucide-react';
import { ORDER_HISTORY } from '../constants/data';

const Orders = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-50 min-h-screen p-8 animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-slate-500 hover:text-slate-900 flex items-center gap-2 mb-8 font-bold transition hover:-translate-x-1"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" /> Kembali
                </button>
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm border border-slate-100">
                        <ClipboardList className="w-6 h-6" />
                    </div>
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
};

export default Orders;
