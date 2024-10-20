import React, { createContext, useState, useEffect } from "react";

// Create a new context
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    // States for products, loading, and error
    const [products, setProducts] = useState([]); // Initialize with an empty array
    const [loading, setLoading] = useState(true); // Loading is true initially
    const [error, setError] = useState(null); // Error state to handle errors

    useEffect(() => {
        // Fetch products from the backend on component mount
        fetchProducts();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Function to fetch products from the backend
    const fetchProducts = async () => {
        let isMounted = true; // Keep track of component mount state
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/api/designer/coustmer/designs');
            if (response.ok && isMounted) {
                const data = await response.json();
                console.log("Shop data:", data);
                setProducts(data);
            } else {
                setError('Failed to fetch data from the server');
            }
        } catch (err) {
            if (isMounted) setError('An error occurred while fetching data');
        } finally {
            if (isMounted) setLoading(false);
        }
        return () => isMounted = false; // Cleanup function
    };


    // Provide context value
    const contextValue = {
        products, // Fetched products array
        loading, // Loading state
        error // Error message if any
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
