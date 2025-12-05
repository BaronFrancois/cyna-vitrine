import { useEffect, useState, useCallback } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
    period: "monthly" | "annual";
}

export default function useCart() {
    const [items, setItems] = useState<CartItem[]>([]);

    // Charger le panier au démarrage
    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            setItems(JSON.parse(stored));
        }
    }, []);

    // Sauvegarder automatiquement
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addToCart = useCallback((item: CartItem) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        });
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
    };
}
