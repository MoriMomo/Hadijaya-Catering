import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function MenuError({ message = 'Gagal memuat data menu', onRetry }) {
  return (
    <div
      role="alert"
      className="bg-white rounded-2xl p-8 border border-red-200 shadow-sm text-center max-w-lg mx-auto my-8"
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center text-red-600">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Terjadi Kendala</h3>
      <p className="text-slate-600 text-sm mb-6 leading-relaxed">
        {message}. Silakan periksa koneksi internet Anda atau coba lagi beberapa saat lagi.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="inline-flex items-center gap-2 bg-primary-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-950 transition active:scale-95 shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Coba Lagi
        </button>
      )}
    </div>
  );
}
