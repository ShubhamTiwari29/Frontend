// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import ContactUs from './pages/ContactUs';
import MyAccount from './pages/MyAccount';
import Cart from './pages/Cart';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CustomFraming from './pages/CustomFraming';
import Login from './pages/Login';
import ShopContextProvider, { ShopContext } from './components/Context/ShopContext';



const AppRoutes = () => {
  return (

    <Router>
      <Navbar />
      <ShopContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />

          <Route path="/shop/landscapes" element={<Shop title="landscape" category="men" />} />
          <Route path="/shop/portraits" element={<Shop title="Portrate" category="women" />} />

          <Route path="/shop/new-arrivals" element={<Shop title="New Arrival" category="kid" />} />
          <Route path="/shop/custom-framing" element={<CustomFraming />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/login" element={<Login />} />

          <Route path="/cart" element={<Cart />} />
        </Routes>
      </ShopContextProvider>

      <Footer />
    </Router>
  );
};

export default AppRoutes;
