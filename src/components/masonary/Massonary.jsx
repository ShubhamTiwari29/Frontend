import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineSearch, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Import both heart icons
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MassonaryComponent = ({ item }) => {
    const navigate = useNavigate();

    const [wishlist, setWishlist] = useState([]); // State for wishlist
    console.log("massonary detail", item);

    // Function to update view count in the database
    const updateViewCount = async (productId) => {
        console.log(productId);


        try {
            await axios.patch(`http://localhost:8000/api/designer/designs/view/${productId}`); // Call API to increment view count

        } catch (error) {
            console.error('Error updating view count:', error);
        }
    };



    const handleImageClick = (item) => {
        updateViewCount(item._id); // Update view count on click
        navigate(`/shop/${item._id}`);
    };



    const toggleWishlist = (item) => {
        if (wishlist.some(wishItem => wishItem._id === item._id)) {
            setWishlist(wishlist.filter(wishItem => wishItem._id !== item._id)); // Remove from wishlist
        } else {
            setWishlist([...wishlist, item]); // Add to wishlist
        }
    };
    return (
        <>
            <div
                key={item._id}
                className="relative group border rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl mb-6"
                onClick={() => handleImageClick(item)}
            >
                {/* Product Image */}
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    {/* Title */}
                    <h4 className="text-lg font-semibold truncate">{item.title}</h4>

                    {/* Buttons */}
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 flex items-center space-x-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item);
                            }}
                        >
                            <FaShoppingCart />
                            <span>Add to Cart</span>
                        </button>

                        {/* Wishlist Icon */}
                        <button
                            className="text-white hover:text-red-500 transition duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(item); // Toggle wishlist state
                            }}
                        >
                            {wishlist.some(wishItem => wishItem._id === item._id) ? (
                                <AiFillHeart size={24} classname="text-red-500" /> // Filled heart if in wishlist
                            ) : (
                                <AiOutlineHeart size={24} /> // Outline heart if not
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MassonaryComponent;
