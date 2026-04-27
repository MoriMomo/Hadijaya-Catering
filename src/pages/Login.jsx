import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OptimizedImage from '../components/OptimizedImage';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const handleFieldChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!credentials.username || !credentials.password) {
            setError('Isi semua bidang untuk melanjutkan.');
            return;
        }

        setIsSubmitting(true);
        // Simulate network delay
        setTimeout(async () => {
            const result = await login(credentials.username, credentials.password);
            if (result.success) {
                navigate(from, { replace: true });
            } else {
                setError(result.error);
                setIsSubmitting(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden animate-fade-in">
            <Helmet>
                <title>Admin Login - Hadijaya Catering</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {/* Decorative background blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="w-full max-w-md relative z-10">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors font-medium text-sm group focus:outline-none"
                    aria-label="Kembali ke Beranda"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
                </button>

                <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 md:p-10">
                    <div className="flex flex-col items-center mb-10">
                        <OptimizedImage
                            src="/images/hadijaya/makanan/hadijaya-catering-logo.webp"
                            fallback="/images/placeholder.svg"
                            alt="Hadijaya Catering Logo"
                            className="h-16 mb-6"
                            width={160}
                            height={64}
                        />
                        <h1 className="text-2xl font-serif font-bold text-slate-900 text-center">Admin Portal</h1>
                        <p className="text-sm text-slate-500 text-center mt-2">Masuk ke halaman manajemen pesanan</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl text-sm flex items-center gap-3 animate-fade-in">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-2 relative group">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-2">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-500 transition-colors">
                                    <User className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleFieldChange}
                                    className="w-full bg-slate-50/50 border border-slate-200 pl-12 pr-4 py-3.5 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all shadow-sm"
                                    placeholder="Masukkan username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 relative group">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-500 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleFieldChange}
                                    className="w-full bg-slate-50/50 border border-slate-200 pl-12 pr-4 py-3.5 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all shadow-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg shadow-accent-500/20 text-white flex items-center justify-center gap-2 mt-4 
                                ${isSubmitting ? 'bg-accent-400 cursor-wait' : 'bg-accent-500 hover:bg-accent-600 hover:-translate-y-0.5 active:translate-y-0'}`}
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Masuk Dashboard"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
