import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);

        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:8000/auth/Signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, }), // Include role in the request
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess(data.message);
                navigate("/login");

                // Optionally, redirect the user or clear form fields
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'An error occurred');
            }
        } catch (err) {
            setError('An error occurred while signing up');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="signup-name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="signup-email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="signup-password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-6">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
