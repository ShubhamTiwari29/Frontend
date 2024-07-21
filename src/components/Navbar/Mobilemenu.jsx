import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaPlus } from 'react-icons/fa6';

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
        <div ref={menuRef}>
            <button
                onClick={toggleMenu}
                className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
            >
                <FaList />
            </button>
            {isOpen && (
                <ul className="bg-white px-6 py-3 absolute">
                    <li><Link to="/">Home</Link></li>
                    <li>
                        <Link to="/shop">Shop</Link>
                        <button
                            onClick={() => toggleSubMenu('shop')}
                            className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
                        >
                            <FaPlus />
                        </button>
                        {subMenuOpen['shop'] && (
                            <ul className="relative pl-3">
                                <li><Link to="/shop/landscapes">Landscapes</Link></li>
                                <li><Link to="/shop/portraits">Portraits</Link></li>
                                <li><Link to="/shop/abstract">Abstract</Link></li>
                                <li><Link to="/shop/custom-framing">Custom Framing</Link></li>
                                <li><Link to="/shop/new-arrivals">New Arrivals</Link></li>
                                <li><Link to="/shop/best-sellers">Best Sellers</Link></li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li>
                        <Link to="/my-account">My Account</Link>
                        <button
                            onClick={() => toggleSubMenu('myAccount')}
                            className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
                        >
                            <FaPlus />
                        </button>
                        {subMenuOpen['myAccount'] && (
                            <ul className="relative pl-3">
                                <li><Link to="/login">Login/Sign Up</Link></li>
                                <li><Link to="/order-history">Order History</Link></li>
                                <li><Link to="/wishlist">Wishlist</Link></li>
                                <li><Link to="/profile-settings">Profile Settings</Link></li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Mobilemenu;
