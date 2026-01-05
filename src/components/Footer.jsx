import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { TESTIMONIALS, TRUSTED_PARTNERS, AUTO_PLAY_INTERVAL } from '../constants/testimonials';

const TrustedLogo = React.memo(({ name, logo, isRound = false }) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="grayscale hover:grayscale-0 transition opacity-60 hover:opacity-100">
            {isLoading && (
                <div className={`${isRound ? 'h-14 w-14 rounded-full' : 'h-10 w-24'} bg-slate-200 animate-pulse`} />
            )}
            <img
                src={imageError ? 'https://via.placeholder.com/100x40/e5e7eb/666?text=Logo' : logo}
                alt={`${name} - Trusted Partner`}
                className={`${isRound ? 'h-14 w-14 rounded-full' : 'h-10'} object-contain ${isLoading ? 'hidden' : 'block'}`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setImageError(true);
                    setIsLoading(false);
                }}
                loading="lazy"
            />
        </div>
    );
});

TrustedLogo.displayName = 'TrustedLogo';

const Footer = ({ onRoleChange }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');
    const [isMobile, setIsMobile] = useState(false);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const autoPlayTimerRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const testimonialsPerPage = isMobile ? 1 : 3;
    const maxIndex = Math.max(0, TESTIMONIALS.length - testimonialsPerPage);

    const handlePrev = useCallback(() => {
        setDirection('prev');
        setCurrentIndex(prev => Math.max(0, prev - 1));
    }, []);

    const handleNext = useCallback(() => {
        setDirection('next');
        setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    }, [maxIndex]);

    const handleDotClick = useCallback((index) => {
        setDirection(index > currentIndex ? 'next' : 'prev');
        setCurrentIndex(index);
    }, [currentIndex]);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlay) return;

        autoPlayTimerRef.current = setInterval(() => {
            setCurrentIndex(prev => {
                if (prev >= maxIndex) {
                    setDirection('next');
                    return 0;
                }
                setDirection('next');
                return prev + 1;
            });
        }, AUTO_PLAY_INTERVAL);

        return () => {
            if (autoPlayTimerRef.current) {
                clearInterval(autoPlayTimerRef.current);
            }
        };
    }, [isAutoPlay, maxIndex]);

    // Touch/Swipe handlers
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && currentIndex < maxIndex) {
            handleNext();
        } else if (isRightSwipe && currentIndex > 0) {
            handlePrev();
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    const toggleAutoPlay = useCallback(() => {
        setIsAutoPlay(prev => !prev);
    }, []);

    const visibleTestimonials = TESTIMONIALS.slice(currentIndex, currentIndex + testimonialsPerPage);

    return (
        <footer className="bg-[#fcfbf9]">
            {/* Trusted Partners Section */}
            <div className="py-16 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <h3 className="text-center text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-12">
                        Kami Senang Dapat Dipercaya Oleh Anda
                    </h3>

                    {/* Logo Grid - Top Row */}
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12 mb-8">
                        {TRUSTED_PARTNERS.companies.map((partner) => (
                            <TrustedLogo key={partner.name} name={partner.name} logo={partner.logo} />
                        ))}
                    </div>

                    {/* Logo Grid - Bottom Row (Government Institutions) */}
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
                        {TRUSTED_PARTNERS.government.map((partner) => (
                            <TrustedLogo key={partner.name} name={partner.name} logo={partner.logo} isRound={true} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-[#4a7c59] py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="relative">
                        {/* Auto-play control */}
                        <button
                            onClick={toggleAutoPlay}
                            className="absolute top-0 right-0 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition"
                            aria-label={isAutoPlay ? 'Pause auto-play' : 'Start auto-play'}
                            title={isAutoPlay ? 'Pause auto-play' : 'Start auto-play'}
                        >
                            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>

                        {/* Navigation Buttons - Hidden on Mobile */}
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 hover:bg-white text-[#4a7c59] p-3 rounded-full shadow-lg transition disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                            aria-label="Previous testimonials"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={currentIndex >= maxIndex}
                            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 hover:bg-white text-[#4a7c59] p-3 rounded-full shadow-lg transition disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                            aria-label="Next testimonials"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Testimonials Grid with Touch Support */}
                        <div
                            className="relative min-h-[280px] md:min-h-[300px] overflow-hidden"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            role="region"
                            aria-live="polite"
                            aria-atomic="true"
                            aria-label="Customer testimonials"
                        >
                            <div
                                key={`testimonial-${currentIndex}`}
                                className={`grid grid-cols-1 md:grid-cols-3 gap-8 absolute inset-0 ${direction === 'next' ? 'animate-slideInRight' : 'animate-slideInLeft'
                                    }`}
                            >
                                {visibleTestimonials.map((testimonial, idx) => (
                                    <article
                                        key={testimonial.id}
                                        className="text-center text-white px-4 md:px-0"
                                        style={{
                                            animationDelay: `${idx * 0.1}s`
                                        }}
                                    >
                                        <div className="flex justify-center gap-1 mb-4" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-amber-400 text-amber-400" aria-hidden="true" />
                                            ))}
                                        </div>
                                        <blockquote className="text-sm md:text-base leading-relaxed mb-4 max-w-md mx-auto">
                                            "{testimonial.text}"
                                        </blockquote>
                                        <cite className="font-bold not-italic">— {testimonial.name}</cite>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* Dots Indicator */}
                        <nav className="flex justify-center gap-2 mt-8" aria-label="Testimonial navigation">
                            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleDotClick(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-amber-400 w-8' : 'bg-white/40 hover:bg-white/60 w-2'
                                        }`}
                                    aria-label={`Go to testimonial set ${idx + 1}`}
                                    aria-current={currentIndex === idx ? 'true' : 'false'}
                                />
                            ))}
                        </nav>

                        {/* Mobile Navigation Buttons */}
                        <div className="flex md:hidden justify-center gap-4 mt-6">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="bg-white/90 hover:bg-white text-[#4a7c59] p-3 rounded-full shadow-lg transition disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                                aria-label="Previous testimonials"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex >= maxIndex}
                                className="bg-white/90 hover:bg-white text-[#4a7c59] p-3 rounded-full shadow-lg transition disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                                aria-label="Next testimonials"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="bg-[#fcfbf9] py-12 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* Profil & Kontak */}
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-6">Profil & Kontak</h4>
                            <address className="space-y-3 text-sm text-slate-600 not-italic">
                                <div>
                                    <p className="font-semibold text-slate-800 mb-1">Nama Perusahaan</p>
                                    <p className="leading-relaxed">PT. Hadi Jaya Citra / Hadijaya Catering</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 mb-1">Alamat</p>
                                    <p className="leading-relaxed">Jl. Pos Pengumben lama RT004/05 NO.10, Jl. Sukabumi Selatan Kebon Jeruk, Jakarta Barat 11560</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 mb-1">Kontak</p>
                                    <p className="leading-relaxed">
                                        <a href="tel:081211212185" className="hover:text-orange-600 transition">
                                            Telepon: 0812 1121 2185
                                        </a>
                                    </p>
                                    <p className="leading-relaxed">
                                        <a href="https://wa.me/6281211212185" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition">
                                            WhatsApp: 0812 1121 2185
                                        </a>
                                    </p>
                                    <p className="leading-relaxed">
                                        <a href="mailto:pt.hjcitra@gmail.com" className="hover:text-orange-600 transition">
                                            Email: pt.hjcitra@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </address>
                        </div>

                        {/* Hubungi Kami */}
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-6">Hubungi Kami</h4>
                            <div className="space-y-3 text-sm text-slate-600">
                                <p className="flex items-center gap-2">
                                    <span className="text-slate-400" aria-hidden="true">📞</span>
                                    <a href="tel:081211212185" className="hover:text-orange-600 transition">
                                        Telepon: 0812 1121 2185
                                    </a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-slate-400" aria-hidden="true">💬</span>
                                    <a href="https://wa.me/6281211212185" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition">
                                        WhatsApp: 0812 1121 2185
                                    </a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-slate-400" aria-hidden="true">✉️</span>
                                    <a href="mailto:pt.hjcitra@gmail.com" className="hover:text-orange-600 transition">
                                        Saran dan Keluhan
                                    </a>
                                </p>
                                <button
                                    onClick={() => onRoleChange('owner')}
                                    className="mt-4 text-xs text-slate-500 hover:text-orange-600 border border-slate-300 hover:border-orange-600 px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
                                    aria-label="Admin login"
                                >
                                    Admin Login
                                </button>
                            </div>
                        </div>

                        {/* Informasi */}
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-6">Informasi</h4>
                            <nav className="space-y-3 text-sm text-slate-600" aria-label="Footer navigation">
                                <a href="#tentang" className="block hover:text-orange-600 transition focus:text-orange-600">Tentang Kami</a>
                                <a href="#faq" className="block hover:text-orange-600 transition focus:text-orange-600">FAQ</a>
                                <a href="#karir" className="block hover:text-orange-600 transition focus:text-orange-600">Karir</a>
                                <a href="#syarat" className="block hover:text-orange-600 transition focus:text-orange-600">Syarat dan Ketentuan</a>
                                <a href="#pemesanan" className="block hover:text-orange-600 transition focus:text-orange-600">Pemesanan dan Pengiriman</a>
                                <a href="#pembatalan" className="block hover:text-orange-600 transition focus:text-orange-600">Pembatalan dan Pengembalian</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-[#fcfbf9] py-6 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Hadijaya Catering. Crafted with excellence.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;