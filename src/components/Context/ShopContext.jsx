import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [topViewedProducts, setTopViewedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Track the current page
    const [hasMore, setHasMore] = useState(true); // Track if there are more products to load

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const fetchProducts = async (currentPage) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/designer/coustmer/pagination/designs?page=${currentPage}&limit"5"`);
            const newProducts = response.data.designs;
            console.log(newProducts.length);
            setTopViewedProducts(response.data.topViewedDesigns.slice(0, 3))

            setProducts((prevProducts) => currentPage === 1 ? newProducts : [...prevProducts, ...newProducts]);
            setHasMore(newProducts.length > 0);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const loadMoreProducts = () => setPage((prevPage) => prevPage + 1); // Increase page to fetch next set

    const contextValue = {
        products,
        topViewedProducts,
        loading,
        error,
        hasMore,
        fetchProducts,
        loadMoreProducts // Add this function to increment the page
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
