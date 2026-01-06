const RAW_MENU_DATA = [
    // Paket spesial
    { id: 1, name: 'Paket A - Nasi Uduk Ijo + Daging Semur', category: 'paket', price: 35000, desc: 'Nasi Uduk Ijo, Daging Semur, Kentang Sambel Goreng, Sambel Trasi Mangga, Krupuk & Lalapan', featured: true },
    { id: 2, name: 'Paket B - Nasi Uduk Ijo + Daging Dengdeng', category: 'paket', price: 35000, desc: 'Nasi Uduk Ijo, Daging Dengdeng, Tempe Orek, Sambel Trasi Mangga, Krupuk & Lalapan', featured: true },
    { id: 3, name: 'Paket C - Nasi Uduk Ijo + Ayam Goreng', category: 'paket', price: 30000, desc: 'Nasi Uduk Ijo, Ayam Goreng, Tempe Orek, Sambel Trasi Mangga, Krupuk & Lalapan', featured: false },
    { id: 4, name: 'Paket D - Nasi Uduk Ijo + Ayam Rendang', category: 'paket', price: 30000, desc: 'Nasi Uduk Ijo, Ayam Rendang, Tempe Orek, Sambel Trasi Mangga, Krupuk & Lalapan', featured: false },

    // Nasi
    { id: 10, name: 'Nasi Uduk Ijo', category: 'nasi', price: 12000, desc: 'Nasi uduk harum daun suji/pandan', featured: false },
    { id: 11, name: 'Nasi Uduk Kuning', category: 'nasi', price: 10000, desc: 'Nasi kuning untuk acara spesial', featured: false },
    { id: 12, name: 'Nasi Uduk Putih', category: 'nasi', price: 9000, desc: 'Nasi uduk tanpa pewarna', featured: false },
    { id: 13, name: 'Nasi Biasa', category: 'nasi', price: 7000, desc: 'Nasi putih biasa', featured: false },

    // Daging (Sapi)
    { id: 20, name: 'Empal', category: 'daging', price: 20000, desc: 'Empal sapi empuk', featured: false },
    { id: 21, name: 'Semur', category: 'daging', price: 20000, desc: 'Semur daging manis gurih', featured: false },
    { id: 22, name: 'Rendang', category: 'daging', price: 20000, desc: 'Rendang sapi pedas sedap', featured: false },
    { id: 23, name: 'Sate Assem', category: 'daging', price: 20000, desc: 'Sate daging khas', featured: false },

    // Ayam
    { id: 30, name: 'Ayam Goreng', category: 'ayam', price: 15000, desc: 'Ayam goreng renyah', featured: false },
    { id: 31, name: 'Ayam Geprek', category: 'ayam', price: 15000, desc: 'Ayam geprek pedas', featured: false },
    { id: 32, name: 'Ayam Bakar', category: 'ayam', price: 15000, desc: 'Ayam bakar manis', featured: false },
    { id: 33, name: 'Ayam Gulai', category: 'ayam', price: 15000, desc: 'Ayam gulai santan', featured: false },
    { id: 34, name: 'Ayam Rendang', category: 'ayam', price: 15000, desc: 'Ayam rendang empuk', featured: false },
    { id: 35, name: 'Ayam Semur', category: 'ayam', price: 15000, desc: 'Ayam semur manis gurih', featured: false },

    // Telur
    { id: 40, name: 'Telur Balado', category: 'telur', price: 8000, desc: 'Telur balado pedas', featured: false },
    { id: 41, name: 'Telur Semur', category: 'telur', price: 8000, desc: 'Telur semur manis', featured: false },
    { id: 42, name: 'Telur Rendang', category: 'telur', price: 8000, desc: 'Telur rendang lezat', featured: false },

    // Tahu / Tempe
    { id: 50, name: 'Tahu/Tempe Goreng Spesial', category: 'tahu-tempe', price: 7000, desc: 'Tahu/tempe goreng spesial', featured: false },
    { id: 51, name: 'Tahu/Tempe Semur', category: 'tahu-tempe', price: 7000, desc: 'Tahu/tempe semur', featured: false },
    { id: 52, name: 'Tahu/Tempe Masak Kari', category: 'tahu-tempe', price: 7000, desc: 'Tahu/tempe kari', featured: false },
    { id: 53, name: 'Tempe Orek', category: 'tahu-tempe', price: 7000, desc: 'Tempe orek manis', featured: false },
    { id: 54, name: 'Tahu Orek Balado', category: 'tahu-tempe', price: 7000, desc: 'Tahu orek balado pedas', featured: false },

    // Sambel
    { id: 60, name: 'Sambel Mangga', category: 'sambel', price: 5000, desc: 'Sambel mangga segar', featured: false },
    { id: 61, name: 'Sambel Kacang', category: 'sambel', price: 3000, desc: 'Sambel kacang', featured: false },
    { id: 62, name: 'Sambel Goreng', category: 'sambel', price: 3000, desc: 'Sambel goreng pedas', featured: false },

    // Snack / Lainnya
    { id: 70, name: 'Pastel', category: 'snack', price: 4000, desc: 'Pastel goreng', featured: false },
    { id: 71, name: 'Risol', category: 'snack', price: 4000, desc: 'Risol mayo', featured: false },
    { id: 72, name: 'Kue Lupis', category: 'snack', price: 4000, desc: 'Kue lupis tradisional', featured: false },
    { id: 73, name: 'Kue Pisang', category: 'snack', price: 4000, desc: 'Kue pisang', featured: false },
    { id: 74, name: 'Lontong', category: 'snack', price: 4000, desc: 'Lontong', featured: false },
    { id: 75, name: 'Lemper', category: 'snack', price: 4000, desc: 'Lemper ayam', featured: false },
    { id: 76, name: 'Dadar Gulung', category: 'snack', price: 4000, desc: 'Dadar gulung', featured: false },
    { id: 77, name: 'Extra Buah', category: 'snack', price: 7000, desc: 'Porsi buah tambahan', featured: false }
];

// Build image path from item name. Put your images at public/images/<slug>.jpg
// Example: name "Nasi Uduk Ijo" -> /images/nasi-uduk-ijo.jpg
const toSlug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const MENU_DATA = RAW_MENU_DATA.map(item => {
    const slug = toSlug(item.name);
    const img = item.img || `/images/${slug}.jpg`;
    const fallbackImg = item.fallbackImg || '/images/placeholder.svg';
    return { ...item, img, fallbackImg };
});

export const ORDER_HISTORY = [
    { client: "Kementerian A", date: "25 Okt 2023", pax: 150, value: 7500000, status: "Selesai" },
    { client: "Ibu Siti Arisan", date: "28 Okt 2023", pax: 50, value: 2000000, status: "Pending" },
    { client: "Dinas Pendidikan", date: "02 Nov 2023", pax: 300, value: 15000000, status: "Confirmed" }
];
