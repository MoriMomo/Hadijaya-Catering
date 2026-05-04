export const validateName = (name) => {
    if (!name.trim()) return 'Nama wajib diisi';
    if (name.trim().length < 3) return 'Nama minimal 3 karakter';
    return '';
};

export const validatePhone = (phone) => {
    if (!phone.trim()) return 'Nomor WhatsApp wajib diisi';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('62') && cleaned.length >= 11) return '';
    if (cleaned.startsWith('08') && cleaned.length >= 10) return '';
    return 'Format: 08xx atau +62xxx (min 10 digit)';
};
