import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

/**
 * FormField - Reusable form input with validation feedback
 * Phase 1: Better validation UX with character count and clear error states
 */
export const FormField = ({
    label,
    icon: Icon,
    type = 'text',
    value,
    onChange,
    onBlur,
    error,
    touched,
    placeholder,
    helpText,
    maxLength,
    required,
}) => {
    const showError = error && touched;
    const isValid = !error && touched && value;

    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>

            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    aria-describedby={showError ? `${label}-error` : helpText ? `${label}-help` : undefined}
                    aria-invalid={showError}
                    className={`w-full px-4 py-3 border-2 rounded-lg transition focus:outline-none focus:ring-0 ${showError
                            ? 'border-red-500 bg-red-50'
                            : isValid
                                ? 'border-green-500 bg-green-50'
                                : 'border-slate-200 bg-slate-50 focus:border-accent-400 focus:bg-white'
                        }`}
                />

                {/* Validation Icons */}
                {showError && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                )}
                {isValid && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
            </div>

            {/* Character Count */}
            {maxLength && (
                <div className="flex justify-between items-center px-2">
                    <span className="text-xs text-slate-500">{helpText}</span>
                    <span className={`text-xs font-medium ${value.length > maxLength * 0.9 ? 'text-orange-500' : 'text-slate-400'}`}>
                        {value.length} / {maxLength}
                    </span>
                </div>
            )}

            {/* Error Message */}
            {showError && (
                <p id={`${label}-error`} className="text-red-500 text-xs flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                </p>
            )}

            {/* Help Text */}
            {helpText && !showError && (
                <p id={`${label}-help`} className="text-slate-500 text-xs">
                    {helpText}
                </p>
            )}
        </div>
    );
};

/**
 * CartSummary - Floating sticky cart with real-time totals
 * Phase 1: Better visibility and immediate feedback
 */
export const CartSummary = ({ totalPortions, totalPrice, formatCurrency, onSubmit, isSubmitting, isValid }) => {
    return (
        <div
            className={`fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-white border-t-2 border-slate-200 shadow-[0_-8px_32px_rgba(0,0,0,0.1)] z-40 transition-all duration-300 ${totalPortions > 0 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
                }`}
        >
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left: Summary */}
                <div className="flex-1">
                    <div className="flex items-baseline gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Ringkasan Pesanan</span>
                            <span className="text-2xl md:text-3xl font-bold text-slate-900">{formatCurrency(totalPrice)}</span>
                        </div>
                        <div className="px-3 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold">
                            {totalPortions} Porsi
                        </div>
                    </div>
                </div>

                {/* Right: Action Button */}
                <button
                    onClick={onSubmit}
                    disabled={!isValid || isSubmitting}
                    className={`w-full md:w-auto px-8 py-3.5 rounded-lg font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${isValid && !isSubmitting
                            ? 'bg-accent-500 text-white hover:bg-accent-600 active:scale-95 shadow-md'
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Mengirim...
                        </>
                    ) : (
                        <>
                            ✓ Lanjutkan ke WhatsApp
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default FormField;
