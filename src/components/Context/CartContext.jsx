import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Initialize state with cart items from localStorage
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        return savedCartItems || []; // Return saved items or an empty array
    });

    // Load cart items from localStorage when the component mounts
    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log('Checking local storage.....', savedCartItems);
        setCartItems(savedCartItems);
    }, []);

    // Save cart items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Your data added:', cartItems);
    }, [cartItems]);

    const cartData = cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.new_price
    }));


    console.log("this is cart item", cartItems);
    console.log("this is cart data", cartData);


    const addToCart = (item) => {
        console.log("data of frame send ", item);

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
    const navigate = useNavigate()
    const handleConfirmOrder = () => {
        // Implement order confirmation logic

        console.log('Order confirmed');
        navigate('/fill-address');
    };


    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems'); // Clear cart items from localStorage if needed
    };


    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        handleConfirmOrder,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
