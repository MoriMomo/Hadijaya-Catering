import React, { useState, useRef } from 'react';

/**
 * Optimized Image component with fallback handling.
 */
const OptimizedImage = ({
    src,
    alt,
    className = '',
    fallback = '/images/placeholder.svg',
    sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    width,
    height,
    priority = false,
}) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const attemptedUrls = useRef(new Set([src]));

    const getBasePath = (path) => path?.replace(/\.(jpg|jpeg|png|svg|webp)$/i, '') || '';
    const currentExt = imgSrc.match(/\.(jpg|jpeg|png|svg|webp)$/i)?.[1];
    const basePath = getBasePath(imgSrc);

    const handleError = () => {
        const fallbacks = [];

        if (currentExt === 'jpg') {
            fallbacks.push(`${basePath}.jpeg`);
        }

        if (currentExt !== 'svg') {
            fallbacks.push(`${basePath}.svg`);
        }

        fallbacks.push(fallback);

        for (const nextUrl of fallbacks) {
            if (!attemptedUrls.current.has(nextUrl)) {
                attemptedUrls.current.add(nextUrl);
                setImgSrc(nextUrl);
                return;
            }
        }

        if (imgSrc !== fallback) {
            setImgSrc(fallback);
        }
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    const aspectStyle = width && height ? { aspectRatio: `${width}/${height}` } : undefined;

    return (
        <div className="relative w-full h-full" style={aspectStyle}>
            {isLoading && (
                <div className={`${className} absolute inset-0 bg-slate-200 animate-pulse`} />
            )}
            <picture className="w-full h-full block">
                <source srcSet={imgSrc} />
                <img
                    src={imgSrc}
                    alt={alt}
                    className={className}
                    onError={handleError}
                    onLoad={handleLoad}
                    loading={priority ? "eager" : "lazy"}
                    fetchPriority={priority ? "high" : undefined}
                    decoding="async"
                    sizes={sizes}
                    width={width}
                    height={height}
                />
            </picture>
        </div>
    );
};

export default OptimizedImage;
