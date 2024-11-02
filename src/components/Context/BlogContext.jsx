import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'; // Make sure to import axios

export const BlogContext = createContext(null);

const BlogContextProvider = (props) => {
    const [blogs, setBlogs] = useState([]); // State to store blog data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(''); // State for error messages

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`);
                console.log(response.data);

                setBlogs(response.data);
                setError('');
            } catch (error) {
                setError('Failed to fetch blogs.');
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const contextValue = { blogs, loading, error }; // Include blogs, loading, and error in context value

    return (
        <BlogContext.Provider value={contextValue}>
            {props.children}
        </BlogContext.Provider>
    );
};

export default BlogContextProvider;
