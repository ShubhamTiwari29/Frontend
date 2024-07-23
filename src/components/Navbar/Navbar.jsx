// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Mobilemenu from './Mobilemenu';
import Menu from './Menu';
import UseMediaQuery from '../useMediaQuery';
const Navbar = () => {
    const isDesktop = UseMediaQuery('(min-width: 980px)');

    const [dropdown, setDropdown] = useState(null);

    const handleMouseEnter = (menu) => {
        setDropdown(menu);
    };

    const handleMouseLeave = () => {
        setDropdown(null);
    };

    return (
        <nav className="navbar md:text-[14px] md:px-20">

            {isDesktop ? <Menu /> : <Mobilemenu />}



            <div className='logo'>
                <h1 className=''>COMPANY NAME</h1>
            </div>

        </nav>
    );
};

export default Navbar;
