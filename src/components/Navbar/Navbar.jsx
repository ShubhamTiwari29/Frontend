
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
        <nav className="navbar bg-[#111827] text-white md:text-[14px] md:px-20">
            <div className='logo'>
                <h1 className=''>COMPANY NAME</h1>
            </div>

            {isDesktop ? <Menu /> : <Mobilemenu />}




        </nav>
    );
};

export default Navbar;
