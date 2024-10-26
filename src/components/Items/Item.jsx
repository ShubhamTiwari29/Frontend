
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Item = ({ item }) => {
    const navigate = useNavigate();


    const handleAddToCartClick = () => {
        // Redirect to the product detail page
        navigate(`/shop/${item._id}`);
    };

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105">
            {/* Image and details wrapper */}
            <div className="relative">
                <Link to={`/shop/${item._id}`} className="block">
                    {/* Image container with fixed aspect ratio */}
                    <div className="w-full h-64 overflow-hidden">
                        <img
                            className="w-full h-full object-contain transition-transform transform hover:scale-110"
                            src={item.image}
                            alt={item.name || 'Product image'}
                        />
                    </div>
                </Link>
                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{item.title}</h2>
                <div className="flex items-center mb-4">
                    <span className="text-xl font-bold text-gray-900">₹{item.sellingPrice}</span>
                    {item.price && (
                        <span className="text-xl ml-4 line-through text-gray-500">₹{item.price}</span>
                    )}
                </div>
                <button
                    onClick={handleAddToCartClick}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default Item;
