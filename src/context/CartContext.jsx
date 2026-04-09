import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    // Initialize order lines from LocalStorage
    const [orderLines, setOrderLines] = useState(() => {
        try {
            const saved = localStorage.getItem('hadijaya-order-draft');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.lines && Array.isArray(parsed.lines)) {
                    return parsed.lines;
                }
            }
        } catch (error) {
            console.error("Error loading saved order:", error);
        }
        return [];
    });

    // Initialize checkout details
    const [checkoutDetails, setCheckoutDetails] = useState(() => {
        try {
            const saved = localStorage.getItem('hadijaya-order-draft');
            if (saved) {
                const parsed = JSON.parse(saved);
                return {
                    name: parsed.name || '',
                    phone: parsed.phone || '',
                    date: parsed.date || ''
                };
            }
        } catch (_e) { // eslint-disable-line no-unused-vars
            // fallback
        }
        return { name: '', phone: '', date: '' };
    });

    useEffect(() => {
        const draft = {
            lines: orderLines,
            ...checkoutDetails
        };
        localStorage.setItem('hadijaya-order-draft', JSON.stringify(draft));
    }, [orderLines, checkoutDetails]);

    const addToCart = (menuItem, presetQty = 10) => {
        setOrderLines(prev => {
            const existing = prev.find(l => Number(l.menuId) === Number(menuItem.id));
            if (existing) {
                return prev.map(l => 
                    Number(l.menuId) === Number(menuItem.id) 
                        ? { ...l, qty: (Number(l.qty) || 0) + 1 } 
                        : l
                );
            }
            return [...prev, { id: Date.now(), menuId: menuItem.id, qty: presetQty }];
        });
    };

    const updateLine = (id, patch) => {
        setOrderLines(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));
    };

    const removeLine = (id) => {
        setOrderLines(prev => prev.filter(l => l.id !== id));
    };

    const incrementQty = (id) => {
        updateLine(id, { qty: (orderLines.find(l => l.id === id)?.qty || 0) + 1 });
    };

    const decrementQty = (id) => {
        const current = orderLines.find(l => l.id === id)?.qty || 0;
        if (current > 1) updateLine(id, { qty: current - 1 });
    };

    const clearCart = () => {
        setOrderLines([]);
        setCheckoutDetails({ name: '', phone: '', date: '' });
        localStorage.removeItem('hadijaya-order-draft');
    };

    const totalPortions = orderLines.reduce((s, l) => s + (Number(l.qty) || 0), 0);
    const cartCount = orderLines.length;

    const value = {
        orderLines,
        setOrderLines,
        checkoutDetails,
        setCheckoutDetails,
        addToCart,
        updateLine,
        removeLine,
        incrementQty,
        decrementQty,
        clearCart,
        totalPortions,
        cartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
