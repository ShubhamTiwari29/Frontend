
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
import Login from './pages/login/Login';
import Signup from './pages/login/SignUp';
import ShopContextProvider, { ShopContext } from './components/Context/ShopContext';
import BlogContextProvider from './components/Context/BlogContext';
import ProductDetails from './pages/ProductDetails';
import BlogDetail from './pages/BlogDetail';
import Payment from './pages/Payment';
import { CartProvider } from './components/Context/CartContext';
import VerifyOTP from './components/VerifyOTP/VerifyOTP';
import OrderHistory from './pages/order/OrderHistory';
import DesignerStore from './pages/designer/DesignerStore';



const AppRoutes = () => {
  return (

    <Router>
      <Navbar />
      <CartProvider>
        <ShopContextProvider>
          <BlogContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop category=" " />} />

              <Route path="/shop/landscapes" element={<Shop title="landscape" category="men" />} />
              <Route path="/shop/portraits" element={<Shop title="Portrate" category="women" />} />
              <Route path="/shop/new-arrivals" element={<Shop title="New Arrival" category="kid" />} />
              <Route path="/shop/custom-framing" element={<CustomFraming />} />
              <Route path="/shop/:id" element={<ProductDetails />} />
              <Route path="/designer/:id" element={<DesignerStore />} />
              <Route path="/payment/:id" element={<Payment />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/gallery" element={<Gallery />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/order-history" element={<OrderHistory />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
            </Routes>
          </BlogContextProvider>
        </ShopContextProvider>
      </CartProvider>

      <Footer />
    </Router>
  );
};

export default AppRoutes;
