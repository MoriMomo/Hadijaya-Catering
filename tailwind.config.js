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
                // Pandan Green - Signature Nasi Uduk Hijau
                primary: {
                    50: '#F2FBF5',
                    100: '#E1F6E8',
                    200: '#C2ECCF',
                    300: '#94DBAC',
                    400: '#5EC181',
                    500: '#35A35C', // Main Green
                    600: '#268245',
                    700: '#1F6738',
                    800: '#1B522F',
                    900: '#174328',
                    950: '#0C2616',
                },
                // Sambal/Turmeric Orange - Appetizing warmth
                accent: {
                    50: '#FFF5ED',
                    100: '#FFE8D4',
                    200: '#FFCFA3',
                    300: '#FFAD66',
                    400: '#FF8124',
                    500: '#F56000', // Vibrant Orange
                    600: '#C74500',
                    700: '#9E3203',
                    800: '#7E2A0A',
                    900: '#65240B',
                    950: '#360F03',
                },
                // Override Slate to be Stone (Warm Gray) globally
                slate: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                    950: '#0c0a09',
                },
            }
        },
    },
    plugins: [],
}
