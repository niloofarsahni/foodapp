import { createContext, useState, useContext } from "react";

const BasketContext = createContext();

export function BasketProvider({ children }) {
    const [basket, setBasket] = useState([]);

    const addToBasket = (food, quantity = 1) => {
        setBasket((prev) => {
            const existing = prev.find(item => item.id === food.id);
            if (existing) {
                return prev.map(item =>
                    item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prev, { ...food, quantity }];
        });
    };

    const removeOneFromBasket = (id) => {
        setBasket(prev =>
            prev.flatMap(item => {
                if (item.id === id) {
                    if (item.quantity > 1) return { ...item, quantity: item.quantity - 1 };
                    return []; // remove item if quantity = 1
                }
                return item;
            })
        );
    };

    const removeFromBasket = (foodId) => {
        setBasket(prev => prev.filter(item => item.id !== foodId));
    };

    const clearBasket = () => setBasket([]);

    return (
        <BasketContext.Provider value={{
            basket,
            addToBasket,
            removeOneFromBasket, // <-- Fix: include this
            removeFromBasket,
            clearBasket
        }}>
            {children}
        </BasketContext.Provider>
    );
}

// Custom hook for easy access
export function useBasket() {
    return useContext(BasketContext);
}
