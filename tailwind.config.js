/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
            colors: {
                // Warm orange/apricot accent palette - catering brand colors
                accent: {
                    50: '#FEF3E6',
                    100: '#FDD8B8',
                    200: '#FBBC7F',
                    300: '#F9A046',
                    400: '#F2A65A',  // Warm apricot
                    500: '#E89D47',
                    600: '#D9863D',
                    700: '#CA6F33',
                    800: '#B65829',
                    900: '#8B3E1B',
                    950: '#5C2910',
                },
                // Neutral grays - warm, creamy
                slate: {
                    50: '#FAFAF9',   // Creamy white
                    100: '#F5F3F0',
                    200: '#E8E5E0',
                    300: '#D9D5CF',
                    400: '#C0B9B1',
                    500: '#8C8178',
                    600: '#5C5046',
                    700: '#3E3A36',
                    800: '#2C2620',
                    900: '#1A1816',
                    950: '#0D0B09',
                },
            }
        },
    },
    plugins: [],
}
