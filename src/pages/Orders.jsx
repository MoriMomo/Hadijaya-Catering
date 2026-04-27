import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, ArrowRight, Loader2, LogOut } from 'lucide-react';
import { ORDER_HISTORY } from '../constants/data';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (supabase) {
                try {
                    const { data, error } = await supabase
                        .from('orders')
                        .select('*')
                        .order('created_at', { ascending: false });
                    
                    if (!error && data) {
                        // Map supabase columns to expected interface if needed
                        const formatted = data.map(dbOrder => ({
                            id: dbOrder.id,
                            client: dbOrder.client_name,
                            date: dbOrder.event_date,
                            pax: dbOrder.total_pax,
                            value: dbOrder.total_value,
                            status: dbOrder.status || 'Pending'
                        }));
                        setOrders(formatted);
                    } else {
                        setOrders(ORDER_HISTORY); // Fallback
                    }
                } catch (err) {
                    console.error("Failed to fetch orders from Supabase:", err);
                    setOrders(ORDER_HISTORY); // Fallback
                }
            } else {
                setOrders(ORDER_HISTORY); // Fallback if no Supabase credentials
            }
            setIsLoading(false);
        };

        fetchOrders();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="bg-slate-50 min-h-screen p-8 animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="text-slate-500 hover:text-slate-900 flex items-center gap-2 font-bold transition hover:-translate-x-1"
                    >
                        <ArrowRight className="w-4 h-4 rotate-180" /> Kembali
                    </button>
                    <button
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-700 flex items-center gap-2 font-bold transition"
                    >
                        Logout <LogOut className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-accent-500 shadow-sm border border-slate-100">
                        <ClipboardList className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 font-serif">Riwayat Pesanan</h2>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full min-h-[400px]">
                            <Loader2 className="w-8 h-8 animate-spin text-accent-500" />
                        </div>
                    ) : (
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
                            {orders.map((order, idx) => (
                                <tr key={order.id || idx} className="hover:bg-slate-50 transition">
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
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-slate-500">
                                        Belum ada pesanan masuk.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;
