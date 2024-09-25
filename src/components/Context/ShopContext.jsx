import React, { createContext, useState, useEffect } from "react";

// Create a new context
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    // States for products, loading, and error
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products from the backend
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    setError('Failed to fetch data from the server');
                }
            } catch (err) {
                setError('An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Provide context value
    const contextValue = {
        products,
        loading,
        error
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
