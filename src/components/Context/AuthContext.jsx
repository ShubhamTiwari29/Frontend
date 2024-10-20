import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved token and user info on initial load
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token }); // You can also decode the token for more user details
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Failed to login');
            const data = await response.json();
            setUser({ token: data.token });
            localStorage.setItem('token', data.token); // Save token to local storage
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Remove token from local storage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
