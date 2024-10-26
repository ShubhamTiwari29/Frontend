import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
    const [dropdown, setDropdown] = useState(null);
    const location = useLocation(); // Get the current location

    const handleMouseEnter = (menu) => {
        setDropdown(menu);
    };

    const handleMouseLeave = () => {
        setDropdown(null);
    };

    // Function to check if the link is active
    const isActive = (path) => {
        return location.pathname === path ? ' underline ' : ''; // Example active styles
    };

    return (
        <div>
            <ul className="navbar-menu flex space-x-6 text-white">
                <li className={`hover:underline cursor-pointer ${isActive('/')}`}>
                    <Link to="/">Home</Link>
                </li>
                <li className={`hover:underline cursor-pointer ${isActive('/custom-framing')}`}>
                    <Link to="/custom-framing">Custom Framing</Link>
                </li>
                <li className={`hover:underline cursor-pointer ${isActive('/art-gallery')}`}>
                    <Link to="/art-gallery">Art Gallery</Link>
                </li>
                <li className={`hover:underline cursor-pointer ${isActive('/blog')}`}>
                    <Link to="/blog">Blog</Link>
                </li>
                <li className={`hover:underline cursor-pointer ${isActive('/contact-us')}`}>
                    <Link to="/contact-us">Contact Us</Link>
                </li>
                <li
                    onMouseEnter={() => handleMouseEnter('myAccount')}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                >
                    <Link to="/my-account" className={`hover:underline cursor-pointer ${isActive('/my-account')}`}>
                        My Account
                    </Link>
                    {dropdown === 'myAccount' && (
                        <ul className="dropdown-menu absolute left-0 mt-2 bg-[#111827] text-white rounded shadow-lg">
                            <li className="hover:bg-gray-200"><Link to="/login">Login/Sign Up</Link></li>
                            <li className="hover:bg-gray-200"><Link to="/order-history">Order History</Link></li>
                            <li className="hover:bg-gray-200"><Link to="/wishlist">Wishlist</Link></li>
                            <li className="hover:bg-gray-200"><Link to="/profile-settings">Profile Settings</Link></li>
                        </ul>
                    )}
                </li>
                <li className={`hover:underline cursor-pointer ${isActive('/cart')}`}>
                    <Link to="/cart">Cart</Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
