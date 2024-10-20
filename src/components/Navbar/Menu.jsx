import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    const [dropdown, setDropdown] = useState(null);

    const handleMouseEnter = (menu) => {
        setDropdown(menu);
    };

    const handleMouseLeave = () => {
        setDropdown(null);
    };

    return (
        <div>
            <ul className="navbar-menu flex space-x-6 text-white">
                <li className="hover:underline cursor-pointer">
                    <Link to="/">Home</Link>
                </li>
                <li className="hover:underline cursor-pointer">
                    <Link to="/custom-framing">Custom Framing</Link>
                </li>
                <li className="hover:underline cursor-pointer">
                    <Link to="/art-gallery">Art Gallery</Link>
                </li>
                <li className="hover:underline cursor-pointer">
                    <Link to="/blog">Blog</Link>
                </li>
                <li className="hover:underline cursor-pointer">
                    <Link to="/contact-us">Contact Us</Link>
                </li>
                <li
                    onMouseEnter={() => handleMouseEnter('myAccount')}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                >
                    <Link to="/my-account" className="hover:underline cursor-pointer">My Account</Link>
                    {dropdown === 'myAccount' && (
                        <ul className="dropdown-menu absolute left-0 mt-2 bg-white text-black rounded shadow-lg">
                            <li className="hover:bg-gray-200"><Link to="/login">Login/Sign Up</Link></li>
                            <li className="hover:bg-gray-200"><Link to="/order-history">Order History</Link></li>
                            <li className="hover:bg-gray-200"><Link to="/wishlist">Wishlist</Link></li>
                            <li className="hover:bg-gray-200"><Link to="/profile-settings">Profile Settings</Link></li>
                        </ul>
                    )}
                </li>
                <li className="hover:underline cursor-pointer">
                    <Link to="/cart">Cart</Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
