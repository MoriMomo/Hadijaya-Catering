/**
 * Error tracking utility for monitoring 404s and failed resource loads
 * Only logs in development mode
 */

class ErrorTracker {
    constructor() {
        this.errors = [];
        this.isDev = import.meta.env.DEV;
        this.uniqueKeys = new Set();
        this.occurrenceCounts = {};
        this.summaryTimerId = null;
    }

    init() {
        if (!this.isDev) return;

        // Track image 404s
        window.addEventListener('error', (e) => {
            if (e.target && e.target.tagName === 'IMG') {
                const error = {
                    type: '404 - Image',
                    url: e.target.currentSrc || e.target.src,
                    timestamp: new Date().toISOString()
                };
                this.logError(error);
            }
        }, true);

        // Track failed fetch requests
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
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
            } catch (err) {
                this.logError({
                    type: 'Fetch Error',
                    url: args[0],
                    message: err?.message,
                    timestamp: new Date().toISOString()
                });
                throw err;
            }
        };

        // Auto-log a summary after 5 seconds
        if (!this.summaryTimerId) {
            this.summaryTimerId = setTimeout(() => {
                this.logSummary();
                this.summaryTimerId = null;
            }, 5000);
        }
    }

    logError(error) {
        const key = `${error.type}|${error.url || ''}|${error.status || ''}`;

        // Increment occurrence count per unique key
        this.occurrenceCounts[key] = (this.occurrenceCounts[key] || 0) + 1;

        // Only warn once per unique key to reduce noise
        if (!this.uniqueKeys.has(key)) {
            this.errors.push(error);
            this.uniqueKeys.add(key);
            console.warn('🚨 [404 Error]', error);
        }

        // Ensure a summary timer exists
        if (this.isDev && !this.summaryTimerId) {
            this.summaryTimerId = setTimeout(() => {
                this.logSummary();
                this.summaryTimerId = null;
            }, 5000);
        }
    }

    getErrors() {
        return this.errors;
    }

    getErrorSummary() {
        const summary = {};
        Object.entries(this.occurrenceCounts).forEach(([key, count]) => {
            const type = key.split('|')[0];
            summary[type] = (summary[type] || 0) + count;
        });
        return summary;
    }

    logSummary() {
        const summary = this.getErrorSummary();
        const total = Object.values(summary).reduce((a, b) => a + b, 0);

        if (!total) {
            console.log('✅ No 404 errors detected');
            return;
        }

        console.group('📊 404 Error Summary');
        console.table(summary);
        console.log('Unique error examples:', this.errors);
        console.groupEnd();
    }
}

export const errorTracker = new ErrorTracker();
