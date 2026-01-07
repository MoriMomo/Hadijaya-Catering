import React, { useState, useRef } from 'react';

/**
 * Optimized Image component with fallback handling
 * Prevents 404 errors by cascading through multiple fallback options
 * Tries: .jpg → .jpeg → .svg → placeholder.svg
 */
const OptimizedImage = ({ src, alt, className, fallback = '/images/placeholder.svg' }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const attemptedUrls = useRef(new Set([src]));

    const handleError = () => {
        // Build smart fallback chain based on current extension
        const basePath = imgSrc.replace(/\.(jpg|jpeg|png|svg|webp)$/i, '');
        const currentExt = imgSrc.match(/\.(jpg|jpeg|png|svg|webp)$/i)?.[1];

        const fallbacks = [];

        // Only try .jpeg if we just tried .jpg (for ayam-geprek case)
        if (currentExt === 'jpg') {
            fallbacks.push(`${basePath}.jpeg`);
        }

        // Try .svg if we haven't yet (main fallback)
        if (currentExt !== 'svg') {
            fallbacks.push(`${basePath}.svg`);
        }

        // Final fallback
        fallbacks.push(fallback);

        // Find next untried fallback
        for (const nextUrl of fallbacks) {
            if (!attemptedUrls.current.has(nextUrl)) {
                attemptedUrls.current.add(nextUrl);
                setImgSrc(nextUrl);
                return;
            }
        }

        // All fallbacks exhausted, use final fallback
        if (imgSrc !== fallback) {
            setImgSrc(fallback);
        }
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="relative">
            {isLoading && (
                <div className={`${className} absolute inset-0 bg-slate-200 animate-pulse`} />
            )}
            <img
                src={imgSrc}
                alt={alt}
                className={className}
                onError={handleError}
                onLoad={handleLoad}
                loading="lazy"
            />
        </div>
    );
};

export default OptimizedImage;
