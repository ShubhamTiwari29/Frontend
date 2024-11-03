import React, { useState, useEffect, forwardRef } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdShoppingCartCheckout } from "react-icons/md";

const MassonaryComponent = forwardRef(({ item }, ref) => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/coustmer/wishlist`, {
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

    const toggleWishlist = async (e) => {
        e.stopPropagation();
        e.preventDefault();
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

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:8000/api/designer/designs/view/${item._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate(`/shop/${item._id}`);
        } catch (error) {
            console.error('Error increasing view count:', error);
        }
    };

    return (
        <div
            ref={ref}
            className="relative group border rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl mb-6"
            onClick={handleClick}
            style={{ zIndex: 10 }}
        >
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 z-20">
                <button onClick={toggleWishlist} className="focus:outline-none">
                    {isInWishlist ? (
                        <AiFillHeart className="text-red-500" size={24} />
                    ) : (
                        <AiOutlineHeart className="text-white" size={24} />
                    )}
                </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3 md:flex justify-between items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden">
                <p className="text-lg font-semibold">₹{item.price}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded transition duration-300 flex items-center space-x-2">
                    <FaShoppingCart />
                    <span>Buy</span>
                </button>
            </div>

            <div className="p-3 bg-white bg-opacity-80 text-black md:hidden">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex flex-row space-x-4">
                        <p className="text-sm">Price: ₹{item.sellingPrice}</p>
                        <p className="text-sm text-red-300 line-through">₹{item.price}</p>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleClick(e); }}
                        className="text-black px-4 py-2 rounded"
                    >
                        <MdShoppingCartCheckout />
                    </button>
                </div>
            </div>
        </div>
    );
});

export default MassonaryComponent;
