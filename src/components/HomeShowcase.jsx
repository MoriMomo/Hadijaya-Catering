import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS, TRUSTED_PARTNERS, AUTO_PLAY_INTERVAL } from '../constants/testimonials';

const TrustedLogo = React.memo(({ name, logo, isRound = false }) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="hover:scale-105 transition-transform duration-300 flex items-center justify-center">
            <img
                src={imageError ? 'https://via.placeholder.com/100x40/e5e7eb/666?text=Logo' : logo}
                alt={`${name} - Trusted Partner`}
                className={`filter grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300 mix-blend-multiply ${isRound ? 'rounded-full object-cover border border-slate-200/60 shadow-sm' : 'h-10 md:h-12 w-auto object-contain'}`}
                style={{ maxHeight: isRound ? 72 : 48, opacity: isLoading ? 0 : 1 }}
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
        <>
            {/* Trusted Partners Section */}
            <div className="bg-[#FAF9F6] py-16 md:py-20 border-b border-stone-200/60">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="text-accent-600 font-bold uppercase tracking-wider text-xs">Kemitraan & Kepercayaan</span>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mt-2">
                            Kami Senang Dapat Dipercaya Oleh Anda
                        </h3>
                    </div>

                    {/* Logo Grid - Top Row */}
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 mb-8">
                        {TRUSTED_PARTNERS.companies.map((partner) => (
                            <TrustedLogo key={partner.name} name={partner.name} logo={partner.logo} />
                        ))}
                    </div>

                    {/* Logo Grid - Bottom Row (Government Institutions) */}
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
                        {TRUSTED_PARTNERS.government.map((partner) => (
                            <TrustedLogo key={partner.name} name={partner.name} logo={partner.logo} isRound={true} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-[#FAF9F6] py-20 md:py-24 border-b border-stone-200/60">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                        <span className="text-accent-600 font-bold uppercase tracking-widest text-xs">Testimoni Pelanggan</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Apa Kata Mereka?</h2>
                        <div className="w-12 h-1 bg-accent-500 mx-auto rounded-full mt-2"></div>
                    </div>

                    <div className="relative max-w-6xl mx-auto">
                        {/* Testimonials Grid with Touch Support */}
                        <div
                            className="relative min-h-[360px] sm:min-h-[300px] md:min-h-[290px] overflow-hidden"
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
                                        className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full relative group"
                                        style={{
                                            animationDelay: `${idx * 0.1}s`
                                        }}
                                    >
                                        {/* Decorative quote mark */}
                                        <span className="absolute top-2 right-6 text-primary-100/50 text-7xl font-serif select-none pointer-events-none group-hover:text-primary-200/50 transition-colors duration-300">“</span>
                                        
                                        <div>
                                            <div className="flex gap-1 mb-4" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                                                ))}
                                            </div>
                                            <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 italic text-left">
                                                "{testimonial.text}"
                                            </blockquote>
                                        </div>
                                        <cite className="font-bold not-italic text-slate-800 text-sm block border-t border-slate-100 pt-4 text-left">— {testimonial.name}</cite>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* Slider Dot Indicators */}
                        {maxIndex > 0 && (
                            <div className="flex justify-center gap-2 mt-8 z-20 relative">
                                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => {
                                            setDirection(i > currentIndex ? 'next' : 'prev');
                                            setCurrentIndex(i);
                                        }}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                                            currentIndex === i ? 'bg-primary-600 w-8' : 'bg-slate-300 hover:bg-slate-400'
                                        }`}
                                        aria-label={`Go to slide ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeShowcase;
