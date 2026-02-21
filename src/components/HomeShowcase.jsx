import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { TESTIMONIALS, TRUSTED_PARTNERS, AUTO_PLAY_INTERVAL } from '../constants/testimonials';

const TrustedLogo = React.memo(({ name, logo, isRound = false }) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="hover:scale-110 transition-transform duration-300 flex items-center justify-center">
            <img
                src={imageError ? 'https://via.placeholder.com/100x40/e5e7eb/666?text=Logo' : logo}
                alt={`${name} - Trusted Partner`}
                className={`${isRound ? 'rounded-full object-cover' : 'w-auto'}`}
                style={{ maxHeight: isRound ? 80 : 64, opacity: isLoading ? 0 : 1, transition: 'opacity 300ms ease-in-out' }}
                onLoad={() => setIsLoading(false)}
                onError={(e) => {
                    console.error(`Failed to load logo: ${logo}`, e);
                    setImageError(true);
                    setIsLoading(false);
                }}
                loading="lazy"
            />
        </div>
    );
});

TrustedLogo.displayName = 'TrustedLogo';

const HomeShowcase = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');
    const [isMobile, setIsMobile] = useState(false);
    const [isAutoPlay] = useState(true);
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

    const visibleTestimonials = TESTIMONIALS.slice(currentIndex, currentIndex + testimonialsPerPage);

    return (
        <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
            {/* Trusted Partners Section */}
            <div className="bg-[#fcfbf9] dark:bg-slate-800/50 py-16 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white mb-12"
                    >
                        Kami Senang Dapat Dipercaya Oleh Anda
                    </motion.h3>

                    {/* Logo Grid - Top Row */}
                    <div className="flex lex-wrap justify-center items-center gap-6 md:gapf-8 lg:gap-12 mb-8">
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
            <div className="bg-[#4a7c59] dark:bg-slate-900 py-16 md:py-20 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="relative">

                        {/* Testimonials Grid with Touch Support */}
                        <div
                            className="relative min-h-60 md:min-h-64 overflow-hidden"
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

                        {/* Navigation controls - Optional for mobile, essential for desktop */}
                        {!isMobile && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 rounded-full flex items-center justify-center shadow-lg text-slate-800 dark:text-white transition duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10"
                                    disabled={currentIndex === 0}
                                    aria-label="Previous testimonial"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 rounded-full flex items-center justify-center shadow-lg text-slate-800 dark:text-white transition duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10"
                                    disabled={currentIndex >= maxIndex}
                                    aria-label="Next testimonial"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {[...Array(maxIndex + 1)].map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-white dark:bg-orange-500' : 'w-2 bg-white/40 dark:bg-slate-600'
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                                aria-pressed={currentIndex === idx}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeShowcase;
