/**
 * Script to generate placeholder images for missing menu items
 * Run: node scripts/generatePlaceholders.js
 * 
 * This will create SVG placeholders for all menu items in data.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const menuData = [
    { slug: 'paket-a-nasi-uduk-ijo-daging-semur', name: 'Paket A', color: '#f97316' },
    { slug: 'paket-b-nasi-uduk-ijo-daging-dengdeng', name: 'Paket B', color: '#ea580c' },
    { slug: 'paket-c-nasi-uduk-ijo-ayam-goreng', name: 'Paket C', color: '#dc2626' },
    { slug: 'paket-d-nasi-uduk-ijo-ayam-rendang', name: 'Paket D', color: '#b91c1c' },
    { slug: 'nasi-uduk-ijo', name: 'Nasi Uduk Ijo', color: '#059669' },
    { slug: 'nasi-uduk-kuning', name: 'Nasi Uduk Kuning', color: '#f59e0b' },
    { slug: 'nasi-uduk-putih', name: 'Nasi Uduk Putih', color: '#64748b' },
    { slug: 'nasi-biasa', name: 'Nasi Biasa', color: '#94a3b8' },
    { slug: 'empal', name: 'Empal', color: '#7c2d12' },
    { slug: 'semur', name: 'Semur', color: '#92400e' },
    { slug: 'rendang', name: 'Rendang', color: '#991b1b' },
    { slug: 'sate-assem', name: 'Sate Assem', color: '#b91c1c' },
    { slug: 'ayam-goreng', name: 'Ayam Goreng', color: '#d97706' },
    { slug: 'ayam-bakar', name: 'Ayam Bakar', color: '#dc2626' },
    { slug: 'ayam-gulai', name: 'Ayam Gulai', color: '#ca8a04' },
    { slug: 'ayam-rendang', name: 'Ayam Rendang', color: '#b91c1c' },
    { slug: 'ayam-semur', name: 'Ayam Semur', color: '#92400e' },
    { slug: 'telur-balado', name: 'Telur Balado', color: '#dc2626' },
    { slug: 'telur-semur', name: 'Telur Semur', color: '#92400e' },
    { slug: 'telur-rendang', name: 'Telur Rendang', color: '#b91c1c' },
    { slug: 'tahu-tempe-goreng-spesial', name: 'Tahu/Tempe Goreng', color: '#78716c' },
    { slug: 'tahu-tempe-semur', name: 'Tahu/Tempe Semur', color: '#92400e' },
    { slug: 'tahu-tempe-masak-kari', name: 'Tahu/Tempe Kari', color: '#ca8a04' },
    { slug: 'tempe-orek', name: 'Tempe Orek', color: '#78716c' },
    { slug: 'tahu-orek-balado', name: 'Tahu Orek Balado', color: '#dc2626' },
    { slug: 'sambel-mangga', name: 'Sambel Mangga', color: '#f59e0b' },
    { slug: 'sambel-kacang', name: 'Sambel Kacang', color: '#92400e' },
    { slug: 'sambel-goreng', name: 'Sambel Goreng', color: '#dc2626' },
    { slug: 'pastel', name: 'Pastel', color: '#fbbf24' },
    { slug: 'risol', name: 'Risol', color: '#f59e0b' },
    { slug: 'kue-lupis', name: 'Kue Lupis', color: '#059669' },
    { slug: 'kue-pisang', name: 'Kue Pisang', color: '#eab308' },
    { slug: 'lontong', name: 'Lontong', color: '#f1f5f9' },
    { slug: 'lemper', name: 'Lemper', color: '#059669' },
    { slug: 'dadar-gulung', name: 'Dadar Gulung', color: '#16a34a' },
    { slug: 'extra-buah', name: 'Extra Buah', color: '#ef4444' }
];

const createSVG = (name, color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none">
  <defs>
    <linearGradient id="bg-${name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.2" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg-${name})"/>
  <circle cx="200" cy="120" r="50" fill="${color}" opacity="0.3"/>
  <path d="M200 130 L240 170 L200 210 L160 170 Z" fill="${color}" opacity="0.5"/>
  <text x="200" y="260" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="${color}" text-anchor="middle">
    ${name}
  </text>
</svg>`;

const outputDir = path.join(__dirname, '..', 'public', 'images');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

let generated = 0;
let skipped = 0;

menuData.forEach(item => {
    const filePath = path.join(outputDir, `${item.slug}.jpg`);
    const svgPath = path.join(outputDir, `${item.slug}.svg`);

    // Check if file already exists (jpg or actual image)
    if (fs.existsSync(filePath)) {
        console.log(`⏭️  Skipped: ${item.slug}.jpg (already exists)`);
        skipped++;
        return;
    }

    // Generate SVG placeholder
    const svg = createSVG(item.name, item.color);
    fs.writeFileSync(svgPath, svg);
    console.log(`✅ Generated: ${item.slug}.svg`);
    generated++;
});

console.log(`\n📊 Summary:`);
console.log(`   Generated: ${generated} placeholders`);
console.log(`   Skipped: ${skipped} existing files`);
console.log(`\n💡 Note: Replace these SVG files with actual food photos for better appearance!`);
