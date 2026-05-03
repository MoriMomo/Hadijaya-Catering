import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('hadijaya_admin_token') === 'admin_valid_token_123';
    });
    const isLoading = false;

    const login = async (username, password) => {
        // Hardcoded for MVP phase
        if (username === 'admin' && password === 'admin123') {
            setIsAuthenticated(true);
            localStorage.setItem('hadijaya_admin_token', 'admin_valid_token_123');
            return { success: true };
        }
        return { success: false, error: 'Username atau password salah.' };
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('hadijaya_admin_token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
