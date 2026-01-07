/**
 * Error tracking utility for monitoring 404s and failed resource loads
 * Only logs in development mode
 */

class ErrorTracker {
    constructor() {
        this.errors = [];
        this.isDev = import.meta.env.DEV;
    }

    init() {
        if (!this.isDev) return;

        // Track image 404s
        window.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                const error = {
                    type: '404 - Image',
                    url: e.target.src,
                    timestamp: new Date().toISOString()
                };
                this.logError(error);
            }
        }, true);

        // Track failed fetch requests
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const response = await originalFetch(...args);
            if (!response.ok && response.status === 404) {
                this.logError({
                    type: '404 - Fetch',
                    url: args[0],
                    status: response.status,
                    timestamp: new Date().toISOString()
                });
            }
            return response;
        };
    }

    logError(error) {
        this.errors.push(error);
        console.warn('🚨 [404 Error]', error);
    }

    getErrors() {
        return this.errors;
    }

    getErrorSummary() {
        const summary = {};
        this.errors.forEach(err => {
            const key = err.type;
            summary[key] = (summary[key] || 0) + 1;
        });
        return summary;
    }

    logSummary() {
        if (this.errors.length === 0) {
            console.log('✅ No 404 errors detected');
            return;
        }

        console.group('📊 404 Error Summary');
        console.table(this.getErrorSummary());
        console.log('Detailed errors:', this.errors);
        console.groupEnd();
    }
}

export const errorTracker = new ErrorTracker();
