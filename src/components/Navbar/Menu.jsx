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
            <ul className="navbar-menu ">

                <li><Link to="/">Home</Link></li>
                <li
                    onMouseEnter={() => handleMouseEnter('shop')}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link >Shop</Link>
                    {dropdown === 'shop' && (
                        <ul className="dropdown-menu">
                            <li><Link to="/shop/landscapes">Landscapes</Link></li>
                            <li><Link to="/shop/portraits">Portraits</Link></li>

                            <li><Link to="/shop/custom-framing">Custom Framing</Link></li>
                            <li><Link to="/shop/new-arrivals">New Arrivals</Link></li>
                            {/* <li><Link to="/shop/best-sellers">Best Sellers</Link></li> */}
                        </ul>
                    )}
                </li>
                {/* <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/gallery">Gallery</Link></li> */}
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
                <li
                    onMouseEnter={() => handleMouseEnter('myAccount')}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link to="/my-account">My Account</Link>
                    {dropdown === 'myAccount' && (
                        <ul className="dropdown-menu">
                            <li><Link to="/login">Login/Sign Up</Link></li>
                            <li><Link to="/order-history">Order History</Link></li>
                            <li><Link to="/wishlist">Wishlist</Link></li>
                            <li><Link to="/profile-settings">Profile Settings</Link></li>
                        </ul>
                    )}
                </li>
                <li><Link to="/cart">Cart</Link></li>

            </ul>
        </div>
    )
}

export default Menu
