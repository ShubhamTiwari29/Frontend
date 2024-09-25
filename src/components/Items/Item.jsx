import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Item = (props) => {
    const navigate = useNavigate();

    const handleAddToCartClick = () => {
        // Redirect to the product detail page
        navigate(`/shop/${props.id}`);
    };

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105">
            {/* Image and details wrapper */}
            <div className="relative">
                <Link to={`/shop/${props.id}`} className="block">
                    {/* Image container with fixed aspect ratio */}
                    <div className="w-full h-64 overflow-hidden">
                        <img
                            className="w-full h-full object-contain"
                            src={props.image}
                            alt={props.name}
                        />
                    </div>
                </Link>
                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{props.name}</h2>
                <div className="flex items-center mb-4">
                    <span className="text-xl font-bold text-gray-900">${props.new_price}</span>
                    {props.old_price && (
                        <span className="text-xl ml-4 line-through text-gray-500">${props.old_price}</span>
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
