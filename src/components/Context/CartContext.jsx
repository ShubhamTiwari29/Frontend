import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        return savedCartItems || [];
    });

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(savedCartItems);
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        console.log("this is adding cart item data", item);

        setCartItems(prevItems => {
            const itemExists = prevItems.find(cartItem =>
                cartItem.productId === item.productId &&
                cartItem.color === item.color &&
                cartItem.size === item.size
            );
            if (itemExists) {
                return prevItems.map(cartItem =>
                    cartItem.productId === item.productId
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId, color, size) => {
        setCartItems(prevItems =>
            prevItems.filter(cartItem => !(cartItem.productId === productId && cartItem.color === color && cartItem.size === size))
        );
    };

    const decreaseQuantity = (itemId) => {
        setCartItems(prevItems =>
            prevItems.map(cartItem =>
                cartItem.productId === itemId && cartItem.quantity > 1
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            )
        );
    };

    const increaseQuantity = (itemId) => {
        setCartItems(prevItems =>
            prevItems.map(cartItem =>
                cartItem.productId === itemId
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            )
        );
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        getTotalPrice, // Include the total price function
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
