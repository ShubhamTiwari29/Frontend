import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const MassonaryComponent = ({ item }) => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [isInWishlist, setIsInWishlist] = useState(false);

    // Fetch the wishlist when the component loads
    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:8000/api/coustmer/wishlist', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setWishlist(data.wishlist.designs || []);
                setIsInWishlist(data.wishlist.designs.some(wishItem => wishItem._id === item._id));
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
        fetchWishlist();
    }, [item._id]);

    // Function to handle adding/removing item from wishlist
    const toggleWishlist = async (e) => {
        e.stopPropagation(); // To prevent triggering the image click event
        const token = localStorage.getItem('token');
        try {
            if (isInWishlist) {
                await fetch(`http://localhost:8000/api/coustmer/wishlist/${item._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setWishlist(wishlist.filter(wishItem => wishItem._id !== item._id));
            } else {
                await fetch('http://localhost:8000/api/coustmer/wishlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ designId: item._id }),
                });
                setWishlist([...wishlist, item]);
            }
            setIsInWishlist(!isInWishlist);
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };

    // Function to handle incrementing views and navigation
    const handleClick = async () => {

        try {
            await fetch(`http://localhost:8000/api/designer/designs/view/${item._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // After increasing view count, navigate to the item's detailed page
            navigate(`/shop/${item._id}`);
        } catch (error) {
            console.error('Error increasing view count:', error);
        }
    };

    return (
        <div
            className="relative group border rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl mb-6"
            onClick={handleClick}  // Increment view and navigate
        >
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 z-10">
                <button onClick={toggleWishlist} className="focus:outline-none">
                    {isInWishlist ? (
                        <AiFillHeart className="text-red-500" size={24} />
                    ) : (
                        <AiOutlineHeart className="text-white" size={24} />
                    )}
                </button>
            </div>
            {/* Price and "Buy Now" button at the bottom of the image */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3 flex justify-between items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-lg font-semibold">₹{item.price}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded transition duration-300 flex items-center space-x-2">
                    <FaShoppingCart />
                    <span>Buy</span>
                </button>
            </div>
        </div>
    );
};

export default MassonaryComponent;
