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
                // Rich Pandan & Botanical Green
                primary: {
                    50: '#F2FAF4',
                    100: '#E1F4E6',
                    200: '#C3E7CD',
                    300: '#98D4AB',
                    400: '#65B982',
                    500: '#3E9B5F',
                    600: '#2D7A49',
                    700: '#24603B',
                    800: '#1D4A2F',
                    900: '#173925',
                    950: '#0D2216',
                },
                // Cozy Warm Orange-Brown / Terracotta / Cinnamon
                accent: {
                    50: '#FAF3EE',
                    100: '#F5E5D8',
                    200: '#ECC7AF',
                    300: '#DF9E7B',
                    400: '#CF744B',
                    500: '#BD5228',
                    600: '#9E3D18',
                    700: '#7E2C10',
                    800: '#65210A',
                    900: '#521A08',
                    950: '#300D04',
                },
                // Cozy Warm Stone (Espresso & Warm Timber)
                slate: {
                    50: '#FAF8F5',
                    100: '#F4F0EA',
                    200: '#E7E0D6',
                    300: '#D5C8B9',
                    400: '#A69685',
                    500: '#7B6C5C',
                    600: '#5C4F42',
                    700: '#453A30',
                    800: '#2D251E',
                    900: '#1E1813',
                    950: '#100C09',
                },
            }
        },
    },
    plugins: [],
}
