import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Log to console in development
        if (import.meta.env.DEV) {
            console.error('🔴 Error Boundary Caught:', error, errorInfo);
        }

        // In production, you could send this to an error tracking service like Sentry
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-200">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg
                                    className="w-10 h-10 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-3">
                                Oops! Something went wrong
                            </h1>
                            <p className="text-slate-600 mb-8">
                                We encountered an unexpected error. Please try refreshing the page.
                            </p>

                            {import.meta.env.DEV && this.state.error && (
                                <details className="text-left bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
                                    <summary className="cursor-pointer font-semibold text-slate-700 mb-2">
                                        Error Details (Development Only)
                                    </summary>
                                    <pre className="text-xs text-red-600 overflow-auto max-h-60">
                                        {this.state.error.toString()}
                                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                                    </pre>
                                </details>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                                >
                                    Refresh Page
                                </button>
                                <a
                                    href="/"
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3 rounded-full font-semibold transition-colors inline-block"
                                >
                                    Go to Homepage
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
