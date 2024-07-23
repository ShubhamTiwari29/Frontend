
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content ">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>
                        We offer a wide variety of beautifully framed pictures. Our mission
                        is to provide high-quality art at affordable prices.
                    </p>
                    <p>Address: R2Q7+HJQ, Sector 6, Gomti Nagar, Lucknow, Uttar Pradesh 226010</p>
                    <p> <span className='text-[20px]'>Phone:</span> 8354033004</p>
                    <p>Email: info@example.com</p>
                </div>

                <div className="footer-section customer-service">
                    <h2 className=''>Customer Service</h2>
                    <ul>
                        <li><Link to="/faqs">FAQs</Link></li>
                        <li><Link to="/shipping-delivery">Shipping & Delivery</Link></li>
                        <li><Link to="/returns-refunds">Returns & Refunds</Link></li>
                        <li><Link to="/order-tracking">Order Tracking</Link></li>
                    </ul>
                </div>

                <div className="footer-section quick-links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/my-account">My Account</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </ul>
                </div>

                <div className="footer-section social-media">
                    <h2>Follow Us</h2>
                    <div className="social-links">
                        <Link to="/"><FaXTwitter /></Link>
                        <Link to="/"><GrInstagram /></Link>


                    </div>
                </div>

                {/* <div className="footer-section newsletter">
                    <h2>Newsletter</h2>
                    <p>Subscribe to our newsletter for the latest updates.</p>
                    <form>
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div> */}
            </div>

            <div className="footer-bottom text-[10px] ">
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                <ul>
                    <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link to="/cookies-policy">Cookies Policy</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
