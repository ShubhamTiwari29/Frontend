import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaPlus, FaUser, FaArtstation, FaCartPlus } from 'react-icons/fa';

const Mobilemenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState({});
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubMenu = (menu) => {
        setSubMenuOpen((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu],
        }));
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
            setSubMenuOpen({});
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={toggleMenu}
                className="p-2 border rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
                <FaList />
            </button>

            {isOpen && (
                <ul
                    className={`bg-white shadow-lg rounded-lg absolute top-12 right-0 mt-2 transition-all duration-300 ease-in-out overflow-hidden`}
                    style={{ width: '50vw', maxWidth: '300px', maxHeight: 'calc(100vh - 50px)', overflowY: 'auto', zIndex: 999 }} // Adjust zIndex
                >
                    <li className="border-b border-gray-200">
                        <Link
                            to="/"
                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <FaArtstation className="mr-2" /> Home
                        </Link>
                    </li>
                    <li className="border-b border-gray-200">
                        <Link
                            to="/custom-framing"
                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <FaCartPlus className="mr-2" /> Custom Framing
                        </Link>
                    </li>
                    <li className="border-b border-gray-200">
                        <Link
                            to="/art-gallery"
                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <FaArtstation className="mr-2" /> Art Gallery
                        </Link>
                    </li>
                    <li className="border-b border-gray-200">
                        <Link
                            to="/blog"
                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <FaArtstation className="mr-2" /> Blog
                        </Link>
                    </li>
                    <li className="border-b border-gray-200">
                        <Link
                            to="/contact-us"
                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <FaUser className="mr-2" /> Contact Us
                        </Link>
                    </li>

                    <li className="relative border-b border-gray-200">
                        <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                            <span className="text-gray-800">My Account</span>
                            <button
                                onClick={() => toggleSubMenu('myAccount')}
                                className="text-gray-500 focus:outline-none"
                            >
                                <FaPlus />
                            </button>
                        </div>
                        {subMenuOpen['myAccount'] && (
                            <ul className="pl-6 py-2 bg-gray-50 rounded-md">
                                <li>
                                    <Link
                                        to="/login"
                                        className="block px-2 py-1 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Login/Sign Up
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/order-history"
                                        className="block px-2 py-1 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Order History
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/wishlist"
                                        className="block px-2 py-1 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Wishlist
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/downloads"
                                        className="block px-2 py-1 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Downloads
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/profile-settings"
                                        className="block px-2 py-1 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Profile Settings
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="border-b border-gray-200">
                        <Link
                            to="/cart"
                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <FaCartPlus className="mr-2" /> Cart
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Mobilemenu;
